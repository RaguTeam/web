namespace $.$$ {

	// Kept in sync with defaults in demo.view.tree — needed for the reset button.
	// There's no runtime hook in $mol to re-read a tree-declared default after
	// state has been touched, so the values live in both places.
	const DEFAULTS = {
		graph_n: 80,
		gravity: 0.09,
		force_scale: 0.06,
		damping: 0.82,
		min_move: 0.15,
		max_speed: 12,
		node_size_base: 4,
		node_size_growth: 0.7,
	}

	export class $raggu_web_front_explorer_forcegraph_demo extends $.$raggu_web_front_explorer_forcegraph_demo {

		// Playground data source — deterministic PRNG mock, rebuilt when the
		// `graph_n` slider changes. Feeds forcegraph via nodes/edges bindings.
		@$mol_mem
		mock() {
			const n = this.graph_n()
			return $raggu_web_front_explorer_forcegraph_build_mock( 42, n, Math.round( n * 1.6 ) )
		}

		graph_nodes(): readonly $raggu_web_front_explorer_forcegraph_node[] {
			return this.mock().nodes
		}

		graph_edges(): readonly $raggu_web_front_explorer_forcegraph_edge[] {
			return this.mock().edges
		}

		@$mol_action
		reset() {
			this.graph_n( DEFAULTS.graph_n )
			this.gravity( DEFAULTS.gravity )
			this.force_scale( DEFAULTS.force_scale )
			this.damping( DEFAULTS.damping )
			this.min_move( DEFAULTS.min_move )
			this.max_speed( DEFAULTS.max_speed )
			this.node_size_base( DEFAULTS.node_size_base )
			this.node_size_growth( DEFAULTS.node_size_growth )
			return null
		}

	}

}
