/// <reference lib="webworker" />
import {computeLayout} from './layout.ts';

export type LayoutRequest = {
    id: string;
    x: Float32Array;
    y: Float32Array;
    degree: Float32Array;
    community: Int32Array;
    edgeSource: Uint32Array;
    edgeTarget: Uint32Array;
    edgeStrength: Float32Array;
    radius: number;
};

export type LayoutMessage =
    | {id: string; type: 'progress'; ratio: number}
    | {id: string; type: 'done'; positions: Float32Array};

const scope = self as unknown as DedicatedWorkerGlobalScope;

scope.onmessage = (event: MessageEvent<LayoutRequest>) => {
    const request = event.data;
    const {positions} = computeLayout(request, (ratio) => {
        scope.postMessage({id: request.id, type: 'progress', ratio} satisfies LayoutMessage);
    });
    scope.postMessage({id: request.id, type: 'done', positions} satisfies LayoutMessage, [positions.buffer]);
};
