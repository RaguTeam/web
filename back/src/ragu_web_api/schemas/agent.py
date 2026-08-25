from datetime import datetime
from typing import Literal

from pydantic import Field

from ragu_web_api.schemas.common import APIModel, Locale
from ragu_web_api.schemas.datasets import SearchEngine, TraceEngine
from ragu_web_api.schemas.graph import EntityType


class ChatMessage(APIModel):
    role: Literal["user", "assistant"] = Field(examples=["user"])
    content: str = Field(min_length=1, examples=["Who wrote the Norwegian anthem?"])


class AgentRequest(APIModel):
    message: str = Field(min_length=1, examples=["Who wrote the Norwegian anthem?"])
    history: list[ChatMessage] = Field(default_factory=list)
    engine: SearchEngine = "mix"
    # Decompose a complex question into sub-questions before retrieval. Orthogonal
    # to `engine`: the plan runs each sub-question through the engine picked above.
    # Not folded into the SearchEngine enum on purpose — the two are independent
    # switches in the UI, and "no graph + planning" has to stay expressible.
    use_query_plan: bool = False
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


class TraceQueryPlan(APIModel):
    # Whether decomposition actually ran. False when it was asked for but the LLM
    # was unavailable or returned nothing usable — the answer then came from the
    # original question alone, and saying otherwise would be a lie.
    used: bool
    sub_questions: list[str] = Field(default_factory=list)


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
    # The engine that actually ran, not the one requested. "keyword" means the
    # RAGU vector path was unavailable and local keyword retrieval was used.
    engine: TraceEngine
    top_k: int = Field(ge=1)
    # Whether reranking actually happened (no reranker is configured, so: False).
    rerank: bool
    # None when planning was not requested.
    query_plan: TraceQueryPlan | None = None
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
