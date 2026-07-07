namespace $.$$ {

	export class $bog_norweb_front_dashboard_log extends $.$bog_norweb_front_dashboard_log {

		@$mol_action
		toggle( next?: Event | null ) {
			this.expanded( !this.expanded() )
			return null
		}

		arrow() {
			return this.expanded() ? '▴' : '▾'
		}

	}

}
