# RAGU: демо

Демо GraphRAG-движка [RAGU](https://github.com/RaguTeam/RAGU): трёхмерное облако
графа знаний и чат с трейсом ответа поверх заранее построенных корпусов.

Сайт: [raguteam.github.io/web](https://raguteam.github.io/web/), без бэкенда на
записанных ответах: [raguteam.github.io/web/#!mock=1](https://raguteam.github.io/web/#!mock=1).
Бэкенд: `ragu-back.duckdns.org` (ВМ в Яндекс.Облаке).

[Концепция и стек](./docs/01_Концепция_функциональность_стек.md) · [Роадмап](./docs/02_Роадмап.md)

## Из чего состоит

```text
front ──► back (BFF) ──► ragu-api ──► графы на диске
  GitHub Pages  FastAPI       RAGU     эмбеддер, LLM, реранкер
```

| Папка | Что там |
|---|---|
| [`front`](./front) | сайт на [$mol](https://b-on-g.github.io/smalljs/): лендинг, облако на three.js, чат; модули MAM, вход `front/app` |
| [`back`](./back) | FastAPI-шлюз между сайтом и `ragu-api`: язык ответа, выбор режима, лимит вопросов |
| [`embedder`](./embedder) | локальный сервер эмбеддингов и реранкера |
| `docker-compose.yml`, `Caddyfile`, [`observability`](./observability) | стенд: embedder, ragu-api, back, Caddy, Prometheus, Grafana |
| [`docs`](./docs) | концепция, роадмап, настройка моделей |

## Запуск

Сайт собирается внутри [MAM](https://github.com/hyoo-ru/mam), репозиторий лежит в нём как `raggu/web`:

```bash
git clone https://github.com/hyoo-ru/mam.git && cd mam
git clone https://github.com/RaguTeam/web.git raggu/web
npm install
cd raggu/web/front/app && npm start    # сборка через bog/build2
node ../../../../raggu/web/front/app/-/node.test.js
```

Страница: `raggu/web/front/app/-/index.html`. Аргументы в адресе: `#!mock=1` — записанные
ответы шлюза из `front/mock/fixtures`, `#!api=<url>` — другой шлюз.

Бэкенд (нужен поднятый `ragu-api`, подробности в [back/README.md](./back/README.md)):

```bash
uv run --project back uvicorn ragu_web_api.main:app --reload --port 8000
uv run --project back pytest
```

Стенд целиком: `docker compose up -d`, переменные в `.env` (образец в
[back/.env.example](./back/.env.example)). Без `RAGU_API_KEY` ничего не запустится,
это сделано намеренно.

## Публикация

[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) собирает `front/app` через
[b-on-g/mam_build2](https://github.com/b-on-g/mam_build2) на каждый пуш и PR. Из `main` сайт
публикуется в корень `gh-pages`, ветки `feature/*` — в `feature/<ветка>/`.
Бэкенд выкатывается на ВМ через Docker Compose.

## Контакты

[issues](https://github.com/RaguTeam/web/issues)
