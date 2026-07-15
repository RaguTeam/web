namespace $.$$ {

	export class $raggu_web_front_topbar extends $.$raggu_web_front_topbar {

		is_gallery() { return this.screen() === 'gallery' }
		is_explorer() { return this.screen() === 'explorer' }
		is_chat() { return this.screen() === 'chat' }
		is_summary() { return this.screen() === 'summary' }

		no_dataset() { return !this.dataset_id() }

		@$mol_action click_gallery() { this.screen( 'gallery' ); return null }
		@$mol_action click_explorer() { this.screen( 'explorer' ); return null }
		@$mol_action click_chat() { this.screen( 'chat' ); return null }
		@$mol_action click_summary() { this.screen( 'summary' ); return null }

	}

}
