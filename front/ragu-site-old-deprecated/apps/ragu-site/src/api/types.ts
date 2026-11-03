/**
 * Mirrors `RAGU Web API Gateway` 0.1.0 (`/openapi.json`).
 * Kept hand-written and narrow: this app only reads, it never indexes.
 */

export type Locale = 'ru' | 'en';
export type Engine = 'local' | 'global' | 'naive' | 'mix' | 'query_plan';

export type DatasetStats = {
    nodes: number;
    edges: number;
    communities: number;
    chunks: number;
    documents: number;
};

export type DatasetBadge = {label: string; value: string};

export type DatasetPreview = {
    kind?: 'graph';
    node_count: number;
    edge_count: number;
    primary_entity_types?: string[];
};

export type DatasetCard = {
    id: string;
    title: string;
    domain: string;
    description: string;
    language: 'ru' | 'en' | 'mixed';
    tags?: string[];
    stats: DatasetStats;
    badges?: DatasetBadge[];
    preview: DatasetPreview;
    suggested_questions?: string[];
};

export type DatasetDetail = DatasetCard & {
    default_engine?: Engine;
    available_engines?: Engine[];
    created_at: string;
    updated_at: string;
};

export type GraphNode = {
    id: string;
    label: string;
    entity_type: string;
    description: string;
    degree: number;
    community_id?: string | null;
    x: number;
    y: number;
    source_chunk_ids?: string[];
};

export type GraphEdge = {
    id: string;
    source: string;
    target: string;
    relation_type: string;
    description: string;
    strength: number;
    source_chunk_ids?: string[];
};

export type CommunitySummary = {
    id: string;
    title: string;
    summary: string;
    level: number;
    size: number;
    node_ids?: string[];
};

export type GraphMeta = {
    dataset_id: string;
    total_nodes: number;
    total_edges: number;
    returned_nodes: number;
    returned_edges: number;
    limit: number;
    filters: {
        search?: string | null;
        entity_types?: string[] | null;
        community_ids?: string[] | null;
        min_strength?: number;
    };
};

export type GraphResponse = {
    nodes: GraphNode[];
    edges: GraphEdge[];
    communities?: CommunitySummary[];
    meta: GraphMeta;
};

export type GraphCommunitiesResponse = {dataset_id: string; communities: CommunitySummary[]};

export type NodeRelation = GraphEdge & {
    direction: 'incoming' | 'outgoing';
    other_node_id: string;
    other_node_label: string;
};

export type ProvenanceChunk = {
    id: string;
    content: string;
    doc_id: string;
    chunk_order_idx: number;
};

export type NodeDetailResponse = {
    node: GraphNode;
    incoming_relations?: NodeRelation[];
    outgoing_relations?: NodeRelation[];
    provenance_chunks?: ProvenanceChunk[];
};

export type ChatMessage = {role: 'user' | 'assistant'; content: string};

export type TraceEntity = {id: string; label: string; entity_type: string; score: number};
export type TraceRelation = {id: string; source: string; target: string; relation_type: string; strength: number};
export type TraceChunk = {id: string; content: string; doc_id: string; score: number};
export type TraceCommunity = {id: string; title: string; summary: string; score: number};
export type TraceTimings = {retrieval_ms: number; generation_ms: number; total_ms: number};
export type TraceEnergy = {watt_hours: number; estimated?: boolean; formula?: string};
export type GraphHighlight = {node_ids?: string[]; edge_ids?: string[]; community_ids?: string[]};

export type AnswerTrace = {
    engine: 'local' | 'naive' | 'mix' | 'keyword';
    top_k: number;
    rerank: boolean;
    query_plan?: {used: boolean; sub_questions?: string[]} | null;
    entities?: TraceEntity[];
    relations?: TraceRelation[];
    chunks?: TraceChunk[];
    communities?: TraceCommunity[];
    timings: TraceTimings;
    energy: TraceEnergy;
    highlight: GraphHighlight;
};

export type AssistantMessage = {
    id: string;
    role?: 'assistant';
    content: string;
    created_at: string;
    trace?: AnswerTrace | null;
};

export type AgentRequest = {
    message: string;
    history?: ChatMessage[];
    engine?: Engine;
    use_query_plan?: boolean;
    top_k?: number;
    rerank?: boolean;
    include_trace?: boolean;
    locale?: Locale;
};

export type AgentResponse = {message: AssistantMessage};

export type SuggestionsResponse = {dataset_id: string; suggestions: string[]};

export type CapabilitiesResponse = {
    preindexed_datasets: boolean;
    graph_explorer: boolean;
    agent_chat: boolean;
    upload_document: boolean;
    upload_index: boolean;
    live_indexing: boolean;
    job_queue: boolean;
    gpu_worker: boolean;
};
