namespace $.$$ {

	type DatasetStats = {
		id: string
		nodes: string
		edges: string
		comms: string
		/** Dynamic title for user-uploaded datasets. Built-ins use $mol_locale. */
		dynamic?: { title: string; domain: string; desc: string }
	}

	// Статичные моки — на них показываем схему локализации через view.tree @.
	// Реальные датасеты приходят с бэка через remote_datasets и несут dynamic-строки.
	const BUILTIN: readonly DatasetStats[] = [
		{ id: 'law', nodes: '18.4k', edges: '52k', comms: '210' },
		{ id: 'wiki', nodes: '2.41k', edges: '9.1k', comms: '38' },
	]

	function format_count( n: number ): string {
		if ( n >= 1000 ) {
			const k = n / 1000
			return ( k >= 10 ? k.toFixed( 1 ) : k.toFixed( 2 ) ) + 'k'
		}
		return String( n )
	}

	export class $raggu_web_front_gallery extends $.$raggu_web_front_gallery {

		// URL flag `?mock=1` → BUILTIN.
		mock_flag(): boolean {
			return this.$.$mol_state_arg.value( 'mock' ) === '1'
		}

		// Reactive fetch of preindexed datasets. While loading, the wire promise
		// is rethrown as usual; a real transport error falls back to BUILTIN moks
		// so the demo stays alive without the backend.
		// Локаль читается реактивно — переключение EN/RU перезапрашивает карточки
		// уже переведёнными бэком (title/domain/description).
		@$mol_mem
		remote_datasets(): DatasetStats[] | null {
			if ( this.mock_flag() ) return null
			try {
				const cards = this.$.$raggu_web_front_api(
					$raggu_web_front_api_ragu_list_datasets,
					{ query: { locale: $raggu_web_front_api_locale() } },
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
			return this.remote_datasets() ?? BUILTIN
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
		// Моки 'law' и 'wiki' резолвятся через @-объявленные строки view.tree.
		card_title( id: string ) {
			const ds = this.dataset( id )
			if( ds.dynamic ) return ds.dynamic.title
			if( id === 'law' ) return this.dataset_law_title()
			if( id === 'wiki' ) return this.dataset_wiki_title()
			return ''
		}

		card_domain( id: string ) {
			const ds = this.dataset( id )
			if( ds.dynamic ) return ds.dynamic.domain
			if( id === 'law' ) return this.dataset_law_domain()
			if( id === 'wiki' ) return this.dataset_wiki_domain()
			return ''
		}

		card_desc( id: string ) {
			const ds = this.dataset( id )
			if( ds.dynamic ) return ds.dynamic.desc
			if( id === 'law' ) return this.dataset_law_desc()
			if( id === 'wiki' ) return this.dataset_wiki_desc()
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

	}

}
