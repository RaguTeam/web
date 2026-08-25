"""The package logger must reach stdout under uvicorn.

Uvicorn configures only its own loggers and leaves the root logger without
handlers, so `ragu_web_api` records fall through to `logging.lastResort` — which
drops everything below WARNING. That is why the startup diagnostics reporting
whether RAGU search is enabled never showed up in deploy logs.
"""

import logging

import pytest

from ragu_web_api.logging_setup import PACKAGE_LOGGER, configure_logging


@pytest.fixture
def clean_logger():
    """Restore the package logger so these tests do not leak into the others."""
    logger = logging.getLogger(PACKAGE_LOGGER)
    handlers, level, propagate = list(logger.handlers), logger.level, logger.propagate
    logger.handlers.clear()
    yield logger
    logger.handlers[:] = handlers
    logger.setLevel(level)
    logger.propagate = propagate


def _own_handlers(logger: logging.Logger) -> list[logging.Handler]:
    """Only the handlers this package installed.

    pytest attaches its own LogCaptureHandler straight to this logger — it has
    to, because `propagate` is False — so a plain len() over `handlers` counts
    the test runner's plumbing too.
    """
    return [h for h in logger.handlers if getattr(h, "_ragu_web_api", False)]


def test_attaches_a_handler_to_the_package_logger(clean_logger) -> None:
    logger = configure_logging()
    assert logger.name == PACKAGE_LOGGER
    assert _own_handlers(logger), "no handler means INFO is dropped by lastResort"


def test_is_idempotent(clean_logger) -> None:
    """uvicorn --reload and the test suite both import this twice; a second
    handler would double every line."""
    configure_logging()
    configure_logging()
    configure_logging()
    assert len(_own_handlers(clean_logger)) == 1


def test_level_defaults_to_info(clean_logger) -> None:
    assert configure_logging().level == logging.INFO


def test_level_is_overridable(clean_logger, monkeypatch: pytest.MonkeyPatch) -> None:
    assert configure_logging("warning").level == logging.WARNING
    monkeypatch.setenv("LOG_LEVEL", "debug")
    assert configure_logging().level == logging.DEBUG


def test_info_from_a_child_logger_is_emitted(clean_logger, capsys) -> None:
    """The real case: index_repository logs through a child of the package logger."""
    configure_logging()
    logging.getLogger("ragu_web_api.services.index_repository").info("dataset ready")
    assert "dataset ready" in capsys.readouterr().out
