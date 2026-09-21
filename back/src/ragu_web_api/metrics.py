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
        "Движок, который РЕАЛЬНО отработал. Расхождение с запрошенным означает, "
        "что корпус не обслуживает выбранный режим и был подставлен доступный."
    ),
    ["dataset", "engine_used"],
)

DEGRADED = Counter(
    "ragu_agent_degraded_total",
    (
        "Ответы, собранные не всеми движками ансамбля. MixSearchEngine переживает "
        "падение ребёнка молча: запрос про граф и чанки может быть отвечен по "
        "одним чанкам, и снаружи это выглядит просто как слабый ответ."
    ),
    ["dataset"],
)

RETRIEVAL_SECONDS = Histogram(
    "ragu_agent_retrieval_seconds",
    (
        "Время поиска контекста, включая декомпозицию вопроса и реранк. Метка "
        "reranked разделяет ретривал с переупорядочиванием и без: сервис не "
        "выделяет реранк в отдельную стадию, и разница между этими рядами — "
        "единственный способ увидеть, сколько он стоит."
    ),
    ["dataset", "reranked"],
    buckets=_STAGE_BUCKETS,
)

RERANK_OUTCOME = Counter(
    "ragu_agent_rerank_total",
    (
        "Чем кончился реранк: applied — порядок переставлен, skipped — не "
        "просили или реранкер не настроен, failed — реранкер отказал, и ответ "
        "собран в исходном порядке."
    ),
    ["dataset", "outcome"],
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

ANSWERS = Counter(
    "ragu_agent_answers_total",
    (
        "Ответы агента по корпусам, без дополнительных меток. Дублирует сумму "
        "ragu_agent_questions_total намеренно: сводную таблицу надо строить на "
        "ряде с одной меткой, иначе join по корпусу разъезжается."
    ),
    ["dataset"],
)

# Виды обращений, которые предсоздаются на старте. Держим списками, чтобы
# предсоздание и реальные вызовы не разъехались.
_DATASET_KINDS = ("detail", "graph", "communities", "agent")
_ENGINES_USED = ("mix", "naive", "local", "global")
_RERANK_OUTCOMES = ("applied", "skipped", "failed")


def init_dataset(dataset: str) -> None:
    """Создать нулевые ряды для корпуса при старте.

    Без этого счётчик не существует, пока по нему не пришёл первый запрос, а
    `increase()` по несуществующему ряду не возвращает ничего — не ноль. В
    сводной таблице такой корпус выглядел пустой строкой, и отличить «никто не
    заходил» от «метрика сломалась» было нельзя.

    Отдельно важно для ENGINE_USED и DEGRADED: доли считаются делением одного
    ряда на другой, и без нулевого знаменателя выходит не ноль, а пустая ячейка.
    """
    ANSWERS.labels(dataset=dataset).inc(0)
    EMPTY_RETRIEVALS.labels(dataset=dataset).inc(0)
    DEGRADED.labels(dataset=dataset).inc(0)
    for kind in _DATASET_KINDS:
        DATASET_REQUESTS.labels(dataset=dataset, kind=kind).inc(0)
    for engine in _ENGINES_USED:
        ENGINE_USED.labels(dataset=dataset, engine_used=engine).inc(0)
    for outcome in _RERANK_OUTCOMES:
        RERANK_OUTCOME.labels(dataset=dataset, outcome=outcome).inc(0)


def observe_answer(
    *,
    dataset: str,
    engine_requested: str,
    engine_used: str,
    language: str,
    query_plan: bool,
    degraded: bool,
    rerank: str,
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
    ANSWERS.labels(dataset=dataset).inc()
    ENGINE_USED.labels(dataset=dataset, engine_used=engine_used).inc()
    RERANK_OUTCOME.labels(dataset=dataset, outcome=rerank).inc()
    RETRIEVAL_SECONDS.labels(
        dataset=dataset, reranked=str(rerank == "applied").lower()
    ).observe(retrieval_ms / 1000)
    GENERATION_SECONDS.labels(dataset=dataset).observe(generation_ms / 1000)
    CONTEXT_CHUNKS.labels(dataset=dataset).observe(chunks)
    if degraded:
        DEGRADED.labels(dataset=dataset).inc()
    if chunks == 0:
        EMPTY_RETRIEVALS.labels(dataset=dataset).inc()


def observe_dataset_request(dataset: str, kind: str) -> None:
    DATASET_REQUESTS.labels(dataset=dataset, kind=kind).inc()
