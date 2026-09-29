"""Галерея корпусов поверх ragu-api.

До переезда каталог собирался обходом папок на диске: бэкенд сам искал
`knowledge_graph.gml`, сам его парсил и сам решал, годится ли индекс к работе.
Теперь роутер каталога не знает ни про файлы, ни про HTTP — он спрашивает здесь,
а здесь спрашивают у сервиса.

Кэш нужен не ради скорости: карточка складывается из 1 + 2N запросов, и без него
каждое открытие галереи било бы по сервису семь раз на три корпуса.
"""

from __future__ import annotations

import asyncio
import logging
import time

from fastapi import HTTPException
from ragu.api.models import GraphInfo

from ragu_web_api.config import Settings
from ragu_web_api.metrics import init_dataset, observe_dataset_request
from ragu_web_api.presentation import cards
from ragu_web_api.presentation.cards import Corpus
from ragu_web_api.ragu_gateway import RaguGateway
from ragu_web_api.schemas.common import Locale
from ragu_web_api.schemas.datasets import DatasetCard, DatasetDetail, DatasetStats

LOGGER = logging.getLogger(__name__)

# Сколько сущностей смотрим, чтобы понять, о чём корпус. Берём самые связанные,
# а не первые попавшиеся: тип вершины-концентратора говорит о предмете графа
# больше, чем самый многочисленный тип в хвосте.
_TYPE_SAMPLE = 500

# Сколько типов показываем. Дальше идёт длинный хвост из единичных.
_TYPE_LIMIT = 6

_EMPTY_STATS = DatasetStats(nodes=0, edges=0, communities=0, chunks=0, documents=0)


class Catalog:
    """Снимок каталога с временем жизни. Один экземпляр на процесс."""

    def __init__(self, gateway: RaguGateway, settings: Settings) -> None:
        self._gateway = gateway
        self._ttl = settings.catalog_ttl
        self._corpora: dict[str, Corpus] = {}
        self._fetched_at = 0.0
        self._lock = asyncio.Lock()
        self._known: set[str] = set()

    # --- то, что видит роутер -------------------------------------------

    async def cards(self, locale: Locale = "ru") -> list[DatasetCard]:
        """Карточки корпусов, готовых отвечать.

        Непогрузившийся корпус в галерею не попадает намеренно: открыть его
        значит получить отказ на первом же вопросе. Причина при этом не теряется
        — она уходит в лог при обновлении снимка.
        """
        corpora = await self._snapshot()
        return [cards.card(item, locale) for item in corpora.values() if item.usable]

    async def detail(self, dataset_id: str, locale: Locale = "ru") -> DatasetDetail:
        observe_dataset_request(dataset_id, "detail")
        return cards.detail(await self.corpus(dataset_id), locale)

    async def corpus(self, dataset_id: str) -> Corpus:
        """Корпус по идентификатору, включая непогрузившийся.

        В отличие от галереи, здесь он отдаётся с пустым списком режимов, а не
        прячется: по прямой ссылке честнее показать корпус без единого рабочего
        режима, чем сказать, что такого корпуса нет.
        """
        corpora = await self._snapshot()
        try:
            return corpora[dataset_id]
        except KeyError as exc:
            raise HTTPException(
                status_code=404,
                detail={
                    "code": "dataset_not_found",
                    "message": f"Dataset '{dataset_id}' was not found.",
                },
            ) from exc

    # --- снимок -----------------------------------------------------------

    async def _snapshot(self) -> dict[str, Corpus]:
        if self._fresh():
            return self._corpora
        async with self._lock:
            # Пока ждали блокировку, снимок мог обновить сосед по event loop.
            if self._fresh():
                return self._corpora
            try:
                self._corpora = await self._fetch()
                self._fetched_at = time.monotonic()
            except Exception:
                if not self._corpora:
                    raise
                # Сервис перезапускается — это минуты. Отдать устаревший снимок
                # лучше, чем пустая галерея на стенде; время обновления не
                # трогаем, чтобы следующий запрос попробовал снова.
                LOGGER.warning(
                    "Catalog refresh failed; serving the previous snapshot.",
                    exc_info=True,
                    extra={"event": "catalog_stale", "corpora": len(self._corpora)},
                )
            return self._corpora

    def _fresh(self) -> bool:
        return bool(self._corpora) and time.monotonic() - self._fetched_at < self._ttl

    async def _fetch(self) -> dict[str, Corpus]:
        roster = await self._gateway.graphs()
        results = await asyncio.gather(
            *(self._corpus_of(info) for info in roster.graphs),
            return_exceptions=True,
        )

        corpora: dict[str, Corpus] = {}
        for info, result in zip(roster.graphs, results):
            if isinstance(result, BaseException):
                # Один корпус не должен уносить галерею целиком.
                LOGGER.warning(
                    "Corpus '%s' could not be read; it is left out of the gallery.",
                    info.id,
                    exc_info=result,
                    extra={"event": "catalog_corpus_failed", "dataset": info.id},
                )
                continue
            corpora[info.id] = result
            if info.id not in self._known:
                self._known.add(info.id)
                init_dataset(info.id)
            if not result.usable:
                LOGGER.warning(
                    "Corpus '%s' cannot answer questions: %s",
                    info.id,
                    result.error or "no mode is available",
                    extra={"event": "catalog_corpus_unusable", "dataset": info.id},
                )
        return corpora

    async def _corpus_of(self, info: GraphInfo) -> Corpus:
        if not info.loaded:
            # У непогрузившегося спрашивать нечего: /stats и /entities ответят
            # отказом, а причина уже приехала в самом списке.
            return Corpus(
                id=info.id,
                language=info.language,
                loaded=False,
                stats=_EMPTY_STATS,
                error=info.error,
            )

        stats = await self._gateway.stats(info.id)
        return Corpus(
            id=info.id,
            language=stats.language,
            loaded=stats.loaded,
            stats=DatasetStats(
                nodes=stats.entities,
                edges=stats.relations,
                communities=stats.communities,
                chunks=stats.chunks,
                documents=stats.documents,
            ),
            engines=cards.engines(
                [mode.mode for mode in stats.modes if mode.available]
            ),
            embedding_dim=stats.embedding_dim,
            entity_types=await self._entity_types(info.id),
            error=info.error,
        )

    async def _entity_types(self, dataset_id: str) -> list[str]:
        """Типы самых связанных сущностей, по убыванию частоты.

        Отказ здесь не должен ронять карточку: без типов она теряет домен и
        подсказки, но остаётся рабочей.
        """
        try:
            page = await self._gateway.entities(
                dataset_id, limit=_TYPE_SAMPLE, sort="degree", order="desc"
            )
        except HTTPException:
            LOGGER.warning(
                "Entity types for corpus '%s' are unavailable; the card loses its domain.",
                dataset_id,
                extra={"event": "catalog_types_failed", "dataset": dataset_id},
            )
            return []

        counts: dict[str, int] = {}
        for entity in page.entities:
            counts[entity.type] = counts.get(entity.type, 0) + 1
        ranked = sorted(counts.items(), key=lambda item: (-item[1], item[0]))
        return [entity_type for entity_type, _ in ranked[:_TYPE_LIMIT]]
