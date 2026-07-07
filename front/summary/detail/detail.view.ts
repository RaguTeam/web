namespace $.$$ {

	export class $bog_norweb_front_summary_detail extends $.$bog_norweb_front_summary_detail {

		body() {
			return [
				...this.image() ? [ this.Image() ] : [],
				...this.facts().map( ( _, i ) => this.Fact( i ) ),
				...this.links().length ? [ this.Links() ] : [],
			]
		}

		fact( i: number ) {
			return this.facts()[ i ]
		}

		link_rows() {
			return this.links().map( ( _, i ) => this.Link( i ) )
		}

		link_uri( i: number ) {
			return this.links()[ i ].uri
		}

		link_label( i: number ) {
			return this.links()[ i ].label
		}

	}

}
