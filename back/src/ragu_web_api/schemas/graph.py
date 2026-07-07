from typing import Literal

from pydantic import Field

from ragu_web_api.schemas.common import APIModel

EntityType = str


class GraphNode(APIModel):
    id: str = Field(examples=["wiki-n1"])
    label: str = Field(examples=["Bjoernstjerne Bjoernson"])
    entity_type: EntityType
    description: str
    degree: int = Field(ge=0)
    community_id: str | None = Field(default=None, examples=["wiki-c1"])
    x: float = Field(examples=[-120.5])
    y: float = Field(examples=[82.0])
    source_chunk_ids: list[str] = Field(default_factory=list)


class GraphEdge(APIModel):
    id: str = Field(examples=["wiki-e1"])
    source: str = Field(examples=["wiki-n1"])
    target: str = Field(examples=["wiki-n2"])
    relation_type: str = Field(examples=["AUTHORED"])
    description: str
    strength: float = Field(ge=0.0, le=1.0, examples=[0.86])
    source_chunk_ids: list[str] = Field(default_factory=list)


class CommunitySummary(APIModel):
    id: str = Field(examples=["wiki-c1"])
    title: str = Field(examples=["Norwegian literature"])
    summary: str
    level: int = Field(ge=0, examples=[0])
    size: int = Field(ge=0, examples=[8])
    node_ids: list[str] = Field(default_factory=list)


class GraphFilters(APIModel):
    search: str | None = None
    entity_types: list[EntityType] | None = None
    community_ids: list[str] | None = None
    min_strength: float = 0.0


class GraphMeta(APIModel):
    dataset_id: str
    total_nodes: int = Field(ge=0)
    total_edges: int = Field(ge=0)
    returned_nodes: int = Field(ge=0)
    returned_edges: int = Field(ge=0)
    limit: int = Field(ge=1)
    filters: GraphFilters


class GraphResponse(APIModel):
    nodes: list[GraphNode]
    edges: list[GraphEdge]
    communities: list[CommunitySummary] = Field(default_factory=list)
    meta: GraphMeta


class ProvenanceChunk(APIModel):
    id: str = Field(examples=["wiki-chunk-1"])
    content: str
    doc_id: str
    chunk_order_idx: int = Field(ge=0)


class NodeRelation(GraphEdge):
    direction: Literal["incoming", "outgoing"]
    other_node_id: str
    other_node_label: str


class NodeDetailResponse(APIModel):
    node: GraphNode
    incoming_relations: list[NodeRelation] = Field(default_factory=list)
    outgoing_relations: list[NodeRelation] = Field(default_factory=list)
    provenance_chunks: list[ProvenanceChunk] = Field(default_factory=list)


class GraphCommunitiesResponse(APIModel):
    dataset_id: str
    communities: list[CommunitySummary]
