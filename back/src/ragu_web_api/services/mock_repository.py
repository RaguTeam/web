from __future__ import annotations

import math
from collections import deque
from datetime import datetime, timezone
from hashlib import md5
from typing import Iterable

from fastapi import HTTPException

from ragu_web_api.fixtures.mock_data import CREATED_AT, DATASETS, EDGE_PATTERN, ENGINES, GRAPH_SEEDS, UPDATED_AT
from ragu_web_api.schemas.agent import (
    AgentRequest,
    AgentResponse,
    AnswerTrace,
    AssistantMessage,
    GraphHighlight,
    SuggestionsResponse,
    TraceChunk,
    TraceCommunity,
    TraceEnergy,
    TraceEntity,
    TraceRelation,
    TraceTimings,
)
from ragu_web_api.schemas.common import Locale
from ragu_web_api.schemas.datasets import DatasetBadge, DatasetCard, DatasetDetail, DatasetPreview, DatasetStats
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
    NodeRelation,
    ProvenanceChunk,
)


class MockRepository:
    def __init__(self) -> None:
        self._dataset_defs = {item["id"]: item for item in DATASETS}
        self._graphs = {dataset_id: self._build_graph(dataset_id) for dataset_id in self._dataset_defs}

    def list_datasets(self, locale: Locale = "ru") -> list[DatasetCard]:
        return [self._dataset_card(dataset_id, locale) for dataset_id in self._dataset_defs]

    def get_dataset(self, dataset_id: str, locale: Locale = "ru") -> DatasetDetail:
        dataset = self._dataset_card(dataset_id, locale)
        return DatasetDetail(
            **dataset.model_dump(),
            default_engine="mix",
            available_engines=list(ENGINES),
            created_at=CREATED_AT,
            updated_at=UPDATED_AT,
        )

    def get_graph(
        self,
        dataset_id: str,
        limit: int = 500,
        search: str | None = None,
        entity_types: list[EntityType] | None = None,
        community_ids: list[str] | None = None,
        min_strength: float = 0.0,
        include_communities: bool = True,
    ) -> GraphResponse:
        graph = self._require_graph(dataset_id)
        nodes = self._filter_nodes(
            graph["nodes"],
            search=search,
            entity_types=entity_types,
            community_ids=community_ids,
        )[:limit]
        node_ids = {node.id for node in nodes}
        edges = [
            edge
            for edge in graph["edges"]
            if edge.source in node_ids and edge.target in node_ids and edge.strength >= min_strength
        ]
        communities = self._communities_for_nodes(graph["communities"], node_ids) if include_communities else []
        return self._graph_response(
            dataset_id=dataset_id,
            nodes=nodes,
            edges=edges,
            communities=communities,
            limit=limit,
            filters=GraphFilters(
                search=search,
                entity_types=entity_types,
                community_ids=community_ids,
                min_strength=min_strength,
            ),
            total_nodes=len(graph["nodes"]),
            total_edges=len(graph["edges"]),
        )

    def get_node_detail(self, dataset_id: str, node_id: str) -> NodeDetailResponse:
        graph = self._require_graph(dataset_id)
        node = self._require_node(graph, dataset_id, node_id)
        node_by_id = {item.id: item for item in graph["nodes"]}
        incoming: list[NodeRelation] = []
        outgoing: list[NodeRelation] = []

        for edge in graph["edges"]:
            if edge.source == node_id:
                other = node_by_id[edge.target]
                outgoing.append(
                    self._node_relation(edge, direction="outgoing", other_node=other)
                )
            elif edge.target == node_id:
                other = node_by_id[edge.source]
                incoming.append(
                    self._node_relation(edge, direction="incoming", other_node=other)
                )

        chunks = [
            chunk
            for chunk in graph["chunks"]
            if chunk.id in set(node.source_chunk_ids)
        ]
        return NodeDetailResponse(
            node=node,
            incoming_relations=incoming,
            outgoing_relations=outgoing,
            provenance_chunks=chunks,
        )

    def get_neighbors(
        self,
        dataset_id: str,
        node_id: str,
        depth: int = 1,
        limit: int = 100,
        min_strength: float = 0.0,
    ) -> GraphResponse:
        graph = self._require_graph(dataset_id)
        self._require_node(graph, dataset_id, node_id)

        adjacency: dict[str, set[str]] = {}
        for edge in graph["edges"]:
            if edge.strength < min_strength:
                continue
            adjacency.setdefault(edge.source, set()).add(edge.target)
            adjacency.setdefault(edge.target, set()).add(edge.source)

        selected: list[str] = []
        seen = {node_id}
        queue: deque[tuple[str, int]] = deque([(node_id, 0)])
        while queue and len(selected) < limit:
            current, current_depth = queue.popleft()
            selected.append(current)
            if current_depth >= depth:
                continue
            for neighbor in sorted(adjacency.get(current, set())):
                if neighbor in seen:
                    continue
                seen.add(neighbor)
                queue.append((neighbor, current_depth + 1))

        node_ids = set(selected)
        nodes = [node for node in graph["nodes"] if node.id in node_ids]
        edges = [
            edge
            for edge in graph["edges"]
            if edge.source in node_ids and edge.target in node_ids and edge.strength >= min_strength
        ]
        return self._graph_response(
            dataset_id=dataset_id,
            nodes=nodes,
            edges=edges,
            communities=self._communities_for_nodes(graph["communities"], node_ids),
            limit=limit,
            filters=GraphFilters(min_strength=min_strength),
            total_nodes=len(graph["nodes"]),
            total_edges=len(graph["edges"]),
        )

    def get_communities(self, dataset_id: str) -> GraphCommunitiesResponse:
        graph = self._require_graph(dataset_id)
        return GraphCommunitiesResponse(dataset_id=dataset_id, communities=graph["communities"])

    def get_suggestions(self, dataset_id: str, locale: Locale = "ru") -> SuggestionsResponse:
        dataset = self._require_dataset(dataset_id)
        return SuggestionsResponse(
            dataset_id=dataset_id,
            suggestions=list(dataset["suggested_questions"][locale]),
        )

    def answer(self, dataset_id: str, request: AgentRequest) -> AgentResponse:
        graph = self._require_graph(dataset_id)
        selected_nodes = self._select_trace_nodes(graph["nodes"], request.message, request.top_k)
        selected_node_ids = {node.id for node in selected_nodes}
        selected_edges = [
            edge
            for edge in graph["edges"]
            if edge.source in selected_node_ids or edge.target in selected_node_ids
        ][: max(1, min(5, request.top_k))]
        selected_chunk_ids = set()
        for node in selected_nodes:
            selected_chunk_ids.update(node.source_chunk_ids)
        selected_chunks = [chunk for chunk in graph["chunks"] if chunk.id in selected_chunk_ids][:3]
        selected_communities = self._communities_for_nodes(graph["communities"], selected_node_ids)

        retrieval_ms = 90 + (len(request.message) % 80) + request.top_k * 4
        generation_ms = 520 + len(request.message) * 8
        total_ms = retrieval_ms + generation_ms
        trace = None
        if request.include_trace:
            trace = AnswerTrace(
                engine=request.engine,
                top_k=request.top_k,
                rerank=request.rerank,
                entities=[
                    TraceEntity(
                        id=node.id,
                        label=node.label,
                        entity_type=node.entity_type,
                        score=round(max(0.35, 0.98 - idx * 0.08), 3),
                    )
                    for idx, node in enumerate(selected_nodes[: request.top_k])
                ],
                relations=[
                    TraceRelation(
                        id=edge.id,
                        source=edge.source,
                        target=edge.target,
                        relation_type=edge.relation_type,
                        strength=edge.strength,
                    )
                    for edge in selected_edges
                ],
                chunks=[
                    TraceChunk(
                        id=chunk.id,
                        content=chunk.content,
                        doc_id=chunk.doc_id,
                        score=round(max(0.4, 0.92 - idx * 0.09), 3),
                    )
                    for idx, chunk in enumerate(selected_chunks)
                ],
                communities=[
                    TraceCommunity(
                        id=community.id,
                        title=community.title,
                        summary=community.summary,
                        score=round(max(0.45, 0.88 - idx * 0.07), 3),
                    )
                    for idx, community in enumerate(selected_communities)
                ],
                timings=TraceTimings(
                    retrieval_ms=retrieval_ms,
                    generation_ms=generation_ms,
                    total_ms=total_ms,
                ),
                energy=TraceEnergy(
                    watt_hours=round((total_ms / 1000) * 0.11, 3),
                    estimated=True,
                ),
                highlight=GraphHighlight(
                    node_ids=[node.id for node in selected_nodes],
                    edge_ids=[edge.id for edge in selected_edges],
                    community_ids=[community.id for community in selected_communities],
                ),
            )

        answer = self._answer_text(request.locale, request.engine, selected_nodes, selected_chunks)
        return AgentResponse(
            message=AssistantMessage(
                id=f"msg-{md5((dataset_id + request.message).encode()).hexdigest()[:12]}",
                content=answer,
                created_at=datetime.now(timezone.utc),
                trace=trace,
            )
        )

    def _dataset_card(self, dataset_id: str, locale: Locale) -> DatasetCard:
        dataset = self._require_dataset(dataset_id)
        graph = self._require_graph(dataset_id)
        return DatasetCard(
            id=dataset["id"],
            title=dataset["title"][locale],
            domain=dataset["domain"][locale],
            description=dataset["description"][locale],
            language=dataset["language"],
            tags=list(dataset["tags"]),
            stats=DatasetStats(**dataset["stats"]),
            badges=[DatasetBadge(**badge) for badge in dataset["badges"]],
            preview=DatasetPreview(
                node_count=len(graph["nodes"]),
                edge_count=len(graph["edges"]),
                primary_entity_types=list(dataset["primary_entity_types"]),
            ),
            suggested_questions=list(dataset["suggested_questions"][locale]),
        )

    def _build_graph(self, dataset_id: str) -> dict[str, list]:
        seed = GRAPH_SEEDS[dataset_id]
        community_by_node: dict[str, str] = {}
        communities = [
            CommunitySummary(
                id=item[0],
                title=item[1],
                summary=item[2],
                level=0,
                size=len(item[3]),
                node_ids=list(item[3]),
            )
            for item in seed["communities"]
        ]
        for community in communities:
            for node_id in community.node_ids:
                community_by_node[node_id] = community.id

        chunks = [
            ProvenanceChunk(id=item[0], content=item[1], doc_id=item[2], chunk_order_idx=idx)
            for idx, item in enumerate(seed["chunks"])
        ]
        chunk_ids = [chunk.id for chunk in chunks]
        degree_by_node = {node[0]: 0 for node in seed["nodes"]}
        for _, source_idx, target_idx, _, _ in EDGE_PATTERN:
            source_id = seed["nodes"][source_idx][0]
            target_id = seed["nodes"][target_idx][0]
            degree_by_node[source_id] += 1
            degree_by_node[target_id] += 1

        nodes = [
            GraphNode(
                id=item[0],
                label=item[1],
                entity_type=item[2],
                description=item[3],
                degree=degree_by_node[item[0]],
                community_id=community_by_node.get(item[0]),
                x=round(math.cos(idx * 0.9) * 210 + idx * 6, 3),
                y=round(math.sin(idx * 0.9) * 170 - idx * 4, 3),
                source_chunk_ids=[chunk_ids[idx % len(chunk_ids)]],
            )
            for idx, item in enumerate(seed["nodes"])
        ]

        edges = []
        for edge_suffix, source_idx, target_idx, relation_type, strength in EDGE_PATTERN:
            source_id = seed["nodes"][source_idx][0]
            target_id = seed["nodes"][target_idx][0]
            source_label = seed["nodes"][source_idx][1]
            target_label = seed["nodes"][target_idx][1]
            edges.append(
                GraphEdge(
                    id=f"{dataset_id}-{edge_suffix}",
                    source=source_id,
                    target=target_id,
                    relation_type=relation_type,
                    description=f"{source_label} is linked to {target_label} by {relation_type}.",
                    strength=strength,
                    source_chunk_ids=[chunk_ids[source_idx % len(chunk_ids)]],
                )
            )
        return {"nodes": nodes, "edges": edges, "communities": communities, "chunks": chunks}

    def _filter_nodes(
        self,
        nodes: list[GraphNode],
        search: str | None,
        entity_types: list[EntityType] | None,
        community_ids: list[str] | None,
    ) -> list[GraphNode]:
        filtered = nodes
        if search:
            needle = search.casefold()
            filtered = [
                node
                for node in filtered
                if needle in node.label.casefold() or needle in node.description.casefold()
            ]
        if entity_types:
            allowed_types = set(entity_types)
            filtered = [node for node in filtered if node.entity_type in allowed_types]
        if community_ids:
            allowed_communities = set(community_ids)
            filtered = [node for node in filtered if node.community_id in allowed_communities]
        return filtered

    def _graph_response(
        self,
        dataset_id: str,
        nodes: list[GraphNode],
        edges: list[GraphEdge],
        communities: list[CommunitySummary],
        limit: int,
        filters: GraphFilters,
        total_nodes: int,
        total_edges: int,
    ) -> GraphResponse:
        return GraphResponse(
            nodes=nodes,
            edges=edges,
            communities=communities,
            meta=GraphMeta(
                dataset_id=dataset_id,
                total_nodes=total_nodes,
                total_edges=total_edges,
                returned_nodes=len(nodes),
                returned_edges=len(edges),
                limit=limit,
                filters=filters,
            ),
        )

    def _communities_for_nodes(
        self,
        communities: list[CommunitySummary],
        node_ids: Iterable[str],
    ) -> list[CommunitySummary]:
        selected = set(node_ids)
        return [
            community
            for community in communities
            if selected.intersection(community.node_ids)
        ]

    def _node_relation(self, edge: GraphEdge, direction: str, other_node: GraphNode) -> NodeRelation:
        return NodeRelation(
            **edge.model_dump(),
            direction=direction,
            other_node_id=other_node.id,
            other_node_label=other_node.label,
        )

    def _select_trace_nodes(self, nodes: list[GraphNode], message: str, top_k: int) -> list[GraphNode]:
        terms = {part.casefold().strip(".,?!:;()[]") for part in message.split() if len(part) > 2}

        def score(node: GraphNode) -> tuple[int, int, str]:
            haystack = f"{node.label} {node.description}".casefold()
            matches = sum(1 for term in terms if term and term in haystack)
            return (matches, node.degree, node.id)

        ranked = sorted(nodes, key=score, reverse=True)
        return ranked[: min(top_k, len(ranked))]

    def _answer_text(
        self,
        locale: Locale,
        engine: str,
        selected_nodes: list[GraphNode],
        selected_chunks: list[ProvenanceChunk],
    ) -> str:
        names = ", ".join(node.label for node in selected_nodes[:3])
        evidence = selected_chunks[0].content if selected_chunks else "No supporting chunk was selected."
        if locale == "ru":
            return (
                f"Mock answer using {engine}: relevant graph entities are {names}. "
                f"Evidence: {evidence}"
            )
        return (
            f"Mock answer using {engine}: relevant graph entities are {names}. "
            f"Evidence: {evidence}"
        )

    def _require_dataset(self, dataset_id: str) -> dict:
        try:
            return self._dataset_defs[dataset_id]
        except KeyError as exc:
            raise HTTPException(
                status_code=404,
                detail={
                    "code": "dataset_not_found",
                    "message": f"Dataset '{dataset_id}' was not found.",
                },
            ) from exc

    def _require_graph(self, dataset_id: str) -> dict[str, list]:
        self._require_dataset(dataset_id)
        return self._graphs[dataset_id]

    def _require_node(self, graph: dict[str, list], dataset_id: str, node_id: str) -> GraphNode:
        for node in graph["nodes"]:
            if node.id == node_id:
                return node
        raise HTTPException(
            status_code=404,
            detail={
                "code": "node_not_found",
                "message": f"Node '{node_id}' was not found in dataset '{dataset_id}'.",
            },
        )
