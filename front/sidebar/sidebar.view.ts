namespace $.$$ {

	export class $bog_norweb_front_sidebar extends $.$bog_norweb_front_sidebar {

		is_gallery() { return this.screen() === 'gallery' }
		is_explorer() { return this.screen() === 'explorer' }
		is_chat() { return this.screen() === 'chat' }
		is_dashboard() { return this.screen() === 'dashboard' }
		is_summary() { return this.screen() === 'summary' }

		no_dataset() { return !this.dataset_id() }

		is_en() { return this.$.$mol_locale.lang() === 'en' }
		is_ru() { return this.$.$mol_locale.lang() === 'ru' }

		@$mol_action click_gallery() { this.screen( 'gallery' ); return null }
		@$mol_action click_explorer() { this.screen( 'explorer' ); return null }
		@$mol_action click_chat() { this.screen( 'chat' ); return null }
		@$mol_action click_dashboard() { this.screen( 'dashboard' ); return null }
		@$mol_action click_summary() { this.screen( 'summary' ); return null }

		@$mol_action click_en() { this.$.$mol_locale.lang( 'en' ); return null }
		@$mol_action click_ru() { this.$.$mol_locale.lang( 'ru' ); return null }

	}

}
