"""Лимит вопросов в чат.

Каждый вопрос стоит денег, а бэкенд открыт всем. Здесь проверяется, что
счётчики считают то, что обещают, и что отказ говорит, когда спросить снова.
"""

from datetime import datetime, timedelta, timezone

import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from support import settings

from ragu_web_api.dependencies import get_answerer, get_limiter
from ragu_web_api.limits import QuestionLimiter
from ragu_web_api.main import create_app

MOSCOW = timezone(timedelta(hours=3))


class Clock:
    def __init__(self, moment: datetime) -> None:
        self.now = moment.timestamp()

    def __call__(self) -> float:
        return self.now


def _limiter(clock: Clock, **overrides) -> QuestionLimiter:
    return QuestionLimiter(settings(**overrides), clock=clock)


def _refused(limiter: QuestionLimiter, client: str = "1.1.1.1") -> HTTPException:
    with pytest.raises(HTTPException) as caught:
        limiter.admit(client)
    return caught.value


def test_eleventh_question_in_a_minute_waits_for_the_oldest_to_expire() -> None:
    clock = Clock(datetime(2026, 11, 3, 12, 0, tzinfo=MOSCOW))
    limiter = _limiter(clock)
    for _ in range(10):
        limiter.admit("1.1.1.1")
        clock.now += 1
    refusal = _refused(limiter)
    assert refusal.status_code == 429
    assert refusal.detail["code"] == "rate_limited"
    assert refusal.headers["Retry-After"] == "50"

    limiter.admit("2.2.2.2")  # у другого адреса свой счёт
    clock.now += 50
    limiter.admit("1.1.1.1")


def test_daily_limit_per_address_lasts_until_moscow_midnight() -> None:
    clock = Clock(datetime(2026, 11, 3, 23, 0, tzinfo=MOSCOW))
    limiter = _limiter(clock, questions_per_minute=0, questions_per_day=3)
    for _ in range(3):
        limiter.admit("1.1.1.1")
    refusal = _refused(limiter)
    assert refusal.detail["code"] == "client_daily_limit_reached"
    assert refusal.headers["Retry-After"] == "3600"

    clock.now += 3600
    limiter.admit("1.1.1.1")


def test_total_daily_limit_stops_everyone() -> None:
    clock = Clock(datetime(2026, 11, 3, 12, 0, tzinfo=MOSCOW))
    limiter = _limiter(clock, questions_total_per_day=2)
    limiter.admit("1.1.1.1")
    limiter.admit("2.2.2.2")
    assert _refused(limiter, "3.3.3.3").detail["code"] == "daily_limit_reached"


def test_refused_question_is_not_counted() -> None:
    clock = Clock(datetime(2026, 11, 3, 12, 0, tzinfo=MOSCOW))
    limiter = _limiter(clock, questions_per_minute=1, questions_per_day=2)
    limiter.admit("1.1.1.1")
    for _ in range(5):
        _refused(limiter)
    clock.now += 60
    limiter.admit("1.1.1.1")


def test_zero_lifts_the_limit() -> None:
    clock = Clock(datetime(2026, 11, 3, 12, 0, tzinfo=MOSCOW))
    limiter = _limiter(clock, questions_per_minute=0, questions_per_day=0, questions_total_per_day=0)
    for _ in range(500):
        limiter.admit("1.1.1.1")


class _Answerer:
    calls = 0

    async def answer(self, dataset_id, request):
        _Answerer.calls += 1
        raise HTTPException(status_code=404, detail={"code": "dataset_not_found", "message": "x"})


def test_route_refuses_before_the_model_is_called() -> None:
    """Отказ по лимиту не должен стоить ни копейки: до сценария он не доходит.
    Адрес берётся из X-Forwarded-For, который выставляет Caddy."""
    app = create_app()
    clock = Clock(datetime(2026, 11, 3, 12, 0, tzinfo=MOSCOW))
    limiter = _limiter(clock, questions_per_minute=1)
    app.dependency_overrides[get_limiter] = lambda: limiter
    app.dependency_overrides[get_answerer] = lambda: _Answerer()
    client = TestClient(app)
    body = {"message": "вопрос"}

    first = client.post("/api/v1/datasets/medical/agent/messages", json=body, headers={"X-Forwarded-For": "5.5.5.5"})
    assert first.status_code == 404
    second = client.post("/api/v1/datasets/medical/agent/messages/stream", json=body, headers={"X-Forwarded-For": "5.5.5.5"})
    assert second.status_code == 429
    assert second.json()["detail"]["code"] == "rate_limited"
    assert "retry-after" in second.headers
    assert _Answerer.calls == 1
