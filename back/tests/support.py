"""Общая оснастка тестов бэкенда: ни сети, ни индекса на диске.

`FakeGateway` повторяет ровно ту поверхность `RaguGateway`, которую зовут
сценарии, и запоминает, с чем его позвали. Этого достаточно, чтобы проверять
решения — какой режим выбран, какой язык уехал, что попало в тело запроса, —
не поднимая ни сервис, ни модель.
"""

from __future__ import annotations

import asyncio
import functools
from typing import Any

from fastapi import HTTPException
from ragu.api.models import (
    ChunkItem,
    ChunkPage,
    CommunityItem,
    CommunityPage,
    EngineReport,
    EntityItem,
    EntityPage,
    GraphDetail,
    GraphInfo,
    GraphListResponse,
    ModeAvailability,
    Neighborhood,
    PageInfo,
    RelationItem,
    RelationPage,
    SearchResponse,
)

from ragu_web_api.config import Settings


def asyncio_test(fn):
    """Один цикл событий на тест.

    Без pytest-asyncio и намеренно: зависимость ради двух десятков тестов не
    нужна. Внутри одного `asyncio.run` — потому что `asyncio.Lock` каталога
    привязывается к циклу на первом ожидании и второго вызова не переживёт.
    """

    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        return asyncio.run(fn(*args, **kwargs))

    return wrapper


def settings(**overrides) -> Settings:
    payload = {
        "ragu_api_url": "http://ragu-api:8020",
        "ragu_api_key": "secret",
        "ragu_api_timeout": 240.0,
        "graph_page_size": 1000,
        "token_price_prompt": 0.0,
        "token_price_completion": 0.0,
        "token_price_currency": "",
        "catalog_ttl": 60.0,
        "dataset_ttl": 300.0,
        "subgraph_ttl": 300.0,
    }
    payload.update(overrides)
    return Settings(**payload)


def modes(*available: str) -> list[ModeAvailability]:
    return [
        ModeAvailability(mode=mode, available=mode in available)
        for mode in ("global", "local", "naive", "mix")
    ]


def info(graph_id: str, **overrides) -> GraphInfo:
    payload: dict[str, Any] = {"id": graph_id, "loaded": True, "language": "russian"}
    payload.update(overrides)
    return GraphInfo(**payload)


def detail(graph_id: str, **overrides) -> GraphDetail:
    payload: dict[str, Any] = {
        "id": graph_id,
        "loaded": True,
        "language": "russian",
        "entities": 2400,
        "relations": 7100,
        "chunks": 320,
        "communities": 38,
        "community_summaries": 38,
        "documents": 12,
        "embedding_dim": 768,
        "modes": modes("local", "naive", "mix"),
    }
    payload.update(overrides)
    return GraphDetail(**payload)


def search_response(**overrides) -> SearchResponse:
    payload: dict[str, Any] = {
        "query": "вопрос",
        "mode": "mix",
        "used_query_plan": False,
        "answer": "ответ",
        "sources": [],
        "subqueries": [],
        "engines": EngineReport(requested="mix", used="MixSearchEngine"),
    }
    payload.update(overrides)
    return SearchResponse(**payload)


def entity(entity_id: str, **overrides) -> EntityItem:
    payload: dict[str, Any] = {
        "id": entity_id,
        "name": entity_id.upper(),
        "type": "PERSON",
        "description": "…",
        "degree": 1,
    }
    payload.update(overrides)
    return EntityItem(**payload)


def relation(relation_id: str, subject: str, obj: str, **overrides) -> RelationItem:
    payload: dict[str, Any] = {
        "id": relation_id,
        "subject_id": subject,
        "object_id": obj,
        "subject_name": subject.upper(),
        "object_name": obj.upper(),
        "type": "RELATED_TO",
        "strength": 5.0,
    }
    payload.update(overrides)
    return RelationItem(**payload)


def community(community_id: str, **overrides) -> CommunityItem:
    payload: dict[str, Any] = {
        "id": community_id,
        "level": 0,
        "cluster_id": 1,
        "entity_count": 8,
        "title": "Сообщество",
        "summary": "свод",
        "entity_ids": ["e0"],
    }
    payload.update(overrides)
    return CommunityItem(**payload)


class FakeGateway:
    """Поверхность шлюза, которую зовут сценарии, плюс журнал обращений."""

    def __init__(
        self,
        infos: list[GraphInfo],
        details=None,
        types=None,
        answer=None,
        entities=None,
        relations=None,
        communities=None,
        chunks=None,
        neighborhood=None,
    ):
        self._infos = infos
        self._details = details or {item.id: detail(item.id) for item in infos}
        self._types = types or {}
        self._answer = answer or search_response()
        self._entities = entities
        self._relations = relations or []
        self._communities = communities or []
        self._chunks = chunks or []
        self._neighborhood = neighborhood
        self.calls: dict[str, int] = {}
        self.searches: list[dict[str, Any]] = []
        self.selections: list[dict[str, Any]] = []
        self.entity_queries: list[dict[str, Any]] = []
        self.fail_on_graphs = False

    def _count(self, name: str) -> None:
        self.calls[name] = self.calls.get(name, 0) + 1

    async def graphs(self) -> GraphListResponse:
        self._count("graphs")
        if self.fail_on_graphs:
            raise HTTPException(status_code=503, detail={"code": "service_not_ready"})
        return GraphListResponse(
            default=self._infos[0].id if self._infos else "", graphs=self._infos
        )

    async def stats(self, dataset: str) -> GraphDetail:
        self._count("stats")
        found = self._details[dataset]
        if isinstance(found, Exception):
            raise found
        return found

    async def entities(self, dataset: str, **kwargs) -> EntityPage:
        self._count("entities")
        self.entity_queries.append(kwargs)
        if self._entities is None:
            names = self._types.get(dataset, ["PERSON"])
            items = [
                EntityItem(id=f"e{index}", name=f"e{index}", type=name)
                for index, name in enumerate(names)
            ]
        else:
            items = list(self._entities)
            if kwargs.get("type"):
                items = [item for item in items if item.type == kwargs["type"]]
        total = len(items)
        offset = kwargs.get("offset", 0)
        limit = kwargs.get("limit", 50)
        return EntityPage(
            page=PageInfo(total=total, limit=limit, offset=offset),
            entities=items[offset : offset + limit],
        )

    async def entity(self, dataset: str, entity_id: str) -> EntityItem:
        self._count("entity")
        for item in self._entities or []:
            if item.id == entity_id:
                return item
        return entity(entity_id)

    async def select_relations(self, dataset: str, entity_ids, **kwargs) -> RelationPage:
        self._count("select_relations")
        self.selections.append({"entity_ids": list(entity_ids), **kwargs})
        offset = kwargs.get("offset", 0)
        limit = kwargs.get("limit", 500)
        items = self._relations[offset : offset + limit]
        return RelationPage(
            page=PageInfo(total=len(self._relations), limit=limit, offset=offset),
            relations=items,
        )

    async def neighbors(self, dataset: str, entity_id: str, **kwargs) -> Neighborhood:
        self._count("neighbors")
        if self._neighborhood is not None:
            return self._neighborhood
        return Neighborhood(
            root=entity_id,
            depth=kwargs.get("depth", 1),
            entities=list(self._entities or []),
            relations=list(self._relations),
        )

    async def communities(self, dataset: str, **kwargs) -> CommunityPage:
        self._count("communities")
        return CommunityPage(
            page=PageInfo(total=len(self._communities), limit=500, offset=0),
            communities=list(self._communities),
        )

    async def chunks_by_ids(self, dataset: str, ids) -> ChunkPage:
        self._count("chunks")
        items = [item for item in self._chunks if item.id in set(ids)]
        return ChunkPage(
            page=PageInfo(total=len(items), limit=500, offset=0), chunks=items
        )

    async def search(self, dataset: str, mode: str, query: str, **body) -> SearchResponse:
        self._count("search")
        self.searches.append({"dataset": dataset, "mode": mode, "query": query, **body})
        return self._answer

    @property
    def last_search(self) -> dict[str, Any]:
        return self.searches[-1]
