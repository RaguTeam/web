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

Run all frontend tests (340 assertions, no browser/JSDOM):
```bash
node raggu/web/front/app/-/node.test.js
```
Expect `All tests passed`. Tests live in `<module>.test.ts` files (e.g. [front/app/app.test.ts](front/app/app.test.ts)) using `$mol_test` + `$mol_assert_*` against the view API directly — no DOM layout, just structural/snapshot assertions (dom_tree skeletons, CSS rule string matches via `$mol_style_attach:<component>` lookup).

### Backend (`back/`)

`uv` is the package manager here — do not use `pip`. `[tool.uv.sources]` pins `graph-ragu` to a git branch, and pip ignores that table entirely, so a pip install silently gets a different package.

```bash
uv run --project back uvicorn ragu_web_api.main:app --reload --port 8000
```
Swagger UI: `http://localhost:8000/docs`. Serves the built frontend at `/` if `front/app/-/index.html` exists, else redirects to `/docs`.

Needs `RAGU_API_KEY` set (matching the `ragu-api` service) and `RAGU_API_URL` pointing at it; without a reachable service the gallery and chat return 502/503 by design — there is no local fallback.

Run tests:
```bash
uv run --project back pytest
```
Expect `134 passed, 6 skipped`. Everything that runs by default is network-free: the gateway gets an `httpx.MockTransport`, and the scenarios get a `FakeGateway` from [back/tests/support.py](back/tests/support.py). The 6 skipped live in [back/tests/test_live_stand.py](back/tests/test_live_stand.py) and check a deployment rather than the code — run them from the stand's network with `RAGU_LIVE_TESTS=1`.

After changing any Pydantic schema or route, regenerate the contract **and** the frontend client — one script does both:
```bash
bash back/scripts/regen-openapi.sh
```
It dumps `back/openapi.json` straight from `create_app()` (no running server), then runs `back/scripts/regen-openapi-client.mjs`, which shells out to `npx openapi-typescript` and rewrites `front/api/ragu.openapi.ts` (types block + one operation descriptor per `operationId`). It skips with exit 0 when Python or `ragu_web_api` is unavailable, so a git hook can call it safely. Override the interpreter with `PYTHON=…` if autodetection picks the wrong one.

`back/openapi.json` is the single source of truth for the contract, and `front/api/ragu.openapi.ts` is generated — never hand-edit either. Note the spec is stored with **LF** endings and `.gitattributes` sets `* -text`, so nothing normalizes them: dumping it through a shell redirect on Windows produces CRLF and turns the whole 2000-line file into a diff. The script writes it from Python with an explicit `newline="\n"` for that reason — do the same if regenerating by hand.

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

Nothing is parsed from disk any more and nothing is cached whole: the Explorer canvas pages entities out of the service and asks for the edges between them as one induced subgraph. The process holds exactly one piece of state — a catalogue snapshot with a minute of lifetime.

There is still no database, no live indexing, no job queue and no GPU worker. `GET /api/v1/capabilities` is the contract the frontend reads before assuming the backend does any of that.

### Frontend: $mol/MAM module convention

Every feature is a folder under `front/` named after the screen/component, containing up to five files sharing that basename:
- `*.view.tree` — declarative composition (data bindings, `<=`/`<=>` prop wiring, `@`-prefixed strings for i18n source)
- `*.view.ts` — imperative logic, `@$mol_mem` memoized getters/setters, `@$mol_action` for user-triggered mutations
- `*.view.css.ts` — styles via `$mol_style_define`, reading design tokens from `builderui`
- `*.locale=ru.json` — Russian translations (English lives inline in `.view.tree` via `@`-prefix, and mam auto-generates `*.locale=en.json` from it)
- `*.test.ts` — `$mol_test` suite

Screens compose top-down from [front/app/app.view.tree](front/app/app.view.tree) / [app.view.ts](front/app/app.view.ts): `app` owns `screen` (gallery/explorer/chat/summary) and `dataset_id` as `@$mol_mem` state synced to the URL hash via `$mol_state_arg` (`arg_value` helper — non-default values only, to keep the URL clean). Theme/locale persist via `$mol_state_local` instead (not URL). `Gallery` owns the actual dataset list fetch; `app`'s `dataset_ids`/`sidebar_dataset_name`/`sidebar_dataset_meta` are thin proxies into `Gallery()` so the sidebar doesn't duplicate that fetch.

Cross-screen actions live on `app` because they touch two screens' state at once — e.g. `ask_chat()` reads the Explorer's current selection (node or edge) and writes a prefilled prompt into Chat before switching screens.

Chat keeps **threads per corpus**, each holding its own history *and* its own search mode. `Settings` stores nothing: its `engine` / `query_plan` are two-way props that `app` routes onto the active thread (`chat_engine()` / `chat_query_plan()`), so a mode change edits the conversation it belongs to instead of rewriting the terms of one already held. The offered modes come from that corpus's `available_engines` — a mode the corpus does not serve is never in the list, and `engine_missing()` names the absent ones.

Two $mol idioms this code depends on, both learned the hard way: auto-scroll goes through explicit `scroll_height` / `scroll_top` mem channels and a `dom_tree` override, never a direct `scrollTop` write (that only works while something incidentally subscribes to `history()`); and timers are `$mol_after_timeout`, never bare `setTimeout`, which outlives the `$` context and fires into a destroyed component.

Design tokens: never hardcode neutral hex colors — use `$bog_builderui_tokens` (`back/card/text/shade/line/control/special`). Documented exceptions: the indigo accent (`#5b5bd6`/`#ece9fb`), status colors (green `#1f8a5b`, orange `#c2691a`), the Explorer's dark canvas, and entity-dot colors.

### CI/Deploy

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds only `front/app` via `hyoo-ru/mam_build`. `main` → production on `gh-pages`; `feature/*` branches → preview at `feature/<branch>`; plain PRs build without deploying; deleting a `feature/*` branch cleans up its preview folder. The backend has no CI/deploy wiring here — it's deployed via the Docker Compose stack (`Caddyfile` + `docker-compose.yml`).
