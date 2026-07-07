namespace $.$$ {

	type $raggu_web_front_settings_preset_values = {
		chunking_strategy: string
		chunking_size: number
		chunking_overlap: number
		extraction_mode: string
		extraction_model: string
		extraction_icl: string
		summarization_dbscan: boolean
		summarization_llm: boolean
		communities_algo: string
		communities_resolution_x10: number
		refinement_isolated: boolean
		search_mode: string
		search_rerank: boolean
		search_topk: number
	}

	const $raggu_web_front_settings_presets: Record< string, $raggu_web_front_settings_preset_values > = {
		fast: {
			chunking_strategy: 'Simple',
			chunking_size: 256,
			chunking_overlap: 32,
			extraction_mode: 'single',
			extraction_model: 'meno-lite-7b',
			extraction_icl: 'random',
			summarization_dbscan: false,
			summarization_llm: false,
			communities_algo: 'Leiden',
			communities_resolution_x10: 10,
			refinement_isolated: false,
			search_mode: 'Naive',
			search_rerank: false,
			search_topk: 5,
		},
		accurate: {
			chunking_strategy: 'SmartSemantic',
			chunking_size: 1024,
			chunking_overlap: 128,
			extraction_mode: 'two-stage',
			extraction_model: 'gpt-4',
			extraction_icl: 'hybrid',
			summarization_dbscan: true,
			summarization_llm: true,
			communities_algo: 'Leiden',
			communities_resolution_x10: 15,
			refinement_isolated: true,
			search_mode: 'Mix',
			search_rerank: true,
			search_topk: 10,
		},
		demo: {
			chunking_strategy: 'SmartSemantic',
			chunking_size: 512,
			chunking_overlap: 64,
			extraction_mode: 'two-stage',
			extraction_model: 'meno-lite-7b',
			extraction_icl: 'hybrid',
			summarization_dbscan: true,
			summarization_llm: false,
			communities_algo: 'Leiden',
			communities_resolution_x10: 10,
			refinement_isolated: true,
			search_mode: 'Local',
			search_rerank: true,
			search_topk: 8,
		},
	}

	export class $raggu_web_front_settings extends $.$raggu_web_front_settings {

		@$mol_action
		close() {
			this.showed( false )
			return null
		}

		// ---- preset handlers ----

		@$mol_action
		preset_fast() {
			this.apply_preset( 'fast' )
			return null
		}

		@$mol_action
		preset_accurate() {
			this.apply_preset( 'accurate' )
			return null
		}

		@$mol_action
		preset_demo() {
			this.apply_preset( 'demo' )
			return null
		}

		@$mol_action
		apply_preset( name: string ) {
			const values = $raggu_web_front_settings_presets[ name ]
			if( !values ) return null
			this.chunking_strategy( values.chunking_strategy )
			this.chunking_size_str( String( values.chunking_size ) )
			this.chunking_overlap_str( String( values.chunking_overlap ) )
			this.extraction_mode( values.extraction_mode )
			this.extraction_model( values.extraction_model )
			this.extraction_icl( values.extraction_icl )
			this.summarization_dbscan( values.summarization_dbscan )
			this.summarization_llm( values.summarization_llm )
			this.communities_algo( values.communities_algo )
			this.communities_resolution_x10( values.communities_resolution_x10 )
			this.refinement_isolated( values.refinement_isolated )
			this.search_mode( values.search_mode )
			this.search_rerank( values.search_rerank )
			this.search_topk( values.search_topk )
			return null
		}

		// ---- local-state-backed fields ----

		@$mol_mem
		chunking_strategy( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.chunking_strategy', next ?? null ) ?? 'SmartSemantic'
		}

		@$mol_mem
		chunking_size_str( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.chunking_size_str', next ?? null ) ?? '512'
		}

		@$mol_mem
		chunking_overlap_str( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.chunking_overlap_str', next ?? null ) ?? '64'
		}

		@$mol_mem
		extraction_mode( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.extraction_mode', next ?? null ) ?? 'two-stage'
		}

		@$mol_mem
		extraction_model( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.extraction_model', next ?? null ) ?? 'meno-lite-7b'
		}

		@$mol_mem
		extraction_icl( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.extraction_icl', next ?? null ) ?? 'hybrid'
		}

		@$mol_mem
		summarization_dbscan( next?: boolean ): boolean {
			const v = this.$.$mol_state_local.value( '$raggu_web_front_settings.summarization_dbscan', next ?? null )
			return v ?? true
		}

		@$mol_mem
		summarization_llm( next?: boolean ): boolean {
			const v = this.$.$mol_state_local.value( '$raggu_web_front_settings.summarization_llm', next ?? null )
			return v ?? false
		}

		@$mol_mem
		communities_algo( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.communities_algo', next ?? null ) ?? 'Leiden'
		}

		@$mol_mem
		communities_resolution_x10( next?: number ): number {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.communities_resolution_x10', next ?? null ) ?? 10
		}

		communities_resolution_label(): string {
			return ( this.communities_resolution_x10() / 10 ).toFixed( 1 )
		}

		@$mol_mem
		refinement_isolated( next?: boolean ): boolean {
			const v = this.$.$mol_state_local.value( '$raggu_web_front_settings.refinement_isolated', next ?? null )
			return v ?? true
		}

		@$mol_mem
		search_mode( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.search_mode', next ?? null ) ?? 'Local'
		}

		@$mol_mem
		search_rerank( next?: boolean ): boolean {
			const v = this.$.$mol_state_local.value( '$raggu_web_front_settings.search_rerank', next ?? null )
			return v ?? true
		}

		@$mol_mem
		search_topk( next?: number ): number {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.search_topk', next ?? null ) ?? 8
		}

		search_topk_label(): string {
			return String( this.search_topk() )
		}

	}

}
