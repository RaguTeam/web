import {createStore} from '../lib/store.ts';
import type {GraphModel} from './model.ts';

export type StageMode = 'ambient' | 'graph';

export type SceneState = {
    mode: StageMode;
    datasetId: string | null;
    model: GraphModel | null;
    positions: Float32Array | null;
    /** 0..1 while the worker solves the layout. */
    progress: number;
    /** A bigger slice is on the wire; what is on screen is the previous one. */
    loading: boolean;
    /**
     * The part of the viewport the panels have left for the cloud, in CSS
     * pixels. The camera frames this rather than the whole window, so opening
     * the chat slides the cloud out from underneath it.
     */
    stage: {x: number; y: number; width: number; height: number} | null;
    graphVisible: boolean;
    chatVisible: boolean;
    /** Bump to re-frame the camera on the whole cloud. */
    resetToken: number;
};

export const sceneStore = createStore<SceneState>({
    mode: 'ambient',
    datasetId: null,
    model: null,
    positions: null,
    progress: 0,
    loading: false,
    stage: null,
    graphVisible: true,
    chatVisible: false,
    resetToken: 0,
});

export function patchScene(patch: Partial<SceneState>): void {
    sceneStore.set((prev) => ({...prev, ...patch}));
}

export type SelectionState = {
    selectedNode: string | null;
    selectedEdge: string | null;
    search: string;
    /** Entity types the reader chose to pick out of the cloud. */
    types: string[];
    communities: string[];
    /** Node ids a chat answer leaned on. */
    highlight: string[];
};

export const EMPTY_SELECTION: SelectionState = {
    selectedNode: null,
    selectedEdge: null,
    search: '',
    types: [],
    communities: [],
    highlight: [],
};

export const selectionStore = createStore<SelectionState>(EMPTY_SELECTION);

export function patchSelection(patch: Partial<SelectionState>): void {
    selectionStore.set((prev) => ({...prev, ...patch}));
}

export function toggleType(name: string): void {
    selectionStore.set((prev) => ({
        ...prev,
        types: prev.types.includes(name) ? prev.types.filter((item) => item !== name) : [...prev.types, name],
    }));
}

export function toggleCommunity(id: string): void {
    selectionStore.set((prev) => ({
        ...prev,
        communities: prev.communities.includes(id)
            ? prev.communities.filter((item) => item !== id)
            : [...prev.communities, id],
    }));
}

/** Hover changes on every pointer move — it gets its own store so panels stay still. */
export const hoverStore = createStore<string | null>(null);

export function selectNode(model: GraphModel | null, id: string | null): void {
    if (id && model && !model.indexOf.has(id)) {
        // The chat can cite an entity outside the current slice; keep the id so
        // the card can still fetch it, but do not pretend the cloud has it.
        patchSelection({selectedNode: id, selectedEdge: null});
        return;
    }
    patchSelection({selectedNode: id, selectedEdge: null});
}

/**
 * Crossfade weights between the landing-page constellation and the real cloud.
 * Mutable on purpose: the fade is driven inside the render loop, and React must
 * not re-render sixty times a second to animate it.
 */
export const fade = {graph: 0, ambient: 1};
