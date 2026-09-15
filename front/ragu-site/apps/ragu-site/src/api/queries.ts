import {keepPreviousData, queryOptions} from '@tanstack/react-query';
import {api, type GraphQuery} from './client.ts';
import type {Locale} from './types.ts';

const HOUR = 60 * 60 * 1000;

export const queries = {
    datasets: (locale: Locale) =>
        queryOptions({
            queryKey: ['datasets', locale] as const,
            queryFn: ({signal}) => api.datasets(locale, signal),
            staleTime: HOUR,
        }),

    dataset: (id: string, locale: Locale) =>
        queryOptions({
            queryKey: ['dataset', id, locale] as const,
            queryFn: ({signal}) => api.dataset(id, locale, signal),
            staleTime: HOUR,
        }),

    graph: (id: string, query: GraphQuery) =>
        queryOptions({
            queryKey: ['graph', id, query] as const,
            queryFn: ({signal}) => api.graph(id, query, signal),
            // Indexes are frozen on this deployment: a fetched graph never goes stale.
            staleTime: Infinity,
            gcTime: 6 * HOUR,
            // Asking for more entities must not blank the cloud and its counters
            // on the way; the old slice stays until the bigger one lands.
            placeholderData: keepPreviousData,
        }),

    node: (id: string, nodeId: string) =>
        queryOptions({
            queryKey: ['node', id, nodeId] as const,
            queryFn: ({signal}) => api.node(id, nodeId, signal),
            staleTime: Infinity,
        }),

    suggestions: (id: string, locale: Locale) =>
        queryOptions({
            queryKey: ['suggestions', id, locale] as const,
            queryFn: ({signal}) => api.suggestions(id, locale, signal),
            staleTime: HOUR,
        }),
};
