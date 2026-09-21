"""Контракт и форма приложения. Ни индекса, ни поднятого сервиса не нужно.

Сценарии, которым нужен живой стенд, лежат в `test_live_stand.py` и по умолчанию
пропускаются.
"""

from fastapi.testclient import TestClient

from ragu_web_api.main import FRONTEND_INDEX, app

client = TestClient(app)

def test_root_serves_frontend_or_redirects_to_docs() -> None:
    response = client.get("/", follow_redirects=False)
    if FRONTEND_INDEX.exists():
        assert response.status_code == 200
        assert "RAGU" in response.text
    else:
        assert response.status_code in {307, 308}
        assert response.headers["location"] == "/docs"


def test_openapi_has_expected_tags_and_no_live_indexing_paths() -> None:
    response = client.get("/openapi.json")
    assert response.status_code == 200
    payload = response.json()
    assert {tag["name"] for tag in payload["tags"]} >= {
        "System",
        "Datasets",
        "Graph Explorer",
        "Agent",
    }
    paths = set(payload["paths"])
    assert "/api/v1/datasets" in paths
    assert "/api/v1/datasets/{dataset_id}/agent/messages" in paths
    forbidden = ("upload", "job", "jobs", "indexing", "live-index")
    assert not any(any(term in path for term in forbidden) for path in paths)


def test_capabilities_disable_upload_queue_and_gpu() -> None:
    response = client.get("/api/v1/capabilities")
    assert response.status_code == 200
    payload = response.json()
    assert payload["preindexed_datasets"] is True
    assert payload["graph_explorer"] is True
    assert payload["agent_chat"] is True
    for key in ("upload_document", "upload_index", "live_indexing", "job_queue", "gpu_worker"):
        assert payload[key] is False
