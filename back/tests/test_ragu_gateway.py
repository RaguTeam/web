"""Шлюз к ragu-api.

Сети нет: httpx получает поддельный транспорт, который возвращает заранее
заданный ответ и запоминает запрос. Так проверяется то, что иначе видно только
на живом стенде, — что уезжает на провод.
"""

import httpx
import pytest
from fastapi import HTTPException
from support import asyncio_test, settings

from ragu_web_api.logging_setup import REQUEST_ID_HEADER, request_id_var
from ragu_web_api.ragu_gateway import RaguGateway


class Wire:
    """Поддельный транспорт: помнит последний запрос, отвечает заготовкой."""

    def __init__(self, payload: object, status: int = 200) -> None:
        self.payload = payload
        self.status = status
        self.seen: httpx.Request | None = None

    def transport(self) -> httpx.MockTransport:
        def handle(request: httpx.Request) -> httpx.Response:
            self.seen = request
            return httpx.Response(self.status, json=self.payload)

        return httpx.MockTransport(handle)


def _gateway(wire: Wire, **overrides) -> RaguGateway:
    return RaguGateway(settings(**overrides), transport=wire.transport())


_EMPTY_GRAPHS = {"default": "medical", "graphs": []}


# ---------- сквозной идентификатор ----------


@asyncio_test
async def test_request_id_travels_to_the_service() -> None:
    """Одна строка из devtools должна находить запись в логах обоих процессов.

    Заголовок ставится в `_request`, а не в отдельных вызовах: `_get` складывает
    всё, что ему передали, в query-строку и заголовки принимать не умеет.
    """
    wire = Wire(_EMPTY_GRAPHS)
    token = request_id_var.set("abc123")
    try:
        await _gateway(wire).graphs()
    finally:
        request_id_var.reset(token)
    assert wire.seen.headers[REQUEST_ID_HEADER] == "abc123"


@asyncio_test
async def test_api_key_travels_too() -> None:
    wire = Wire(_EMPTY_GRAPHS)
    await _gateway(wire).graphs()
    assert wire.seen.headers["authorization"] == "Bearer secret"


# ---------- маршруты, которых ещё нет у клиента ----------


@asyncio_test
async def test_entity_filters_reach_the_query_string() -> None:
    """Сортировка и фильтры появились в сервисе раньше, чем в его клиенте."""
    wire = Wire({"page": {"total": 0, "limit": 50, "offset": 0}, "entities": []})
    await _gateway(wire).entities("medical", sort="degree", order="desc", limit=500)
    query = dict(wire.seen.url.params)
    assert query["sort"] == "degree"
    assert query["order"] == "desc"
    assert wire.seen.url.path == "/v1/graphs/medical/entities"


@asyncio_test
async def test_relation_selection_goes_in_the_body() -> None:
    """Пятьсот идентификаторов по 36 символов дают URL около 24 КБ при типовом
    потолке строки запроса 8."""
    wire = Wire({"page": {"total": 0, "limit": 500, "offset": 0}, "relations": []})
    ids = [f"entity-{index}" for index in range(500)]
    await _gateway(wire).select_relations("medical", ids)
    assert wire.seen.method == "POST"
    assert b"entity-499" in wire.seen.content
    assert not wire.seen.url.params


@asyncio_test
async def test_by_id_selection_stays_under_the_url_ceiling() -> None:
    """Сервис отказывает, если идентификаторов больше 500, — режем на нашей
    стороне, иначе пользователь получает 400 вместо части графа."""
    wire = Wire({"page": {"total": 0, "limit": 500, "offset": 0}, "entities": []})
    await _gateway(wire).entities_by_ids("medical", [f"e{i}" for i in range(900)])
    assert len(wire.seen.url.params.get_list("ids")) == 500


# ---------- ошибки ----------


@asyncio_test
async def test_service_error_becomes_our_envelope() -> None:
    wire = Wire({"error": {"code": "GRAPH_NOT_FOUND", "message": "no such graph"}}, 404)
    with pytest.raises(HTTPException) as caught:
        await _gateway(wire).stats("missing")
    assert caught.value.status_code == 404
    assert caught.value.detail["code"] == "dataset_not_found"


@asyncio_test
async def test_readiness_never_raises() -> None:
    """Готовность спрашивают, чтобы решить, показывать ли что-то вообще; отказ
    здесь — это «не готов», а не сбой."""
    wire = Wire({"error": {"code": "SERVICE_NOT_READY", "message": ""}}, 503)
    assert await _gateway(wire).ready() is False
