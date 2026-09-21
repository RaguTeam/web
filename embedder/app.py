"""Embeddings and reranking server for RAGU (CPU, multi-model).

RAGU's ``EmbedderOpenAI`` talks to an OpenAI-compatible ``/v1/embeddings``
endpoint and selects the model with the request's ``model`` field. This server
hosts several sentence-transformers models at once, so one container can back
indexes that were built with different embedders:

    * ``BAAI/bge-large-en-v1.5``          -> 1024-dim (the medical graph)
    * ``Alibaba-NLP/gte-multilingual-base`` -> 768-dim (everything else)

Both are small and run comfortably on CPU. The set of models to preload is
configured with the ``EMBEDDER_MODELS`` env var (comma-separated HF ids). Any
model not preloaded is loaded lazily on first request and cached.

Reranking lives here too, behind ``POST /v1/score``. That route is NOT
OpenAI-shaped — RAGU's client posts ``{model, text_1, text_2}`` to
``{base_url}score`` and reads back ``{"data": [{"index", "score"}]}`` — so it is
implemented to that contract rather than to the OpenAI reranking API.

Rerankers are cross-encoders: they read the query and one candidate together,
which is what makes them better than vector similarity and also what makes them
cost one forward pass per candidate. On CPU that is the slowest thing in this
container, hence a base-size model and a hard ceiling on candidates per call.

Set ``RERANKER_MODELS`` empty to build the image without a reranker: the route
then answers 503 and RAGU keeps the un-reranked order.
"""
from __future__ import annotations

import asyncio
import os
from typing import Any

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool

DEFAULT_MODELS = "BAAI/bge-large-en-v1.5,Alibaba-NLP/gte-multilingual-base"

# Base-size, multilingual, обычная архитектура XLM-R без удалённого кода. Более
# крупный bge-reranker-v2-m3 точнее, но на CPU один запрос уезжает в секунды, а
# стенд этого не переживёт.
DEFAULT_RERANKERS = "BAAI/bge-reranker-base"

# Потолок кандидатов на один вызов. Кросс-энкодер считает по одному проходу на
# кандидата: сотня пар на CPU — это уже десятки секунд, и лучше отказать внятно,
# чем занять контейнер целиком.
MAX_CANDIDATES = int(os.getenv("RERANKER_MAX_CANDIDATES", "64"))

# Cosine-similarity vector DBs (RAGU uses nano-vectordb) expect L2-normalized
# vectors; both models above are trained for cosine. Normalizing is also
# rank-invariant for cosine, so it is safe regardless of how the index was built.
NORMALIZE = os.getenv("EMBEDDER_NORMALIZE", "true").strip().lower() not in {"0", "false", "no"}
DEVICE = os.getenv("EMBEDDER_DEVICE", "cpu")

_models: dict[str, Any] = {}
_locks: dict[str, asyncio.Lock] = {}
_registry_lock = asyncio.Lock()
# Models that load fine but cannot actually encode. Kept separately because
# loading and running are independent failure modes: gte-multilingual-base runs
# custom remote code that imports cleanly and then dies on the first forward
# pass under an unsupported sentence-transformers version.
_broken: dict[str, str] = {}

_rerankers: dict[str, Any] = {}
_reranker_locks: dict[str, asyncio.Lock] = {}


def _configured_models() -> list[str]:
    raw = os.getenv("EMBEDDER_MODELS", DEFAULT_MODELS)
    return [name.strip() for name in raw.split(",") if name.strip()]


def _configured_rerankers() -> list[str]:
    raw = os.getenv("RERANKER_MODELS", DEFAULT_RERANKERS)
    return [name.strip() for name in raw.split(",") if name.strip()]


def _load_reranker(name: str) -> Any:
    from sentence_transformers import CrossEncoder

    return CrossEncoder(name, device=DEVICE, trust_remote_code=True)


async def _get_reranker(name: str) -> Any:
    model = _rerankers.get(name)
    if model is not None:
        return model
    async with _registry_lock:
        lock = _reranker_locks.setdefault(name, asyncio.Lock())
    async with lock:
        model = _rerankers.get(name)
        if model is None:
            model = await run_in_threadpool(_load_reranker, name)
            _rerankers[name] = model
        return model


def _load_model(name: str) -> Any:
    # Imported here so the module stays importable without the heavy ML stack.
    from sentence_transformers import SentenceTransformer

    # trust_remote_code is required by Alibaba-NLP/gte-* (custom architecture)
    # and is harmless for bge.
    return SentenceTransformer(name, device=DEVICE, trust_remote_code=True)


async def _get_model(name: str) -> Any:
    model = _models.get(name)
    if model is not None:
        return model
    async with _registry_lock:
        lock = _locks.setdefault(name, asyncio.Lock())
    async with lock:
        model = _models.get(name)
        if model is None:
            model = await run_in_threadpool(_load_model, name)
            _models[name] = model
        return model


class ScoreRequest(BaseModel):
    """Форма запроса задана клиентом RAGU, а не OpenAI."""

    model: str
    text_1: str
    text_2: list[str]


class EmbeddingRequest(BaseModel):
    input: str | list[str]
    model: str
    # Accepted for OpenAI compatibility; ignored (server always returns floats).
    encoding_format: str | None = None
    dimensions: int | None = None
    user: str | None = None


app = FastAPI(title="RAGU Embeddings Server", version="1.0.0")


@app.on_event("startup")
async def _warmup() -> None:
    for name in _configured_models():
        try:
            model = await _get_model(name)
        except Exception as exc:  # keep serving whatever did load
            _broken[name] = f"load failed: {type(exc).__name__}: {exc}"
            print(f"[embedder] WARNING: failed to preload '{name}': {exc}", flush=True)
            continue
        # Encode one short text on the way up. Loading a model proves nothing
        # about running it, and a model that loads but cannot encode used to
        # look perfectly healthy while every search silently fell back to
        # keyword retrieval.
        try:
            vector = await run_in_threadpool(
                lambda: model.encode(
                    ["warmup"], normalize_embeddings=NORMALIZE, show_progress_bar=False
                )
            )
            print(f"[embedder] loaded '{name}' ({len(vector[0])} dims)", flush=True)
        except Exception as exc:
            _broken[name] = f"encode failed: {type(exc).__name__}: {exc}"
            print(
                f"[embedder] WARNING: '{name}' loaded but cannot encode: "
                f"{type(exc).__name__}: {exc}",
                flush=True,
            )


    for name in _configured_rerankers():
        try:
            model = await _get_reranker(name)
            await run_in_threadpool(lambda: model.predict([("q", "d")]))
            print(f"[embedder] loaded reranker '{name}'", flush=True)
        except Exception as exc:
            _broken[name] = f"reranker failed: {type(exc).__name__}: {exc}"
            print(
                f"[embedder] WARNING: reranker '{name}' unusable: "
                f"{type(exc).__name__}: {exc}",
                flush=True,
            )


@app.get("/health")
async def health() -> dict[str, Any]:
    # "ok" must mean "can serve embeddings", not "finished importing".
    return {
        "status": "degraded" if _broken else "ok",
        "loaded_models": sorted(set(_models) - set(_broken)),
        "loaded_rerankers": sorted(set(_rerankers) - set(_broken)),
        "broken_models": _broken,
    }


@app.get("/v1/models")
@app.get("/models")
async def list_models() -> dict[str, Any]:
    names = sorted(set(_configured_models()) | set(_models.keys()))
    return {
        "object": "list",
        "data": [{"id": name, "object": "model", "owned_by": "local"} for name in names],
    }


@app.post("/v1/embeddings")
@app.post("/embeddings")
async def create_embeddings(request: EmbeddingRequest) -> dict[str, Any]:
    texts = [request.input] if isinstance(request.input, str) else list(request.input)
    if not texts:
        raise HTTPException(status_code=400, detail="`input` must not be empty.")

    try:
        model = await _get_model(request.model)
    except Exception as exc:
        raise HTTPException(
            status_code=404,
            detail=f"Model '{request.model}' could not be loaded: {exc}",
        ) from exc

    try:
        vectors = await run_in_threadpool(
            lambda: model.encode(
                texts,
                normalize_embeddings=NORMALIZE,
                convert_to_numpy=True,
                show_progress_bar=False,
            ).tolist()
        )
    except Exception as exc:
        # An unhandled exception here becomes a bare 500, which reaches the
        # caller as "InternalServerError: Internal Server Error" — no model, no
        # cause. RAGU then degrades to keyword retrieval and the real error only
        # exists in this container's traceback. Say what broke.
        _broken[request.model] = f"encode failed: {type(exc).__name__}: {exc}"
        raise HTTPException(
            status_code=500,
            detail=(
                f"Model '{request.model}' failed to encode {len(texts)} text(s): "
                f"{type(exc).__name__}: {exc}"
            ),
        ) from exc

    data = [
        {"object": "embedding", "index": index, "embedding": vector}
        for index, vector in enumerate(vectors)
    ]
    total_tokens = sum(len(text) for text in texts)
    return {
        "object": "list",
        "data": data,
        "model": request.model,
        "usage": {"prompt_tokens": total_tokens, "total_tokens": total_tokens},
    }


@app.post("/v1/score")
@app.post("/score")
async def score(request: ScoreRequest) -> dict[str, Any]:
    """Переупорядочить кандидатов относительно запроса.

    Отказ здесь не обязан ломать ответ: RAGU оборачивает реранкер в
    ForgivingScorer и при ошибке возвращает исходный порядок, записав причину в
    `engines.rerank_error`. Поэтому важно сказать причину, а не отдать голый 500.
    """
    if not request.text_2:
        return {"object": "list", "data": [], "model": request.model}
    if len(request.text_2) > MAX_CANDIDATES:
        raise HTTPException(
            status_code=413,
            detail=(
                f"{len(request.text_2)} candidates is over the ceiling of "
                f"{MAX_CANDIDATES}: a cross-encoder runs one forward pass each, "
                "and on CPU this would hold the container for minutes."
            ),
        )

    try:
        model = await _get_reranker(request.model)
    except Exception as exc:
        raise HTTPException(
            status_code=404,
            detail=f"Reranker '{request.model}' could not be loaded: {exc}",
        ) from exc

    pairs = [(request.text_1, candidate) for candidate in request.text_2]
    try:
        # predict отдаёт ndarray, но не всегда: в зависимости от версии и
        # аргументов может вернуться и обычный список. Приводим по наличию
        # tolist, а не по типу.
        raw = await run_in_threadpool(
            lambda: model.predict(pairs, show_progress_bar=False)
        )
        scores = raw.tolist() if hasattr(raw, "tolist") else list(raw)
    except Exception as exc:
        _broken[request.model] = f"score failed: {type(exc).__name__}: {exc}"
        raise HTTPException(
            status_code=500,
            detail=(
                f"Reranker '{request.model}' failed on {len(pairs)} pair(s): "
                f"{type(exc).__name__}: {exc}"
            ),
        ) from exc

    data = [
        {"index": index, "score": float(value)}
        for index, value in sorted(
            enumerate(scores), key=lambda item: item[1], reverse=True
        )
    ]
    return {"object": "list", "data": data, "model": request.model}
