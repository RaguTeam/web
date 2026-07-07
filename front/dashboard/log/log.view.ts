namespace $.$$ {

	export class $raggu_web_front_dashboard_log extends $.$raggu_web_front_dashboard_log {

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
