namespace $.$$ {

	export class $raggu_web_front_topbar extends $.$raggu_web_front_topbar {

		is_fast() { return this.preset() === 'fast' }
		is_accurate() { return this.preset() === 'accurate' }
		is_demo() { return this.preset() === 'demo' }

		@$mol_action click_fast() { this.preset( 'fast' ); return null }
		@$mol_action click_accurate() { this.preset( 'accurate' ); return null }
		@$mol_action click_demo() { this.preset( 'demo' ); return null }

	}

}
