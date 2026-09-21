"""Чат поверх ragu-api.

Два решения принимаются на нашей стороне — язык ответа и режим поиска, — и обе
проверки здесь про них. Остальное про трейс: он обязан называть то, что
произошло на самом деле, а не то, что просили.
"""

import pytest
from fastapi import HTTPException
from ragu.api.models import (
    ChildEngineReport,
    ChunkMeta,
    CommunityMeta,
    EngineReport,
    EntityMeta,
    RelationMeta,
    SourceItem,
    StageUsageModel,
    SubqueryItem,
    UsageModel,
)
from support import (
    FakeGateway,
    asyncio_test,
    detail,
    info,
    modes,
    search_response,
    settings,
)

from ragu_web_api.answer import Answerer, _rerank_outcome
from ragu_web_api.catalog import Catalog
from ragu_web_api.presentation import trace
from ragu_web_api.schemas.agent import AgentRequest, ChatMessage


def _answerer(gateway: FakeGateway) -> Answerer:
    config = settings()
    return Answerer(gateway, Catalog(gateway, config), config)


def _request(message: str = "вопрос", **overrides) -> AgentRequest:
    return AgentRequest(message=message, **overrides)


# ---------- язык ответа ----------


@asyncio_test
async def test_russian_question_to_an_english_corpus_asks_for_a_russian_answer() -> None:
    """Главный дефект задачи 2: язык брали у индекса, и англоязычный корпус
    отвечал по-английски на любой вопрос."""
    gateway = FakeGateway(
        [info("dennis-ritchie", language="english")],
        details={"dennis-ritchie": detail("dennis-ritchie", language="english")},
    )
    await _answerer(gateway).answer("dennis-ritchie", _request("Кто написал язык C?"))
    assert gateway.last_search["language"] == "russian"


@asyncio_test
async def test_interface_toggle_does_not_choose_the_answer_language() -> None:
    gateway = FakeGateway([info("medical")])
    await _answerer(gateway).answer(
        "medical", _request("Какие причины рака простаты?", locale="en")
    )
    assert gateway.last_search["language"] == "russian"


@asyncio_test
async def test_short_followup_keeps_the_conversation_language() -> None:
    gateway = FakeGateway([info("medical")])
    history = [ChatMessage(role="user", content="What causes prostate cancer?")]
    await _answerer(gateway).answer("medical", _request("???", history=history))
    assert gateway.last_search["language"] == "english"


# ---------- выбор режима ----------


@asyncio_test
async def test_requested_mode_is_used_when_the_corpus_serves_it() -> None:
    gateway = FakeGateway([info("medical")])
    await _answerer(gateway).answer("medical", _request(engine="naive"))
    assert gateway.last_search["mode"] == "naive"


@asyncio_test
async def test_unserved_mode_falls_back_instead_of_dead_ending() -> None:
    """Отказать значило бы упереть посетителя в тупик на кнопке, которую ему же
    и показали."""
    gateway = FakeGateway(
        [info("medical")],
        details={"medical": detail("medical", modes=modes("naive"))},
    )
    await _answerer(gateway).answer("medical", _request(engine="mix"))
    assert gateway.last_search["mode"] == "naive"


@asyncio_test
async def test_corpus_without_a_single_mode_refuses_clearly() -> None:
    gateway = FakeGateway([info("broken", loaded=False, error="embedder_dim mismatch")])
    with pytest.raises(HTTPException) as caught:
        await _answerer(gateway).answer("broken", _request())
    assert caught.value.status_code == 409
    assert caught.value.detail["code"] == "mode_unavailable"
    assert "embedder_dim mismatch" in caught.value.detail["message"]


# ---------- тело запроса ----------


@asyncio_test
async def test_query_plan_is_always_stated() -> None:
    """У сервиса декомпозиция включена по умолчанию, у нас выключена. Промолчать
    значит получить лишние вызовы LLM там, где их не просили."""
    gateway = FakeGateway([info("medical")])
    await _answerer(gateway).answer("medical", _request(use_query_plan=False))
    assert gateway.last_search["use_query_plan"] is False


@asyncio_test
async def test_mix_names_its_children_and_their_top_k() -> None:
    gateway = FakeGateway([info("medical")])
    await _answerer(gateway).answer("medical", _request(engine="mix", top_k=12))
    sent = gateway.last_search
    assert sent["engines"] == ["local", "naive"]
    assert sent["local_params"] == {"top_k": 12}
    assert sent["naive_params"] == {"top_k": 12}


@asyncio_test
async def test_mix_drops_a_child_the_corpus_cannot_serve() -> None:
    """Упавший ребёнок ансамбля молчит, и ответ собирается по оставшимся."""
    gateway = FakeGateway(
        [info("medical")],
        details={"medical": detail("medical", modes=modes("naive", "mix"))},
    )
    await _answerer(gateway).answer("medical", _request(engine="mix"))
    assert gateway.last_search["engines"] == ["naive"]


@asyncio_test
async def test_global_body_carries_nothing_it_would_reject() -> None:
    """GlobalSearchRequest запрещает неизвестные ключи: лишнее поле — это 422."""
    gateway = FakeGateway(
        [info("medical")],
        details={"medical": detail("medical", modes=modes("global"))},
    )
    await _answerer(gateway).answer("medical", _request(engine="global"))
    sent = gateway.last_search
    assert set(sent) == {"dataset", "mode", "query", "language"}


# ---------- трейс ----------


def _sourced(**overrides):
    sources = [
        SourceItem(
            id="ent-1",
            type="entity",
            content="…",
            score=0.8,
            meta=EntityMeta(name="Dennis Ritchie", type="PERSON"),
        ),
        SourceItem(
            id="rel-1",
            type="relation",
            content="…",
            meta=RelationMeta(
                subject_id="ent-1",
                object_id="ent-2",
                subject_name="Dennis Ritchie",
                object_name="C",
                type="AUTHORED",
                strength=4.0,
            ),
        ),
        SourceItem(
            id="chunk-1",
            type="chunk",
            content="текст",
            score=0.5,
            meta=ChunkMeta(doc_id="doc-1"),
        ),
        SourceItem(
            id="com-1",
            type="community_summary",
            content="свод",
            meta=CommunityMeta(title="Языки программирования"),
        ),
    ]
    return search_response(sources=sources, **overrides)


def test_sources_become_typed_lists() -> None:
    """Сервис отдаёт вид источника в meta.kind — разбирать чужие структуры
    больше не нужно."""
    built = trace.build(_sourced(), top_k=8, total_ms=100, query_plan_requested=False)
    assert [item.label for item in built.entities] == ["Dennis Ritchie"]
    assert [item.relation_type for item in built.relations] == ["AUTHORED"]
    assert [item.doc_id for item in built.chunks] == ["doc-1"]
    assert [item.title for item in built.communities] == ["Языки программирования"]


def test_highlight_points_at_the_same_ids_the_canvas_uses() -> None:
    built = trace.build(_sourced(), top_k=8, total_ms=100, query_plan_requested=False)
    assert built.highlight.node_ids == ["ent-1"]
    assert built.highlight.edge_ids == ["rel-1"]
    assert built.highlight.community_ids == ["com-1"]


def test_relation_strength_is_scaled_into_the_contract() -> None:
    """В RAGU сила — целое примерно до пяти, в контракте фронта — доля."""
    built = trace.build(_sourced(), top_k=8, total_ms=100, query_plan_requested=False)
    assert built.relations[0].strength == pytest.approx(0.8)


def test_missing_score_is_zero_not_invented() -> None:
    built = trace.build(_sourced(), top_k=8, total_ms=100, query_plan_requested=False)
    assert built.relations and built.entities[0].score == pytest.approx(0.8)
    assert built.communities[0].score == 0.0


def test_source_without_meta_is_dropped_rather_than_guessed() -> None:
    response = search_response(sources=[SourceItem(id="x", type="chunk", content="…")])
    built = trace.build(response, top_k=8, total_ms=1, query_plan_requested=False)
    assert built.chunks == []


def test_trace_names_the_engine_that_ran_not_the_one_requested() -> None:
    """Весь смысл трейса в том, чтобы расхождение было видно."""
    response = search_response(
        engines=EngineReport(requested="mix", used="NaiveSearchEngine", degraded=True)
    )
    built = trace.build(response, top_k=8, total_ms=1, query_plan_requested=False)
    assert built.engine == "naive"


def test_rerank_reports_what_happened_not_what_was_asked() -> None:
    response = search_response(
        engines=EngineReport(
            requested="mix",
            used="MixSearchEngine",
            reranked=False,
            rerank_error="reranker timed out",
            children=[ChildEngineReport(engine="LocalSearchEngine", ok=False)],
        )
    )
    built = trace.build(response, top_k=8, total_ms=1, query_plan_requested=False)
    assert built.rerank is False
    assert built.rerank_error == "reranker timed out"


@pytest.mark.parametrize(
    ("reranked", "error", "outcome"),
    [
        (True, None, "applied"),
        (False, "reranker timed out", "failed"),
        (False, None, "skipped"),
    ],
)
def test_rerank_outcome_separates_silence_from_failure(
    reranked: bool, error: str | None, outcome: str
) -> None:
    """На дашборде это разные новости: «не просили» штатно, «отказал» значит,
    что ответы хуже, чем могли бы быть."""
    engines = EngineReport(
        requested="mix", used="MixSearchEngine", reranked=reranked, rerank_error=error
    )
    assert _rerank_outcome(engines) == outcome


def test_query_plan_is_absent_when_it_was_not_requested() -> None:
    built = trace.build(
        search_response(), top_k=8, total_ms=1, query_plan_requested=False
    )
    assert built.query_plan is None


def test_query_plan_reports_the_service_not_the_request() -> None:
    """План мог быть запрошен и не состояться."""
    response = search_response(
        used_query_plan=True, subqueries=[SubqueryItem(query="кто такой Ритчи")]
    )
    built = trace.build(response, top_k=8, total_ms=1, query_plan_requested=True)
    assert built.query_plan.used is True
    assert built.query_plan.sub_questions == ["кто такой Ритчи"]


def test_stage_timings_come_from_the_service_total_from_our_clock() -> None:
    """Разница — это сеть и разбор ответа; приписывать её стадии значило бы её
    завысить."""
    response = search_response(
        usage=UsageModel(
            stages={
                "retrieval": StageUsageModel(retrieval_ms=1200.0),
                "generation": StageUsageModel(generation_ms=3400.0),
            }
        )
    )
    built = trace.build(response, top_k=8, total_ms=4900, query_plan_requested=False)
    assert (built.timings.retrieval_ms, built.timings.generation_ms) == (1200, 3400)
    assert built.timings.total_ms == 4900


# ---------- подсказки ----------


@asyncio_test
async def test_suggestions_follow_the_corpus_entity_types() -> None:
    gateway = FakeGateway([info("medical")], types={"medical": ["DiseaseOrDisorder"]})
    result = await _answerer(gateway).suggestions("medical", locale="ru")
    assert "DiseaseOrDisorder" in result.suggestions[0]
