namespace $.$$ {

	export class $raggu_web_front_dashboard_stage extends $.$raggu_web_front_dashboard_stage {

		Bar_fill() {
			const fill = super.Bar_fill()
			fill.style = () => ( { width: this.pct() } )
			return fill
		}

	}

}
