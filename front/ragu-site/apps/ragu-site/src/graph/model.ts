import type {CommunitySummary, GraphEdge, GraphMeta, GraphNode, GraphResponse} from '../api/types.ts';

export type TypeCount = {name: string; count: number};

export type GraphModel = {
    nodes: GraphNode[];
    edges: GraphEdge[];
    indexOf: Map<string, number>;
    edgeIndexOf: Map<string, number>;
    /** CSR adjacency over both directions — neighbour lookup without a scan. */
    adjOffset: Uint32Array;
    adjNode: Uint32Array;
    adjEdge: Uint32Array;
    edgeSource: Uint32Array;
    edgeTarget: Uint32Array;
    edgeStrength: Float32Array;
    x: Float32Array;
    y: Float32Array;
    degree: Float32Array;
    community: Int32Array;
    communities: CommunitySummary[];
    communityIndexOf: Map<string, number>;
    maxDegree: number;
    types: TypeCount[];
    relationTypes: TypeCount[];
    meta: GraphMeta;
};

function tally(values: string[]): TypeCount[] {
    const counts = new Map<string, number>();
    for (const value of values) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    return [...counts]
        .map(([name, count]) => ({name, count}))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/**
 * Turns the wire response into flat typed arrays once, so every frame after
 * that is index arithmetic instead of object churn.
 */
export function buildModel(response: GraphResponse): GraphModel {
    const nodes = response.nodes;
    const n = nodes.length;

    const indexOf = new Map<string, number>();
    for (let i = 0; i < n; i++) {
        indexOf.set(nodes[i].id, i);
    }

    // Drop edges whose endpoints fell outside the returned slice.
    const edges: GraphEdge[] = [];
    for (const edge of response.edges) {
        if (indexOf.has(edge.source) && indexOf.has(edge.target) && edge.source !== edge.target) {
            edges.push(edge);
        }
    }
    const m = edges.length;

    const edgeIndexOf = new Map<string, number>();
    const edgeSource = new Uint32Array(m);
    const edgeTarget = new Uint32Array(m);
    const edgeStrength = new Float32Array(m);
    for (let e = 0; e < m; e++) {
        const edge = edges[e];
        edgeIndexOf.set(edge.id, e);
        edgeSource[e] = indexOf.get(edge.source) ?? 0;
        edgeTarget[e] = indexOf.get(edge.target) ?? 0;
        edgeStrength[e] = Number.isFinite(edge.strength) ? edge.strength : 0.5;
    }

    const x = new Float32Array(n);
    const y = new Float32Array(n);
    const degree = new Float32Array(n);
    const community = new Int32Array(n).fill(-1);

    const communities = response.communities ?? [];
    const communityIndexOf = new Map<string, number>();
    communities.forEach((item, index) => communityIndexOf.set(item.id, index));

    let maxDegree = 1;
    for (let i = 0; i < n; i++) {
        const node = nodes[i];
        x[i] = node.x;
        y[i] = node.y;
        degree[i] = node.degree;
        maxDegree = Math.max(maxDegree, node.degree);
        const cid = node.community_id;
        if (cid) {
            const known = communityIndexOf.get(cid);
            community[i] = known ?? hashCommunity(cid);
        }
    }

    // CSR build: count, prefix-sum, scatter.
    const adjOffset = new Uint32Array(n + 1);
    for (let e = 0; e < m; e++) {
        adjOffset[edgeSource[e] + 1] += 1;
        adjOffset[edgeTarget[e] + 1] += 1;
    }
    for (let i = 0; i < n; i++) {
        adjOffset[i + 1] += adjOffset[i];
    }
    const cursor = Uint32Array.from(adjOffset.subarray(0, n));
    const adjNode = new Uint32Array(m * 2);
    const adjEdge = new Uint32Array(m * 2);
    for (let e = 0; e < m; e++) {
        const a = edgeSource[e];
        const b = edgeTarget[e];
        adjNode[cursor[a]] = b;
        adjEdge[cursor[a]] = e;
        cursor[a] += 1;
        adjNode[cursor[b]] = a;
        adjEdge[cursor[b]] = e;
        cursor[b] += 1;
    }

    return {
        nodes,
        edges,
        indexOf,
        edgeIndexOf,
        adjOffset,
        adjNode,
        adjEdge,
        edgeSource,
        edgeTarget,
        edgeStrength,
        x,
        y,
        degree,
        community,
        communities,
        communityIndexOf,
        maxDegree,
        types: tally(nodes.map((node) => node.entity_type)),
        relationTypes: tally(edges.map((edge) => edge.relation_type)),
        meta: response.meta,
    };
}

/** Communities are sometimes referenced by nodes but omitted from the summary list. */
function hashCommunity(id: string): number {
    let h = 2166136261;
    for (let i = 0; i < id.length; i++) {
        h ^= id.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return (h >>> 0) % 4096;
}

export function neighboursOf(model: GraphModel, index: number): {nodes: number[]; edges: number[]} {
    const start = model.adjOffset[index];
    const end = model.adjOffset[index + 1];
    const nodes: number[] = [];
    const edges: number[] = [];
    for (let k = start; k < end; k++) {
        nodes.push(model.adjNode[k]);
        edges.push(model.adjEdge[k]);
    }
    return {nodes, edges};
}
