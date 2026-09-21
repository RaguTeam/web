"""Координаты вершин канваса.

Раскладка считается здесь, а не в сервисе, и это правильное разделение: сервис
не знает ни про размер вьюпорта, ни про то, что вершины вообще рисуют.

Позиция выводится из идентификатора, а не из случайного числа: одна и та же
вершина обязана оказаться на том же месте при следующем открытии, иначе граф
«перепрыгивает» на каждое обновление и узнать его нельзя.
"""

from __future__ import annotations

import math
from hashlib import md5

# Расстояние от центра: базовый отступ, разгон по порядковому номеру и вклад
# степени. Логарифм — чтобы одна вершина-концентратор не уносила остальные за
# край холста.
_BASE_RADIUS = 80
_ORDINAL_STEP = 5
_ORDINAL_PERIOD = 97
_DEGREE_WEIGHT = 30


def position(node_id: str, ordinal: int, degree: int) -> tuple[float, float]:
    """Устойчивая позиция одной вершины."""
    seed = int(md5(node_id.encode()).hexdigest()[:8], 16)
    angle = (seed % 3600) / 3600 * math.tau
    radius = (
        _BASE_RADIUS
        + (ordinal % _ORDINAL_PERIOD) * _ORDINAL_STEP
        + math.log1p(max(degree, 0)) * _DEGREE_WEIGHT
    )
    return round(math.cos(angle) * radius, 3), round(math.sin(angle) * radius, 3)
