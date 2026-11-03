namespace $.$$ {

	export class $raggu_web_front_home_constellation extends $.$raggu_web_front_home_constellation {

		@ $mol_mem
		shape() {

			const hash01 = $raggu_web_front_graph_hash01
			const seed = this.seed()
			const nodes = this.nodes()
			const edges = this.edges()

			let key = 0
			for( let i = 0; i < seed.length; i++ ) key = ( Math.imul( key, 31 ) + seed.charCodeAt( i ) ) | 0

			const density = Math.min( 1, Math.log10( Math.max( 10, nodes ) ) / 5 )
			const count = Math.round( 18 + density * 30 )
			const points = [] as { x: number, y: number, r: number, hub: boolean }[]

			for( let i = 0; i < count; i++ ) {
				const angle = hash01( key + i * 7 ) * Math.PI * 2
				const radius = Math.pow( hash01( key + i * 13 + 1 ), 0.62 ) * 46
				const wobble = ( hash01( key + i * 23 + 5 ) - 0.5 ) * 8
				points.push( {
					x: 50 + Math.cos( angle ) * radius + wobble,
					y: 50 + Math.sin( angle ) * radius * 0.74 + wobble * 0.6,
					r: 0.9 + hash01( key + i * 41 + 9 ) * 2.6,
					hub: hash01( key + i * 57 + 3 ) > 0.88,
				} )
			}

			const ratio = Math.min( 2.4, edges / Math.max( 1, nodes ) )
			const wanted = Math.round( count * ratio * 0.8 )
			const links = [] as [ number, number ][]

			for( let i = 0; i < count && links.length < wanted; i++ ) {
				for( let step = 1; step <= 3 && links.length < wanted; step++ ) {
					const j = ( i + step + Math.floor( hash01( key + i * 91 + step ) * 5 ) ) % count
					if( j === i ) continue
					const a = points[ i ]
					const b = points[ j ]
					if( Math.hypot( a.x - b.x, a.y - b.y ) < 26 ) links.push( [ i, j ] )
				}
			}

			return { points, links }
		}

		links() {
			const { points, links } = this.shape()
			return links.map( ( [ a, b ] ) => `M${ points[ a ].x } ${ points[ a ].y }L${ points[ b ].x } ${ points[ b ].y }` ).join( '' )
		}

		circles( hub: boolean ) {
			return this.shape().points
				.filter( point => point.hub === hub )
				.map( ( { x, y, r } ) => `M${ x - r } ${ y }a${ r } ${ r } 0 1 0 ${ 2 * r } 0a${ r } ${ r } 0 1 0 ${ -2 * r } 0` )
				.join( '' )
		}

		points() {
			return this.circles( false )
		}

		hubs() {
			return this.circles( true )
		}

	}

}
