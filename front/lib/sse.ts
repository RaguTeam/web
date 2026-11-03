namespace $ {

	export type $raggu_web_front_lib_sse_event = { event: string, data: string }

	export function $raggu_web_front_lib_sse( on_event: ( event: $raggu_web_front_lib_sse_event )=> void ) {

		let buffer = ''

		const flush = ( block: string ) => {

			let event = 'message'
			const data: string[] = []

			for( const line of block.split( /\r?\n/ ) ) {
				if( line.startsWith( 'event:' ) ) event = line.slice( 6 ).trim()
				else if( line.startsWith( 'data:' ) ) data.push( line.slice( 5 ).replace( /^ /, '' ) )
			}

			if( data.length > 0 ) on_event( { event, data: data.join( '\n' ) } )

		}

		return {
			push( piece: string ) {
				buffer += piece
				const blocks = buffer.split( /\r?\n\r?\n/ )
				buffer = blocks.pop() ?? ''
				for( const block of blocks ) flush( block )
			},
			end() {
				flush( buffer )
				buffer = ''
			},
		}

	}

}
