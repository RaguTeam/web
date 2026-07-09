from __future__ import annotations

import json
import logging
import math
import os
import re
import time
from ast import literal_eval
from collections import Counter, defaultdict, deque
from dataclasses import dataclass
from datetime import datetime, timezone
from hashlib import md5
from html import unescape
from pathlib import Path
from typing import Any, Iterable

from fastapi import HTTPException

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
from ragu_web_api.schemas.datasets import (
    DatasetBadge,
    DatasetCard,
    DatasetDetail,
    DatasetPreview,
    DatasetStats,
)
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

REQUIRED_INDEX_FILES = ("knowledge_graph.gml", "kv_chunks.json")
TOKEN_RE = re.compile(r"[A-Za-zА-Яа-яЁё0-9_]{3,}")
LOGGER = logging.getLogger(__name__)


@dataclass(frozen=True)
class IndexDefinition:
    id: str
    title: str
    path: Path
    stats: DatasetStats
    primary_entity_types: list[str]
    language: str
    created_at: datetime
    updated_at: datetime


@dataclass(frozen=True)
class RetrievalResult:
    nodes: list[tuple[GraphNode, float]]
    edges: list[tuple[GraphEdge, float]]
    chunks: list[tuple[ProvenanceChunk, float]]
    communities: list[tuple[CommunitySummary, float]]


@dataclass(frozen=True)
class RaguEmbedderConfig:
    api_key: str | None
    base_url: str | None
    model_name: str | None
    provider: str

    @property
    def is_configured(self) -> bool:
        return bool(self.model_name and (self.api_key or self.base_url))


@dataclass
class LoadedIndex:
    definition: IndexDefinition
    nodes: list[GraphNode]
    edges: list[GraphEdge]
    communities: list[CommunitySummary]
    chunks: list[ProvenanceChunk]
    node_by_id: dict[str, GraphNode]
    chunk_by_id: dict[str, ProvenanceChunk]
    outgoing_edges: dict[str, list[GraphEdge]]
    incoming_edges: dict[str, list[GraphEdge]]
    adjacency: dict[str, set[str]]
    community_by_id: dict[str, CommunitySummary]
    nodes_by_chunk: dict[str, list[GraphNode]]
    edges_by_chunk: dict[str, list[GraphEdge]]


@dataclass(frozen=True)
class LLMConfig:
    api_key: str | None
    base_url: str | None
    model_name: str | None
    project: str | None
    provider: str

    @property
    def is_configured(self) -> bool:
        return bool(self.api_key and self.model_name)


class OpenAICompatibleLLM:
    def __init__(self, config: LLMConfig) -> None:
        self.config = config
        self._client: Any | None = None

    async def complete(self, messages: list[dict[str, str]]) -> str | None:
        if not self.config.is_configured:
            return None

        try:
            from openai import AsyncOpenAI
        except ModuleNotFoundError:
            return None

        if self._client is None:
            kwargs: dict[str, Any] = {
                "api_key": self.config.api_key,
                "base_url": self.config.base_url,
                "max_retries": 0,
            }
            if self.config.project:
                kwargs["project"] = self.config.project
            self._client = AsyncOpenAI(**kwargs)

        response = await self._client.chat.completions.create(
            model=self.config.model_name,
            messages=messages,
            temperature=0.2,
            max_tokens=900,
        )
        return response.choices[0].message.content or ""


class RaguMixSearchAdapter:
    def __init__(self, config: RaguEmbedderConfig) -> None:
        self.config = config
        self._engines: dict[str, Any] = {}

    async def search(self, index: LoadedIndex, query: str, top_k: int) -> RetrievalResult | None:
        if not self.config.is_configured:
            return None
        if not _is_ragu_vector_index(index.definition.path):
            return None

        engine = self._engines.get(index.definition.id)
        if engine is None:
            engine = self._build_engine(index.definition)
            self._engines[index.definition.id] = engine

        result = await engine.a_search(query, top_k=top_k)
        return _retrieval_from_ragu_mix(index, result, top_k)

    def _build_engine(self, definition: IndexDefinition) -> Any:
        try:
            from ragu import KnowledgeGraph, LocalSearchEngine, MixSearchEngine, NaiveSearchEngine, Settings
            from ragu.graph.index import StorageArguments
            from ragu.models.embedder import EmbedderOpenAI
            from ragu.models.openai import CachedAsyncOpenAI
        except Exception as exc:
            raise RuntimeError(f"RAGU search package is unavailable: {exc}") from exc

        embedding_dim = _ragu_embedding_dim(definition.path)
        if embedding_dim is None:
            raise RuntimeError(f"RAGU vector index at '{definition.path}' has no embedding_dim.")

        Settings.storage_folder = str(definition.path)
        Settings.language = _ragu_language(definition.language)

        client = CachedAsyncOpenAI(
            base_url=self.config.base_url,
            api_key=self.config.api_key or "unused",
            rate_max_simultaneous=4,
            rate_max_per_minute=240,
            retry_times_sec=None,
            embed_timeout=30.0,
        )
        embedder = EmbedderOpenAI(
            client=client,
            model_name=self.config.model_name,
            dim=embedding_dim,
            batch_size=32,
            max_concurrent_batches=2,
        )

        knowledge_graph = KnowledgeGraph(
            llm=_RaguSearchOnlyLLM(),
            embedder=embedder,
            storage_settings=StorageArguments(),
            language=Settings.language,
        )
        engines = [
            LocalSearchEngine(
                llm=_RaguSearchOnlyLLM(),
                knowledge_graph=knowledge_graph,
                embedder=embedder,
                language=Settings.language,
            ),
            NaiveSearchEngine(
                llm=_RaguSearchOnlyLLM(),
                knowledge_graph=knowledge_graph,
                embedder=embedder,
                language=Settings.language,
            ),
        ]
        return MixSearchEngine(
            llm=_RaguSearchOnlyLLM(),
            engines=engines,
            allow_partial_failures=True,
            language=Settings.language,
        )


class _RaguSearchOnlyLLM:
    async def chat_completion(self, *_args: Any, **_kwargs: Any) -> str:
        raise RuntimeError("RAGU LLM generation is disabled in the web API search adapter.")


class IndexRepository:
    def __init__(
        self,
        indexes_root: Path | None = None,
        llm_config: LLMConfig | None = None,
    ) -> None:
        env = _merged_env()
        self.indexes_root = indexes_root or _resolve_indexes_root(env)
        self._definitions = self._discover_indexes()
        self._loaded: dict[str, LoadedIndex] = {}
        self._llm = OpenAICompatibleLLM(llm_config or _llm_config_from_env(env))
        self._ragu_search = RaguMixSearchAdapter(_ragu_embedder_config_from_env(env))

    def list_datasets(self, locale: Locale = "ru") -> list[DatasetCard]:
        return [self._dataset_card(item, locale) for item in self._definitions.values()]

    def get_dataset(self, dataset_id: str, locale: Locale = "ru") -> DatasetDetail:
        definition = self._require_definition(dataset_id)
        dataset = self._dataset_card(definition, locale)
        return DatasetDetail(
            **dataset.model_dump(),
            default_engine="mix",
            available_engines=["naive", "local", "global", "mix", "query_plan"],
            created_at=definition.created_at,
            updated_at=definition.updated_at,
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
        index = self._load_index(dataset_id)
        nodes = self._filter_nodes(
            index.nodes,
            search=search,
            entity_types=entity_types,
            community_ids=community_ids,
        )
        nodes = sorted(nodes, key=lambda node: (-node.degree, node.label.casefold(), node.id))[:limit]
        node_ids = {node.id for node in nodes}
        edges = [
            edge
            for edge in index.edges
            if edge.source in node_ids and edge.target in node_ids and edge.strength >= min_strength
        ]
        communities = self._communities_for_nodes(index, node_ids) if include_communities else []
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
            total_nodes=len(index.nodes),
            total_edges=len(index.edges),
        )

    def get_node_detail(self, dataset_id: str, node_id: str) -> NodeDetailResponse:
        index = self._load_index(dataset_id)
        node = self._require_node(index, dataset_id, node_id)

        incoming = [
            self._node_relation(edge, direction="incoming", other_node=index.node_by_id[edge.source])
            for edge in index.incoming_edges.get(node_id, [])
            if edge.source in index.node_by_id
        ]
        outgoing = [
            self._node_relation(edge, direction="outgoing", other_node=index.node_by_id[edge.target])
            for edge in index.outgoing_edges.get(node_id, [])
            if edge.target in index.node_by_id
        ]
        chunks = [
            index.chunk_by_id[chunk_id]
            for chunk_id in node.source_chunk_ids
            if chunk_id in index.chunk_by_id
        ]
        return NodeDetailResponse(
            node=node,
            incoming_relations=incoming[:50],
            outgoing_relations=outgoing[:50],
            provenance_chunks=chunks[:20],
        )

    def get_neighbors(
        self,
        dataset_id: str,
        node_id: str,
        depth: int = 1,
        limit: int = 100,
        min_strength: float = 0.0,
    ) -> GraphResponse:
        index = self._load_index(dataset_id)
        self._require_node(index, dataset_id, node_id)

        adjacency: dict[str, set[str]] = defaultdict(set)
        for edge in index.edges:
            if edge.strength < min_strength:
                continue
            adjacency[edge.source].add(edge.target)
            adjacency[edge.target].add(edge.source)

        selected: list[str] = []
        seen = {node_id}
        queue: deque[tuple[str, int]] = deque([(node_id, 0)])
        while queue and len(selected) < limit:
            current, current_depth = queue.popleft()
            selected.append(current)
            if current_depth >= depth:
                continue
            neighbors = sorted(
                adjacency.get(current, set()),
                key=lambda item: (-(index.node_by_id[item].degree if item in index.node_by_id else 0), item),
            )
            for neighbor in neighbors:
                if neighbor in seen:
                    continue
                seen.add(neighbor)
                queue.append((neighbor, current_depth + 1))

        node_ids = set(selected)
        nodes = [index.node_by_id[item] for item in selected if item in index.node_by_id]
        edges = [
            edge
            for edge in index.edges
            if edge.source in node_ids and edge.target in node_ids and edge.strength >= min_strength
        ]
        return self._graph_response(
            dataset_id=dataset_id,
            nodes=nodes,
            edges=edges,
            communities=self._communities_for_nodes(index, node_ids),
            limit=limit,
            filters=GraphFilters(min_strength=min_strength),
            total_nodes=len(index.nodes),
            total_edges=len(index.edges),
        )

    def get_communities(self, dataset_id: str) -> GraphCommunitiesResponse:
        index = self._load_index(dataset_id)
        return GraphCommunitiesResponse(dataset_id=dataset_id, communities=index.communities)

    def get_suggestions(self, dataset_id: str, locale: Locale = "ru") -> SuggestionsResponse:
        index = self._load_index(dataset_id)
        return SuggestionsResponse(
            dataset_id=dataset_id,
            suggestions=self._suggestions(index, locale),
        )

    async def answer(self, dataset_id: str, request: AgentRequest) -> AgentResponse:
        index = self._load_index(dataset_id)

        retrieval_start = time.perf_counter()
        retrieval = await self._retrieve_with_ragu(index, request)
        retrieval_ms = int((time.perf_counter() - retrieval_start) * 1000)

        generation_start = time.perf_counter()
        llm_error: str | None = None
        answer = None
        try:
            answer = await self._answer_with_llm(index, request, retrieval)
        except Exception as exc:
            llm_error = f"{type(exc).__name__}: {exc}"
        if not answer:
            answer = self._fallback_answer(request, retrieval, llm_error)
        generation_ms = int((time.perf_counter() - generation_start) * 1000)
        total_ms = retrieval_ms + generation_ms

        selected_nodes = [item[0] for item in retrieval.nodes[: request.top_k]]
        selected_edges = [item[0] for item in retrieval.edges[: request.top_k]]
        selected_chunks = [item[0] for item in retrieval.chunks[: request.top_k]]
        selected_communities = [item[0] for item in retrieval.communities[: request.top_k]]

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
                        score=_clamp_score(score),
                    )
                    for node, score in retrieval.nodes[: request.top_k]
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
                        score=_clamp_score(score),
                    )
                    for chunk, score in retrieval.chunks[: request.top_k]
                ],
                communities=[
                    TraceCommunity(
                        id=community.id,
                        title=community.title,
                        summary=community.summary,
                        score=_clamp_score(score),
                    )
                    for community, score in retrieval.communities[: request.top_k]
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

        return AgentResponse(
            message=AssistantMessage(
                id=f"msg-{md5((dataset_id + request.message).encode()).hexdigest()[:12]}",
                content=answer,
                created_at=datetime.now(timezone.utc),
                trace=trace,
            )
        )

    def _discover_indexes(self) -> dict[str, IndexDefinition]:
        candidates = _index_candidates(self.indexes_root)
        definitions: dict[str, IndexDefinition] = {}
        for path in candidates:
            definition = self._index_definition(path)
            definitions[definition.id] = definition
        return definitions

    def _index_definition(self, path: Path) -> IndexDefinition:
        graph_path = path / "knowledge_graph.gml"
        chunks_path = path / "kv_chunks.json"
        node_count, edge_count, entity_types = _scan_gml_summary(graph_path)
        chunks = _read_json_object(chunks_path)
        doc_ids = {
            str(item.get("doc_id"))
            for item in chunks.values()
            if isinstance(item, dict) and item.get("doc_id")
        }
        primary_entity_types = [item for item, _ in entity_types.most_common(6)]
        language = _detect_language(
            " ".join(
                str(item.get("content", ""))
                for item in list(chunks.values())[:20]
                if isinstance(item, dict)
            )
        )
        updated_at = _mtime_max(path)
        return IndexDefinition(
            id=_dataset_id_for_path(path, self.indexes_root),
            title=_title_for_path(path, self.indexes_root),
            path=path,
            stats=DatasetStats(
                nodes=node_count,
                edges=edge_count,
                communities=max(1, len(primary_entity_types)),
                chunks=len(chunks),
                documents=len(doc_ids),
            ),
            primary_entity_types=primary_entity_types,
            language=language,
            created_at=_mtime_min(path),
            updated_at=updated_at,
        )

    def _dataset_card(self, definition: IndexDefinition, locale: Locale) -> DatasetCard:
        title = definition.title
        domain = _domain_for_types(definition.primary_entity_types, locale)
        description = _description_for_definition(definition, locale)
        return DatasetCard(
            id=definition.id,
            title=title,
            domain=domain,
            description=description,
            language=definition.language,  # type: ignore[arg-type]
            tags=["ragu", "preindexed", *definition.primary_entity_types[:3]],
            stats=definition.stats,
            badges=[
                DatasetBadge(label="source", value="RAGU"),
                DatasetBadge(label="llm", value=self._llm.config.provider),
            ],
            preview=DatasetPreview(
                node_count=definition.stats.nodes,
                edge_count=definition.stats.edges,
                primary_entity_types=definition.primary_entity_types,
            ),
            suggested_questions=self._suggestions_for_definition(definition, locale),
        )

    def _load_index(self, dataset_id: str) -> LoadedIndex:
        if dataset_id in self._loaded:
            return self._loaded[dataset_id]

        definition = self._require_definition(dataset_id)
        node_payloads, edge_payloads = _read_gml_payloads(definition.path / "knowledge_graph.gml")
        chunks_raw = _read_json_object(definition.path / "kv_chunks.json")
        chunks = [
            ProvenanceChunk(
                id=str(chunk_id),
                content=str(payload.get("content", "")),
                doc_id=str(payload.get("doc_id", "")),
                chunk_order_idx=_safe_int(payload.get("chunk_order_idx"), 0),
            )
            for chunk_id, payload in chunks_raw.items()
            if isinstance(payload, dict)
        ]
        chunk_by_id = {chunk.id: chunk for chunk in chunks}

        degree_by_node: Counter[str] = Counter()
        for source, target, _, _ in edge_payloads:
            degree_by_node[source] += 1
            degree_by_node[target] += 1

        community_id_by_node, communities = _build_communities(node_payloads, definition)
        nodes = [
            _graph_node(
                node_id=node_id,
                payload=payload,
                degree=_safe_int(degree_by_node.get(node_id), 0),
                community_id=community_id_by_node.get(node_id),
                ordinal=ordinal,
            )
            for ordinal, (node_id, payload) in enumerate(node_payloads)
        ]
        node_by_id = {node.id: node for node in nodes}

        edges: list[GraphEdge] = []
        outgoing_edges: dict[str, list[GraphEdge]] = defaultdict(list)
        incoming_edges: dict[str, list[GraphEdge]] = defaultdict(list)
        adjacency: dict[str, set[str]] = defaultdict(set)
        for source, target, key, payload in edge_payloads:
            edge = _graph_edge(source, target, key, payload)
            edges.append(edge)
            outgoing_edges[edge.source].append(edge)
            incoming_edges[edge.target].append(edge)
            adjacency[edge.source].add(edge.target)
            adjacency[edge.target].add(edge.source)

        nodes_by_chunk: dict[str, list[GraphNode]] = defaultdict(list)
        for node in nodes:
            for chunk_id in node.source_chunk_ids:
                nodes_by_chunk[chunk_id].append(node)

        edges_by_chunk: dict[str, list[GraphEdge]] = defaultdict(list)
        for edge in edges:
            for chunk_id in edge.source_chunk_ids:
                edges_by_chunk[chunk_id].append(edge)

        loaded = LoadedIndex(
            definition=definition,
            nodes=nodes,
            edges=edges,
            communities=communities,
            chunks=chunks,
            node_by_id=node_by_id,
            chunk_by_id=chunk_by_id,
            outgoing_edges=dict(outgoing_edges),
            incoming_edges=dict(incoming_edges),
            adjacency=dict(adjacency),
            community_by_id={community.id: community for community in communities},
            nodes_by_chunk=dict(nodes_by_chunk),
            edges_by_chunk=dict(edges_by_chunk),
        )
        self._loaded[dataset_id] = loaded
        return loaded

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
                if needle in node.label.casefold()
                or needle in node.description.casefold()
                or needle in node.entity_type.casefold()
            ]
        if entity_types:
            allowed = {item.casefold() for item in entity_types}
            filtered = [node for node in filtered if node.entity_type.casefold() in allowed]
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
        index: LoadedIndex,
        node_ids: Iterable[str],
    ) -> list[CommunitySummary]:
        selected = set(node_ids)
        return [
            community
            for community in index.communities
            if selected.intersection(community.node_ids)
        ]

    def _node_relation(self, edge: GraphEdge, direction: str, other_node: GraphNode) -> NodeRelation:
        return NodeRelation(
            **edge.model_dump(),
            direction=direction,
            other_node_id=other_node.id,
            other_node_label=other_node.label,
        )

    async def _retrieve_with_ragu(self, index: LoadedIndex, request: AgentRequest) -> RetrievalResult:
        try:
            retrieval = await self._ragu_search.search(index, request.message, request.top_k)
        except Exception as exc:
            LOGGER.warning(
                "RAGU MixSearchEngine failed for dataset '%s'; falling back to local retrieval: %s",
                index.definition.id,
                exc,
            )
            retrieval = None
        if retrieval is None or not (retrieval.nodes or retrieval.chunks):
            return self._retrieve(index, request.message, request.top_k)
        return retrieval

    def _retrieve(self, index: LoadedIndex, query: str, top_k: int) -> RetrievalResult:
        terms = _query_terms(query)
        chunk_scores = _rank_items(
            ((chunk, f"{chunk.content} {chunk.doc_id}") for chunk in index.chunks),
            terms,
            top_k=max(top_k * 2, 12),
        )
        node_scores = _rank_items(
            ((node, f"{node.label} {node.entity_type} {node.description}") for node in index.nodes),
            terms,
            top_k=max(top_k * 2, 12),
            degree_getter=lambda node: node.degree,
        )
        edge_scores = _rank_items(
            (
                (
                    edge,
                    f"{edge.relation_type} {edge.description} "
                    f"{index.node_by_id.get(edge.source).label if edge.source in index.node_by_id else ''} "
                    f"{index.node_by_id.get(edge.target).label if edge.target in index.node_by_id else ''}",
                )
                for edge in index.edges
            ),
            terms,
            top_k=max(top_k * 2, 12),
            degree_getter=lambda edge: int(edge.strength * 10),
        )

        extra_nodes: dict[str, tuple[GraphNode, float]] = {node.id: (node, score) for node, score in node_scores}
        extra_edges: dict[str, tuple[GraphEdge, float]] = {edge.id: (edge, score) for edge, score in edge_scores}
        for chunk, score in chunk_scores[:top_k]:
            for node in index.nodes_by_chunk.get(chunk.id, [])[:5]:
                extra_nodes.setdefault(node.id, (node, score * 0.85))
            for edge in index.edges_by_chunk.get(chunk.id, [])[:5]:
                extra_edges.setdefault(edge.id, (edge, score * 0.85))

        nodes = sorted(extra_nodes.values(), key=lambda item: (-item[1], -item[0].degree, item[0].label))[:top_k]
        edges = sorted(extra_edges.values(), key=lambda item: (-item[1], -item[0].strength, item[0].id))[:top_k]

        selected_community_ids = {
            node.community_id
            for node, _ in nodes
            if node.community_id
        }
        communities = [
            (index.community_by_id[community_id], 1.0)
            for community_id in selected_community_ids
            if community_id in index.community_by_id
        ]
        return RetrievalResult(
            nodes=nodes,
            edges=edges,
            chunks=chunk_scores[:top_k],
            communities=communities[:top_k],
        )

    async def _answer_with_llm(
        self,
        index: LoadedIndex,
        request: AgentRequest,
        retrieval: RetrievalResult,
    ) -> str | None:
        context = _render_context(index, retrieval)
        if not context.strip():
            return None

        history = [
            {"role": message.role, "content": message.content}
            for message in request.history[-8:]
        ]
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a graph RAG assistant. Answer only from the supplied graph "
                    "context and chunks. If the context is insufficient, say that clearly. "
                    "Reply in the user's language. Keep the answer concise and cite chunk "
                    "or entity IDs when useful."
                ),
            },
            *history,
            {
                "role": "user",
                "content": f"Question: {request.message}\n\nGraph context:\n{context}",
            },
        ]
        return await self._llm.complete(messages)

    def _fallback_answer(
        self,
        request: AgentRequest,
        retrieval: RetrievalResult,
        llm_error: str | None,
    ) -> str:
        nodes = ", ".join(node.label for node, _ in retrieval.nodes[:5]) or "no matching entities"
        chunks = retrieval.chunks[:3]
        evidence = "\n".join(
            f"[{chunk.id}] {_shorten(chunk.content, 420)}"
            for chunk, _ in chunks
        )
        if request.locale == "ru":
            prefix = "LLM не настроена" if not self._llm.config.is_configured else "LLM недоступна"
            if llm_error:
                prefix += f" ({llm_error})"
            return (
                f"{prefix}. По локальному поиску в графе релевантные сущности: {nodes}.\n\n"
                f"Опорные фрагменты:\n{evidence or 'Фрагменты не найдены.'}"
            )
        prefix = "LLM is not configured" if not self._llm.config.is_configured else "LLM is unavailable"
        if llm_error:
            prefix += f" ({llm_error})"
        return (
            f"{prefix}. Local graph retrieval found relevant entities: {nodes}.\n\n"
            f"Evidence:\n{evidence or 'No chunks found.'}"
        )

    def _suggestions(self, index: LoadedIndex, locale: Locale) -> list[str]:
        top_nodes = sorted(index.nodes, key=lambda node: (-node.degree, node.label.casefold()))[:4]
        if len(top_nodes) >= 2:
            if locale == "ru":
                return [
                    f"Что известно про {top_nodes[0].label}?",
                    f"Как связаны {top_nodes[0].label} и {top_nodes[1].label}?",
                    "Какие ключевые сущности и связи есть в этом графе?",
                ]
            return [
                f"What is known about {top_nodes[0].label}?",
                f"How are {top_nodes[0].label} and {top_nodes[1].label} connected?",
                "What are the key entities and relations in this graph?",
            ]
        return self._suggestions_for_definition(index.definition, locale)

    def _suggestions_for_definition(self, definition: IndexDefinition, locale: Locale) -> list[str]:
        primary = definition.primary_entity_types[0] if definition.primary_entity_types else "entities"
        if locale == "ru":
            return [
                f"Какие важные сущности типа {primary} есть в индексе?",
                "Какие связи чаще всего встречаются в графе?",
                "Кратко перескажи содержание выбранного индекса.",
            ]
        return [
            f"Which important {primary} entities are in this index?",
            "Which relations are most common in the graph?",
            "Summarize the selected index briefly.",
        ]

    def _require_definition(self, dataset_id: str) -> IndexDefinition:
        try:
            return self._definitions[dataset_id]
        except KeyError as exc:
            raise HTTPException(
                status_code=404,
                detail={
                    "code": "dataset_not_found",
                    "message": f"Dataset '{dataset_id}' was not found.",
                },
            ) from exc

    def _require_node(self, index: LoadedIndex, dataset_id: str, node_id: str) -> GraphNode:
        try:
            return index.node_by_id[node_id]
        except KeyError as exc:
            raise HTTPException(
                status_code=404,
                detail={
                    "code": "node_not_found",
                    "message": f"Node '{node_id}' was not found in dataset '{dataset_id}'.",
                },
            ) from exc


def _merged_env() -> dict[str, str]:
    values: dict[str, str] = {}
    for path in _dotenv_candidates():
        if path.exists():
            values.update(_read_dotenv(path))
    values.update(os.environ)
    return values


def _dotenv_candidates() -> list[Path]:
    roots = [Path.cwd()]
    roots.extend(Path(__file__).resolve().parents)
    candidates: list[Path] = []
    for root in roots:
        for name in (".env", ".env.local"):
            path = root / name
            if path not in candidates:
                candidates.append(path)
    return candidates


def _read_dotenv(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip("'\"")
        if key:
            values[key] = value
    return values


def _resolve_indexes_root(env: dict[str, str]) -> Path:
    configured = env.get("RAGU_INDEXES_DIR")
    if configured:
        return Path(configured).expanduser().resolve()

    search_roots = [Path.cwd(), *Path(__file__).resolve().parents]
    for root in search_roots:
        candidate = root / "RAGU" / "indexes"
        if candidate.exists():
            return candidate.resolve()
        candidate = root.parent / "RAGU" / "indexes"
        if candidate.exists():
            return candidate.resolve()
    return (Path.cwd() / "indexes").resolve()


def _llm_config_from_env(env: dict[str, str]) -> LLMConfig:
    yandex_api_key = env.get("YANDEX_API_KEY")
    yandex_folder_id = env.get("YANDEX_FOLDER_ID")
    yandex_model = env.get("YANDEX_LLM_MODEL", "yandexgpt-5-pro")
    if yandex_api_key and yandex_folder_id:
        model_name = (
            yandex_model
            if yandex_model.startswith("gpt://")
            else f"gpt://{yandex_folder_id}/{yandex_model}"
        )
        return LLMConfig(
            api_key=yandex_api_key,
            base_url=env.get("YANDEX_BASE_URL", "https://ai.api.cloud.yandex.net/v1"),
            model_name=model_name,
            project=yandex_folder_id,
            provider="YandexGPT",
        )

    api_key = env.get("OPENAI_API_KEY") or env.get("LLM_API_KEY")
    model_name = env.get("LLM_MODEL_NAME") or env.get("OPENAI_MODEL")
    return LLMConfig(
        api_key=api_key,
        base_url=env.get("OPENAI_BASE_URL") or env.get("LLM_BASE_URL"),
        model_name=model_name,
        project=env.get("OPENAI_PROJECT"),
        provider="OpenAI-compatible" if api_key and model_name else "not configured",
    )


def _ragu_embedder_config_from_env(env: dict[str, str]) -> RaguEmbedderConfig:
    base_url = (
        env.get("EMBEDDER_BASE_URL")
        or env.get("LOCAL_EMBEDDER_URL")
        or env.get("OPENAI_BASE_URL")
        or env.get("LLM_BASE_URL")
    )
    api_key = (
        env.get("EMBEDDER_API_KEY")
        or env.get("OPENAI_API_KEY")
        or env.get("LLM_API_KEY")
    )
    model_name = (
        env.get("EMBEDDER_MODEL_NAME")
        or env.get("OPENAI_EMBEDDING_MODEL")
        or env.get("OPENAI_EMBEDDER_MODEL")
        or env.get("LLM_EMBEDDER_MODEL")
    )
    return RaguEmbedderConfig(
        api_key=api_key,
        base_url=base_url,
        model_name=model_name,
        provider="OpenAI-compatible embeddings" if model_name else "not configured",
    )


def _is_ragu_vector_index(path: Path) -> bool:
    return all(
        (path / filename).exists()
        for filename in ("knowledge_graph.gml", "kv_chunks.json", "vdb_entity.json", "vdb_chunk.json")
    )


def _ragu_embedding_dim(path: Path) -> int | None:
    for filename in ("vdb_entity.json", "vdb_chunk.json"):
        try:
            value = _read_json_object(path / filename).get("embedding_dim")
        except FileNotFoundError:
            continue
        dim = _safe_int(value, 0)
        if dim > 0:
            return dim
    return None


def _ragu_language(language: str) -> str:
    return "russian" if language == "ru" else "english"


def _retrieval_from_ragu_mix(index: LoadedIndex, ragu_retrieve: Any, top_k: int) -> RetrievalResult:
    edge_by_id = {edge.id: edge for edge in index.edges}
    nodes_by_id: dict[str, tuple[GraphNode, float]] = {}
    edges_by_id: dict[str, tuple[GraphEdge, float]] = {}
    chunks_by_id: dict[str, tuple[ProvenanceChunk, float]] = {}
    communities_by_id: dict[str, tuple[CommunitySummary, float]] = {}

    for child_retrieve in _ragu_child_retrieves(ragu_retrieve):
        child_result = getattr(child_retrieve, "result", None)
        if child_result is None:
            continue

        entity_scores = _ragu_metric_scores(child_retrieve, "entities", "relevance_score")
        for entity in getattr(child_result, "entities", []) or []:
            node_id = str(getattr(entity, "id", ""))
            node = index.node_by_id.get(node_id)
            if node is not None:
                _put_scored(nodes_by_id, node.id, node, entity_scores.get(node_id, 1.0))

        for relation in getattr(child_result, "relations", []) or []:
            edge_id = str(getattr(relation, "id", ""))
            edge = edge_by_id.get(edge_id)
            if edge is not None:
                _put_scored(edges_by_id, edge.id, edge, _safe_float(getattr(relation, "relation_strength", 1.0), 1.0))

        chunk_scores = _ragu_metric_scores(child_retrieve, "chunks", "score")
        result_chunks = getattr(child_result, "chunks", []) or []
        result_scores = list(getattr(child_result, "scores", []) or [])
        for idx, chunk in enumerate(result_chunks):
            chunk_id = str(getattr(chunk, "id", ""))
            provenance_chunk = index.chunk_by_id.get(chunk_id)
            if provenance_chunk is None:
                continue
            score = chunk_scores.get(chunk_id)
            if score is None and idx < len(result_scores):
                score = _safe_float(result_scores[idx], 1.0)
            _put_scored(chunks_by_id, provenance_chunk.id, provenance_chunk, score or 1.0)

        for summary in getattr(child_result, "summaries", []) or []:
            community_id = str(getattr(summary, "id", ""))
            community = index.community_by_id.get(community_id)
            if community is not None:
                _put_scored(communities_by_id, community.id, community, 1.0)

    for chunk, score in list(chunks_by_id.values())[:top_k]:
        for node in index.nodes_by_chunk.get(chunk.id, [])[:top_k]:
            _put_scored(nodes_by_id, node.id, node, score * 0.9)
        for edge in index.edges_by_chunk.get(chunk.id, [])[:top_k]:
            _put_scored(edges_by_id, edge.id, edge, score * 0.9)

    if not communities_by_id:
        for node, score in nodes_by_id.values():
            if node.community_id and node.community_id in index.community_by_id:
                community = index.community_by_id[node.community_id]
                _put_scored(communities_by_id, community.id, community, score)

    return RetrievalResult(
        nodes=sorted(
            nodes_by_id.values(),
            key=lambda item: (-item[1], -item[0].degree, item[0].label.casefold()),
        )[:top_k],
        edges=sorted(
            edges_by_id.values(),
            key=lambda item: (-item[1], -item[0].strength, item[0].id),
        )[:top_k],
        chunks=sorted(
            chunks_by_id.values(),
            key=lambda item: (-item[1], item[0].id),
        )[:top_k],
        communities=sorted(
            communities_by_id.values(),
            key=lambda item: (-item[1], -item[0].size, item[0].id),
        )[:top_k],
    )


def _ragu_child_retrieves(ragu_retrieve: Any) -> list[Any]:
    result = getattr(ragu_retrieve, "result", None)
    children = getattr(result, "results", None)
    if isinstance(children, list):
        return children
    return [ragu_retrieve]


def _ragu_metric_scores(retrieve: Any, key: str, score_key: str) -> dict[str, float]:
    metrics = getattr(retrieve, "metrics", {}) or {}
    items = metrics.get(key, []) if isinstance(metrics, dict) else []
    scores: dict[str, float] = {}
    if not isinstance(items, list):
        return scores
    for item in items:
        if not isinstance(item, dict):
            continue
        item_id = item.get("id")
        if item_id is None:
            continue
        scores[str(item_id)] = _safe_float(item.get(score_key), 1.0)
    return scores


def _put_scored(target: dict[str, tuple[Any, float]], key: str, item: Any, score: float) -> None:
    current = target.get(key)
    if current is None or score > current[1]:
        target[key] = (item, score)


def _index_candidates(root: Path) -> list[Path]:
    if _is_index_dir(root):
        return [root]
    if not root.exists():
        return []
    return sorted(path for path in root.iterdir() if path.is_dir() and _is_index_dir(path))


def _is_index_dir(path: Path) -> bool:
    return all((path / filename).exists() for filename in REQUIRED_INDEX_FILES)


def _scan_gml_summary(path: Path) -> tuple[int, int, Counter[str]]:
    node_count = 0
    edge_count = 0
    entity_types: Counter[str] = Counter()
    type_re = re.compile(r'^\s*entity_type\s+"?(.*?)"?\s*$')
    with path.open(encoding="utf-8") as file:
        for line in file:
            stripped = line.strip()
            if stripped == "node [":
                node_count += 1
            elif stripped == "edge [":
                edge_count += 1
            else:
                match = type_re.match(line)
                if match:
                    entity_types[match.group(1).strip('"')] += 1
    return node_count, edge_count, entity_types


def _read_json_object(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as file:
        data = json.load(file)
    return data if isinstance(data, dict) else {}


def _read_gml_payloads(
    path: Path,
) -> tuple[list[tuple[str, dict[str, Any]]], list[tuple[str, str, str, dict[str, Any]]]]:
    nodes: list[tuple[str, dict[str, Any]]] = []
    raw_edges: list[dict[str, Any]] = []
    id_to_label: dict[int, str] = {}
    block: str | None = None
    payload: dict[str, Any] = {}

    with path.open(encoding="utf-8") as file:
        for line in file:
            stripped = line.strip()
            if stripped == "node [":
                block = "node"
                payload = {}
                continue
            if stripped == "edge [":
                block = "edge"
                payload = {}
                continue
            if stripped == "]" and block:
                if block == "node":
                    numeric_id = _safe_int(payload.pop("id", len(nodes)))
                    label = str(payload.pop("label", numeric_id))
                    id_to_label[numeric_id] = label
                    nodes.append((label, payload))
                else:
                    raw_edges.append(payload)
                block = None
                payload = {}
                continue
            if not block or not stripped or " " not in stripped:
                continue

            key, raw_value = stripped.split(" ", 1)
            _payload_add(payload, key, _parse_gml_value(raw_value))

    edges: list[tuple[str, str, str, dict[str, Any]]] = []
    for ordinal, item in enumerate(raw_edges):
        source_raw = _safe_int(item.pop("source", -1), -1)
        target_raw = _safe_int(item.pop("target", -1), -1)
        source = id_to_label.get(source_raw, str(source_raw))
        target = id_to_label.get(target_raw, str(target_raw))
        key = str(item.pop("key", f"edge-{ordinal}"))
        edges.append((source, target, key, item))
    return nodes, edges


def _payload_add(payload: dict[str, Any], key: str, value: Any) -> None:
    if key not in payload:
        payload[key] = value
        return
    current = payload[key]
    if isinstance(current, list):
        current.append(value)
    else:
        payload[key] = [current, value]


def _parse_gml_value(raw_value: str) -> Any:
    raw_value = raw_value.strip()
    if raw_value.startswith('"') and raw_value.endswith('"'):
        try:
            parsed = literal_eval(raw_value)
        except (SyntaxError, ValueError):
            parsed = raw_value[1:-1].replace(r"\"", '"').replace(r"\\", "\\")
        if parsed == "[]":
            return []
        return unescape(str(parsed))
    try:
        return int(raw_value)
    except ValueError:
        try:
            return float(raw_value)
        except ValueError:
            return raw_value


def _mtime_min(path: Path) -> datetime:
    files = [item for item in path.iterdir() if item.is_file()]
    timestamp = min((item.stat().st_mtime for item in files), default=path.stat().st_mtime)
    return datetime.fromtimestamp(timestamp, timezone.utc)


def _mtime_max(path: Path) -> datetime:
    files = [item for item in path.iterdir() if item.is_file()]
    timestamp = max((item.stat().st_mtime for item in files), default=path.stat().st_mtime)
    return datetime.fromtimestamp(timestamp, timezone.utc)


def _slugify(value: str) -> str:
    lowered = value.casefold().strip()
    slug = re.sub(r"[^a-z0-9а-яё]+", "-", lowered, flags=re.IGNORECASE).strip("-")
    return slug or "index"


def _dataset_id_for_path(path: Path, root: Path) -> str:
    if path == root and path.name == "indexes" and path.parent.name:
        return _slugify(path.name)
    return _slugify(path.name)


def _title_for_path(path: Path, root: Path) -> str:
    if path == root and path.name == "indexes" and path.parent.name:
        return f"{path.parent.name} index"
    return path.name.replace("_", " ").replace("-", " ").strip().title() or "RAGU index"


def _detect_language(text: str) -> str:
    cyrillic = len(re.findall(r"[А-Яа-яЁё]", text))
    latin = len(re.findall(r"[A-Za-z]", text))
    if cyrillic and latin and min(cyrillic, latin) / max(cyrillic, latin) > 0.15:
        return "mixed"
    if cyrillic > latin:
        return "ru"
    return "en"


def _domain_for_types(entity_types: list[str], locale: Locale) -> str:
    type_set = {item.casefold() for item in entity_types}
    if {"geneorprotein", "diseaseordisorder", "drugorchemical", "biologicalprocess"} & type_set:
        return "Медицина и биология" if locale == "ru" else "Medicine and biology"
    if {"law", "penalty"} & type_set:
        return "Право" if locale == "ru" else "Law"
    if {"person", "organization", "location"} & type_set:
        return "Смешанный корпус" if locale == "ru" else "Mixed corpus"
    return "Граф знаний" if locale == "ru" else "Knowledge graph"


def _description_for_definition(definition: IndexDefinition, locale: Locale) -> str:
    if locale == "ru":
        return (
            f"Готовый RAGU-индекс: {definition.stats.nodes} сущностей, "
            f"{definition.stats.edges} связей, {definition.stats.chunks} текстовых фрагментов."
        )
    return (
        f"Prebuilt RAGU index with {definition.stats.nodes} entities, "
        f"{definition.stats.edges} relations, and {definition.stats.chunks} text chunks."
    )


def _safe_int(value: Any, default: int = 0) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _as_string_list(value: Any) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        return [str(item) for item in value if str(item) != "_networkx_list_start"]
    if isinstance(value, tuple):
        return [str(item) for item in value if str(item) != "_networkx_list_start"]
    if isinstance(value, str):
        return [] if value == "_networkx_list_start" else [value]
    return [str(value)]


def _graph_node(
    node_id: str,
    payload: dict[str, Any],
    degree: int,
    community_id: str | None,
    ordinal: int,
) -> GraphNode:
    x, y = _stable_position(node_id, ordinal, degree)
    return GraphNode(
        id=node_id,
        label=str(payload.get("entity_name") or node_id).strip(),
        entity_type=str(payload.get("entity_type") or "UNKNOWN").strip() or "UNKNOWN",
        description=str(payload.get("description") or ""),
        degree=degree,
        community_id=community_id,
        x=x,
        y=y,
        source_chunk_ids=_as_string_list(payload.get("source_chunk_id")),
    )


def _graph_edge(source: str, target: str, edge_id: str, payload: dict[str, Any]) -> GraphEdge:
    return GraphEdge(
        id=edge_id,
        source=source,
        target=target,
        relation_type=str(payload.get("relation_type") or "RELATED_TO"),
        description=str(payload.get("description") or ""),
        strength=_normalize_strength(payload.get("relation_strength")),
        source_chunk_ids=_as_string_list(payload.get("source_chunk_id")),
    )


def _normalize_strength(value: Any) -> float:
    try:
        score = float(value)
    except (TypeError, ValueError):
        score = 1.0
    if score > 1.0:
        score = score / 5.0
    return max(0.0, min(1.0, score))


def _stable_position(node_id: str, ordinal: int, degree: int) -> tuple[float, float]:
    seed = int(md5(node_id.encode()).hexdigest()[:8], 16)
    angle = (seed % 3600) / 3600 * math.tau
    radius = 80 + (ordinal % 97) * 5 + math.log1p(max(degree, 0)) * 30
    return round(math.cos(angle) * radius, 3), round(math.sin(angle) * radius, 3)


def _build_communities(
    node_payloads: list[tuple[str, dict[str, Any]]],
    definition: IndexDefinition,
) -> tuple[dict[str, str], list[CommunitySummary]]:
    members: dict[str, list[str]] = defaultdict(list)
    titles: dict[str, str] = {}

    for node_id, payload in node_payloads:
        clusters = payload.get("clusters")
        cluster_items = clusters if isinstance(clusters, list) else []
        for cluster in cluster_items:
            if not isinstance(cluster, dict):
                continue
            level = _safe_int(cluster.get("level"), 0)
            cluster_id = _safe_int(cluster.get("cluster_id"), 0)
            community_id = f"cluster-{level}-{cluster_id}"
            members[community_id].append(str(node_id))
            titles[community_id] = f"Cluster {cluster_id}"

    if not members:
        for node_id, payload in node_payloads:
            entity_type = str(payload.get("entity_type") or "UNKNOWN").strip() or "UNKNOWN"
            community_id = f"type-{_slugify(entity_type)}"
            members[community_id].append(str(node_id))
            titles[community_id] = entity_type

    community_id_by_node: dict[str, str] = {}
    communities: list[CommunitySummary] = []
    for community_id, node_ids in sorted(members.items(), key=lambda item: (-len(item[1]), item[0])):
        title = titles.get(community_id, community_id)
        for node_id in node_ids:
            community_id_by_node.setdefault(node_id, community_id)
        communities.append(
            CommunitySummary(
                id=community_id,
                title=title,
                summary=f"{title}: {len(node_ids)} entities in {definition.title}.",
                level=0,
                size=len(node_ids),
                node_ids=node_ids,
            )
        )
    return community_id_by_node, communities


def _query_terms(query: str) -> list[str]:
    return [item.casefold() for item in TOKEN_RE.findall(query)]


def _rank_items(
    items: Iterable[tuple[Any, str]],
    terms: list[str],
    top_k: int,
    degree_getter: Any | None = None,
) -> list[tuple[Any, float]]:
    ranked: list[tuple[Any, float]] = []
    if not terms:
        terms = []
    for item, text in items:
        haystack = text.casefold()
        score = 0.0
        for term in terms:
            if term in haystack:
                score += 1.0 + min(4, haystack.count(term)) * 0.25
        if score <= 0:
            if degree_getter is None:
                continue
            score = min(0.2, float(degree_getter(item)) / 1000)
        if degree_getter is not None:
            score += min(0.5, float(degree_getter(item)) / 200)
        ranked.append((item, score))
    ranked.sort(key=lambda row: -row[1])
    return ranked[:top_k]


def _clamp_score(score: float) -> float:
    return round(max(0.0, min(1.0, score / max(1.0, score))), 3)


def _render_context(index: LoadedIndex, retrieval: RetrievalResult) -> str:
    lines: list[str] = []
    if retrieval.nodes:
        lines.append("Entities:")
        for node, score in retrieval.nodes[:12]:
            lines.append(
                f"- {node.id} | {node.label} | {node.entity_type} | score={score:.3f} | "
                f"{_shorten(node.description, 260)}"
            )
    if retrieval.edges:
        lines.append("\nRelations:")
        for edge, score in retrieval.edges[:12]:
            source = index.node_by_id.get(edge.source)
            target = index.node_by_id.get(edge.target)
            lines.append(
                f"- {edge.id} | {source.label if source else edge.source} "
                f"-[{edge.relation_type}]-> {target.label if target else edge.target} | "
                f"score={score:.3f} | {_shorten(edge.description, 260)}"
            )
    if retrieval.chunks:
        lines.append("\nChunks:")
        for chunk, score in retrieval.chunks[:8]:
            lines.append(f"- {chunk.id} | score={score:.3f} | {_shorten(chunk.content, 700)}")
    return "\n".join(lines)


def _shorten(text: str, limit: int) -> str:
    cleaned = re.sub(r"\s+", " ", text).strip()
    if len(cleaned) <= limit:
        return cleaned
    return cleaned[: max(0, limit - 3)].rstrip() + "..."
