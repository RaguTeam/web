namespace $.$$ {

	// Local type aliases — view code reads better with short names,
	// while shared identifiers live in `types.ts` under `$raggu_web_front_explorer_forcegraph_*`.
	type GraphNode = $raggu_web_front_explorer_forcegraph_node
	type GraphEdge = $raggu_web_front_explorer_forcegraph_edge
	type LayoutParams = $raggu_web_front_explorer_forcegraph_layout_params

	// Module-scoped layout cache keyed by graph_key (dataset_id). Survives
	// component remount so returning to the graph shows the settled layout
	// instantly instead of replaying the spring-in from scratch every time.
	const $raggu_web_front_explorer_forcegraph_layout_cache = new Map< string, Record< string, { x: number, y: number } > >()

	export class $raggu_web_front_explorer_forcegraph extends $.$raggu_web_front_explorer_forcegraph {

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
				// Локальная симуляция: на крупном графе физика двигает только
				// таскаемый узел и его соседей — стоимость drag не зависит от
				// размера графа. Остальные узлы — неподвижные препятствия.
				this.drag_mobile = this.big_graph()
					? new Set( [ node_id, ...( this.adjacency()[ node_id ] ?? [] ) ] )
					: null
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
				const p = { x: cur.x + dx, y: cur.y + dy }
				// Точечная запись — двигается один узел, а не весь словарь
				this.positions_raw = { ... this.positions_raw, [ id ]: p }
				this.node_pos( id, p )
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
			return $raggu_web_front_explorer_forcegraph_initial_positions(
				this.nodes() as GraphNode[],
				this.node_radii(),
			)
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
				const cached = key ? $raggu_web_front_explorer_forcegraph_layout_cache.get( key ) : undefined
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

		// Позиции живут в ДВУХ видах: плоский нереактивный словарь для физики
		// (positions_raw) и гранулярные keyed-мемы для рендера (node_pos).
		// Запись позиции одного узла инвалидирует только его координаты —
		// а не все 20k+ элементов, как это делал единый мем-объект.
		positions_raw: Record< string, { x: number, y: number } > = {}

		@$mol_mem_key
		node_pos( id: string, next?: { x: number, y: number } ): { x: number, y: number } | null {
			return next ?? null
		}

		// Совместимость со старым интерфейсом (тесты пишут сюда целиком)
		override positions( next?: Record< string, { x: number, y: number } > ) {
			if ( next !== undefined ) {
				this.positions_raw = next
				for ( const id in next ) this.node_pos( id, next[ id ] )
			}
			return this.positions_raw
		}

		// Подвижное подмножество текущего drag (узел + соседи). Живёт до
		// остановки симуляции — хвост после отпускания тоже локальный.
		drag_mobile: Set< string > | null = null

		@$mol_mem
		adjacency(): Record< string, string[] > {
			const m: Record< string, string[] > = {}
			for ( const e of this.edges() ) {
				( m[ e.source ] ??= [] ).push( e.target )
				;( m[ e.target ] ??= [] ).push( e.source )
			}
			return m
		}

		// Bundle the tunable params ( declared as view.tree props with defaults ).
		layout_params(): LayoutParams {
			return {
				gravity: this.gravity(),
				force_scale: this.force_scale(),
				damping: this.damping(),
				min_move: this.min_move(),
				// Рыхлость как в Obsidian: слабые пружины, хабы не сжимают соседей
				spring: this.spring(),
				// Крупный граф двигаем медленнее — drag не разгоняет всю кучу
				max_speed: this.max_speed() * this.size_scale(),
				// …и с короткими пружинами, чтобы раскладка не расползалась за вьюпорт
				k_scale: this.size_scale(),
				// Затухание: силы гаснут со временем симуляции, дребезг умирает
				heat: this.sim_alpha,
				// Радиусы для расталкивания — кружки не наезжают друг на друга
				radii: this.node_radii(),
				// Локальная симуляция во время/после drag на крупном графе
				mobile: this.drag_mobile,
			}
		}

		// One sim tick.
		@$mol_action
		tick() {
			const positions = this.ensure_positions()
			const next = $raggu_web_front_explorer_forcegraph_tick_layout(
				this.nodes() as GraphNode[],
				this.edges() as GraphEdge[],
				positions,
				this.velocities,
				this.drag_id(),
				this.layout_params(),
			)
			this.velocities = next.velocities
			// Пиковая скорость по узлам — сигнал «граф осел» для ранней остановки
			let peak = 0
			for ( const id in next.velocities ) {
				const v = next.velocities[ id ]
				const speed = Math.sqrt( v.vx * v.vx + v.vy * v.vy )
				if ( speed > peak ) peak = speed
			}
			this.peak_speed = peak
			this.collide_peak = next.collide_peak
			// Точечные записи: инвалидируем координаты только реально
			// сдвинувшихся узлов — замороженные не трогают DOM вовсе
			const prev = this.positions_raw
			this.positions_raw = next.positions
			for ( const id in next.positions ) {
				const a = prev[ id ]
				const b = next.positions[ id ]
				if ( !a || Math.abs( a.x - b.x ) > 1e-4 || Math.abs( a.y - b.y ) > 1e-4 ) {
					this.node_pos( id, b )
				}
			}
			// Кэшируем осевшую раскладку по dataset_id — переживёт ремоунт вкладки.
			const key = this.graph_key()
			if ( key ) $raggu_web_front_explorer_forcegraph_layout_cache.set( key, next.positions )
		}

		// Continuous simulation loop driven by requestAnimationFrame.
		// Runs until frame budget exhausted AND no drag is active. While the
		// user is dragging, budget is re-armed each frame so neighbors keep
		// settling smoothly around the moved node.
		sim_running = false
		sim_frames_left = 0
		sim_ticks = 0
		peak_speed = Infinity
		collide_peak = 0
		frame_flip = false
		readonly SIM_INITIAL_FRAMES = 260
		readonly SIM_DRAG_FRAMES = 60

		// Alpha-cooling (как в d3-force): множитель сил, тает каждый тик.
		// Осцилляции вокруг равновесия гаснут вместе с ним — вместо дребезга
		// до конца бюджета кадров граф плавно замирает за секунду-полторы.
		sim_alpha = 1
		readonly ALPHA_DECAY = 0.97
		readonly ALPHA_MIN = 0.03
		readonly ALPHA_REHEAT = 0.3
		readonly ALPHA_DRAG = 0.5

		// Хвост симуляции после отпускания узла — на крупном графе короче
		drag_frames() {
			return this.big_graph() ? 45 : this.SIM_DRAG_FRAMES
		}

		start_sim( frames: number = this.drag_frames(), heat: number = this.ALPHA_REHEAT ) {
			this.sim_frames_left = Math.max( this.sim_frames_left, frames )
			if ( this.sim_running ) {
				this.sim_alpha = Math.max( this.sim_alpha, heat )
				return
			}
			if ( typeof window === 'undefined' ) return
			this.sim_running = true
			this.sim_ticks = 0
			this.sim_alpha = heat
			this.peak_speed = Infinity
			this.collide_peak = Infinity
			const loop = () => {
				if ( !this.sim_running ) return
				// Во время drag на крупном графе тик через кадр: DOM не успевает
				// обновлять сотни узлов на каждый RAF, полукадровая частота
				// оставляет бюджет самому перетаскиванию
				this.frame_flip = !this.frame_flip
				if ( this.big_graph() && this.drag_id() && this.frame_flip ) {
					requestAnimationFrame( loop )
					return
				}
				// Пока данные с бэка грузятся, tick кидает wire-promise. Такие
				// кадры не считаем ни тиками, ни затуханием — иначе симуляция
				// «остывает» и глохнет до прихода данных, оставив наезды узлов.
				let ok = true
				try { this.tick() } catch { ok = false }
				if ( ok ) {
					this.sim_ticks++
					this.sim_alpha = Math.max( 0, this.sim_alpha * this.ALPHA_DECAY )
				}
				if ( this.drag_id() ) {
					this.sim_frames_left = Math.max( this.sim_frames_left, this.drag_frames() )
					this.sim_alpha = Math.max( this.sim_alpha, this.ALPHA_DRAG )
				}
				this.sim_frames_left--
				// Граф осел (всё ниже порога заморозки) либо остыл (alpha на нуле) —
				// дожигать бюджет кадров незачем. Но пока коллизии заметно
				// раздвигают узлы, не глохнем — иначе останутся перекрытия.
				const settled = ok && this.sim_ticks > 15
					&& ( this.peak_speed < this.min_move() || this.sim_alpha < this.ALPHA_MIN )
					&& this.collide_peak < 0.4
				if ( ( this.sim_frames_left <= 0 || settled ) && !this.drag_id() ) {
					this.sim_running = false
					this.drag_mobile = null
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
			this.spring()
			this.damping()
			this.min_move()
			this.max_speed()
			this.nodes()   // rebuild sim on new graph
			// Idempotent: re-arms frame budget; starts loop if it was stopped
			if ( !this.huge_graph() ) this.start_sim( this.drag_frames() )
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
				// Бэковая раскладка + стартовое расталкивание уже дают картинку —
				// на огромном графе симуляция включится только при drag.
				if ( !this.huge_graph() ) {
					// Уже раскладывали этот граф — берём осевшие позиции из кэша и
					// гоняем лишь короткую стабилизацию вместо полного spring-in.
					const key = this.graph_key()
					const cached = key && $raggu_web_front_explorer_forcegraph_layout_cache.has( key )
					this.start_sim(
						cached ? this.drag_frames() : this.SIM_INITIAL_FRAMES,
						cached ? this.ALPHA_REHEAT : 1,
					)
				}
			}
			return tree
		}

		// --- крупные графы: масштаб визуала и физики от числа узлов ---

		// Плавный коэффициент 1 → 0.45: на сотнях узлов кружки, рёбра и
		// скорость движения ужимаются, иначе граф сливается в кашу.
		@$mol_mem
		size_scale() {
			const n = this.nodes().length
			return Math.max( 0.45, Math.min( 1, Math.sqrt( 220 / Math.max( 1, n ) ) ) )
		}

		// Порог «крупного» графа — дальше экономим на подписях и кадрах симуляции
		big_graph() {
			return this.nodes().length > 300
		}

		// «Огромный» граф: тик стоит ~100мс+, авто-симуляцию не гоняем вовсе —
		// физика включается только на время перетаскивания узла
		huge_graph() {
			return this.nodes().length > 2000
		}

		// Плотность рёбер: полупрозрачные линии при наложении складываются и
		// жирнеют, поэтому чем рёбер больше, тем тоньше и бледнее фоновые.
		@$mol_mem
		edge_scale() {
			const e = this.edges().length
			return Math.max( 0.35, Math.min( 1, Math.sqrt( 150 / Math.max( 1, e ) ) ) )
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

		// Effective node position: live keyed cell (drag/sim output) first,
		// then the memoized initial FR layout, then raw mock as last resort.
		pos( id: string ) {
			const live = this.node_pos( id )
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
			const s = this.size_scale()
			const r = ( this.node_size_base() + this.node_size_growth() * Math.sqrt( n.degree ) ) * s
			return Math.min( r, 22 * s )
		}
		node_radius( id: string ) {
			return String( this.node_radius_num( id ) )
		}

		// Карта радиусов для коллизий в симуляции — в svg-юнитах, как позиции
		@$mol_mem
		node_radii(): Record< string, number > {
			const m: Record< string, number > = {}
			for ( const n of this.nodes() ) m[ n.id ] = this.node_radius_num( n.id )
			return m
		}
		node_color( id: string ) {
			// При активном фильтре сообществ узлы выбранных красим в цвет сообщества
			const cs = this.comm_set()
			if ( cs.size ) {
				const comm = this.node_comm( id )
				if ( cs.has( comm ) ) return this.comm_color( comm ) || $raggu_web_front_explorer_forcegraph_type_color( this.node_by_id()[ id ].type )
			}
			return $raggu_web_front_explorer_forcegraph_type_color( this.node_by_id()[ id ].type )
		}

		// Фильтры подсветки: поиск по label, тип узла и/или тип связи из легенд.
		// Непустой фильтр приглушает узлы и рёбра, которые не матчатся.
		search_lc() {
			return this.search().trim().toLowerCase()
		}

		// Выбранные в выпадашке сообщества — Set для O(1) проверок
		@$mol_mem
		comm_set(): Set< string > {
			return new Set( this.filter_comms() as string[] )
		}
		node_comm( id: string ) {
			return this.node_by_id()[ id ]?.community ?? ''
		}
		comm_color( id: string ): string {
			return ( this.comm_colors() as Record< string, string > )[ id ] ?? ''
		}

		filter_active() {
			return Boolean( this.search_lc() || this.filter_type() || this.filter_relation() || this.comm_set().size )
		}
		node_matches( id: string ) {
			const n = this.node_by_id()[ id ]
			const t = this.filter_type()
			if( t && n?.type !== t ) return false
			const s = this.search_lc()
			if( s && !( n?.label ?? '' ).toLowerCase().includes( s ) ) return false
			// Фильтр по типу связи подсвечивает концы матчащихся рёбер
			const r = this.filter_relation()
			if( r && !this.node_has_relation( id, r ) ) return false
			const cs = this.comm_set()
			if( cs.size && !cs.has( n?.community ?? '' ) ) return false
			return true
		}

		@$mol_mem
		relation_nodes(): Record< string, Set< string > > {
			const m: Record< string, Set< string > > = {}
			for( const e of this.edges() ) {
				;( m[ e.relation ] ??= new Set() ).add( e.source )
				m[ e.relation ].add( e.target )
			}
			return m
		}
		node_has_relation( id: string, rel: string ) {
			return this.relation_nodes()[ rel ]?.has( id ) ?? false
		}

		// Наведённое/выбранное ребро — его концы ведут себя как hovered-узлы.
		active_edge(): GraphEdge | null {
			const id = this.hovered_edge_id() || this.selected_edge_id()
			return id ? this.edge_by_id()[ id ] ?? null : null
		}
		edge_endpoint( id: string ) {
			const e = this.active_edge()
			return Boolean( e && ( e.source === id || e.target === id ) )
		}

		// Наведённый/выбранный узел + его соседи. Остальное затемняем —
		// симметрично эффекту наведения на ребро.
		@$mol_mem
		active_node_hood(): Set< string > | null {
			const id = this.active_id()
			if ( !id ) return null
			const hood = new Set( [ id ] )
			for ( const e of this.edges() ) {
				if ( e.source === id ) hood.add( e.target )
				if ( e.target === id ) hood.add( e.source )
			}
			return hood
		}

		// Базовая непрозрачность узла зависит ТОЛЬКО от фильтров: ховер гасит
		// базовые слои одним атрибутом на группу и рисует окрестность в overlay,
		// поэтому наведение не инвалидирует тысячи элементов.
		node_opacity( id: string ) {
			return this.node_matches( id ) ? '1' : '0.12'
		}

		// Ховер срабатывает после паузы курсора (dwell): быстрое проведение
		// по графу не дёргает подсветку. Снятие — мгновенное.
		hover_timer: any = null
		readonly HOVER_DWELL_MS = 200

		hover_after( fire: () => void ) {
			clearTimeout( this.hover_timer )
			this.hover_timer = setTimeout( fire, this.HOVER_DWELL_MS )
		}

		@$mol_action
		hover_enter( id: string ) {
			this.hover_after( () => this.hovered_id( id ) )
			return null
		}

		@$mol_action
		hover_leave() {
			clearTimeout( this.hover_timer )
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
		// Used in view.tree as `data-edge-id` attr — mirrors node_id.
		edge_id( id: string ) { return id }

		// Edge is "active" when hovered or selected directly (not via incident node).
		edge_active( id: string ) {
			return this.hovered_edge_id() === id || this.selected_edge_id() === id
		}

		edge_base_width( id: string ): number {
			const e = this.edge_by_id()[ id ]
			return ( e.strength * 1.5 + 0.4 ) * this.size_scale() * this.edge_scale()
		}
		edge_width( id: string ) {
			return String( this.edge_base_width( id ) )
		}
		edge_matches( id: string ) {
			const e = this.edge_by_id()[ id ]
			const r = this.filter_relation()
			if ( r && e.relation !== r ) return false
			// Сообщества: подсвечиваем только ВНУТРЕННИЕ рёбра — оба конца
			// в одном и том же выбранном сообществе
			const cs = this.comm_set()
			if ( cs.size ) {
				const ca = this.node_comm( e.source )
				if ( ca !== this.node_comm( e.target ) || !cs.has( ca ) ) return false
			}
			return this.node_matches( e.source ) && this.node_matches( e.target )
		}
		// База без ховер-зависимостей: только фильтры и сообщества
		edge_opacity( id: string ) {
			if ( this.filter_active() && !this.edge_matches( id ) ) return '0.08'
			// Внутренние рёбра выбранных сообществ — ярче фона
			if ( this.comm_set().size && this.edge_matches( id ) ) return '0.85'
			// Фоновая яркость тает с числом рёбер — иначе серая сетка
			return String( +( 0.55 * this.edge_scale() ).toFixed( 2 ) )
		}
		edge_color( id: string ) {
			const e = this.edge_by_id()[ id ]
			// Внутреннее ребро выбранного сообщества — в его цвет
			const cs = this.comm_set()
			if ( cs.size && this.edge_matches( id ) ) {
				const c = this.comm_color( this.node_comm( e.source ) )
				if ( c ) return c
			}
			return '#7a7672'
		}

		@$mol_action
		edge_hover_enter( id: string ) {
			this.hover_after( () => this.hovered_edge_id( id ) )
			return null
		}

		@$mol_action
		edge_hover_leave() {
			clearTimeout( this.hover_timer )
			this.hovered_edge_id( '' )
			return null
		}

		// Клик по ребру (линии или подписи) выбирает связь и снимает выбор узла —
		// aside показывает либо карточку сущности, либо карточку связи.
		@$mol_action
		edge_click( id: string ) {
			if ( this.moved_px >= this.DRAG_THRESHOLD ) return null
			this.selected_edge_id( id )
			this.selected_id( '' )
			return null
		}

		selected_edge(): GraphEdge | null {
			const id = this.selected_edge_id()
			return id ? this.edge_by_id()[ id ] ?? null : null
		}

		// ---- always-on labels ----

		// Пустые подписи не рендерим вовсе: на крупном графе тысячи холостых
		// <text> с пересчётом координат каждый тик — главный источник лагов.
		node_label_views() {
			return this.nodes()
				.filter( n => this.node_label_text( n.id ) !== '' )
				.map( n => this.Node_label( n.id ) )
		}
		edge_label_views() {
			return this.edges()
				.filter( e => this.edge_label_text( e.id ) !== '' )
				.map( e => this.Edge_label( e.id ) )
		}

		// Font sizes live in svg units, so they shrink on zoom-out. sqrt easing
		// (same as tooltip) keeps labels from ballooning when zoomed in close.
		node_label_font_size() {
			const s = Math.max( 0.7, this.size_scale() )
			return String( Math.max( 4, Math.min( 14, 10 * s / Math.sqrt( this.zoom() ) ) ) )
		}
		edge_label_font_size() {
			return String( Math.max( 3, Math.min( 11, 8 / Math.sqrt( this.zoom() ) ) ) )
		}

		node_label_x( id: string ) { return String( this.pos( id ).x ) }
		node_label_y( id: string ) {
			const fs = parseFloat( this.node_label_font_size() )
			return String( this.pos( id ).y + this.node_radius_num( id ) + fs + 2 )
		}

		// «Когда места хватает»: подпись растёт из видимого размера узла на экране
		// (радиус × zoom) — мелкие узлы при отдалении остаются без подписей.
		node_label_vis( id: string ): number {
			const r_px = this.node_radius_num( id ) * this.zoom()
			// На крупном графе подписи только у заметных хабов, иначе каша;
			// приближение растит r_px — подписи проявляются по мере зума
			const min_px = this.big_graph() ? 11 : 7
			return Math.max( 0, Math.min( 1, ( r_px - min_px ) / 3 ) )
		}

		// База: подписи хабов по зуму и фильтрам. Подписи окрестности ховера
		// рисует overlay — база от наведения не зависит.
		node_label_text( id: string ) {
			if ( !this.node_matches( id ) ) return ''
			// Порог повыше нуля: у самого порога подпись была бы почти прозрачной
			if ( this.node_label_vis( id ) <= 0.3 ) return ''
			return this.node_by_id()[ id ]?.label ?? ''
		}

		node_label_opacity( id: string ) {
			// Быстрый разгон до непрозрачности — долгий fade читался как баг
			return String( Math.min( 1, 0.75 + this.node_label_vis( id ) * 0.25 ) )
		}

		edge_label_mid( id: string ) {
			const e = this.edge_by_id()[ id ]
			const a = this.pos( e.source )
			const b = this.pos( e.target )
			return { x: ( a.x + b.x ) / 2, y: ( a.y + b.y ) / 2 }
		}
		edge_label_x( id: string ) { return String( this.edge_label_mid( id ).x ) }
		edge_label_y( id: string ) { return String( this.edge_label_mid( id ).y ) }

		// Подпись влезает в свободную длину ребра (за вычетом кружков узлов)
		// и читаема на экране?
		edge_label_fits( id: string ): boolean {
			const e = this.edge_by_id()[ id ]
			const rel = e?.relation ?? ''
			if ( !rel ) return false
			const fs = parseFloat( this.edge_label_font_size() )
			if ( fs * this.zoom() < 4 ) return false // нечитаемая пыль
			const a = this.pos( e.source )
			const b = this.pos( e.target )
			const len = Math.hypot( b.x - a.x, b.y - a.y )
				- this.node_radius_num( e.source ) - this.node_radius_num( e.target )
			const need = rel.length * fs * 0.62 + fs * 2
			return len >= need
		}

		// База: на крупном графе фоновые подписи рёбер — серая пыль, их рисует
		// только overlay при ховере. От наведения база не зависит.
		edge_label_text( id: string ) {
			if ( this.big_graph() ) return ''
			if ( this.filter_active() && !this.edge_matches( id ) ) return ''
			return this.edge_label_fits( id ) ? this.edge_by_id()[ id ]?.relation ?? '' : ''
		}

		edge_label_opacity( id: string ) {
			return '0.85'
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
			this.selected_edge_id( '' )
			this.select( id )
			return null
		}

		// Background click (anywhere not on a node circle or an edge) → deselect
		@$mol_action
		bg_click( event?: MouseEvent ) {
			if ( !event ) return
			const target = event.target as Element
			if ( target.getAttribute( 'data-node-id' ) ) return
			if ( target.getAttribute( 'data-edge-id' ) ) return
			this.selected_id( '' )
			this.selected_edge_id( '' )
			this.select( '' )
			return null
		}

		// ---- overlay-слой подсветки ----
		// База при активном узле/ребре гасится одним атрибутом на группу
		// (см. data-forcegraph-dim), а сюда рендерится только окрестность —
		// ховер стоит десятки элементов вместо тысяч.

		dim_active() {
			return Boolean( this.active_id() || this.active_edge() )
		}

		overlay_views(): readonly $mol_view[] {
			const edge = this.active_edge()
			if ( edge ) {
				return [
					this.Overlay_edge( edge.id ),
					this.Overlay_node( edge.source ),
					this.Overlay_node( edge.target ),
					this.Overlay_label( edge.source ),
					this.Overlay_label( edge.target ),
					this.Overlay_edge_label( edge.id ),
				]
			}
			const id = this.active_id()
			if ( !id ) return []
			const hood = this.active_node_hood()!
			const views: $mol_view[] = []
			for ( const e of this.edges() ) {
				if ( e.source !== id && e.target !== id ) continue
				views.push( this.Overlay_edge( e.id ) )
				if ( this.overlay_edge_label_text( e.id ) ) views.push( this.Overlay_edge_label( e.id ) )
			}
			const label_all = hood.size <= 22
			for ( const nid of hood ) {
				views.push( this.Overlay_node( nid ) )
				// Имя активного узла показывает tooltip, соседей подписываем
				// пока их разумно мало
				if ( nid !== id && label_all ) views.push( this.Overlay_label( nid ) )
			}
			return views
		}

		overlay_label_text( id: string ) {
			return this.node_by_id()[ id ]?.label ?? ''
		}

		overlay_node_stroke_width( id: string ) {
			return id === this.active_id() ? '2.5' : '1.5'
		}

		overlay_edge_width( id: string ) {
			const base = this.edge_base_width( id )
			return String( this.edge_active( id )
				? Math.max( base * 2.5, 1.2 )
				: Math.max( base * 2, 1 ) )
		}

		// Тип связи: у активного ребра всегда, у рёбер окрестности — если влезает
		overlay_edge_label_text( id: string ) {
			const rel = this.edge_by_id()[ id ]?.relation ?? ''
			if ( !rel ) return ''
			if ( this.edge_active( id ) ) return rel
			return this.edge_label_fits( id ) ? rel : ''
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
			return $raggu_web_front_explorer_forcegraph_type_color( n?.type ?? '' )
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
