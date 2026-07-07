namespace $.$$ {

	type GraphNode = $bog_norweb_front_explorer_forcegraph_node
	type GraphEdge = $bog_norweb_front_explorer_forcegraph_edge

	// Default page size for the graph endpoint. The mock backend caps at 5000.
	const GRAPH_LIMIT = 500

	// Module-scoped cache keyed by dataset_id. Survives component remount:
	// switching tabs drops the @$mol_mem cell's subscribers and resets it, so
	// without this every return to the graph re-fetches and re-runs the layout.
	const $bog_norweb_front_explorer_graph_cache = new Map< string, { nodes: GraphNode[], edges: GraphEdge[] } >()

	export class $bog_norweb_front_explorer extends $.$bog_norweb_front_explorer {

		// URL flag `?mock=1` forces the built-in PRNG mock — used for offline demo
		// and jsdom tests where no live backend is available.
		mock_flag(): boolean {
			return this.$.$mol_state_arg.value( 'mock' ) === '1'
		}

		// Reactive live fetch. While loading, the wire promise is rethrown as
		// usual; a real transport error falls back to the built-in mock graph
		// so the demo stays alive without the backend.
		@$mol_mem
		graph_remote(): { nodes: GraphNode[], edges: GraphEdge[] } | null {
			const id = this.dataset_id()
			if ( !id ) return null
			if ( this.mock_flag() ) return null
			// Возврат на вкладку не должен снова дёргать бэк — отдаём тот же объект,
			// стабильная identity сохраняет раскладку графа.
			const cached = $bog_norweb_front_explorer_graph_cache.get( id )
			if ( cached ) return cached
			try {
				const res = this.$.$bog_norweb_front_api(
					$bog_norweb_front_api_ragu_get_graph,
					{ params: { dataset_id: id }, query: { limit: GRAPH_LIMIT } },
				)
				const nodes: GraphNode[] = res.nodes.map( (n: any) => ( {
					id: n.id,
					label: n.label,
					type: n.entity_type ?? '',
					degree: n.degree,
					x: n.x,
					y: n.y,
				} ) )
				const edges: GraphEdge[] = res.edges.map( (e: any) => ( {
					id: e.id,
					source: e.source,
					target: e.target,
					strength: e.strength,
					relation: e.relation_type,
				} ) )
				const result = { nodes, edges }
				$bog_norweb_front_explorer_graph_cache.set( id, result )
				return result
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				console.warn( 'Graph fetch failed, falling back to mock:', error )
				return null
			}
		}

		// Показываем юзеру плашку, что перед ним мок-граф, а не данные с бэка.
		is_mock() {
			return this.graph_remote() === null
		}

		// Легенда строится из фактических типов графа (топ по количеству узлов),
		// а не из фиксированного NEREL-набора — схемы разных доменов различаются.
		@$mol_mem
		legend_entries(): Array< { type: string, count: number } > {
			const counts: Record< string, number > = {}
			for( const n of this.graph_nodes() ) {
				counts[ n.type ] = ( counts[ n.type ] ?? 0 ) + 1
			}
			return Object.entries( counts )
				.map( ( [ type, count ] ) => ( { type, count } ) )
				.sort( ( a, b ) => b.count - a.count )
				.slice( 0, 12 )
		}

		legend_rows() {
			return this.legend_entries().map( ( _, i ) => this.Legend_row( i ) )
		}

		legend_label( i: number ) {
			return this.legend_entries()[ i ]?.type ?? ''
		}
		legend_count( i: number ) {
			return String( this.legend_entries()[ i ]?.count ?? '' )
		}
		legend_active( i: number ) {
			return this.type_filter() === this.legend_entries()[ i ]?.type
		}

		// Цвет точки легенды = цвет узлов этого типа. Style override, т.к. цвет
		// вычисляется рантайм-функцией, не токеном.
		Legend_dot( i: number ) {
			const dot = super.Legend_dot( i )
			const type = this.legend_entries()[ i ]?.type ?? ''
			dot.style = () => ( {
				background: $bog_norweb_front_explorer_forcegraph_type_color( type ),
			} )
			return dot
		}

		// Клик по типу подсвечивает все узлы этого типа (как поиск).
		// Повторный клик по активному типу снимает фильтр.
		@$mol_action
		legend_click( i: number ) {
			const t = this.legend_entries()[ i ]?.type ?? ''
			this.type_filter( this.type_filter() === t ? '' : t )
			return null
		}

		@$mol_mem
		graph_data(): { nodes: readonly GraphNode[], edges: readonly GraphEdge[] } {
			return this.graph_remote()
				?? $bog_norweb_front_explorer_forcegraph_build_mock( 42, 80, 130 )
		}

		graph_nodes(): readonly GraphNode[] { return this.graph_data().nodes }
		graph_edges(): readonly GraphEdge[] { return this.graph_data().edges }

		// Cast to extended class to access TS-only methods (selected_node/selected_color/...)
		graph_view() {
			return this.Graph() as $.$$.$bog_norweb_front_explorer_forcegraph
		}

		// Selected node, mirrors $bog_norweb_front_explorer_forcegraph internals
		selected() {
			return this.graph_view().selected_node()
		}

		// Aside text — fall back to placeholder when nothing selected
		entity_name() {
			return this.selected()?.label ?? this.aside_empty_text()
		}

		entity_type() {
			return this.selected()?.type ?? ''
		}

		entity_desc() {
			const n = this.selected()
			if ( !n ) return ''
			return `Mock entity of type ${ n.type }, connected to ${ n.degree } other nodes.`
		}

		relations_title() {
			const n = this.selected()
			if ( !n ) return ''
			return this.relations_title_template().replace( '%s', String( n.degree ) )
		}

		rels(): Array< { relation: string, target_label: string } > {
			return this.graph_view().selected_relations().slice( 0, 5 )
		}

		rel_rows() {
			return this.rels().map( ( _, i ) => this.Rel( i ) )
		}

		rel_type( i: number ) { return this.rels()[ i ]?.relation ?? '' }
		rel_target( i: number ) { return this.rels()[ i ]?.target_label ?? '' }

		// Entity_dot color reflects type of selected node
		Entity_dot() {
			const dot = super.Entity_dot()
			dot.style = () => ( {
				background: this.graph_view().selected_color(),
			} )
			return dot
		}

	}

}
