# RAGU: демо

Демо GraphRAG-движка [RAGU](https://github.com/RaguTeam/RAGU): трёхмерное облако
графа знаний и чат с трейсом ответа поверх заранее построенных корпусов.

Сайт: [raguteam.github.io/web/site](https://raguteam.github.io/web/site/).
Бэкенд: `ragu-back.duckdns.org` (ВМ в Яндекс.Облаке).

[Концепция и стек](./docs/01_Концепция_функциональность_стек.md) · [Роадмап](./docs/02_Роадмап.md)

## Из чего состоит

```text
front/ragu-site ──► back (BFF) ──► ragu-api ──► графы на диске
  GitHub Pages      FastAPI          RAGU      эмбеддер, LLM, реранкер
```

| Папка | Что там |
|---|---|
| [`front/ragu-site`](./front/ragu-site) | сайт: React, Vite, three.js; pnpm-воркспейс |
| [`back`](./back) | FastAPI-шлюз между сайтом и `ragu-api`: язык ответа, выбор режима, лимит вопросов |
| [`embedder`](./embedder) | локальный сервер эмбеддингов и реранкера |
| `docker-compose.yml`, `Caddyfile`, [`observability`](./observability) | стенд: embedder, ragu-api, back, Caddy, Prometheus, Grafana |
| [`docs`](./docs) | концепция, роадмап, настройка моделей |

## Запуск

Сайт:

```bash
cd front/ragu-site
pnpm install
pnpm --filter @ugar/ragu-site dev      # http://localhost:5173
pnpm --filter @ugar/ragu-site test
pnpm --filter @ugar/ragu-site build
```

Бэкенд (нужен поднятый `ragu-api`, подробности в [back/README.md](./back/README.md)):

```bash
uv run --project back uvicorn ragu_web_api.main:app --reload --port 8000
uv run --project back pytest
```

Стенд целиком: `docker compose up -d`, переменные в `.env` (образец в
[back/.env.example](./back/.env.example)). Без `RAGU_API_KEY` ничего не запустится,
это сделано намеренно.

## Публикация

[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) собирает сайт на
каждый пуш и PR. Из `main` он публикуется на `gh-pages` в `site/`, а корень
`/web/` уводит на него. Бэкенд выкатывается на ВМ через Docker Compose.

## Старая версия

Первая версия интерфейса на `$mol`/MAM снята с публикации 4 ноября 2026 года и
убрана из `main`. Её код лежит в ветке `archive/old-app`. Изменения вносятся
только в `front/ragu-site`.

## Контакты

[issues](https://github.com/RaguTeam/web/issues)
