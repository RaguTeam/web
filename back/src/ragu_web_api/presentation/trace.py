"""Ответ сервиса в трейс для интерфейса.

Раньше трейс собирался из внутренностей движка: бэкенд сам лазил в retrieve-
объекты RAGU и вытаскивал оттуда сущности по именам атрибутов. Теперь сервис
отдаёт источники уже типизированными — `meta.kind` говорит, что это, — и
разбирать чужие структуры больше не нужно.

Чистые функции: ни сети, ни состояния.
"""

from __future__ import annotations

import logging

from ragu.api.models import EngineReport, SearchResponse, UsageModel

from ragu_web_api.presentation import graph
from ragu_web_api.config import Settings
from ragu_web_api.schemas.agent import (
    AnswerTrace,
    GraphHighlight,
    TraceChunk,
    TraceCommunity,
    TraceEnergy,
    TraceEntity,
    TraceQueryPlan,
    TraceRelation,
    TraceStageUsage,
    TraceTimings,
    TraceUsage,
)
from ragu_web_api.schemas.datasets import TraceEngine

LOGGER = logging.getLogger(__name__)

# Класс движка → режим. Сервис сообщает, какой класс отработал, а интерфейс
# оперирует режимами, и подставлять имя класса значило бы показать посетителю
# «MixSearchEngine».
_ENGINE_BY_CLASS: dict[str, TraceEngine] = {
    "MixSearchEngine": "mix",
    "LocalSearchEngine": "local",
    "NaiveSearchEngine": "naive",
    "GlobalSearchEngine": "global",
}

# Ватт-часы на секунду работы. Грубая оценка одного узла под нагрузкой: стенд
# считает не счёт за электричество, а порядок величины.
_WATT_HOURS_PER_SECOND = 0.11


def engine_used(engines: EngineReport) -> TraceEngine:
    """Режим, который реально отработал.

    Не `engines.requested`: запрошенный и отработавший расходятся, и весь смысл
    трейса в том, чтобы это было видно.
    """
    return _ENGINE_BY_CLASS.get(engines.used, engines.requested)  # type: ignore[return-value]


def _score(value: float | None) -> float:
    """Оценка релевантности в 0..1.

    Движки отдают по-разному: косинус, расстояние, ранг. Контракт фронта требует
    долю, поэтому зажимаем — с потерей различий выше единицы, но без выдумывания
    числа там, где его нет.
    """
    if value is None:
        return 0.0
    return max(0.0, min(1.0, float(value)))


# Цены задаются за тысячу токенов — так их публикуют провайдеры.
_PRICE_PER = 1000


def usage(model: UsageModel | None, settings: Settings) -> TraceUsage | None:
    """Токены и деньги одного запроса.

    Итоги считаются по стадиям, а не берутся из собственных полей сервиса: так
    сумма в интерфейсе сходится с разбивкой по построению. Расхождение между
    этими двумя источниками было бы ошибкой сервиса, и оно попадает в лог, а не
    в глаза посетителю в виде противоречащей самой себе витрины.
    """
    if model is None:
        return None

    stages = [
        TraceStageUsage(
            stage=name,
            calls=stage.calls,
            prompt_tokens=stage.prompt_tokens,
            completion_tokens=stage.completion_tokens,
        )
        for name, stage in sorted(model.stages.items())
    ]
    prompt = sum(stage.prompt_tokens for stage in stages)
    completion = sum(stage.completion_tokens for stage in stages)
    calls = sum(stage.calls for stage in stages)

    if (prompt, completion) != (model.prompt_tokens, model.completion_tokens):
        LOGGER.warning(
            "Usage totals disagree with the per-stage sums: service says "
            "%d/%d, stages add up to %d/%d.",
            model.prompt_tokens,
            model.completion_tokens,
            prompt,
            completion,
            extra={"event": "usage_mismatch"},
        )

    priced = bool(settings.token_price_prompt or settings.token_price_completion)
    cost = (
        prompt * settings.token_price_prompt
        + completion * settings.token_price_completion
    ) / _PRICE_PER
    return TraceUsage(
        estimated=model.estimated,
        calls=calls,
        prompt_tokens=prompt,
        completion_tokens=completion,
        total_tokens=prompt + completion,
        stages=stages,
        cost=round(cost, 6),
        currency=settings.token_price_currency,
        priced=priced,
    )


def timings(usage: UsageModel | None, total_ms: int) -> TraceTimings:
    """Стадии по данным сервиса, общее время — по нашим часам.

    Сумма стадий меньше общего намеренно: разница — это сеть и разбор ответа, и
    приписывать её ретривалу или генерации значило бы завысить любую из них.
    """
    retrieval = 0.0
    generation = 0.0
    for stage in (usage.stages if usage else {}).values():
        retrieval += stage.retrieval_ms or 0.0
        generation += stage.generation_ms or 0.0
    return TraceTimings(
        retrieval_ms=int(retrieval),
        generation_ms=int(generation),
        total_ms=total_ms,
    )


def build(
    response: SearchResponse,
    *,
    settings: Settings,
    top_k: int,
    total_ms: int,
    query_plan_requested: bool,
) -> AnswerTrace:
    """Трейс одного ответа."""
    entities: list[TraceEntity] = []
    relations: list[TraceRelation] = []
    chunks: list[TraceChunk] = []
    communities: list[TraceCommunity] = []

    for source in response.sources:
        meta = source.meta
        # Источник без meta разобрать нечем: его вид известен только сервису.
        # Молча выбрасываем — показать его как сущность значило бы соврать о типе.
        if meta is None:
            continue
        if meta.kind == "entity":
            entities.append(
                TraceEntity(
                    id=source.id,
                    label=meta.name,
                    entity_type=meta.type,
                    score=_score(source.score),
                )
            )
        elif meta.kind == "relation":
            relations.append(
                TraceRelation(
                    id=source.id,
                    source=meta.subject_id,
                    target=meta.object_id,
                    relation_type=meta.type,
                    strength=graph.strength(meta.strength),
                )
            )
        elif meta.kind == "chunk":
            chunks.append(
                TraceChunk(
                    id=source.id,
                    content=source.content,
                    doc_id=meta.doc_id or "",
                    score=_score(source.score),
                )
            )
        elif meta.kind == "community_summary":
            communities.append(
                TraceCommunity(
                    id=source.id,
                    title=meta.title or source.id,
                    summary=source.content,
                    score=_score(source.score),
                )
            )

    return AnswerTrace(
        engine=engine_used(response.engines),
        top_k=top_k,
        # Не то, что просили, а то, что реранкер действительно переставил.
        rerank=response.engines.reranked,
        rerank_error=response.engines.rerank_error,
        query_plan=(
            TraceQueryPlan(
                used=response.used_query_plan,
                sub_questions=[item.query for item in response.subqueries],
            )
            if query_plan_requested
            else None
        ),
        entities=entities,
        relations=relations,
        chunks=chunks,
        communities=communities,
        timings=timings(response.usage, total_ms),
        usage=usage(response.usage, settings),
        energy=TraceEnergy(
            watt_hours=round((total_ms / 1000) * _WATT_HOURS_PER_SECOND, 3),
            estimated=True,
        ),
        highlight=GraphHighlight(
            node_ids=[item.id for item in entities],
            edge_ids=[item.id for item in relations],
            community_ids=[item.id for item in communities],
        ),
    )
