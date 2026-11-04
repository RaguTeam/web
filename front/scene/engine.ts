namespace $ {

	export type $raggu_web_front_scene_state = {
		mode: 'ambient' | 'graph'
		theme: 'light' | 'dark'
		graph_visible: boolean
		shown: $raggu_web_front_viewer_shown | null
		selected: string | null
		hover: string | null
		search: string
		types: readonly string[]
		communities: readonly string[]
		highlight: readonly string[]
		stage: $raggu_web_front_scene_rect | null
		reset_token: number
	}

	export type $raggu_web_front_scene_host = {
		state(): $raggu_web_front_scene_state
		hover( next: string | null ): void
		select( id: string | null ): void
	}

	const ramp_light = [ '#7cb0ec', '#5598e7', '#2a78d6', '#1c5cab', '#104281', '#0d366b' ]
	const ramp_dark = [ '#1c5cab', '#256abf', '#3987e5', '#6da7ec', '#9ec5f4', '#cde2fb' ]

	const ACCENT_TAU = 0.04
	const DIM_TAU = 0.1
	const RESTORE_TAU = 0.3
	const SETTLED = 0.0015
	const MAX_LABELS = 26
	const COLLISION_PX = 54

	export function $raggu_web_front_scene_engine( layer: HTMLElement, host: $raggu_web_front_scene_host ) {

		const THREE = $npm[ 'three' ]

		function palette( theme: 'light' | 'dark' ) {
			const dark = theme === 'dark'
			return {
				ramp: ( dark ? ramp_dark : ramp_light ).map( hex => new THREE.Color( hex ) ),
				accent: new THREE.Color( dark ? '#ff6e4e' : '#d64b2e' ),
				accent_soft: new THREE.Color( dark ? '#ffa48c' : '#e8825f' ),
				edge: new THREE.Color( dark ? '#3f5f8c' : '#8e9cb2' ),
				haze: new THREE.Color( dark ? '#05090f' : '#eef0f3' ),
				edge_opacity: dark ? 0.3 : 0.24,
				additive: dark,
				dim: dark ? 0.1 : 0.14,
			}
		}

		type Palette = ReturnType< typeof palette >

		const geometry_make = ()=> new THREE.BufferGeometry()
		type Geometry = ReturnType< typeof geometry_make >

		const scratch = new THREE.Color()

		function ramp_at( ramp: Palette[ 'ramp' ], t: number ) {
			const clamped = t <= 0 ? 0 : t >= 1 ? 1 : t
			const scaled = clamped * ( ramp.length - 1 )
			const index = Math.min( ramp.length - 2, Math.floor( scaled ) )
			return scratch.copy( ramp[ index ] ).lerp( ramp[ index + 1 ], scaled - index )
		}

		function point_material( soft: number, additive: boolean, far: number, haze: Palette[ 'haze' ] | null, amount: number ) {
			return new THREE.ShaderMaterial( {
				vertexShader: $raggu_web_front_scene_point_vert,
				fragmentShader: $raggu_web_front_scene_point_frag,
				transparent: true,
				depthWrite: false,
				blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
				uniforms: {
					uScale: { value: 400 },
					uOpacity: { value: 1 },
					uSoft: { value: soft },
					uNear: { value: 4 },
					uFar: { value: far },
					uHaze: { value: haze ? haze.clone() : new THREE.Color( 0, 0, 0 ) },
					uHazeAmount: { value: haze ? amount : 0 },
				},
			} )
		}

		function line_material( haze: Palette[ 'haze' ] | null, amount: number ) {
			return new THREE.ShaderMaterial( {
				vertexShader: $raggu_web_front_scene_line_vert,
				fragmentShader: $raggu_web_front_scene_line_frag,
				transparent: true,
				depthWrite: false,
				uniforms: {
					uOpacity: { value: 1 },
					uNear: { value: 4 },
					uFar: { value: 24 },
					uHaze: { value: haze ? haze.clone() : new THREE.Color( 0, 0, 0 ) },
					uHazeAmount: { value: haze ? amount : 0 },
				},
			} )
		}

		function attribute( geometry: Geometry, name: string, array: Float32Array, size: number ) {
			geometry.setAttribute( name, new THREE.BufferAttribute( array, size ) )
		}

		/* renderer */

		const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true, powerPreference: 'high-performance' } )
		renderer.setPixelRatio( Math.min( window.devicePixelRatio || 1, 2 ) )
		renderer.outputColorSpace = THREE.SRGBColorSpace
		renderer.toneMapping = THREE.ACESFilmicToneMapping
		renderer.setClearColor( 0x000000, 0 )

		const canvas = renderer.domElement
		canvas.style.display = 'block'
		canvas.style.width = '100%'
		canvas.style.height = '100%'
		layer.appendChild( canvas )

		const labels_layer = document.createElement( 'div' )
		labels_layer.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden'
		layer.appendChild( labels_layer )

		const camera = new THREE.PerspectiveCamera( 45, 1, 0.1, 120 )
		camera.position.set( 0, 0, 11 )

		const scene = new THREE.Scene()
		const raycaster = new THREE.Raycaster()
		const pointer = new THREE.Vector2()

		const size = { width: 1, height: 1 }

		const resize = () => {
			size.width = Math.max( 1, layer.clientWidth )
			size.height = Math.max( 1, layer.clientHeight )
			renderer.setSize( size.width, size.height, false )
			camera.aspect = size.width / size.height
			camera.updateProjectionMatrix()
		}
		resize()
		const observer = new ResizeObserver( resize )
		observer.observe( layer )

		/* orbit */

		const orbit = {
			target: new THREE.Vector3(),
			theta: 0,
			phi: 0,
			scale: 1,
			auto_rotate: false,
			auto_speed: 2,
			zoom: false,
			dragging: false,
			pressed: null as null | { x: number, y: number, last_x: number, last_y: number },
			spherical: new THREE.Spherical(),
			offset: new THREE.Vector3(),
		}

		const EPS = 0.000001

		function orbit_update() {

			orbit.offset.copy( camera.position ).sub( orbit.target )
			orbit.spherical.setFromVector3( orbit.offset )

			if( orbit.auto_rotate && !orbit.dragging ) orbit.theta -= 2 * Math.PI / 60 / 60 * orbit.auto_speed

			orbit.spherical.theta += orbit.theta * 0.06
			orbit.spherical.phi += orbit.phi * 0.06
			orbit.spherical.phi = Math.max( EPS, Math.min( Math.PI - EPS, orbit.spherical.phi ) )
			orbit.spherical.makeSafe()
			orbit.spherical.radius = Math.max( 3.4, Math.min( 20, orbit.spherical.radius * orbit.scale ) )

			orbit.offset.setFromSpherical( orbit.spherical )
			camera.position.copy( orbit.target ).add( orbit.offset )
			camera.lookAt( orbit.target )

			orbit.theta *= 1 - 0.06
			orbit.phi *= 1 - 0.06
			orbit.scale = 1

		}

		/* ambient */

		function build_ambient( colors: Palette ) {

			const COUNT = 620
			const RADIUS = 3.4
			const LINK = 0.82
			const hash01 = $raggu_web_front_graph_hash01

			const positions = new Float32Array( COUNT * 3 )
			const color = new Float32Array( COUNT * 3 )
			const alpha = new Float32Array( COUNT )
			const sizes = new Float32Array( COUNT )
			const halo_alpha = new Float32Array( COUNT )
			const halo_size = new Float32Array( COUNT )

			const golden = Math.PI * ( 3 - Math.sqrt( 5 ) )
			for( let i = 0; i < COUNT; i++ ) {
				const y = 1 - ( i / ( COUNT - 1 ) ) * 2
				const ring = Math.sqrt( Math.max( 0, 1 - y * y ) )
				const theta = golden * i
				const r = RADIUS * ( 0.62 + hash01( i * 7 + 3 ) * 0.42 )
				positions[ i * 3 ] = Math.cos( theta ) * ring * r
				positions[ i * 3 + 1 ] = y * r
				positions[ i * 3 + 2 ] = Math.sin( theta ) * ring * r
				const weight = Math.pow( hash01( i * 13 + 5 ), 2.2 )
				const tint = ramp_at( colors.ramp, weight )
				color[ i * 3 ] = tint.r
				color[ i * 3 + 1 ] = tint.g
				color[ i * 3 + 2 ] = tint.b
				alpha[ i ] = 0.32 + weight * 0.5
				sizes[ i ] = 0.03 + weight * 0.24
				halo_alpha[ i ] = alpha[ i ] * 0.14 * ( colors.additive ? 1 : 0.5 )
				halo_size[ i ] = sizes[ i ] * 2.6
			}

			const link_a: number[] = []
			const link_b: number[] = []
			for( let i = 0; i < COUNT && link_a.length < 900; i++ ) {
				for( let step = 1; step <= 3; step++ ) {
					const j = ( i + step * 17 + Math.floor( hash01( i * 31 + step ) * 9 ) ) % COUNT
					if( j === i ) continue
					const dx = positions[ i * 3 ] - positions[ j * 3 ]
					const dy = positions[ i * 3 + 1 ] - positions[ j * 3 + 1 ]
					const dz = positions[ i * 3 + 2 ] - positions[ j * 3 + 2 ]
					if( dx * dx + dy * dy + dz * dz < LINK * LINK ) {
						link_a.push( i )
						link_b.push( j )
					}
				}
			}

			const links = link_a.length
			const line_positions = new Float32Array( links * 6 )
			const line_color = new Float32Array( links * 6 )
			const line_alpha = new Float32Array( links * 2 )
			for( let e = 0; e < links; e++ ) {
				const a = link_a[ e ] * 3
				const b = link_b[ e ] * 3
				line_positions.set( [ positions[ a ], positions[ a + 1 ], positions[ a + 2 ] ], e * 6 )
				line_positions.set( [ positions[ b ], positions[ b + 1 ], positions[ b + 2 ] ], e * 6 + 3 )
				line_alpha[ e * 2 ] = colors.edge_opacity * 0.7
				line_alpha[ e * 2 + 1 ] = colors.edge_opacity * 0.7
				for( let v = 0; v < 2; v++ ) {
					line_color[ e * 6 + v * 3 ] = colors.edge.r
					line_color[ e * 6 + v * 3 + 1 ] = colors.edge.g
					line_color[ e * 6 + v * 3 + 2 ] = colors.edge.b
				}
			}

			const point_geometry = new THREE.BufferGeometry()
			attribute( point_geometry, 'position', positions, 3 )
			attribute( point_geometry, 'aColor', color, 3 )
			attribute( point_geometry, 'aAlpha', alpha, 1 )
			attribute( point_geometry, 'aSize', sizes, 1 )

			const halo_geometry = new THREE.BufferGeometry()
			attribute( halo_geometry, 'position', positions, 3 )
			attribute( halo_geometry, 'aColor', color, 3 )
			attribute( halo_geometry, 'aAlpha', halo_alpha, 1 )
			attribute( halo_geometry, 'aSize', halo_size, 1 )

			const line_geometry = new THREE.BufferGeometry()
			attribute( line_geometry, 'position', line_positions, 3 )
			attribute( line_geometry, 'aColor', line_color, 3 )
			attribute( line_geometry, 'aAlpha', line_alpha, 1 )

			const materials = {
				point: point_material( 0, false, 24, null, 0 ),
				halo: point_material( 1, colors.additive, 28, null, 0 ),
				line: line_material( null, 0 ),
			}

			const group = new THREE.Group()
			const lines = new THREE.LineSegments( line_geometry, materials.line )
			const halo = new THREE.Points( halo_geometry, materials.halo )
			const points = new THREE.Points( point_geometry, materials.point )
			for( const object of [ lines, halo, points ] ) {
				object.frustumCulled = false
				group.add( object )
			}

			return {
				group,
				materials,
				dispose() {
					point_geometry.dispose()
					halo_geometry.dispose()
					line_geometry.dispose()
					materials.point.dispose()
					materials.halo.dispose()
					materials.line.dispose()
				},
			}

		}

		/* cloud */

		function build_cloud( model: $raggu_web_front_graph_model, positions: Float32Array, colors: Palette ) {

			const n = model.nodes.length
			const m = model.edges.length

			const color = new Float32Array( n * 3 )
			const alpha = new Float32Array( n ).fill( 1 )
			const sizes = new Float32Array( n )
			const halo_alpha = new Float32Array( n )
			const halo_size = new Float32Array( n )
			const base_ramp = new Float32Array( n )

			let radius = 0
			for( let i = 0; i < n; i++ ) {
				base_ramp[ i ] = $raggu_web_front_scene_degree_ramp( model.degree[ i ], model.max_degree )
				const d = Math.hypot( positions[ i * 3 ], positions[ i * 3 + 1 ], positions[ i * 3 + 2 ] )
				if( d > radius ) radius = d
			}

			const point_geometry = new THREE.BufferGeometry()
			attribute( point_geometry, 'position', positions, 3 )
			attribute( point_geometry, 'aColor', color, 3 )
			attribute( point_geometry, 'aAlpha', alpha, 1 )
			attribute( point_geometry, 'aSize', sizes, 1 )

			const halo_geometry = new THREE.BufferGeometry()
			attribute( halo_geometry, 'position', positions, 3 )
			attribute( halo_geometry, 'aColor', color, 3 )
			attribute( halo_geometry, 'aAlpha', halo_alpha, 1 )
			attribute( halo_geometry, 'aSize', halo_size, 1 )

			const line_positions = new Float32Array( m * 6 )
			const line_color = new Float32Array( m * 6 )
			const line_alpha = new Float32Array( m * 2 )
			for( let e = 0; e < m; e++ ) {
				const a = model.edge_source[ e ] * 3
				const b = model.edge_target[ e ] * 3
				line_positions[ e * 6 ] = positions[ a ]
				line_positions[ e * 6 + 1 ] = positions[ a + 1 ]
				line_positions[ e * 6 + 2 ] = positions[ a + 2 ]
				line_positions[ e * 6 + 3 ] = positions[ b ]
				line_positions[ e * 6 + 4 ] = positions[ b + 1 ]
				line_positions[ e * 6 + 5 ] = positions[ b + 2 ]
			}

			const line_geometry = new THREE.BufferGeometry()
			attribute( line_geometry, 'position', line_positions, 3 )
			attribute( line_geometry, 'aColor', line_color, 3 )
			attribute( line_geometry, 'aAlpha', line_alpha, 1 )

			const materials = {
				point: point_material( 0, false, 22, colors.haze, 0.66 ),
				halo: point_material( 1, colors.additive, 26, colors.haze, 0.66 ),
				line: line_material( colors.haze, 0.54 ),
			}

			const group = new THREE.Group()
			const lines = new THREE.LineSegments( line_geometry, materials.line )
			const halo = new THREE.Points( halo_geometry, materials.halo )
			const points = new THREE.Points( point_geometry, materials.point )
			for( const object of [ lines, halo, points ] ) {
				object.frustumCulled = false
				group.add( object )
			}

			return {
				model,
				positions,
				colors,
				group,
				points,
				materials,
				geometries: [ point_geometry, halo_geometry, line_geometry ],
				color,
				alpha,
				size: sizes,
				halo_alpha,
				halo_size,
				line_color,
				line_alpha,
				target_color: new Float32Array( n * 3 ),
				target_alpha: new Float32Array( n ),
				target_size: new Float32Array( n ),
				target_halo_alpha: new Float32Array( n ),
				target_halo_size: new Float32Array( n ),
				target_line_color: new Float32Array( m * 6 ),
				target_line_alpha: new Float32Array( m * 2 ),
				accented: new Uint8Array( n ),
				line_accented: new Uint8Array( m ),
				base_ramp,
				radius: radius || 3.2,
				primed: false,
				easing: false,
				dispose() {
					for( const geometry of [ point_geometry, halo_geometry, line_geometry ] ) geometry.dispose()
					materials.point.dispose()
					materials.halo.dispose()
					materials.line.dispose()
				},
			}

		}

		type Cloud = ReturnType< typeof build_cloud >

		function mark_updated( cloud: Cloud ) {
			for( const geometry of cloud.geometries ) {
				for( const name of [ 'aColor', 'aAlpha', 'aSize' ] ) {
					const attr = geometry.getAttribute( name )
					if( attr ) attr.needsUpdate = true
				}
			}
		}

		function matches( state: $raggu_web_front_scene_state, model: $raggu_web_front_graph_model ) {

			const n = model.nodes.length
			const query = state.search.trim().toLowerCase()
			const types = new Set( state.types )
			const communities = new Set( state.communities )
			const highlighted = new Set( state.highlight )
			const explicit = query.length > 0 || types.size > 0 || communities.size > 0
			const matched = new Uint8Array( n )

			for( let i = 0; i < n; i++ ) {
				const node = model.nodes[ i ]
				let hit = true
				if( query ) hit = node.label.toLowerCase().includes( query )
				if( hit && types.size > 0 ) hit = types.has( node.entity_type )
				if( hit && communities.size > 0 ) hit = node.community_id ? communities.has( node.community_id ) : false
				if( hit && !explicit && highlighted.size > 0 ) hit = highlighted.has( node.id )
				matched[ i ] = hit ? 1 : 0
			}

			return { matched, filtering: explicit || highlighted.size > 0 }
		}

		function paint( cloud: Cloud, state: $raggu_web_front_scene_state ) {

			const { model, colors } = cloud
			const n = model.nodes.length
			const m = model.edges.length

			const focus_id = state.hover ?? state.selected
			const focus = focus_id ? ( model.index_of.get( focus_id ) ?? -1 ) : -1

			const neighbour_nodes = new Set< number >()
			const neighbour_edges = new Set< number >()
			if( focus >= 0 ) {
				for( let k = model.adj_offset[ focus ]; k < model.adj_offset[ focus + 1 ]; k++ ) {
					neighbour_nodes.add( model.adj_node[ k ] )
					neighbour_edges.add( model.adj_edge[ k ] )
				}
			}

			const { matched, filtering } = matches( state, model )

			for( let i = 0; i < n; i++ ) {

				const t = cloud.base_ramp[ i ]
				scratch.copy( ramp_at( colors.ramp, t ) )

				let a = 0.58 + t * 0.4
				let s = 0.045 + t * 0.34

				const is_focus = i === focus
				const is_neighbour = neighbour_nodes.has( i )

				if( filtering ) {
					if( matched[ i ] === 1 ) {
						scratch.lerp( colors.accent, 0.5 )
						a = 1
						s *= 1.16
					} else {
						a = colors.dim
						s *= 0.7
					}
				}

				if( focus >= 0 ) {
					if( is_focus ) {
						scratch.copy( colors.accent )
						a = 1
						s *= 1.8
					} else if( is_neighbour ) {
						scratch.lerp( colors.accent_soft, 0.7 )
						a = 1
						s *= 1.1
					} else {
						a *= 0.3
					}
				}

				cloud.target_color[ i * 3 ] = scratch.r
				cloud.target_color[ i * 3 + 1 ] = scratch.g
				cloud.target_color[ i * 3 + 2 ] = scratch.b
				cloud.target_alpha[ i ] = a
				cloud.target_size[ i ] = s
				cloud.target_halo_alpha[ i ] = a * ( is_focus ? 0.5 : 0.16 ) * ( colors.additive ? 1 : 0.5 )
				cloud.target_halo_size[ i ] = s * ( is_focus ? 3.6 : 2.4 )
				cloud.accented[ i ] = is_focus || is_neighbour || ( filtering && matched[ i ] === 1 ) ? 1 : 0
			}

			for( let e = 0; e < m; e++ ) {

				const a = model.edge_source[ e ]
				const b = model.edge_target[ e ]
				let value = colors.edge_opacity * ( 0.45 + model.edge_strength[ e ] * 0.55 )
				let tint = colors.edge
				let hot = false

				if( focus >= 0 ) {
					if( neighbour_edges.has( e ) ) {
						value = 0.8
						tint = colors.accent
						hot = true
					} else {
						value *= 0.14
					}
				} else if( filtering ) {
					const both = matched[ a ] === 1 && matched[ b ] === 1
					value = both ? value * 1.5 : value * 0.15
					hot = both
				}

				cloud.line_accented[ e ] = hot ? 1 : 0
				cloud.target_line_alpha[ e * 2 ] = value
				cloud.target_line_alpha[ e * 2 + 1 ] = value
				for( let v = 0; v < 2; v++ ) {
					cloud.target_line_color[ e * 6 + v * 3 ] = tint.r
					cloud.target_line_color[ e * 6 + v * 3 + 1 ] = tint.g
					cloud.target_line_color[ e * 6 + v * 3 + 2 ] = tint.b
				}
			}

			if( !cloud.primed ) {
				cloud.color.set( cloud.target_color )
				cloud.alpha.set( cloud.target_alpha )
				cloud.size.set( cloud.target_size )
				cloud.halo_alpha.set( cloud.target_halo_alpha )
				cloud.halo_size.set( cloud.target_halo_size )
				cloud.line_color.set( cloud.target_line_color )
				cloud.line_alpha.set( cloud.target_line_alpha )
				cloud.primed = true
				mark_updated( cloud )
			}

			cloud.easing = true
		}

		function ease( cloud: Cloud, delta: number ) {

			const n = cloud.model.nodes.length
			const m = cloud.model.edges.length
			const accent_rate = 1 - Math.exp( -delta / ACCENT_TAU )
			const dim_rate = 1 - Math.exp( -delta / DIM_TAU )
			const restore_rate = 1 - Math.exp( -delta / RESTORE_TAU )

			let drift = 0

			const step = ( current: Float32Array, target: Float32Array, index: number, rate: number ) => {
				const gap = target[ index ] - current[ index ]
				const span = gap < 0 ? -gap : gap
				if( span > drift ) drift = span
				current[ index ] = span < SETTLED ? target[ index ] : current[ index ] + gap * rate
			}

			for( let i = 0; i < n; i++ ) {
				const rate = cloud.accented[ i ] ? accent_rate : cloud.target_alpha[ i ] < cloud.alpha[ i ] ? dim_rate : restore_rate
				step( cloud.alpha, cloud.target_alpha, i, rate )
				step( cloud.size, cloud.target_size, i, rate )
				step( cloud.halo_alpha, cloud.target_halo_alpha, i, rate )
				step( cloud.halo_size, cloud.target_halo_size, i, rate )
				step( cloud.color, cloud.target_color, i * 3, rate )
				step( cloud.color, cloud.target_color, i * 3 + 1, rate )
				step( cloud.color, cloud.target_color, i * 3 + 2, rate )
			}

			for( let e = 0; e < m; e++ ) {
				const rate = cloud.line_accented[ e ] ? accent_rate : cloud.target_line_alpha[ e * 2 ] < cloud.line_alpha[ e * 2 ] ? dim_rate : restore_rate
				step( cloud.line_alpha, cloud.target_line_alpha, e * 2, rate )
				step( cloud.line_alpha, cloud.target_line_alpha, e * 2 + 1, rate )
				for( let v = 0; v < 6; v++ ) step( cloud.line_color, cloud.target_line_color, e * 6 + v, rate )
			}

			mark_updated( cloud )
			return drift >= SETTLED
		}

		/* labels */

		type Label = { index: number, strong: boolean, element: HTMLElement }

		let labels: Label[] = []

		function build_labels( cloud: Cloud, state: $raggu_web_front_scene_state ) {

			const model = cloud.model
			const query = state.search.trim().toLowerCase()
			const types = new Set( state.types )
			const communities = new Set( state.communities )
			const highlighted = new Set( state.highlight )
			const explicit = query.length > 0 || types.size > 0 || communities.size > 0

			const candidates: { index: number, strong: boolean }[] = []
			for( let i = 0; i < model.nodes.length; i++ ) {
				const node = model.nodes[ i ]
				if( query && !node.label.toLowerCase().includes( query ) ) continue
				if( types.size > 0 && !types.has( node.entity_type ) ) continue
				if( communities.size > 0 && !( node.community_id && communities.has( node.community_id ) ) ) continue
				if( !explicit && highlighted.size > 0 && !highlighted.has( node.id ) ) continue
				candidates.push( { index: i, strong: false } )
			}

			candidates.sort( ( a, b ) => model.degree[ b.index ] - model.degree[ a.index ] )
			const picked = candidates.slice( 0, MAX_LABELS )

			for( const id of [ state.selected, state.hover ] ) {
				if( !id ) continue
				const index = model.index_of.get( id )
				if( index === undefined ) continue
				const existing = picked.find( entry => entry.index === index )
				if( existing ) existing.strong = true
				else picked.unshift( { index, strong: true } )
			}

			labels_layer.textContent = ''
			labels = picked.map( entry => {
				const node = model.nodes[ entry.index ]
				const element = document.createElement( 'span' )
				element.className = entry.strong ? 'ragu-label ragu-label--strong' : 'ragu-label'
				element.textContent = node.label
				if( entry.strong ) {
					const type = document.createElement( 'em' )
					type.className = 'ragu-label__type'
					type.textContent = node.entity_type
					element.appendChild( type )
				}
				labels_layer.appendChild( element )
				return { ... entry, element }
			} )
		}

		const projected = new THREE.Vector3()
		const placed: number[] = []

		function place_labels( cloud: Cloud, opacity: number ) {

			placed.length = 0
			const width = size.width
			const height = size.height

			for( const label of labels ) {

				const index = label.index
				projected.set( cloud.positions[ index * 3 ], cloud.positions[ index * 3 + 1 ], cloud.positions[ index * 3 + 2 ] )
				const distance = projected.distanceTo( camera.position )
				projected.project( camera )

				const behind = projected.z > 1
				const x = ( projected.x * 0.5 + 0.5 ) * width
				const y = ( -projected.y * 0.5 + 0.5 ) * height

				let hidden = behind || x < 8 || x > width - 8 || y < 8 || y > height - 8 || opacity < 0.08

				if( !hidden && !label.strong ) {
					for( let p = 0; p < placed.length; p += 2 ) {
						if( Math.abs( placed[ p ] - x ) < COLLISION_PX && Math.abs( placed[ p + 1 ] - y ) < 20 ) {
							hidden = true
							break
						}
					}
				}

				const style = label.element.style
				if( hidden ) {
					style.opacity = '0'
					style.visibility = 'hidden'
					continue
				}

				placed.push( x, y )
				const depth_fade = Math.max( 0, Math.min( 1, 1.65 - distance / 12 ) )
				style.visibility = 'visible'
				style.opacity = String( ( label.strong ? 1 : 0.55 + depth_fade * 0.45 ) * opacity )
				style.transform = `translate3d(${ Math.round( x ) }px, ${ Math.round( y ) }px, 0) translate(-50%, -140%)`
			}
		}

		/* state */

		const fade = { graph: 0, ambient: 1 }
		let theme: 'light' | 'dark' | null = null
		let colors = palette( 'light' )
		let ambient = null as null | ReturnType< typeof build_ambient >
		let cloud = null as null | Cloud
		let last = null as null | $raggu_web_front_scene_state
		let reset_token = -1
		let selected = null as string | null
		let idle = 0
		let has_focus = false
		const focus_target = new THREE.Vector3()
		const origin = new THREE.Vector3()
		const stage_rect = { x: 0, y: 0, width: 0, height: 0 }

		function sync( state: $raggu_web_front_scene_state ) {

			if( state.theme !== theme ) {
				theme = state.theme
				colors = palette( theme )
				if( ambient ) {
					scene.remove( ambient.group )
					ambient.dispose()
				}
				ambient = build_ambient( colors )
				scene.add( ambient.group )
				if( cloud ) {
					scene.remove( cloud.group )
					cloud.dispose()
					cloud = null
				}
			}

			const shown = state.shown
			if( cloud && ( !shown || cloud.model !== shown.model || cloud.positions !== shown.positions ) ) {
				scene.remove( cloud.group )
				cloud.dispose()
				cloud = null
				labels_layer.textContent = ''
				labels = []
			}

			if( !cloud && shown ) {
				cloud = build_cloud( shown.model, shown.positions, colors )
				scene.add( cloud.group )
				last = null
			}

			if( cloud && state !== last ) {
				paint( cloud, state )
				build_labels( cloud, state )
			}

			if( state.selected !== selected || ( cloud && last === null ) ) {
				selected = state.selected
				const index = selected && cloud ? ( cloud.model.index_of.get( selected ) ?? -1 ) : -1
				if( index >= 0 && cloud ) {
					focus_target.set( cloud.positions[ index * 3 ], cloud.positions[ index * 3 + 1 ], cloud.positions[ index * 3 + 2 ] )
					has_focus = true
					idle = 0
				} else {
					has_focus = false
				}
			}

			if( state.reset_token !== reset_token ) {
				if( reset_token >= 0 ) has_focus = false
				reset_token = state.reset_token
			}

			orbit.zoom = state.mode === 'graph'
			last = state
		}

		/* picking */

		function pick( event: PointerEvent | MouseEvent ) {
			if( !cloud ) return null
			const rect = canvas.getBoundingClientRect()
			pointer.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1
			pointer.y = -( ( event.clientY - rect.top ) / rect.height ) * 2 + 1
			raycaster.params.Points!.threshold = Math.max( 0.05, camera.position.length() * 0.014 )
			raycaster.setFromCamera( pointer, camera )
			const hit = raycaster.intersectObject( cloud.points, false )[ 0 ]
			if( !hit || hit.index === undefined ) return null
			return cloud.model.nodes[ hit.index ] ?? null
		}

		let hovered = null as string | null

		const touches = new Map< number, { x: number, y: number } >()
		let pinch = 0

		const spread = () => {
			const [ a, b ] = [ ... touches.values() ]
			return Math.hypot( a.x - b.x, a.y - b.y )
		}

		const on_down = ( event: PointerEvent ) => {
			touches.set( event.pointerId, { x: event.clientX, y: event.clientY } )
			orbit.pressed = { x: event.clientX, y: event.clientY, last_x: event.clientX, last_y: event.clientY }
			orbit.dragging = touches.size === 1
			pinch = touches.size === 2 ? spread() : 0
			idle = 0
			if( event.isTrusted ) canvas.setPointerCapture( event.pointerId )
			if( hovered ) {
				hovered = null
				host.hover( null )
			}
		}

		const on_move = ( event: PointerEvent ) => {

			idle = 0

			if( touches.has( event.pointerId ) ) touches.set( event.pointerId, { x: event.clientX, y: event.clientY } )

			if( touches.size === 2 ) {
				const next = spread()
				if( pinch > 0 && next > 0 && orbit.zoom ) orbit.scale *= pinch / next
				pinch = next
				return
			}

			if( orbit.dragging && orbit.pressed ) {
				const dx = event.clientX - orbit.pressed.last_x
				const dy = event.clientY - orbit.pressed.last_y
				orbit.pressed.last_x = event.clientX
				orbit.pressed.last_y = event.clientY
				orbit.theta -= 2 * Math.PI * dx / canvas.clientHeight * 0.55
				orbit.phi -= 2 * Math.PI * dy / canvas.clientHeight * 0.55
				return
			}

			const node = pick( event )
			const id = node?.id ?? null
			if( id === hovered ) return
			hovered = id
			host.hover( id )
		}

		const on_up = ( event: PointerEvent ) => {
			touches.delete( event.pointerId )
			pinch = 0
			orbit.dragging = false
			const [ rest ] = [ ... touches.values() ]
			if( rest && orbit.pressed ) {
				orbit.pressed.last_x = rest.x
				orbit.pressed.last_y = rest.y
				orbit.dragging = touches.size === 1
			}
			if( canvas.hasPointerCapture( event.pointerId ) ) canvas.releasePointerCapture( event.pointerId )
		}

		const on_leave = () => {
			if( !hovered ) return
			hovered = null
			host.hover( null )
		}

		const on_click = ( event: MouseEvent ) => {
			const origin_point = orbit.pressed
			if( origin_point && Math.hypot( event.clientX - origin_point.x, event.clientY - origin_point.y ) > 4 ) return
			const node = pick( event )
			if( !node ) return
			host.select( last?.selected === node.id ? null : node.id )
		}

		const on_wheel = ( event: WheelEvent ) => {
			if( !orbit.zoom ) return
			event.preventDefault()
			idle = 0
			// As in three's OrbitControls: the wheel away from you (deltaY < 0)
			// brings the camera closer, so the radius shrinks.
			const scale = Math.pow( 0.95, 0.7 * Math.abs( event.deltaY * 0.01 ) )
			if( event.deltaY < 0 ) orbit.scale *= scale
			else if( event.deltaY > 0 ) orbit.scale /= scale
		}

		canvas.addEventListener( 'pointerdown', on_down )
		canvas.addEventListener( 'pointermove', on_move )
		canvas.addEventListener( 'pointerup', on_up )
		canvas.addEventListener( 'pointercancel', on_up )
		canvas.addEventListener( 'pointerleave', on_leave )
		canvas.addEventListener( 'click', on_click )
		canvas.addEventListener( 'wheel', on_wheel, { passive: false } )

		/* loop */

		let frame = 0
		let previous = performance.now()
		const started = previous

		const tick = ( now: number ) => {

			frame = requestAnimationFrame( tick )

			const delta = Math.min( 0.1, ( now - previous ) / 1000 )
			previous = now

			const state = host.state()
			sync( state )

			const graph_ready = state.mode === 'graph' && !!state.shown
			const graph_target = graph_ready && state.graph_visible ? 1 : 0
			const ambient_target = state.mode === 'ambient' ? 0.42 : graph_ready ? 0 : 0.5
			const rate = Math.min( 1, delta * 2.6 )
			fade.graph += ( graph_target - fade.graph ) * rate
			fade.ambient += ( ambient_target - fade.ambient ) * rate

			const scale = $raggu_web_front_scene_point_scale( size.height, renderer.getPixelRatio(), camera.fov )

			if( ambient ) {
				const { materials, group } = ambient
				materials.point.uniforms.uScale.value = scale
				materials.halo.uniforms.uScale.value = scale
				materials.point.uniforms.uOpacity.value = fade.ambient
				materials.halo.uniforms.uOpacity.value = fade.ambient
				materials.line.uniforms.uOpacity.value = fade.ambient
				group.visible = fade.ambient > 0.004
				group.rotation.y += delta * 0.045
				group.rotation.x = Math.sin( ( now - started ) / 1000 * 0.09 ) * 0.16
			}

			if( cloud ) {

				const { materials, group } = cloud
				materials.point.uniforms.uScale.value = scale
				materials.halo.uniforms.uScale.value = scale
				materials.point.uniforms.uOpacity.value = fade.graph
				materials.halo.uniforms.uOpacity.value = fade.graph
				materials.line.uniforms.uOpacity.value = fade.graph
				group.visible = fade.graph > 0.004

				const distance = camera.position.distanceTo( orbit.target )
				const near = Math.max( 0.1, distance - cloud.radius * 1.05 )
				const far = distance + cloud.radius * 1.25
				for( const material of [ materials.point, materials.halo, materials.line ] ) {
					material.uniforms.uNear.value = near
					material.uniforms.uFar.value = far
				}

				if( cloud.easing ) cloud.easing = ease( cloud, delta )

				const target = state.stage ?? { x: 0, y: 0, width: size.width, height: size.height }
				const move = Math.min( 1, delta * 3.4 )
				if( stage_rect.width === 0 ) Object.assign( stage_rect, target )
				else {
					stage_rect.x += ( target.x - stage_rect.x ) * move
					stage_rect.y += ( target.y - stage_rect.y ) * move
					stage_rect.width += ( target.width - stage_rect.width ) * move
					stage_rect.height += ( target.height - stage_rect.height ) * move
				}

				const offset = $raggu_web_front_scene_frame( stage_rect, size )
				const identity = !offset || (
					Math.abs( offset.offset_x ) < 1 &&
					Math.abs( offset.offset_y ) < 1 &&
					Math.abs( offset.full_width - size.width ) < 1
				)

				if( offset && !identity ) {
					camera.setViewOffset( offset.full_width, offset.full_height, offset.offset_x, offset.offset_y, offset.width, offset.height )
				} else if( camera.view?.enabled ) {
					camera.clearViewOffset()
				}

				orbit.target.lerp( has_focus ? focus_target : origin, Math.min( 1, delta * 2.4 ) )
				idle += delta
				orbit.auto_rotate = idle > 2.6
				orbit.auto_speed = 0.32

			} else {

				stage_rect.width = 0
				if( camera.view?.enabled ) camera.clearViewOffset()

			}

			orbit_update()

			if( cloud ) place_labels( cloud, fade.graph )

			canvas.style.cursor = hovered ? 'pointer' : ''

			renderer.render( scene, camera )
		}

		frame = requestAnimationFrame( tick )

		return {
			destroy() {
				cancelAnimationFrame( frame )
				observer.disconnect()
				canvas.removeEventListener( 'pointerdown', on_down )
				canvas.removeEventListener( 'pointermove', on_move )
				canvas.removeEventListener( 'pointerup', on_up )
				canvas.removeEventListener( 'pointercancel', on_up )
				canvas.removeEventListener( 'pointerleave', on_leave )
				canvas.removeEventListener( 'click', on_click )
				canvas.removeEventListener( 'wheel', on_wheel )
				ambient?.dispose()
				cloud?.dispose()
				renderer.dispose()
				canvas.remove()
				labels_layer.remove()
			},
		}

	}

}
