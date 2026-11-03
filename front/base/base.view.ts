namespace $.$$ {

	export class $raggu_web_front_reveal extends $.$raggu_web_front_reveal {

		delay_css() {
			return `${ this.delay() }ms`
		}

		@ $mol_mem
		observer() {

			if( this.shown() ) return null

			const node = this.dom_node() as Element
			const observer = new IntersectionObserver( entries => {
				if( !entries.some( entry => entry.isIntersecting ) ) return
				this.shown( true )
			}, { rootMargin: '-12% 0px' } )

			observer.observe( node )

			return { destructor: ()=> observer.disconnect() }
		}

		auto() {
			this.observer()
			return [] as never
		}

	}

}

namespace $.$$ {

	export class $raggu_web_front_link extends $.$raggu_web_front_link {

		href() {
			return this.uri() || this.$.$mol_state_arg.link( this.arg() )
		}

	}

}
