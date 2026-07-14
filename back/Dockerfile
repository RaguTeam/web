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

EXPOSE 8000
CMD ["uvicorn", "ragu_web_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
