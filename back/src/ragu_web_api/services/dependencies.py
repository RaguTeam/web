from ragu_web_api.services.index_repository import IndexRepository

repository = IndexRepository()


def get_repository() -> IndexRepository:
    return repository
