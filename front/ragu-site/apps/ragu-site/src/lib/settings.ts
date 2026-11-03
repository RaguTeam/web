import {createStore} from './store.ts';
import {clamp} from './format.ts';

export type RetrievalSettings = {
    /** Off routes the question to NaiveSearchEngine; on routes it to MixSearchEngine. */
    useGraph: boolean;
    queryPlan: boolean;
    topK: number;
    rerank: boolean;
    /** How many entities the cloud asks the API for. */
    graphLimit: number;
};

export const DEFAULT_SETTINGS: RetrievalSettings = {
    useGraph: true,
    queryPlan: false,
    topK: 8,
    // Off by default: the reranker only reorders the passages the model reads
    // anyway, and on the demo's CPU that costs 15 to 25 s per answer.
    rerank: false,
    graphLimit: 600,
};

/**
 * The gateway rejects `limit` above 5000 outright (422), so this is the whole
 * ladder there is — a corpus larger than that cannot be pulled in one piece.
 */
export const GRAPH_LIMIT_MAX = 5000;
export const GRAPH_LIMIT_STEPS = [600, 1500, 3000, 5000] as const;

/** Bounds accepted by the backend (schemas/agent.py). */
export const TOP_K_MIN = 1;
export const TOP_K_MAX = 50;

const SETTINGS_KEY = 'ragu.settings.v2';
const LEGACY_SETTINGS_KEY = 'ragu.settings';

/**
 * The store saves the whole object, so everyone who touched any setting while
 * rerank was on by default still carries `rerank: true` and waits 20-30 s per
 * answer. Their other choices move to the new key; rerank goes back to the
 * default, once, and from then on stays as they set it.
 */
export function migrateLegacySettings(storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>): void {
    try {
        const legacy = storage.getItem(LEGACY_SETTINGS_KEY);
        if (legacy === null) {
            return;
        }
        const parsed: unknown = JSON.parse(legacy);
        if (storage.getItem(SETTINGS_KEY) === null && typeof parsed === 'object' && parsed !== null) {
            storage.setItem(SETTINGS_KEY, JSON.stringify({...parsed, rerank: DEFAULT_SETTINGS.rerank}));
        }
        storage.removeItem(LEGACY_SETTINGS_KEY);
    }
    catch {
        /* Unreadable or unavailable storage: the defaults apply anyway. */
    }
}

if (typeof localStorage !== 'undefined') {
    migrateLegacySettings(localStorage);
}

export const settingsStore = createStore<RetrievalSettings>(DEFAULT_SETTINGS, {
    key: SETTINGS_KEY,
    revive: (raw) => {
        if (typeof raw !== 'object' || raw === null) {
            return null;
        }
        const value = raw as Partial<RetrievalSettings>;
        return {
            useGraph: typeof value.useGraph === 'boolean' ? value.useGraph : DEFAULT_SETTINGS.useGraph,
            queryPlan: typeof value.queryPlan === 'boolean' ? value.queryPlan : DEFAULT_SETTINGS.queryPlan,
            topK:
                typeof value.topK === 'number'
                    ? clamp(Math.round(value.topK), TOP_K_MIN, TOP_K_MAX)
                    : DEFAULT_SETTINGS.topK,
            rerank: typeof value.rerank === 'boolean' ? value.rerank : DEFAULT_SETTINGS.rerank,
            graphLimit:
                typeof value.graphLimit === 'number'
                    ? clamp(Math.round(value.graphLimit), 50, GRAPH_LIMIT_MAX)
                    : DEFAULT_SETTINGS.graphLimit,
        };
    },
});

export function useSettings(): RetrievalSettings {
    return settingsStore.use();
}

export function patchSettings(patch: Partial<RetrievalSettings>): void {
    settingsStore.set((prev) => ({...prev, ...patch}));
}
