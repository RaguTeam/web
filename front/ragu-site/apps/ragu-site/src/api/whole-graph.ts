import {api, type GraphQuery} from './client.ts';
import type {CommunitySummary, GraphEdge, GraphNode, GraphResponse} from './types.ts';

/**
 * The gateway has no paging. `limit` is capped at 5000 and there is no offset
 * or cursor, so "the next page" cannot be asked for directly.
 *
 * What it does have is a `community_ids` filter, and every node belongs to a
 * community — so the corpus can be walked one batch of communities at a time
 * and stitched back together here. That covers a corpus of any size, with one
 * exception the caller has to live with: a single community larger than the
 * per-request cap still comes back clipped, because there is no filter that
 * subdivides it.
 */

/** Per request, kept under the gateway's own ceiling. */
const REQUEST_LIMIT = 5000;

/** How much of a batch to fill before sending it. */
const BATCH_TARGET = 4200;

export type WholeGraphProgress = {
    /** 0..1 over the community list. */
    ratio: number;
    nodes: number;
};

export type WholeGraphResult = {
    graph: GraphResponse;
    /** True when every community was requested without hitting the budget. */
    complete: boolean;
    /** Communities the gateway could only answer partially. */
    clipped: string[];
};

function batchCommunities(communities: CommunitySummary[]): CommunitySummary[][] {
    const batches: CommunitySummary[][] = [];
    let batch: CommunitySummary[] = [];
    let size = 0;

    // Biggest first: an oversized community then travels alone rather than
    // dragging a batch over the ceiling with it.
    for (const community of [...communities].sort((a, b) => b.size - a.size)) {
        if (community.size >= BATCH_TARGET) {
            batches.push([community]);
            continue;
        }
        if (size + community.size > BATCH_TARGET && batch.length > 0) {
            batches.push(batch);
            batch = [];
            size = 0;
        }
        batch.push(community);
        size += community.size;
    }

    if (batch.length > 0) {
        batches.push(batch);
    }
    return batches;
}

export async function loadWholeGraph(
    datasetId: string,
    seed: GraphResponse,
    options: {budget: number; signal?: AbortSignal; onProgress?: (progress: WholeGraphProgress) => void},
): Promise<WholeGraphResult> {
    const {communities} = await api.communities(datasetId, options.signal);
    if (communities.length === 0) {
        return {graph: seed, complete: false, clipped: []};
    }

    const nodes = new Map<string, GraphNode>();
    const edges = new Map<string, GraphEdge>();
    for (const node of seed.nodes) {
        nodes.set(node.id, node);
    }
    for (const edge of seed.edges) {
        edges.set(edge.id, edge);
    }

    const batches = batchCommunities(communities);
    const clipped: string[] = [];
    let complete = true;

    for (let index = 0; index < batches.length; index++) {
        if (nodes.size >= options.budget) {
            complete = false;
            break;
        }

        const batch = batches[index];
        const query: GraphQuery = {
            limit: REQUEST_LIMIT,
            community_ids: batch.map((community) => community.id),
            include_communities: false,
        };

        const page = await api.graph(datasetId, query, options.signal);
        for (const node of page.nodes) {
            nodes.set(node.id, node);
        }
        for (const edge of page.edges) {
            edges.set(edge.id, edge);
        }

        const wanted = batch.reduce((sum, community) => sum + community.size, 0);
        if (page.meta.returned_nodes < Math.min(wanted, REQUEST_LIMIT)) {
            clipped.push(...batch.map((community) => community.id));
        }

        options.onProgress?.({ratio: (index + 1) / batches.length, nodes: nodes.size});
    }

    const merged: GraphResponse = {
        nodes: [...nodes.values()],
        edges: [...edges.values()],
        communities,
        meta: {
            ...seed.meta,
            returned_nodes: nodes.size,
            returned_edges: edges.size,
        },
    };

    return {graph: merged, complete, clipped};
}
