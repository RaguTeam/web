"""Галерея корпусов поверх ragu-api.

Сети здесь нет: шлюз подменён заглушкой, а презентация и так чистая. Проверяется
то, что раньше решалось обходом диска и было невидимо, — какой корпус попадает в
галерею, что происходит, когда сервис отвечает не всем, и во что превращаются
режимы, о которых сервис сообщил.
"""

import asyncio
import functools

import pytest
from fastapi import HTTPException
from ragu.api.models import (
    EntityItem,
    EntityPage,
    GraphDetail,
    GraphInfo,
    GraphListResponse,
    ModeAvailability,
    PageInfo,
)

from ragu_web_api.catalog import Catalog
from ragu_web_api.config import Settings
from ragu_web_api.presentation import cards


def asyncio_test(fn):
    """Один цикл событий на тест.

    Без pytest-asyncio и намеренно: зависимость ради десятка тестов не нужна.
    Внутри одного `asyncio.run` — потому что `asyncio.Lock` в каталоге
    привязывается к циклу на первом ожидании и второго вызова не переживёт.
    """

    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        return asyncio.run(fn(*args, **kwargs))

    return wrapper


# ---------- заглушка сервиса ----------


def _modes(*available: str) -> list[ModeAvailability]:
    return [
        ModeAvailability(mode=mode, available=mode in available)
        for mode in ("global", "local", "naive", "mix")
    ]


def _detail(graph_id: str, **overrides) -> GraphDetail:
    payload = {
        "id": graph_id,
        "loaded": True,
        "language": "russian",
        "entities": 2400,
        "relations": 7100,
        "chunks": 320,
        "communities": 38,
        "community_summaries": 38,
        "documents": 12,
        "embedding_dim": 768,
        "modes": _modes("local", "naive", "mix"),
    }
    payload.update(overrides)
    return GraphDetail(**payload)


class FakeGateway:
    """Столько методов, сколько зовёт каталог, и счётчик обращений."""

    def __init__(self, infos: list[GraphInfo], details=None, types=None) -> None:
        self._infos = infos
        self._details = details or {info.id: _detail(info.id) for info in infos}
        self._types = types or {}
        self.calls: dict[str, int] = {}
        self.fail_on_graphs = False

    def _count(self, name: str) -> None:
        self.calls[name] = self.calls.get(name, 0) + 1

    async def graphs(self) -> GraphListResponse:
        self._count("graphs")
        if self.fail_on_graphs:
            raise HTTPException(status_code=503, detail={"code": "service_not_ready"})
        return GraphListResponse(
            default=self._infos[0].id if self._infos else "", graphs=self._infos
        )

    async def stats(self, dataset: str) -> GraphDetail:
        self._count("stats")
        detail = self._details[dataset]
        if isinstance(detail, Exception):
            raise detail
        return detail

    async def entities(self, dataset: str, **kwargs) -> EntityPage:
        self._count("entities")
        names = self._types.get(dataset, ["PERSON"])
        entities = [
            EntityItem(id=f"e{index}", name=f"e{index}", type=name)
            for index, name in enumerate(names)
        ]
        return EntityPage(
            page=PageInfo(total=len(entities), limit=500, offset=0), entities=entities
        )


def _settings(**overrides) -> Settings:
    payload = {
        "ragu_api_url": "http://ragu-api:8020",
        "ragu_api_key": "k",
        "ragu_api_timeout": 240.0,
        "graph_page_size": 1000,
        "token_price_prompt": 0.0,
        "token_price_completion": 0.0,
        "catalog_ttl": 60.0,
        "dataset_ttl": 300.0,
        "subgraph_ttl": 300.0,
    }
    payload.update(overrides)
    return Settings(**payload)


def _catalog(gateway: FakeGateway, **overrides) -> Catalog:
    return Catalog(gateway, _settings(**overrides))


def _info(graph_id: str, **overrides) -> GraphInfo:
    payload = {"id": graph_id, "loaded": True, "language": "russian"}
    payload.update(overrides)
    return GraphInfo(**payload)


# ---------- что попадает в галерею ----------


@asyncio_test
async def test_unloaded_corpus_stays_out_of_the_gallery() -> None:
    """Открыть его значит получить отказ на первом же вопросе."""
    gateway = FakeGateway(
        [
            _info("medical"),
            _info("dennis-ritchie", loaded=False, error="embedder_dim 1536 != 768"),
        ]
    )
    listed = await _catalog(gateway).cards()
    assert [item.id for item in listed] == ["medical"]


@asyncio_test
async def test_unloaded_corpus_is_still_reachable_by_id() -> None:
    """По прямой ссылке честнее показать корпус без режимов, чем сказать, что
    корпуса нет."""
    gateway = FakeGateway([_info("dennis-ritchie", loaded=False, error="dim")])
    detail = await _catalog(gateway).detail("dennis-ritchie")
    assert detail.available_engines == []


@asyncio_test
async def test_unknown_corpus_is_a_404() -> None:
    gateway = FakeGateway([_info("medical")])
    with pytest.raises(HTTPException) as caught:
        await _catalog(gateway).detail("nope")
    assert caught.value.status_code == 404
    assert caught.value.detail["code"] == "dataset_not_found"


@asyncio_test
async def test_one_broken_corpus_does_not_take_out_the_rest() -> None:
    gateway = FakeGateway(
        [_info("medical"), _info("ragu-bio")],
        details={
            "medical": _detail("medical"),
            "ragu-bio": HTTPException(status_code=502, detail={}),
        },
    )
    listed = await _catalog(gateway).cards()
    assert [item.id for item in listed] == ["medical"]


# ---------- снимок ----------


@asyncio_test
async def test_snapshot_is_reused_within_its_lifetime() -> None:
    """Карточка стоит 1 + 2N запросов: без кэша галерея била бы по сервису на
    каждое открытие."""
    gateway = FakeGateway([_info("medical")])
    catalog = _catalog(gateway)
    await catalog.cards()
    await catalog.cards()
    assert gateway.calls["graphs"] == 1


@asyncio_test
async def test_expired_snapshot_is_refetched() -> None:
    gateway = FakeGateway([_info("medical")])
    catalog = _catalog(gateway, catalog_ttl=0.0)
    await catalog.cards()
    await catalog.cards()
    assert gateway.calls["graphs"] == 2


@asyncio_test
async def test_stale_snapshot_beats_an_empty_gallery() -> None:
    """Сервис перезапускается минуты; пустая галерея на стенде хуже устаревшей."""
    gateway = FakeGateway([_info("medical")])
    catalog = _catalog(gateway, catalog_ttl=0.0)
    await catalog.cards()
    gateway.fail_on_graphs = True
    assert [item.id for item in await catalog.cards()] == ["medical"]


@asyncio_test
async def test_first_fetch_has_nothing_to_fall_back_on() -> None:
    gateway = FakeGateway([_info("medical")])
    gateway.fail_on_graphs = True
    with pytest.raises(HTTPException):
        await _catalog(gateway).cards()


@asyncio_test
async def test_concurrent_openings_fetch_once() -> None:
    gateway = FakeGateway([_info("medical")])
    catalog = _catalog(gateway)
    await asyncio.gather(catalog.cards(), catalog.cards(), catalog.cards())
    assert gateway.calls["graphs"] == 1


# ---------- типы сущностей ----------


@asyncio_test
async def test_entity_types_are_ranked_by_frequency() -> None:
    gateway = FakeGateway(
        [_info("medical")],
        types={"medical": ["LAW", "PERSON", "PERSON", "PERSON", "LAW", "DRUG"]},
    )
    card = (await _catalog(gateway).cards())[0]
    assert card.preview.primary_entity_types == ["PERSON", "LAW", "DRUG"]


@asyncio_test
async def test_missing_entity_types_do_not_break_the_card() -> None:
    """Без типов карточка теряет домен и подсказки, но остаётся рабочей."""

    class NoEntities(FakeGateway):
        async def entities(self, dataset: str, **kwargs):
            raise HTTPException(status_code=503, detail={})

    card = (await _catalog(NoEntities([_info("medical")])).cards())[0]
    assert card.preview.primary_entity_types == []
    assert card.stats.nodes == 2400


# ---------- презентация ----------


@pytest.mark.parametrize(
    ("service", "code"),
    [("russian", "ru"), ("english", "en"), ("Russian", "ru"), ("chinese", "mixed")],
)
def test_language_code(service: str, code: str) -> None:
    assert cards.language_code(service) == code


def test_engines_keep_the_preferred_order() -> None:
    assert cards.engines(["naive", "global", "mix"]) == ["mix", "naive", "global"]


def test_unknown_mode_never_reaches_the_frontend() -> None:
    """Кнопка, на которую некому ответить, хуже отсутствующей."""
    assert cards.engines(["mix", "telepathy"]) == ["mix"]


def test_default_engine_is_the_first_one_that_works() -> None:
    """Корпус без хранилища сущностей поднимается, но mix на нём не работает:
    подставить его значило бы отправить первый вопрос в заведомый отказ."""
    corpus = cards.Corpus(
        id="x",
        language="russian",
        loaded=True,
        stats=cards.DatasetStats(
            nodes=1, edges=1, communities=0, chunks=1, documents=1
        ),
        engines=["naive"],
    )
    assert cards.detail(corpus, "ru").default_engine == "naive"


def test_badges_do_not_claim_a_model_the_backend_cannot_know() -> None:
    """Генерацией и векторами владеет сервис; врать про них на карточке нельзя."""
    corpus = cards.Corpus(
        id="x",
        language="russian",
        loaded=True,
        stats=cards.DatasetStats(
            nodes=1, edges=1, communities=0, chunks=1, documents=1
        ),
        engines=["mix"],
        embedding_dim=768,
    )
    labels = {badge.label for badge in cards.badges(corpus, "en")}
    assert labels == {"source", "modes", "embedding"}
