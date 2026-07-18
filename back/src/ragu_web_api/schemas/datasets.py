from datetime import datetime
from typing import Literal

from pydantic import Field

from ragu_web_api.schemas.common import APIModel

SearchEngine = Literal["local", "global", "naive", "mix", "query_plan"]

# Engines the backend can actually run. "global" needs structured LLM output
# (GlobalSearchContextModel) and "query_plan" needs LLM query decomposition;
# neither is reliable through the YandexGPT-compatible endpoint, so they are
# not advertised. Anything else falls back to "mix".
SUPPORTED_ENGINES: tuple[str, ...] = ("local", "naive", "mix")

# What actually produced a trace: a RAGU engine, or the local keyword fallback.
TraceEngine = Literal["local", "naive", "mix", "keyword"]

DatasetLanguage = Literal["ru", "en", "mixed"]


class DatasetStats(APIModel):
    nodes: int = Field(ge=0, examples=[2400])
    edges: int = Field(ge=0, examples=[7100])
    communities: int = Field(ge=0, examples=[38])
    chunks: int = Field(ge=0, examples=[320])
    documents: int = Field(ge=0, examples=[12])


class DatasetBadge(APIModel):
    label: str = Field(examples=["model"])
    value: str = Field(examples=["meno-lite-7b"])


class DatasetPreview(APIModel):
    kind: Literal["graph"] = "graph"
    node_count: int = Field(ge=0, examples=[80])
    edge_count: int = Field(ge=0, examples=[130])
    primary_entity_types: list[str] = Field(default_factory=list, examples=[["PERSON", "LAW"]])


class DatasetCard(APIModel):
    id: str = Field(examples=["wiki"])
    title: str = Field(examples=["Wikipedia topic slice"])
    domain: str = Field(examples=["Wikipedia"])
    description: str
    language: DatasetLanguage
    tags: list[str] = Field(default_factory=list)
    stats: DatasetStats
    badges: list[DatasetBadge] = Field(default_factory=list)
    preview: DatasetPreview
    suggested_questions: list[str] = Field(default_factory=list)


class DatasetDetail(DatasetCard):
    default_engine: SearchEngine = "mix"
    available_engines: list[SearchEngine] = Field(
        default_factory=lambda: list(SUPPORTED_ENGINES)
    )
    created_at: datetime
    updated_at: datetime
