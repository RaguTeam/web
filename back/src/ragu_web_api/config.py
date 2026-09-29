"""Настройки BFF.

Единственное место, где читается окружение. До переезда разбор env был размазан
по репозиторию индексов вперемешку с логикой поиска — из-за этого, в частности,
неверный язык доезжал до движков незамеченным.

После переезда бэкенд демо не знает ни про индексы, ни про эмбеддер, ни про
модель: всем этим владеет `ragu-api`. Здесь остаётся адрес сервиса, ключ,
таймаут, цены токенов и размеры страниц при сборке графа.
"""

from __future__ import annotations

import os
from dataclasses import dataclass

# Потолок страницы у /entities и /relations в ragu-api. Выборка по ?ids=
# ограничена отдельно 500 — там предел не серверный, а длина URL.
RAGU_PAGE_MAX = 5000
RAGU_IDS_MAX = 500


def _env_float(name: str, default: float) -> float:
    raw = os.getenv(name)
    if not raw:
        return default
    try:
        return float(raw)
    except ValueError:
        return default


def _env_int(name: str, default: int) -> int:
    raw = os.getenv(name)
    if not raw:
        return default
    try:
        return int(raw)
    except ValueError:
        return default


@dataclass(frozen=True)
class Settings:
    """Конфигурация процесса. Собирается один раз, в рантайме не меняется."""

    ragu_api_url: str
    ragu_api_key: str | None
    # Строго меньше RAGU_API_REQUEST_TIMEOUT сервиса (по умолчанию 300 с).
    # Больше — отвалится сервер и придёт 504; заметно меньше — мы бросим запрос,
    # за который уже заплачено вызовами LLM.
    ragu_api_timeout: float

    # Размер страницы при сборке подграфа. Не потолок ответа фронту: выдача
    # вершин намеренно не ограничена, страницами только забираем.
    graph_page_size: int

    # Цена за 1000 токенов для витрины стоимости. Сервис отдаёт токены с
    # пометкой estimated — они посчитаны токенизатором, а не провайдером,
    # поэтому годятся для оценки запроса, но не для счёта.
    token_price_prompt: float
    token_price_completion: float
    # Только подпись к числу: валюту цен мы ниоткуда не знаем.
    token_price_currency: str

    # TTL кэшей BFF. Полный граф не кэшируется вовсе — ради этого затевался
    # переезд.
    catalog_ttl: float
    dataset_ttl: float
    subgraph_ttl: float

    @property
    def has_api_key(self) -> bool:
        return bool(self.ragu_api_key)


def load_settings() -> Settings:
    """Прочитать окружение. Значения по умолчанию рассчитаны на docker-сеть."""
    page = _env_int("GRAPH_PAGE_SIZE", 1000)
    return Settings(
        ragu_api_url=os.getenv("RAGU_API_URL", "http://ragu-api:8020").rstrip("/"),
        ragu_api_key=os.getenv("RAGU_API_KEY") or None,
        ragu_api_timeout=_env_float("RAGU_API_TIMEOUT", 240.0),
        graph_page_size=max(1, min(page, RAGU_PAGE_MAX)),
        token_price_prompt=_env_float("TOKEN_PRICE_PROMPT", 0.0),
        token_price_completion=_env_float("TOKEN_PRICE_COMPLETION", 0.0),
        token_price_currency=os.getenv("TOKEN_PRICE_CURRENCY", ""),
        catalog_ttl=_env_float("CATALOG_TTL", 60.0),
        dataset_ttl=_env_float("DATASET_TTL", 300.0),
        subgraph_ttl=_env_float("SUBGRAPH_TTL", 300.0),
    )
