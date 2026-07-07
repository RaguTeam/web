namespace $.$$ {

	const STEP_KEYS = [
		'chunking',
		'extraction',
		'summarization',
		'communities',
		'refinement',
		'search',
	] as const

	type StepKey = typeof STEP_KEYS[ number ]
	type StepStatus = 'pending' | 'active' | 'done'

	export class $raggu_web_front_gallery_upload extends $.$raggu_web_front_gallery_upload {

		@$mol_mem
		step( next?: number ): number {
			return next ?? 0
		}

		@$mol_mem
		error( next?: string ): string {
			return next ?? ''
		}

		has_error() {
			return this.error() ? 'true' : 'false'
		}

		panel_title() {
			return this.kind() === 'index' ? this.panel_title_index_text() : this.panel_title_document_text()
		}

		body() {
			return this.error() ? [ this.Error_body() ] : [ this.Progress_body() ]
		}

		step_label() {
			const n = this.step()
			const idx = Math.max( 0, Math.min( n, STEP_KEYS.length ) - 1 )
			return this.step_name_text( STEP_KEYS[ idx ] )
		}

		step_rows() {
			return STEP_KEYS.map( key => this.Step( key ) )
		}

		step_status( key: StepKey ): StepStatus {
			const idx = STEP_KEYS.indexOf( key )
			const current = this.step()
			if ( current > idx ) return 'done'
			if ( current === idx ) return 'active'
			return 'pending'
		}

		step_marker_text( key: StepKey ): string {
			const status = this.step_status( key )
			if ( status === 'done' ) return '●'
			if ( status === 'active' ) return '◐'
			return '○'
		}

		step_name_text( key: StepKey ): string {
			switch ( key ) {
				case 'chunking': return this.step_chunking_text()
				case 'extraction': return this.step_extraction_text()
				case 'summarization': return this.step_summarization_text()
				case 'communities': return this.step_communities_text()
				case 'refinement': return this.step_refinement_text()
				case 'search': return this.step_search_text()
			}
		}

		progress_label_separator() { return ' ' }
		progress_label_slash() { return ' / ' }
		total_steps_text() { return String( this.total_steps() ) }

		/**
		 * Mock pipeline: validates size limit, then advances step 0→6 via setTimeout chain.
		 * Returns immediately; UI re-renders on each step setter call.
		 */
		start( mock_file_size_mb: number ) {
			this.error( '' )
			this.step( 0 )
			if ( mock_file_size_mb > 10 ) {
				this.error( this.error_too_large_template().replace( '%s', mock_file_size_mb.toFixed( 1 ) ) )
				return
			}
			this.tick( 1 )
		}

		tick( next_step: number ) {
			setTimeout( () => {
				this.step( next_step )
				if ( next_step >= this.total_steps() ) {
					setTimeout( () => this.complete( null ), 200 )
					return
				}
				this.tick( next_step + 1 )
			}, 600 )
		}

		@$mol_action
		close() {
			this.showed( false )
			this.step( 0 )
			this.error( '' )
			return null
		}

	}

}
