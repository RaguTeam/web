namespace $.$$ {

	export class $raggu_web_front_sidebar extends $.$raggu_web_front_sidebar {

		dataset_rows() {
			return this.dataset_ids().map( ( id: string ) => this.Dataset_row( id ) )
		}

		dataset_active( id: string ) { return id === this.dataset_id() }

		@$mol_action
		dataset_click( id: string ) {
			this.select_dataset( id )
			return null
		}

		is_en() { return this.$.$mol_locale.lang() === 'en' }
		is_ru() { return this.$.$mol_locale.lang() === 'ru' }

		@$mol_action click_en() { this.$.$mol_locale.lang( 'en' ); return null }
		@$mol_action click_ru() { this.$.$mol_locale.lang( 'ru' ); return null }

	}

}
