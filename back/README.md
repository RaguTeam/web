# RAGU Web API

FastAPI gateway for the RAGU web demo. It discovers existing RAGU index folders,
serves graph data from `knowledge_graph.gml` / `kv_chunks.json`, and answers
questions over the selected graph using an OpenAI-compatible LLM when configured.

The expected index layout is:

```text
indexes/
  dataset-a/
    knowledge_graph.gml
    kv_chunks.json
    ...
  dataset-b/
    knowledge_graph.gml
    kv_chunks.json
    ...
```

If `RAGU_INDEXES_DIR` points directly to a single index folder, that folder is
served as one dataset. Without `RAGU_INDEXES_DIR`, the backend looks for the
local `RAGU/indexes` folder next to `norweb`.

## Run

```bash
cd norweb/back
python -m pip install -e ".[dev]"
uvicorn ragu_web_api.main:app --reload --port 8000
```

Open the site at `http://localhost:8000/` when the MAM frontend build exists in
`front/app/-/`. Swagger UI stays available at `http://localhost:8000/docs`.

## Configuration

```bash
export RAGU_INDEXES_DIR=/path/to/indexes

export YANDEX_FOLDER_ID=...
export YANDEX_API_KEY=...
export YANDEX_LLM_MODEL=yandexgpt-5-pro
export YANDEX_BASE_URL=https://ai.api.cloud.yandex.net/v1
```

The LLM variables are optional. If they are missing, `/agent/messages` still
returns graph retrieval results with a clear fallback message instead of calling
an external model.

## API

All application endpoints are under `/api/v1`.

- `GET /health`
- `GET /capabilities`
- `GET /datasets`
- `GET /datasets/{dataset_id}`
- `GET /datasets/{dataset_id}/graph`
- `GET /datasets/{dataset_id}/graph/nodes/{node_id}`
- `GET /datasets/{dataset_id}/graph/nodes/{node_id}/neighbors`
- `GET /datasets/{dataset_id}/graph/communities`
- `POST /datasets/{dataset_id}/agent/messages`
- `GET /datasets/{dataset_id}/agent/suggestions`

Upload, job queue, live indexing, and GPU worker flows are not implemented.
Frontend code should use `/api/v1/capabilities` to hide or disable those UI
actions.

## Tests

```bash
uv run --project norweb/back pytest norweb/back/tests
```

## OpenAPI spec

`openapi.json` next to this README is the source-of-truth spec — dumped from
FastAPI and committed for the frontend codegen. Regenerate after schema changes:

```bash
python -c 'from ragu_web_api.main import create_app; import json; print(json.dumps(create_app().openapi(), indent=2))' > openapi.json
```

The frontend's typed client `web/front/api/ragu.openapi.ts` is generated from
this file. Regen the client with `openapi-typescript` after the spec updates.
