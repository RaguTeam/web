namespace $ {

	export type $raggu_web_front_viewer_entry = {
		id: string
		role: 'user' | 'assistant'
		content: string
		trace?: $raggu_web_front_graph_trace | null
	}

	export type $raggu_web_front_viewer_shown = {
		corpus: string
		model: $raggu_web_front_graph_model
		positions: Float32Array
	}

	let $raggu_web_front_viewer_counter = 0

	export class $raggu_web_front_viewer extends $mol_object {

		corpus( next?: string ) {
			return this.$.$mol_state_arg.value( 'corpus', next ) ?? ''
		}

		mode() {
			return this.corpus() ? 'graph' : 'ambient'
		}

		settings() {
			return $raggu_web_front_lib_settings.value()
		}

		@ $mol_mem_key
		graph_visible( corpus: string, next?: boolean ) {
			return next ?? true
		}

		@ $mol_mem_key
		chat_visible( corpus: string, next?: boolean ) {
			return next ?? false
		}

		graph_open( next?: boolean ) {
			return this.graph_visible( this.corpus(), next )
		}

		chat_open( next?: boolean ) {
			return this.chat_visible( this.corpus(), next )
		}

		toggle_graph() {
			const next = !this.graph_open()
			if( !next && !this.chat_open() ) return
			this.graph_open( next )
		}

		toggle_chat() {
			const next = !this.chat_open()
			if( !next && !this.graph_open() ) return
			this.chat_open( next )
		}

		@ $mol_mem_key
		selected_in( corpus: string, next?: string | null ) {
			return next ?? null
		}

		selected( next?: string | null ) {
			return this.selected_in( this.corpus(), next )
		}

		@ $mol_mem
		hover( next?: string | null ) {
			return next ?? null
		}

		@ $mol_mem_key
		search_in( corpus: string, next?: string ) {
			return next ?? ''
		}

		search( next?: string ) {
			return this.search_in( this.corpus(), next )
		}

		@ $mol_mem_key
		types_in( corpus: string, next?: readonly string[] ) {
			return next ?? []
		}

		types( next?: readonly string[] ) {
			return this.types_in( this.corpus(), next )
		}

		@ $mol_mem_key
		communities_in( corpus: string, next?: readonly string[] ) {
			return next ?? []
		}

		communities( next?: readonly string[] ) {
			return this.communities_in( this.corpus(), next )
		}

		@ $mol_mem_key
		highlight_in( corpus: string, next?: readonly string[] ) {
			return next ?? []
		}

		highlight( next?: readonly string[] ) {
			return this.highlight_in( this.corpus(), next )
		}

		toggle_type( name: string ) {
			const types = this.types()
			this.types( types.includes( name ) ? types.filter( item => item !== name ) : [ ... types, name ] )
		}

		toggle_community( id: string ) {
			const list = this.communities()
			this.communities( list.includes( id ) ? list.filter( item => item !== id ) : [ ... list, id ] )
		}

		filtering() {
			return this.search().trim().length > 0 || this.types().length > 0 || this.communities().length > 0
		}

		clear_filters() {
			this.search( '' )
			this.types( [] )
			this.communities( [] )
			this.highlight( [] )
		}

		@ $mol_mem
		stage( next?: $raggu_web_front_scene_rect | null ) {
			return next ?? null
		}

		@ $mol_mem
		reset_token( next?: number ) {
			return next ?? 0
		}

		recentre() {
			this.selected( null )
			this.reset_token( this.reset_token() + 1 )
		}

		@ $mol_mem_key
		whole( corpus: string, next?: $raggu_web_front_graph_response | null ) {
			return next ?? null
		}

		@ $mol_mem
		response() {
			const corpus = this.corpus()
			if( !corpus ) return null
			const whole = this.whole( corpus )
			if( whole ) return whole
			return $raggu_web_front_data.graph( `${ corpus }|${ this.settings().graphLimit }` )
		}

		@ $mol_mem
		model() {
			const response = this.response()
			return response ? $raggu_web_front_graph_build( response ) : null
		}

		@ $mol_mem
		progress( next?: number ) {
			return next ?? 0
		}

		layout_task = null as null | { cancel: ()=> void }

		@ $mol_mem
		positions() {

			const model = this.model()
			if( !model ) return null

			return $mol_wire_sync( this ).solve( model )
		}

		async solve( model: $raggu_web_front_graph_model ) {
			this.layout_task?.cancel()
			const task = $raggu_web_front_graph_layout( model, ratio => this.progress( ratio ) )
			this.layout_task = task
			return await task.promise
		}

		solved = null as null | $raggu_web_front_viewer_shown

		@ $mol_mem
		shown(): $raggu_web_front_viewer_shown | null {

			const corpus = this.corpus()
			if( !corpus ) return this.solved = null

			try {

				const model = this.model()
				const positions = this.positions()
				if( !model || !positions ) return null
				return this.solved = { corpus, model, positions }

			} catch( error ) {

				if( !$mol_promise_like( error ) ) throw error
				if( this.solved?.corpus === corpus ) return this.solved
				this.solved = null
				$mol_fail_hidden( error )

			}

		}

		shown_now() {
			return $raggu_web_front_data_ready( ()=> this.shown() )
		}

		graph_state() {
			return $raggu_web_front_data_state( ()=> this.response() )
		}

		solving() {
			if( !this.corpus() ) return false
			const graph = this.graph_state()
			if( graph.pending ) return true
			if( graph.error ) return false
			return $raggu_web_front_data_ready( ()=> this.positions() ) === null
		}

		cold() {
			return this.solving() && !this.shown_now()
		}

		warm() {
			return this.solving() && !!this.shown_now()
		}

		@ $mol_mem_key
		entries( corpus: string, next?: readonly $raggu_web_front_viewer_entry[] ) {
			return next ?? []
		}

		@ $mol_mem_key
		pending( corpus: string, next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem_key
		partial( corpus: string, next?: string | null ) {
			return next ?? null
		}

		@ $mol_mem_key
		failure( corpus: string, next?: string | null ) {
			return next ?? null
		}

		@ $mol_mem_key
		started( corpus: string, next?: number | null ) {
			return next ?? null
		}

		aborts = new Map< string, AbortController >()

		next_id( prefix: string ) {
			return `${ prefix }-${ ++ $raggu_web_front_viewer_counter }`
		}

		keep_partial( corpus: string ) {
			const partial = this.partial( corpus )
			const entries = this.entries( corpus )
			return partial
				? [ ... entries, { id: this.next_id( 'assistant' ), role: 'assistant' as const, content: partial, trace: null } ]
				: entries
		}

		stop( corpus = this.corpus() ) {
			const entries = this.keep_partial( corpus )
			this.aborts.get( corpus )?.abort()
			this.aborts.delete( corpus )
			this.entries( corpus, entries )
			this.pending( corpus, false )
			this.partial( corpus, null )
			this.started( corpus, null )
		}

		clear_thread( corpus = this.corpus() ) {
			this.aborts.get( corpus )?.abort()
			this.aborts.delete( corpus )
			this.entries( corpus, [] )
			this.pending( corpus, false )
			this.partial( corpus, null )
			this.failure( corpus, null )
			this.started( corpus, null )
		}

		ask( text: string ) {
			this.chat_open( true )
			this.send( text )
		}

		send( text: string ) {

			const corpus = this.corpus()
			const trimmed = text.trim()
			if( !corpus || !trimmed || this.pending( corpus ) ) return

			const history = this.entries( corpus ).slice( -8 ).map( entry => ( { role: entry.role, content: entry.content } ) )

			this.entries( corpus, [ ... this.entries( corpus ), { id: this.next_id( 'user' ), role: 'user', content: trimmed } ] )
			this.pending( corpus, true )
			this.failure( corpus, null )
			this.started( corpus, Date.now() )

			const settings = this.settings()
			const body = {
				message: trimmed,
				history,
				engine: settings.useGraph ? 'mix' : 'naive',
				use_query_plan: settings.queryPlan,
				top_k: settings.topK,
				rerank: settings.rerank,
				include_trace: true,
				locale: $raggu_web_front_lib_lang(),
			}

			const controller = new AbortController
			this.aborts.get( corpus )?.abort()
			this.aborts.set( corpus, controller )

			let received = ''
			let shown = 0
			let frame = 0
			let finish = null as null | ( ()=> void )

			const type = () => {
				frame = 0
				if( this.aborts.get( corpus ) !== controller ) return
				if( shown < received.length ) {
					shown = Math.min( received.length, shown + Math.max( 2, Math.ceil( ( received.length - shown ) / 14 ) ) )
					if( /[\uDC00-\uDFFF]/.test( received[ shown ] ?? '' ) ) shown += 1
					this.partial( corpus, received.slice( 0, shown ) )
				}
				if( shown < received.length ) frame = requestAnimationFrame( type )
				else finish?.()
			}

			const on_delta = ( piece: string ) => {
				received += piece
				if( !frame ) frame = requestAnimationFrame( type )
			}

			$raggu_web_front_viewer_ask( corpus, body, controller.signal, on_delta ).then(
				response => {
					if( this.aborts.get( corpus ) !== controller ) return
					const message = response.message
					finish = ()=> {
						cancelAnimationFrame( frame )
						this.aborts.delete( corpus )
						this.entries( corpus, [
							... this.entries( corpus ),
							{ id: this.next_id( 'assistant' ), role: 'assistant', content: message.content, trace: message.trace ?? null },
						] )
						this.pending( corpus, false )
						this.partial( corpus, null )
						this.started( corpus, null )
						this.failure( corpus, null )
						this.highlight_in( corpus, message.trace?.highlight?.node_ids ?? [] )
					}
					if( !received || !message.content.startsWith( received.slice( 0, shown ) ) ) return finish()
					received = message.content
					if( !frame ) frame = requestAnimationFrame( type )
				},
				error => {
					cancelAnimationFrame( frame )
					if( error instanceof DOMException && error.name === 'AbortError' ) return
					if( this.aborts.get( corpus ) !== controller ) return
					this.aborts.delete( corpus )
					this.entries( corpus, this.keep_partial( corpus ) )
					this.pending( corpus, false )
					this.partial( corpus, null )
					this.started( corpus, null )
					this.failure( corpus, $raggu_web_front_viewer_failure( error ) )
				},
			)

		}

		/** Pulls the rest of the corpus community by community: the gateway has no paging and caps a request at 5000. */
		async load_whole( on_progress: ( ratio: number )=> void ) {

			const corpus = this.corpus()
			const seed = $raggu_web_front_data_ready( ()=> this.response() )
			if( !corpus || !seed ) throw new Error( 'nothing to extend' )

			const get = async< Result >( path: string ) => {
				const response = await $raggu_web_front_data.request( path, { headers: { accept: 'application/json' } } )
				if( !response.ok ) throw new Error( response.statusText )
				return await response.json() as Result
			}

			const id = encodeURIComponent( corpus )
			const { communities } = await get< { communities: $raggu_web_front_graph_community[] } >( `/datasets/${ id }/graph/communities` )
			if( communities.length === 0 ) return { complete: false, clipped: [] as string[] }

			const nodes = new Map( seed.nodes.map( node => [ node.id, node ] ) )
			const edges = new Map( seed.edges.map( edge => [ edge.id, edge ] ) )

			const batches = [] as $raggu_web_front_graph_community[][]
			let batch = [] as $raggu_web_front_graph_community[]
			let size = 0
			for( const community of [ ... communities ].sort( ( a, b ) => b.size - a.size ) ) {
				if( community.size >= 4200 ) {
					batches.push( [ community ] )
					continue
				}
				if( size + community.size > 4200 && batch.length > 0 ) {
					batches.push( batch )
					batch = []
					size = 0
				}
				batch.push( community )
				size += community.size
			}
			if( batch.length > 0 ) batches.push( batch )

			const clipped = [] as string[]
			let complete = true

			for( let index = 0; index < batches.length; index++ ) {

				if( nodes.size >= 12000 ) {
					complete = false
					break
				}

				const part = batches[ index ]
				const query = [ 'limit=5000', 'include_communities=false', ... part.map( item => `community_ids=${ encodeURIComponent( item.id ) }` ) ].join( '&' )
				const page = await get< $raggu_web_front_graph_response >( `/datasets/${ id }/graph?${ query }` )

				for( const node of page.nodes ) nodes.set( node.id, node )
				for( const edge of page.edges ) edges.set( edge.id, edge )

				const wanted = part.reduce( ( sum, item ) => sum + item.size, 0 )
				if( page.meta.returned_nodes < Math.min( wanted, 5000 ) ) clipped.push( ... part.map( item => item.id ) )

				on_progress( ( index + 1 ) / batches.length )
			}

			this.whole( corpus, {
				nodes: [ ... nodes.values() ],
				edges: [ ... edges.values() ],
				communities,
				meta: { ... seed.meta, returned_nodes: nodes.size, returned_edges: edges.size },
			} )

			return { complete, clipped }
		}

	}

	export const $raggu_web_front_viewer_limits = [ 'rate_limited', 'client_daily_limit_reached', 'daily_limit_reached' ]

	/** A question limit is not an outage: its gateway code survives, anything else is just `failed`. */
	export function $raggu_web_front_viewer_failure( error: unknown ) {

		if( !( error instanceof Error ) ) return 'failed'

		try {
			const code = ( JSON.parse( error.message ) as { detail?: { code?: unknown } } ).detail?.code
			return typeof code === 'string' && $raggu_web_front_viewer_limits.includes( code ) ? code : 'failed'
		} catch {
			return 'failed'
		}

	}

	export async function $raggu_web_front_viewer_ask(
		corpus: string,
		body: object,
		signal: AbortSignal,
		on_delta: ( text: string )=> void,
	): Promise< $raggu_web_front_graph_answer > {

		const base = `/datasets/${ encodeURIComponent( corpus ) }/agent/messages`

		const plain = async () => {
			const response = await $raggu_web_front_data.request( base, {
				method: 'POST',
				headers: { accept: 'application/json', 'content-type': 'application/json' },
				body: JSON.stringify( body ),
				signal,
			} )
			if( !response.ok ) throw new Error( ( await response.text().catch( ()=> '' ) ).slice( 0, 240 ) || response.statusText )
			return await response.json() as $raggu_web_front_graph_answer
		}

		const response = await $raggu_web_front_data.request( base + '/stream', {
			method: 'POST',
			headers: { accept: 'text/event-stream', 'content-type': 'application/json' },
			body: JSON.stringify( body ),
			signal,
		} )

		if( response.status === 404 || response.status === 405 ) {
			const text = await response.text().catch( ()=> '' )
			if( !text.includes( 'dataset_not_found' ) ) return plain()
			throw new Error( text.slice( 0, 240 ) )
		}

		if( !response.ok || !response.body ) {
			throw new Error( ( await response.text().catch( ()=> '' ) ).slice( 0, 240 ) || response.statusText )
		}

		let result = null as $raggu_web_front_graph_answer | null
		let failure = null as Error | null

		const parser = $raggu_web_front_lib_sse( ( { event, data } ) => {
			if( event === 'delta' ) on_delta( ( JSON.parse( data ) as { text: string } ).text )
			else if( event === 'message' ) result = JSON.parse( data )
			else if( event === 'error' ) failure = new Error( ( JSON.parse( data ) as { message?: string } ).message ?? 'stream failed' )
		} )

		const reader = response.body.pipeThrough( new TextDecoderStream() ).getReader()
		while( true ) {
			const { done, value } = await reader.read()
			if( done ) break
			parser.push( value )
		}
		parser.end()

		if( failure ) throw failure
		if( !result ) throw new Error( 'stream ended early' )

		return result
	}

}
