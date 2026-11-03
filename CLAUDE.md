# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

RAGU — GraphRAG demo: a 3D knowledge-graph explorer and a chat with answer traces over prebuilt corpora. Two independently-deployed halves in one repo:

- **`front/ragu-site/`** — the site: React + Vite in a pnpm workspace (`apps/ragu-site`), published to GitHub Pages at `/web/site/`. HTTP only, no domain logic.
- **`back/`** — a standalone FastAPI gateway (`ragu-web-api`), a BFF in front of RAGU's own `ragu-api` service. Deployed with Docker Compose on the stand.

They talk over `/api/v1`. The contract is `back/openapi.json`; the site keeps its own narrow, hand-written types in `src/api/types.ts`.

The old `$mol`/MAM app that used to live in `front/` was taken out of `main` and off GitHub Pages on 2026-11-04. Its code is in the `archive/old-app` branch; do not bring changes back into it.

## Commands

### Site (`front/ragu-site/`)

```bash
cd front/ragu-site
pnpm install
pnpm --filter @ugar/ragu-site dev      # http://localhost:5173
pnpm --filter @ugar/ragu-site check    # tsc, app + tests
pnpm --filter @ugar/ragu-site test     # tsx --test, expect 45 passing
pnpm --filter @ugar/ragu-site build    # check + vite build
```

The dev server is pinned to **5173**: the gateway's CORS allowlist names that origin. `VITE_RAGU_API` points the site at another gateway (default `https://ragu-back.duckdns.org`); `RAGU_BASE` sets the sub-path for the build. Tests are pure `node:test` over modules (layout, framing, SSE parser, rich text, settings migration), no DOM. See [front/ragu-site/README.md](front/ragu-site/README.md) for how the cloud, layout and chat are built.

### Backend (`back/`)

`uv` is the package manager here — do not use `pip`. `[tool.uv.sources]` pins `graph-ragu` to a git branch, and pip ignores that table entirely, so a pip install silently gets a different package.

```bash
uv run --project back uvicorn ragu_web_api.main:app --reload --port 8000
```
Swagger UI: `http://localhost:8000/docs`; `/` redirects there. The backend serves no pages.

Needs `RAGU_API_KEY` set (matching the `ragu-api` service) and `RAGU_API_URL` pointing at it; without a reachable service the gallery and chat return 502/503 by design — there is no local fallback.

Run tests:
```bash
uv run --project back pytest
```
Expect `154 passed, 6 skipped`. Everything that runs by default is network-free: the gateway gets an `httpx.MockTransport`, and the scenarios get a `FakeGateway` from [back/tests/support.py](back/tests/support.py). The 6 skipped live in [back/tests/test_live_stand.py](back/tests/test_live_stand.py) and check a deployment rather than the code — run them from the stand's network with `RAGU_LIVE_TESTS=1`.

After changing any Pydantic schema or route, regenerate the contract:
```bash
bash back/scripts/regen-openapi.sh
```
It dumps `back/openapi.json` straight from `create_app()` (no running server). It skips with exit 0 when Python or `ragu_web_api` is unavailable, so a git hook can call it safely. Override the interpreter with `PYTHON=…` if autodetection picks the wrong one. If the change is visible to the site, update `front/ragu-site/apps/ragu-site/src/api/types.ts` by hand.

`back/openapi.json` is generated — never hand-edit it. Note the spec is stored with **LF** endings and `.gitattributes` sets `* -text`, so nothing normalizes them: dumping it through a shell redirect on Windows produces CRLF and turns the whole 2000-line file into a diff. The script writes it from Python with an explicit `newline="
"` for that reason — do the same if regenerating by hand.

### Docker

`docker-compose.yml` wires: `embedder` (local embedding server) → `ragu-api` (RAGU's own service over `./indexes`) → `back` (this BFF) → `caddy` (TLS reverse proxy), plus `prometheus` and `grafana`.

`RAGU_API_KEY` must be in `.env` or nothing starts — compose fails on the `${RAGU_API_KEY:?}` guard. That is deliberate: a service with no key answers anyone who can reach it, and every request costs LLM calls. `back`'s `RAGU_API_TIMEOUT` is strictly below `ragu-api`'s `RAGU_API_REQUEST_TIMEOUT`; larger and the server gives up first, producing a 504 instead of an answer.

The `environment:` block for `back` intentionally overrides stale embedder vars that might be sitting in `.env`.

## Architecture

### Backend: a BFF in front of `ragu-api`, not a search engine

The backend does not search, does not generate and does not hold a model. All of that belongs to `ragu-api` — RAGU's own HTTP service, running as a separate container over the same prebuilt graph folders. This half decides two things, and both are about the visitor rather than the graph: **what language to answer in** and **which mode to search with when the corpus does not serve the one that was asked for**.

Layers, and what each may import:

| Layer | Modules | Knows about |
| --- | --- | --- |
| HTTP | `routers/`, `schemas/`, `errors.py` | FastAPI, our contract |
| Scenarios | `catalog.py`, `answer.py`, `graph_view.py` | the gateway, presentation |
| Access | `ragu_gateway.py` | `RaguClient`, HTTP, `RaguApiError` |
| Presentation | `presentation/` — `cards.py`, `trace.py`, `language.py`, `graph.py`, `layout.py` | nothing but data — pure functions |

Nothing above `ragu_gateway.py` sees HTTP or `RaguApiError`: the gateway converts every service error into an `HTTPException` carrying our envelope (see the table in [errors.py](back/src/ragu_web_api/errors.py)). Two pairs of service codes look alike and mean different things — a named `CAPABILITY_UNAVAILABLE` kills a mode forever while an unnamed one is an empty result; `TOO_MANY_REQUESTS` is worth retrying while `BUDGET_EXCEEDED` never is.

`X-Request-ID` travels in, through, and out: `RequestContextMiddleware` binds it to a `ContextVar`, `_ExtendedClient._request` puts it on every outbound call, and `ragu-api` adopts it — so one string copied out of devtools finds the request in both services' logs.

`_ExtendedClient` in [ragu_gateway.py](back/src/ragu_web_api/ragu_gateway.py) is temporary: the service serves routes (`GET /entities/{id}`, `GET /chunks`, `POST /relations/select`, `sort`/`order`/`ids` on `/entities`) that `RaguClient` does not yet expose. It disappears when the client catches up.

Nothing is parsed from disk any more and nothing is cached whole: the Explorer canvas pages entities out of the service and asks for the edges between them as one induced subgraph. The process holds three pieces of state, all in memory (one uvicorn worker):
- a catalogue snapshot with a minute of lifetime;
- each corpus's level-0 communities, preloaded in the background at startup and kept until the corpus's counters change (`ragu-api` builds the whole list for every call, 19 s on medical, and serves nothing else meanwhile). A community's public id is its cluster number, the same one entities carry first and `ragu-api` filters by;
- question counters in `limits.py`: per address per minute and per day, and a total per day (Moscow days), `QUESTIONS_PER_MINUTE` / `QUESTIONS_PER_DAY` / `QUESTIONS_TOTAL_PER_DAY`, 0 lifts a limit. Every question costs money in AI Studio and the backend is open to the internet; the address comes from Caddy's `X-Forwarded-For`.

`local` and `naive` questions are sent to `ragu-api` as `mix` with that single engine (`Answerer._service_mode`): RAGU's prompts for those modes allow the model "well-known facts", so it answered questions that have nothing to do with the corpus; the mix prompt does not. The trace still names the mode the visitor chose.

There is still no database, no live indexing, no job queue and no GPU worker. `GET /api/v1/capabilities` is the contract the frontend reads before assuming the backend does any of that.

### CI/Deploy

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds `front/ragu-site` on every push and PR. On `main` it publishes the site to `gh-pages` under `site/` and replaces the root with a single redirect page to `site/`; the root deploy cleans everything else, which is how the old app's files left `gh-pages`. Repository variable `RAGU_API` overrides the gateway address for the `main` build. The backend has no CI/deploy wiring here — it's deployed via the Docker Compose stack (`Caddyfile` + `docker-compose.yml`).
