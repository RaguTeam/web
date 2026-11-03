namespace $ {

	export type $raggu_web_front_graph_layout_input = {
		x: Float32Array
		y: Float32Array
		degree: Float32Array
		community: Int32Array
		edge_source: Uint32Array
		edge_target: Uint32Array
		edge_strength: Float32Array
		iterations?: number
		radius?: number
	}

	/** Self-contained: the worker gets this function's source text, so nothing outside it may be referenced. */
	export function $raggu_web_front_graph_layout_solve(
		input: $raggu_web_front_graph_layout_input,
		on_progress?: ( ratio: number )=> void,
	) {

		const THETA_SQ = 0.9 * 0.9
		const MAX_DEPTH = 22
		const EPS = 1e-4

		function hash01( value: number ) {
			let h = value | 0
			h = Math.imul( h ^ ( h >>> 16 ), 0x45d9f3b )
			h = Math.imul( h ^ ( h >>> 16 ), 0x45d9f3b )
			h = ( h ^ ( h >>> 16 ) ) >>> 0
			return h / 4294967296
		}

		function unit_vector( key: number ) {
			const u = hash01( key * 2654435761 ) * 2 - 1
			const phi = hash01( key * 40503 + 17 ) * Math.PI * 2
			const r = Math.sqrt( Math.max( 0, 1 - u * u ) )
			return [ r * Math.cos( phi ), r * Math.sin( phi ), u ]
		}

		function widen_int( source: Int32Array, length: number, fill: number ) {
			const target = new Int32Array( length )
			target.fill( fill )
			target.set( source )
			return target
		}

		function widen_float( source: Float32Array, length: number ) {
			const target = new Float32Array( length )
			target.set( source )
			return target
		}

		function create_tree( capacity: number ) {
			return {
				capacity,
				children: new Int32Array( capacity * 8 ).fill( -1 ),
				count: new Int32Array( capacity ),
				body: new Int32Array( capacity ).fill( -1 ),
				mass: new Float32Array( capacity ),
				com_x: new Float32Array( capacity ),
				com_y: new Float32Array( capacity ),
				com_z: new Float32Array( capacity ),
				own_mass: new Float32Array( capacity ),
				own_x: new Float32Array( capacity ),
				own_y: new Float32Array( capacity ),
				own_z: new Float32Array( capacity ),
				center_x: new Float32Array( capacity ),
				center_y: new Float32Array( capacity ),
				center_z: new Float32Array( capacity ),
				half: new Float32Array( capacity ),
				used: 0,
			}
		}

		type Tree = ReturnType< typeof create_tree >

		function grow( tree: Tree ) {
			const next = tree.capacity * 2
			tree.children = widen_int( tree.children, next * 8, -1 )
			tree.count = widen_int( tree.count, next, 0 )
			tree.body = widen_int( tree.body, next, -1 )
			tree.mass = widen_float( tree.mass, next )
			tree.com_x = widen_float( tree.com_x, next )
			tree.com_y = widen_float( tree.com_y, next )
			tree.com_z = widen_float( tree.com_z, next )
			tree.own_mass = widen_float( tree.own_mass, next )
			tree.own_x = widen_float( tree.own_x, next )
			tree.own_y = widen_float( tree.own_y, next )
			tree.own_z = widen_float( tree.own_z, next )
			tree.center_x = widen_float( tree.center_x, next )
			tree.center_y = widen_float( tree.center_y, next )
			tree.center_z = widen_float( tree.center_z, next )
			tree.half = widen_float( tree.half, next )
			tree.capacity = next
		}

		function reset( tree: Tree, cx: number, cy: number, cz: number, half: number ) {
			tree.children.fill( -1, 0, tree.used * 8 )
			tree.count.fill( 0, 0, tree.used )
			tree.body.fill( -1, 0, tree.used )
			tree.own_mass.fill( 0, 0, tree.used )
			tree.own_x.fill( 0, 0, tree.used )
			tree.own_y.fill( 0, 0, tree.used )
			tree.own_z.fill( 0, 0, tree.used )
			tree.used = 1
			tree.center_x[ 0 ] = cx
			tree.center_y[ 0 ] = cy
			tree.center_z[ 0 ] = cz
			tree.half[ 0 ] = half
			tree.count[ 0 ] = 0
			tree.body[ 0 ] = -1
		}

		function child_of( tree: Tree, node: number, px: number, py: number, pz: number ) {
			const octant =
				( px > tree.center_x[ node ] ? 1 : 0 ) |
				( py > tree.center_y[ node ] ? 2 : 0 ) |
				( pz > tree.center_z[ node ] ? 4 : 0 )
			const slot = node * 8 + octant
			let child = tree.children[ slot ]
			if( child === -1 ) {
				if( tree.used >= tree.capacity ) grow( tree )
				child = tree.used++
				tree.children[ slot ] = child
				const half = tree.half[ node ] * 0.5
				tree.half[ child ] = half
				tree.center_x[ child ] = tree.center_x[ node ] + ( octant & 1 ? half : -half )
				tree.center_y[ child ] = tree.center_y[ node ] + ( octant & 2 ? half : -half )
				tree.center_z[ child ] = tree.center_z[ node ] + ( octant & 4 ? half : -half )
				tree.count[ child ] = 0
				tree.body[ child ] = -1
			}
			return child
		}

		function place( tree: Tree, start: number, body: number, positions: Float32Array, mass: Float32Array, start_depth: number ) {

			let node = start

			for( let depth = start_depth; depth <= MAX_DEPTH; depth++ ) {

				tree.count[ node ] += 1

				if( depth === MAX_DEPTH ) {
					const m = mass[ body ]
					tree.own_mass[ node ] += m
					tree.own_x[ node ] += positions[ body * 3 ] * m
					tree.own_y[ node ] += positions[ body * 3 + 1 ] * m
					tree.own_z[ node ] += positions[ body * 3 + 2 ] * m
					return
				}

				if( tree.count[ node ] === 1 ) {
					tree.body[ node ] = body
					return
				}

				const resident = tree.body[ node ]
				if( resident !== -1 ) {
					tree.body[ node ] = -1
					const target = child_of( tree, node, positions[ resident * 3 ], positions[ resident * 3 + 1 ], positions[ resident * 3 + 2 ] )
					place( tree, target, resident, positions, mass, depth + 1 )
				}

				node = child_of( tree, node, positions[ body * 3 ], positions[ body * 3 + 1 ], positions[ body * 3 + 2 ] )
			}

		}

		function summarise( tree: Tree, positions: Float32Array, mass: Float32Array ) {
			for( let node = tree.used - 1; node >= 0; node-- ) {

				let m = tree.own_mass[ node ]
				let sx = tree.own_x[ node ]
				let sy = tree.own_y[ node ]
				let sz = tree.own_z[ node ]

				const resident = tree.body[ node ]
				if( resident !== -1 ) {
					const bm = mass[ resident ]
					m += bm
					sx += positions[ resident * 3 ] * bm
					sy += positions[ resident * 3 + 1 ] * bm
					sz += positions[ resident * 3 + 2 ] * bm
				}

				for( let octant = 0; octant < 8; octant++ ) {
					const child = tree.children[ node * 8 + octant ]
					if( child === -1 ) continue
					const cm = tree.mass[ child ]
					m += cm
					sx += tree.com_x[ child ] * cm
					sy += tree.com_y[ child ] * cm
					sz += tree.com_z[ child ] * cm
				}

				tree.mass[ node ] = m
				if( m > 0 ) {
					tree.com_x[ node ] = sx / m
					tree.com_y[ node ] = sy / m
					tree.com_z[ node ] = sz / m
				}

			}
		}

		function normalise( positions: Float32Array, radius: number ) {

			const count = positions.length / 3
			let cx = 0
			let cy = 0
			let cz = 0

			for( let i = 0; i < count; i++ ) {
				cx += positions[ i * 3 ]
				cy += positions[ i * 3 + 1 ]
				cz += positions[ i * 3 + 2 ]
			}
			cx /= count
			cy /= count
			cz /= count

			const radii = new Float32Array( count )
			for( let i = 0; i < count; i++ ) {
				const dx = positions[ i * 3 ] - cx
				const dy = positions[ i * 3 + 1 ] - cy
				const dz = positions[ i * 3 + 2 ] - cz
				positions[ i * 3 ] = dx
				positions[ i * 3 + 1 ] = dy
				positions[ i * 3 + 2 ] = dz
				radii[ i ] = Math.hypot( dx, dy, dz )
			}

			const sorted = Float32Array.from( radii ).sort()
			const percentile = sorted[ Math.min( count - 1, Math.floor( count * 0.88 ) ) ] || 1
			const scale = radius / percentile

			for( let i = 0; i < positions.length; i++ ) positions[ i ] *= scale
		}

		const n = input.x.length
		const positions = new Float32Array( n * 3 )

		let extent = 1e-6
		for( let i = 0; i < n; i++ ) extent = Math.max( extent, Math.abs( input.x[ i ] ), Math.abs( input.y[ i ] ) )
		const seed_scale = 1 / extent

		for( let i = 0; i < n; i++ ) {
			const community = input.community[ i ]
			const axis = community >= 0 ? unit_vector( community + 1 ) : [ 0, 0, 0 ]
			const jx = ( hash01( i * 3 + 1 ) - 0.5 ) * 0.04
			const jy = ( hash01( i * 3 + 2 ) - 0.5 ) * 0.04
			const jz = ( hash01( i * 3 + 3 ) - 0.5 ) * 0.35
			positions[ i * 3 ] = input.x[ i ] * seed_scale + axis[ 0 ] * 0.22 + jx
			positions[ i * 3 + 1 ] = input.y[ i ] * seed_scale + axis[ 1 ] * 0.22 + jy
			positions[ i * 3 + 2 ] = axis[ 2 ] * 0.5 + jz
		}

		if( n === 0 ) return positions
		if( n === 1 ) {
			positions.set( [ 0, 0, 0 ] )
			return positions
		}

		const iterations = input.iterations ?? ( n <= 400 ? 260 : n <= 900 ? 220 : n <= 1800 ? 170 : 130 )
		const radius = input.radius ?? 3.2

		const mass = new Float32Array( n )
		for( let i = 0; i < n; i++ ) mass[ i ] = 1 + Math.sqrt( input.degree[ i ] ) * 0.6

		const velocity = new Float32Array( n * 3 )
		const force = new Float32Array( n * 3 )
		const tree = create_tree( Math.max( 64, n * 4 ) )

		const edge_count = input.edge_source.length
		const attraction = 0.55 / Math.max( 1, Math.sqrt( edge_count / Math.max( 1, n ) ) )
		const repulsion = 0.078
		const gravity = 0.018
		const stack = new Int32Array( MAX_DEPTH * 8 + 16 )

		for( let step = 0; step < iterations; step++ ) {

			const alpha = 0.9 * Math.pow( 1 - step / iterations, 1.4 ) + 0.02
			force.fill( 0 )

			let min_x = Infinity
			let min_y = Infinity
			let min_z = Infinity
			let max_x = -Infinity
			let max_y = -Infinity
			let max_z = -Infinity

			for( let i = 0; i < n; i++ ) {
				const px = positions[ i * 3 ]
				const py = positions[ i * 3 + 1 ]
				const pz = positions[ i * 3 + 2 ]
				if( px < min_x ) min_x = px
				if( py < min_y ) min_y = py
				if( pz < min_z ) min_z = pz
				if( px > max_x ) max_x = px
				if( py > max_y ) max_y = py
				if( pz > max_z ) max_z = pz
			}

			const half = Math.max( max_x - min_x, max_y - min_y, max_z - min_z ) * 0.5 + 0.5
			reset( tree, ( min_x + max_x ) * 0.5, ( min_y + max_y ) * 0.5, ( min_z + max_z ) * 0.5, half )
			for( let i = 0; i < n; i++ ) place( tree, 0, i, positions, mass, 0 )
			summarise( tree, positions, mass )

			for( let i = 0; i < n; i++ ) {

				const px = positions[ i * 3 ]
				const py = positions[ i * 3 + 1 ]
				const pz = positions[ i * 3 + 2 ]
				const mi = mass[ i ]
				let fx = 0
				let fy = 0
				let fz = 0
				let top = 0
				stack[ top++ ] = 0

				while( top > 0 ) {

					const node = stack[ --top ]
					const node_mass = tree.mass[ node ]
					if( node_mass <= 0 ) continue
					if( tree.body[ node ] === i && tree.count[ node ] === 1 ) continue

					const dx = px - tree.com_x[ node ]
					const dy = py - tree.com_y[ node ]
					const dz = pz - tree.com_z[ node ]
					const dist_sq = dx * dx + dy * dy + dz * dz + EPS
					const width = tree.half[ node ] * 2

					if( width * width < THETA_SQ * dist_sq || tree.count[ node ] === 1 ) {
						const inv = 1 / Math.sqrt( dist_sq )
						const magnitude = ( repulsion * node_mass * mi ) / dist_sq
						fx += dx * inv * magnitude
						fy += dy * inv * magnitude
						fz += dz * inv * magnitude
					} else {
						for( let octant = 0; octant < 8; octant++ ) {
							const child = tree.children[ node * 8 + octant ]
							if( child !== -1 && top < stack.length ) stack[ top++ ] = child
						}
					}

				}

				force[ i * 3 ] += fx
				force[ i * 3 + 1 ] += fy
				force[ i * 3 + 2 ] += fz
			}

			for( let e = 0; e < edge_count; e++ ) {
				const a = input.edge_source[ e ]
				const b = input.edge_target[ e ]
				const weight = attraction * ( 0.35 + ( input.edge_strength[ e ] || 0.5 ) * 0.65 )
				const dx = positions[ b * 3 ] - positions[ a * 3 ]
				const dy = positions[ b * 3 + 1 ] - positions[ a * 3 + 1 ]
				const dz = positions[ b * 3 + 2 ] - positions[ a * 3 + 2 ]
				force[ a * 3 ] += dx * weight
				force[ a * 3 + 1 ] += dy * weight
				force[ a * 3 + 2 ] += dz * weight
				force[ b * 3 ] -= dx * weight
				force[ b * 3 + 1 ] -= dy * weight
				force[ b * 3 + 2 ] -= dz * weight
			}

			for( let i = 0; i < n; i++ ) {

				const o = i * 3
				force[ o ] -= positions[ o ] * gravity
				force[ o + 1 ] -= positions[ o + 1 ] * gravity
				force[ o + 2 ] -= positions[ o + 2 ] * gravity

				velocity[ o ] = ( velocity[ o ] + force[ o ] * alpha ) * 0.72
				velocity[ o + 1 ] = ( velocity[ o + 1 ] + force[ o + 1 ] * alpha ) * 0.72
				velocity[ o + 2 ] = ( velocity[ o + 2 ] + force[ o + 2 ] * alpha ) * 0.72

				const speed = Math.hypot( velocity[ o ], velocity[ o + 1 ], velocity[ o + 2 ] )
				const damp = speed > 0.35 ? 0.35 / speed : 1

				positions[ o ] += velocity[ o ] * damp
				positions[ o + 1 ] += velocity[ o + 1 ] * damp
				positions[ o + 2 ] += velocity[ o + 2 ] * damp
			}

			if( on_progress && step % 12 === 0 ) on_progress( step / iterations )
		}

		normalise( positions, radius )
		on_progress?.( 1 )

		return positions
	}

	const $raggu_web_front_graph_layout_cache = new Map< string, Float32Array >()

	/** Solves in a worker built from the solver's own source; cached for the session. */
	export function $raggu_web_front_graph_layout(
		model: $raggu_web_front_graph_model,
		on_progress: ( ratio: number )=> void,
		radius = 3.2,
	) {

		const key = `${ model.meta.dataset_id }:${ model.nodes.length }:${ model.edges.length }:${ radius }`
		const cached = $raggu_web_front_graph_layout_cache.get( key )
		if( cached ) return { promise: Promise.resolve( cached ), cancel: ()=> {} }

		const source = `
			const solve = ${ $raggu_web_front_graph_layout_solve.toString() }
			onmessage = event => {
				const positions = solve( event.data, ratio => postMessage( { type: 'progress', ratio } ) )
				postMessage( { type: 'done', positions }, [ positions.buffer ] )
			}
		`

		const url = URL.createObjectURL( new Blob( [ source ], { type: 'text/javascript' } ) )
		const worker = new Worker( url )

		const promise = new Promise< Float32Array >( ( done, fail ) => {
			worker.onmessage = ( event: MessageEvent ) => {
				if( event.data.type === 'progress' ) return on_progress( event.data.ratio )
				$raggu_web_front_graph_layout_cache.set( key, event.data.positions )
				worker.terminate()
				URL.revokeObjectURL( url )
				done( event.data.positions )
			}
			worker.onerror = event => {
				worker.terminate()
				URL.revokeObjectURL( url )
				fail( new Error( event.message ) )
			}
		} )

		worker.postMessage( {
			x: model.x.slice(),
			y: model.y.slice(),
			degree: model.degree.slice(),
			community: model.community.slice(),
			edge_source: model.edge_source.slice(),
			edge_target: model.edge_target.slice(),
			edge_strength: model.edge_strength.slice(),
			radius,
		} )

		return {
			promise,
			cancel: ()=> {
				worker.terminate()
				URL.revokeObjectURL( url )
			},
		}

	}

}
