# RAGU — Live Demo

GraphRAG-движок с UI: интерактивный граф знаний, чат с трейсом ответа, бенчмарки качества + энергии. Подача на трек EMNLP 2026.

[Концепция и стек](./docs/01_Концепция_функциональность_стек.md) · [Роадмап](./docs/02_Роадмап.md)

## Что внутри

5 экранов, переключаются через сайдбар. Все строки локализованы (RU/EN), палитра переключается light/dark через `$bog_theme_switch`. State экрана/датасета/пресета — в URL hash, язык и тема — в `localStorage`.

| Экран | Модуль | Статус |
|---|---|---|
| **Датасеты** (gallery) | `gallery/` + `gallery/card/` + `gallery/upload/` | ✅ карточки, выбор, mock-флоу индексации по 6 шагам |
| **Граф знаний** (explorer) | `explorer/` | ⚠️ заглушка Sigma.js, карточка сущности, фильтры — без real-data |
| **Чат с агентом** | `chat/` | ✅ ввод + отправка, история в session, mock-ответ + trace |
| **Дашборд** | `dashboard/` + `dashboard/metric/` + `dashboard/stage/` + `dashboard/log/` + `dashboard/dist/` | ✅ статистика, бенчмарки, формула энергии TDP×время×PUE, expandable логи |
| **Настройки движка** (slide-over) | `settings/` + `settings/group/` | ✅ 3 пресета (⚡/🎯/🎬) + 14 реальных контролов по 6 шагам пайплайна |

Плюс **экспорт** (`export/`) — выгрузка артефактов: GraphML/GEXF/JSON/PNG для графа, MD/JSON для чата, CSV/JSON для дашборда.

## Стек

- **$mol/MAM** (TypeScript) — реактивный UI-фреймворк, [mol.hyoo.ru](https://mol.hyoo.ru)
- **builderui** (`bog/builderui/`) — design system: tokens (`back/card/text/shade/line/control`), темы (light/dark × stone/slate/zinc/gray × sky/violet/rose/emerald/amber)
- **i18n** через `$mol_locale` + `<module>.locale=ru.json` рядом с компонентом
- **URL state** через `$mol_state_arg` (screen/preset/dataset_id)
- **Theme/locale persist** через `$mol_state_local`
- Тесты — `$mol_test`, скрипт-style без браузера (Playwright-flow через прямой вызов action-методов)

## Запуск

Это MAM-пакет, не самостоятельный npm-проект. Подключается к [MAM-репо](https://github.com/hyoo-ru/mam) как подпапка `raggu/web`.

### Локально через MAM dev-server

```bash
# в корне MAM-репо
git clone https://github.com/hyoo-ru/mam.git
cd mam
git clone https://github.com/RaguTeam/web.git raggu/web
npm install
npx mam start
```

Открыть: **http://localhost:9080/raggu/web/front/app/-/test.html**

Dev-сервер на лету пересобирает при изменении любого `.view.tree` / `.view.ts` / `.view.css.ts` / `.locale=*.json`.

### Сборка standalone

```bash
npx mam raggu/web/front/app
```

Артефакт: `raggu/web/front/app/-/` — статичная сборка для деплоя (index.html + web.js + web.css + локали).

### Тесты

```bash
node raggu/web/front/app/-/node.test.js
```

Должно вывести `All tests passed`. Текущий счёт — **283** (структурные snapshot'ы, e2e-flow через view-API, URL state, CSS rule intent, новые фичи).

## CI / Deploy

[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

- **`main`** → продакшен на `gh-pages` (`hyoo-ru/gh-deploy`)
- **`feature/*`** → preview-папка `feature/<branch>` на gh-pages
- **`pull_request`** → сборка без деплоя (проверяет что не сломалось)
- **delete `feature/*`** → cleanup preview-папки

Сборку гоняет `hyoo-ru/mam_build@master2` с `modules: app`.

## Структура

```
raggu/web/                        # umbrella repo (RaguTeam/web)
├── front/                        # all UI code (mol/MAM)
│   ├── app/                     #   root mol-module, маршрутизация экранов
│   │   ├── app.view.tree        #     композиция UI
│   │   ├── app.view.ts          #     методы screen/preset/dataset_id + URL state
│   │   ├── app.view.css.ts      #     стили (через $bog_builderui_tokens)
│   │   ├── app.meta.tree        #     deploy-список зависимостей builderui
│   │   ├── app.locale=ru.json   #     общие RU-переводы (датасеты, screen titles)
│   │   ├── app.locale=en.json   #     общие EN-source (overrides auto-gen)
│   │   ├── app.test.ts          #     283 теста
│   │   ├── index.html           #     <head> + SEO + mol_view_root
│   │   └── -/                   #     build output (gitignored)
│   ├── sidebar/                 #   навигация + лого + лангтоглл + theme_switch
│   │   ├── nav/                 #     sub-component для nav-item
│   │   └── lang/                #     sub-component для EN/RU pill
│   ├── topbar/                  #   title + 3 пресета + Settings + Export buttons
│   │   └── preset/              #     sub-component для preset-pill
│   ├── gallery/
│   │   ├── card/                #     карточка датасета
│   │   │   └── preview/         #       фон-pattern preview-area
│   │   └── upload/              #     mock-флоу индексации по 6 шагам
│   ├── explorer/                #   canvas + Filters + Legend + Aside (entity card)
│   ├── chat/                    #   история сообщений + Prompt + Suggestions
│   ├── dashboard/
│   │   ├── metric/              #     строка качества (имя+полоса+значение)
│   │   ├── stage/               #     строка тайминга
│   │   ├── log/                 #     expandable строка лога с trace
│   │   └── dist/                #     placeholder для distribution chart
│   ├── settings/
│   │   └── group/               #     шаг пайплайна (step + title + opts + controls)
│   └── export/                  #   $mol_pop с меню форматов per-screen
├── back/                         # FastAPI + предындексы (TBD)
├── docs/                         # концепция + роадмап (shared)
├── .github/workflows/deploy.yml  # gh-pages CI (front)
├── README.md                     # этот файл
├── .gitignore
└── .gitattributes
```

## Конвенции

- **Никаких hex-цветов для нейтралов** — только `$bog_builderui_tokens.back/card/text/shade/line/control/special`. Исключения: акцент-индиго `#5b5bd6`/`#ece9fb`, статус-цвета (`#1f8a5b` зелёный, `#c2691a` оранжевый), dark canvas, entity-dots в Explorer.
- **Все user-facing строки** локализуются: `@`-prefix в view.tree (источник = English) → mam генерит `web.locale=en.json` → рядом руками `<module>.locale=ru.json`.
- **Стили — `.view.css.ts`** через `$mol_style_define`. Если нужны attribute selectors на чужих компонентах (`$mol_button_minor[bog_theme_switch_active]`) — sub-key внутри $mol_style_define родителя.
- **Тесты — `app.test.ts`** через `Component.make({ $ })` + ассерты на view-API. Без JSDOM-layout: за-counter snapshot'ы (dom_tree skeleton, CSS rule string match).

## Контакты

[issues](https://github.com/RaguTeam/web/issues) · подача на EMNLP 2026 (deadline 10 июля)
