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
            await _get_model(name)
            print(f"[embedder] loaded '{name}'", flush=True)
        except Exception as exc:  # keep serving whatever did load
            print(f"[embedder] WARNING: failed to preload '{name}': {exc}", flush=True)


@app.get("/health")
async def health() -> dict[str, Any]:
    return {"status": "ok", "loaded_models": sorted(_models.keys())}


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

    vectors = await run_in_threadpool(
        lambda: model.encode(
            texts,
            normalize_embeddings=NORMALIZE,
            convert_to_numpy=True,
            show_progress_bar=False,
        ).tolist()
    )

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
