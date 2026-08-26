from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from prometheus_fastapi_instrumentator import Instrumentator, metrics

from ragu_web_api import __version__
from ragu_web_api.logging_setup import configure_logging

# Must run before the routers import: that import builds the IndexRepository
# singleton, which logs its startup diagnostics on the way up. Configure the
# handler after it and those lines are already gone.
configure_logging()

from ragu_web_api.middleware import (  # noqa: E402
    REQUEST_ID_HEADER,
    RequestContextMiddleware,
)
from ragu_web_api.routers import api_router  # noqa: E402


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
            "https://raguteam.github.io",
            "https://b-on-g.github.io",
            "http://localhost:9080",
            "http://127.0.0.1:9080",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        # The browser can only read a response header we expose. Without this the
        # frontend cannot show the request id, which defeats the point of
        # returning it: a visitor could not quote it back to us.
        expose_headers=[REQUEST_ID_HEADER],
    )
    # Added last so it wraps CORS too — an id is assigned before anything else
    # can log, including preflight handling.
    app.add_middleware(RequestContextMiddleware)

    @app.get("/", include_in_schema=False)
    async def root():
        if FRONTEND_INDEX.exists():
            return FileResponse(FRONTEND_INDEX)
        return RedirectResponse(url="/docs")

    app.include_router(api_router, prefix="/api/v1")

    # Prometheus metrics on /metrics: request counts, latency histograms and
    # status codes, grouped by route template rather than by concrete path — so
    # every dataset does not become its own time series.
    #
    # Must be instrumented before the catch-all StaticFiles mount below, which
    # would otherwise swallow the route. Not exposed publicly: Caddy answers 404
    # for /metrics, and Prometheus scrapes back:8000 inside the docker network.
    instrumentator = Instrumentator(
        should_group_status_codes=False,
        excluded_handlers=["/metrics", "/health"],
    )
    # Explicit buckets, because the library's defaults stop at one second while
    # an agent answer costs several: retrieval plus an LLM call. With the stock
    # buckets every real answer lands in +Inf and the percentiles say nothing.
    instrumentator.add(
        metrics.latency(
            buckets=(0.1, 0.25, 0.5, 1, 2, 5, 10, 20, 30, 60, float("inf")),
        )
    )
    instrumentator.add(metrics.requests())
    instrumentator.instrument(app).expose(app, include_in_schema=False)

    if FRONTEND_INDEX.exists():
        app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="frontend")
    return app


app = create_app()
