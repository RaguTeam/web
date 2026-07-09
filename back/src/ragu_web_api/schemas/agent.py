from datetime import datetime
from typing import Literal

from pydantic import Field

from ragu_web_api.schemas.common import APIModel, Locale
from ragu_web_api.schemas.datasets import SearchEngine
from ragu_web_api.schemas.graph import EntityType


class ChatMessage(APIModel):
    role: Literal["user", "assistant"] = Field(examples=["user"])
    content: str = Field(min_length=1, examples=["Who wrote the Norwegian anthem?"])


class AgentRequest(APIModel):
    message: str = Field(min_length=1, examples=["Who wrote the Norwegian anthem?"])
    history: list[ChatMessage] = Field(default_factory=list)
    engine: SearchEngine = "mix"
    top_k: int = Field(default=8, ge=1, le=50)
    rerank: bool = True
    include_trace: bool = True
    locale: Locale = "ru"


class TraceEntity(APIModel):
    id: str
    label: str
    entity_type: EntityType
    score: float = Field(ge=0.0, le=1.0)


class TraceRelation(APIModel):
    id: str
    source: str
    target: str
    relation_type: str
    strength: float = Field(ge=0.0, le=1.0)


class TraceChunk(APIModel):
    id: str
    content: str
    doc_id: str
    score: float = Field(ge=0.0, le=1.0)


class TraceCommunity(APIModel):
    id: str
    title: str
    summary: str
    score: float = Field(ge=0.0, le=1.0)


class TraceTimings(APIModel):
    retrieval_ms: int = Field(ge=0)
    generation_ms: int = Field(ge=0)
    total_ms: int = Field(ge=0)


class TraceEnergy(APIModel):
    watt_hours: float = Field(ge=0.0)
    estimated: bool = True
    formula: str = "TDP * time * PUE"


class GraphHighlight(APIModel):
    node_ids: list[str] = Field(default_factory=list)
    edge_ids: list[str] = Field(default_factory=list)
    community_ids: list[str] = Field(default_factory=list)


class AnswerTrace(APIModel):
    engine: SearchEngine
    top_k: int = Field(ge=1)
    rerank: bool
    entities: list[TraceEntity] = Field(default_factory=list)
    relations: list[TraceRelation] = Field(default_factory=list)
    chunks: list[TraceChunk] = Field(default_factory=list)
    communities: list[TraceCommunity] = Field(default_factory=list)
    timings: TraceTimings
    energy: TraceEnergy
    highlight: GraphHighlight


class AssistantMessage(APIModel):
    id: str
    role: Literal["assistant"] = "assistant"
    content: str
    created_at: datetime
    trace: AnswerTrace | None = None


class AgentResponse(APIModel):
    message: AssistantMessage


class SuggestionsResponse(APIModel):
    dataset_id: str
    suggestions: list[str]
