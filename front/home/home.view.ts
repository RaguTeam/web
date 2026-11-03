namespace $.$$ {

	export class $raggu_web_front_home extends $.$raggu_web_front_home {

		datasets_state() {
			return $raggu_web_front_data_state( ()=> $raggu_web_front_data.datasets_now() )
		}

		datasets() {
			return this.datasets_state().value
		}

		pending() {
			return this.datasets_state().pending
		}

		@ $mol_mem
		totals() {
			const data = this.datasets()
			if( !data ) return null
			return data.reduce(
				( sum, item ) => ( {
					nodes: sum.nodes + item.stats.nodes,
					edges: sum.edges + item.stats.edges,
					communities: sum.communities + item.stats.communities,
					chunks: sum.chunks + item.stats.chunks,
				} ),
				{ nodes: 0, edges: 0, communities: 0, chunks: 0 },
			)
		}

		total( key: 'nodes' | 'edges' | 'communities' | 'chunks' ) {
			const totals = this.totals()
			return totals ? $raggu_web_front_lib_full( totals[ key ] ) : '—'
		}

		total_nodes() { return this.total( 'nodes' ) }
		total_edges() { return this.total( 'edges' ) }
		total_communities() { return this.total( 'communities' ) }
		total_chunks() { return this.total( 'chunks' ) }

		corpora_count() {
			return `${ this.datasets()?.length ?? 3 } ${ this.corpora_word() }`
		}

		badge_list() {
			return this.datasets()?.[ 0 ]?.badges ?? []
		}

		badges() {
			const list = this.badge_list()
			return list.length ? list.map( ( _, index ) => this.Badge( index ) ) : []
		}

		badge_label( index: number ) {
			return this.badge_list()[ index ].label
		}

		badge_value( index: number ) {
			return this.badge_list()[ index ].value
		}

		to_pipeline() {
			this.$.$mol_dom_context.document.getElementById( 'pipeline' )?.scrollIntoView( { behavior: 'smooth', block: 'start' } )
		}

		pipeline() {
			const text = this.Pipeline_text()
			return [
				{ ordinal: '01', name: text.step_1_name(), detail: text.step_1_detail(), output: text.step_1_output() },
				{ ordinal: '02', name: text.step_2_name(), detail: text.step_2_detail(), output: text.step_2_output() },
				{ ordinal: '03', name: text.step_3_name(), detail: text.step_3_detail(), output: text.step_3_output() },
				{ ordinal: '04', name: text.step_4_name(), detail: text.step_4_detail(), output: text.step_4_output() },
			]
		}

		steps() {
			return this.pipeline().map( ( _, index ) => this.Step( index ) )
		}

		step_delay( index: number ) {
			return index * 70
		}

		step_rail( index: number ) {
			const last = index === this.pipeline().length - 1
			return [
				this.Step_dot( index ),
				this.Step_ordinal( index ),
				this.Step_line( index ),
				... last ? [] : [ this.Step_arrow( index ) ],
			]
		}

		step_ordinal( index: number ) { return this.pipeline()[ index ].ordinal }
		step_name( index: number ) { return this.pipeline()[ index ].name }
		step_detail( index: number ) { return this.pipeline()[ index ].detail }
		step_output( index: number ) { return this.pipeline()[ index ].output }

		@ $mol_mem
		sorted() {
			const data = this.datasets()
			return data ? [ ... data ].sort( ( a, b ) => b.stats.nodes - a.stats.nodes ) : null
		}

		corpora() {
			const state = this.datasets_state()
			if( state.error ) return [ this.Error() ]
			const sorted = this.sorted()
			if( !sorted ) return [ 0, 1, 2 ].map( index => this.Card_skeleton( index ) )
			return sorted.map( ( _, index ) => this.Card( index ) )
		}

		card_dataset( index: number ) {
			return this.sorted()![ index ] as never
		}

		card_featured( index: number ) {
			return index === 0
		}

		card_delay( index: number ) {
			return index * 80
		}

		card_skeleton_featured( index: number ) {
			return index === 0
		}

		retry() {
			$raggu_web_front_data.retry()
		}

	}

	export class $raggu_web_front_home_metric extends $.$raggu_web_front_home_metric {

		value_content() {
			return this.pending() ? [ this.Skeleton() ] : [ this.value() ]
		}

	}

}
