"""Форма /v1/score в контейнере эмбеддера.

Этот маршрут не OpenAI-совместим: его форму задаёт клиент RAGU, который шлёт
`{model, text_1, text_2}` на `{base_url}score` и читает
`[(int(item["index"]), float(item["score"])) for item in data["data"]]`.

Разойтись они могут молча — RAGU оборачивает реранкер в ForgivingScorer, и
неверный ответ станет не ошибкой, а тихо пропавшим переупорядочиванием. Поэтому
форма проверяется здесь, без модели: реранкер подменяется заглушкой.
"""

import importlib.util
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

EMBEDDER = Path(__file__).resolve().parents[2] / "embedder" / "app.py"


def _load():
    spec = importlib.util.spec_from_file_location("embedder_app", EMBEDDER)
    module = importlib.util.module_from_spec(spec)
    sys.modules["embedder_app"] = module
    spec.loader.exec_module(module)
    return module


class _Stub:
    """Кросс-энкодер, который считает совпадение по длине. Модели не нужно."""

    def predict(self, pairs, **kwargs):
        return [float(len(candidate)) for _, candidate in pairs]


@pytest.fixture
def client(monkeypatch):
    # Пустые списки моделей: иначе старт полез бы в сеть за весами, а проверяем
    # мы форму ответа, а не качество переупорядочивания.
    monkeypatch.setenv("EMBEDDER_MODELS", "")
    monkeypatch.setenv("RERANKER_MODELS", "")
    module = _load()
    module._rerankers["stub"] = _Stub()
    with TestClient(module.app) as started:
        yield started, module


def test_score_answers_in_the_shape_ragu_parses(client) -> None:
    started, _ = client
    response = started.post(
        "/v1/score",
        json={"model": "stub", "text_1": "запрос", "text_2": ["кратко", "подлиннее"]},
    )
    assert response.status_code == 200
    data = response.json()["data"]
    # Ровно то, что делает ragu.models.openai._uncached_score.
    parsed = [(int(item["index"]), float(item["score"])) for item in data]
    assert sorted(index for index, _ in parsed) == [0, 1]


def test_score_orders_by_relevance(client) -> None:
    started, _ = client
    data = started.post(
        "/v1/score",
        json={"model": "stub", "text_1": "q", "text_2": ["кратко", "подлиннее"]},
    ).json()["data"]
    assert [item["index"] for item in data] == [1, 0]


def test_empty_candidates_are_not_an_error(client) -> None:
    started, _ = client
    response = started.post(
        "/v1/score", json={"model": "stub", "text_1": "q", "text_2": []}
    )
    assert response.status_code == 200
    assert response.json()["data"] == []


def test_too_many_candidates_are_refused_with_a_reason(client) -> None:
    """Кросс-энкодер считает по проходу на кандидата: сотня пар на CPU держит
    контейнер минутами, и отказать внятно лучше, чем занять его целиком."""
    started, module = client
    response = started.post(
        "/v1/score",
        json={
            "model": "stub",
            "text_1": "q",
            "text_2": ["x"] * (module.MAX_CANDIDATES + 1),
        },
    )
    assert response.status_code == 413
    assert str(module.MAX_CANDIDATES) in response.json()["detail"]


def test_unknown_model_says_so_instead_of_a_bare_500(client) -> None:
    """RAGU превратит отказ в rerank_error; текст этой строки — всё, что о
    причине останется."""
    started, _ = client
    response = started.post(
        "/v1/score", json={"model": "нет-такой", "text_1": "q", "text_2": ["a"]}
    )
    assert response.status_code in {404, 500}
    assert "нет-такой" in response.json()["detail"]
