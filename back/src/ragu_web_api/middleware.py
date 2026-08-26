"""Per-request logging context.

Gives every request an id, makes that id available to all logging below it, and
emits exactly one summary line per request with the status and how long it took.
The id also goes back in `X-Request-ID`, so a visitor reporting a broken answer
can be traced by copying one string out of their devtools.
"""

from __future__ import annotations

import logging
import time
import uuid

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from starlette.types import ASGIApp

from ragu_web_api.logging_setup import request_id_var

LOGGER = logging.getLogger(__name__)

REQUEST_ID_HEADER = "X-Request-ID"

# Callers may supply their own id so a trace spans the proxy and the app. Cap the
# length and keep it to safe characters: it ends up in log lines and a response
# header, and neither should be steerable by whoever sends the request.
_MAX_INBOUND_ID = 64


def _clean_inbound_id(raw: str | None) -> str | None:
    if not raw:
        return None
    candidate = raw.strip()[:_MAX_INBOUND_ID]
    if not candidate or not all(c.isalnum() or c in "-_" for c in candidate):
        return None
    return candidate


class RequestContextMiddleware(BaseHTTPMiddleware):
    """Bind a request id to the logging context and log the request's outcome."""

    def __init__(self, app: ASGIApp, header: str = REQUEST_ID_HEADER) -> None:
        super().__init__(app)
        self.header = header

    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = _clean_inbound_id(
            request.headers.get(self.header)
        ) or uuid.uuid4().hex[:12]
        token = request_id_var.set(request_id)
        started = time.perf_counter()

        # The reset has to happen after the logging below, not around `call_next`
        # alone: RequestIdFilter reads the context variable when the record is
        # emitted, so resetting first would stamp our own summary line with "-".
        try:
            try:
                response = await call_next(request)
            except Exception:
                # The request dies here either way; without this the traceback is
                # the only record, and it carries no id, no path, no timing.
                LOGGER.exception(
                    "%s %s failed after %dms",
                    request.method,
                    request.url.path,
                    self._elapsed_ms(started),
                    extra={
                        "http_method": request.method,
                        "http_path": request.url.path,
                        "duration_ms": self._elapsed_ms(started),
                    },
                )
                raise

            duration_ms = self._elapsed_ms(started)
            response.headers[self.header] = request_id

            # Server errors are not "traffic", they are incidents — log them
            # loudly enough that a level filter alone separates the two.
            level = logging.ERROR if response.status_code >= 500 else logging.INFO
            LOGGER.log(
                level,
                "%s %s -> %d in %dms",
                request.method,
                request.url.path,
                response.status_code,
                duration_ms,
                extra={
                    "http_method": request.method,
                    "http_path": request.url.path,
                    "status_code": response.status_code,
                    "duration_ms": duration_ms,
                    "client": request.client.host if request.client else None,
                },
            )
            return response
        finally:
            request_id_var.reset(token)

    @staticmethod
    def _elapsed_ms(started: float) -> int:
        return int((time.perf_counter() - started) * 1000)
