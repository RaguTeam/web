namespace $ {

	// Node type is the raw entity_type string from the backend — schemas differ
	// per domain (NEREL, medical, …), so we don't bucket to a fixed enum anymore.
	// Colors come from a deterministic palette keyed by the string itself.
	export type $bog_norweb_front_explorer_forcegraph_node_type = string

	export type $bog_norweb_front_explorer_forcegraph_node = {
		id: string
		label: string
		type: $bog_norweb_front_explorer_forcegraph_node_type
		degree: number
		x: number
		y: number
	}

	export type $bog_norweb_front_explorer_forcegraph_edge = {
		id: string
		source: string
		target: string
		strength: number
		relation: string
	}

	// Distinct, theme-agnostic categorical palette. Assigned to types
	// deterministically so the same type always gets the same color.
	const $bog_norweb_front_explorer_forcegraph_palette = [
		'#e0524f', '#4f8ee0', '#3fb56b', '#d97ad9', '#e0a73f',
		'#7c6ce0', '#3fb8b8', '#e07a4f', '#7ab54f', '#4f6ce0',
		'#d94f7a', '#b8873f', '#4fb8a0', '#a04fe0', '#8ea04f',
	]

	// Fixed colors for well-known NEREL buckets — keeps the mock graph's
	// legend stable. Unknown types fall through to the hashed palette.
	const $bog_norweb_front_explorer_forcegraph_known_color: Record< string, string > = {
		PERSON: '#e0524f',
		ORG: '#4f8ee0',
		LOC: '#3fb56b',
		EVENT: '#d97ad9',
		DATE: '#e0a73f',
		WORK: '#7c6ce0',
		LAW: '#3fb8b8',
	}

	/** Deterministic color for any entity_type string. */
	export function $bog_norweb_front_explorer_forcegraph_type_color( type: string ): string {
		if ( !type ) return '#8a8a8a'
		const known = $bog_norweb_front_explorer_forcegraph_known_color[ type ]
		if ( known ) return known
		let hash = 0
		for ( let i = 0; i < type.length; i++ ) {
			hash = ( hash * 31 + type.charCodeAt( i ) ) | 0
		}
		const palette = $bog_norweb_front_explorer_forcegraph_palette
		return palette[ Math.abs( hash ) % palette.length ]
	}

	// --- Mock generator (kept exported: used by demo playground and stress-tests) ---

	const RELATIONS = [
		'MENTIONS', 'CITES', 'WORKS_AT', 'LOCATED_IN', 'INVOLVES',
		'DATED', 'AUTHORED', 'PART_OF', 'REFERS_TO', 'CONTAINS',
	]

	const TYPES: $bog_norweb_front_explorer_forcegraph_node_type[] =
		[ 'PERSON', 'ORG', 'LOC', 'EVENT', 'DATE', 'WORK', 'LAW' ]

	// Deterministic PRNG for stable mock graph between renders.
	function rand( seed: number ) {
		let s = seed
		return () => {
			s = ( s * 9301 + 49297 ) % 233280
			return s / 233280
		}
	}

	export function $bog_norweb_front_explorer_forcegraph_build_mock(
		seed = 42, n_nodes = 80, n_edges = 130,
	): {
		nodes: $bog_norweb_front_explorer_forcegraph_node[],
		edges: $bog_norweb_front_explorer_forcegraph_edge[],
	} {
		const r = rand( seed )
		const nodes: $bog_norweb_front_explorer_forcegraph_node[] = []
		for ( let i = 0; i < n_nodes; i++ ) {
			const type = TYPES[ Math.floor( r() * TYPES.length ) ]
			nodes.push( {
				id: `n${ i }`,
				label: `${ type } ${ i }`,
				type,
				degree: 0,
				x: ( r() - 0.5 ) * 400,
				y: ( r() - 0.5 ) * 400,
			} )
		}
		const edges: $bog_norweb_front_explorer_forcegraph_edge[] = []
		const seen = new Set< string >()
		for ( let i = 0; i < n_edges; i++ ) {
			let a: number, b: number, key: string
			do {
				a = Math.floor( r() * n_nodes )
				b = Math.floor( r() * n_nodes )
				key = a < b ? `${ a }-${ b }` : `${ b }-${ a }`
			} while ( a === b || seen.has( key ) )
			seen.add( key )
			edges.push( {
				id: `e${ i }`,
				source: `n${ a }`,
				target: `n${ b }`,
				strength: 0.3 + r() * 0.7,
				relation: RELATIONS[ Math.floor( r() * RELATIONS.length ) ],
			} )
			nodes[ a ].degree++
			nodes[ b ].degree++
		}
		return { nodes, edges }
	}

	// --- Force-layout physics -----------------------------------------------

	// Tunable physics params — passed into tick_layout every tick.
	// Defaults come from view.tree; demo playground overrides via bindings.
	export type $bog_norweb_front_explorer_forcegraph_layout_params = {
		gravity: number       // radial pull toward origin (ForceAtlas2 `gravity`)
		force_scale: number   // force → per-tick acceleration factor
		damping: number       // velocity persistence per tick (0..1, higher = springier)
		min_move: number      // smooth freeze gate midpoint (px/tick)
		max_speed: number     // tanh-saturated speed ceiling
	}

	const FORCE_K = 60
	const THETA = 0.3   // Barnes-Hut opening angle. Smaller = more accurate, slower
	const THETA2 = THETA * THETA

	// --- Barnes-Hut quadtree ------------------------------------------------
	// Instead of every-pair repulsion ( O(N²) ), aggregate distant groups of
	// nodes into a single "average" point ( center of mass ) and apply one
	// repulsion. Node A treats subtree S as one point iff size(S) / dist < θ.
	// Overall: O(N log N).
	type QuadCell = {
		x0: number, y0: number, size: number,
		com_x: number, com_y: number, count: number,
		node?: { id: string, x: number, y: number },   // leaf holder
		kids?: QuadCell[],                              // 4 quadrants when split
	}

	function make_cell( x0: number, y0: number, size: number ): QuadCell {
		return { x0, y0, size, com_x: 0, com_y: 0, count: 0 }
	}

	function insert( cell: QuadCell, node: { id: string, x: number, y: number }, depth: number ): void {
		cell.com_x += node.x
		cell.com_y += node.y
		cell.count++
		if ( depth > 20 ) return   // guard against coincident points
		if ( !cell.kids && !cell.node ) { cell.node = node; return }
		if ( cell.node ) {
			// Was a leaf — split, push old node down, then insert new
			const old = cell.node
			cell.node = undefined
			const h = cell.size / 2
			cell.kids = [
				make_cell( cell.x0,     cell.y0,     h ),
				make_cell( cell.x0 + h, cell.y0,     h ),
				make_cell( cell.x0,     cell.y0 + h, h ),
				make_cell( cell.x0 + h, cell.y0 + h, h ),
			]
			insert_child( cell, old, depth + 1 )
		}
		insert_child( cell, node, depth + 1 )
	}

	function insert_child( cell: QuadCell, node: { id: string, x: number, y: number }, depth: number ) {
		const mx = cell.x0 + cell.size / 2
		const my = cell.y0 + cell.size / 2
		const idx = ( node.x >= mx ? 1 : 0 ) + ( node.y >= my ? 2 : 0 )
		insert( cell.kids![ idx ], node, depth )
	}

	function accumulate_repulsion( cell: QuadCell, id: string, x: number, y: number, k2: number, out: { dx: number, dy: number } ): void {
		if ( cell.count === 0 ) return
		if ( cell.node && cell.node.id === id ) return
		const cx = cell.com_x / cell.count
		const cy = cell.com_y / cell.count
		const dx = x - cx
		const dy = y - cy
		const d2 = dx * dx + dy * dy || 0.01
		// Barnes-Hut criterion: if cell size² is small enough vs distance², treat as one aggregate mass
		if ( !cell.kids || cell.size * cell.size < THETA2 * d2 ) {
			const force = ( k2 * cell.count ) / d2
			out.dx += dx * force
			out.dy += dy * force
			return
		}
		for ( const kid of cell.kids ) accumulate_repulsion( kid, id, x, y, k2, out )
	}

	// Hermite smoothstep — C¹ continuous ramp from 0 at `a` to 1 at `b`.
	function smoothstep( a: number, b: number, x: number ): number {
		if ( x <= a ) return 0
		if ( x >= b ) return 1
		const t = ( x - a ) / ( b - a )
		return t * t * ( 3 - 2 * t )
	}

	/**
	 * Velocity-Verlet sim tick — d3-force / ForceAtlas2 style.
	 *   v[i] = ( v[i] + acceleration[i] ) * damping     ← momentum with friction
	 *   p[i] += v[i] * smoothstep_gate                  ← smooth freeze at low speed
	 * Repulsion via Barnes-Hut quadtree ( O(N log N) instead of naive O(N²) ).
	 */
	export function $bog_norweb_front_explorer_forcegraph_tick_layout(
		nodes: $bog_norweb_front_explorer_forcegraph_node[],
		edges: $bog_norweb_front_explorer_forcegraph_edge[],
		positions: Record< string, { x: number, y: number } >,
		velocities: Record< string, { vx: number, vy: number } >,
		pinned_id: string,
		params: $bog_norweb_front_explorer_forcegraph_layout_params,
	): {
		positions: Record< string, { x: number, y: number } >,
		velocities: Record< string, { vx: number, vy: number } >,
	} {
		const { gravity, force_scale, damping, min_move, max_speed } = params
		const k = FORCE_K
		const k2 = k * k
		const dispX: Record< string, number > = {}
		const dispY: Record< string, number > = {}

		// Bounds for quadtree — encompass all current node positions
		let min_x = Infinity, min_y = Infinity, max_x = -Infinity, max_y = -Infinity
		for ( const n of nodes ) {
			const p = positions[ n.id ]
			if ( p.x < min_x ) min_x = p.x
			if ( p.y < min_y ) min_y = p.y
			if ( p.x > max_x ) max_x = p.x
			if ( p.y > max_y ) max_y = p.y
		}
		const size = Math.max( max_x - min_x, max_y - min_y ) + 1
		const cx = ( min_x + max_x ) / 2
		const cy = ( min_y + max_y ) / 2
		const root = make_cell( cx - size / 2, cy - size / 2, size )
		for ( const n of nodes ) {
			const p = positions[ n.id ]
			insert( root, { id: n.id, x: p.x, y: p.y }, 0 )
		}

		// Repulsion — Barnes-Hut walk per node
		for ( const n of nodes ) {
			const p = positions[ n.id ]
			const out = { dx: 0, dy: 0 }
			accumulate_repulsion( root, n.id, p.x, p.y, k2, out )
			dispX[ n.id ] = out.dx
			dispY[ n.id ] = out.dy
		}
		// Attraction — exact, O(E)
		for ( const e of edges ) {
			const dx = positions[ e.source ].x - positions[ e.target ].x
			const dy = positions[ e.source ].y - positions[ e.target ].y
			const dist = Math.sqrt( dx * dx + dy * dy ) || 0.01
			const force = ( dist * dist ) / k * e.strength
			const fx = ( dx / dist ) * force
			const fy = ( dy / dist ) * force
			dispX[ e.source ] -= fx; dispY[ e.source ] -= fy
			dispX[ e.target ] += fx; dispY[ e.target ] += fy
		}
		// Gravity — soft radial pull toward origin
		for ( const n of nodes ) {
			const p = positions[ n.id ]
			dispX[ n.id ] -= p.x * gravity * k
			dispY[ n.id ] -= p.y * gravity * k
		}

		// Integrate: velocities accumulate + damp; position moves via smooth freeze gate.
		const next_pos: Record< string, { x: number, y: number } > = {}
		const next_vel: Record< string, { vx: number, vy: number } > = {}
		for ( const n of nodes ) {
			if ( n.id === pinned_id ) {
				next_pos[ n.id ] = positions[ n.id ]
				next_vel[ n.id ] = { vx: 0, vy: 0 }
				continue
			}
			const prev = velocities[ n.id ] || { vx: 0, vy: 0 }
			let vx = ( prev.vx + dispX[ n.id ] * force_scale ) * damping
			let vy = ( prev.vy + dispY[ n.id ] * force_scale ) * damping
			const speed = Math.sqrt( vx * vx + vy * vy )
			// Soft speed cap: tanh saturation.
			if ( speed > 0 ) {
				const cap_scale = max_speed * Math.tanh( speed / max_speed ) / speed
				vx *= cap_scale
				vy *= cap_scale
			}
			// Soft freeze gate.
			const gate = smoothstep( min_move * 0.3, min_move * 1.5, speed )
			next_pos[ n.id ] = { x: positions[ n.id ].x + vx * gate, y: positions[ n.id ].y + vy * gate }
			next_vel[ n.id ] = { vx, vy }
		}
		return { positions: next_pos, velocities: next_vel }
	}

	// Initial positions from mock coords — no synchronous FR pre-compute.
	// The view auto-starts a live sim that visibly settles the graph
	// ( Obsidian-style spring-in ).
	export function $bog_norweb_front_explorer_forcegraph_initial_positions(
		nodes: $bog_norweb_front_explorer_forcegraph_node[],
	): Record< string, { x: number, y: number } > {
		const positions: Record< string, { x: number, y: number } > = {}
		for ( const n of nodes ) positions[ n.id ] = { x: n.x, y: n.y }
		return positions
	}

}
