"""Сборка: два образа обязаны брать одну и ту же версию RAGU.

`back` ставит graph-ragu по `uv.lock`, а `ragu-api` — по коммиту в своём
Dockerfile. Разъедутся — бэкенд будет разбирать ответы схемами одной версии
сервиса, а отвечать ему будет другая, и проявится это не отказом на сборке, а
странным полем в трейсе через неделю.
"""

import re
from pathlib import Path

BACK = Path(__file__).resolve().parents[1]

# Коммит, которым uv зафиксировал graph-ragu: .../RAGU.git?branch=…#<sha>
_LOCKED = re.compile(r'source = \{ git = "[^"]*RAGU\.git[^"#]*#([0-9a-f]{40})" \}')
_PINNED = re.compile(r"^ARG RAGU_REF=([0-9a-f]{40})\s*$", re.M)


def _read(name: str) -> str:
    return (BACK / name).read_text(encoding="utf-8")


def test_lock_and_service_image_agree_on_the_ragu_commit() -> None:
    locked = _LOCKED.search(_read("uv.lock"))
    pinned = _PINNED.search(_read("Dockerfile.ragu-api"))
    assert locked, "в uv.lock не нашёлся коммит graph-ragu"
    assert pinned, "в Dockerfile.ragu-api не нашёлся ARG RAGU_REF"
    assert locked.group(1) == pinned.group(1)


def test_backend_image_builds_from_the_lock() -> None:
    """`pip install .` игнорировал [tool.uv.sources] и брал graph-ragu с PyPI —
    в образе оказывался не тот пакет, что в разработке, и молча."""
    # Только инструкции: слово pip встречается и в комментарии, который
    # объясняет, почему его здесь больше нет.
    instructions = [
        line
        for line in _read("Dockerfile").splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    ]
    assert any("uv sync --frozen" in line for line in instructions)
    assert not any("pip install" in line for line in instructions)


def test_client_timeout_stays_under_the_service_timeout() -> None:
    """Больше — сервер сдастся первым, и вместо ответа придёт 504. Оба значения
    живут в compose, и разъезжаются они молча."""
    compose = (BACK.parent / "docker-compose.yml").read_text(encoding="utf-8")
    service = int(re.search(r'RAGU_API_REQUEST_TIMEOUT: "(\d+)"', compose).group(1))
    client = int(re.search(r'RAGU_API_TIMEOUT: "(\d+)"', compose).group(1))
    assert client < service
