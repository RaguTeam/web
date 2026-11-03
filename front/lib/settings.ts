namespace $ {

	export type $raggu_web_front_lib_settings_value = {
		useGraph: boolean
		queryPlan: boolean
		topK: number
		rerank: boolean
		graphLimit: number
	}

	export const $raggu_web_front_lib_settings_default: $raggu_web_front_lib_settings_value = {
		useGraph: true,
		queryPlan: false,
		topK: 8,
		rerank: false,
		graphLimit: 600,
	}

	export const $raggu_web_front_lib_graph_limit_max = 5000
	export const $raggu_web_front_lib_graph_limit_steps = [ 600, 1500, 3000, 5000 ] as const
	export const $raggu_web_front_lib_top_k_min = 1
	export const $raggu_web_front_lib_top_k_max = 50

	export function $raggu_web_front_lib_settings_revive( raw: unknown ): $raggu_web_front_lib_settings_value {

		const base = $raggu_web_front_lib_settings_default
		if( typeof raw !== 'object' || raw === null ) return base

		const value = raw as Partial< $raggu_web_front_lib_settings_value >
		const clamp = $raggu_web_front_lib_clamp

		return {
			useGraph: typeof value.useGraph === 'boolean' ? value.useGraph : base.useGraph,
			queryPlan: typeof value.queryPlan === 'boolean' ? value.queryPlan : base.queryPlan,
			topK: typeof value.topK === 'number'
				? clamp( Math.round( value.topK ), $raggu_web_front_lib_top_k_min, $raggu_web_front_lib_top_k_max )
				: base.topK,
			rerank: typeof value.rerank === 'boolean' ? value.rerank : base.rerank,
			graphLimit: typeof value.graphLimit === 'number'
				? clamp( Math.round( value.graphLimit ), 50, $raggu_web_front_lib_graph_limit_max )
				: base.graphLimit,
		}

	}

	export class $raggu_web_front_lib_settings extends $mol_object {

		@ $mol_mem
		static value( next?: $raggu_web_front_lib_settings_value ) {
			const stored = this.$.$mol_state_local.value( 'ragu.settings', next ) as unknown
			return $raggu_web_front_lib_settings_revive( stored )
		}

		static patch( patch: Partial< $raggu_web_front_lib_settings_value > ) {
			this.value( { ... this.value(), ... patch } )
		}

		static reset() {
			this.value( $raggu_web_front_lib_settings_default )
		}

	}

}
