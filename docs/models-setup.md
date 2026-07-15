# Модели RAGU Web: эмбеддеры + YandexGPT

Что настраивается для рабочего чата с агентом:

- **LLM (ответы):** YandexGPT из Yandex Cloud (OpenAI-совместимый эндпоинт).
- **Эмбеддеры (векторный поиск / MixSearch):** два маленьких CPU-эмбеддера, поднятые
  отдельным контейнером `embedder` и раздаваемые по OpenAI-совместимому API:
  - `BAAI/bge-large-en-v1.5` (1024-dim) — для индекса **medical**
    (`kg_ragu_medical_icl1_noval_meno_lite`);
  - `Alibaba-NLP/gte-multilingual-base` (768-dim) — для **всех остальных**
    (`dennis_ritchie`, `ragu_bio`).

> ⚠️ **Главное правило:** эмбеддер на запросе обязан совпадать с тем, которым
> строился индекс. Иначе dim не сойдётся и векторный поиск либо падает, либо
> отдаёт мусор (тогда бэк молча уходит в keyword-фолбэк). Проверка — в разделе
> «Валидация», шаг 1.

---

## 1. Архитектура эмбеддеров

RAGU внутри умеет только `EmbedderOpenAI` — то есть ходит в OpenAI-совместимый
`/v1/embeddings` и выбирает модель полем `model`. Поэтому:

- поднимаем один контейнер `embedder/` (FastAPI + sentence-transformers, CPU),
  который держит **обе** модели сразу и выбирает нужную по полю `model`;
- бэк на каждый индекс подставляет свою модель (роутинг по имени папки индекса).

Файлы:

- `embedder/app.py` — OpenAI-совместимый сервер (`/v1/embeddings`, `/health`, `/v1/models`).
- `embedder/Dockerfile` — CPU-torch + предзагрузка обеих моделей в образ (старт без сети).
- `docker-compose.yml` — сервис `embedder` (порт 8001, только внутри docker-сети) +
  бэк с переменными эмбеддера.
- `back/src/ragu_web_api/services/index_repository.py` — роутинг модели по индексу
  (`EMBEDDER_MODEL_MAP`), плюс badge `embedder` в карточке датасета.

### Роутинг модели по индексу

Ключ карты — **имя папки индекса** (оно же `dataset id`). Разбор в
`_ragu_embedder_config_from_env`:

- `EMBEDDER_MODEL_NAME` — дефолтная модель для всех индексов;
- `EMBEDDER_MODEL_MAP` — JSON-переопределение по индексу, напр.
  `{"medical":"BAAI/bge-large-en-v1.5"}`;
- `EMBEDDER_BASE_URL` — эндпоинт эмбеддера (в docker: `http://embedder:8001/v1`);
- `EMBEDDER_BASE_URL_MAP` — (опц.) если разные модели на разных эндпоинтах.

В `docker-compose.yml` эти значения заданы в `back.environment` и **перекрывают**
`.env` (в compose `environment` > `env_file`). Сделано специально, чтобы старая
строка `EMBEDDER_MODEL_NAME=emb://.../text-embeddings-v2` из `.env` не ломала поиск.

> Если папка medical-индекса называется иначе — поменяй ключ в `EMBEDDER_MODEL_MAP`
> (и там, и в `docker-compose.yml`) на фактическое имя папки.

---

## 2. YandexGPT

### 2.1 В облаке (Yandex Cloud)

1. **Foundation Models** должны быть доступны в каталоге (folder).
2. Создать **сервисный аккаунт**, выдать роль `ai.languageModels.user` (для эмбеддеров
   Yandex — ещё `ai.models.embeddings.user`, но нам они не нужны, эмбеддинг локальный).
3. Создать этому аккаунту **API-ключ** (Foundation Models). Хранить только в `.env`.
4. Взять **folder id** со страницы каталога.

### 2.2 В коде / `.env`

Бэк выбирает LLM по приоритету: **YandexGPT → OpenAI-совместимый фолбэк**
(`_llm_config_from_env`). Для YandexGPT нужны:

```bash
YANDEX_FOLDER_ID=b1g49jt73k79m6t6m438
YANDEX_API_KEY=<новый api-ключ>          # старый, засветившийся, отозвать!
YANDEX_LLM_MODEL=yandexgpt-5-pro          # разворачивается в gpt://<folder>/<model>
YANDEX_BASE_URL=https://ai.api.cloud.yandex.net/v1
```

Код сам собирает `model = gpt://<YANDEX_FOLDER_ID>/<YANDEX_LLM_MODEL>` и ходит туда
через `openai`-клиент (заголовок `Authorization: Bearer <api-key>`).

`.env` в docker: LLM-строки берутся из `.env` (`env_file`). **Строки эмбеддера в
`.env` для docker трогать не нужно** — их перекрывает `docker-compose.yml`.

> Модель `yandexgpt-5-pro` и базовый URL проверь курлом (раздел «Валидация», шаг 4).
> Если 404/не резолвится — в доках Yandex базовый URL для OpenAI-SDK часто указан как
> `https://llm.api.cloud.yandex.net/v1`, а имя — `gpt://<folder>/yandexgpt/latest`.

---

## 3. Запуск

```bash
cd ~/ragu-web-deploy/web
docker compose up -d --build          # соберёт embedder (torch CPU + 2 модели) и back
docker compose logs -f embedder       # ждать "[embedder] loaded 'BAAI/bge-large-en-v1.5'" и gte
```

Первая сборка `embedder` тянет torch и веса моделей (~2–3 ГБ) — это нормально.

---

## 4. Валидация

### Шаг 1 (решающий). Чем реально построены индексы

```bash
cd ~/ragu-web-deploy/web
for d in indexes/*/; do
  dim=$(grep -o '"embedding_dim"[^0-9]*[0-9]*' "$d/vdb_entity.json" | grep -o '[0-9]*$' | head -1)
  echo "$(basename "$d"): embedding_dim=$dim"
done
```

Ожидаем:

- `medical: 1024`  → bge-large-en ✅
- `dennis_ritchie: 768`, `ragu_bio: 768` → gte-multilingual-base ✅

Если везде `256` — индексы строились Yandex-эмбеддером (`text-embeddings-v2`), и тогда
либо оставляем Yandex-эмбеддинг, либо **перестраиваем** индексы под bge/gte. Наша
раскладка (bge/gte) верна только при 1024/768.

### Шаг 2. Эмбеддер отдаёт правильные размерности

```bash
docker compose exec back python - <<'PY'
import urllib.request, json
for model, want in [("BAAI/bge-large-en-v1.5",1024), ("Alibaba-NLP/gte-multilingual-base",768)]:
    req = urllib.request.Request(
        "http://embedder:8001/v1/embeddings",
        data=json.dumps({"model": model, "input": "тестовый запрос"}).encode(),
        headers={"Content-Type": "application/json"})
    got = len(json.load(urllib.request.urlopen(req))["data"][0]["embedding"])
    print(model, "->", got, "OK" if got == want else f"!! ожидалось {want}")
PY
```

### Шаг 3. MixSearch реально используется (не keyword-фолбэк)

Каждый датасет показывает свою модель эмбеддера в badge:

```bash
curl -s https://ragu-back.duckdns.org/api/v1/datasets \
 | python3 -c "import sys,json; [print(d['id'], '->', next((b['value'] for b in d['badges'] if b['label']=='embedder'), '?')) for d in json.load(sys.stdin)]"
```

Живой вопрос к агенту (в trace должны быть entities/chunks, а не пусто):

```bash
curl -s -X POST https://ragu-back.duckdns.org/api/v1/datasets/medical/agent/messages \
  -H 'Content-Type: application/json' \
  -d '{"message":"Что известно про пациента?","top_k":5,"include_trace":true}' \
 | python3 -c "import sys,json; m=json.load(sys.stdin)['message']; t=m['trace']; print('answer:', m['content'][:200]); print('entities:', len(t['entities']), 'chunks:', len(t['chunks']))"
```

В логах бэка должно быть, какой эмбеддер выбран, и **не** должно быть фолбэка:

```bash
docker compose logs back | grep -i "MixSearch engine for dataset"        # какой эмбеддер на индекс
docker compose logs back | grep -i "falling back to local retrieval"     # ПУСТО = хорошо
```

### Шаг 4. YandexGPT доступен (URL + ключ + имя модели)

```bash
set -a && source .env && set +a
curl -s "$YANDEX_BASE_URL/chat/completions" \
  -H "Authorization: Bearer $YANDEX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt://'"$YANDEX_FOLDER_ID"'/'"$YANDEX_LLM_MODEL"'","messages":[{"role":"user","content":"скажи ok"}],"max_tokens":10}'
```

Ответ с `choices[].message.content` = LLM настроена. Ошибка модели/URL — см. примечание
в разделе 2.2.

---

## 5. Траблшутинг

| Симптом | Причина | Фикс |
|---|---|---|
| В trace пусто, в ответе «LLM недоступна/локальный поиск» | эмбеддер не сошёлся с индексом или недоступен | шаги 1–2; `docker compose logs back \| grep "falling back"` |
| `embedding dim mismatch` в логах бэка | модель не та, что строила индекс | поправить `EMBEDDER_MODEL_MAP` под фактические dim из шага 1 |
| Эмбеддер долго стартует | грузятся веса | ждать `[embedder] loaded ...`; healthcheck даёт 180с на старт |
| Агент отвечает, но без смысла по графу | keyword-фолбэк вместо MixSearch | шаг 3, устранить причину фолбэка |
| YandexGPT 401/403 | не тот ключ/роль | новый API-ключ у сервисного аккаунта с `ai.languageModels.user` |
| YandexGPT 404 model / не резолвится URL | имя модели или base URL | `gpt://<folder>/yandexgpt/latest`, base `https://llm.api.cloud.yandex.net/v1` |
