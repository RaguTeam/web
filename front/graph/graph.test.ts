namespace $ {

	function sample(): $raggu_web_front_graph_response {
		const nodes = Array.from( { length: 40 }, ( _, i ) => ( {
			id: `ent-${ i }`,
			label: `Node ${ i }`,
			entity_type: i % 3 ? 'DISEASE' : 'GENE',
			description: '',
			degree: i % 5,
			community_id: `c${ i % 4 }`,
			x: Math.cos( i ),
			y: Math.sin( i ),
		} ) )
		const edges = Array.from( { length: 60 }, ( _, i ) => ( {
			id: `rel-${ i }`,
			source: `ent-${ i % 40 }`,
			target: `ent-${ ( i * 7 + 3 ) % 40 }`,
			relation_type: 'RELATED_TO',
			description: '',
			strength: 0.5,
		} ) )
		edges.push( { id: 'rel-out', source: 'ent-1', target: 'ent-missing', relation_type: 'X', description: '', strength: 1 } )
		return {
			nodes,
			edges,
			meta: { dataset_id: 'test', total_nodes: 40, total_edges: 61, returned_nodes: 40, returned_edges: 61, limit: 40 },
		}
	}

	$mol_test({

		'model drops edges that leave the slice and builds adjacency'() {
			const model = $raggu_web_front_graph_build( sample() )
			$mol_assert_equal( model.edges.some( edge => edge.id === 'rel-out' ), false )
			$mol_assert_equal( model.adj_offset[ model.nodes.length ], model.edges.length * 2 )
			$mol_assert_equal( model.types[ 0 ].name, 'DISEASE' )
		},

		'layout is deterministic and fills the radius'() {
			const model = $raggu_web_front_graph_build( sample() )
			const input = { ... model, iterations: 40, radius: 3.2 }
			const first = $raggu_web_front_graph_layout_solve( input )
			const second = $raggu_web_front_graph_layout_solve( input )
			$mol_assert_equal( Array.from( first ), Array.from( second ) )

			const radii = [] as number[]
			for( let i = 0; i < first.length; i += 3 ) radii.push( Math.hypot( first[ i ], first[ i + 1 ], first[ i + 2 ] ) )
			radii.sort( ( a, b ) => a - b )
			$mol_assert_equal( Math.round( radii[ Math.floor( radii.length * 0.88 ) ] * 10 ), 32 )
		},

	})

}
