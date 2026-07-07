namespace $.$$ {

	type DatasetStats = {
		id: string
		nodes: string
		edges: string
		comms: string
		/** Dynamic title for user-uploaded datasets. Built-ins use $mol_locale. */
		dynamic?: { title: string; domain: string; desc: string }
	}

	// Только один статичный мок — на нём показываем схему локализации через view.tree @.
	// Реальные датасеты приходят с бэка через remote_datasets и несут dynamic-строки.
	const BUILTIN: readonly DatasetStats[] = [
		{ id: 'law', nodes: '18.4k', edges: '52k', comms: '210' },
	]

	function format_count( n: number ): string {
		if ( n >= 1000 ) {
			const k = n / 1000
			return ( k >= 10 ? k.toFixed( 1 ) : k.toFixed( 2 ) ) + 'k'
		}
		return String( n )
	}

	function random_stats( seed: number ) {
		const rng = ( m: number ) => Math.floor( ( Math.sin( seed++ ) * 10000 % m + m ) % m )
		const nodes = 800 + rng( 7200 )
		const edges = nodes * ( 2 + rng( 4 ) )
		const comms = 12 + rng( 80 )
		return {
			nodes: format_count( nodes ),
			edges: format_count( edges ),
			comms: String( comms ),
		}
	}

	export class $bog_norweb_front_gallery extends $.$bog_norweb_front_gallery {

		@$mol_mem
		extra_datasets( next?: DatasetStats[] ): DatasetStats[] {
			return next ?? []
		}

		// URL flag `?mock=1` → BUILTIN.
		mock_flag(): boolean {
			return this.$.$mol_state_arg.value( 'mock' ) === '1'
		}

		// Reactive fetch of preindexed datasets. While loading, the wire promise
		// is rethrown as usual; a real transport error falls back to BUILTIN moks
		// so the demo stays alive without the backend.
		@$mol_mem
		remote_datasets(): DatasetStats[] | null {
			if ( this.mock_flag() ) return null
			try {
				const cards = this.$.$bog_norweb_front_api(
					$bog_norweb_front_api_ragu_list_datasets,
					{ query: { locale: 'ru' } },
				)
				return cards.map( ( c: any ) => ( {
					id: c.id,
					nodes: format_count( c.stats.nodes ),
					edges: format_count( c.stats.edges ),
					comms: String( c.stats.communities ),
					dynamic: { title: c.title, domain: c.domain, desc: c.description },
				} ) )
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				console.warn( 'Datasets fetch failed, falling back to mock:', error )
				return null
			}
		}

		// Показываем юзеру плашку, что перед ним моки, а не данные с бэка.
		is_mock() {
			return this.remote_datasets() === null
		}

		datasets() {
			const base = this.remote_datasets() ?? BUILTIN
			return [ ...base, ...this.extra_datasets() ]
		}

		rows() {
			return this.datasets().map( ds => this.Card( ds.id ) )
		}

		dataset( id: string ): DatasetStats {
			return this.datasets().find( d => d.id === id ) ?? BUILTIN[ 0 ]
		}

		card_id( id: string ) { return id }

		card_active( id: string ) { return id === this.dataset_id() }

		// Бэк-датасеты кладут title/domain/desc в dynamic — рендерим напрямую.
		// Единственный мок 'law' резолвится через @-объявленные строки view.tree.
		card_title( id: string ) {
			const ds = this.dataset( id )
			if( ds.dynamic ) return ds.dynamic.title
			if( id === 'law' ) return this.dataset_law_title()
			return ''
		}

		card_domain( id: string ) {
			const ds = this.dataset( id )
			if( ds.dynamic ) return ds.dynamic.domain
			if( id === 'law' ) return this.dataset_law_domain()
			return ''
		}

		card_desc( id: string ) {
			const ds = this.dataset( id )
			if( ds.dynamic ) return ds.dynamic.desc
			if( id === 'law' ) return this.dataset_law_desc()
			return ''
		}

		card_nodes( id: string ) { return this.dataset( id ).nodes }
		card_edges( id: string ) { return this.dataset( id ).edges }
		card_comms( id: string ) { return this.dataset( id ).comms }

		@$mol_action
		click( id: string ) {
			this.select_dataset( id )
			return null
		}

		/** Mock file size in MB for upload validation. */
		mock_file_size( kind: string ): number {
			// document = always small, index = sometimes too big to demo validation
			return kind === 'index' ? 4.2 : 2.8
		}

		@$mol_action
		upload_doc_click() {
			this.start_upload( 'document' )
			return null
		}

		@$mol_action
		upload_idx_click() {
			this.start_upload( 'index' )
			return null
		}

		@$mol_action
		start_upload( kind: 'document' | 'index' ) {
			this.upload_kind( kind )
			this.upload_showed( true )
			;( this.Upload() as $.$$.$bog_norweb_front_gallery_upload ).start( this.mock_file_size( kind ) )
			return null
		}

		@$mol_action
		upload_complete() {
			const kind = this.upload_kind() || 'document'
			const list = this.extra_datasets()
			const idx = list.length + 1
			const id = `up-${ Date.now() }-${ idx }`
			const seed = Date.now() + idx
			const stats = random_stats( seed )
			const title_prefix = kind === 'index' ? this.uploaded_index_title() : this.uploaded_document_title()
			const domain = this.uploaded_domain()
			const desc = this.uploaded_desc()
			this.extra_datasets( [
				...list,
				{
					id,
					nodes: stats.nodes,
					edges: stats.edges,
					comms: stats.comms,
					dynamic: { title: `${ title_prefix } #${ idx }`, domain, desc },
				},
			] )
			this.upload_showed( false )
			this.upload_kind( '' )
			return null
		}

		@$mol_action
		upload_close() {
			this.upload_showed( false )
			this.upload_kind( '' )
			return null
		}

	}

}
