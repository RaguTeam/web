# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

RAGU — GraphRAG demo: interactive knowledge-graph explorer, chat-with-trace, and quality/energy benchmarks. Two independently-deployed halves in one repo:

- **`front/`** — a `$mol`/MAM TypeScript UI. This directory is **not** a standalone npm project; it's a subfolder meant to be checked out inside a [MAM monorepo](https://github.com/hyoo-ru/mam) as `raggu/web`.
- **`back/`** — a standalone FastAPI gateway (`ragu-web-api`) that discovers preindexed RAGU graph folders and serves them. Runs independently of the MAM tooling.

They talk over `/api/v1`, typed by a committed OpenAPI spec (`back/openapi.json` → codegen'd into `front/api/ragu.openapi.ts`).

## Commands

### Frontend (`front/`)

Requires the MAM dev toolchain checked out as a sibling; this folder alone has no `package.json`.

```bash
# one-time, from the MAM repo root
git clone https://github.com/hyoo-ru/mam.git && cd mam
git clone https://github.com/RaguTeam/web.git raggu/web
npm install
npx mam start
```

Open `http://localhost:9080/raggu/web/front/app/-/test.html`. The dev server hot-rebuilds on any `.view.tree` / `.view.ts` / `.view.css.ts` / `.locale=*.json` change.

Standalone production build:
```bash
npx mam raggu/web/front/app
```
Output: `raggu/web/front/app/-/` (index.html + web.js + web.css + locales) — gitignored, and served directly by the FastAPI backend when present (see `back/src/ragu_web_api/main.py`).

Run all frontend tests (283+ assertions, no browser/JSDOM):
```bash
node raggu/web/front/app/-/node.test.js
```
Expect `All tests passed`. Tests live in `<module>.test.ts` files (e.g. [front/app/app.test.ts](front/app/app.test.ts)) using `$mol_test` + `$mol_assert_*` against the view API directly — no DOM layout, just structural/snapshot assertions (dom_tree skeletons, CSS rule string matches via `$mol_style_attach:<component>` lookup).

### Backend (`back/`)

```bash
cd back
python -m pip install -e ".[dev]"
uvicorn ragu_web_api.main:app --reload --port 8000
```
Swagger UI: `http://localhost:8000/docs`. Serves the built frontend at `/` if `front/app/-/index.html` exists, else redirects to `/docs`.

Run tests:
```bash
cd back
pytest                      # all tests
pytest tests/test_api.py    # one file
pytest tests/test_api.py::test_openapi_has_expected_tags_and_no_live_indexing_paths  # one test
pytest -k query_plan         # by keyword
```
(`uv run --project back pytest` also works if using `uv`.) Note: `tests/test_api.py` needs a real prebuilt RAGU index discoverable via `RAGU_INDEXES_DIR` (or the default `../RAGU/indexes` / `./indexes` lookup) — it exercises the live discovery/graph/agent endpoints. `tests/test_query_plan.py` stubs the LLM and repository internals directly, so it runs in a bare checkout with no index on disk.

Regenerate the OpenAPI contract after changing any Pydantic schema or route:
```bash
python -c 'from ragu_web_api.main import create_app; import json; print(json.dumps(create_app().openapi(), indent=2))' > openapi.json
```
Then regenerate the frontend's typed client (`front/api/ragu.openapi.ts`) with `openapi-typescript` from the updated spec.

### Docker

`docker-compose.yml` wires three services: `embedder` (local embedding server) → `back` (FastAPI, reads `./indexes` read-only) → `caddy` (TLS reverse proxy). `docker-compose.yml`'s `environment:` block for `back` intentionally overrides stale embedder vars that might be sitting in `.env`.

## Architecture

### Backend: index-driven, not database-driven

There is no database. `IndexRepository` ([back/src/ragu_web_api/services/index_repository.py](back/src/ragu_web_api/services/index_repository.py)) is the entire data layer — a singleton (see [services/dependencies.py](back/src/ragu_web_api/services/dependencies.py)) that at startup scans `RAGU_INDEXES_DIR` for subfolders containing `knowledge_graph.gml` + `kv_chunks.json`, and lazily parses each into an in-memory `LoadedIndex` on first access (nodes/edges/communities/chunks + adjacency maps), cached forever in `self._loaded`.

Retrieval has two independent tiers, chosen per-index at request time:
- **RAGU vector search** (`RaguSearchAdapter`) — used only when the index folder also has `vdb_entity.json` + `vdb_chunk.json` *and* an embedder is configured for that index (`EMBEDDER_MODEL_MAP` allows per-index model overrides, since indexes may have been built with different embedding models). Builds a real `ragu.KnowledgeGraph` + `LocalSearchEngine`/`NaiveSearchEngine`/`MixSearchEngine`, cached per `(dataset_id, engine_name)`.
- **Local keyword fallback** (`IndexRepository._retrieve`) — a plain token-overlap ranker, used when RAGU search isn't configured/available or raises. Every RAGU call path degrades to this rather than failing the request; the trace's reported `engine` always reflects what actually ran ("keyword" if it fell back), never what was requested.

Generation is a separate concern from retrieval: `OpenAICompatibleLLM` wraps any OpenAI-compatible chat endpoint (including YandexGPT via a `gpt://folder/model` URI — see `_llm_config_from_env`). If no LLM is configured or the call fails, `answer()` falls back to `_fallback_answer`, which surfaces the raw retrieved entities/chunks instead of silently returning nothing.

Query planning (`use_query_plan` on `AgentRequest`) decomposes a question into sub-questions via this backend's own LLM (never RAGU's own `QueryPlanEngine`, which is unreachable here — the RAGU engines are wired to a stub LLM, `_RaguSearchOnlyLLM`, that always raises on generation). Each sub-question gets its own full retrieval pass; results merge by best-score-per-item (not summed) in `_merge_retrievals`, capped at `_QUERY_PLAN_MAX = 4` sub-questions since each one multiplies retrieval latency.

Everything under `/api/v1` is mock-free and driven by real prebuilt indexes; live indexing, job queues/Redis/RQ/Celery, and GPU workers are intentionally unimplemented. `GET /api/v1/capabilities` is the contract the frontend reads to hide/disable UI for those absent features — check it before wiring up any new "backend does X" UI assumption. (`mock_repository.py` / `fixtures/mock_data.py` exist for local frontend-only mock flows, separate from this real path.)

### Frontend: $mol/MAM module convention

Every feature is a folder under `front/` named after the screen/component, containing up to five files sharing that basename:
- `*.view.tree` — declarative composition (data bindings, `<=`/`<=>` prop wiring, `@`-prefixed strings for i18n source)
- `*.view.ts` — imperative logic, `@$mol_mem` memoized getters/setters, `@$mol_action` for user-triggered mutations
- `*.view.css.ts` — styles via `$mol_style_define`, reading design tokens from `builderui`
- `*.locale=ru.json` — Russian translations (English lives inline in `.view.tree` via `@`-prefix, and mam auto-generates `*.locale=en.json` from it)
- `*.test.ts` — `$mol_test` suite

Screens compose top-down from [front/app/app.view.tree](front/app/app.view.tree) / [app.view.ts](front/app/app.view.ts): `app` owns `screen` (gallery/explorer/chat/summary) and `dataset_id` as `@$mol_mem` state synced to the URL hash via `$mol_state_arg` (`arg_value` helper — non-default values only, to keep the URL clean). Theme/locale persist via `$mol_state_local` instead (not URL). `Gallery` owns the actual dataset list fetch; `app`'s `dataset_ids`/`sidebar_dataset_name`/`sidebar_dataset_meta` are thin proxies into `Gallery()` so the sidebar doesn't duplicate that fetch.

Cross-screen actions live on `app` because they touch two screens' state at once — e.g. `ask_chat()` reads the Explorer's current selection (node or edge) and writes a prefilled prompt into Chat before switching screens. The `Settings` module's `use_graph` / `query_plan` toggles map directly onto the agent request's `engine` (`mix` vs `naive`) and `use_query_plan` fields — see `chat_engine()`/`chat_query_plan()` in `app.view.ts` — deliberately not merged into one enum, since "graph off + decomposition on" needs to be independently expressible.

Design tokens: never hardcode neutral hex colors — use `$bog_builderui_tokens` (`back/card/text/shade/line/control/special`). Documented exceptions: the indigo accent (`#5b5bd6`/`#ece9fb`), status colors (green `#1f8a5b`, orange `#c2691a`), the Explorer's dark canvas, and entity-dot colors.

### CI/Deploy

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds only `front/app` via `hyoo-ru/mam_build`. `main` → production on `gh-pages`; `feature/*` branches → preview at `feature/<branch>`; plain PRs build without deploying; deleting a `feature/*` branch cleans up its preview folder. The backend has no CI/deploy wiring here — it's deployed via the Docker Compose stack (`Caddyfile` + `docker-compose.yml`).
