namespace $.$$ {

	// Local type aliases — view code reads better with short names,
	// while shared identifiers live in `types.ts` under `$bog_norweb_front_explorer_forcegraph_*`.
	type GraphNode = $bog_norweb_front_explorer_forcegraph_node
	type GraphEdge = $bog_norweb_front_explorer_forcegraph_edge
	type LayoutParams = $bog_norweb_front_explorer_forcegraph_layout_params

	// Module-scoped layout cache keyed by graph_key (dataset_id). Survives
	// component remount so returning to the graph shows the settled layout
	// instantly instead of replaying the spring-in from scratch every time.
	const $bog_norweb_front_explorer_forcegraph_layout_cache = new Map< string, Record< string, { x: number, y: number } > >()

	export class $bog_norweb_front_explorer_forcegraph extends $.$bog_norweb_front_explorer_forcegraph {

		// Typed accessors over view.tree's `nodes /` and `edges /` — parents
		// (explorer / demo) feed them via `nodes <= ...` bindings.
		override nodes(): readonly GraphNode[] {
			return super.nodes() as readonly GraphNode[]
		}
		override edges(): readonly GraphEdge[] {
			return super.edges() as readonly GraphEdge[]
		}

		// Plain non-reactive field overriding the auto-gen @$mol_mem drag_id.
		// The mem-cell version got invalidated between event-handler fibers
		// (wire_async destroys previous fiber on each event, which appears to
		// reset the subscribed cell back to its declared default '').
		// Plain field persists across calls without wire interference.
		drag_id_raw = ''
		override drag_id( next?: string ) {
			if ( next !== undefined ) this.drag_id_raw = next
			return this.drag_id_raw
		}

		// Pan/zoom state — fold into reactive view_box
		@$mol_mem
		computed_view_box() {
			const z = Math.max( 0.2, Math.min( 5, this.zoom() ) )
			const size = 600 / z
			const x = -size / 2 + this.pan_x()
			const y = -size / 2 + this.pan_y()
			return `${ x } ${ y } ${ size } ${ size }`
		}

		// Wheel / trackpad-pinch zoom.
		// Uses exp( -deltaY × sensitivity ) so many small deltaY events (trackpad
		// pinch) compose smoothly instead of stacking as 10% discrete jumps.
		@$mol_action
		wheel( event?: WheelEvent ) {
			if ( !event ) return
			event.preventDefault()
			const factor = Math.exp( -event.deltaY * 0.005 )
			this.zoom( this.zoom() * factor )
		}

		// Last pointer position (in client/screen pixels). Used by BOTH pan and node-drag
		// as the anchor for computing pixel-delta on each pointermove.
		dragging = false
		last_x = 0
		last_y = 0
		// Total movement during the current pointer-down session, in screen pixels.
		// Below DRAG_THRESHOLD it's a click, above it's a real drag (suppresses click).
		moved_px = 0
		// Where the pointer landed at pointerdown — for total-distance computation.
		start_x = 0
		start_y = 0

		// Minimum pixel distance to treat pointer interaction as drag (vs click).
		// Matches the $mol_touch convention of `>= 4`.
		readonly DRAG_THRESHOLD = 4

		@$mol_action
		pan_start( event?: PointerEvent ) {
			if ( !event ) return
			const target = event.target as Element
			const node_id = target.getAttribute( 'data-node-id' )
			this.last_x = event.clientX
			this.last_y = event.clientY
			this.start_x = event.clientX
			this.start_y = event.clientY
			this.moved_px = 0
			this.just_dragged = ''
			// Capture on the EVENT TARGET (the circle for node-drag, svg for pan).
			// Pointer events keep targeting that element until release — preserves
			// click dispatch on the circle and survives cursor leaving its bounds.
			try { target.setPointerCapture( event.pointerId ) } catch {}
			if ( node_id ) {
				this.drag_id( node_id )
				// Ensure initial positions are seeded before drag starts
				this.ensure_positions()
				// Don't start simulation here — wait until pan_move crosses threshold,
				// so a pure click doesn't trigger force-sim "shaking".
				return
			}
			this.dragging = true
		}

		// Returns svg-units per screen-pixel ratio for x/y. 1 if CTM missing.
		svg_scale(): { ax: number, ay: number } {
			const svg = this.dom_node() as unknown as SVGSVGElement
			const ctm = svg?.getScreenCTM?.()
			if ( !ctm || !ctm.a || !ctm.d ) return { ax: 1, ay: 1 }
			return { ax: 1 / ctm.a, ay: 1 / ctm.d }
		}

		@$mol_action
		pan_move( event?: PointerEvent ) {
			if ( !event ) return
			const dx_px = event.clientX - this.last_x
			const dy_px = event.clientY - this.last_y
			if ( dx_px === 0 && dy_px === 0 ) return
			this.last_x = event.clientX
			this.last_y = event.clientY

			// Track total distance from pointerdown to differentiate click from drag
			const total_dx = event.clientX - this.start_x
			const total_dy = event.clientY - this.start_y
			this.moved_px = Math.sqrt( total_dx * total_dx + total_dy * total_dy )

			// Below threshold while pressing on a node — treat as pending click, don't move
			if ( this.drag_id() && this.moved_px < this.DRAG_THRESHOLD ) return

			const { ax, ay } = this.svg_scale()
			const dx = dx_px * ax
			const dy = dy_px * ay

			// Node drag: shift the dragged node by pointer delta. No boundary clamp —
			// gravity in the sim brings released nodes back naturally.
			if ( this.drag_id() ) {
				// Kick off continuous sim on first real drag movement (idempotent)
				this.start_sim()
				const id = this.drag_id()
				const cur = this.pos( id )
				this.positions( { ... this.positions(), [ id ]: { x: cur.x + dx, y: cur.y + dy } } )
				return
			}

			if ( !this.dragging ) return
			// Pan: opposite direction (world stays under pointer)
			this.pan_x( this.pan_x() - dx )
			this.pan_y( this.pan_y() - dy )
		}

		@$mol_action
		pan_end() {
			this.dragging = false
			if ( this.drag_id() ) {
				if ( this.moved_px >= this.DRAG_THRESHOLD ) {
					this.just_dragged = this.drag_id()
				}
				this.drag_id( '' )
			}
		}

		// Convert pointer client coords → svg userspace via native CTM.
		// Handles viewBox + preserveAspectRatio + zoom/pan in one step.
		client_to_svg( event: PointerEvent ): { x: number, y: number } {
			const svg = this.dom_node() as unknown as SVGSVGElement
			const ctm = svg.getScreenCTM()
			if ( !ctm ) return { x: 0, y: 0 }
			const pt = svg.createSVGPoint()
			pt.x = event.clientX
			pt.y = event.clientY
			const local = pt.matrixTransform( ctm.inverse() )
			return { x: local.x, y: local.y }
		}

		// Lazily-computed initial FR layout — memoized so first render already shows
		// nodes settled into the circular bound, not the raw square mock coords.
		@$mol_mem
		initial_positions(): Record< string, { x: number, y: number } > {
			return $bog_norweb_front_explorer_forcegraph_initial_positions( this.nodes() as GraphNode[] )
		}

		// Seed positions on first read, or re-seed when the node set changes
		// (e.g. dataset switched, new fetch result arrived) — old cell may still
		// hold coords for a different set of nodes.
		ensure_positions(): Record< string, { x: number, y: number } > {
			let p = this.positions()
			const nodes = this.nodes()
			if ( Object.keys( p ).length !== nodes.length ) {
				// После ремоунта positions-ячейка пуста — восстанавливаем осевшую
				// раскладку из module-кэша, чтобы не переигрывать spring-in.
				const key = this.graph_key()
				const cached = key ? $bog_norweb_front_explorer_forcegraph_layout_cache.get( key ) : undefined
				if ( cached && Object.keys( cached ).length === nodes.length ) {
					p = { ... cached }
				} else {
					p = { ... this.initial_positions() }
				}
				this.velocities = {}
				this.positions( p )
			}
			return p
		}

		// Per-node velocity — the state that makes drags ripple through edges
		// then die via damping instead of shaking the whole graph each frame.
		velocities: Record< string, { vx: number, vy: number } > = {}

		// Bundle the tunable params ( declared as view.tree props with defaults ).
		layout_params(): LayoutParams {
			return {
				gravity: this.gravity(),
				force_scale: this.force_scale(),
				damping: this.damping(),
				min_move: this.min_move(),
				max_speed: this.max_speed(),
			}
		}

		// One sim tick.
		@$mol_action
		tick() {
			const positions = this.ensure_positions()
			const next = $bog_norweb_front_explorer_forcegraph_tick_layout(
				this.nodes() as GraphNode[],
				this.edges() as GraphEdge[],
				positions,
				this.velocities,
				this.drag_id(),
				this.layout_params(),
			)
			this.velocities = next.velocities
			this.positions( next.positions )
			// Кэшируем осевшую раскладку по dataset_id — переживёт ремоунт вкладки.
			const key = this.graph_key()
			if ( key ) $bog_norweb_front_explorer_forcegraph_layout_cache.set( key, next.positions )
		}

		// Continuous simulation loop driven by requestAnimationFrame.
		// Runs until frame budget exhausted AND no drag is active. While the
		// user is dragging, budget is re-armed each frame so neighbors keep
		// settling smoothly around the moved node.
		sim_running = false
		sim_frames_left = 0
		readonly SIM_INITIAL_FRAMES = 260
		readonly SIM_DRAG_FRAMES = 60

		start_sim( frames: number = this.SIM_DRAG_FRAMES ) {
			this.sim_frames_left = Math.max( this.sim_frames_left, frames )
			if ( this.sim_running ) return
			if ( typeof window === 'undefined' ) return
			this.sim_running = true
			const loop = () => {
				if ( !this.sim_running ) return
				try { this.tick() } catch {}
				if ( this.drag_id() ) {
					this.sim_frames_left = Math.max( this.sim_frames_left, this.SIM_DRAG_FRAMES )
				}
				this.sim_frames_left--
				if ( this.sim_frames_left <= 0 && !this.drag_id() ) {
					this.sim_running = false
					return
				}
				requestAnimationFrame( loop )
			}
			requestAnimationFrame( loop )
		}

		// Reactive kick — reading every tunable param here means the mem cell
		// invalidates whenever any of them changes. dom_tree reads it below,
		// so slider tweaks (and dataset switches) restart the sim automatically.
		@$mol_mem
		params_kick(): null {
			// Register deps on all sim inputs
			this.gravity()
			this.force_scale()
			this.damping()
			this.min_move()
			this.max_speed()
			this.nodes()   // rebuild sim on new graph
			// Idempotent: re-arms frame budget; starts loop if it was stopped
			this.start_sim( this.SIM_DRAG_FRAMES )
			return null
		}

		// Kick off the initial spring-in exactly once, on first mount.
		initial_sim_started = false
		@$mol_mem
		override dom_tree() {
			this.params_kick()
			const tree = super.dom_tree()
			if ( !this.initial_sim_started ) {
				this.initial_sim_started = true
				// Уже раскладывали этот граф — берём осевшие позиции из кэша и
				// гоняем лишь короткую стабилизацию вместо полного spring-in.
				const key = this.graph_key()
				const cached = key && $bog_norweb_front_explorer_forcegraph_layout_cache.has( key )
				this.start_sim( cached ? this.SIM_DRAG_FRAMES : this.SIM_INITIAL_FRAMES )
			}
			return tree
		}

		@$mol_mem
		node_by_id(): Record< string, GraphNode > {
			const m: Record< string, GraphNode > = {}
			for ( const n of this.nodes() ) m[ n.id ] = n
			return m
		}

		node_views() {
			return this.nodes().map( n => this.Node( n.id ) )
		}

		edge_views() {
			return this.edges().map( e => this.Edge( e.id ) )
		}

		// Effective node position: live positions cell (drag/sim output) first,
		// then the memoized initial FR layout, then raw mock as last resort.
		pos( id: string ) {
			const live = this.positions()[ id ]
			if ( live ) return live
			return this.initial_positions()[ id ] ?? this.node_by_id()[ id ]
		}

		// Used in view.tree as `data-node-id` attr so pan_start can identify node-target.
		node_id( id: string ) { return id }

		// Node accessors (keyed) — return strings, SVG attrs expect string
		node_x( id: string ) { return String( this.pos( id ).x ) }
		node_y( id: string ) { return String( this.pos( id ).y ) }
		// radius = base + growth * degree. Linear scale — hubs visually dominate,
		// which is what we want for a demo graph where the whole point is spotting
		// the well-connected nodes at a glance.
		// Radius scales with sqrt(degree), not degree — real graphs have hubs with
		// degree in the hundreds, and a linear scale blows them up to cover the
		// whole canvas. Capped so even a 500-degree hub stays readable.
		node_radius_num( id: string ): number {
			const n = this.node_by_id()[ id ]
			const r = this.node_size_base() + this.node_size_growth() * Math.sqrt( n.degree )
			return Math.min( r, 22 )
		}
		node_radius( id: string ) {
			return String( this.node_radius_num( id ) )
		}
		node_color( id: string ) {
			return $bog_norweb_front_explorer_forcegraph_type_color( this.node_by_id()[ id ].type )
		}

		// Фильтры подсветки: поиск по label и/или тип из легенды. Непустой фильтр
		// приглушает узлы и рёбра, которые не матчатся.
		search_lc() {
			return this.search().trim().toLowerCase()
		}
		filter_active() {
			return Boolean( this.search_lc() || this.filter_type() )
		}
		node_matches( id: string ) {
			const n = this.node_by_id()[ id ]
			const t = this.filter_type()
			if( t && n?.type !== t ) return false
			const s = this.search_lc()
			if( s && !( n?.label ?? '' ).toLowerCase().includes( s ) ) return false
			return true
		}
		node_opacity( id: string ) {
			return this.node_matches( id ) ? '1' : '0.12'
		}
		node_stroke( id: string ) {
			if ( this.selected_id() === id ) return '#ffffff'
			if ( this.hovered_id() === id ) return '#ffffff'
			return 'transparent'
		}
		node_stroke_width( id: string ) {
			if ( this.selected_id() === id ) return '2.5'
			if ( this.hovered_id() === id ) return '1.5'
			return '0'
		}

		@$mol_action
		hover_enter( id: string ) {
			this.hovered_id( id )
			return null
		}

		@$mol_action
		hover_leave() {
			this.hovered_id( '' )
			return null
		}

		// Edge accessors (keyed)
		@$mol_mem
		edge_by_id(): Record< string, GraphEdge > {
			const m: Record< string, GraphEdge > = {}
			for ( const e of this.edges() ) m[ e.id ] = e
			return m
		}

		edge_x1( id: string ) { return String( this.pos( this.edge_by_id()[ id ].source ).x ) }
		edge_y1( id: string ) { return String( this.pos( this.edge_by_id()[ id ].source ).y ) }
		edge_x2( id: string ) { return String( this.pos( this.edge_by_id()[ id ].target ).x ) }
		edge_y2( id: string ) { return String( this.pos( this.edge_by_id()[ id ].target ).y ) }
		edge_width( id: string ) {
			const e = this.edge_by_id()[ id ]
			const base = e.strength * 1.5 + 0.4
			const incident = this.hovered_id() && ( e.source === this.hovered_id() || e.target === this.hovered_id() )
				|| this.selected_id() && ( e.source === this.selected_id() || e.target === this.selected_id() )
			return String( incident ? base * 2 : base )
		}
		edge_opacity( id: string ) {
			const e = this.edge_by_id()[ id ]
			if ( this.filter_active() && !( this.node_matches( e.source ) && this.node_matches( e.target ) ) ) return '0.08'
			const hid = this.hovered_id() || this.selected_id()
			if ( !hid ) return '0.55'
			return ( e.source === hid || e.target === hid ) ? '0.95' : '0.18'
		}
		edge_color( id: string ) {
			const e = this.edge_by_id()[ id ]
			const hid = this.hovered_id() || this.selected_id()
			if ( hid && ( e.source === hid || e.target === hid ) ) return '#ffffff'
			return '#7a7672'
		}

		// Suppress click that fires right after node-drag (drag_id was just released)
		just_dragged = ''

		@$mol_action
		click( id: string ) {
			if ( this.just_dragged === id ) {
				this.just_dragged = ''
				return null
			}
			this.selected_id( id )
			this.select( id )
			return null
		}

		// Background click (anywhere not on a node circle) → deselect
		@$mol_action
		bg_click( event?: MouseEvent ) {
			if ( !event ) return
			const target = event.target as Element
			if ( target.getAttribute( 'data-node-id' ) ) return
			this.selected_id( '' )
			this.select( '' )
			return null
		}

		// Tooltip — single floating label above hovered-OR-selected node
		active_id() { return this.hovered_id() || this.selected_id() }

		// Conditional sub-list — render bg+text only when an active node exists
		tooltip_sub(): readonly $mol_view[] {
			return this.active_id()
				? [ this.Tooltip_bg(), this.Tooltip_text() ]
				: []
		}

		tooltip_text() {
			const id = this.active_id()
			return id ? this.node_by_id()[ id ]?.label ?? '' : ''
		}

		tooltip_font_size() {
			return String( Math.max( 6, Math.min( 12, 11 / Math.sqrt( this.zoom() ) ) ) )
		}

		// Position tooltip above the active node, in svg space
		tooltip_anchor() {
			const id = this.active_id()
			if ( !id ) return { x: 0, y: 0, r: 0 }
			return { x: this.pos( id ).x, y: this.pos( id ).y, r: this.node_radius_num( id ) }
		}

		tooltip_x() {
			return String( this.tooltip_anchor().x )
		}
		// Text baseline is the middle of the bg box; sits above circle with padding
		tooltip_y() {
			const a = this.tooltip_anchor()
			const fs = parseFloat( this.tooltip_font_size() )
			return String( a.y - a.r - 6 - fs * 0.7 )
		}

		// Bg sized roughly by char-count × char-width
		tooltip_bg_w() {
			const text = this.tooltip_text()
			const fs = parseFloat( this.tooltip_font_size() )
			return String( text.length * fs * 0.6 + 10 )
		}
		tooltip_bg_h() {
			return String( parseFloat( this.tooltip_font_size() ) + 8 )
		}
		tooltip_bg_x() {
			return String( this.tooltip_anchor().x - parseFloat( this.tooltip_bg_w() ) / 2 )
		}
		tooltip_bg_y() {
			const a = this.tooltip_anchor()
			return String( a.y - a.r - 6 - parseFloat( this.tooltip_bg_h() ) )
		}

		// Selected-node helpers consumed by Aside
		selected_node(): GraphNode | null {
			const id = this.selected_id()
			return id ? this.node_by_id()[ id ] ?? null : null
		}

		selected_color() {
			const n = this.selected_node()
			return $bog_norweb_front_explorer_forcegraph_type_color( n?.type ?? '' )
		}

		// Edges incident to selected node, with the OTHER node's label
		selected_relations(): Array< { relation: string, target_label: string } > {
			const id = this.selected_id()
			if ( !id ) return []
			const idx = this.node_by_id()
			return this.edges()
				.filter( e => e.source === id || e.target === id )
				.map( e => {
					const other_id = e.source === id ? e.target : e.source
					return { relation: e.relation, target_label: idx[ other_id ]?.label ?? other_id }
				} )
		}

	}

}
