"""RAGU search-engine wiring: imports, params, engine cache and global Settings.

These run without an index on disk and without a network: the RAGU engines are
constructed against stub children, which is enough to pin the contract that
actually broke (top-level imports, and top_k never reaching the child engines).
"""

from pathlib import Path
from types import SimpleNamespace

import pytest

from ragu.models.llm import LLM
from ragu.search_engine import MixSearchEngine
from ragu.search_engine.local_search import LocalParams
from ragu.search_engine.naive_search import NaiveSearchParams

import ragu_web_api.services.index_repository as repo
from ragu_web_api.services.index_repository import (
    RaguEmbedderConfig,
    RaguSearchAdapter,
    _ragu_settings,
    _search_params,
)


# ---------- F1: imports resolve from their real subpackage paths ----------


def test_ragu_symbols_are_bound_at_module_level() -> None:
    """graph_ragu 0.0.5 has no top-level `ragu/__init__.py`.

    `from ragu import KnowledgeGraph` raises ImportError, and because the old code
    imported lazily inside a try/except it degraded to keyword search on every
    request instead of failing. Importing this module at all now proves the paths.
    """
    assert repo.KnowledgeGraph.__module__ == "ragu.graph.knowledge_graph"
    assert repo.MixSearchEngine.__module__ == "ragu.search_engine.mix_search"
    assert repo.LocalSearchEngine.__module__ == "ragu.search_engine.local_search"
    assert repo.NaiveSearchEngine.__module__ == "ragu.search_engine.naive_search"
    assert repo.EmbedderOpenAI.__module__ == "ragu.models.embedder"


def test_search_only_llm_is_a_real_ragu_llm() -> None:
    assert issubclass(repo._RaguSearchOnlyLLM, LLM)


# ---------- F4: top_k actually reaches the engines ----------


def test_search_params_are_typed_per_engine() -> None:
    assert _search_params("local", 7) == LocalParams(top_k=7)
    assert _search_params("naive", 7) == NaiveSearchParams(top_k=7)


def test_search_params_for_mix_is_none() -> None:
    """MixSearchEngine.batch_search ignores the params passed to it, so handing it
    any would be a lie; its top_k is baked in at construction instead."""
    assert _search_params("mix", 7) is None


def test_mix_forwards_construction_params_to_children() -> None:
    """The regression that made top_k a no-op: children fell back to top_k=20."""
    import asyncio

    class _Child:
        def __init__(self) -> None:
            self.seen: object = "not called"

        async def batch_search(self, queries: list[str], params: object) -> list:
            self.seen = params
            return [None] * len(queries)

    local, naive = _Child(), _Child()
    mix = MixSearchEngine(
        llm=repo._RaguSearchOnlyLLM(),
        engines=[local, naive],
        engine_params=[LocalParams(top_k=7), NaiveSearchParams(top_k=7)],
        allow_partial_failures=True,
        language="russian",
    )

    # Every child returns None, so Mix reports it could not retrieve anything;
    # the params it handed out are what this test is about.
    with pytest.raises(RuntimeError):
        asyncio.run(mix.search("вопрос", None))

    assert local.seen == LocalParams(top_k=7)
    assert naive.seen == NaiveSearchParams(top_k=7)


def test_engine_cache_key_includes_top_k(monkeypatch: pytest.MonkeyPatch) -> None:
    """A cached engine can only serve the top_k it was built with, so two
    different top_k values must not share one cached engine."""
    import asyncio

    adapter = RaguSearchAdapter(
        RaguEmbedderConfig(
            api_key="unused",
            base_url="http://embedder:8001/v1",
            model_name="stub-model",
            provider="test",
        )
    )
    built: list[int] = []

    class _Engine:
        async def search(self, query: str, params: object) -> object:
            return SimpleNamespace(result=None, metrics={})

    def _build(definition: object, engine_name: str, top_k: int) -> object:
        built.append(top_k)
        return _Engine()

    monkeypatch.setattr(adapter, "supports", lambda definition: True)
    monkeypatch.setattr(adapter, "_build_engine", _build)
    monkeypatch.setattr(repo, "_retrieval_from_ragu_mix", lambda *a, **k: "retrieved")

    index = SimpleNamespace(definition=SimpleNamespace(id="wiki", path=Path("wiki")))

    assert asyncio.run(adapter.search(index, "q", 8, "mix")) == "retrieved"
    assert asyncio.run(adapter.search(index, "q", 8, "mix")) == "retrieved"
    assert asyncio.run(adapter.search(index, "q", 25, "mix")) == "retrieved"

    # Same top_k reuses the cached engine; a different top_k builds a new one.
    assert built == [8, 25]


# ---------- F6: global Settings is restored ----------


def test_ragu_settings_restores_previous_values() -> None:
    from ragu.common.global_parameters import Settings

    before = (Settings.storage_folder, Settings.language)
    with _ragu_settings(Path("some/index"), "russian"):
        assert Settings.language == "russian"
        assert Settings.storage_folder == str(Path("some/index"))
    assert (Settings.storage_folder, Settings.language) == before


def test_ragu_settings_restores_on_exception() -> None:
    from ragu.common.global_parameters import Settings

    before = (Settings.storage_folder, Settings.language)
    with pytest.raises(ValueError):
        with _ragu_settings(Path("some/index"), "russian"):
            raise ValueError("boom")
    assert (Settings.storage_folder, Settings.language) == before
