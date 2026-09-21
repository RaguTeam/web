"""Вопрос → ответ через ragu-api.

Генерации здесь нет и не будет: бэкенд не держит ни ключа к модели, ни промпта,
ни фолбэка на собственный ранкер. Он выбирает режим, называет язык ответа и
превращает ответ сервиса в трейс для интерфейса.

Ровно два решения принимаются на этой стороне, и оба — про собеседника, а не про
граф: на каком языке отвечать и каким режимом искать, если запрошенный этот
корпус не обслуживает.
"""

from __future__ import annotations

import logging
import time
import uuid
from datetime import datetime, timezone
from typing import Any

from fastapi import HTTPException

from ragu_web_api.catalog import Catalog
from ragu_web_api.config import Settings
from ragu_web_api.errors import MODE_UNAVAILABLE
from ragu_web_api.metrics import observe_answer, observe_dataset_request
from ragu_web_api.presentation import cards, language, trace
from ragu_web_api.presentation.cards import Corpus
from ragu_web_api.ragu_gateway import RaguGateway
from ragu_web_api.schemas.agent import (
    AgentRequest,
    AgentResponse,
    AssistantMessage,
    SuggestionsResponse,
)
from ragu_web_api.schemas.common import Locale
from ragu_web_api.schemas.datasets import SearchEngine

LOGGER = logging.getLogger(__name__)

# Режимы, которые MixSearchEngine умеет ансамблировать. `global` в список не
# входит намеренно: он стоит одного вызова LLM на каждое уцелевшее сообщество.
_MIX_CHILDREN: tuple[SearchEngine, ...] = ("local", "naive")


def _rerank_outcome(engines: Any) -> str:
    """Чем кончился реранк — тремя различимыми исходами.

    `reranked=False` само по себе не отличает «не просили» от «реранкер
    отказал», а на дашборде это разные новости: первое штатно, второе значит,
    что ответы хуже, чем могли бы быть, и никто об этом не знает.
    """
    if engines.reranked:
        return "applied"
    return "failed" if engines.rerank_error else "skipped"


class Answerer:
    """Чат по одному корпусу. Один экземпляр на процесс."""

    def __init__(
        self, gateway: RaguGateway, catalog: Catalog, settings: Settings
    ) -> None:
        self._gateway = gateway
        self._catalog = catalog
        self._settings = settings

    async def answer(self, dataset_id: str, request: AgentRequest) -> AgentResponse:
        observe_dataset_request(dataset_id, "agent")
        corpus = await self._catalog.corpus(dataset_id)
        mode = self._mode(corpus, request.engine)
        answer_language = language.answer_language(request)

        started = time.perf_counter()
        response = await self._gateway.search(
            dataset_id,
            mode,
            request.message,
            **self._body(
                mode, request=request, answer_language=answer_language, corpus=corpus
            ),
        )
        total_ms = int((time.perf_counter() - started) * 1000)

        answer_trace = trace.build(
            response,
            settings=self._settings,
            top_k=request.top_k,
            total_ms=total_ms,
            query_plan_requested=request.use_query_plan,
        )
        self._record(dataset_id, request, answer_trace, answer_language, response)

        return AgentResponse(
            message=AssistantMessage(
                id=f"msg-{uuid.uuid4().hex[:12]}",
                content=response.answer,
                created_at=datetime.now(timezone.utc),
                trace=answer_trace if request.include_trace else None,
            )
        )

    async def suggestions(
        self, dataset_id: str, locale: Locale = "ru"
    ) -> SuggestionsResponse:
        corpus = await self._catalog.corpus(dataset_id)
        return SuggestionsResponse(
            dataset_id=dataset_id,
            suggestions=cards.suggested_questions(corpus.entity_types, locale),
        )

    # --- выбор режима -----------------------------------------------------

    def _mode(self, corpus: Corpus, requested: SearchEngine) -> str:
        """Режим, которым будем искать.

        Запрошенный, если корпус его обслуживает. Иначе — первый доступный, с
        записью в лог: отказать значило бы упереть посетителя в тупик на кнопке,
        которую ему же и показали. Подмена не беззвучна — трейс называет тот
        режим, который отработал на самом деле.
        """
        available = corpus.engines
        if not available:
            raise HTTPException(
                status_code=MODE_UNAVAILABLE[0],
                detail={
                    "code": MODE_UNAVAILABLE[1],
                    "message": (
                        f"Dataset '{corpus.id}' cannot answer questions: "
                        f"{corpus.error or 'no mode is available'}."
                    ),
                },
            )
        if requested in available:
            return requested

        fallback = available[0]
        LOGGER.info(
            "Dataset '%s' does not serve '%s'; answering with '%s'.",
            corpus.id,
            requested,
            fallback,
            extra={
                "event": "mode_substituted",
                "dataset": corpus.id,
                "engine_requested": requested,
                "engine_substituted": fallback,
            },
        )
        return fallback

    def _body(
        self,
        mode: str,
        *,
        request: AgentRequest,
        answer_language: Locale,
        corpus: Corpus,
    ) -> dict[str, Any]:
        """Тело запроса к сервису.

        Формы у режимов разные, и лишнее поле означает 422: модели запроса
        запрещают неизвестные ключи. `global` не принимает ни декомпозиции, ни
        реранка — он и работает иначе.
        """
        body: dict[str, Any] = {"language": language.service_name(answer_language)}
        if mode == "global":
            return body

        # use_query_plan передаётся всегда: у сервиса он по умолчанию включён, а
        # у нас выключен, и промолчать значило бы получить декомпозицию там, где
        # её не просили, — с лишними вызовами LLM и лишними секундами.
        body["use_query_plan"] = request.use_query_plan
        body["rerank"] = request.rerank
        params = {"top_k": request.top_k}
        if mode != "mix":
            body["params"] = params
            return body

        body["local_params"] = params
        body["naive_params"] = params
        # Состав ансамбля задаём явно: ребёнок, которого корпус не обслуживает,
        # падает молча, и ответ собирается по оставшимся. Пустой список сервис
        # не принимает — тогда оставляем его умолчание.
        children = [child for child in _MIX_CHILDREN if child in corpus.engines]
        if children:
            body["engines"] = children
        return body

    # --- учёт -------------------------------------------------------------

    def _record(
        self,
        dataset_id: str,
        request: AgentRequest,
        answer_trace: Any,
        answer_language: Locale,
        response: Any,
    ) -> None:
        """Метрики и одна строка лога на ответ.

        Пишется здесь, а не в роутере: режим, который реально отработал, и
        размер контекста известны только после того, как сервис ответил.
        """
        usage = answer_trace.usage
        observe_answer(
            dataset=dataset_id,
            engine_requested=request.engine,
            engine_used=answer_trace.engine,
            language=answer_language,
            query_plan=request.use_query_plan,
            degraded=response.engines.degraded,
            rerank=_rerank_outcome(response.engines),
            retrieval_ms=answer_trace.timings.retrieval_ms,
            generation_ms=answer_trace.timings.generation_ms,
            chunks=len(answer_trace.chunks),
            prompt_tokens=usage.prompt_tokens if usage else 0,
            completion_tokens=usage.completion_tokens if usage else 0,
            cost=usage.cost if usage else 0.0,
        )
        engines = response.engines
        LOGGER.info(
            "answer dataset=%s engine=%s in %dms",
            dataset_id,
            answer_trace.engine,
            answer_trace.timings.total_ms,
            extra={
                "event": "agent_answer",
                "dataset_id": dataset_id,
                "engine_requested": request.engine,
                "engine_used": answer_trace.engine,
                # Ансамбль переживает падение ребёнка молча: запрос про граф и
                # чанки может быть отвечен по одним чанкам. Здесь это видно.
                "degraded": engines.degraded,
                "children_failed": [
                    child.engine for child in engines.children if not child.ok
                ],
                "reranked": engines.reranked,
                "rerank_error": engines.rerank_error,
                "language": answer_language,
                "query_plan": request.use_query_plan,
                "sub_questions": len(response.subqueries),
                "top_k": request.top_k,
                "entities": len(answer_trace.entities),
                "chunks": len(answer_trace.chunks),
                "retrieval_ms": answer_trace.timings.retrieval_ms,
                "generation_ms": answer_trace.timings.generation_ms,
                "total_ms": answer_trace.timings.total_ms,
                "prompt_tokens": usage.prompt_tokens if usage else None,
                "completion_tokens": usage.completion_tokens if usage else None,
                "cost": usage.cost if usage else None,
            },
        )
