"""Карточка корпуса из того, что рассказал о нём сервис.

Чистые функции над одним плоским `Corpus`: ни сети, ни состояния, ни моделей
`ragu.api`. Нормализацию делает `catalog.py`, и благодаря этому здесь нечего
мокать — тесты гоняют витрину без поднятого сервиса и без индекса на диске.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone

from ragu_web_api.schemas.common import Locale
from ragu_web_api.schemas.datasets import (
    DatasetBadge,
    DatasetCard,
    DatasetDetail,
    DatasetLanguage,
    DatasetPreview,
    DatasetStats,
    SearchEngine,
)

# Порядок предпочтения, а не список поддерживаемых: что корпус реально умеет,
# говорит сервис в `modes`. До переезда набор был захардкожен, и режим, который
# на этом корпусе не работал, всё равно предлагался в интерфейсе.
_ENGINE_PREFERENCE: tuple[SearchEngine, ...] = ("mix", "local", "naive", "global")

# Дата сборки индекса после переезда неизвестна: файлы корпуса бэкенду больше не
# видны, а сервис её не отдаёт. Эпоха — заведомо не настоящая дата, в отличие от
# «сейчас», которое выглядело бы правдоподобно и врало. Поле остаётся в схеме,
# потому что шаг 3 не меняет контракт; фронт его не читает.
UNKNOWN_TIME = datetime(1970, 1, 1, tzinfo=timezone.utc)


@dataclass(frozen=True)
class Corpus:
    """Корпус глазами сервиса, уже приведённый к нашим типам."""

    id: str
    language: str  # как отдал сервис: russian / english
    loaded: bool
    stats: DatasetStats
    # Режимы, доступные на этом корпусе. Пусто — корпус не поднялся.
    engines: list[SearchEngine] = field(default_factory=list)
    embedding_dim: int | None = None
    # Типы самых связанных сущностей, по убыванию частоты.
    entity_types: list[str] = field(default_factory=list)
    # Почему корпус не поднялся. В карточку не попадает: это для наших логов.
    error: str | None = None

    @property
    def usable(self) -> bool:
        return self.loaded and bool(self.engines)


def language_code(language: str) -> DatasetLanguage:
    """Язык сервиса (`russian`) в код нашего контракта (`ru`)."""
    normalized = language.strip().casefold()
    if normalized.startswith(("ru", "рус")):
        return "ru"
    if normalized.startswith(("en", "англ")):
        return "en"
    return "mixed"


def title(corpus_id: str) -> str:
    """Заголовок из идентификатора: `dennis_ritchie` → `Dennis Ritchie`."""
    return corpus_id.replace("_", " ").replace("-", " ").strip().title() or "RAGU index"


def domain(entity_types: list[str], locale: Locale) -> str:
    type_set = {item.casefold() for item in entity_types}
    if {
        "geneorprotein",
        "diseaseordisorder",
        "drugorchemical",
        "biologicalprocess",
    } & type_set:
        return "Медицина и биология" if locale == "ru" else "Medicine and biology"
    if {"law", "penalty"} & type_set:
        return "Право" if locale == "ru" else "Law"
    if {"person", "organization", "location"} & type_set:
        return "Смешанный корпус" if locale == "ru" else "Mixed corpus"
    return "Граф знаний" if locale == "ru" else "Knowledge graph"


def description(stats: DatasetStats, locale: Locale) -> str:
    if locale == "ru":
        return (
            f"Готовый RAGU-индекс: {stats.nodes} сущностей, "
            f"{stats.edges} связей, {stats.chunks} текстовых фрагментов."
        )
    return (
        f"Prebuilt RAGU index with {stats.nodes} entities, "
        f"{stats.edges} relations, and {stats.chunks} text chunks."
    )


def suggested_questions(entity_types: list[str], locale: Locale) -> list[str]:
    primary = entity_types[0] if entity_types else "entities"
    if locale == "ru":
        return [
            f"Какие важные сущности типа {primary} есть в индексе?",
            "Какие связи чаще всего встречаются в графе?",
            "Кратко перескажи содержание выбранного индекса.",
        ]
    return [
        f"Which important {primary} entities are in this index?",
        "Which relations are most common in the graph?",
        "Summarize the selected index briefly.",
    ]


def badges(corpus: Corpus, locale: Locale) -> list[DatasetBadge]:
    """Три факта, которые видно на карточке до открытия корпуса.

    Модель и эмбеддер сюда больше не попадают: бэкенд их не знает и знать не
    должен — генерацией и векторами владеет сервис.
    """
    items = [DatasetBadge(label="source", value="RAGU")]
    if corpus.engines:
        items.append(
            DatasetBadge(
                label="modes" if locale == "en" else "режимы",
                value=" · ".join(corpus.engines),
            )
        )
    if corpus.embedding_dim:
        items.append(DatasetBadge(label="embedding", value=str(corpus.embedding_dim)))
    return items


def engines(available: list[str]) -> list[SearchEngine]:
    """Доступные режимы в порядке предпочтения.

    Фильтр по `_ENGINE_PREFERENCE`, а не сортировка: режим, которого нет в нашем
    контракте, фронт всё равно не нарисует, и протащить его наружу значило бы
    показать кнопку, на которую некому ответить.
    """
    known = set(available)
    return [engine for engine in _ENGINE_PREFERENCE if engine in known]


def card(corpus: Corpus, locale: Locale) -> DatasetCard:
    return DatasetCard(
        id=corpus.id,
        title=title(corpus.id),
        domain=domain(corpus.entity_types, locale),
        description=description(corpus.stats, locale),
        language=language_code(corpus.language),
        tags=["ragu", "preindexed", *corpus.entity_types[:3]],
        stats=corpus.stats,
        badges=badges(corpus, locale),
        preview=DatasetPreview(
            node_count=corpus.stats.nodes,
            edge_count=corpus.stats.edges,
            primary_entity_types=corpus.entity_types,
        ),
        suggested_questions=suggested_questions(corpus.entity_types, locale),
    )


def detail(corpus: Corpus, locale: Locale) -> DatasetDetail:
    """Карточка плюс режимы.

    `default_engine` — первый доступный, а не всегда `mix`: корпус без хранилища
    сущностей поднимается, но `mix` на нём не работает, и подставлять его значило
    бы отправить первый же вопрос в заведомый отказ.
    """
    available = corpus.engines
    return DatasetDetail(
        **card(corpus, locale).model_dump(),
        default_engine=available[0] if available else "mix",
        available_engines=list(available),
        created_at=UNKNOWN_TIME,
        updated_at=UNKNOWN_TIME,
    )
