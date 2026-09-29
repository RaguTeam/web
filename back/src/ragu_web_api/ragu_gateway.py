"""Единственная точка, через которую BFF говорит с ragu-api.

Ни один модуль выше не знает ни про HTTP, ни про `RaguApiError`: наружу отсюда
уходят либо модели `ragu.api.models`, либо `HTTPException` с нашим конвертом.

Идентификатор запроса пробрасывается в сервис заголовком, поэтому одна строка
из devtools находит запись в логах обоих процессов.
"""

from __future__ import annotations

import logging
from typing import Any

from ragu.api.client import RaguApiError, RaguClient
from ragu.api.models import (
    ChunkPage,
    CommunityPage,
    Neighborhood,
    EntityItem,
    EntityPage,
    GraphDetail,
    GraphListResponse,
    ModeAvailability,
    RelationPage,
    RetrieveResponse,
    SearchResponse,
)

from ragu_web_api.config import RAGU_IDS_MAX, Settings
from ragu_web_api.errors import as_http_exception
from ragu_web_api.logging_setup import REQUEST_ID_HEADER, request_id_var

LOGGER = logging.getLogger(__name__)


class _ExtendedClient(RaguClient):
    """Маршруты, до которых типизированный клиент ещё не доведён.

    Сервис их отдаёт — `GET /entities/{id}`, `GET /chunks`, фильтры и сортировка
    у `/entities`, `POST /relations/select` — а `RaguClient` на момент написания
    о них не знает. Здесь они добавлены поверх его же `_get` / `_post`, чтобы не
    терять аутентификацию, таймауты и разбор конверта ошибок.

    Временная мера. Как только клиент догонит сервис, класс удаляется, а вызовы
    переезжают на его собственные методы — опора на приватные помощники чужого
    пакета того не стоит.
    """

    async def _request(self, method: str, path: str, **kwargs: Any) -> Any:
        """Добавить сквозной идентификатор к любому вызову.

        Именно здесь, а не в отдельных методах: `_get` складывает всё, что ему
        передали, в query-строку и заголовки принимать не умеет, а переопределять
        каждый метод клиента значило бы забыть про новый при обновлении пакета.
        """
        headers = dict(kwargs.pop("headers", None) or {})
        headers.setdefault(REQUEST_ID_HEADER, request_id_var.get())
        return await super()._request(method, path, headers=headers, **kwargs)

    async def entities_page(
        self,
        *,
        graph: str | None = None,
        limit: int = 50,
        offset: int = 0,
        sort: str | None = None,
        order: str | None = None,
        community_id: str | None = None,
        type: str | None = None,
        search: str | None = None,
        ids: list[str] | None = None,
    ) -> EntityPage:
        params: dict[str, Any] = {"limit": limit, "offset": offset}
        if sort:
            params["sort"] = sort
        if order:
            params["order"] = order
        if community_id:
            params["community_id"] = community_id
        if type:
            params["type"] = type
        if search:
            params["search"] = search
        if ids:
            params["ids"] = list(ids)
        payload = await self._get(f"{self._prefix(graph)}/entities", **params)
        return EntityPage.model_validate(payload)

    async def entity(self, entity_id: str, *, graph: str | None = None) -> EntityItem:
        payload = await self._get(f"{self._prefix(graph)}/entities/{entity_id}")
        return EntityItem.model_validate(payload)

    async def chunks_page(
        self,
        *,
        graph: str | None = None,
        limit: int = 50,
        offset: int = 0,
        ids: list[str] | None = None,
    ) -> ChunkPage:
        params: dict[str, Any] = {"limit": limit, "offset": offset}
        if ids:
            params["ids"] = list(ids)
        payload = await self._get(f"{self._prefix(graph)}/chunks", **params)
        return ChunkPage.model_validate(payload)

    async def select_relations(
        self,
        entity_ids: list[str],
        *,
        graph: str | None = None,
        edge_scope: str = "induced",
        min_strength: float | None = None,
        limit: int = 500,
        offset: int = 0,
    ) -> RelationPage:
        """Индуцированный подграф: связи внутри набора сущностей.

        Набор едет телом, а не query-строкой: идентификаторы по 36 символов, и
        пятьсот штук дают URL около 24 КБ при типовом потолке строки запроса 8.
        """
        body: dict[str, Any] = {
            "entity_ids": list(entity_ids),
            "edge_scope": edge_scope,
            "limit": limit,
            "offset": offset,
        }
        if min_strength is not None:
            body["min_strength"] = min_strength
        payload = await self._post(f"{self._prefix(graph)}/relations/select", body)
        return RelationPage.model_validate(payload)


class RaguGateway:
    """Обёртка над клиентом: один экземпляр на процесс."""

    def __init__(self, settings: Settings, transport: Any = None) -> None:
        self._settings = settings
        # transport — шов для тестов: с поддельным можно проверить, что уходит
        # на провод, не поднимая сервис. В рантайме всегда None.
        self._client = _ExtendedClient(
            settings.ragu_api_url,
            api_key=settings.ragu_api_key,
            timeout=settings.ragu_api_timeout,
            transport=transport,
        )
        if not settings.has_api_key:
            # Сервис без ключа отвечает всем, кто до него дотянется, и каждый
            # запрос стоит вызовов LLM. Внутри docker-сети это терпимо, наружу
            # выставлять нельзя.
            LOGGER.warning(
                "RAGU_API_KEY is not set: calling ragu-api without a key",
                extra={"event": "ragu_api_no_key"},
            )

    async def aclose(self) -> None:
        await self._client.aclose()

    # --- каталог и свойства корпуса -------------------------------------

    async def graphs(self) -> GraphListResponse:
        return await self._call(self._client.graphs())

    async def stats(self, dataset: str) -> GraphDetail:
        return await self._call(self._client.stats(dataset))

    async def capabilities(self, dataset: str) -> list[ModeAvailability]:
        return await self._call(self._client.capabilities(dataset))

    async def ready(self) -> bool:
        try:
            return await self._client.ready()
        except RaguApiError:
            return False

    # --- поверхность графа ----------------------------------------------

    async def entities(self, dataset: str, **kwargs: Any) -> EntityPage:
        return await self._call(self._client.entities_page(graph=dataset, **kwargs))

    async def entity(self, dataset: str, entity_id: str) -> EntityItem:
        return await self._call(self._client.entity(entity_id, graph=dataset))

    async def entities_by_ids(self, dataset: str, ids: list[str]) -> EntityPage:
        """Выборка по списку. Потолок 500 — длина URL, а не ограничение сервиса."""
        return await self.entities(
            dataset, ids=ids[:RAGU_IDS_MAX], limit=min(len(ids) or 1, RAGU_IDS_MAX)
        )

    async def select_relations(
        self, dataset: str, entity_ids: list[str], **kwargs: Any
    ) -> RelationPage:
        return await self._call(
            self._client.select_relations(entity_ids, graph=dataset, **kwargs)
        )

    async def neighbors(
        self, dataset: str, entity_id: str, *, depth: int = 1, limit: int = 200
    ) -> Neighborhood:
        return await self._call(
            self._client.neighbors(entity_id, graph=dataset, depth=depth, limit=limit)
        )

    async def communities(self, dataset: str, **kwargs: Any) -> CommunityPage:
        return await self._call(self._client.communities(graph=dataset, **kwargs))

    async def chunks_by_ids(self, dataset: str, ids: list[str]) -> ChunkPage:
        return await self._call(
            self._client.chunks_page(
                graph=dataset, ids=ids[:RAGU_IDS_MAX], limit=RAGU_IDS_MAX
            )
        )

    # --- поиск ------------------------------------------------------------

    async def search(self, dataset: str, mode: str, query: str, **body: Any) -> SearchResponse:
        return await self._call(
            self._client.search(mode, query, graph=dataset, **body)  # type: ignore[arg-type]
        )

    async def retrieve(
        self, dataset: str, mode: str, query: str, **body: Any
    ) -> RetrieveResponse:
        return await self._call(
            self._client.retrieve(mode, query, graph=dataset, **body)  # type: ignore[arg-type]
        )

    # --- общее ------------------------------------------------------------

    @staticmethod
    async def _call(awaitable: Any) -> Any:
        """Выполнить вызов, переведя ошибку сервиса в наш конверт.

        Ловится только `RaguApiError`: всё остальное — сетевой сбой или наша
        собственная ошибка, и прятать её под 502 значило бы снова сделать
        деградацию беззвучной.
        """
        try:
            return await awaitable
        except RaguApiError as error:
            raise as_http_exception(error) from error
