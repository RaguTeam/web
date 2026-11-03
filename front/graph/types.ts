namespace $ {

	export type $raggu_web_front_graph_node = {
		id: string
		label: string
		entity_type: string
		description: string
		degree: number
		community_id?: string | null
		x: number
		y: number
		source_chunk_ids?: string[]
	}

	export type $raggu_web_front_graph_edge = {
		id: string
		source: string
		target: string
		relation_type: string
		description: string
		strength: number
		source_chunk_ids?: string[]
	}

	export type $raggu_web_front_graph_community = {
		id: string
		title: string
		summary: string
		level: number
		size: number
		node_ids?: string[]
	}

	export type $raggu_web_front_graph_meta = {
		dataset_id: string
		total_nodes: number
		total_edges: number
		returned_nodes: number
		returned_edges: number
		limit: number
	}

	export type $raggu_web_front_graph_response = {
		nodes: $raggu_web_front_graph_node[]
		edges: $raggu_web_front_graph_edge[]
		communities?: $raggu_web_front_graph_community[]
		meta: $raggu_web_front_graph_meta
	}

	export type $raggu_web_front_graph_relation = $raggu_web_front_graph_edge & {
		direction: 'incoming' | 'outgoing'
		other_node_id: string
		other_node_label: string
	}

	export type $raggu_web_front_graph_chunk = {
		id: string
		content: string
		doc_id: string
		chunk_order_idx: number
	}

	export type $raggu_web_front_graph_detail = {
		node: $raggu_web_front_graph_node
		incoming_relations?: $raggu_web_front_graph_relation[]
		outgoing_relations?: $raggu_web_front_graph_relation[]
		provenance_chunks?: $raggu_web_front_graph_chunk[]
	}

	export type $raggu_web_front_graph_dataset = {
		id: string
		title: string
		domain: string
		description: string
		language: string
		tags?: string[]
		stats: { nodes: number, edges: number, communities: number, chunks: number, documents: number }
		badges?: { label: string, value: string }[]
		preview: { node_count: number, edge_count: number, primary_entity_types?: string[] }
		suggested_questions?: string[]
	}

	export type $raggu_web_front_graph_trace = {
		engine: string
		top_k: number
		rerank: boolean
		query_plan?: { used: boolean, sub_questions?: string[] } | null
		entities?: { id: string, label: string, entity_type: string, score: number }[]
		relations?: { id: string, source: string, target: string, relation_type: string, strength: number }[]
		chunks?: { id: string, content: string, doc_id: string, score: number }[]
		communities?: { id: string, title: string, summary: string, score: number }[]
		timings: { retrieval_ms: number, generation_ms: number, total_ms: number }
		energy: { watt_hours: number, estimated?: boolean }
		highlight: { node_ids?: string[], edge_ids?: string[], community_ids?: string[] }
	}

	export type $raggu_web_front_graph_answer = {
		message: {
			id: string
			content: string
			created_at: string
			trace?: $raggu_web_front_graph_trace | null
		}
	}

}
