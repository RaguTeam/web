namespace $.$$ {

	export class $raggu_web_front_chrome_tools extends $.$raggu_web_front_chrome_tools {

		recentre() {
			this.viewer().recentre()
		}

		meta() {
			return this.viewer().shown_now()?.model.meta ?? null
		}

		shown() {
			return this.meta()?.returned_nodes ?? 0
		}

		total() {
			return this.meta()?.total_nodes ?? 0
		}

		stale() {
			return this.viewer().solving() || this.whole_pending()
		}

		stale_class() {
			return this.stale() ? 'is-stale' : ''
		}

		shown_badge() {
			return this.shown() ? $raggu_web_front_lib_badge( this.shown() ) : '—'
		}

		total_badge() {
			return this.total() ? $raggu_web_front_lib_badge( this.total() ) : '—'
		}

		shown_full() {
			return $raggu_web_front_lib_full( this.shown() )
		}

		total_full() {
			return $raggu_web_front_lib_full( this.total() )
		}

		bar_width() {
			const total = this.total()
			return `${ total ? Math.max( 3, Math.round( ( this.shown() / total ) * 100 ) ) : 0 }%`
		}

		limit() {
			return $raggu_web_front_lib_settings.value().graphLimit
		}

		next_step() {
			return $raggu_web_front_lib_graph_limit_steps.find( step => step > this.limit() ) ?? null
		}

		beyond_cap() {
			return this.total() > this.shown() && !this.next_step()
		}

		@ $mol_mem
		whole_pending( next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem
		whole_progress( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		whole_failed( next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem
		whole_clipped( next?: number ) {
			return next ?? 0
		}

		action() {
			if( this.next_step() ) return [ this.More() ]
			if( this.beyond_cap() ) {
				return [
					this.Rest(),
					this.Paging_note(),
					... this.whole_failed() ? [ this.Rest_failed() ] : [],
					... this.whole_clipped() > 0 ? [ this.Clipped_note() ] : [],
				]
			}
			return [ this.At_max() ]
		}

		more_enabled() {
			return !this.stale()
		}

		more_text() {
			if( this.stale() ) return this.loading_label()
			return this.load_more_label().replace( '{n}', $raggu_web_front_lib_compact( this.next_step()! - this.limit() ) )
		}

		more() {
			const step = this.next_step()
			if( step ) $raggu_web_front_lib_settings.patch( { graphLimit: step } )
		}

		rest_enabled() {
			return !this.stale()
		}

		rest_text() {
			if( this.whole_pending() ) return this.loading_rest_label().replace( '{n}', String( Math.round( this.whole_progress() * 100 ) ) )
			return this.load_rest_label()
		}

		clipped_text() {
			return this.clipped_label().replace( '{n}', String( this.whole_clipped() ) )
		}

		rest() {
			this.whole_pending( true )
			this.whole_failed( false )
			this.whole_progress( 0 )
			this.viewer().load_whole( ratio => this.whole_progress( ratio ) ).then(
				result => {
					this.whole_clipped( result.clipped.length )
					this.whole_pending( false )
				},
				()=> {
					this.whole_failed( true )
					this.whole_pending( false )
				},
			)
		}

	}

}
