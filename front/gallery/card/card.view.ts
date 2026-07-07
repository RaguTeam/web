namespace $.$$ {

	export class $bog_norweb_front_gallery_card extends $.$bog_norweb_front_gallery_card {

		unit( key: 'nodes' | 'edges' | 'comms' ) {
			return this.$.$mol_locale.text( `$bog_norweb_front_gallery_card_unit_${ key }` ) || ''
		}

		tag_nodes() { return `${ this.nodes() } ${ this.unit( 'nodes' ) }` }
		tag_edges() { return `${ this.edges() } ${ this.unit( 'edges' ) }` }
		tag_comms() { return `${ this.comms() } ${ this.unit( 'comms' ) }` }

	}

}
