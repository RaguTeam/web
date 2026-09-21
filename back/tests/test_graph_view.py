"""Канвас Explorer поверх ragu-api.

Главное, что здесь проверяется, — сколько и каких запросов уходит. Прежний код
держал весь граф в памяти и перебирал все рёбра на каждый кадр; новый обязан
брать ровно показанное, и это видно только по журналу обращений.
"""

import pytest
from support import (
    FakeGateway,
    asyncio_test,
    community,
    entity,
    info,
    relation,
    settings,
)

from ragu_web_api.catalog import Catalog
from ragu_web_api.graph_view import GraphView
from ragu_web_api.presentation import graph as present
from ragu_web_api.presentation import layout


def _view(gateway: FakeGateway, **overrides) -> GraphView:
    config = settings(**overrides)
    return GraphView(gateway, Catalog(gateway, config), config)


async def _warm(gateway: FakeGateway, **overrides) -> GraphView:
    """Вид с прогретым каталогом и обнулённым журналом.

    Каталог тоже ходит за сущностями — ради типов на карточке. Без прогрева его
    обращения попадали бы в счётчики, и они перестали бы означать сказанное.
    """
    view = _view(gateway, **overrides)
    await view._catalog.cards()
    gateway.calls.clear()
    gateway.entity_queries.clear()
    return view


def _entities(count: int, **overrides):
    return [
        entity(f"e{index}", degree=count - index, **overrides) for index in range(count)
    ]


# ---------- связи ----------


@asyncio_test
async def test_edges_are_one_induced_selection_not_a_scan() -> None:
    """Раньше на каждый кадр канваса пробегался весь список рёбер."""
    gateway = FakeGateway(
        [info("medical")],
        entities=_entities(3),
        relations=[relation("r1", "e0", "e1")],
    )
    result = await _view(gateway).graph("medical", limit=3)
    assert gateway.calls["select_relations"] == 1
    assert gateway.selections[0]["entity_ids"] == ["e0", "e1", "e2"]
    assert [edge.id for edge in result.edges] == ["r1"]


@asyncio_test
async def test_no_nodes_means_no_relation_request() -> None:
    gateway = FakeGateway([info("medical")], entities=[])
    await _view(gateway).graph("medical")
    assert "select_relations" not in gateway.calls


@asyncio_test
async def test_strength_filter_is_translated_into_the_services_scale() -> None:
    """В контракте фронта сила — доля, в RAGU — целое от 1 до 5."""
    gateway = FakeGateway([info("medical")], entities=_entities(2))
    await _view(gateway).graph("medical", min_strength=0.6)
    assert gateway.selections[0]["min_strength"] == pytest.approx(3.0)


# ---------- объём выдачи ----------


@asyncio_test
async def test_limit_beyond_one_page_keeps_paging() -> None:
    """Потолок страницы сервиса был потолком выдачи; теперь это размер шага."""
    gateway = FakeGateway([info("medical")], entities=_entities(25))
    view = await _warm(gateway, graph_page_size=10)
    result = await view.graph("medical", limit=25)
    assert len(result.nodes) == 25
    assert gateway.calls["entities"] == 3


@asyncio_test
async def test_paging_stops_at_what_the_corpus_has() -> None:
    gateway = FakeGateway([info("medical")], entities=_entities(4))
    view = await _warm(gateway, graph_page_size=10)
    result = await view.graph("medical", limit=1000)
    assert len(result.nodes) == 4
    assert gateway.calls["entities"] == 1


@asyncio_test
async def test_totals_come_from_the_corpus_not_from_the_page() -> None:
    gateway = FakeGateway([info("medical")], entities=_entities(3))
    result = await _view(gateway).graph("medical", limit=3)
    assert (result.meta.total_nodes, result.meta.total_edges) == (2400, 7100)
    assert result.meta.returned_nodes == 3


# ---------- фильтры ----------


@asyncio_test
async def test_several_types_become_several_queries_merged() -> None:
    """У сервиса `type` — одно значение, а выбранные чипы читаются как «или»."""
    gateway = FakeGateway(
        [info("medical")],
        entities=[
            entity("a", type="PERSON", degree=1),
            entity("b", type="LAW", degree=9),
            entity("c", type="DRUG", degree=5),
        ],
    )
    view = await _warm(gateway)
    result = await view.graph("medical", limit=10, entity_types=["PERSON", "LAW"])
    assert gateway.calls["entities"] == 2
    assert {q["type"] for q in gateway.entity_queries} == {"PERSON", "LAW"}
    assert [node.id for node in result.nodes] == ["b", "a"]


@asyncio_test
async def test_merged_result_is_resorted_by_degree() -> None:
    """Каждый запрос отсортирован сам по себе; обрезать склейку по чужому
    порядку значило бы выкинуть концентраторы одной ветки ради хвоста другой."""
    gateway = FakeGateway(
        [info("medical")],
        entities=[
            entity("weak", type="PERSON", degree=1),
            entity("hub", type="LAW", degree=99),
        ],
    )
    result = await _view(gateway).graph(
        "medical", limit=1, entity_types=["PERSON", "LAW"]
    )
    assert [node.id for node in result.nodes] == ["hub"]


# ---------- сообщества ----------


@asyncio_test
async def test_only_communities_touching_the_shown_nodes_come_back() -> None:
    gateway = FakeGateway(
        [info("medical")],
        entities=[entity("e0", communities=["c1"])],
        communities=[community("c1"), community("c2", cluster_id=2)],
    )
    result = await _view(gateway).graph("medical", limit=5)
    assert [item.id for item in result.communities] == ["c1"]


@asyncio_test
async def test_communities_are_not_fetched_when_not_asked_for() -> None:
    gateway = FakeGateway(
        [info("medical")],
        entities=[entity("e0", communities=["c1"])],
        communities=[community("c1")],
    )
    await _view(gateway).graph("medical", include_communities=False)
    assert "communities" not in gateway.calls


# ---------- карточка вершины ----------


@asyncio_test
async def test_node_card_splits_relations_by_direction() -> None:
    gateway = FakeGateway(
        [info("medical")],
        entities=[entity("e0"), entity("e1")],
        relations=[relation("out", "e0", "e1"), relation("in", "e1", "e0")],
    )
    card = await _view(gateway).node("medical", "e0")
    assert [r.id for r in card.outgoing_relations] == ["out"]
    assert [r.id for r in card.incoming_relations] == ["in"]
    assert card.outgoing_relations[0].other_node_id == "e1"


@asyncio_test
async def test_node_without_provenance_skips_the_chunk_request() -> None:
    """Пустой список — это «нечего показать», а не ошибка."""
    gateway = FakeGateway([info("medical")], entities=[entity("e0")])
    card = await _view(gateway).node("medical", "e0")
    assert card.provenance_chunks == []
    assert "chunks" not in gateway.calls


# ---------- соседство ----------


@asyncio_test
async def test_neighbors_filter_strength_locally() -> None:
    """У /neighbors такого параметра нет, а вершины уже приехали."""
    gateway = FakeGateway(
        [info("medical")],
        entities=[entity("e0"), entity("e1")],
        relations=[
            relation("strong", "e0", "e1", strength=5.0),
            relation("weak", "e0", "e1", strength=1.0),
        ],
    )
    result = await _view(gateway).neighbors("medical", "e0", min_strength=0.5)
    assert [edge.id for edge in result.edges] == ["strong"]


# ---------- презентация ----------


def test_strength_is_scaled_both_ways() -> None:
    """Шкала RAGU — целое 1..5, контракт фронта — доля."""
    assert present.strength(5.0) == pytest.approx(1.0)
    assert present.strength(2.0) == pytest.approx(0.4)
    assert present.raw_strength(0.6) == pytest.approx(3.0)


def test_weakest_relation_is_not_reported_as_the_strongest() -> None:
    """Прежняя нормализация делила только значения больше единицы, и связь силы
    1 приезжала как 1.0 — фильтр по min_strength оставлял ровно тот хвост,
    который отсекал."""
    assert present.strength(1.0) == pytest.approx(0.2)


def test_community_size_is_the_count_not_the_id_list() -> None:
    """Список членов обрезается на потолке, и len врал бы о размере."""
    item = community("c1", entity_count=120, entity_ids=["e0", "e1"], truncated=True)
    assert present.community(item).size == 120


def test_untitled_community_still_has_a_name() -> None:
    assert present.community(community("c1", title=None)).title == "Community 1"


def test_node_keeps_its_place_between_requests() -> None:
    """Иначе граф перепрыгивает на каждое обновление и узнать его нельзя."""
    assert layout.position("e0", 3, 7) == layout.position("e0", 3, 7)
    assert layout.position("e0", 3, 7) != layout.position("e1", 3, 7)
