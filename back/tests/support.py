"""Общая оснастка тестов бэкенда: ни сети, ни индекса на диске.

`FakeGateway` повторяет ровно ту поверхность `RaguGateway`, которую зовут
сценарии, и запоминает, с чем его позвали. Этого достаточно, чтобы проверять
решения — какой режим выбран, какой язык уехал, что попало в тело запроса, —
не поднимая ни сервис, ни модель.
"""

from __future__ import annotations

import asyncio
import functools
from typing import Any

from fastapi import HTTPException
from ragu.api.models import (
    EngineReport,
    EntityItem,
    EntityPage,
    GraphDetail,
    GraphInfo,
    GraphListResponse,
    ModeAvailability,
    PageInfo,
    SearchResponse,
)

from ragu_web_api.config import Settings


def asyncio_test(fn):
    """Один цикл событий на тест.

    Без pytest-asyncio и намеренно: зависимость ради двух десятков тестов не
    нужна. Внутри одного `asyncio.run` — потому что `asyncio.Lock` каталога
    привязывается к циклу на первом ожидании и второго вызова не переживёт.
    """

    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        return asyncio.run(fn(*args, **kwargs))

    return wrapper


def settings(**overrides) -> Settings:
    payload = {
        "ragu_api_url": "http://ragu-api:8020",
        "ragu_api_key": "secret",
        "ragu_api_timeout": 240.0,
        "graph_page_size": 1000,
        "token_price_prompt": 0.0,
        "token_price_completion": 0.0,
        "catalog_ttl": 60.0,
        "dataset_ttl": 300.0,
        "subgraph_ttl": 300.0,
    }
    payload.update(overrides)
    return Settings(**payload)


def modes(*available: str) -> list[ModeAvailability]:
    return [
        ModeAvailability(mode=mode, available=mode in available)
        for mode in ("global", "local", "naive", "mix")
    ]


def info(graph_id: str, **overrides) -> GraphInfo:
    payload: dict[str, Any] = {"id": graph_id, "loaded": True, "language": "russian"}
    payload.update(overrides)
    return GraphInfo(**payload)


def detail(graph_id: str, **overrides) -> GraphDetail:
    payload: dict[str, Any] = {
        "id": graph_id,
        "loaded": True,
        "language": "russian",
        "entities": 2400,
        "relations": 7100,
        "chunks": 320,
        "communities": 38,
        "community_summaries": 38,
        "documents": 12,
        "embedding_dim": 768,
        "modes": modes("local", "naive", "mix"),
    }
    payload.update(overrides)
    return GraphDetail(**payload)


def search_response(**overrides) -> SearchResponse:
    payload: dict[str, Any] = {
        "query": "вопрос",
        "mode": "mix",
        "used_query_plan": False,
        "answer": "ответ",
        "sources": [],
        "subqueries": [],
        "engines": EngineReport(requested="mix", used="MixSearchEngine"),
    }
    payload.update(overrides)
    return SearchResponse(**payload)


class FakeGateway:
    """Поверхность шлюза, которую зовут сценарии, плюс журнал обращений."""

    def __init__(self, infos: list[GraphInfo], details=None, types=None, answer=None):
        self._infos = infos
        self._details = details or {item.id: detail(item.id) for item in infos}
        self._types = types or {}
        self._answer = answer or search_response()
        self.calls: dict[str, int] = {}
        self.searches: list[dict[str, Any]] = []
        self.fail_on_graphs = False

    def _count(self, name: str) -> None:
        self.calls[name] = self.calls.get(name, 0) + 1

    async def graphs(self) -> GraphListResponse:
        self._count("graphs")
        if self.fail_on_graphs:
            raise HTTPException(status_code=503, detail={"code": "service_not_ready"})
        return GraphListResponse(
            default=self._infos[0].id if self._infos else "", graphs=self._infos
        )

    async def stats(self, dataset: str) -> GraphDetail:
        self._count("stats")
        found = self._details[dataset]
        if isinstance(found, Exception):
            raise found
        return found

    async def entities(self, dataset: str, **kwargs) -> EntityPage:
        self._count("entities")
        names = self._types.get(dataset, ["PERSON"])
        entities = [
            EntityItem(id=f"e{index}", name=f"e{index}", type=name)
            for index, name in enumerate(names)
        ]
        return EntityPage(
            page=PageInfo(total=len(entities), limit=500, offset=0), entities=entities
        )

    async def search(self, dataset: str, mode: str, query: str, **body) -> SearchResponse:
        self._count("search")
        self.searches.append({"dataset": dataset, "mode": mode, "query": query, **body})
        return self._answer

    @property
    def last_search(self) -> dict[str, Any]:
        return self.searches[-1]
