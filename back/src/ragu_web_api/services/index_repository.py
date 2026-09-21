"""Граф с диска для канваса.

Всё, что касалось поиска и генерации, уехало в ragu-api: здесь не осталось ни
одного импорта из `ragu`. Остался разбор GML и выборки по нему — до тех пор,
пока канвас не начнёт брать вершины и связи у сервиса.
"""

from __future__ import annotations

import json
import logging
import math
import os
import re
from ast import literal_eval
from collections import Counter, defaultdict, deque
from dataclasses import dataclass
from datetime import datetime, timezone
from hashlib import md5
from html import unescape
from pathlib import Path
from typing import Any, Iterable

from fastapi import HTTPException

from ragu_web_api.metrics import observe_dataset_request
from ragu_web_api.schemas.datasets import DatasetStats
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














# Cap on sub-questions. Each one is a full retrieval pass against the index, and
# this box runs a single worker: four already multiplies retrieval latency by four.
_QUERY_PLAN_MAX = 4










class IndexRepository:
    """Граф с диска: разбор GML, канвас, карточки вершин, сообщества.

    Поиска и генерации здесь больше нет — ими владеет ragu-api. Остаток
    существует до тех пор, пока канвас не переедет туда же; после этого класс
    исчезает вместе с парсером.
    """

    def __init__(self, indexes_root: Path | None = None) -> None:
        self.indexes_root = indexes_root or _resolve_indexes_root(_merged_env())
        self._definitions = self._discover_indexes()
        self._loaded: dict[str, LoadedIndex] = {}
        LOGGER.info(
            "Indexes root: %s | folders: %d",
            self.indexes_root,
            len(self._definitions),
        )
        if not self._definitions:
            LOGGER.warning("No RAGU indexes discovered under '%s'.", self.indexes_root)

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
        observe_dataset_request(dataset_id, "graph")
        index = self._load_index(dataset_id)
        nodes = self._filter_nodes(
            index.nodes,
            search=search,
            entity_types=entity_types,
            community_ids=community_ids,
        )
        nodes = sorted(
            nodes, key=lambda node: (-node.degree, node.label.casefold(), node.id)
        )[:limit]
        node_ids = {node.id for node in nodes}
        edges = [
            edge
            for edge in index.edges
            if edge.source in node_ids
            and edge.target in node_ids
            and edge.strength >= min_strength
        ]
        communities = (
            self._communities_for_nodes(index, node_ids) if include_communities else []
        )
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
            self._node_relation(
                edge, direction="incoming", other_node=index.node_by_id[edge.source]
            )
            for edge in index.incoming_edges.get(node_id, [])
            if edge.source in index.node_by_id
        ]
        outgoing = [
            self._node_relation(
                edge, direction="outgoing", other_node=index.node_by_id[edge.target]
            )
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
                key=lambda item: (
                    -(index.node_by_id[item].degree if item in index.node_by_id else 0),
                    item,
                ),
            )
            for neighbor in neighbors:
                if neighbor in seen:
                    continue
                seen.add(neighbor)
                queue.append((neighbor, current_depth + 1))

        node_ids = set(selected)
        nodes = [
            index.node_by_id[item] for item in selected if item in index.node_by_id
        ]
        edges = [
            edge
            for edge in index.edges
            if edge.source in node_ids
            and edge.target in node_ids
            and edge.strength >= min_strength
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
        observe_dataset_request(dataset_id, "communities")
        index = self._load_index(dataset_id)
        return GraphCommunitiesResponse(
            dataset_id=dataset_id, communities=index.communities
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
        community_count = _count_communities(path)
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
                communities=(
                    community_count
                    if community_count is not None
                    else max(1, len(primary_entity_types))
                ),
                chunks=len(chunks),
                documents=len(doc_ids),
            ),
            primary_entity_types=primary_entity_types,
            language=language,
            created_at=_mtime_min(path),
            updated_at=updated_at,
        )


    def _load_index(self, dataset_id: str) -> LoadedIndex:
        if dataset_id in self._loaded:
            return self._loaded[dataset_id]

        definition = self._require_definition(dataset_id)
        node_payloads, edge_payloads = _read_gml_payloads(
            definition.path / "knowledge_graph.gml"
        )
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

        community_id_by_node, communities = _build_communities(
            node_payloads, definition
        )
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
            filtered = [
                node for node in filtered if node.entity_type.casefold() in allowed
            ]
        if community_ids:
            allowed_communities = set(community_ids)
            filtered = [
                node for node in filtered if node.community_id in allowed_communities
            ]
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

    def _node_relation(
        self, edge: GraphEdge, direction: str, other_node: GraphNode
    ) -> NodeRelation:
        return NodeRelation(
            **edge.model_dump(),
            direction=direction,
            other_node_id=other_node.id,
            other_node_label=other_node.label,
        )










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

    def _require_node(
        self, index: LoadedIndex, dataset_id: str, node_id: str
    ) -> GraphNode:
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








RAGU_VECTOR_FILES = (
    "knowledge_graph.gml",
    "kv_chunks.json",
    "vdb_entity.json",
    "vdb_chunk.json",
)












# Below this many letters of one script a message carries no usable signal —
# "RAGU?", "ok", "да". Guessing from those would flip the answer language on a
# short follow-up, so we look further back in the conversation instead.
_LANGUAGE_MIN_LETTERS = 3














def _index_candidates(root: Path) -> list[Path]:
    if _is_index_dir(root):
        return [root]
    if not root.exists():
        return []
    return sorted(
        path for path in root.iterdir() if path.is_dir() and _is_index_dir(path)
    )


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


def _safe_read_json_object(path: Path) -> dict[str, Any]:
    """Like :func:`_read_json_object` but returns ``{}`` for a missing or
    unreadable file instead of raising (used for optional index artifacts)."""
    try:
        return _read_json_object(path)
    except (OSError, ValueError):
        return {}


def _count_communities(path: Path) -> int | None:
    """Real community count from ``kv_community.json`` (all Leiden levels), or
    ``None`` when the file is absent so the caller can fall back."""
    data = _safe_read_json_object(path / "kv_community.json")
    return len(data) or None


def _read_gml_payloads(
    path: Path,
) -> tuple[
    list[tuple[str, dict[str, Any]]], list[tuple[str, str, str, dict[str, Any]]]
]:
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
    timestamp = min(
        (item.stat().st_mtime for item in files), default=path.stat().st_mtime
    )
    return datetime.fromtimestamp(timestamp, timezone.utc)


def _mtime_max(path: Path) -> datetime:
    files = [item for item in path.iterdir() if item.is_file()]
    timestamp = max(
        (item.stat().st_mtime for item in files), default=path.stat().st_mtime
    )
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






def _safe_int(value: Any, default: int = 0) -> int:
    try:
        return int(value)
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


def _graph_edge(
    source: str, target: str, edge_id: str, payload: dict[str, Any]
) -> GraphEdge:
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
    """Load real Leiden communities from RAGU's ``kv_community.json`` /
    ``kv_community_summary.json``. Falls back to node ``clusters`` / entity-type
    grouping only when those files are missing (older indexes)."""
    node_ids = {str(node_id) for node_id, _ in node_payloads}
    members = _safe_read_json_object(definition.path / "kv_community.json")
    if members:
        summaries = _safe_read_json_object(
            definition.path / "kv_community_summary.json"
        )
        return _communities_from_reports(members, summaries, node_ids, definition)
    return _communities_fallback(node_payloads, definition)


def _communities_from_reports(
    members: dict[str, Any],
    summaries: dict[str, Any],
    node_ids: set[str],
    definition: IndexDefinition,
) -> tuple[dict[str, str], list[CommunitySummary]]:
    community_id_by_node: dict[str, str] = {}
    node_level: dict[str, int] = {}
    communities: list[CommunitySummary] = []

    for raw_id, payload in members.items():
        if not isinstance(payload, dict):
            continue
        community_id = str(raw_id)
        level = _safe_int(payload.get("level"), 0)
        cluster_id = _safe_int(payload.get("cluster_id"), 0)
        entity_ids = [
            str(item) for item in payload.get("entity_ids", []) if str(item) in node_ids
        ]

        summary_text = summaries.get(community_id, "")
        title, body = _parse_community_report(
            summary_text if isinstance(summary_text, str) else ""
        )
        if not title:
            title = (
                f"Community {cluster_id}"
                if level == 0
                else f"Community {cluster_id} (L{level})"
            )
        summary = body or f"{len(entity_ids)} entities in {definition.title}."

        communities.append(
            CommunitySummary(
                id=community_id,
                title=title,
                summary=summary,
                level=level,
                size=len(entity_ids),
                node_ids=entity_ids,
            )
        )

        # Every node has exactly one level-0 (full-coverage) community; assign
        # that as its primary community, so lower level wins on ties.
        for node_id in entity_ids:
            if node_id not in node_level or level < node_level[node_id]:
                node_level[node_id] = level
                community_id_by_node[node_id] = community_id

    communities.sort(
        key=lambda community: (community.level, -community.size, community.id)
    )
    return community_id_by_node, communities


def _communities_fallback(
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
            entity_type = (
                str(payload.get("entity_type") or "UNKNOWN").strip() or "UNKNOWN"
            )
            community_id = f"type-{_slugify(entity_type)}"
            members[community_id].append(str(node_id))
            titles[community_id] = entity_type

    community_id_by_node: dict[str, str] = {}
    communities: list[CommunitySummary] = []
    for community_id, ids in sorted(
        members.items(), key=lambda item: (-len(item[1]), item[0])
    ):
        title = titles.get(community_id, community_id)
        for node_id in ids:
            community_id_by_node.setdefault(node_id, community_id)
        communities.append(
            CommunitySummary(
                id=community_id,
                title=title,
                summary=f"{title}: {len(ids)} entities in {definition.title}.",
                level=0,
                size=len(ids),
                node_ids=ids,
            )
        )
    return community_id_by_node, communities


def _parse_community_report(text: str) -> tuple[str, str]:
    """Split a RAGU community report string into ``(title, body)``.

    Reports are rendered as ``Report title: ...`` / ``Report summary: ...`` /
    ``Finding summary: ...`` / ``Finding explanation: ...`` lines.
    """
    title = ""
    body_parts: list[str] = []
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        lowered = line.lower()
        if not title and lowered.startswith("report title:"):
            title = line.split(":", 1)[1].strip()
            continue
        for label in ("report summary:", "finding summary:", "finding explanation:"):
            if lowered.startswith(label):
                line = line.split(":", 1)[1].strip()
                break
        if line:
            body_parts.append(line)
    return title, " ".join(body_parts).strip()










