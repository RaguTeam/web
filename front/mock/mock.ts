namespace $ {

	type $raggu_web_front_mock_answer = $raggu_web_front_graph_answer & { question: string }

	export class $raggu_web_front_mock extends $mol_object {

		static enabled() {
			return Boolean( $mol_state_arg.value( 'mock' ) )
		}

		static root() {
			return 'raggu/web/front/mock/fixtures/'
		}

		static files = new Map< string, Promise< any > >()

		static file< Result >( name: string ): Promise< Result > {

			let found = this.files.get( name )
			if( found ) return found

			found = fetch( this.root() + name + '.json' ).then( response => {
				if( !response.ok ) throw new Error( `mock ${ name }: ${ response.status }` )
				return response.json()
			} )
			found.catch( ()=> this.files.delete( name ) )

			this.files.set( name, found )
			return found
		}

		static async json< Result >( path: string ) {
			return await ( await this.response( path ) ).json() as Result
		}

		static async response( path: string, init?: RequestInit ): Promise< Response > {

			const url = new URL( path, 'http://mock' )
			const parts = url.pathname.split( '/' ).filter( Boolean ).map( decodeURIComponent )
			const query = url.searchParams

			if( parts.length === 1 ) return this.reply( await this.file( `datasets.${ this.lang( query.get( 'locale' ) ) }` ) )

			const [ , corpus, section, kind, node ] = parts

			if( section === 'graph' && !kind ) return this.reply( await this.graph( corpus, query ) )
			if( section === 'graph' && kind === 'communities' ) return this.reply( await this.file( `${ corpus }.communities` ) )
			if( section === 'graph' && kind === 'nodes' ) return this.reply( await this.node( corpus, node ) )
			if( section === 'agent' && kind === 'suggestions' ) return this.reply( await this.file( `${ corpus }.suggestions.${ this.lang( query.get( 'locale' ) ) }` ) )

			if( section === 'agent' && kind === 'messages' ) {
				const body = JSON.parse( String( init?.body ?? '{}' ) ) as { locale?: string }
				const answer = await this.file< $raggu_web_front_mock_answer >( `${ corpus }.answer.${ this.lang( body.locale ) }` )
				if( node === 'stream' ) return this.stream( answer, init?.signal ?? undefined )
				return this.reply( { message: this.fresh( answer ) } )
			}

			return new Response( 'mock: unknown route', { status: 404 } )
		}

		static lang( raw?: string | null ) {
			return raw === 'ru' ? 'ru' : 'en'
		}

		static reply( data: unknown ) {
			return new Response( JSON.stringify( data ), { headers: { 'content-type': 'application/json' } } )
		}

		static fresh( answer: $raggu_web_front_mock_answer ) {
			return { ... answer.message, id: `mock-${ Date.now() }`, created_at: new Date().toISOString() }
		}

		static async graph( corpus: string, query: URLSearchParams ) {

			const full = await this.file< $raggu_web_front_graph_response >( `${ corpus }.graph` )
			const wanted = new Set( query.getAll( 'community_ids' ) )
			const limit = Number( query.get( 'limit' ) ) || full.nodes.length

			const nodes = full.nodes
				.filter( item => wanted.size === 0 || wanted.has( String( item.community_id ) ) )
				.slice( 0, limit )

			const ids = new Set( nodes.map( item => item.id ) )
			const edges = full.edges.filter( item => ids.has( item.source ) && ids.has( item.target ) )

			return {
				nodes,
				edges,
				communities: query.get( 'include_communities' ) === 'false' ? [] : full.communities,
				meta: { ... full.meta, returned_nodes: nodes.length, returned_edges: edges.length, limit },
			}
		}

		static async node( corpus: string, id: string ): Promise< $raggu_web_front_graph_detail > {

			const recorded = await this.file< Record< string, $raggu_web_front_graph_detail > >( `${ corpus }.nodes` )
			if( recorded[ id ] ) return recorded[ id ]

			const graph = await this.file< $raggu_web_front_graph_response >( `${ corpus }.graph` )
			const node = graph.nodes.find( item => item.id === id )
			if( !node ) throw new Error( `mock: no node ${ id }` )

			const labels = new Map( graph.nodes.map( item => [ item.id, item.label ] ) )
			const relation = ( edge: $raggu_web_front_graph_edge, direction: 'incoming' | 'outgoing' ) => {
				const other = direction === 'incoming' ? edge.source : edge.target
				return { ... edge, direction, other_node_id: other, other_node_label: labels.get( other ) ?? other }
			}

			return {
				node,
				incoming_relations: graph.edges.filter( edge => edge.target === id ).map( edge => relation( edge, 'incoming' ) ),
				outgoing_relations: graph.edges.filter( edge => edge.source === id ).map( edge => relation( edge, 'outgoing' ) ),
				provenance_chunks: [],
			}
		}

		static stream( answer: $raggu_web_front_mock_answer, signal?: AbortSignal ) {

			const encoder = new TextEncoder
			const pieces = answer.message.content.match( /\S+\s*/g ) ?? []
			const event = ( name: string, data: unknown ) => encoder.encode( `event: ${ name }\ndata: ${ JSON.stringify( data ) }\n\n` )

			let timer = 0 as any
			let index = 0

			const body = new ReadableStream< Uint8Array >( {
				start: controller => {
					const tick = () => {
						if( signal?.aborted ) return controller.error( new DOMException( 'aborted', 'AbortError' ) )
						if( index >= pieces.length ) {
							controller.enqueue( event( 'message', { message: this.fresh( answer ) } ) )
							return controller.close()
						}
						controller.enqueue( event( 'delta', { text: pieces.slice( index, index + 3 ).join( '' ) } ) )
						index += 3
						timer = setTimeout( tick, 40 )
					}
					timer = setTimeout( tick, 600 )
				},
				cancel: ()=> clearTimeout( timer ),
			} )

			return new Response( body, { headers: { 'content-type': 'text/event-stream' } } )
		}

	}

}
