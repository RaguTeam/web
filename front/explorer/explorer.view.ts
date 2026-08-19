namespace $.$$ {

	type GraphNode = $raggu_web_front_explorer_forcegraph_node
	type GraphEdge = $raggu_web_front_explorer_forcegraph_edge

	// Default page size for the graph endpoint.
	const GRAPH_LIMIT = 500

	// Сводка выборки из GraphResponse.meta — источник цифр для плашки лимита.
	type GraphMeta = { total_nodes: number, returned_nodes: number, limit: number }

	// Module-scoped cache keyed by dataset_id. Survives component remount:
	// switching tabs drops the @$mol_mem cell's subscribers and resets it, so
	// without this every return to the graph re-fetches and re-runs the layout.
	const $raggu_web_front_explorer_graph_cache = new Map< string, { nodes: GraphNode[], edges: GraphEdge[], meta: GraphMeta | null } >()

	// Потолок бэка: get_graph валидирует limit <= 5000 и отвечает 422 выше.
	// Кнопка «показать больше» упирается в него; URL-арг `limit` — нет,
	// чтобы можно было проверить поднятый лимит без пересборки фронта.
	const GRAPH_LIMIT_MAX = 5000

	export class $raggu_web_front_explorer extends $.$raggu_web_front_explorer {

		// URL flag `?mock=1` forces the built-in PRNG mock — used for offline demo
		// and jsdom tests where no live backend is available.
		mock_flag(): boolean {
			return this.$.$mol_state_arg.value( 'mock' ) === '1'
		}

		// Размер выборки графа — URL-арг `limit` (например #!limit=5000).
		// По умолчанию 500: SVG на тысячах узлов заметно тяжелеет.
		// Пишется кнопкой «показать больше» на плашке лимита; при значении
		// по умолчанию арг убирается из URL, чтобы ссылка оставалась чистой.
		// Чтение сверху НЕ ограничиваем: сейчас бэк режет на 5000 (422), но лимит
		// там собираются поднимать — фронт должен позволять это проверить.
		@$mol_mem
		graph_limit( next?: number ): number {
			const arg = this.$.$mol_state_arg
			if ( next !== undefined ) {
				arg.value( 'limit', next === GRAPH_LIMIT ? null : String( next ) )
				return next
			}
			const raw = Number( arg.value( 'limit' ) ?? '' )
			if ( !Number.isFinite( raw ) || raw <= 0 ) return GRAPH_LIMIT
			return Math.round( raw )
		}

		// Ключ кэшей графа и раскладки: датасет + лимит выборки
		graph_key() {
			return `${ this.dataset_id() }:${ this.graph_limit() }`
		}

		// Reactive live fetch. While loading, the wire promise is rethrown as
		// usual; a real transport error falls back to the built-in mock graph
		// so the demo stays alive without the backend.
		@$mol_mem
		graph_remote(): { nodes: GraphNode[], edges: GraphEdge[], meta: GraphMeta | null } | null {
			const id = this.dataset_id()
			if ( !id ) return null
			if ( this.mock_flag() ) return null
			// Возврат на вкладку не должен снова дёргать бэк — отдаём тот же объект,
			// стабильная identity сохраняет раскладку графа.
			const key = this.graph_key()
			const cached = $raggu_web_front_explorer_graph_cache.get( key )
			if ( cached ) return cached
			try {
				const res = this.$.$raggu_web_front_api(
					$raggu_web_front_api_ragu_get_graph,
					{ params: { dataset_id: id }, query: { limit: this.graph_limit() } },
				)
				const nodes: GraphNode[] = res.nodes.map( (n: any) => ( {
					id: n.id,
					label: n.label,
					type: n.entity_type ?? '',
					degree: n.degree,
					x: n.x,
					y: n.y,
					community: n.community_id ?? '',
					description: n.description ?? '',
				} ) )
				const edges: GraphEdge[] = res.edges.map( (e: any) => ( {
					id: e.id,
					source: e.source,
					target: e.target,
					strength: e.strength,
					relation: e.relation_type,
					description: e.description ?? '',
				} ) )
				const m = ( res as any ).meta
				const meta: GraphMeta | null = m ? {
					total_nodes: m.total_nodes,
					returned_nodes: m.returned_nodes,
					limit: m.limit,
				} : null
				const result = { nodes, edges, meta }
				$raggu_web_front_explorer_graph_cache.set( key, result )
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

		// Легенда строится из фактических типов графа (все, по убыванию),
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
				background: $raggu_web_front_explorer_forcegraph_type_color( type ),
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

		// Легенда типов связей — симметрична легенде сущностей, но по рёбрам.
		@$mol_mem
		rel_entries(): Array< { type: string, count: number } > {
			const counts: Record< string, number > = {}
			for( const e of this.graph_edges() ) {
				counts[ e.relation ] = ( counts[ e.relation ] ?? 0 ) + 1
			}
			return Object.entries( counts )
				.map( ( [ type, count ] ) => ( { type, count } ) )
				.sort( ( a, b ) => b.count - a.count )
		}

		rel_legend_rows() {
			return this.rel_entries().map( ( _, i ) => this.Rel_row( i ) )
		}

		rel_legend_label( i: number ) {
			return this.rel_entries()[ i ]?.type ?? ''
		}
		rel_legend_count( i: number ) {
			return String( this.rel_entries()[ i ]?.count ?? '' )
		}

		// Тип отношения наведённого/выбранного ребра — подсвечиваем его строку
		active_relation() {
			return this.graph_view().active_edge()?.relation ?? ''
		}
		rel_legend_active( i: number ) {
			const t = this.rel_entries()[ i ]?.type ?? ''
			return this.rel_filter() === t || this.active_relation() === t
		}

		@$mol_action
		rel_legend_click( i: number ) {
			const t = this.rel_entries()[ i ]?.type ?? ''
			this.rel_filter( this.rel_filter() === t ? '' : t )
			return null
		}

		// --- Сообщества: выпадашка с чекбоксами возле поиска ---

		// Список с бэка (get_communities); для мока/фолбэка группируем узлы
		// по community. Иерархию Leiden режем до самого крупного уровня.
		@$mol_mem
		communities(): Array< { id: string, title: string, size: number } > {
			const ds = this.dataset_id()
			if ( ds && !this.mock_flag() ) {
				try {
					const res = this.$.$raggu_web_front_api(
						$raggu_web_front_api_ragu_get_communities,
						{ params: { dataset_id: ds } },
					)
					const all = res.communities ?? []
					if ( all.length ) {
						const top = Math.min( ... all.map( ( c: any ) => c.level ?? 0 ) )
						return all
							.filter( ( c: any ) => ( c.level ?? 0 ) === top )
							.map( ( c: any ) => ( { id: c.id, title: c.title || c.id, size: c.size ?? 0 } ) )
							.sort( ( a: any, b: any ) => b.size - a.size )
					}
				} catch( error ) {
					if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				}
			}
			const counts: Record< string, number > = {}
			for ( const n of this.graph_nodes() ) {
				const c = n.community ?? ''
				if ( !c ) continue
				counts[ c ] = ( counts[ c ] ?? 0 ) + 1
			}
			return Object.entries( counts )
				.map( ( [ id, size ] ) => ( { id, title: id, size } ) )
				.sort( ( a, b ) => b.size - a.size )
		}

		// Каждому сообществу свой цвет — по порядку в списке
		@$mol_mem
		comm_color_map(): Record< string, string > {
			const m: Record< string, string > = {}
			this.communities().forEach( ( c, i ) => {
				m[ c.id ] = $raggu_web_front_explorer_forcegraph_index_color( i )
			} )
			return m
		}

		@$mol_mem
		comms_selected( next?: readonly string[] ): readonly string[] {
			return next ?? []
		}

		// Пересечение выбора с текущим списком: смена датасета не тащит чужой
		// выбор (id сообществ у датасетов разные — фильтр гасил бы весь граф)
		@$mol_mem
		comms_checked(): readonly string[] {
			const ids = new Set( this.communities().map( c => c.id ) )
			return this.comms_selected().filter( id => ids.has( id ) )
		}

		comm_rows() {
			return this.communities().map( ( _, i ) => this.Comm_row( i ) )
		}
		comm_label( i: number ) { return this.communities()[ i ]?.title ?? '' }

		// Сколько вершин сообщества реально попало в выборку графа (limit!)
		@$mol_mem
		comm_visible_counts(): Record< string, number > {
			const m: Record< string, number > = {}
			for ( const n of this.graph_nodes() ) {
				const c = n.community ?? ''
				if ( !c ) continue
				m[ c ] = ( m[ c ] ?? 0 ) + 1
			}
			return m
		}

		// «видимых / всего»: size с бэка — по всему датасету, а канва держит
		// только limit-выборку, иначе число не сходится с подсветкой
		comm_count( i: number ) {
			const c = this.communities()[ i ]
			if ( !c ) return ''
			const vis = this.comm_visible_counts()[ c.id ] ?? 0
			return vis === c.size ? String( c.size ) : `${ vis } / ${ c.size }`
		}
		comm_active( i: number ) {
			return this.comms_selected().includes( this.communities()[ i ]?.id ?? '' )
		}
		comm_mark( i: number ) { return this.comm_active( i ) ? '✓' : '' }

		Comm_dot( i: number ) {
			const dot = super.Comm_dot( i )
			dot.style = () => ( {
				background: this.comm_color_map()[ this.communities()[ i ]?.id ?? '' ] ?? '',
			} )
			return dot
		}

		@$mol_action
		comm_click( i: number ) {
			const id = this.communities()[ i ]?.id
			if ( !id ) return null
			const cur = this.comms_selected()
			this.comms_selected( cur.includes( id )
				? cur.filter( c => c !== id )
				: [ ... cur, id ] )
			return null
		}

		has_comms_selection() { return this.comms_checked().length > 0 }

		@$mol_action
		comms_clear() {
			this.comms_selected( [] )
			return null
		}

		@$mol_action
		comms_toggle() {
			this.comms_open( !this.comms_open() )
			return null
		}
		comms_closed() { return !this.comms_open() }

		// Клик вне выпадашки закрывает её. Клики внутри (кнопка, строки)
		// добегают сюда всплытием, но target лежит внутри Comms — пропускаем.
		@$mol_action
		outside_click( event?: MouseEvent ) {
			if ( !this.comms_open() ) return null
			const box = this.Comms().dom_node() as HTMLElement | null
			if ( box && event?.target instanceof Node && box.contains( event.target ) ) return null
			this.comms_open( false )
			return null
		}

		comms_btn_label() {
			const n = this.comms_checked().length
			return `${ this.comms_btn_text() }${ n ? ` · ${ n }` : '' } ${ this.comms_open() ? '▴' : '▾' }`
		}

		// Сворачивание легенд и правой панели — больше места графу
		legend_caret() { return this.legend_collapsed() ? '▸' : '▾' }
		rels_caret() { return this.rels_collapsed() ? '▸' : '▾' }
		aside_caret() { return this.aside_collapsed() ? '⟨' : '⟩' }

		@$mol_action
		legend_toggle() {
			this.legend_collapsed( !this.legend_collapsed() )
			return null
		}
		@$mol_action
		rels_toggle() {
			this.rels_collapsed( !this.rels_collapsed() )
			return null
		}
		@$mol_action
		aside_toggle() {
			this.aside_collapsed( !this.aside_collapsed() )
			return null
		}

		@$mol_mem
		graph_data(): { nodes: readonly GraphNode[], edges: readonly GraphEdge[] } {
			return this.graph_remote()
				?? $raggu_web_front_explorer_forcegraph_build_mock( 42, 80, 130 )
		}

		// --- Плашка лимита: сколько вершин реально на канве против всего в корпусе ---

		graph_meta(): GraphMeta | null {
			return this.graph_remote()?.meta ?? null
		}

		// Показываем только когда выборка действительно урезана — на полном
		// графе плашка была бы шумом.
		is_limited(): boolean {
			const m = this.graph_meta()
			return !!m && m.returned_nodes < m.total_nodes
		}

		limit_text(): string {
			const m = this.graph_meta()
			if ( !m ) return ''
			return this.limit_template()
				.replace( '%1', String( m.returned_nodes ) )
				.replace( '%2', String( m.total_nodes ) )
		}

		can_show_more(): boolean {
			return this.graph_limit() < GRAPH_LIMIT_MAX
		}

		// Удваиваем выборку, но не выше потолка бэка и не выше размера корпуса.
		@$mol_action
		limit_more() {
			const m = this.graph_meta()
			const total = m?.total_nodes ?? GRAPH_LIMIT_MAX
			const next = Math.min( this.graph_limit() * 2, total, GRAPH_LIMIT_MAX )
			if ( next > this.graph_limit() ) this.graph_limit( next )
			return null
		}

		graph_nodes(): readonly GraphNode[] { return this.graph_data().nodes }
		graph_edges(): readonly GraphEdge[] { return this.graph_data().edges }

		// Cast to extended class to access TS-only methods (selected_node/selected_color/...)
		graph_view() {
			return this.Graph() as $.$$.$raggu_web_front_explorer_forcegraph
		}

		// Selected node, mirrors $raggu_web_front_explorer_forcegraph internals
		override selected() {
			return this.graph_view().selected_node()
		}

		// Selected edge — aside shows a relation card instead of an entity card
		override selected_edge() {
			return this.graph_view().selected_edge()
		}

		override node_label( id: string ) {
			return this.graph_nodes().find( n => n.id === id )?.label ?? id
		}

		aside_title() {
			return this.selected_edge() ? this.aside_relation_title_text() : this.aside_title_text()
		}

		// Aside text — fall back to placeholder when nothing selected
		entity_name() {
			const edge = this.selected_edge()
			if ( edge ) return edge.relation || '—'
			return this.selected()?.label ?? this.aside_empty_text()
		}

		entity_type() {
			const edge = this.selected_edge()
			if ( edge ) return `${ this.node_label( edge.source ) } → ${ this.node_label( edge.target ) }`
			return this.selected()?.type ?? ''
		}

		// Описание ребра с бэка: ручки get_edge на бэке пока нет, поэтому любая
		// ошибка (404 в т.ч.) тихо фолбэчится на description из get_graph.
		@$mol_mem
		edge_remote_desc(): string | null {
			const edge = this.selected_edge()
			const id = this.dataset_id()
			if ( !edge || !id || this.mock_flag() ) return null
			try {
				const res = this.$.$raggu_web_front_api(
					$raggu_web_front_api_ragu_get_edge,
					{ params: { dataset_id: id, edge_id: edge.id } },
				)
				return res.description || null
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				return null
			}
		}

		// Описание узла с бэка (get_node); ошибка тихо фолбэчится на
		// description из get_graph — как у рёбер.
		@$mol_mem
		node_remote_desc(): string | null {
			const n = this.selected()
			const id = this.dataset_id()
			if ( !n || !id || this.mock_flag() ) return null
			try {
				const res = this.$.$raggu_web_front_api(
					$raggu_web_front_api_ragu_get_node,
					{ params: { dataset_id: id, node_id: n.id } },
				)
				return res.node?.description || null
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				return null
			}
		}

		entity_desc() {
			const edge = this.selected_edge()
			if ( edge ) {
				return this.edge_remote_desc()
					?? ( edge.description
						|| `${ this.node_label( edge.source ) } — ${ edge.relation } — ${ this.node_label( edge.target ) }` )
			}
			const n = this.selected()
			if ( !n ) return ''
			return this.node_remote_desc() ?? ( n.description || '' )
		}

		relations_title() {
			const n = this.selected()
			if ( !n ) return ''
			return this.relations_title_template().replace( '%s', String( n.degree ) )
		}

		rels(): Array< { relation: string, target_label: string } > {
			if ( this.selected_edge() ) return []
			return this.graph_view().selected_relations().slice( 0, 5 )
		}

		rel_rows() {
			return this.rels().map( ( _, i ) => this.Rel( i ) )
		}

		rel_type( i: number ) { return this.rels()[ i ]?.relation ?? '' }
		rel_target( i: number ) { return this.rels()[ i ]?.target_label ?? '' }

		// Entity_dot color reflects type of selected node; neutral for an edge
		Entity_dot() {
			const dot = super.Entity_dot()
			dot.style = () => ( {
				background: this.selected_edge() ? '#7a7672' : this.graph_view().selected_color(),
			} )
			return dot
		}

	}

}
