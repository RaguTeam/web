namespace $.$$ {

	export class $raggu_web_front_home_card extends $.$raggu_web_front_home_card {

		item() {
			return this.dataset() as unknown as $raggu_web_front_graph_dataset
		}

		id() {
			return this.item().id
		}

		title() {
			return this.item().title
		}

		domain() {
			return this.item().domain
		}

		description() {
			return this.item().description
		}

		link_label() {
			return `${ this.open_graph_label() }: ${ this.title() }`
		}

		nodes() {
			return this.item().stats.nodes
		}

		edges() {
			return this.item().stats.edges
		}

		nodes_text() {
			return $raggu_web_front_lib_compact( this.item().stats.nodes )
		}

		edges_text() {
			return $raggu_web_front_lib_compact( this.item().stats.edges )
		}

		communities_text() {
			return $raggu_web_front_lib_compact( this.item().stats.communities )
		}

		chunks_text() {
			return $raggu_web_front_lib_compact( this.item().stats.chunks )
		}

		types() {
			const types = this.item().preview.primary_entity_types?.slice( 0, this.featured() ? 6 : 3 ) ?? []
			return types.map( type => this.Type( type ) )
		}

		type_name( type: string ) {
			return type
		}

	}

}
