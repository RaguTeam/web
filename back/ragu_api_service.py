"""Точка входа ragu-api с реранкером из окружения.

`python -m ragu.api` зовёт `create_app(settings)` и реранкер не строит:
параметр у фабрики есть — «модель живёт в своём контейнере, поэтому сервис её
не создаёт, а принимает», — но CLI передать его не даёт, а RERANKER_* из
`ragu.common.env.Env` никем на этом пути не читаются. Здесь именно та точка
расширения, которую фабрика и предусмотрела.

Временная мера. Когда сервис начнёт собирать Scorer сам, файл удаляется, а
CMD возвращается на `python -m ragu.api`.
"""

from __future__ import annotations

import os

import uvicorn
from ragu.api.app import create_app
from ragu.api.config import ServiceSettings
from ragu.api.logging_setup import configure_logging
from ragu.models.openai import CachedAsyncOpenAI
from ragu.models.scorer import Scorer, ScorerOpenAI


def build_reranker() -> Scorer | None:
    """Реранкер по RERANKER_*, или None, если он не настроен.

    Без него сервис отвечает без переупорядочивания — это рабочий режим, а не
    отказ: `rerank=true` в запросе тогда просто ничего не меняет.
    """
    base_url = (os.getenv("RERANKER_BASE_URL") or "").strip()
    model_name = (os.getenv("RERANKER_MODEL_NAME") or "").strip()
    if not base_url or not model_name:
        return None

    # Клиент RAGU дописывает к base_url путь `score` без разделителя, поэтому
    # слеш на конце обязателен: без него запрос уходит на /v1score.
    if not base_url.endswith("/"):
        base_url += "/"

    return ScorerOpenAI(
        client=CachedAsyncOpenAI(
            base_url=base_url,
            api_key=os.getenv("RERANKER_API_KEY") or "unused",
        ),
        model_name=model_name,
    )


def main() -> None:
    configure_logging(os.getenv("RAGU_API_LOG_LEVEL", "info"))
    settings = ServiceSettings()
    reranker = build_reranker()
    print(
        f"[ragu-api] reranker: {os.getenv('RERANKER_MODEL_NAME') or 'not configured'}",
        flush=True,
    )
    uvicorn.run(
        create_app(settings, reranker=reranker),
        host=settings.host,
        port=settings.port,
        # configure_logging уже увёл стандартный logging в loguru; свой
        # dictConfig uvicorn поставил бы поверх второй набор обработчиков.
        log_config=None,
    )


if __name__ == "__main__":
    main()
