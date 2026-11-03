namespace $ {

	export type $raggu_web_front_graph_count = { name: string, count: number }

	export type $raggu_web_front_graph_model = {
		nodes: $raggu_web_front_graph_node[]
		edges: $raggu_web_front_graph_edge[]
		index_of: Map< string, number >
		edge_index_of: Map< string, number >
		adj_offset: Uint32Array
		adj_node: Uint32Array
		adj_edge: Uint32Array
		edge_source: Uint32Array
		edge_target: Uint32Array
		edge_strength: Float32Array
		x: Float32Array
		y: Float32Array
		degree: Float32Array
		community: Int32Array
		communities: $raggu_web_front_graph_community[]
		max_degree: number
		types: $raggu_web_front_graph_count[]
		meta: $raggu_web_front_graph_meta
	}

	function tally( values: string[] ) {
		const counts = new Map< string, number >()
		for( const value of values ) counts.set( value, ( counts.get( value ) ?? 0 ) + 1 )
		return [ ... counts ]
			.map( ( [ name, count ] ) => ( { name, count } ) )
			.sort( ( a, b ) => b.count - a.count || a.name.localeCompare( b.name ) )
	}

	function hash_community( id: string ) {
		let h = 2166136261
		for( let i = 0; i < id.length; i++ ) {
			h ^= id.charCodeAt( i )
			h = Math.imul( h, 16777619 )
		}
		return ( h >>> 0 ) % 4096
	}

	export function $raggu_web_front_graph_build( response: $raggu_web_front_graph_response ): $raggu_web_front_graph_model {

		const nodes = response.nodes
		const n = nodes.length

		const index_of = new Map< string, number >()
		for( let i = 0; i < n; i++ ) index_of.set( nodes[ i ].id, i )

		const edges: $raggu_web_front_graph_edge[] = []
		for( const edge of response.edges ) {
			if( index_of.has( edge.source ) && index_of.has( edge.target ) && edge.source !== edge.target ) edges.push( edge )
		}
		const m = edges.length

		const edge_index_of = new Map< string, number >()
		const edge_source = new Uint32Array( m )
		const edge_target = new Uint32Array( m )
		const edge_strength = new Float32Array( m )

		for( let e = 0; e < m; e++ ) {
			const edge = edges[ e ]
			edge_index_of.set( edge.id, e )
			edge_source[ e ] = index_of.get( edge.source ) ?? 0
			edge_target[ e ] = index_of.get( edge.target ) ?? 0
			edge_strength[ e ] = Number.isFinite( edge.strength ) ? edge.strength : 0.5
		}

		const x = new Float32Array( n )
		const y = new Float32Array( n )
		const degree = new Float32Array( n )
		const community = new Int32Array( n ).fill( -1 )

		const communities = response.communities ?? []
		const community_index_of = new Map< string, number >()
		communities.forEach( ( item, index ) => community_index_of.set( item.id, index ) )

		let max_degree = 1
		for( let i = 0; i < n; i++ ) {
			const node = nodes[ i ]
			x[ i ] = node.x
			y[ i ] = node.y
			degree[ i ] = node.degree
			max_degree = Math.max( max_degree, node.degree )
			const cid = node.community_id
			if( cid ) community[ i ] = community_index_of.get( cid ) ?? hash_community( cid )
		}

		const adj_offset = new Uint32Array( n + 1 )
		for( let e = 0; e < m; e++ ) {
			adj_offset[ edge_source[ e ] + 1 ] += 1
			adj_offset[ edge_target[ e ] + 1 ] += 1
		}
		for( let i = 0; i < n; i++ ) adj_offset[ i + 1 ] += adj_offset[ i ]

		const cursor = Uint32Array.from( adj_offset.subarray( 0, n ) )
		const adj_node = new Uint32Array( m * 2 )
		const adj_edge = new Uint32Array( m * 2 )

		for( let e = 0; e < m; e++ ) {
			const a = edge_source[ e ]
			const b = edge_target[ e ]
			adj_node[ cursor[ a ] ] = b
			adj_edge[ cursor[ a ] ] = e
			cursor[ a ] += 1
			adj_node[ cursor[ b ] ] = a
			adj_edge[ cursor[ b ] ] = e
			cursor[ b ] += 1
		}

		return {
			nodes,
			edges,
			index_of,
			edge_index_of,
			adj_offset,
			adj_node,
			adj_edge,
			edge_source,
			edge_target,
			edge_strength,
			x,
			y,
			degree,
			community,
			communities,
			max_degree,
			types: tally( nodes.map( node => node.entity_type ) ),
			meta: response.meta,
		}

	}

	export function $raggu_web_front_graph_hash01( value: number ) {
		let h = value | 0
		h = Math.imul( h ^ ( h >>> 16 ), 0x45d9f3b )
		h = Math.imul( h ^ ( h >>> 16 ), 0x45d9f3b )
		h = ( h ^ ( h >>> 16 ) ) >>> 0
		return h / 4294967296
	}

}
