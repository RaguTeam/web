# syntax=docker/dockerfile:1
FROM python:3.11-slim
ENV PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1
WORKDIR /app

# git нужен, если ragu/graph-ragu ставятся из git; build-essential — на случай нативных колёс
RUN apt-get update && apt-get install -y --no-install-recommends git build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml README.md ./
COPY src ./src
RUN python -m pip install --upgrade pip && python -m pip install .

# RAGU's engines build a tiktoken TokenTruncation eagerly on construction, which
# downloads the BPE file. Bake it into the image so the first search request is
# fast and a network hiccup can't silently drop us to keyword search.
ENV TIKTOKEN_CACHE_DIR=/opt/tiktoken_cache
RUN mkdir -p "$TIKTOKEN_CACHE_DIR" \
    && python -c "import tiktoken; [tiktoken.encoding_for_model(m) for m in ('gpt-4', 'gpt-4o', 'text-embedding-3-large')]"

EXPOSE 8000
CMD ["uvicorn", "ragu_web_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
