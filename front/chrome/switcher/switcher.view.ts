namespace $.$$ {

	export class $raggu_web_front_chrome_switcher extends $.$raggu_web_front_chrome_switcher {

		datasets() {
			return $raggu_web_front_data_ready( ()=> $raggu_web_front_data.datasets_now() )
		}

		current_title() {
			const active = this.datasets()?.find( item => item.id === this.corpus() )
			return active?.title ?? this.corpus()
		}

		rows() {
			const datasets = this.datasets()
			if( !datasets ) return [ 0, 1, 2 ].map( index => this.Row_skeleton( index ) )
			return datasets.map( item => this.Row( item.id ) )
		}

		row_item( id: string ) {
			return this.datasets()!.find( item => item.id === id )!
		}

		row_id( id: string ) {
			return id
		}

		row_title( id: string ) {
			return this.row_item( id ).title
		}

		row_domain( id: string ) {
			return this.row_item( id ).domain
		}

		row_count( id: string ) {
			const stats = this.row_item( id ).stats
			return `${ $raggu_web_front_lib_compact( stats.nodes ) } · ${ $raggu_web_front_lib_compact( stats.edges ) }`
		}

		row_current( id: string ) {
			return id === this.corpus()
		}

		row_click() {
			this.close()
		}

	}

}
