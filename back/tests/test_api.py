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


def first_dataset() -> dict:
    response = client.get("/api/v1/datasets?locale=en")
    assert response.status_code == 200
    payload = response.json()
    assert payload
    return payload[0]


def first_graph_node(dataset_id: str) -> dict:
    response = client.get(f"/api/v1/datasets/{dataset_id}/graph?limit=25")
    assert response.status_code == 200
    payload = response.json()
    assert payload["nodes"]
    return payload["nodes"][0]


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


def test_list_datasets_returns_discovered_indexes() -> None:
    response = client.get("/api/v1/datasets?locale=en")
    assert response.status_code == 200
    payload = response.json()
    assert payload
    first = payload[0]
    assert first["stats"]["nodes"] > 0
    assert first["stats"]["edges"] > 0
    assert first["stats"]["chunks"] > 0
    assert first["preview"]["kind"] == "graph"
    assert first["preview"]["primary_entity_types"]
    assert first["suggested_questions"]


def test_graph_filters_by_type_and_strength() -> None:
    dataset = first_dataset()
    dataset_id = dataset["id"]
    entity_type = dataset["preview"]["primary_entity_types"][0]
    response = client.get(
        f"/api/v1/datasets/{dataset_id}/graph",
        params={"entity_types": [entity_type], "min_strength": 0.7, "limit": 50},
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["nodes"]
    assert {node["entity_type"] for node in payload["nodes"]} == {entity_type}
    assert all(edge["strength"] >= 0.7 for edge in payload["edges"])
    assert payload["meta"]["filters"]["entity_types"] == [entity_type]


def test_node_detail_and_neighbors() -> None:
    dataset_id = first_dataset()["id"]
    node = first_graph_node(dataset_id)
    detail = client.get(f"/api/v1/datasets/{dataset_id}/graph/nodes/{node['id']}")
    assert detail.status_code == 200
    detail_payload = detail.json()
    assert detail_payload["node"]["id"] == node["id"]
    assert detail_payload["provenance_chunks"]
    assert detail_payload["incoming_relations"] or detail_payload["outgoing_relations"]

    neighbors = client.get(f"/api/v1/datasets/{dataset_id}/graph/nodes/{node['id']}/neighbors?depth=1")
    assert neighbors.status_code == 200
    neighbor_payload = neighbors.json()
    assert any(item["id"] == node["id"] for item in neighbor_payload["nodes"])
    assert neighbor_payload["edges"]


def test_communities_endpoint() -> None:
    dataset_id = first_dataset()["id"]
    response = client.get(f"/api/v1/datasets/{dataset_id}/graph/communities")
    assert response.status_code == 200
    payload = response.json()
    assert payload["dataset_id"] == dataset_id
    assert payload["communities"]
    assert payload["communities"][0]["node_ids"]


def test_agent_response_contains_trace_and_highlight() -> None:
    dataset_id = first_dataset()["id"]
    node = first_graph_node(dataset_id)
    response = client.post(
        f"/api/v1/datasets/{dataset_id}/agent/messages",
        json={
            "message": f"What is known about {node['label']}?",
            "engine": "local",
            "top_k": 3,
            "rerank": True,
            "include_trace": True,
            "locale": "en",
        },
    )
    assert response.status_code == 200
    payload = response.json()
    message = payload["message"]
    assert message["role"] == "assistant"
    assert message["content"]
    trace = message["trace"]
    assert trace["engine"] == "local"
    assert trace["entities"]
    assert trace["chunks"]
    assert trace["timings"]["total_ms"] >= trace["timings"]["retrieval_ms"]
    assert trace["energy"]["watt_hours"] > 0
    assert trace["highlight"]["node_ids"]


def test_404_for_unknown_dataset_and_node() -> None:
    dataset_response = client.get("/api/v1/datasets/missing")
    assert dataset_response.status_code == 404
    assert dataset_response.json()["detail"]["code"] == "dataset_not_found"

    dataset_id = first_dataset()["id"]
    node_response = client.get(f"/api/v1/datasets/{dataset_id}/graph/nodes/missing")
    assert node_response.status_code == 404
    assert node_response.json()["detail"]["code"] == "node_not_found"
