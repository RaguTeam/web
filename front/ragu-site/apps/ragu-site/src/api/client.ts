import type {
    AgentRequest,
    AgentResponse,
    CapabilitiesResponse,
    DatasetCard,
    DatasetDetail,
    GraphCommunitiesResponse,
    GraphResponse,
    Locale,
    NodeDetailResponse,
    SuggestionsResponse,
} from './types.ts';

const BASE = (import.meta.env.VITE_RAGU_API as string | undefined)?.replace(/\/$/, '') ?? 'https://ragu-back.duckdns.org';

export class ApiError extends Error {
    readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

type Query = Record<string, string | number | boolean | string[] | undefined | null>;

function url(path: string, query?: Query): string {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(query ?? {})) {
        if (value === undefined || value === null) {
            continue;
        }
        if (Array.isArray(value)) {
            for (const item of value) {
                search.append(key, item);
            }
        }
        else {
            search.set(key, String(value));
        }
    }
    const qs = search.toString();
    return `${BASE}/api/v1${path}${qs ? `?${qs}` : ''}`;
}

async function request<T>(input: string, init?: RequestInit): Promise<T> {
    let response: Response;
    try {
        response = await fetch(input, {...init, headers: {accept: 'application/json', ...init?.headers}});
    }
    catch (cause) {
        if (cause instanceof DOMException && cause.name === 'AbortError') {
            throw cause;
        }
        throw new ApiError(0, 'network unreachable');
    }

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new ApiError(response.status, body.slice(0, 240) || response.statusText);
    }
    return (await response.json()) as T;
}

export type GraphQuery = {
    limit?: number;
    search?: string;
    entity_types?: string[];
    community_ids?: string[];
    min_strength?: number;
    include_communities?: boolean;
};

export const api = {
    capabilities: (signal?: AbortSignal) => request<CapabilitiesResponse>(url('/capabilities'), {signal}),

    datasets: (locale: Locale, signal?: AbortSignal) =>
        request<DatasetCard[]>(url('/datasets', {locale}), {signal}),

    dataset: (id: string, locale: Locale, signal?: AbortSignal) =>
        request<DatasetDetail>(url(`/datasets/${encodeURIComponent(id)}`, {locale}), {signal}),

    graph: (id: string, query: GraphQuery, signal?: AbortSignal) =>
        request<GraphResponse>(url(`/datasets/${encodeURIComponent(id)}/graph`, query), {signal}),

    communities: (id: string, signal?: AbortSignal) =>
        request<GraphCommunitiesResponse>(url(`/datasets/${encodeURIComponent(id)}/graph/communities`), {signal}),

    node: (id: string, nodeId: string, signal?: AbortSignal) =>
        request<NodeDetailResponse>(
            url(`/datasets/${encodeURIComponent(id)}/graph/nodes/${encodeURIComponent(nodeId)}`),
            {signal},
        ),

    suggestions: (id: string, locale: Locale, signal?: AbortSignal) =>
        request<SuggestionsResponse>(
            url(`/datasets/${encodeURIComponent(id)}/agent/suggestions`, {locale}),
            {signal},
        ),

    ask: (id: string, body: AgentRequest, signal?: AbortSignal) =>
        request<AgentResponse>(url(`/datasets/${encodeURIComponent(id)}/agent/messages`), {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(body),
            signal,
        }),
};

export {BASE as API_BASE};
