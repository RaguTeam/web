namespace $ {

	/**
	 * Operation descriptor produced by the generator in `-openapi/*.ts`.
	 * Each entry carries HTTP method, route template with `{placeholders}`,
	 * plus typed `params` / `query` / `body` / `out` marker fields.
	 */
	export type $raggu_web_front_api_operation = {
		method: string
		route: string
		params: any
		query: any
		body: any
		out: any
	}

	/** Options passed alongside operation call. */
	export type $raggu_web_front_api_options< Op extends $raggu_web_front_api_operation > = {
		params?: Op[ 'params' ]
		query?: Op[ 'query' ]
		body?: Op[ 'body' ]
	}

	/** Build final URL: substitute `{placeholders}` in route, append querystring. */
	function $raggu_web_front_api_url(
		endpoint: string,
		route: string,
		params: Record< string, any > | undefined,
		query: Record< string, any > | undefined,
	): string {
		let path = route
		if ( params ) {
			for ( const key in params ) {
				path = path.replace( `{${ key }}`, encodeURIComponent( String( params[ key ] ) ) )
			}
		}
		const qs: string[] = []
		if ( query ) {
			for ( const key in query ) {
				const val = query[ key ]
				if ( val === undefined || val === null ) continue
				if ( Array.isArray( val ) ) {
					for ( const item of val ) qs.push( `${ encodeURIComponent( key ) }=${ encodeURIComponent( String( item ) ) }` )
				} else {
					qs.push( `${ encodeURIComponent( key ) }=${ encodeURIComponent( String( val ) ) }` )
				}
			}
		}
		const suffix = qs.length ? `?${ qs.join( '&' ) }` : ''
		return `${ endpoint }${ path }${ suffix }`
	}

	/**
	 * Backend base URL — the ONE line to change when the backend is deployed.
	 * No path suffix here: operation `route`s already carry `/api/v1/...`
	 * from FastAPI's OpenAPI dump.
	 */
	export const $raggu_web_front_api_endpoint_default = 'https://ragu-back.duckdns.org'

	/**
	 * Effective endpoint: the `?api=<url>` app argument overrides the default,
	 * so a freshly deployed backend can be pointed at WITHOUT a rebuild —
	 * e.g. `...test.html#!api=https%3A%2F%2Fback.example.com`.
	 * Reactive: reads propagate via $mol_state_arg, so changing the arg refetches.
	 */
	export function $raggu_web_front_api_endpoint(): string {
		return $mol_state_arg.value( 'api' ) || $raggu_web_front_api_endpoint_default
	}

	/**
	 * Детали ребра — симметрично get_node. На бэке ручки ПОКА НЕТ, дескриптор
	 * написан руками под согласованный контракт. Когда бэк добавит её в
	 * openapi.json, генератор создаст одноимённую константу в ragu.openapi.ts —
	 * тогда эту удалить (билд сам напомнит конфликтом имён). Фронт до тех пор
	 * фолбэчится на данные из get_graph.
	 */
	export const $raggu_web_front_api_ragu_get_edge = {
		method: 'get',
		route: '/api/v1/datasets/{dataset_id}/graph/edges/{edge_id}',
		params: {} as { dataset_id: string, edge_id: string },
		query: {} as Record< string, never >,
		body: undefined as never,
		out: {} as {
			id: string
			source: string
			target: string
			relation_type: string
			description: string
			strength?: number
			chunk_ids?: string[]
		},
	}

	/**
	 * Typed REST client factory for OpenAPI-generated operation descriptors.
	 *
	 * Returns a callable that takes an operation constant plus options and
	 * synchronously (via wire) returns the parsed JSON body. Any network
	 * error propagates as an exception so `$mol_view` shows an error plate.
	 */
	export const $raggu_web_front_api = ( () => {
		const init: RequestInit = {
			credentials: 'omit',
			cache: 'no-cache',
		}
		return function call< Op extends $raggu_web_front_api_operation >(
			op: Op,
			opts: $raggu_web_front_api_options< Op > = {},
		): Op[ 'out' ] {
			const url = $raggu_web_front_api_url( $raggu_web_front_api_endpoint(), op.route, opts.params, opts.query )
			const req: RequestInit = { ... init, method: op.method }
			if ( opts.body !== undefined ) {
				req.headers = { ... ( init.headers ?? {} ), 'content-type': 'application/json' }
				req.body = JSON.stringify( opts.body )
			}
			return $mol_fetch.json( url, req ) as Op[ 'out' ]
		}
	} )()

}
