from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

from ragu_web_api import __version__
from ragu_web_api.routers import api_router


# Use the endpoint function name as the OpenAPI operationId so codegen produces
# short, stable identifiers ( `get_graph` instead of the auto-generated
# `get_graph_api_v1_datasets__dataset_id__graph_get` ).
def _short_operation_id(route: APIRoute) -> str:
    return route.name


OPENAPI_TAGS = [
    {
        "name": "System",
        "description": "Health checks and runtime feature flags.",
    },
    {
        "name": "Datasets",
        "description": "Discovered preindexed RAGU datasets.",
    },
    {
        "name": "Graph Explorer",
        "description": "Node-link graph, entity cards, neighborhoods, and communities.",
    },
    {
        "name": "Agent",
        "description": "Question answering over a selected graph with structured traces.",
    },
]


FRONTEND_DIST = Path(__file__).resolve().parents[3] / "front" / "app" / "-"
FRONTEND_INDEX = FRONTEND_DIST / "index.html"


def create_app() -> FastAPI:
    app = FastAPI(
        title="RAGU Web API Gateway",
        version=__version__,
        summary="FastAPI gateway for preindexed RAGU graphs.",
        description=(
            "FastAPI gateway for dataset selection, graph exploration, and "
            "question answering over existing RAGU index folders. Live indexing, "
            "job queues, and GPU workers are intentionally not exposed."
        ),
        openapi_tags=OPENAPI_TAGS,
        generate_unique_id_function=_short_operation_id,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "https://b-on-g.github.io",
            "http://localhost:9080",
            "http://127.0.0.1:9080",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/", include_in_schema=False)
    async def root():
        if FRONTEND_INDEX.exists():
            return FileResponse(FRONTEND_INDEX)
        return RedirectResponse(url="/docs")

    app.include_router(api_router, prefix="/api/v1")
    if FRONTEND_INDEX.exists():
        app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="frontend")
    return app


app = create_app()
