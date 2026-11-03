namespace $ {

	export class $raggu_web_front_data extends $mol_object {

		static api() {
			return $raggu_web_front_api_endpoint().replace( /\/$/, '' ) + '/api/v1'
		}

		static fetch< Result >( path: string, init?: RequestInit ) {
			return this.$.$mol_fetch.json( this.api() + path, {
				credentials: 'omit',
				... init,
				headers: { accept: 'application/json', ... init?.headers },
			} ) as Result
		}

		@ $mol_mem
		static version( next?: number ) {
			return next ?? 0
		}

		static retry() {
			this.version( this.version() + 1 )
		}

		@ $mol_mem_key
		static datasets( lang: 'ru' | 'en' ) {
			this.version()
			return this.fetch< $raggu_web_front_graph_dataset[] >( `/datasets?locale=${ lang }` )
		}

		static datasets_now() {
			return this.datasets( $raggu_web_front_lib_lang() )
		}

		@ $mol_mem_key
		static graph( key: string ) {
			this.version()
			const [ id, limit ] = key.split( '|' )
			const query = `limit=${ limit }&include_communities=true`
			return this.fetch< $raggu_web_front_graph_response >( `/datasets/${ encodeURIComponent( id ) }/graph?${ query }` )
		}

		@ $mol_mem_key
		static communities( id: string ) {
			return this.fetch< { communities: $raggu_web_front_graph_community[] } >(
				`/datasets/${ encodeURIComponent( id ) }/graph/communities`,
			).communities
		}

		@ $mol_mem_key
		static graph_part( key: string ) {
			const [ id, ... ids ] = key.split( '|' )
			const query = [ 'limit=5000', 'include_communities=false', ... ids.map( cid => `community_ids=${ encodeURIComponent( cid ) }` ) ].join( '&' )
			return this.fetch< $raggu_web_front_graph_response >( `/datasets/${ encodeURIComponent( id ) }/graph?${ query }` )
		}

		@ $mol_mem_key
		static node( key: string ) {
			const [ id, node ] = key.split( '|' )
			return this.fetch< $raggu_web_front_graph_detail >(
				`/datasets/${ encodeURIComponent( id ) }/graph/nodes/${ encodeURIComponent( node ) }`,
			)
		}

		@ $mol_mem_key
		static suggestions( key: string ) {
			const [ id, lang ] = key.split( '|' )
			return this.fetch< { suggestions: string[] } >(
				`/datasets/${ encodeURIComponent( id ) }/agent/suggestions?locale=${ lang }`,
			).suggestions
		}

	}

	/** Value or null while it is on the wire; real errors still surface. */
	export function $raggu_web_front_data_ready< Value >( task: ()=> Value ): Value | null {
		try {
			return task()
		} catch( error ) {
			if( $mol_promise_like( error ) ) return null
			throw error
		}
	}

	/** Value, null while pending, or the error itself, so the view can say what failed. */
	export function $raggu_web_front_data_state< Value >( task: ()=> Value ): { value: Value | null, error: Error | null, pending: boolean } {
		try {
			return { value: task(), error: null, pending: false }
		} catch( error ) {
			if( $mol_promise_like( error ) ) return { value: null, error: null, pending: true }
			return { value: null, error: error as Error, pending: false }
		}
	}

}
