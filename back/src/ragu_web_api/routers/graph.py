from typing import Annotated

from fastapi import APIRouter, Depends, Query

from ragu_web_api.dependencies import get_graph_view
from ragu_web_api.graph_view import GraphView
from ragu_web_api.schemas.common import ErrorResponse
from ragu_web_api.schemas.graph import (
    EntityType,
    GraphCommunitiesResponse,
    GraphResponse,
    NodeDetailResponse,
)

router = APIRouter(
    prefix="/datasets/{dataset_id}/graph",
    tags=["Graph Explorer"],
    responses={404: {"model": ErrorResponse, "description": "Dataset or graph resource not found."}},
)


@router.get(
    "",
    response_model=GraphResponse,
    summary="Get graph node-link data",
)
async def get_graph(
    dataset_id: str,
    view: Annotated[GraphView, Depends(get_graph_view)],
    # Без верхней границы намеренно. Прежние 5000 были потолком страницы
    # сервиса, который по недосмотру стал потолком выдачи: корпус крупнее
    # обрезался молча. Теперь это размер шага, а не предел.
    limit: Annotated[int, Query(ge=1)] = 500,
    search: Annotated[str | None, Query(min_length=1)] = None,
    entity_types: Annotated[list[EntityType] | None, Query()] = None,
    community_ids: Annotated[list[str] | None, Query()] = None,
    min_strength: Annotated[float, Query(ge=0.0, le=1.0)] = 0.0,
    include_communities: bool = True,
) -> GraphResponse:
    return await view.graph(
        dataset_id,
        limit=limit,
        search=search,
        entity_types=entity_types,
        community_ids=community_ids,
        min_strength=min_strength,
        include_communities=include_communities,
    )


@router.get(
    "/nodes/{node_id}",
    response_model=NodeDetailResponse,
    summary="Get entity card data",
)
async def get_node(
    dataset_id: str,
    node_id: str,
    view: Annotated[GraphView, Depends(get_graph_view)],
) -> NodeDetailResponse:
    return await view.node(dataset_id, node_id)


@router.get(
    "/nodes/{node_id}/neighbors",
    response_model=GraphResponse,
    summary="Get a node neighborhood subgraph",
)
async def get_node_neighbors(
    dataset_id: str,
    node_id: str,
    view: Annotated[GraphView, Depends(get_graph_view)],
    depth: Annotated[int, Query(ge=1, le=3)] = 1,
    limit: Annotated[int, Query(ge=1, le=1000)] = 100,
    min_strength: Annotated[float, Query(ge=0.0, le=1.0)] = 0.0,
) -> GraphResponse:
    return await view.neighbors(
        dataset_id,
        node_id,
        depth=depth,
        limit=limit,
        min_strength=min_strength,
    )


@router.get(
    "/communities",
    response_model=GraphCommunitiesResponse,
    summary="List graph communities",
)
async def get_communities(
    dataset_id: str,
    view: Annotated[GraphView, Depends(get_graph_view)],
) -> GraphCommunitiesResponse:
    return await view.communities(dataset_id)
