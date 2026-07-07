namespace $.$$ {

	export class $bog_norweb_front_dashboard_stage extends $.$bog_norweb_front_dashboard_stage {

		Bar_fill() {
			const fill = super.Bar_fill()
			fill.style = () => ( { width: this.pct() } )
			return fill
		}

	}

}
