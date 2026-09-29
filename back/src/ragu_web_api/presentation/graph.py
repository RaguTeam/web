"""Модели сервиса в модели канваса.

Чистые функции. Здесь же живёт единственное место, где сила связи переводится
из шкалы RAGU в долю нашего контракта, — раньше этот перевод был размазан по
парсеру GML и по сборке трейса, и они могли разойтись.
"""

from __future__ import annotations

from ragu.api.models import CommunityItem, EntityItem, RelationItem

from ragu_web_api.presentation import layout
from ragu_web_api.schemas.graph import (
    CommunitySummary,
    GraphEdge,
    GraphNode,
    NodeRelation,
)

# Шкала силы связи в RAGU — целое от 1 до 5: так её просит промпт экстрактора
# (ragu/triplet/prompts.py, «An integer from 1 to 5»). В контракте фронта это
# доля, поэтому делим всегда.
#
# Прежняя нормализация делила только значения больше единицы — и связь силы 1,
# то есть самая слабая, приезжала на канвас как 1.0, самой сильной. Фильтр по
# min_strength из-за этого оставлял именно тот хвост, который отсекал.
STRENGTH_SCALE = 5.0


def strength(value: float) -> float:
    return max(0.0, min(1.0, value / STRENGTH_SCALE))


def raw_strength(share: float) -> float:
    """Обратный перевод: фильтр приходит в долях, а фильтруем на сервисе."""
    return share * STRENGTH_SCALE


def node(entity: EntityItem, ordinal: int) -> GraphNode:
    x, y = layout.position(entity.id, ordinal, entity.degree or 0)
    return GraphNode(
        id=entity.id,
        label=entity.name,
        entity_type=entity.type or "UNKNOWN",
        description=entity.description,
        degree=entity.degree or 0,
        # Сущность может состоять в нескольких сообществах; канвас красит одним
        # цветом, поэтому берём первое. Полный список отдаёт карточка.
        community_id=entity.communities[0] if entity.communities else None,
        x=x,
        y=y,
        source_chunk_ids=entity.source_chunk_ids,
    )


def edge(relation: RelationItem) -> GraphEdge:
    return GraphEdge(
        id=relation.id,
        source=relation.subject_id,
        target=relation.object_id,
        relation_type=relation.type,
        description=relation.description,
        strength=strength(relation.strength),
        source_chunk_ids=relation.source_chunk_ids,
    )


def node_relation(relation: RelationItem, node_id: str) -> NodeRelation:
    """Связь глазами одной вершины: с какой стороны она висит и кто на другом конце."""
    outgoing = relation.subject_id == node_id
    return NodeRelation(
        **edge(relation).model_dump(),
        direction="outgoing" if outgoing else "incoming",
        other_node_id=relation.object_id if outgoing else relation.subject_id,
        other_node_label=relation.object_name if outgoing else relation.subject_name,
    )


def community(item: CommunityItem) -> CommunitySummary:
    return CommunitySummary(
        id=item.id,
        title=item.title or f"Community {item.cluster_id}",
        summary=item.summary or "",
        level=max(0, item.level),
        # Размер по счётчику сервиса, а не по длине entity_ids: список
        # обрезается на потолке, и тогда len врал бы о размере сообщества.
        size=item.entity_count,
        node_ids=item.entity_ids,
    )
