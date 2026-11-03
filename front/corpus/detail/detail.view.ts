namespace $.$$ {

	export class $raggu_web_front_corpus_detail extends $.$raggu_web_front_corpus_detail {

		node_id() {
			return this.viewer().selected()
		}

		open() {
			return this.node_id() !== null
		}

		content() {
			if( this.open() ) return [ this.Body() ]
			return this.hint() ? [ this.Hint() ] : []
		}

		detail_state() {
			const id = this.node_id()
			const corpus = this.viewer().corpus()
			return $raggu_web_front_data_state( ()=> id ? $raggu_web_front_data.node( `${ corpus }|${ id }` ) : null )
		}

		local() {
			const id = this.node_id()
			const model = this.viewer().shown_now()?.model
			if( !id || !model ) return null
			const index = model.index_of.get( id )
			return index === undefined ? null : model.nodes[ index ]
		}

		node() {
			return this.detail_state().value?.node ?? this.local()
		}

		title_content() {
			const node = this.node()
			return node ? [ node.label ] : [ this.Title_skeleton() ]
		}

		chips() {
			return this.node() ? [ this.Type_chip() ] : []
		}

		type_name() {
			return $raggu_web_front_lib_entity_name( this.node()?.entity_type ?? '' )
		}

		description() {
			return this.node()?.description ?? ''
		}

		relations() {
			const data = this.detail_state().value
			return [ ... data?.outgoing_relations ?? [], ... data?.incoming_relations ?? [] ]
		}

		chunks() {
			return this.detail_state().value?.provenance_chunks ?? []
		}

		scroll_content() {
			const state = this.detail_state()
			const local = this.local()
			const head = state.pending && !local
				? [ this.Lines() ]
				: state.error && !local ? [ this.Failed() ] : [ this.Description() ]
			return [
				... head,
				... this.relations().length ? [ this.Relations() ] : [],
				... this.chunks().length ? [ this.Chunks() ] : [],
			]
		}

		relations_title() {
			return this.relations_label().replace( '{n}', String( this.relations().length ) )
		}

		relation_rows() {
			return this.relations().slice( 0, this.dense() ? 6 : 40 ).map( ( _, index ) => this.Relation( index ) )
		}

		relation_out( index: number ) {
			return this.relations()[ index ].direction === 'outgoing'
		}

		relation_type( index: number ) {
			const relation = this.relations()[ index ]
			return `${ relation.direction === 'outgoing' ? '→' : '←' } ${ $raggu_web_front_lib_relation_name( relation.relation_type ) }`
		}

		relation_other( index: number ) {
			return this.relations()[ index ].other_node_label
		}

		relation_pick( index: number ) {
			this.viewer().selected( this.relations()[ index ].other_node_id )
		}

		chunks_count() {
			return String( this.chunks().length )
		}

		chunk_rows() {
			return this.chunks().slice( 0, 6 ).map( ( _, index ) => this.Chunk( index ) )
		}

		chunk_id( index: number ) {
			return this.chunks()[ index ].id.slice( 0, 16 )
		}

		chunk_text( index: number ) {
			const content = this.chunks()[ index ].content
			return content.slice( 0, 420 ) + ( content.length > 420 ? '…' : '' )
		}

		close() {
			this.viewer().selected( null )
		}

		ask() {
			const node = this.node()
			if( !node ) return
			this.viewer().ask( this.ask_template().replace( '{label}', node.label ) )
		}

	}

}
