import {useEffect, useRef, useState} from 'react';
// `?worker&inline` bundles the worker as a base64 data URL inside this chunk
// instead of a separate file the page has to fetch — the worker is small and
// self-contained, and it is what lets a single-file build leave nothing behind.
import LayoutWorker from './layout.worker.ts?worker&inline';
import type {LayoutMessage, LayoutRequest} from './layout.worker.ts';
import type {GraphModel} from './model.ts';

/** Solved clouds are kept for the session — flipping between corpora is instant. */
const solved = new Map<string, Float32Array>();

function signature(model: GraphModel, radius: number): string {
    return `${model.meta.dataset_id}:${model.nodes.length}:${model.edges.length}:${radius}`;
}

export type LayoutState = {positions: Float32Array | null; progress: number};

export function useLayout(model: GraphModel | null, radius = 3.2): LayoutState {
    const [state, setState] = useState<LayoutState>({positions: null, progress: 0});
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        return () => {
            workerRef.current?.terminate();
            workerRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!model) {
            setState({positions: null, progress: 0});
            return;
        }

        const key = signature(model, radius);
        const cached = solved.get(key);
        if (cached) {
            setState({positions: cached, progress: 1});
            return;
        }

        setState({positions: null, progress: 0});

        const worker = new LayoutWorker();
        workerRef.current?.terminate();
        workerRef.current = worker;

        const requestId = key;
        let live = true;

        worker.onmessage = (event: MessageEvent<LayoutMessage>) => {
            if (!live || event.data.id !== requestId) {
                return;
            }
            if (event.data.type === 'progress') {
                const ratio = event.data.ratio;
                setState((prev) => ({...prev, progress: ratio}));
                return;
            }
            const positions = event.data.positions;
            solved.set(key, positions);
            setState({positions, progress: 1});
            worker.terminate();
            if (workerRef.current === worker) {
                workerRef.current = null;
            }
        };

        // The worker gets its own copies; the model keeps its arrays intact.
        const request: LayoutRequest = {
            id: requestId,
            x: model.x.slice(),
            y: model.y.slice(),
            degree: model.degree.slice(),
            community: model.community.slice(),
            edgeSource: model.edgeSource.slice(),
            edgeTarget: model.edgeTarget.slice(),
            edgeStrength: model.edgeStrength.slice(),
            radius,
        };

        worker.postMessage(request, [
            request.x.buffer,
            request.y.buffer,
            request.degree.buffer,
            request.community.buffer,
            request.edgeSource.buffer,
            request.edgeTarget.buffer,
            request.edgeStrength.buffer,
        ]);

        return () => {
            live = false;
            worker.terminate();
            if (workerRef.current === worker) {
                workerRef.current = null;
            }
        };
    }, [model, radius]);

    return state;
}
