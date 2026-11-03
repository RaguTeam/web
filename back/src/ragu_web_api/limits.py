"""Лимит вопросов в чат.

Вопрос — единственное, что здесь стоит денег: каждый уходит в AI Studio с
контекстом на десяток тысяч токенов. Бэкенд открыт всему интернету, а CORS
останавливает только браузер, поэтому считать приходится здесь. Состояние живёт
в памяти процесса: воркер один, а сброс счётчиков при перезапуске — не дыра,
перезапуск не в руках посетителя.
"""

from __future__ import annotations

import time
from collections import deque
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, Request

from ragu_web_api.config import Settings

# Сутки считаем по Москве: «до завтра» в отказе должно значить завтра для
# тех, кто сайтом пользуется.
_MOSCOW = timezone(timedelta(hours=3))

_MINUTE = 60.0


def client_address(request: Request) -> str:
    """Адрес посетителя.

    Перед нами Caddy: он не верит чужому X-Forwarded-For и пишет туда адрес,
    с которого пришло соединение, — подделать его клиент не может. Последний
    элемент берём на случай, если перед Caddy когда-нибудь встанет ещё прокси.
    Без заголовка запрос пришёл изнутри docker-сети.
    """
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[-1].strip()
    return request.client.host if request.client else "unknown"


class QuestionLimiter:
    """Счётчики вопросов. Один экземпляр на процесс."""

    def __init__(self, settings: Settings, clock=time.time) -> None:
        self._per_minute = settings.questions_per_minute
        self._per_day = settings.questions_per_day
        self._total_per_day = settings.questions_total_per_day
        self._clock = clock
        self._recent: dict[str, deque[float]] = {}
        self._day = ""
        self._today: dict[str, int] = {}
        self._total = 0

    def admit(self, client: str) -> None:
        """Пропустить вопрос или отказать 429 с Retry-After."""
        now = self._clock()
        self._roll_day(now)

        if self._total_per_day and self._total >= self._total_per_day:
            raise _refusal(
                "daily_limit_reached",
                "The demo has used up today's questions. Please come back tomorrow.",
                _until_midnight(now),
            )
        if self._per_day and self._today.get(client, 0) >= self._per_day:
            raise _refusal(
                "client_daily_limit_reached",
                "You have asked the most questions allowed per day. Please come back tomorrow.",
                _until_midnight(now),
            )
        recent = self._recent.setdefault(client, deque())
        while recent and now - recent[0] >= _MINUTE:
            recent.popleft()
        if self._per_minute and len(recent) >= self._per_minute:
            raise _refusal(
                "rate_limited",
                "Too many questions in a minute. Please wait a little.",
                _MINUTE - (now - recent[0]),
            )

        recent.append(now)
        self._today[client] = self._today.get(client, 0) + 1
        self._total += 1

    def _roll_day(self, now: float) -> None:
        day = datetime.fromtimestamp(now, _MOSCOW).date().isoformat()
        if day != self._day:
            self._day = day
            self._today.clear()
            self._total = 0
            # Минутные окна старше минуты бесполезны, а адресов за сутки много.
            self._recent = {
                client: stamps
                for client, stamps in self._recent.items()
                if stamps and now - stamps[-1] < _MINUTE
            }


def _until_midnight(now: float) -> float:
    moment = datetime.fromtimestamp(now, _MOSCOW)
    midnight = (moment + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)
    return (midnight - moment).total_seconds()


def _refusal(code: str, message: str, retry_after: float) -> HTTPException:
    return HTTPException(
        status_code=429,
        detail={"code": code, "message": message},
        headers={"Retry-After": str(max(1, int(retry_after + 0.999)))},
    )
