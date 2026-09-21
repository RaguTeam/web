from typing import Annotated

from fastapi import APIRouter, Depends, Query

from ragu_web_api.catalog import Catalog
from ragu_web_api.dependencies import get_catalog
from ragu_web_api.schemas.common import ErrorResponse, Locale
from ragu_web_api.schemas.datasets import DatasetCard, DatasetDetail

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
    catalog: Annotated[Catalog, Depends(get_catalog)],
    locale: Annotated[Locale, Query(description="Response locale.")] = "ru",
) -> list[DatasetCard]:
    return await catalog.cards(locale=locale)


@router.get(
    "/{dataset_id}",
    response_model=DatasetDetail,
    summary="Get dataset details",
)
async def get_dataset(
    dataset_id: str,
    catalog: Annotated[Catalog, Depends(get_catalog)],
    locale: Annotated[Locale, Query(description="Response locale.")] = "ru",
) -> DatasetDetail:
    return await catalog.detail(dataset_id=dataset_id, locale=locale)
