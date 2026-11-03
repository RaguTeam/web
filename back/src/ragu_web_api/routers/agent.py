import json
import logging
from typing import Annotated, Any

from fastapi import APIRouter, Depends, Query, Request
from fastapi.responses import StreamingResponse

from ragu_web_api.answer import Answerer
from ragu_web_api.dependencies import get_answerer, get_limiter
from ragu_web_api.limits import QuestionLimiter, client_address
from ragu_web_api.schemas.agent import AgentRequest, AgentResponse, SuggestionsResponse
from ragu_web_api.schemas.common import ErrorResponse, Locale

LOGGER = logging.getLogger(__name__)

router = APIRouter(
    prefix="/datasets/{dataset_id}/agent",
    tags=["Agent"],
    responses={404: {"model": ErrorResponse, "description": "Dataset not found."}},
)

_LIMITED = {
    429: {
        "model": ErrorResponse,
        "description": (
            "Question limit reached: `rate_limited` (per minute), "
            "`client_daily_limit_reached` or `daily_limit_reached` (per day). "
            "`Retry-After` says when to ask again."
        ),
    }
}


def admit_question(
    request: Request, limiter: Annotated[QuestionLimiter, Depends(get_limiter)]
) -> None:
    """Считается до вызова модели: отказ не должен стоить ни копейки."""
    limiter.admit(client_address(request))


@router.post(
    "/messages",
    response_model=AgentResponse,
    summary="Ask a question over a dataset graph",
    dependencies=[Depends(admit_question)],
    responses=_LIMITED,
)
async def create_agent_message(
    dataset_id: str,
    request: AgentRequest,
    answerer: Annotated[Answerer, Depends(get_answerer)],
) -> AgentResponse:
    return await answerer.answer(dataset_id=dataset_id, request=request)


def _sse(event: str, data: dict[str, Any]) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


@router.post(
    "/messages/stream",
    response_class=StreamingResponse,
    summary="Ask a question and receive the answer as it is generated",
    responses={
        200: {
            "description": (
                "Server-Sent Events: `delta` with `{text}` for each piece of the "
                "answer, then `message` with the same body as `POST /messages`. "
                "A failure after the stream has started arrives as `error` with "
                "`{code, message}`, and no `message` follows it."
            ),
            "content": {"text/event-stream": {"schema": {"type": "string"}}},
        },
        **_LIMITED,
    },
    dependencies=[Depends(admit_question)],
)
async def stream_agent_message(
    dataset_id: str,
    request: AgentRequest,
    answerer: Annotated[Answerer, Depends(get_answerer)],
) -> StreamingResponse:
    events = answerer.stream(dataset_id=dataset_id, request=request)
    # Первое событие ждём здесь: пока заголовки не ушли, отказ — неизвестный
    # корпус, недоступный режим, занятый сервис — ещё передаётся статусом.
    first = await anext(events, None)

    async def body():
        if first is None:
            return
        yield _sse(*first)
        try:
            async for event, data in events:
                yield _sse(event, data)
        except Exception:
            LOGGER.exception("answer stream for '%s' broke", dataset_id)
            yield _sse(
                "error",
                {"code": "upstream_error", "message": "The answer stream broke."},
            )

    return StreamingResponse(
        body(),
        media_type="text/event-stream",
        # X-Accel-Buffering — для прокси, которые иначе копят ответ целиком.
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@router.get(
    "/suggestions",
    response_model=SuggestionsResponse,
    summary="Get dataset-specific starter questions",
)
async def get_agent_suggestions(
    dataset_id: str,
    answerer: Annotated[Answerer, Depends(get_answerer)],
    locale: Annotated[Locale, Query(description="Response locale.")] = "ru",
) -> SuggestionsResponse:
    return await answerer.suggestions(dataset_id=dataset_id, locale=locale)
