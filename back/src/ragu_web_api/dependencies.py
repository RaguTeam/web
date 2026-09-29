"""Синглтоны процесса.

Три сценария, один шлюз, одни настройки. Состояния здесь больше нет — ни
разобранного графа, ни кэша индексов: всё, что помнит процесс, это снимок
каталога на минуту.
"""

from ragu_web_api.answer import Answerer
from ragu_web_api.catalog import Catalog
from ragu_web_api.config import load_settings
from ragu_web_api.graph_view import GraphView
from ragu_web_api.ragu_gateway import RaguGateway

settings = load_settings()

# Клиент строится здесь, а не при первом запросе: пул соединений один на
# процесс, иначе каждый запрос открывал бы своё TCP-соединение к сервису.
gateway = RaguGateway(settings)
catalog = Catalog(gateway, settings)
answerer = Answerer(gateway, catalog, settings)
graph_view = GraphView(gateway, catalog, settings)


def get_catalog() -> Catalog:
    return catalog


def get_answerer() -> Answerer:
    return answerer


def get_graph_view() -> GraphView:
    return graph_view


def get_gateway() -> RaguGateway:
    return gateway
