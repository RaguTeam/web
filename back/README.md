# RAGU Web API

Бэкенд демо: тонкий слой между фронтом и `ragu-api` — HTTP-сервисом RAGU поверх
готовых графов.

Сам он не ищет, не генерирует и не держит модель. Ни одного файла индекса он не
открывает: графы видит только сервис. На этой стороне принимаются ровно два
решения, и оба про собеседника, а не про граф — **на каком языке отвечать** и
**каким режимом искать, если запрошенный этот корпус не обслуживает**.

```text
фронт ──► back ──► ragu-api ──► графы на диске
                      └──────► эмбеддер, LLM, реранкер
```

## Слои

| Слой | Модули | Что знает |
| --- | --- | --- |
| HTTP | `routers/`, `schemas/`, `errors.py` | FastAPI, наш контракт |
| Сценарии | `catalog.py`, `answer.py`, `graph_view.py` | шлюз и презентацию |
| Доступ | `ragu_gateway.py` | `RaguClient`, HTTP, `RaguApiError` |
| Презентация | `presentation/*` | ничего, кроме данных — чистые функции |

Выше `ragu_gateway.py` никто не знает ни про HTTP, ни про `RaguApiError`: шлюз
переводит любую ошибку сервиса в `HTTPException` с нашим конвертом.

`X-Request-ID` проходит насквозь — из браузера в `back`, оттуда в `ragu-api` и
обратно, так что одна строка из devtools находит запрос в логах обоих сервисов.

## Запуск

Пакетный менеджер здесь `uv`, не `pip`: `[tool.uv.sources]` держит `graph-ragu`
на ветке, а pip эту таблицу не читает и молча поставит другой пакет.

```bash
uv run --project back uvicorn ragu_web_api.main:app --reload --port 8000
```

Нужен поднятый `ragu-api` и `RAGU_API_URL`/`RAGU_API_KEY` на него. Без сервиса
галерея и чат отдают 502/503 — запасного пути нет намеренно.

Сайт открывается на `http://localhost:8000/`, если собран фронт в `front/app/-/`.
Swagger — на `/docs`.

## Настройки

Полный список с пояснениями — в [.env.example](.env.example). Он сгруппирован по
потребителю: модель и эмбеддер читает `ragu-api`, а не этот процесс.

## Тесты

```bash
uv run --project back pytest
```

Всё, что запускается по умолчанию, сети не требует: шлюзу подставляется
`httpx.MockTransport`, сценариям — `FakeGateway` из [tests/support.py](tests/support.py).
Сквозные проверки развёртывания лежат в [tests/test_live_stand.py](tests/test_live_stand.py)
и запускаются отдельно, из сети стенда:

```bash
RAGU_LIVE_TESTS=1 uv run --project back pytest tests/test_live_stand.py
```

## API

Всё под `/api/v1`.

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

Загрузка документов, очередь задач, индексация на лету и GPU-воркеры не
реализованы. Фронт обязан читать `/api/v1/capabilities` и гасить такие действия,
а не предполагать их наличие.

## OpenAPI

`openapi.json` рядом с этим файлом — источник истины по контракту, из него
генерируется типизированный клиент фронта `front/api/ragu.openapi.ts`. Оба
перегенерируются одной командой:

```bash
bash back/scripts/regen-openapi.sh
```

Руками не править ни тот, ни другой. Спецификация хранится с LF, а `.gitattributes`
ставит `* -text`, так что ничего не нормализуется: дамп через редирект оболочки
на Windows даёт CRLF и превращает весь файл в диф. Скрипт пишет его из Python с
явным `newline="\n"` именно поэтому.
