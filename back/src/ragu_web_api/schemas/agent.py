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
    # UI language only — it does NOT choose the answer's language. That follows the
    # user's own last message, so someone typing Russian into an English interface
    # still gets a Russian answer (see `_answer_language`).
    locale: Locale = Field(
        default="ru",
        description=(
            "Interface locale. Does not control the answer language, which is "
            "detected from the user's message."
        ),
    )


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


class TraceStageUsage(APIModel):
    # Stage names come from the service: the search mode, plus whatever the
    # engines label their own LLM calls with.
    stage: str = Field(examples=["mix"])
    calls: int = Field(ge=0)
    prompt_tokens: int = Field(ge=0)
    completion_tokens: int = Field(ge=0)


class TraceUsage(APIModel):
    # Always true today: the service counts tokens with a tokenizer, because the
    # LLM clients hand back the parsed answer rather than the raw response. Close
    # enough to compare two questions, not close enough to bill anyone.
    estimated: bool = True
    calls: int = Field(ge=0)
    prompt_tokens: int = Field(ge=0)
    completion_tokens: int = Field(ge=0)
    total_tokens: int = Field(ge=0)
    # Totals are computed from `stages`, so the two always agree. Trusting the
    # service's own totals instead would let a discrepancy show up as a UI that
    # contradicts itself.
    stages: list[TraceStageUsage] = Field(default_factory=list)
    # In whatever unit TOKEN_PRICE_* are given in; `currency` only labels it.
    # Zero when no prices are configured — that is "not priced", not "free".
    cost: float = Field(ge=0.0)
    currency: str = Field(default="", examples=["₽"])
    priced: bool = Field(description="Whether token prices are configured at all")


class TraceEnergy(APIModel):
    watt_hours: float = Field(ge=0.0)
    estimated: bool = True
    formula: str = "TDP * time * PUE"


class GraphHighlight(APIModel):
    node_ids: list[str] = Field(default_factory=list)
    edge_ids: list[str] = Field(default_factory=list)
    community_ids: list[str] = Field(default_factory=list)


class AnswerTrace(APIModel):
    # The engine that actually ran, not the one requested: the service may serve
    # a different mode than the UI offered, and the trace has to say so.
    engine: TraceEngine
    top_k: int = Field(ge=1)
    # Whether reranking actually reordered the sources, not whether it was asked
    # for. False with `rerank_error` set means the reranker was there and failed:
    # the answer is the un-reranked one, which is a quality note, not an outage.
    rerank: bool
    rerank_error: str | None = None
    # None when planning was not requested.
    query_plan: TraceQueryPlan | None = None
    entities: list[TraceEntity] = Field(default_factory=list)
    relations: list[TraceRelation] = Field(default_factory=list)
    chunks: list[TraceChunk] = Field(default_factory=list)
    communities: list[TraceCommunity] = Field(default_factory=list)
    timings: TraceTimings
    # None when the service reported no usage for this request.
    usage: TraceUsage | None = None
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
