"""Application logging: visible, structured, and traceable per request.

Two problems this solves.

Visibility: uvicorn installs handlers on its `uvicorn`, `uvicorn.error` and
`uvicorn.access` loggers and deliberately leaves the root logger alone. Anything
logged by `ragu_web_api` finds no handler and falls through to
`logging.lastResort`, which only emits WARNING and above — so every INFO this app
produced, including the startup diagnostics reporting whether RAGU search is
enabled, was silently dropped in deployment.

Traceability: a log line that cannot be tied to the request that produced it is
nearly useless once more than one person is using the site. Every record now
carries the id of the request being served, and that id also goes back to the
caller in `X-Request-ID`, so a reported problem can be found in the logs by
copying one string out of devtools.

Call :func:`configure_logging` before importing anything that logs at import
time (see `main.py`).
"""

from __future__ import annotations

import json
import logging
import os
import sys
from contextvars import ContextVar

PACKAGE_LOGGER = "ragu_web_api"
DEFAULT_LEVEL = "INFO"

# Set by RequestContextMiddleware for the duration of one request. A ContextVar
# rather than a global: requests are served concurrently on one event loop, and
# a plain global would hand every task the last-started request's id.
request_id_var: ContextVar[str] = ContextVar("request_id", default="-")

# Fields LogRecord always carries. Anything else a caller attached via `extra=`
# is application data and belongs in the JSON output.
_STANDARD_RECORD_FIELDS = frozenset(
    logging.LogRecord("", 0, "", 0, "", None, None).__dict__
) | {"message", "asctime", "taskName", "request_id"}


class RequestIdFilter(logging.Filter):
    """Stamp every record with the request being served.

    A filter rather than a LoggerAdapter so it also covers records from modules
    that know nothing about requests — the search adapter, the index repository.
    """

    def filter(self, record: logging.LogRecord) -> bool:
        record.request_id = request_id_var.get()
        return True


class JsonFormatter(logging.Formatter):
    """One JSON object per line, for log shipping.

    Anything passed through `extra=` is merged in at the top level, so
    `LOGGER.info("...", extra={"dataset_id": "medical"})` becomes a field to
    filter on instead of a substring to grep for.
    """

    def format(self, record: logging.LogRecord) -> str:
        payload: dict[str, object] = {
            "ts": self.formatTime(record, "%Y-%m-%dT%H:%M:%S%z"),
            "level": record.levelname,
            "logger": record.name,
            "request_id": getattr(record, "request_id", "-"),
            "message": record.getMessage(),
        }
        for key, value in record.__dict__.items():
            if key not in _STANDARD_RECORD_FIELDS:
                payload[key] = value
        if record.exc_info:
            payload["exception"] = self.formatException(record.exc_info)
        return json.dumps(payload, ensure_ascii=False, default=str)


def _formatter(fmt: str) -> logging.Formatter:
    if fmt == "json":
        return JsonFormatter()
    # Human-readable for local work: the request id sits up front so a terminal
    # eyeball can follow one request through interleaved lines.
    return logging.Formatter(
        "%(levelname)-8s [%(request_id)s] %(name)s: %(message)s"
    )


def configure_logging(
    level: str | None = None, fmt: str | None = None
) -> logging.Logger:
    """Attach a stdout handler to the package logger, once.

    :param level: Log level name; defaults to ``$LOG_LEVEL`` or ``INFO``.
    :param fmt: ``"json"`` or ``"text"``; defaults to ``$LOG_FORMAT`` or
        ``"text"``. Use json in deployment so fields stay fields.
    :return: The configured package logger.
    """
    logger = logging.getLogger(PACKAGE_LOGGER)
    logger.setLevel((level or os.getenv("LOG_LEVEL") or DEFAULT_LEVEL).upper())
    resolved_fmt = (fmt or os.getenv("LOG_FORMAT") or "text").lower()

    # Idempotent: uvicorn's --reload and the test suite both import this twice,
    # and a second handler would double every line.
    existing = [h for h in logger.handlers if getattr(h, "_ragu_web_api", False)]
    if existing:
        for handler in existing:
            handler.setFormatter(_formatter(resolved_fmt))
    else:
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(_formatter(resolved_fmt))
        handler.addFilter(RequestIdFilter())
        handler._ragu_web_api = True  # type: ignore[attr-defined]
        logger.addHandler(handler)

    # Uvicorn owns the root logger's absence of handlers; keep our records off it
    # so they are not duplicated if something else configures one later.
    logger.propagate = False
    return logger
