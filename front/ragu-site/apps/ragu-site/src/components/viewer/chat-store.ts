import type {AnswerTrace} from '../../api/types.ts';
import {createStore} from '../../lib/store.ts';

export type ChatEntry = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    trace?: AnswerTrace | null;
};

export type ChatState = {
    datasetId: string | null;
    entries: ChatEntry[];
    pending: boolean;
    error: string | null;
    /** A question handed over from elsewhere in the UI, waiting for the panel to send it. */
    queued: string | null;
    startedAt: number | null;
};

const EMPTY: ChatState = {
    datasetId: null,
    entries: [],
    pending: false,
    error: null,
    queued: null,
    startedAt: null,
};

export const chatStore = createStore<ChatState>(EMPTY);

export function resetChat(datasetId: string): void {
    chatStore.set({...EMPTY, datasetId});
}

export function patchChat(patch: Partial<ChatState>): void {
    chatStore.set((prev) => ({...prev, ...patch}));
}

let counter = 0;

export function nextId(prefix: string): string {
    counter += 1;
    return `${prefix}-${counter}`;
}

/** Hand a question to the chat panel from anywhere — the entity card, a suggestion chip. */
export function askQuestion(text: string): void {
    chatStore.set((prev) => ({...prev, queued: text}));
}

export type RefKind = 'entity' | 'relation' | 'chunk';

export type Segment =
    | {kind: 'text'; value: string}
    | {kind: 'strong'; value: string}
    | {
          kind: 'ref';
          id: string;
          type: RefKind;
          /** What the reader sees. The id itself is revealed on hover. */
          text: string;
          /** True when this replaced the words the sentence had already spent on it. */
          inline: boolean;
      };

/** Hands back a display label for an id, when the current slice knows one. */
export type RefResolver = (id: string, type: RefKind) => string | undefined;

/**
 * Two shapes turn up, and the label around them varies by answer language:
 * `(Entity: ent-11f5…)` in English, `(см. chunk-83fa…)` in Russian, sometimes
 * a bare `(Chunk: 126e88ea…)` with the prefix dropped, sometimes just
 * `(rel-0e16…)` with no label at all.
 */
const ID = String.raw`(?:ent|rel|chunk)-[0-9a-f]{6,}|[0-9a-f]{16,}`;

// One bracket can hold several ids, separated by commas. The label may not span
// a comma or a hyphen, or it would happily swallow the first id and leave the
// bracket looking like it held one fewer reference than it did.
const CITATION = new RegExp(
    String.raw`\(\s*(?:([^():,;-]{0,24}?)[\s:.]+)?((?:${ID})(?:\s*[,;]\s*(?:${ID}))*)\s*\)`,
    'gi',
);

const KIND_WORDS: Array<[RegExp, RefKind]> = [
    [/^(ent|entity|сущност)/i, 'entity'],
    [/^(rel|relation|связ|отношен)/i, 'relation'],
    [/(chunk|фрагмент|source|источник|см)/i, 'chunk'],
];

function kindOf(raw: string, label: string): RefKind {
    if (raw.startsWith('ent-')) return 'entity';
    if (raw.startsWith('rel-')) return 'relation';
    if (raw.startsWith('chunk-')) return 'chunk';
    for (const [pattern, kind] of KIND_WORDS) {
        if (pattern.test(label)) {
            return kind;
        }
    }
    return 'chunk';
}

/** The lookup tables are keyed by the prefixed form, so put the prefix back. */
function canonical(raw: string, kind: RefKind): string {
    if (raw.includes('-')) {
        return raw;
    }
    return `${kind === 'entity' ? 'ent' : kind === 'relation' ? 'rel' : 'chunk'}-${raw}`;
}

const BOLD = /\*\*([^*]+)\*\*/g;

/** The agent writes its own sub-headings in markdown; render them, do not print the asterisks. */
function pushProse(segments: Segment[], value: string): void {
    if (!value) {
        return;
    }
    let cursor = 0;
    BOLD.lastIndex = 0;
    for (let match = BOLD.exec(value); match !== null; match = BOLD.exec(value)) {
        pushText(segments, value.slice(cursor, match.index));
        segments.push({kind: 'strong', value: match[1]});
        cursor = match.index + match[0].length;
    }
    pushText(segments, value.slice(cursor));
}

function pushText(segments: Segment[], value: string): void {
    if (!value) {
        return;
    }
    const last = segments[segments.length - 1];
    if (last?.kind === 'text') {
        last.value += value;
    }
    else {
        segments.push({kind: 'text', value});
    }
}

/**
 * Answers name a thing and then repeat its id in brackets. Left as prose that
 * is noise twice over, so the id is folded back into the words the sentence
 * already spent on it: the phrase becomes the handle, and the id belongs to
 * the tooltip.
 */
export function parseCitations(content: string, resolve?: RefResolver): Segment[] {
    const segments: Segment[] = [];
    let cursor = 0;

    CITATION.lastIndex = 0;
    for (let match = CITATION.exec(content); match !== null; match = CITATION.exec(content)) {
        pushProse(segments, content.slice(cursor, match.index));
        cursor = match.index + match[0].length;

        const raws = match[2].split(/\s*[,;]\s*/);
        for (let position = 0; position < raws.length; position++) {
            const raw = raws[position].toLowerCase();
            const type = kindOf(raw, match[1] ?? '');
            const id = canonical(raw, type);
            const label = resolve?.(id, type);
            const previous = segments[segments.length - 1];

            // Fold the reference into the phrase that just named it, when it did.
            // Only the first can do that; the rest of the bracket were never words.
            if (position === 0 && label && previous?.kind === 'text') {
                const trimmed = previous.value.replace(/\s+$/, '');
                if (trimmed.toLowerCase().endsWith(label.toLowerCase())) {
                    const cut = trimmed.length - label.length;
                    previous.value = trimmed.slice(0, cut);
                    segments.push({kind: 'ref', id, type, text: trimmed.slice(cut), inline: true});
                    continue;
                }
            }

            if (position > 0) {
                segments.push({kind: 'text', value: ' '});
            }

            segments.push({
                kind: 'ref',
                id,
                type,
                text: label ?? (type === 'entity' ? id.slice(4, 12) : type === 'relation' ? 'rel' : 'src'),
                inline: false,
            });
        }
    }

    pushProse(segments, content.slice(cursor));
    return segments;
}
