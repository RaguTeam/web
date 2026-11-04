namespace $.$$ {

	export class $raggu_web_front_corpus_controls extends $.$raggu_web_front_corpus_controls {

		model() {
			return this.viewer().shown_now()?.model ?? null
		}

		search( next?: string ) {
			return this.viewer().search( next )
		}

		search_input( event: Event ) {
			this.search( ( event.target as HTMLInputElement ).value )
		}

		search_clear() {
			this.search( '' )
		}

		filtering() {
			return this.viewer().filtering()
		}

		bar() {
			return [
				this.Search(),
				... $raggu_web_front_lib_narrow() ? [ this.Tools() ] : [],
				this.Types(),
				... this.communities_sorted().length ? [ this.Communities() ] : [],
			]
		}

		@ $mol_mem
		search_box() {
			return [ this.Search_icon(), this.Search_input(), ... this.search() ? [ this.Search_clear() ] : [] ]
		}

		types_count() {
			return this.viewer().types().length
		}

		communities_count() {
			return this.viewer().communities().length
		}

		type_items() {
			return ( this.model()?.types ?? [] ).map( type => this.Type_item( type.name ) )
		}

		type_active( name: string ) {
			return this.viewer().types().includes( name )
		}

		type_name( name: string ) {
			return $raggu_web_front_lib_entity_name( name )
		}

		type_count( name: string ) {
			return this.model()?.types.find( type => type.name === name )?.count ?? 0
		}

		type_toggle( name: string ) {
			this.viewer().toggle_type( name )
		}

		types_clear() {
			this.viewer().types( [] )
		}

		@ $mol_mem
		communities_sorted() {
			return ( this.model()?.communities ?? [] ).slice().sort( ( a, b ) => b.size - a.size ).slice( 0, 60 )
		}

		community_items() {
			return this.communities_sorted().map( community => this.Community_item( community.id ) )
		}

		community_active( id: string ) {
			return this.viewer().communities().includes( id )
		}

		community_name( id: string ) {
			return this.communities_sorted().find( item => item.id === id )?.title ?? id
		}

		community_count( id: string ) {
			return this.communities_sorted().find( item => item.id === id )?.size ?? 0
		}

		community_toggle( id: string ) {
			this.viewer().toggle_community( id )
		}

		communities_clear() {
			this.viewer().communities( [] )
		}

		@ $mol_mem
		matches() {

			const model = this.model()
			if( !model ) return 0

			const query = this.viewer().search().trim().toLowerCase()
			const types = new Set( this.viewer().types() )
			const communities = new Set( this.viewer().communities() )
			if( !query && types.size === 0 && communities.size === 0 ) return model.nodes.length

			let total = 0
			for( const node of model.nodes ) {
				if( query && !node.label.toLowerCase().includes( query ) ) continue
				if( types.size > 0 && !types.has( node.entity_type ) ) continue
				if( communities.size > 0 && !( node.community_id && communities.has( node.community_id ) ) ) continue
				total += 1
			}
			return total
		}

		matches_text() {
			return this.matches_label().replace( '{n}', String( this.matches() ) )
		}

		no_matches_text() {
			return `${ this.no_matches_label() } — ${ this.no_matches_hint() }`
		}

		summary() {
			return [ this.matches() > 0 ? this.Matches() : this.No_matches(), this.Clear_all() ]
		}

		clear_all() {
			this.viewer().clear_filters()
		}

	}

	export class $raggu_web_front_corpus_controls_filter extends $.$raggu_web_front_corpus_controls_filter {

		active() {
			return this.count() > 0
		}

		pane_class() {
			return this.active() ? 'accent-pane' : 'filter-edge'
		}

		count_text() {
			return this.active() ? String( this.count() ) : ''
		}

		bubble_content() {
			return this.active() ? super.bubble_content() : [ this.Heading(), this.List() ]
		}

	}

}
