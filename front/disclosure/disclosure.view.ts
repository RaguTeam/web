namespace $.$$ {

	export class $raggu_web_front_disclosure extends $.$raggu_web_front_disclosure {

		toggle() {
			const next = !this.open()
			this.open( next )
			if( !next ) return
			new this.$.$mol_after_timeout( 340, ()=> {
				;( this.dom_node() as HTMLElement ).scrollIntoView( { behavior: 'smooth', block: 'nearest' } )
			} )
		}

	}

}
