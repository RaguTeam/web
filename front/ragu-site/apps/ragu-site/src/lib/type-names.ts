import {humanizeType} from './format.ts';
import type {Lang} from './i18n.ts';

/**
 * The corpora are indexed in English, so their type vocabulary arrives in
 * English too — and a Russian interface that labels everything DISEASE and
 * TREATMENT_FOR is only half translated. Entity labels themselves stay as the
 * corpus wrote them; the ontology around them does not have to.
 *
 * Unknown types fall through to the humanised token, which is what the previous
 * behaviour was for every type.
 */

/** `BiologicalProcess` and `GENE MUTATION` both normalise to the same key. */
function key(raw: string): string {
    return raw
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/[\s-]+/g, '_')
        .toUpperCase();
}

const ENTITY_RU: Record<string, string> = {
    AGE: 'Возраст',
    ANATOMICAL_STRUCTURE: 'Анатомическая структура',
    ANATOMICAL_SYSTEM: 'Анатомическая система',
    ANATOMY: 'Анатомия',
    ATTRIBUTE: 'Признак',
    AWARD: 'Награда',
    BEHAVIOR: 'Поведение',
    BIOLOGICAL_ENTITY: 'Биологический объект',
    BIOLOGICAL_PROCESS: 'Биологический процесс',
    BIOMATERIAL: 'Биоматериал',
    CELL: 'Клетка',
    CELL_TYPE: 'Тип клеток',
    CITY: 'Город',
    CLASSIFICATION_SYSTEM: 'Классификация',
    CONCEPT: 'Понятие',
    CONDITION: 'Состояние',
    COUNTRY: 'Страна',
    CRIME: 'Преступление',
    DATE: 'Дата',
    DESCRIPTION: 'Описание',
    DISEASE: 'Заболевание',
    DISEASE_OR_DISORDER: 'Заболевание или расстройство',
    DISTRICT: 'Район',
    DOCUMENT: 'Документ',
    DRUG_OR_CHEMICAL: 'Препарат или вещество',
    EVENT: 'Событие',
    FACILITY: 'Объект',
    FAMILY: 'Семья',
    GENE: 'Ген',
    GENE_MUTATION: 'Мутация гена',
    GENE_OR_PROTEIN: 'Ген или белок',
    GENETIC_TEST: 'Генетический тест',
    GROUP: 'Группа',
    HORMONE: 'Гормон',
    IDEOLOGY: 'Идеология',
    LANGUAGE: 'Язык',
    LAW: 'Закон',
    LOCATION: 'Место',
    MEASUREMENT: 'Измерение',
    MEASUREMENT_OR_OUTCOME: 'Измерение или исход',
    MEDICAL_CONDITION: 'Медицинское состояние',
    MONEY: 'Деньги',
    NATIONALITY: 'Национальность',
    NUMBER: 'Число',
    ORDINAL: 'Порядковое',
    ORGAN: 'Орган',
    ORGANIZATION: 'Организация',
    PATHOLOGICAL_ENTITY: 'Патология',
    PENALTY: 'Наказание',
    PERCENT: 'Процент',
    PERSON: 'Человек',
    PROCEDURE: 'Процедура',
    PROCEDURE_OR_INTERVENTION: 'Процедура или вмешательство',
    PROCESS: 'Процесс',
    PRODUCT: 'Продукт',
    PROFESSION: 'Профессия',
    PROTEIN: 'Белок',
    PROTOCOL: 'Протокол',
    RELIGION: 'Религия',
    SOFTWARE: 'Программа',
    STATE_OR_PROV: 'Регион',
    SUBTYPE: 'Подтип',
    SURGERY: 'Операция',
    SYMPTOM_OR_FINDING: 'Симптом или находка',
    SYSTEM: 'Система',
    TEST: 'Исследование',
    TIME: 'Время',
    TREATMENT: 'Лечение',
    WEBSITE: 'Сайт',
    WORK_OF_ART: 'Произведение',
};

const RELATION_RU: Record<string, string> = {
    AFFECTED_BY: 'Зависит от',
    AFFECTS: 'Влияет на',
    AGENT: 'Агент',
    ALTERNATIVE_TO: 'Альтернатива',
    APPLICABLE_TO: 'Применимо к',
    BASED_ON: 'Основано на',
    BIOMARKER: 'Биомаркер',
    CAUSE_OF: 'Вызывает',
    CELL_TYPE_PRESENT_IN_DISEASE: 'Тип клеток при заболевании',
    COMBINED_WITH: 'В сочетании с',
    CONTAINS: 'Содержит',
    COVERED_BY: 'Покрывается',
    DIAGNOSED_WITH: 'Диагностируется',
    DOCUMENT_SOURCE: 'Источник документа',
    EXAMPLE_OF: 'Пример',
    EXPRESSED_IN: 'Экспрессируется в',
    GENE_ASSOCIATION: 'Связь с геном',
    HAS_CAUSE: 'Причина',
    HAS_EFFECT: 'Имеет эффект',
    INCIDENCE_INCREASES: 'Повышает частоту',
    INSTANCE_OF: 'Экземпляр',
    INVOLVES: 'Включает',
    INVOLVES_REMOVAL: 'Включает удаление',
    INVOLVES_TEST: 'Включает исследование',
    LOCATED_IN: 'Находится в',
    LOCATION: 'Расположение',
    LOCATION_OF_DISEASE: 'Локализация заболевания',
    MANAGEMENT_STRATEGY: 'Стратегия ведения',
    PART_OF: 'Часть',
    PARTICIPANT_IN: 'Участник',
    PRECEDES: 'Предшествует',
    PRODUCES: 'Производит',
    PRODUCT: 'Продукт',
    RELATED_TO: 'Связано с',
    REMOVES: 'Удаляет',
    REPORTED_TO: 'Сообщается в',
    RISK_FACTOR: 'Фактор риска',
    RISK_FACTOR_FOR: 'Фактор риска для',
    SIDE_EFFECT: 'Побочный эффект',
    SPREAD_TO: 'Распространяется в',
    STARTS_IN: 'Начинается в',
    SUBCLASS_OF: 'Подкласс',
    SUPERCLASS_OF: 'Надкласс',
    SYNONYM: 'Синоним',
    TARGET_OF: 'Цель',
    TARGETS: 'Нацелен на',
    TREATMENT: 'Лечение',
    TREATMENT_FOR: 'Лечит',
    TREATS: 'Лечит',
    TYPE_OF: 'Тип',
    USED_FOR: 'Используется для',
    USED_IN: 'Используется в',
    USES: 'Использует',
};

export function entityTypeName(raw: string, lang: Lang): string {
    if (lang === 'ru') {
        const hit = ENTITY_RU[key(raw)];
        if (hit) {
            return hit;
        }
    }
    return humanizeType(raw);
}

export function relationTypeName(raw: string, lang: Lang): string {
    if (lang === 'ru') {
        const hit = RELATION_RU[key(raw)];
        if (hit) {
            return hit;
        }
    }
    return humanizeType(raw);
}
