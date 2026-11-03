namespace $.$$ {

	export class $raggu_web_front_corpus_chat extends $.$raggu_web_front_corpus_chat {

		corpus() {
			return this.viewer().corpus()
		}

		entries() {
			return this.viewer().entries( this.corpus() )
		}

		pending() {
			return this.viewer().pending( this.corpus() )
		}

		partial() {
			return this.viewer().partial( this.corpus() )
		}

		failure() {
			return this.viewer().failure( this.corpus() )
		}

		engine() {
			return $raggu_web_front_lib_settings.value().useGraph ? 'mix' : 'naive'
		}

		head_tools() {
			return [ this.Engine(), ... this.entries().length ? [ this.Sweep() ] : [], this.Hide() ]
		}

		sweep() {
			this.viewer().clear_thread()
		}

		hide() {
			this.viewer().chat_open( false )
		}

		scroll_content() {
			if( this.entries().length === 0 && !this.pending() ) return [ this.Empty() ]
			return [ this.Thread() ]
		}

		thread() {
			return [
				... this.entries().map( ( entry, index ) => entry.role === 'user' ? this.User( index ) : this.Agent( index ) ),
				... this.pending() ? [ this.partial() ? this.Streaming() : this.Pending() ] : [],
				... this.failure() ? [ this.Failure() ] : [],
			]
		}

		entry( index: number ) {
			return this.entries()[ index ]
		}

		entry_text( index: number ) {
			return this.entry( index ).content
		}

		@ $mol_mem_key
		segments( index: number ) {
			const content = index < 0 ? this.partial() ?? '' : this.entry( index ).content
			return $raggu_web_front_lib_cite_parse( content, ( id, type ) => this.resolve( id, type ) )
		}

		resolve( id: string, type: $raggu_web_front_lib_cite_kind ) {
			const model = this.viewer().shown_now()?.model
			if( !model ) return undefined
			if( type === 'entity' ) {
				const index = model.index_of.get( id )
				return index === undefined ? undefined : model.nodes[ index ].label
			}
			if( type === 'relation' ) {
				const index = model.edge_index_of.get( id )
				return index === undefined ? undefined : $raggu_web_front_lib_relation_name( model.edges[ index ].relation_type )
			}
			return undefined
		}

		render_segments( index: number ) {
			return this.segments( index ).map( ( segment, position ) => {
				const key = `${ index }:${ position }`
				if( segment.kind === 'text' ) return segment.value
				if( segment.kind === 'strong' ) return this.Strong( key )
				return segment.type === 'entity' ? this.Ref( key ) : this.Ref_muted( key )
			} )
		}

		answer( index: number ) {
			return this.render_segments( index )
		}

		streaming_answer() {
			return [ ... this.render_segments( -1 ), this.Caret() ]
		}

		segment( key: string ) {
			const [ index, position ] = key.split( ':' ).map( Number )
			return this.segments( index )[ position ]
		}

		strong_text( key: string ) {
			const segment = this.segment( key )
			return segment.kind === 'strong' ? segment.value : ''
		}

		ref_id( key: string ) {
			const segment = this.segment( key )
			return segment.kind === 'ref' ? segment.id : ''
		}

		ref_text( key: string ) {
			const segment = this.segment( key )
			return segment.kind === 'ref' ? segment.text : ''
		}

		ref_pick( key: string ) {
			this.viewer().selected( this.ref_id( key ) )
		}

		trace( index: number ) {
			return this.entry( index ).trace ?? null
		}

		agent_sources( index: number ) {
			return this.trace( index ) ? [ this.Sources( index ) ] : []
		}

		sources_total( index: number ) {
			const trace = this.trace( index )!
			return ( trace.entities?.length ?? 0 ) + ( trace.relations?.length ?? 0 ) + ( trace.chunks?.length ?? 0 ) + ( trace.communities?.length ?? 0 )
		}

		sources_count( index: number ) {
			const total = this.sources_total( index )
			return total > 0 ? String( total ) : ''
		}

		sources_body( index: number ) {
			const trace = this.trace( index )!
			return [
				... trace.entities?.length ? [ this.Source_group( `${ index }:entities` ) ] : [],
				... trace.relations?.length ? [ this.Source_group( `${ index }:relations` ) ] : [],
				... trace.chunks?.length ? [ this.Source_group( `${ index }:chunks` ) ] : [],
				... this.sources_total( index ) === 0 ? [ this.No_sources( index ) ] : [],
			]
		}

		source_group_label( key: string ) {
			const kind = key.split( ':' )[ 1 ]
			if( kind === 'entities' ) return this.entities_label()
			if( kind === 'relations' ) return this.relations_label()
			return this.chunks_label()
		}

		source_group_items( key: string ) {
			const [ index, kind ] = key.split( ':' )
			const trace = this.trace( Number( index ) )!
			if( kind === 'entities' ) return ( trace.entities ?? [] ).slice( 0, 24 ).map( ( _, i ) => this.Source_entity( `${ index }:${ i }` ) )
			if( kind === 'relations' ) return ( trace.relations ?? [] ).slice( 0, 16 ).map( ( _, i ) => this.Source_relation( `${ index }:${ i }` ) )
			return ( trace.chunks ?? [] ).slice( 0, 5 ).map( ( _, i ) => this.Source_chunk( `${ index }:${ i }` ) )
		}

		pair( key: string ) {
			const [ index, i ] = key.split( ':' ).map( Number )
			return { trace: this.trace( index )!, i }
		}

		source_entity_text( key: string ) {
			const { trace, i } = this.pair( key )
			return trace.entities![ i ].label
		}

		source_entity_pick( key: string ) {
			const { trace, i } = this.pair( key )
			this.viewer().selected( trace.entities![ i ].id )
		}

		source_relation_text( key: string ) {
			const { trace, i } = this.pair( key )
			return $raggu_web_front_lib_relation_name( trace.relations![ i ].relation_type )
		}

		source_chunk_text( key: string ) {
			const { trace, i } = this.pair( key )
			const content = trace.chunks![ i ].content
			return content.slice( 0, 260 ) + ( content.length > 260 ? '…' : '' )
		}

		meta_list( index: number ) {
			const trace = this.trace( index )!
			return [
				[ this.engine_label(), trace.engine ],
				[ this.top_k_label(), String( trace.top_k ) ],
				[ this.rerank_label(), trace.rerank ? this.on_label() : this.off_label() ],
				[ this.retrieval_label(), $raggu_web_front_lib_ms( trace.timings.retrieval_ms ) ],
				[ this.generation_label(), $raggu_web_front_lib_ms( trace.timings.generation_ms ) ],
				[ this.total_label(), $raggu_web_front_lib_ms( trace.timings.total_ms ) ],
			]
		}

		meta_body( index: number ) {
			const trace = this.trace( index )!
			const plan = trace.query_plan?.used && trace.query_plan.sub_questions?.length
			return [
				this.Meta_title( index ),
				this.Meta_rows( index ),
				this.Meta_energy( index ),
				... plan ? [ this.Meta_plan( index ) ] : [],
			]
		}

		meta_rows( index: number ) {
			return this.meta_list( index ).map( ( _, row ) => this.Meta_row( `${ index }:${ row }` ) )
		}

		meta_row_label( key: string ) {
			const [ index, row ] = key.split( ':' ).map( Number )
			return this.meta_list( index )[ row ][ 0 ]
		}

		meta_row_value( key: string ) {
			const [ index, row ] = key.split( ':' ).map( Number )
			return this.meta_list( index )[ row ][ 1 ]
		}

		meta_energy( index: number ) {
			return $raggu_web_front_lib_watt_hours( this.trace( index )!.energy.watt_hours )
		}

		meta_plan( index: number ) {
			const questions = this.trace( index )!.query_plan?.sub_questions ?? []
			return questions.map( ( _, i ) => this.Plan_item( `${ index }:${ i }` ) )
		}

		plan_index( key: string ) {
			return `${ Number( key.split( ':' )[ 1 ] ) + 1 }.`
		}

		plan_text( key: string ) {
			const [ index, i ] = key.split( ':' ).map( Number )
			return ' ' + ( this.trace( index )!.query_plan?.sub_questions?.[ i ] ?? '' )
		}

		elapsed() {
			const started = this.viewer().started( this.corpus() )
			const now = this.$.$mol_state_time.now( 250 )
			const seconds = started ? Math.max( 0, Math.floor( ( now - started ) / 1000 ) ) : 0
			return this.elapsed_label().replace( '{n}', String( seconds ) )
		}

		failure_text() {
			switch( this.failure() ) {
				case 'rate_limited': return this.rate_limited_label()
				case 'client_daily_limit_reached': return this.client_daily_limit_label()
				case 'daily_limit_reached': return this.daily_limit_label()
				default: return this.failed_label()
			}
		}

		failure_content() {
			const limit = $raggu_web_front_viewer_limits.includes( this.failure() ?? '' )
			return limit ? [ this.Failure_title() ] : [ this.Failure_title(), this.Failure_hint() ]
		}

		suggestions() {
			const corpus = this.corpus()
			return $raggu_web_front_data_ready( ()=> $raggu_web_front_data.suggestions( `${ corpus }|${ $raggu_web_front_lib_lang() }` ) ) ?? []
		}

		starters() {
			if( this.entries().length > 0 ) return []
			return this.suggestions().slice( 0, 3 ).map( ( _, index ) => this.Starter( index ) )
		}

		starter_text( index: number ) {
			return this.suggestions()[ index ]
		}

		starter_send( index: number ) {
			this.send( this.suggestions()[ index ] )
		}

		@ $mol_mem
		draft( next?: string ) {
			return next ?? ''
		}

		draft_input( event: Event ) {
			this.draft( ( event.target as HTMLTextAreaElement ).value )
		}

		draft_key( event: KeyboardEvent ) {
			if( event.key !== 'Enter' || event.shiftKey ) return
			event.preventDefault()
			this.send( this.draft() )
		}

		submit( event: Event ) {
			event.preventDefault()
			this.send( this.draft() )
		}

		send_click( event?: Event ) {
			event?.preventDefault()
			this.send( this.draft() )
		}

		send_enabled() {
			return this.draft().trim().length > 0
		}

		send( text: string ) {
			if( !text.trim() || this.pending() ) return
			this.draft( '' )
			this.viewer().send( text )
		}

		stop() {
			this.viewer().stop()
		}

		action() {
			return [ this.pending() ? this.Stop() : this.Send() ]
		}

		@ $mol_mem
		follow() {

			this.entries().length
			this.pending()

			const scroll = this.Scroll().dom_node() as HTMLElement
			new this.$.$mol_after_frame( ()=> scroll.scrollTo( { top: scroll.scrollHeight, behavior: 'smooth' } ) )

			return null
		}

		@ $mol_mem
		follow_stream() {

			const partial = this.partial()
			if( !partial ) return null

			const scroll = this.Scroll().dom_node() as HTMLElement
			new this.$.$mol_after_frame( ()=> {
				if( scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 96 ) scroll.scrollTop = scroll.scrollHeight
			} )

			return null
		}

		auto() {
			this.follow()
			this.follow_stream()
			return [] as never
		}

	}

}
