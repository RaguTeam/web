namespace $.$$ {

	// jsdom doesn't implement SVGSVGElement.getScreenCTM/createSVGPoint.
	// Stub with identity-like behavior so drag math runs as it would in a real browser
	// where 1 screen-pixel == 1 svg-unit.
	function stub_svg( g: $bog_norweb_front_explorer_forcegraph ) {
		const svg = g.dom_node() as unknown as SVGSVGElement & {
			getScreenCTM: () => DOMMatrix
			createSVGPoint: () => DOMPoint
		}
		svg.getScreenCTM = () => ( {
			a: 1, b: 0, c: 0, d: 1, e: 0, f: 0,
			inverse() { return this },
		} as unknown as DOMMatrix )
		svg.createSVGPoint = () => {
			const p: any = { x: 0, y: 0 }
			p.matrixTransform = ( m: DOMMatrix ) => ( {
				x: m.a * p.x + m.c * p.y + m.e,
				y: m.b * p.x + m.d * p.y + m.f,
			} )
			return p
		}
	}

	function pe( x: number, y: number, target?: any ): PointerEvent {
		return { clientX: x, clientY: y, pointerId: 1, target: target ?? null } as unknown as PointerEvent
	}

	function node_target( id: string ) {
		return { getAttribute: ( k: string ) => k === 'data-node-id' ? id : null }
	}

	// Factory that seeds the forcegraph with a deterministic mock via its
	// view.tree `nodes /` and `edges /` inputs — mirrors the parent-owned
	// data-source pattern (explorer / demo do the same).
	function make_graph( $: any, n_nodes = 80, n_edges = 130 ) {
		const g = $bog_norweb_front_explorer_forcegraph.make( { $ } )
		const mock = $bog_norweb_front_explorer_forcegraph_build_mock( 42, n_nodes, n_edges )
		;( g as any ).nodes = () => mock.nodes
		;( g as any ).edges = () => mock.edges
		return { g, mock }
	}

	$mol_test( {

		'pos(id): no override → layout coords'( $ ) {
			const { g } = make_graph( $ )
			const n = g.nodes()[ 0 ]
			const p = g.pos( n.id )
			$mol_assert_equal( p.x, n.x )
			$mol_assert_equal( p.y, n.y )
		},

		// THE bug from user: 1-pixel pointer move ⇒ node travels exactly 1 pixel.
		'drag below threshold: node does NOT move (treated as pending click)'( $ ) {
			const { g } = make_graph( $ )
			stub_svg( g )
			g.sim_running = true  // block start_sim's RAF loop from firing
			const n = g.nodes()[ 7 ]
			g.pan_start( pe( 0, 0, node_target( n.id ) ) )
			// Pin to origin to avoid layout-seeded position interfering
			g.positions( { ...g.positions(), [ n.id ]: { x: 0, y: 0 } } )
			g.pan_move( pe( 0, 1 ) )  // 1px < threshold
			const p = g.pos( n.id )
			$mol_assert_equal( p.x, 0 )
			$mol_assert_equal( p.y, 0 )
		},

		'drag above threshold: node tracks pointer delta'( $ ) {
			const { g } = make_graph( $ )
			stub_svg( g )
			g.sim_running = true
			const n = g.nodes()[ 3 ]
			g.pan_start( pe( 0, 0, node_target( n.id ) ) )
			// Pin to origin so (+50, -30) won't hit the circular clamp at radius 280
			g.positions( { ...g.positions(), [ n.id ]: { x: 0, y: 0 } } )
			g.pan_move( pe( 50, -30 ) )  // 58px ≫ 4
			const p = g.pos( n.id )
			$mol_assert_equal( p.x, 50 )
			$mol_assert_equal( p.y, -30 )
		},

		'drag multiple moves accumulate (above threshold)'( $ ) {
			const { g } = make_graph( $ )
			stub_svg( g )
			g.sim_running = true
			const n = g.nodes()[ 2 ]
			g.pan_start( pe( 0, 0, node_target( n.id ) ) )
			g.positions( { ...g.positions(), [ n.id ]: { x: 0, y: 0 } } )
			g.pan_move( pe( 10, 10 ) )  // 14px > 4 — kicks in
			g.pan_move( pe( 25, 15 ) )
			g.pan_move( pe( 25, 25 ) )
			const p = g.pos( n.id )
			$mol_assert_equal( p.x, 25 )
			$mol_assert_equal( p.y, 25 )
		},


		'click without prior drag: selects'( $ ) {
			const { g } = make_graph( $ )
			g.click( 'n3' )
			$mol_assert_equal( g.selected_id(), 'n3' )
		},

		// THE click-vs-drag boundary: tap that didn't move past threshold MUST select
		'click after press-without-move (tiny drag): NOT suppressed → selects'( $ ) {
			const { g } = make_graph( $ )
			stub_svg( g )
			const n = g.nodes()[ 0 ]
			g.pan_start( pe( n.x, n.y, node_target( n.id ) ) )
			// User just clicked, didn't drag — pan_move never fires OR with delta < threshold
			g.pan_move( pe( n.x + 1, n.y ) )  // 1 pixel < 4
			g.pan_end()
			$mol_assert_equal( g.just_dragged, '' )  // no suppression
			g.click( n.id )
			$mol_assert_equal( g.selected_id(), n.id )  // selects normally
		},

		'click after real drag (>threshold): IS suppressed'( $ ) {
			const { g } = make_graph( $ )
			stub_svg( g )
			const n = g.nodes()[ 0 ]
			g.pan_start( pe( n.x, n.y, node_target( n.id ) ) )
			g.pan_move( pe( n.x + 20, n.y + 20 ) )  // 28px ≫ 4
			g.pan_end()
			$mol_assert_equal( g.just_dragged, n.id )
			g.click( n.id )
			$mol_assert_equal( g.selected_id(), '' )
		},

		'bg_click on empty bg → deselect'( $ ) {
			const { g } = make_graph( $ )
			g.selected_id( 'n3' )
			g.bg_click( { target: { getAttribute: () => null } } as unknown as MouseEvent )
			$mol_assert_equal( g.selected_id(), '' )
		},

		'bg_click on node circle → keep selection (per-node click handles it)'( $ ) {
			const { g } = make_graph( $ )
			g.selected_id( 'n3' )
			g.bg_click( { target: { getAttribute: ( k: string ) => k === 'data-node-id' ? 'n7' : null } } as unknown as MouseEvent )
			$mol_assert_equal( g.selected_id(), 'n3' )
		},

		'pan (drag on bg): camera moves opposite to pointer'( $ ) {
			const { g } = make_graph( $ )
			stub_svg( g )
			g.pan_start( pe( 0, 0, { getAttribute: () => null } ) )
			$mol_assert_equal( g.drag_id(), '' )
			g.pan_move( pe( 50, 30 ) )
			$mol_assert_equal( g.pan_x(), -50 )
			$mol_assert_equal( g.pan_y(), -30 )
		},

		'pan_move ignores no-move (same coords)'( $ ) {
			const { g } = make_graph( $ )
			stub_svg( g )
			g.sim_running = true
			const n = g.nodes()[ 0 ]
			g.pan_start( pe( 10, 10, node_target( n.id ) ) )
			g.positions( { ...g.positions(), [ n.id ]: { x: 0, y: 0 } } )
			g.pan_move( pe( 10, 10 ) )
			// Position unchanged
			const p = g.pos( n.id )
			$mol_assert_equal( p.x, 0 )
			$mol_assert_equal( p.y, 0 )
		},

		'selected_node / selected_relations'( $ ) {
			const { g } = make_graph( $ )
			const n = g.nodes()[ 3 ]
			g.selected_id( n.id )
			$mol_assert_equal( g.selected_node()?.id, n.id )
			$mol_assert_equal( g.selected_relations().length > 0, true )
		},

		// --- Stress test: how heavy is one force-layout tick at scale?
		// Reports avg ms/tick (10 iters). 60fps budget = 16.67ms/frame.
		'STRESS tick_layout perf across graph sizes'( $ ) {
			const sizes = [ 80, 200, 500, 1000, 2000, 5000 ]
			const results: Array< { n: number, edges: number, tick_ms: string } > = []
			const params = { gravity: 0.09, force_scale: 0.06, damping: 0.82, min_move: 0.15, max_speed: 12 }
			for ( const n of sizes ) {
				const g = $bog_norweb_front_explorer_forcegraph_build_mock( 42, n, Math.round( n * 1.6 ) )
				const positions: Record< string, { x: number, y: number } > = {}
				const velocities: Record< string, { vx: number, vy: number } > = {}
				for ( const node of g.nodes ) positions[ node.id ] = { x: node.x, y: node.y }
				// Warm-up
				let state = $bog_norweb_front_explorer_forcegraph_tick_layout( g.nodes, g.edges, positions, velocities, '', params )
				// 10-tick avg
				const t0 = Date.now()
				for ( let i = 0; i < 10; i++ ) state = $bog_norweb_front_explorer_forcegraph_tick_layout( g.nodes, g.edges, state.positions, state.velocities, '', params )
				const tick_ms = ( ( Date.now() - t0 ) / 10 ).toFixed( 2 )
				results.push( { n, edges: g.edges.length, tick_ms: `${ tick_ms }ms` } )
			}
			// console.log( '\n[forcegraph STRESS — Barnes-Hut]\n' + results.map( r =>
			// 	`  n=${ r.n.toString().padStart( 4 ) } edges=${ r.edges.toString().padStart( 5 ) }  tick=${ r.tick_ms.padStart( 8 ) }`
			// ).join( '\n' ) + '\n  (60fps budget = 16.67ms/tick)\n' )
			$mol_assert_equal( results.length, sizes.length )
		},

		// --- DOM integration: render → inspect → real events ---

		'DOM render: node circles carry data-node-id (Boundary is exempt)'( $ ) {
			const { g } = make_graph( $ )
			const svg = g.dom_tree() as unknown as SVGSVGElement
			const circles = svg.querySelectorAll( 'circle' )
			$mol_assert_equal( circles.length > 0, true )
			let with_attr = 0
			circles.forEach( c => {
				if ( c.getAttribute( 'data-node-id' ) ) with_attr++
			} )
			$mol_assert_equal( with_attr, g.nodes().length )
		},

		'DOM event flow: pointerdown on circle → drag mode'( $ ) {
			const { g } = make_graph( $ )
			stub_svg( g )
			const svg = g.dom_tree() as unknown as SVGSVGElement
			const circle = svg.querySelector( 'circle[data-node-id]' ) as SVGCircleElement
			const id = circle.getAttribute( 'data-node-id' )!
			$mol_assert_equal( !! id, true )

			// Synth pointerdown event with target=circle
			const ev = { clientX: 10, clientY: 20, pointerId: 1, target: circle } as unknown as PointerEvent
			g.pan_start( ev )
			$mol_assert_equal( g.drag_id(), id )
		},

		'reactive: positions write → node_x reflects new value'( $ ) {
			const { g } = make_graph( $ )
			const n = g.nodes()[ 0 ]
			const x_before = g.node_x( n.id )
			g.positions( { [ n.id ]: { x: 42, y: 99 } } )
			const x_after = g.node_x( n.id )
			const y_after = g.node_y( n.id )
			$mol_assert_equal( x_after, '42' )
			$mol_assert_equal( y_after, '99' )
			$mol_assert_equal( x_after !== x_before, true )
		},

	} )

}
