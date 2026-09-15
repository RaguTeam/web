import type {Lang} from '../lib/i18n.ts';

export type StackLink = {label: string; href: string};

export type StackEntry = {
    id: string;
    /** Short kicker on the card. */
    badge: string;
    name: string;
    tagline: string;
    facts: string[];
    body: string[];
    links: StackLink[];
    /** Pull-quote figure for the detail page. */
    figure: {value: string; caption: string}[];
};

const en: StackEntry[] = [
    {
        id: 'ragu',
        badge: 'GraphRAG engine',
        name: 'RAGU',
        tagline: 'Builds the knowledge graph, then answers over it with the source attached.',
        facts: [
            'Indexing runs in four passes: chunk the text, extract typed entities and relations, cluster with Leiden, summarise each community.',
            'Four retrieval engines — local graph neighbourhoods, global community summaries, plain chunk-vector RAG, and a mix engine that combines them.',
            'Async throughout: batched embeddings, batched vector queries, rate-limited model clients.',
            'MIT licensed and self-hosted. Nothing leaves the machine it runs on.',
        ],
        body: [
            'RAGU treats a corpus as structure rather than as a bag of passages. Extraction produces entities carrying a type and a description, and relations carrying a confidence score. Leiden community detection then groups the graph into themes, and each theme gets its own summary, which is what a corpus-wide question is answered from.',
            'That split is what makes two very different questions work in the same system. “What does this document say about FLT3 mutations?” is a local question — walk the neighbourhood around the entity. “What is this corpus mostly about?” is a global one — read the community summaries. The mix engine runs both and reconciles them; the query planner decomposes a compound question into a DAG of simpler ones first.',
            'Settings are serialisable, so an index built on a laptop reproduces on a server without rewriting the pipeline.',
        ],
        links: [
            {label: 'Source on GitHub', href: 'https://github.com/RaguTeam/RAGU'},
            {label: 'Paper (arXiv 2607.11683)', href: 'https://arxiv.org/abs/2607.11683'},
        ],
        figure: [
            {value: '4', caption: 'indexing passes'},
            {value: '5', caption: 'retrieval engines'},
            {value: 'MIT', caption: 'licence'},
        ],
    },
    {
        id: 'ragu-lm',
        badge: 'Extraction model',
        name: 'RAGU-lm',
        tagline: 'A 0.6B extractor fine-tuned for Russian, so indexing does not need a frontier model.',
        facts: [
            'Qwen-3-0.6B fine-tuned on NEREL for entity and relation extraction.',
            'Open weights on Hugging Face — the whole indexing path stays open-source.',
            'Runs the extraction pass; generation can be served by whatever model the deployment prefers.',
            'The single-step pipeline pulls entities, relations and descriptions at once; the two-stage one constrains relations to entities already found.',
        ],
        body: [
            'Extraction is the expensive half of GraphRAG: every chunk has to be read, and the output has to be typed consistently enough that the graph is worth traversing. Sending all of that to a large hosted model is the obvious approach and the wrong one for a corpus you cannot upload.',
            'A small model fine-tuned on a well-specified ontology closes most of that gap. RAGU-lm is trained on NEREL, so its labels line up with the schema the rest of the pipeline expects, and it is small enough to run alongside the indexer instead of behind an API.',
            'In-context learning covers the rest: few-shot examples can be selected semantically, by BM25, by a hybrid of the two, or at random, depending on how much the corpus resembles the training data.',
        ],
        links: [{label: 'Model card', href: 'https://huggingface.co/bond005/meno-lite-0.1'}],
        figure: [
            {value: '0.6B', caption: 'parameters'},
            {value: '4', caption: 'few-shot strategies'},
        ],
    },
    {
        id: 'nerel',
        badge: 'Ontology',
        name: 'NEREL',
        tagline: 'The schema the graph is typed against — 29 entity types, 49 relation types.',
        facts: [
            '29 entity types and 49 relation types, with nested entities and events.',
            'Over 56,000 annotated entities and 39,000 relations across Russian news text.',
            'The schema lives at prompt level, so it extends without retraining anything.',
            'Typed edges are what make a graph queryable — an untyped edge only says two things are related.',
        ],
        body: [
            'A knowledge graph is only as useful as its type system. If every edge means “related to”, traversal degenerates into a similarity search with extra steps. NEREL gives the extractor a fixed vocabulary — TREATMENT_FOR, LOCATED_IN, GENE_ASSOCIATION, HAS_CAUSE — and that vocabulary is what the retrieval engines actually reason over.',
            'Because the schema is expressed in the prompt rather than baked into weights, a new domain does not require a new model. The Medical corpus in this demo drifts well outside news text and still produces coherent types.',
        ],
        links: [{label: 'Dataset', href: 'https://github.com/nerel-ds/NEREL'}],
        figure: [
            {value: '29', caption: 'entity types'},
            {value: '49', caption: 'relation types'},
            {value: '56K+', caption: 'annotated entities'},
        ],
    },
    {
        id: 'interface',
        badge: 'This interface',
        name: 'The explorer',
        tagline: 'One WebGL scene, one API, no server-side rendering.',
        facts: [
            'The entity cloud is a Barnes–Hut force layout solved once in a worker, then drawn as two point passes and one line pass — three draw calls, whatever the corpus size.',
            'Brightness and size follow how connected an entity is; the accent colour is reserved for what you are pointing at.',
            'Labels are DOM over WebGL, so they keep the page typography at any pixel ratio.',
            'React 19, TanStack Router and Query, Tailwind v4, react-three-fiber, Base UI.',
        ],
        body: [
            'The API ships a two-dimensional layout with every graph. That is a good seed and a poor picture — a flat hairball hides exactly the structure the graph was built for. So the layout is lifted into three dimensions, communities are pushed apart along a stable axis, and the whole thing is relaxed with a force solver before the first frame is drawn. The solve is deterministic and cached, so the same corpus always looks the same.',
            'Everything above the scene is glass: the cloud stays visible through the panels rather than being covered by them. Opening the chat slides the cloud aside instead of hiding it, and a cited entity in an answer lights up in the cloud where it sits.',
        ],
        links: [{label: 'Original interface', href: 'https://github.com/RaguTeam/web'}],
        figure: [
            {value: '3', caption: 'draw calls'},
            {value: 'O(n log n)', caption: 'layout cost'},
        ],
    },
];

const ru: StackEntry[] = [
    {
        id: 'ragu',
        badge: 'GraphRAG-движок',
        name: 'RAGU',
        tagline: 'Строит граф знаний и отвечает поверх него, оставляя ссылку на источник.',
        facts: [
            'Индексация в четыре прохода: разбиение на чанки, извлечение типизированных сущностей и связей, кластеризация Leiden, суммаризация сообществ.',
            'Четыре движка поиска — локальные окрестности графа, глобальные суммари сообществ, обычный векторный RAG по чанкам и mix-движок поверх них.',
            'Всё асинхронно: батчевые эмбеддинги, батчевые векторные запросы, клиенты моделей с ограничением частоты.',
            'Лицензия MIT, разворачивается on-premise. Данные не покидают контур.',
        ],
        body: [
            'RAGU смотрит на корпус как на структуру, а не как на мешок пассажей. Извлечение даёт сущности с типом и описанием и связи с оценкой уверенности. Дальше Leiden собирает граф в тематические сообщества, и у каждого сообщества появляется своя суммари — именно из них берётся ответ на вопрос обо всём корпусе.',
            'Это разделение и позволяет обслуживать два очень разных вопроса одной системой. «Что здесь сказано про мутации FLT3?» — локальный вопрос: обходим окрестность сущности. «О чём вообще этот корпус?» — глобальный: читаем суммари сообществ. Mix-движок делает и то и другое, а планировщик сначала раскладывает составной вопрос в DAG простых.',
            'Настройки сериализуются, поэтому индекс, собранный на ноутбуке, воспроизводится на сервере без переписывания пайплайна.',
        ],
        links: [
            {label: 'Исходники на GitHub', href: 'https://github.com/RaguTeam/RAGU'},
            {label: 'Статья (arXiv 2607.11683)', href: 'https://arxiv.org/abs/2607.11683'},
        ],
        figure: [
            {value: '4', caption: 'прохода индексации'},
            {value: '5', caption: 'движков поиска'},
            {value: 'MIT', caption: 'лицензия'},
        ],
    },
    {
        id: 'ragu-lm',
        badge: 'Модель извлечения',
        name: 'RAGU-lm',
        tagline: 'Экстрактор на 0.6B, дообученный под русский, — индексации не нужна фронтир-модель.',
        facts: [
            'Qwen-3-0.6B, дообученный на NEREL под извлечение сущностей и связей.',
            'Открытые веса на Hugging Face — весь путь индексации остаётся открытым.',
            'Отвечает за проход извлечения; генерацию может обслуживать любая модель стенда.',
            'Одношаговый пайплайн достаёт сущности, связи и описания разом; двухэтапный ограничивает связи уже найденными сущностями.',
        ],
        body: [
            'Извлечение — дорогая половина GraphRAG: каждый чанк надо прочитать, а разметку выдать достаточно единообразно, чтобы по графу вообще имело смысл ходить. Отправлять всё это в большую хостовую модель — очевидное решение и неверное для корпуса, который нельзя выгружать.',
            'Маленькая модель, дообученная на чётко заданной онтологии, закрывает почти весь разрыв. RAGU-lm обучен на NEREL, поэтому его метки совпадают со схемой, которую ждёт остальной пайплайн, и он достаточно мал, чтобы работать рядом с индексатором, а не за API.',
            'Остальное добирает in-context learning: few-shot примеры выбираются семантически, по BM25, гибридно или случайно — в зависимости от того, насколько корпус похож на обучающие данные.',
        ],
        links: [{label: 'Карточка модели', href: 'https://huggingface.co/bond005/meno-lite-0.1'}],
        figure: [
            {value: '0.6B', caption: 'параметров'},
            {value: '4', caption: 'стратегии few-shot'},
        ],
    },
    {
        id: 'nerel',
        badge: 'Онтология',
        name: 'NEREL',
        tagline: 'Схема, по которой типизируется граф: 29 типов сущностей, 49 типов связей.',
        facts: [
            '29 типов сущностей и 49 типов связей, включая вложенные сущности и события.',
            'Больше 56 000 размеченных сущностей и 39 000 связей в русскоязычных новостных текстах.',
            'Схема задаётся на уровне промпта — расширяется без переобучения.',
            'Типизированные рёбра и делают граф запрашиваемым: нетипизированное ребро говорит лишь «это как-то связано».',
        ],
        body: [
            'Граф знаний полезен ровно настолько, насколько хороша его система типов. Если каждое ребро значит «связано с», обход вырождается в поиск по похожести с лишними шагами. NEREL даёт экстрактору фиксированный словарь — TREATMENT_FOR, LOCATED_IN, GENE_ASSOCIATION, HAS_CAUSE, — и именно этим словарём оперируют движки поиска.',
            'Схема живёт в промпте, а не в весах, поэтому новая предметная область не требует новой модели. Корпус Medical в этом демо далеко уходит от новостных текстов и всё равно даёт связные типы.',
        ],
        links: [{label: 'Датасет', href: 'https://github.com/nerel-ds/NEREL'}],
        figure: [
            {value: '29', caption: 'типов сущностей'},
            {value: '49', caption: 'типов связей'},
            {value: '56K+', caption: 'размеченных сущностей'},
        ],
    },
    {
        id: 'interface',
        badge: 'Этот интерфейс',
        name: 'Просмотрщик',
        tagline: 'Одна WebGL-сцена, один API, без серверного рендеринга.',
        facts: [
            'Облако сущностей — силовая раскладка Барнса–Хата, решаемая один раз в воркере и рисуемая двумя проходами точек и одним проходом линий: три draw call при любом размере корпуса.',
            'Яркость и размер отражают связность сущности; акцентный цвет отдан тому, на что вы наводитесь.',
            'Подписи — это DOM поверх WebGL, поэтому типографика страницы сохраняется при любом pixel ratio.',
            'React 19, TanStack Router и Query, Tailwind v4, react-three-fiber, Base UI.',
        ],
        body: [
            'API отдаёт вместе с графом двумерную раскладку. Это хороший старт и плохая картинка: плоский клубок прячет ровно ту структуру, ради которой граф и строили. Поэтому раскладка поднимается в три измерения, сообщества разводятся вдоль устойчивой оси, и всё это релаксируется силовым решателем до первого кадра. Решение детерминированное и кэшируется, так что один и тот же корпус всегда выглядит одинаково.',
            'Всё, что над сценой, — стекло: облако видно сквозь панели, а не под ними. Открытие чата сдвигает облако в сторону, а не прячет его, и процитированная в ответе сущность подсвечивается там, где она стоит.',
        ],
        links: [{label: 'Исходный интерфейс', href: 'https://github.com/RaguTeam/web'}],
        figure: [
            {value: '3', caption: 'draw call'},
            {value: 'O(n log n)', caption: 'стоимость раскладки'},
        ],
    },
];

export function stack(lang: Lang): StackEntry[] {
    return lang === 'ru' ? ru : en;
}

export function stackEntry(lang: Lang, id: string): StackEntry | undefined {
    return stack(lang).find((entry) => entry.id === id);
}
