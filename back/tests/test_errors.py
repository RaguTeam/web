"""Отображение ошибок ragu-api на ответ фронту.

Смысл этих тестов — в двух парах кодов, которые выглядят одинаково и означают
разное. Перепутать их значит либо показать посетителю режим, который на этом
корпусе не заработает никогда, либо повторно заплатить за запрос, чей лимит уже
исчерпан.
"""

import pytest
from ragu.api.client import RaguApiError

from ragu_web_api.errors import as_http_exception, map_error


def _error(code: str, **fields) -> RaguApiError:
    payload = {"error": {"code": code, "message": "…", **fields}}
    status = {
        "GRAPH_NOT_FOUND": 404,
        "CAPABILITY_UNAVAILABLE": 409,
        "GRAPH_BUSY": 409,
        "TOO_MANY_REQUESTS": 429,
        "BUDGET_EXCEEDED": 429,
        "SERVICE_NOT_READY": 503,
        "REQUEST_TIMEOUT": 504,
    }.get(code, 500)
    return RaguApiError(status, payload)


# ---------- два разных 409 ----------


def test_named_capability_gates_the_mode() -> None:
    """Хранилища нет — режим на этом корпусе не заработает никогда."""
    mapped = map_error(
        _error("CAPABILITY_UNAVAILABLE", missing_capability="community_summaries")
    )
    assert mapped.status == 409
    assert mapped.code == "mode_unavailable"
    assert mapped.retriable is False
    assert mapped.detail["missing_capability"] == "community_summaries"


def test_capability_without_name_is_an_empty_result() -> None:
    """Хранилище есть, но запрос ничего не извлёк — режим гасить нельзя."""
    mapped = map_error(_error("CAPABILITY_UNAVAILABLE"))
    assert mapped.code != "mode_unavailable"
    assert "missing_capability" not in mapped.detail


# ---------- два разных 429 ----------


def test_rate_limit_is_worth_retrying() -> None:
    assert map_error(_error("TOO_MANY_REQUESTS")).retriable is True


def test_budget_is_not_worth_retrying() -> None:
    """Повтор даст тот же ответ и ту же цену: лимит запроса уже исчерпан."""
    mapped = map_error(_error("BUDGET_EXCEEDED"))
    assert mapped.status == 429
    assert mapped.retriable is False


# ---------- остальное ----------


@pytest.mark.parametrize(
    ("code", "status", "our_code"),
    [
        ("GRAPH_NOT_FOUND", 404, "dataset_not_found"),
        ("GRAPH_BUSY", 409, "dataset_busy"),
        ("SERVICE_NOT_READY", 503, "service_not_ready"),
        ("REQUEST_TIMEOUT", 504, "upstream_timeout"),
        ("INTERNAL_ERROR", 502, "upstream_error"),
    ],
)
def test_known_codes(code: str, status: int, our_code: str) -> None:
    mapped = map_error(_error(code))
    assert (mapped.status, mapped.code) == (status, our_code)


def test_unauthorized_is_our_misconfiguration_not_the_visitors() -> None:
    """Ключ к ragu-api — наша настройка. Отдать посетителю 401 значило бы
    предложить залогиниться там, где логина нет."""
    mapped = map_error(_error("UNAUTHORIZED"))
    assert mapped.status == 502
    assert mapped.code == "gateway_misconfigured"


def test_foreign_envelope_becomes_upstream_error() -> None:
    """Клиент отдаёт UNKNOWN, когда ответ пришёл не от сервиса — например,
    HTML от прокси. Это про доступность, поэтому повторять стоит."""
    mapped = map_error(RaguApiError(502, {"not": "an envelope"}))
    assert mapped.status == 502
    assert mapped.retriable is True


def test_upstream_request_id_survives() -> None:
    """500 сервиса не рассказывает, что случилось: текст исключения наружу он
    не отдаёт. Найти строку в его логе можно только по этому идентификатору."""
    mapped = map_error(_error("INTERNAL_ERROR", request_id="858b0ba82aba"))
    assert mapped.detail["upstream_request_id"] == "858b0ba82aba"


def test_http_exception_carries_the_same_decision() -> None:
    exception = as_http_exception(
        _error("CAPABILITY_UNAVAILABLE", missing_capability="entity_graph", mode="local")
    )
    assert exception.status_code == 409
    assert exception.detail["code"] == "mode_unavailable"
    assert exception.detail["mode"] == "local"
