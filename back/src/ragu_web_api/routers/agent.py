from typing import Annotated

from fastapi import APIRouter, Depends, Query

from ragu_web_api.answer import Answerer
from ragu_web_api.schemas.agent import AgentRequest, AgentResponse, SuggestionsResponse
from ragu_web_api.schemas.common import ErrorResponse, Locale
from ragu_web_api.services.dependencies import get_answerer

router = APIRouter(
    prefix="/datasets/{dataset_id}/agent",
    tags=["Agent"],
    responses={404: {"model": ErrorResponse, "description": "Dataset not found."}},
)


@router.post(
    "/messages",
    response_model=AgentResponse,
    summary="Ask a question over a dataset graph",
)
async def create_agent_message(
    dataset_id: str,
    request: AgentRequest,
    answerer: Annotated[Answerer, Depends(get_answerer)],
) -> AgentResponse:
    return await answerer.answer(dataset_id=dataset_id, request=request)


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
