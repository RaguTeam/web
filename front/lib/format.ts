namespace $ {

	export function $raggu_web_front_lib_lang(): 'ru' | 'en' {
		return $mol_locale.lang() === 'ru' ? 'ru' : 'en'
	}

	export function $raggu_web_front_lib_compact( n: number, locale = $raggu_web_front_lib_lang() ) {
		return new Intl.NumberFormat( locale, { notation: 'compact', maximumFractionDigits: 1 } ).format( n )
	}

	export function $raggu_web_front_lib_badge( n: number ) {
		if( n < 1000 ) return String( n )
		if( n < 999_500 ) return `${ ( n / 1000 ).toFixed( n < 9950 ? 1 : 0 ) }k`
		return `${ ( n / 1_000_000 ).toFixed( 1 ) }M`
	}

	export function $raggu_web_front_lib_full( n: number, locale = $raggu_web_front_lib_lang() ) {
		return new Intl.NumberFormat( locale ).format( n )
	}

	export function $raggu_web_front_lib_ms( value: number ) {
		return value < 1000 ? `${ Math.round( value ) } ms` : `${ ( value / 1000 ).toFixed( 1 ) } s`
	}

	export function $raggu_web_front_lib_watt_hours( value: number ) {
		if( value < 0.001 ) return `${ ( value * 1_000_000 ).toFixed( 0 ) } µWh`
		if( value < 1 ) return `${ ( value * 1000 ).toFixed( value < 0.01 ? 1 : 0 ) } mWh`
		return `${ value.toFixed( 2 ) } Wh`
	}

	export function $raggu_web_front_lib_humanize( raw: string ) {
		const words = raw.replace( /[_\s]+/g, ' ' ).trim().toLowerCase()
		return words.charAt( 0 ).toUpperCase() + words.slice( 1 )
	}

	export function $raggu_web_front_lib_narrow() {
		return $mol_media.match( '(max-width: 639.98px)' )
	}

	export function $raggu_web_front_lib_clamp( value: number, min: number, max: number ) {
		return Math.min( max, Math.max( min, value ) )
	}

	function $raggu_web_front_lib_type_key( raw: string ) {
		return raw
			.replace( /([a-z0-9])([A-Z])/g, '$1_$2' )
			.replace( /[\s-]+/g, '_' )
			.toUpperCase()
	}

	let $raggu_web_front_lib_names_all = null as null | $raggu_web_front_lib_names

	function $raggu_web_front_lib_type_name( kind: 'entity' | 'relation', raw: string ) {
		const names = $raggu_web_front_lib_names_all ??= new $raggu_web_front_lib_names
		const method = names[ `${ kind }_${ $raggu_web_front_lib_type_key( raw ) }` as keyof typeof names ]
		if( typeof method === 'function' ) return String( ( method as ()=> string ).call( names ) )
		return $raggu_web_front_lib_humanize( raw )
	}

	export function $raggu_web_front_lib_entity_name( raw: string ) {
		return $raggu_web_front_lib_type_name( 'entity', raw )
	}

	export function $raggu_web_front_lib_relation_name( raw: string ) {
		return $raggu_web_front_lib_type_name( 'relation', raw )
	}

}
