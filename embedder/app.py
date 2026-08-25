"""OpenAI-compatible embeddings server for RAGU (CPU, multi-model).

RAGU's ``EmbedderOpenAI`` talks to an OpenAI-compatible ``/v1/embeddings``
endpoint and selects the model with the request's ``model`` field. This server
hosts several sentence-transformers models at once, so one container can back
indexes that were built with different embedders:

    * ``BAAI/bge-large-en-v1.5``          -> 1024-dim (the medical graph)
    * ``Alibaba-NLP/gte-multilingual-base`` -> 768-dim (everything else)

Both are small and run comfortably on CPU. The set of models to preload is
configured with the ``EMBEDDER_MODELS`` env var (comma-separated HF ids). Any
model not preloaded is loaded lazily on first request and cached.
"""
from __future__ import annotations

import asyncio
import os
from typing import Any

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool

DEFAULT_MODELS = "BAAI/bge-large-en-v1.5,Alibaba-NLP/gte-multilingual-base"

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


def _configured_models() -> list[str]:
    raw = os.getenv("EMBEDDER_MODELS", DEFAULT_MODELS)
    return [name.strip() for name in raw.split(",") if name.strip()]


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


@app.get("/health")
async def health() -> dict[str, Any]:
    # "ok" must mean "can serve embeddings", not "finished importing".
    return {
        "status": "degraded" if _broken else "ok",
        "loaded_models": sorted(set(_models) - set(_broken)),
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
