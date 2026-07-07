from typing import Annotated

from fastapi import APIRouter, Depends, Query

from ragu_web_api.schemas.common import ErrorResponse, Locale
from ragu_web_api.schemas.datasets import DatasetCard, DatasetDetail
from ragu_web_api.services.dependencies import get_repository
from ragu_web_api.services.index_repository import IndexRepository

router = APIRouter(
    prefix="/datasets",
    tags=["Datasets"],
    responses={404: {"model": ErrorResponse, "description": "Dataset not found."}},
)


@router.get(
    "",
    response_model=list[DatasetCard],
    summary="List preindexed datasets",
)
async def list_datasets(
    repository: Annotated[IndexRepository, Depends(get_repository)],
    locale: Annotated[Locale, Query(description="Response locale.")] = "ru",
) -> list[DatasetCard]:
    return repository.list_datasets(locale=locale)


@router.get(
    "/{dataset_id}",
    response_model=DatasetDetail,
    summary="Get dataset details",
)
async def get_dataset(
    dataset_id: str,
    repository: Annotated[IndexRepository, Depends(get_repository)],
    locale: Annotated[Locale, Query(description="Response locale.")] = "ru",
) -> DatasetDetail:
    return repository.get_dataset(dataset_id=dataset_id, locale=locale)
