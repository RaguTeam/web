namespace $.$$ {

	export class $raggu_web_front_scene_layer extends $mol_view {

		sub_visible() {
			return null as never as readonly $mol_view_content[]
		}

	}

	export class $raggu_web_front_scene extends $.$raggu_web_front_scene {

		@ $mol_mem
		state(): $raggu_web_front_scene_state {
			const viewer = this.viewer()
			return {
				mode: viewer.mode(),
				theme: this.lights() === 'dark' ? 'dark' : 'light',
				graph_visible: viewer.corpus() ? viewer.graph_open() : true,
				shown: viewer.shown_now(),
				selected: viewer.corpus() ? viewer.selected() : null,
				hover: viewer.hover(),
				search: viewer.corpus() ? viewer.search() : '',
				types: viewer.corpus() ? viewer.types() : [],
				communities: viewer.corpus() ? viewer.communities() : [],
				highlight: viewer.corpus() ? viewer.highlight() : [],
				stage: viewer.stage(),
				reset_token: viewer.reset_token(),
			}
		}

		interactive() {
			const viewer = this.viewer()
			return viewer.mode() === 'graph' && viewer.graph_open()
		}

		@ $mol_mem
		mounted( next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem
		engine() {

			const layer = this.Layer().dom_node() as HTMLElement
			const viewer = this.viewer()

			const engine = $raggu_web_front_scene_engine( layer, {
				state: ()=> {
					try {
						return this.last_state = this.state()
					} catch( error ) {
						return this.last_state ?? this.state_empty()
					}
				},
				hover: id => viewer.hover( id ),
				select: id => viewer.selected( id ),
			} )

			new this.$.$mol_after_frame( ()=> this.mounted( true ) )

			return Object.assign( engine, { destructor: ()=> engine.destroy() } )
		}

		last_state = null as null | $raggu_web_front_scene_state

		state_empty(): $raggu_web_front_scene_state {
			return {
				mode: 'ambient', theme: 'light', graph_visible: true, shown: null, selected: null, hover: null,
				search: '', types: [], communities: [], highlight: [], stage: null, reset_token: 0,
			}
		}

		auto() {
			this.engine()
			return [] as never
		}

	}

}
