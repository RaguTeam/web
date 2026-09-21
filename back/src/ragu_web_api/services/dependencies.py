"""Синглтоны процесса.

Два набора живут рядом, пока идёт переезд: `repository` обслуживает граф и чат
со старого пути, `catalog` — галерею с нового. По мере того как остальные
сценарии переезжают на сервис, репозиторий уходит целиком.
"""

from ragu_web_api.catalog import Catalog
from ragu_web_api.config import load_settings
from ragu_web_api.ragu_gateway import RaguGateway
from ragu_web_api.services.index_repository import IndexRepository

settings = load_settings()

# Клиент строится здесь, а не при первом запросе: пул соединений один на
# процесс, иначе каждый запрос открывал бы своё TCP-соединение к сервису.
gateway = RaguGateway(settings)
catalog = Catalog(gateway, settings)

repository = IndexRepository()


def get_repository() -> IndexRepository:
    return repository


def get_catalog() -> Catalog:
    return catalog


def get_gateway() -> RaguGateway:
    return gateway
