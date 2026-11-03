namespace $.$$ {

	export class $raggu_web_front_app extends $.$raggu_web_front_app {

		corpus_page() {
			return !!this.Viewer().corpus()
		}

		main() {
			return this.corpus_page() ? [ this.Corpus() ] : [ this.Home() ]
		}

		quiet() {
			return this.corpus_page()
		}

		theme_choice( next?: string ) {
			const value = this.$.$mol_state_local.value( 'ragu.theme', next ) as string | null
			return value === 'light' || value === 'dark' ? value : 'system'
		}

		@ $mol_mem
		theme_resolved() {
			const choice = this.theme_choice()
			if( choice !== 'system' ) return choice
			return this.$.$mol_media.match( '(prefers-color-scheme: dark)' ) ? 'dark' : 'light'
		}

		open_settings() {
			this.settings_open( true )
		}

		@ $mol_mem
		document_sync() {
			const root = this.$.$mol_dom_context.document.documentElement
			root.dataset.theme = this.theme_resolved()
			root.lang = $raggu_web_front_lib_lang()
			return null
		}

		@ $mol_mem
		scrollbar_publish() {
			const measure = ()=> {
				const probe = document.createElement( 'div' )
				probe.style.cssText = 'position:absolute;top:-9999px;width:100px;height:100px;overflow:scroll;visibility:hidden'
				document.body.appendChild( probe )
				const width = probe.offsetWidth - probe.clientWidth
				probe.remove()
				document.documentElement.style.setProperty( '--scrollbar-w', `${ width }px` )
			}
			measure()
			window.addEventListener( 'resize', measure )
			return { destructor: ()=> window.removeEventListener( 'resize', measure ) }
		}

		@ $mol_mem
		pageview() {
			const corpus = this.Viewer().corpus()
			$raggu_web_front_analytics_pageview( corpus ? 'corpus' : 'home', corpus )
			return corpus
		}

		@ $mol_mem
		scroll_reset() {
			this.Viewer().corpus()
			window.scrollTo( 0, 0 )
			return null
		}

		auto() {
			this.document_sync()
			this.scrollbar_publish()
			this.pageview()
			this.scroll_reset()
			return [] as never
		}

	}

}
