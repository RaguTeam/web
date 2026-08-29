"""Every log line must be attributable to the request that produced it.

Without this, logs from concurrent visitors interleave into something you can
read but not follow — which is exactly the state this backend was in while three
separate failures hid behind a keyword fallback.
"""

import json
import logging

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from ragu_web_api.logging_setup import (
    PACKAGE_LOGGER,
    JsonFormatter,
    RequestIdFilter,
    configure_logging,
    request_id_var,
)
from ragu_web_api.middleware import REQUEST_ID_HEADER, RequestContextMiddleware

DOMAIN_LOGGER = logging.getLogger(f"{PACKAGE_LOGGER}.services.fake")


@pytest.fixture
def captured():
    """Collect records off the package logger.

    pytest's caplog attaches to the root logger, which never sees these: the
    package logger sets `propagate = False` so uvicorn cannot double-print them.
    """
    records: list[logging.LogRecord] = []

    class _Sink(logging.Handler):
        def emit(self, record: logging.LogRecord) -> None:
            records.append(record)

    sink = _Sink()
    sink.addFilter(RequestIdFilter())
    logger = logging.getLogger(PACKAGE_LOGGER)
    logger.addHandler(sink)
    previous = logger.level
    logger.setLevel(logging.INFO)
    yield records
    logger.removeHandler(sink)
    logger.setLevel(previous)


@pytest.fixture
def client() -> TestClient:
    app = FastAPI()
    app.add_middleware(RequestContextMiddleware)

    @app.get("/ok")
    async def ok() -> dict:
        DOMAIN_LOGGER.info("работа доменного слоя", extra={"dataset_id": "medical"})
        return {"ok": True}

    @app.get("/boom")
    async def boom() -> dict:
        raise RuntimeError("сломалось")

    return TestClient(app, raise_server_exceptions=False)


# ---------- the id reaches the caller ----------


def test_response_carries_a_request_id(client: TestClient) -> None:
    assert client.get("/ok").headers[REQUEST_ID_HEADER]


def test_inbound_request_id_is_reused(client: TestClient) -> None:
    """Lets one trace span the proxy and the app."""
    response = client.get("/ok", headers={REQUEST_ID_HEADER: "trace-abc_123"})
    assert response.headers[REQUEST_ID_HEADER] == "trace-abc_123"


@pytest.mark.parametrize("bad", ["drop table; --", "id with spaces", "<script>", "x" * 200])
def test_untrusted_inbound_ids_are_replaced(client: TestClient, bad: str) -> None:
    """The id lands in log lines and a response header, so it must not be
    steerable by whoever sends the request."""
    got = client.get("/ok", headers={REQUEST_ID_HEADER: bad}).headers[REQUEST_ID_HEADER]
    assert got != bad
    assert got.isalnum()


def test_each_request_gets_a_distinct_id(client: TestClient) -> None:
    first = client.get("/ok").headers[REQUEST_ID_HEADER]
    second = client.get("/ok").headers[REQUEST_ID_HEADER]
    assert first != second


# ---------- the id reaches the logs ----------


def test_domain_logs_inherit_the_request_id(client: TestClient, captured) -> None:
    """The whole point: a line written deep in the repository must be findable
    by the id the visitor can see."""
    response = client.get("/ok")
    request_id = response.headers[REQUEST_ID_HEADER]

    domain = [r for r in captured if r.name.endswith("fake")]
    assert domain, "domain log was not captured"
    assert domain[0].request_id == request_id


def test_summary_line_reports_status_and_duration(client: TestClient, captured) -> None:
    client.get("/ok")
    summary = [r for r in captured if r.name.endswith("middleware")][-1]
    assert summary.status_code == 200
    assert summary.http_path == "/ok"
    assert summary.duration_ms >= 0


def test_server_errors_are_logged_at_error_level(client: TestClient, captured) -> None:
    client.get("/boom")
    levels = {r.levelno for r in captured if r.name.endswith("middleware")}
    assert logging.ERROR in levels


def test_failed_request_logs_a_traceback(client: TestClient, captured) -> None:
    client.get("/boom")
    with_exc = [r for r in captured if r.exc_info]
    assert with_exc, "exception was raised with no traceback logged"


def test_context_is_cleared_between_requests(client: TestClient) -> None:
    """A leaked id would tag later work — including background tasks — with a
    request that already finished."""
    client.get("/ok")
    assert request_id_var.get() == "-"


# ---------- json output ----------


def test_json_formatter_promotes_extra_fields(captured) -> None:
    configure_logging(fmt="json")
    record = logging.LogRecord(
        "ragu_web_api.test", logging.INFO, __file__, 1, "готово", None, None
    )
    record.request_id = "abc123"
    record.dataset_id = "medical"
    payload = json.loads(JsonFormatter().format(record))

    assert payload["message"] == "готово"
    assert payload["request_id"] == "abc123"
    # Filterable as a field rather than greppable as a substring.
    assert payload["dataset_id"] == "medical"
    assert payload["level"] == "INFO"


def test_json_formatter_includes_exception_text() -> None:
    try:
        raise ValueError("подробности")
    except ValueError:
        record = logging.LogRecord(
            "ragu_web_api.test", logging.ERROR, __file__, 1, "упало", None, None
        )
        import sys

        record.exc_info = sys.exc_info()
    payload = json.loads(JsonFormatter().format(record))
    assert "ValueError: подробности" in payload["exception"]
