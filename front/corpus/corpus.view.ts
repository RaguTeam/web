namespace $.$$ {

	export class $raggu_web_front_corpus extends $.$raggu_web_front_corpus {

		chat_open() {
			return this.viewer().chat_open()
		}

		graph_open() {
			return this.viewer().graph_open()
		}

		hint_only() {
			return this.viewer().selected() === null
		}

		cold() {
			return this.viewer().cold()
		}

		row() {
			const right = this.chat_open() ? this.Chat() : this.Detail()
			return this.graph_open() ? [ this.Graph(), right ] : [ right ]
		}

		graph_column() {
			const compact = this.chat_open() && this.viewer().selected() !== null
			return [ this.Controls(), this.Stage(), ... compact ? [ this.Compact() ] : [] ]
		}

		stage_content() {
			const viewer = this.viewer()
			if( viewer.graph_state().error ) return [ this.Failed() ]
			if( viewer.cold() ) return [ this.Cold() ]
			if( viewer.warm() ) return [ this.Warm() ]
			return []
		}

		percent() {
			return this.viewer().graph_state().pending ? '' : `${ Math.round( this.viewer().progress() * 100 ) }%`
		}

		retry() {
			$raggu_web_front_data.retry()
		}

		@ $mol_mem
		stage_watch() {

			if( !this.graph_open() ) {
				this.viewer().stage( null )
				return null
			}

			const element = this.Stage().dom_node() as HTMLElement
			let frame = 0

			const measure = ()=> {
				const rect = element.getBoundingClientRect()
				if( rect.width < 200 || rect.height < 160 ) return this.viewer().stage( null )
				const previous = this.viewer().stage()
				const moved = !previous
					|| Math.abs( previous.x - rect.x ) > 0.5
					|| Math.abs( previous.y - rect.y ) > 0.5
					|| Math.abs( previous.width - rect.width ) > 0.5
					|| Math.abs( previous.height - rect.height ) > 0.5
				if( moved ) this.viewer().stage( { x: rect.x, y: rect.y, width: rect.width, height: rect.height } )
			}

			const schedule = ()=> {
				cancelAnimationFrame( frame )
				frame = requestAnimationFrame( measure )
			}

			schedule()
			const observer = new ResizeObserver( schedule )
			observer.observe( element )
			window.addEventListener( 'resize', schedule )

			return {
				destructor: ()=> {
					observer.disconnect()
					window.removeEventListener( 'resize', schedule )
					cancelAnimationFrame( frame )
					this.viewer().stage( null )
				},
			}
		}

		auto() {
			this.stage_watch()
			return [] as never
		}

	}

}
