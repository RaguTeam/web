"""Синглтоны процесса.

Два набора живут рядом, пока идёт переезд: `repository` обслуживает граф со
старого пути, `catalog` и `answerer` — галерею и чат с нового. Когда на сервис
переедет граф, репозиторий уйдёт целиком.
"""

from ragu_web_api.answer import Answerer
from ragu_web_api.catalog import Catalog
from ragu_web_api.config import load_settings
from ragu_web_api.graph_view import GraphView
from ragu_web_api.ragu_gateway import RaguGateway
from ragu_web_api.services.index_repository import IndexRepository

settings = load_settings()

# Клиент строится здесь, а не при первом запросе: пул соединений один на
# процесс, иначе каждый запрос открывал бы своё TCP-соединение к сервису.
gateway = RaguGateway(settings)
catalog = Catalog(gateway, settings)
answerer = Answerer(gateway, catalog, settings)
graph_view = GraphView(gateway, catalog, settings)

repository = IndexRepository()


def get_repository() -> IndexRepository:
    return repository


def get_catalog() -> Catalog:
    return catalog


def get_answerer() -> Answerer:
    return answerer


def get_graph_view() -> GraphView:
    return graph_view


def get_gateway() -> RaguGateway:
    return gateway
