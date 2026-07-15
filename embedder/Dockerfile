# syntax=docker/dockerfile:1
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    HF_HOME=/models \
    SENTENCE_TRANSFORMERS_HOME=/models \
    HF_HUB_DISABLE_TELEMETRY=1 \
    EMBEDDER_MODELS="BAAI/bge-large-en-v1.5,Alibaba-NLP/gte-multilingual-base"

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends build-essential curl \
    && rm -rf /var/lib/apt/lists/*

# CPU-only torch keeps the image lean; sentence-transformers reuses this build.
RUN python -m pip install --upgrade pip \
    && pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py ./

# Bake the model weights into the image so container start needs no network
# and is fast. Requires internet at build time (models are public on HF).
RUN python -c "import os; from sentence_transformers import SentenceTransformer; [SentenceTransformer(m, device='cpu', trust_remote_code=True) for m in os.environ['EMBEDDER_MODELS'].split(',')]"

EXPOSE 8001
HEALTHCHECK --interval=30s --timeout=5s --start-period=180s --retries=5 \
  CMD curl -fsS http://localhost:8001/health || exit 1

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001"]
