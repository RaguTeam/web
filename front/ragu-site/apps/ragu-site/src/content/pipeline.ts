import type {Lang} from '../lib/i18n.ts';

export type PipelineStep = {
    ordinal: string;
    name: string;
    detail: string;
    output: string;
};

const en: PipelineStep[] = [
    {
        ordinal: '01',
        name: 'Chunk',
        detail: 'Documents are split on sentence boundaries, not on a fixed character count, so an entity never straddles the cut.',
        output: 'text chunks',
    },
    {
        ordinal: '02',
        name: 'Extract',
        detail: 'A model reads every chunk and returns typed entities and typed relations, each with a description and a confidence score.',
        output: 'entities · relations',
    },
    {
        ordinal: '03',
        name: 'Cluster',
        detail: 'Leiden community detection groups the graph into themes, then each theme is summarised in its own right.',
        output: 'communities · summaries',
    },
    {
        ordinal: '04',
        name: 'Answer',
        detail: 'A question walks the neighbourhood, reads the community summaries, or both — and the chunk behind each claim comes back with it.',
        output: 'answer · citations',
    },
];

const ru: PipelineStep[] = [
    {
        ordinal: '01',
        name: 'Чанкинг',
        detail: 'Документы режутся по границам предложений, а не по фиксированному числу символов, — сущность не разрывается пополам.',
        output: 'текстовые фрагменты',
    },
    {
        ordinal: '02',
        name: 'Извлечение',
        detail: 'Модель читает каждый фрагмент и возвращает типизированные сущности и связи — с описанием и оценкой уверенности.',
        output: 'сущности · связи',
    },
    {
        ordinal: '03',
        name: 'Кластеризация',
        detail: 'Leiden собирает граф в тематические сообщества, и каждое сообщество получает собственную суммари.',
        output: 'сообщества · суммари',
    },
    {
        ordinal: '04',
        name: 'Ответ',
        detail: 'Вопрос обходит окрестность, читает суммари сообществ или делает и то и другое — и приносит фрагмент-источник.',
        output: 'ответ · ссылки',
    },
];

export function pipeline(lang: Lang): PipelineStep[] {
    return lang === 'ru' ? ru : en;
}
