"""Отображение ошибок ragu-api на ответ фронту.

Клиент ветвится по `code`, а не по тексту сообщения — этого требует контракт
сервиса, и это единственный способ отличить случаи, которые выглядят одинаково.

Две пары, которые нельзя путать:

* `CAPABILITY_UNAVAILABLE` с названной способностью означает, что в графе нет
  такого хранилища и режим здесь не заработает никогда. С `null` — хранилище
  есть, но конкретно этот запрос ничего не извлёк, и стоит переформулировать.
* `TOO_MANY_REQUESTS` имеет смысл повторить с паузой. `BUDGET_EXCEEDED` —
  нет: лимит запроса исчерпан, повтор даст тот же ответ и ту же цену.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass

from fastapi import HTTPException
from ragu.api.client import RaguApiError

LOGGER = logging.getLogger(__name__)

# Код сервиса → (HTTP фронту, код для фронта, повторять ли).
_MAPPING: dict[str, tuple[int, str, bool]] = {
    "GRAPH_NOT_FOUND": (404, "dataset_not_found", False),
    "NOT_FOUND": (404, "not_found", False),
    "GRAPH_BUSY": (409, "dataset_busy", True),
    "INVALID_REQUEST": (400, "invalid_request", False),
    "UNAUTHORIZED": (502, "gateway_misconfigured", False),
    "PAYLOAD_TOO_LARGE": (413, "payload_too_large", False),
    "TOO_MANY_REQUESTS": (429, "too_many_requests", True),
    "BUDGET_EXCEEDED": (429, "budget_exceeded", False),
    "SERVICE_NOT_READY": (503, "service_not_ready", True),
    "REQUEST_TIMEOUT": (504, "upstream_timeout", False),
    "INTERNAL_ERROR": (502, "upstream_error", False),
}

# Запрошенный режим не обслуживается этим корпусом. Фронт обязан погасить его
# в выборе, а не предлагать снова.
MODE_UNAVAILABLE = (409, "mode_unavailable", False)

# Сервис ответил не своим конвертом — например, HTML от прокси. Клиент отдаёт
# это кодом UNKNOWN, и это именно про доступность, а не про запрос.
_UNKNOWN = (502, "upstream_error", True)


@dataclass(frozen=True)
class Mapped:
    """Решение по одной ошибке сервиса."""

    status: int
    code: str
    retriable: bool
    detail: dict[str, object]


def map_error(error: RaguApiError) -> Mapped:
    """Перевести ошибку сервиса в решение для фронта.

    `UNAUTHORIZED` намеренно становится 502, а не пробрасывается как 401:
    ключ к ragu-api — наша конфигурация, а не учётные данные посетителя. Отдать
    ему 401 значило бы предложить залогиниться там, где логина нет.
    """
    if error.code == "CAPABILITY_UNAVAILABLE" and error.missing_capability:
        status, code, retriable = MODE_UNAVAILABLE
    else:
        status, code, retriable = _MAPPING.get(error.code, _UNKNOWN)

    detail: dict[str, object] = {"code": code, "message": error.message}
    if error.mode:
        detail["mode"] = error.mode
    if error.missing_capability:
        detail["missing_capability"] = error.missing_capability
    # Идентификатор запроса у сервиса — единственный способ найти причину 500:
    # текст исключения наружу он намеренно не отдаёт.
    if error.request_id:
        detail["upstream_request_id"] = error.request_id
    return Mapped(status=status, code=code, retriable=retriable, detail=detail)


def as_http_exception(error: RaguApiError) -> HTTPException:
    """Готовое исключение FastAPI, с записью в лог.

    Логируется всегда: отказ, о котором известно только клиенту, через час уже
    не расследовать.
    """
    mapped = map_error(error)
    LOGGER.warning(
        "ragu-api ответил %s %s → %s",
        error.status_code,
        error.code,
        mapped.status,
        extra={
            "event": "upstream_error",
            "upstream_code": error.code,
            "upstream_status": error.status_code,
            "upstream_request_id": error.request_id,
            "mode": error.mode,
            "missing_capability": error.missing_capability,
            "retriable": mapped.retriable,
        },
    )
    return HTTPException(status_code=mapped.status, detail=mapped.detail)
