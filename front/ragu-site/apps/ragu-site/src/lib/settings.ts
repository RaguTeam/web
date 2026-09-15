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
    rerank: true,
    graphLimit: 600,
};

/**
 * The gateway rejects `limit` above 5000 outright (422), so this is the whole
 * ladder there is — a corpus larger than that cannot be pulled in one piece.
 */
export const GRAPH_LIMIT_MAX = 5000;
export const GRAPH_LIMIT_STEPS = [600, 1500, 3000, 5000] as const;

export const settingsStore = createStore<RetrievalSettings>(DEFAULT_SETTINGS, {
    key: 'ragu.settings',
    revive: (raw) => {
        if (typeof raw !== 'object' || raw === null) {
            return null;
        }
        const value = raw as Partial<RetrievalSettings>;
        return {
            useGraph: typeof value.useGraph === 'boolean' ? value.useGraph : DEFAULT_SETTINGS.useGraph,
            queryPlan: typeof value.queryPlan === 'boolean' ? value.queryPlan : DEFAULT_SETTINGS.queryPlan,
            topK: typeof value.topK === 'number' ? clamp(Math.round(value.topK), 1, 50) : DEFAULT_SETTINGS.topK,
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
