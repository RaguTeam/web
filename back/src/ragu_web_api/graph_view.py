"""Канвас Explorer поверх ragu-api.

До переезда граф целиком парсился из GML и жил в памяти процесса навсегда:
вершины, связи, сообщества, карты смежности. Теперь ничего этого нет — каждый
запрос забирает у сервиса ровно то, что показывает.

Ключевое отличие от прежнего кода: связи не перебираются, а запрашиваются
индуцированным подграфом на уже выбранный набор вершин. Раньше на каждый кадр
канваса пробегался весь список рёбер.
"""

from __future__ import annotations

import asyncio
import logging
from typing import Any

from ragu.api.models import EntityItem, RelationItem

from ragu_web_api.catalog import Catalog
from ragu_web_api.config import Settings
from ragu_web_api.metrics import observe_dataset_request
from ragu_web_api.presentation import graph as present
from ragu_web_api.ragu_gateway import RaguGateway
from ragu_web_api.schemas.graph import (
    CommunitySummary,
    EntityType,
    GraphCommunitiesResponse,
    GraphEdge,
    GraphFilters,
    GraphMeta,
    GraphNode,
    GraphResponse,
    NodeDetailResponse,
    ProvenanceChunk,
)

LOGGER = logging.getLogger(__name__)

# Потолок выборки сообществ: их единицы-десятки на корпус, страницы не нужны.
_COMMUNITY_LIMIT = 500

# Сколько вершин сервис принимает в одну выборку связей (MAX_SELECT_IDS). Это
# не наш потолок выдачи — он снят, — а граница одного запроса: разбить набор на
# части нельзя, индуцированный подграф по частям не равен подграфу по целому.
_SELECT_IDS_MAX = 10_000


class GraphView:
    """Выборки графа для канваса. Один экземпляр на процесс."""

    def __init__(
        self, gateway: RaguGateway, catalog: Catalog, settings: Settings
    ) -> None:
        self._gateway = gateway
        self._catalog = catalog
        self._page = settings.graph_page_size

    # --- канвас -----------------------------------------------------------

    async def graph(
        self,
        dataset_id: str,
        *,
        limit: int = 500,
        search: str | None = None,
        entity_types: list[EntityType] | None = None,
        community_ids: list[str] | None = None,
        min_strength: float = 0.0,
        include_communities: bool = True,
    ) -> GraphResponse:
        observe_dataset_request(dataset_id, "graph")
        corpus = await self._catalog.corpus(dataset_id)

        entities = await self._entities(
            dataset_id,
            limit=limit,
            search=search,
            entity_types=entity_types,
            community_ids=community_ids,
        )
        nodes = [present.node(entity, ordinal) for ordinal, entity in enumerate(entities)]
        edges = await self._induced_edges(
            dataset_id, [entity.id for entity in entities], min_strength
        )
        communities = (
            await self._communities_of(dataset_id, nodes)
            if include_communities
            else []
        )

        return GraphResponse(
            nodes=nodes,
            edges=edges,
            communities=communities,
            meta=GraphMeta(
                dataset_id=dataset_id,
                total_nodes=corpus.stats.nodes,
                total_edges=corpus.stats.edges,
                returned_nodes=len(nodes),
                returned_edges=len(edges),
                limit=limit,
                filters=GraphFilters(
                    search=search,
                    entity_types=entity_types,
                    community_ids=community_ids,
                    min_strength=min_strength,
                ),
            ),
        )

    async def node(self, dataset_id: str, node_id: str) -> NodeDetailResponse:
        await self._catalog.corpus(dataset_id)
        entity = await self._gateway.entity(dataset_id, node_id)
        # Соседство и чанки независимы — забираем разом, а не по очереди.
        around, chunks = await asyncio.gather(
            self._gateway.neighbors(dataset_id, node_id, depth=1, limit=self._page),
            self._chunks(dataset_id, entity.source_chunk_ids),
        )
        relations = [present.node_relation(item, node_id) for item in around.relations]
        return NodeDetailResponse(
            node=present.node(entity, 0),
            incoming_relations=[r for r in relations if r.direction == "incoming"],
            outgoing_relations=[r for r in relations if r.direction == "outgoing"],
            provenance_chunks=chunks,
        )

    async def neighbors(
        self,
        dataset_id: str,
        node_id: str,
        *,
        depth: int = 1,
        limit: int = 100,
        min_strength: float = 0.0,
    ) -> GraphResponse:
        observe_dataset_request(dataset_id, "graph")
        corpus = await self._catalog.corpus(dataset_id)
        around = await self._gateway.neighbors(
            dataset_id, node_id, depth=depth, limit=limit
        )

        nodes = [
            present.node(entity, ordinal)
            for ordinal, entity in enumerate(around.entities)
        ]
        # Фильтр по силе здесь, а не на сервисе: у /neighbors такого параметра
        # нет, а вершины уже приехали, и второй запрос ради отсева лишний.
        edges = [
            present.edge(relation)
            for relation in around.relations
            if present.strength(relation.strength) >= min_strength
        ]
        return GraphResponse(
            nodes=nodes,
            edges=edges,
            communities=await self._communities_of(dataset_id, nodes),
            meta=GraphMeta(
                dataset_id=dataset_id,
                total_nodes=corpus.stats.nodes,
                total_edges=corpus.stats.edges,
                returned_nodes=len(nodes),
                returned_edges=len(edges),
                limit=limit,
                filters=GraphFilters(min_strength=min_strength),
            ),
        )

    async def communities(self, dataset_id: str) -> GraphCommunitiesResponse:
        observe_dataset_request(dataset_id, "communities")
        await self._catalog.corpus(dataset_id)
        page = await self._gateway.communities(dataset_id, limit=_COMMUNITY_LIMIT)
        return GraphCommunitiesResponse(
            dataset_id=dataset_id,
            communities=[present.community(item) for item in page.communities],
        )

    # --- выборки ----------------------------------------------------------

    async def _entities(
        self,
        dataset_id: str,
        *,
        limit: int,
        search: str | None,
        entity_types: list[EntityType] | None,
        community_ids: list[str] | None,
    ) -> list[EntityItem]:
        """Вершины под фильтры интерфейса.

        У сервиса `type` и `community_id` — по одному значению, а у нас списки:
        выбранные типы читаются как «или». Поэтому на каждую комбинацию свой
        запрос, а результаты объединяются. Комбинаций столько, сколько чипов
        выбрал посетитель, — единицы.
        """
        queries = [
            {"type": entity_type, "community_id": community_id}
            for entity_type in (entity_types or [None])
            for community_id in (community_ids or [None])
        ]
        pages = await asyncio.gather(
            *(
                self._entity_pages(dataset_id, limit=limit, search=search, **query)
                for query in queries
            )
        )

        by_id: dict[str, EntityItem] = {}
        for page in pages:
            for entity in page:
                by_id.setdefault(entity.id, entity)
        # Пересортировка после объединения: каждый запрос отсортирован сам по
        # себе, и обрезать склейку по чужому порядку значило бы выкинуть
        # концентраторы одной ветки ради хвоста другой.
        merged = sorted(by_id.values(), key=lambda item: (-(item.degree or 0), item.id))
        return merged[:limit]

    async def _entity_pages(
        self, dataset_id: str, *, limit: int, **filters: Any
    ) -> list[EntityItem]:
        """Страницы сервиса до нужного числа вершин.

        Потолок страницы у сервиса — 5000, и раньше он же становился потолком
        выдачи. Здесь он только размер шага.
        """
        collected: list[EntityItem] = []
        offset = 0
        while len(collected) < limit:
            page = await self._gateway.entities(
                dataset_id,
                limit=min(self._page, limit - len(collected)),
                offset=offset,
                sort="degree",
                order="desc",
                **filters,
            )
            collected.extend(page.entities)
            offset += len(page.entities)
            if not page.entities or offset >= page.page.total:
                break
        return collected

    async def _induced_edges(
        self, dataset_id: str, entity_ids: list[str], min_strength: float
    ) -> list[GraphEdge]:
        """Связи внутри набора вершин — одним запросом, а не перебором рёбер."""
        if not entity_ids:
            return []
        if len(entity_ids) > _SELECT_IDS_MAX:
            LOGGER.warning(
                "Canvas asked for %d nodes; relations are selected for the %d most "
                "connected, which is what one selection carries.",
                len(entity_ids),
                _SELECT_IDS_MAX,
                extra={"event": "graph_select_clamped", "nodes": len(entity_ids)},
            )
            entity_ids = entity_ids[:_SELECT_IDS_MAX]

        relations: list[RelationItem] = []
        offset = 0
        while True:
            page = await self._gateway.select_relations(
                dataset_id,
                entity_ids,
                min_strength=present.raw_strength(min_strength) or None,
                limit=self._page,
                offset=offset,
            )
            relations.extend(page.relations)
            offset += len(page.relations)
            if not page.relations or offset >= page.page.total:
                break
        return [present.edge(relation) for relation in relations]

    async def _communities_of(
        self, dataset_id: str, nodes: list[GraphNode]
    ) -> list[CommunitySummary]:
        """Сообщества, в которых состоит хоть одна показанная вершина."""
        wanted = {node.community_id for node in nodes if node.community_id}
        if not wanted:
            return []
        page = await self._gateway.communities(dataset_id, limit=_COMMUNITY_LIMIT)
        return [
            present.community(item)
            for item in page.communities
            if item.id in wanted
        ]

    async def _chunks(self, dataset_id: str, ids: list[str]) -> list[ProvenanceChunk]:
        """Фрагменты, из которых извлекли сущность.

        Единственный путь от сущности к тексту: обратного индекса нет. Пустой
        список — это «нечего показать», а не ошибка, поэтому и запроса не будет.
        """
        if not ids:
            return []
        page = await self._gateway.chunks_by_ids(dataset_id, ids)
        return [
            ProvenanceChunk(
                id=chunk.id,
                content=chunk.content,
                doc_id=chunk.doc_id or "",
                chunk_order_idx=chunk.chunk_order_idx or 0,
            )
            for chunk in page.chunks
        ]
