namespace $.$$ {

	export class $raggu_web_front_gallery_card extends $.$raggu_web_front_gallery_card {

		unit( key: 'nodes' | 'edges' | 'comms' ) {
			return this.$.$mol_locale.text( `$raggu_web_front_gallery_card_unit_${ key }` ) || ''
		}

		tag_nodes() { return `${ this.nodes() } ${ this.unit( 'nodes' ) }` }
		tag_edges() { return `${ this.edges() } ${ this.unit( 'edges' ) }` }
		tag_comms() { return `${ this.comms() } ${ this.unit( 'comms' ) }` }

	}

}
