"""Query decomposition: parsing, merging and the guards around planning.

These do not need a built index on disk (unlike test_api.py), so they run in a
bare checkout.
"""

from dataclasses import dataclass

import pytest

from ragu_web_api.schemas.agent import AgentRequest
from ragu_web_api.services.index_repository import (
    IndexRepository,
    RetrievalResult,
    _merge_retrievals,
    _parse_query_plan,
)


@dataclass
class _Item:
    id: str


def _result(**kwargs: list) -> RetrievalResult:
    return RetrievalResult(
        nodes=kwargs.get("nodes", []),
        edges=kwargs.get("edges", []),
        chunks=kwargs.get("chunks", []),
        communities=kwargs.get("communities", []),
    )


class _StubConfig:
    def __init__(self, configured: bool) -> None:
        self.is_configured = configured


class _StubLLM:
    """Stands in for OpenAICompatibleLLM: canned reply or a raised error."""

    def __init__(self, reply: str | None = None, *, configured: bool = True, error: Exception | None = None) -> None:
        self.config = _StubConfig(configured)
        self._reply = reply
        self._error = error
        self.calls = 0

    async def complete(self, messages: list[dict[str, str]]) -> str | None:
        self.calls += 1
        if self._error:
            raise self._error
        return self._reply


def _repo(llm: _StubLLM) -> IndexRepository:
    repo = IndexRepository()
    repo._llm = llm  # type: ignore[assignment]
    return repo


# ---------- _parse_query_plan ----------


def test_parses_json_array() -> None:
    assert _parse_query_plan('["Кто такой Ритчи?", "Что он написал?"]') == [
        "Кто такой Ритчи?",
        "Что он написал?",
    ]


def test_parses_json_array_wrapped_in_prose() -> None:
    """The endpoint here is not reliable for structured output, so a model that
    chatters around the array must still be understood."""
    raw = 'Вот план:\n["Первый вопрос", "Второй вопрос"]\nГотово.'
    assert _parse_query_plan(raw) == ["Первый вопрос", "Второй вопрос"]


def test_falls_back_to_numbered_list() -> None:
    raw = "1. Кто основал компанию?\n2) Когда это было?\n- Где она сейчас?"
    assert _parse_query_plan(raw) == [
        "Кто основал компанию?",
        "Когда это было?",
        "Где она сейчас?",
    ]


def test_empty_array_yields_nothing() -> None:
    assert _parse_query_plan("[]") == []


def test_garbage_yields_nothing_usable() -> None:
    assert _parse_query_plan("   \n\n  ") == []


# ---------- _merge_retrievals ----------


def test_merge_keeps_best_score_per_id() -> None:
    """Same entity found by two sub-questions must not be counted twice, and the
    stronger match must win — summing would reward repetition."""
    a = _result(nodes=[(_Item("n1"), 0.4), (_Item("n2"), 0.9)])
    b = _result(nodes=[(_Item("n1"), 0.8)])
    merged = _merge_retrievals([a, b], limit=10)
    assert [(item.id, score) for item, score in merged.nodes] == [("n2", 0.9), ("n1", 0.8)]


def test_merge_respects_limit() -> None:
    items = _result(nodes=[(_Item(f"n{i}"), i / 10) for i in range(10)])
    merged = _merge_retrievals([items], limit=3)
    assert [item.id for item, _ in merged.nodes] == ["n9", "n8", "n7"]


def test_merge_covers_every_bucket() -> None:
    one = _result(nodes=[(_Item("n"), 1.0)], chunks=[(_Item("c"), 1.0)])
    two = _result(edges=[(_Item("e"), 1.0)], communities=[(_Item("k"), 1.0)])
    merged = _merge_retrievals([one, two], limit=5)
    assert [i.id for i, _ in merged.nodes] == ["n"]
    assert [i.id for i, _ in merged.edges] == ["e"]
    assert [i.id for i, _ in merged.chunks] == ["c"]
    assert [i.id for i, _ in merged.communities] == ["k"]


# ---------- _plan_queries ----------


@pytest.mark.anyio
async def test_no_plan_when_not_requested() -> None:
    llm = _StubLLM('["раз", "два"]')
    plan = await _repo(llm)._plan_queries(AgentRequest(message="вопрос"))
    assert plan == []
    assert llm.calls == 0, "не просили план — LLM дёргать незачем"


@pytest.mark.anyio
async def test_no_plan_without_configured_llm() -> None:
    llm = _StubLLM('["раз", "два"]', configured=False)
    plan = await _repo(llm)._plan_queries(
        AgentRequest(message="вопрос", use_query_plan=True)
    )
    assert plan == []
    assert llm.calls == 0


@pytest.mark.anyio
async def test_plan_is_parsed() -> None:
    llm = _StubLLM('["Кто такой Ритчи?", "Что он написал?"]')
    plan = await _repo(llm)._plan_queries(
        AgentRequest(message="Кто такой Ритчи и что он написал?", use_query_plan=True)
    )
    assert plan == ["Кто такой Ритчи?", "Что он написал?"]


@pytest.mark.anyio
async def test_single_sub_question_is_not_a_plan() -> None:
    """One sub-question is the original question reworded — no reason to pay for
    a second retrieval pass and claim a plan happened."""
    llm = _StubLLM('["Кто такой Ритчи?"]')
    plan = await _repo(llm)._plan_queries(
        AgentRequest(message="Кто такой Ритчи?", use_query_plan=True)
    )
    assert plan == []


@pytest.mark.anyio
async def test_duplicates_are_dropped_case_insensitively() -> None:
    llm = _StubLLM('["Кто такой Ритчи?", "кто такой ритчи?", "Что он написал?"]')
    plan = await _repo(llm)._plan_queries(
        AgentRequest(message="вопрос", use_query_plan=True)
    )
    assert plan == ["Кто такой Ритчи?", "Что он написал?"]


@pytest.mark.anyio
async def test_plan_is_capped() -> None:
    llm = _StubLLM('["q1", "q2", "q3", "q4", "q5", "q6"]')
    plan = await _repo(llm)._plan_queries(
        AgentRequest(message="вопрос", use_query_plan=True)
    )
    assert plan == ["q1", "q2", "q3", "q4"]


@pytest.mark.anyio
async def test_llm_failure_degrades_to_no_plan() -> None:
    """Planning is an optimisation: a broken plan must not cost the answer."""
    llm = _StubLLM(error=RuntimeError("upstream 500"))
    plan = await _repo(llm)._plan_queries(
        AgentRequest(message="вопрос", use_query_plan=True)
    )
    assert plan == []


@pytest.mark.anyio
async def test_empty_reply_degrades_to_no_plan() -> None:
    llm = _StubLLM(None)
    plan = await _repo(llm)._plan_queries(
        AgentRequest(message="вопрос", use_query_plan=True)
    )
    assert plan == []
