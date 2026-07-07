from typing import Annotated

from fastapi import APIRouter, Depends, Query

from ragu_web_api.schemas.agent import AgentRequest, AgentResponse, SuggestionsResponse
from ragu_web_api.schemas.common import ErrorResponse, Locale
from ragu_web_api.services.dependencies import get_repository
from ragu_web_api.services.index_repository import IndexRepository

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
    repository: Annotated[IndexRepository, Depends(get_repository)],
) -> AgentResponse:
    return await repository.answer(dataset_id=dataset_id, request=request)


@router.get(
    "/suggestions",
    response_model=SuggestionsResponse,
    summary="Get dataset-specific starter questions",
)
async def get_agent_suggestions(
    dataset_id: str,
    repository: Annotated[IndexRepository, Depends(get_repository)],
    locale: Annotated[Locale, Query(description="Response locale.")] = "ru",
) -> SuggestionsResponse:
    return repository.get_suggestions(dataset_id=dataset_id, locale=locale)
