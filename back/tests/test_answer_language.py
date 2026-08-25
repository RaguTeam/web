"""Answer language: decided by the user's message, never by the UI locale toggle.

The bug these pin: the engines were built with the language of the *index*, so an
English corpus forced every answer to English no matter what was asked, and the
fallback text branched on `request.locale` — the interface switch.
"""

import pytest

from ragu_web_api.schemas.agent import AgentRequest, ChatMessage
from ragu_web_api.services.index_repository import (
    _answer_language,
    _llm_language_name,
    _ragu_language,
    _script_language,
)


def _request(message: str, locale: str = "ru", history: list | None = None):
    return AgentRequest(
        message=message,
        locale=locale,  # type: ignore[arg-type]
        history=history or [],
    )


# ---------- script detection ----------


@pytest.mark.parametrize(
    "text",
    [
        "Какие причины возникновения рака простаты?",
        "рак",
        "Расскажи про это подробнее",
    ],
)
def test_cyrillic_reads_as_russian(text: str) -> None:
    assert _script_language(text) == "ru"


@pytest.mark.parametrize(
    "text",
    [
        "What are the causes of prostate cancer?",
        "Tell me more",
        "AML",
    ],
)
def test_latin_reads_as_english(text: str) -> None:
    assert _script_language(text) == "en"


@pytest.mark.parametrize(
    "text",
    [
        "Что такое BRCA1?",
        "причины prostate cancer",
        "Чем отличается PSA от MRI?",
    ],
)
def test_latin_terms_inside_a_russian_question_stay_russian(text: str) -> None:
    """A majority-by-script vote would call these English.

    Russian questions carry Latin medical terms all the time; English questions
    do not carry Cyrillic. The rule is asymmetric on purpose.
    """
    assert _script_language(text) == "ru"


@pytest.mark.parametrize("text", ["?", "42", "", "!!!"])
def test_messages_without_letters_carry_no_signal(text: str) -> None:
    assert _script_language(text) is None


# ---------- request-level resolution ----------


def test_answer_language_follows_the_message_not_the_locale_toggle() -> None:
    """The whole point of task 2: the UI switch must not pick the answer language."""
    assert _answer_language(_request("Какие причины рака простаты?", locale="en")) == "ru"
    assert _answer_language(_request("What causes prostate cancer?", locale="ru")) == "en"


def test_short_followup_keeps_the_conversation_language() -> None:
    """"?" alone says nothing, so the previous user turn decides."""
    history = [
        ChatMessage(role="user", content="What are the causes of prostate cancer?"),
        ChatMessage(role="assistant", content="Several risk factors are known."),
    ]
    assert _answer_language(_request("???", locale="ru", history=history)) == "en"


def test_latest_message_wins_over_history() -> None:
    history = [ChatMessage(role="user", content="What causes prostate cancer?")]
    assert _answer_language(_request("А какие есть факторы риска?", history=history)) == "ru"


def test_assistant_turns_are_ignored_when_falling_back() -> None:
    """The assistant may have answered in the wrong language; only the user's own
    words are evidence of what they want."""
    history = [
        ChatMessage(role="user", content="Расскажи про рак простаты"),
        ChatMessage(role="assistant", content="Prostate cancer develops slowly."),
    ]
    assert _answer_language(_request("!!!", locale="en", history=history)) == "ru"


def test_defaults_to_russian_when_nothing_says_otherwise() -> None:
    assert _answer_language(_request("???", locale="en")) == "ru"


# ---------- mapping into the two prompt dialects ----------


def test_language_names_for_ragu_and_for_our_own_prompt() -> None:
    assert _ragu_language("ru") == "russian"
    assert _ragu_language("en") == "english"
    assert _llm_language_name("ru") == "Russian"
    assert _llm_language_name("en") == "English"
