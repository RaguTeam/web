namespace $.$$ {

	export class $raggu_web_front_settings extends $.$raggu_web_front_settings {

		settings() {
			return $raggu_web_front_lib_settings.value()
		}

		use_graph( next?: boolean ) {
			if( next !== undefined ) $raggu_web_front_lib_settings.patch( { useGraph: next } )
			return this.settings().useGraph
		}

		query_plan( next?: boolean ) {
			if( next !== undefined ) $raggu_web_front_lib_settings.patch( { queryPlan: next } )
			return this.settings().queryPlan
		}

		rerank( next?: boolean ) {
			if( next !== undefined ) $raggu_web_front_lib_settings.patch( { rerank: next } )
			return this.settings().rerank
		}

		@ $mol_mem
		top_k_draft( next?: string ) {
			return next ?? String( this.settings().topK )
		}

		top_k_input( event: Event ) {
			this.top_k_draft( ( event.target as HTMLInputElement ).value )
		}

		top_k_commit() {
			const parsed = Number( this.top_k_draft().trim() )
			if( !this.top_k_draft().trim() || !Number.isFinite( parsed ) ) {
				this.top_k_draft( String( this.settings().topK ) )
				return
			}
			const committed = $raggu_web_front_lib_clamp( Math.round( parsed ), $raggu_web_front_lib_top_k_min, $raggu_web_front_lib_top_k_max )
			$raggu_web_front_lib_settings.patch( { topK: committed } )
			this.top_k_draft( String( committed ) )
		}

		top_k_key( event: KeyboardEvent ) {
			if( event.key === 'Enter' ) this.top_k_commit()
			if( event.key === 'ArrowUp' ) {
				event.preventDefault()
				this.top_k_more()
			}
			if( event.key === 'ArrowDown' ) {
				event.preventDefault()
				this.top_k_less()
			}
		}

		top_k_step( delta: number ) {
			const committed = $raggu_web_front_lib_clamp( this.settings().topK + delta, $raggu_web_front_lib_top_k_min, $raggu_web_front_lib_top_k_max )
			$raggu_web_front_lib_settings.patch( { topK: committed } )
			this.top_k_draft( String( committed ) )
		}

		top_k_less() {
			this.top_k_step( -1 )
		}

		top_k_more() {
			this.top_k_step( 1 )
		}

		top_k_less_enabled() {
			return this.settings().topK > $raggu_web_front_lib_top_k_min
		}

		top_k_more_enabled() {
			return this.settings().topK < $raggu_web_front_lib_top_k_max
		}

		limit_value() {
			return String( this.settings().graphLimit )
		}

		steps() {
			return $raggu_web_front_lib_graph_limit_steps.map( step => this.Step( step ) )
		}

		step_text( step: number ) {
			return String( step )
		}

		step_active( step: number ) {
			return this.settings().graphLimit === step
		}

		step_pane_class( step: number ) {
			return this.step_active( step ) ? 'accent-pane' : 'step-edge'
		}

		step_pick( step: number ) {
			$raggu_web_front_lib_settings.patch( { graphLimit: step } )
		}

		reset() {
			$raggu_web_front_lib_settings.reset()
			this.top_k_draft( String( $raggu_web_front_lib_settings_default.topK ) )
		}

		close() {
			this.showed( false )
		}

		keydown( event: KeyboardEvent ) {
			if( event.key === 'Escape' && this.showed() ) this.close()
		}

	}

	export class $raggu_web_front_settings_toggle extends $.$raggu_web_front_settings_toggle {

		state_text() {
			return this.checked() ? this.on_label() : this.off_label()
		}

		flip() {
			this.checked( !this.checked() )
		}

	}

}
