namespace $.$$ {

	export class $raggu_web_front_chrome extends $.$raggu_web_front_chrome {

		corpus() {
			return this.viewer().corpus()
		}

		corpus_page() {
			return !!this.corpus()
		}

		@ $mol_mem
		scrolled( next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem
		scroll_watch() {
			const update = ()=> this.scrolled( window.scrollY > 12 )
			update()
			window.addEventListener( 'scroll', update, { passive: true } )
			return { destructor: ()=> window.removeEventListener( 'scroll', update ) }
		}

		right() {
			const tools = this.corpus_page() && !$raggu_web_front_lib_narrow()
			return tools ? [ this.Tools(), this.Controls() ] : [ this.Controls() ]
		}

		centre_kind() {
			return this.corpus_page() ? 'corpus' : 'home'
		}

		home_active() {
			return this.corpus_page() ? null as never as string : ''
		}

		home_inert() {
			return this.corpus_page() ? '' : null as never as string
		}

		corpus_active() {
			return this.corpus_page() ? '' : null as never as string
		}

		corpus_inert() {
			return this.corpus_page() ? null as never as string : ''
		}

		graph_active() {
			return this.corpus_page() && this.viewer().graph_open()
		}

		chat_active() {
			return this.corpus_page() && this.viewer().chat_open()
		}

		toggle_graph() {
			this.viewer().toggle_graph()
		}

		toggle_chat() {
			this.viewer().toggle_chat()
		}

		scroll_to( id: string ) {
			this.$.$mol_dom_context.document.getElementById( id )?.scrollIntoView( { behavior: 'smooth', block: 'start' } )
		}

		to_pipeline() {
			this.scroll_to( 'pipeline' )
		}

		to_corpora() {
			this.scroll_to( 'corpora' )
		}

		@ $mol_mem
		height_publish() {
			const node = this.dom_node() as HTMLElement
			const publish = ()=> {
				const height = Math.round( node.getBoundingClientRect().height )
				document.documentElement.style.setProperty( '--chrome-h', `${ height }px` )
			}
			publish()
			const observer = new ResizeObserver( publish )
			observer.observe( node )
			return { destructor: ()=> observer.disconnect() }
		}

		auto() {
			this.scroll_watch()
			this.height_publish()
			return [] as never
		}

	}

}
