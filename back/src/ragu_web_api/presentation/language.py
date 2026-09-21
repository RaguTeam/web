"""Язык ответа.

Решается здесь, а не в сервисе: сервис знает язык корпуса, а нужен язык
собеседника. Пока язык брали у индекса, русский вопрос к англоязычному корпусу
получал английский ответ — и выглядело это не как ошибка настройки, а как
плохое качество модели.
"""

from __future__ import annotations

import re

from ragu_web_api.schemas.agent import AgentRequest
from ragu_web_api.schemas.common import Locale

# Ниже этого числа букв одного алфавита сообщение не несёт сигнала — «RAGU?»,
# «ok», «да». Угадывание по таким переключало бы язык на коротком уточнении,
# поэтому смотрим дальше по переписке.
_MIN_LETTERS = 3

_CYRILLIC = re.compile(r"[А-Яа-яЁё]")
_LATIN = re.compile(r"[A-Za-z]")

# Как называется язык для ragu-api: он принимает слово, а не код.
_SERVICE_NAME: dict[Locale, str] = {"ru": "russian", "en": "english"}


def script_language(text: str) -> Locale | None:
    """Язык, на который указывает одно сообщение, или None.

    Намеренно несимметрично, а не голосованием большинства. Русские вопросы
    сплошь и рядом несут латинские термины — «Что такое BRCA1?», «причины
    prostate cancer», — а английские кириллицу практически никогда. Счёт
    алфавитов друг против друга ошибался бы ровно на тех смешанных вопросах,
    которые и собирает двуязычный медицинский корпус, поэтому любое заметное
    количество кириллицы решает в пользу русского.
    """
    if len(_CYRILLIC.findall(text)) >= _MIN_LETTERS:
        return "ru"
    if len(_LATIN.findall(text)) >= _MIN_LETTERS:
        return "en"
    return None


def answer_language(request: AgentRequest) -> Locale:
    """Язык ответа по словам самого пользователя.

    `request.locale` не спрашивается намеренно: он отражает переключатель языка
    интерфейса, а набравший русский вопрос в английском интерфейсе всё равно
    хочет русский ответ. Предыдущие реплики — запас на случай голого уточнения
    («а почему?» / «why?»), чтобы оно осталось в языке разговора.
    """
    candidates = [request.message]
    candidates.extend(
        message.content for message in reversed(request.history) if message.role == "user"
    )
    for text in candidates:
        language = script_language(text)
        if language is not None:
            return language
    return "ru"


def service_name(language: Locale) -> str:
    """Название языка для ragu-api."""
    return _SERVICE_NAME[language]
