# syntax=docker/dockerfile:1
#
# BFF демо. Ни движков, ни модели: всё это в соседнем образе ragu-api, сюда из
# graph-ragu импортируются только клиент и схемы сервиса.
#
# Сборка идёт через uv и uv.lock. Прежний `pip install .` брал graph-ragu с
# PyPI, потому что pip не читает [tool.uv.sources] — в образе оказывался не тот
# пакет, что в разработке, и молча.

FROM python:3.11-slim AS builder

ENV UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PYTHON_DOWNLOADS=never

WORKDIR /app

# git — graph-ragu ставится из ветки; build-essential — на случай пакета без
# готового колеса под эту платформу.
RUN apt-get update && apt-get install -y --no-install-recommends git build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY --from=ghcr.io/astral-sh/uv:0.5.11 /uv /usr/local/bin/uv

# Зависимости отдельным слоем: они меняются раз в месяц, а исходники — каждый
# коммит. Вместе они переустанавливали бы половину PyPI на каждую правку.
COPY pyproject.toml uv.lock ./
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-install-project --no-dev

# --frozen: ставить ровно то, что в локе. Разошёлся lock с pyproject — сборка
# падает, а не ставит тихо другую версию контракта.
# --no-editable: в рантайм уезжает только .venv, без /app/src.
COPY README.md ./
COPY src ./src
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev --no-editable


FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PATH="/app/.venv/bin:$PATH"

WORKDIR /app

COPY --from=builder /app/.venv /app/.venv

# tiktoken здесь не запекается намеренно: словарь BPE нужен движкам, а они
# живут в образе ragu-api. Импорт клиента и схем его не трогает.

EXPOSE 8000
# --no-access-log: RequestContextMiddleware пишет на запрос одну строку и
# богаче — с идентификатором, длительностью, статусом и клиентом. Строка
# uvicorn дублировала бы её, удваивая шум от сканеров, которого на этом хосте
# больше всего остального.
CMD ["uvicorn", "ragu_web_api.main:app", "--host", "0.0.0.0", "--port", "8000", "--no-access-log"]
