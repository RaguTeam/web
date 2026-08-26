"""Доменные метрики Prometheus.

HTTP-метрики от инструментатора отвечают на вопрос «сколько запросов и как
быстро», но не на «по какому корпусу спрашивали, на каком языке и получилось ли
что-нибудь найти». Здесь — второе.

Про кардинальность: у каждой метрики метки берутся из закрытых множеств —
несколько датасетов, три движка, два языка, булев флаг. Свободный текст в метки
не попадает НИКОГДА: один уникальный вопрос стал бы отдельной временной серией,
и Prometheus сложился бы за вечер работы стенда. Тексты вопросов — задача
логов, а не метрик.
"""

from __future__ import annotations

from prometheus_client import Counter, Histogram

# Секунды: под ретрив и генерацию нужны разные масштабы, но общие корзины
# позволяют складывать их на одном графике.
_STAGE_BUCKETS = (0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10, 20, 30, 60, float("inf"))

QUESTIONS = Counter(
    "ragu_agent_questions_total",
    "Вопросы агенту, с параметрами запроса.",
    ["dataset", "engine", "language", "query_plan"],
)

ENGINE_USED = Counter(
    "ragu_agent_engine_used_total",
    (
        "Движок, который РЕАЛЬНО отработал. Значение keyword означает, что "
        "векторный поиск был недоступен или упал и ответ собран запасным "
        "ранкером — это деградация, а не режим работы."
    ),
    ["dataset", "engine_used"],
)

RETRIEVAL_SECONDS = Histogram(
    "ragu_agent_retrieval_seconds",
    "Время поиска контекста, включая декомпозицию вопроса.",
    ["dataset"],
    buckets=_STAGE_BUCKETS,
)

GENERATION_SECONDS = Histogram(
    "ragu_agent_generation_seconds",
    "Время генерации ответа LLM.",
    ["dataset"],
    buckets=_STAGE_BUCKETS,
)

CONTEXT_CHUNKS = Histogram(
    "ragu_agent_context_chunks",
    (
        "Сколько фрагментов попало в контекст ответа. Ноль — вопрос остался без "
        "опоры, и это главный сигнал качества поиска."
    ),
    ["dataset"],
    buckets=(0, 1, 2, 4, 8, 16, 32, float("inf")),
)

EMPTY_RETRIEVALS = Counter(
    "ragu_agent_empty_retrievals_total",
    "Ответы, собранные вообще без найденного контекста.",
    ["dataset"],
)

DATASET_REQUESTS = Counter(
    "ragu_dataset_requests_total",
    "Обращения к корпусу по видам: карточка, граф, соседи, сообщества, агент.",
    ["dataset", "kind"],
)


def observe_answer(
    *,
    dataset: str,
    engine_requested: str,
    engine_used: str,
    language: str,
    query_plan: bool,
    retrieval_ms: int,
    generation_ms: int,
    chunks: int,
) -> None:
    """Записать один ответ агента.

    Вызывается из репозитория, а не из роутера, потому что `engine_used` и
    размер контекста известны только после того, как поиск отработал.
    """
    QUESTIONS.labels(
        dataset=dataset,
        engine=engine_requested,
        language=language,
        query_plan=str(query_plan).lower(),
    ).inc()
    ENGINE_USED.labels(dataset=dataset, engine_used=engine_used).inc()
    RETRIEVAL_SECONDS.labels(dataset=dataset).observe(retrieval_ms / 1000)
    GENERATION_SECONDS.labels(dataset=dataset).observe(generation_ms / 1000)
    CONTEXT_CHUNKS.labels(dataset=dataset).observe(chunks)
    if chunks == 0:
        EMPTY_RETRIEVALS.labels(dataset=dataset).inc()


def observe_dataset_request(dataset: str, kind: str) -> None:
    DATASET_REQUESTS.labels(dataset=dataset, kind=kind).inc()
