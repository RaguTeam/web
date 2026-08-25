"""Make this package's own logs visible.

Uvicorn installs handlers on its `uvicorn`, `uvicorn.error` and `uvicorn.access`
loggers and deliberately leaves the root logger alone. Anything logged by
`ragu_web_api` therefore finds no handler and falls through to
`logging.lastResort`, which only emits WARNING and above — so every INFO this
app produces, including the startup diagnostics that report whether RAGU search
is actually enabled, was silently dropped in deployment.

Call :func:`configure_logging` before importing anything that logs at import
time (see `main.py`).
"""

from __future__ import annotations

import logging
import os
import sys

PACKAGE_LOGGER = "ragu_web_api"
DEFAULT_LEVEL = "INFO"


def configure_logging(level: str | None = None) -> logging.Logger:
    """Attach a stdout handler to the package logger, once.

    :param level: Log level name; defaults to ``$LOG_LEVEL`` or ``INFO``.
    :return: The configured package logger.
    """
    logger = logging.getLogger(PACKAGE_LOGGER)
    resolved = (level or os.getenv("LOG_LEVEL") or DEFAULT_LEVEL).upper()
    logger.setLevel(resolved)

    # Idempotent: uvicorn's --reload and the test suite both import this twice,
    # and a second handler would double every line.
    if not any(getattr(h, "_ragu_web_api", False) for h in logger.handlers):
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(
            logging.Formatter("%(levelname)-8s %(name)s: %(message)s")
        )
        handler._ragu_web_api = True  # type: ignore[attr-defined]
        logger.addHandler(handler)

    # Uvicorn owns the root logger's absence of handlers; keep our records off it
    # so they are not duplicated if something else configures one later.
    logger.propagate = False
    return logger
