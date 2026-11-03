namespace $ {

	export type $raggu_web_front_lib_cite_kind = 'entity' | 'relation' | 'chunk'

	export type $raggu_web_front_lib_cite_segment =
		| { kind: 'text', value: string }
		| { kind: 'strong', value: string }
		| {
			kind: 'ref'
			id: string
			type: $raggu_web_front_lib_cite_kind
			text: string
			inline: boolean
		}

	export type $raggu_web_front_lib_cite_resolver = ( id: string, type: $raggu_web_front_lib_cite_kind ) => string | undefined

	const id_pattern = String.raw`(?:ent|rel|chunk)-[0-9a-f]{6,}|[0-9a-f]{16,}`

	const citation = new RegExp(
		String.raw`\(\s*(?:([^():,;-]{0,24}?)[\s:.]+)?((?:${ id_pattern })(?:\s*[,;]\s*(?:${ id_pattern }))*)\s*\)`,
		'gi',
	)

	const kind_words: Array< [ RegExp, $raggu_web_front_lib_cite_kind ] > = [
		[ /^(ent|entity|сущност)/i, 'entity' ],
		[ /^(rel|relation|связ|отношен)/i, 'relation' ],
		[ /(chunk|фрагмент|source|источник|см)/i, 'chunk' ],
	]

	function kind_of( raw: string, label: string ): $raggu_web_front_lib_cite_kind {
		if( raw.startsWith( 'ent-' ) ) return 'entity'
		if( raw.startsWith( 'rel-' ) ) return 'relation'
		if( raw.startsWith( 'chunk-' ) ) return 'chunk'
		for( const [ pattern, kind ] of kind_words ) {
			if( pattern.test( label ) ) return kind
		}
		return 'chunk'
	}

	function canonical( raw: string, kind: $raggu_web_front_lib_cite_kind ) {
		if( raw.includes( '-' ) ) return raw
		return `${ kind === 'entity' ? 'ent' : kind === 'relation' ? 'rel' : 'chunk' }-${ raw }`
	}

	const bold = /\*\*([^*]+)\*\*/g

	function push_text( segments: $raggu_web_front_lib_cite_segment[], value: string ) {
		if( !value ) return
		const last = segments[ segments.length - 1 ]
		if( last?.kind === 'text' ) last.value += value
		else segments.push( { kind: 'text', value } )
	}

	function push_prose( segments: $raggu_web_front_lib_cite_segment[], value: string ) {

		if( !value ) return

		let cursor = 0
		bold.lastIndex = 0

		for( let match = bold.exec( value ); match !== null; match = bold.exec( value ) ) {
			push_text( segments, value.slice( cursor, match.index ) )
			segments.push( { kind: 'strong', value: match[ 1 ] } )
			cursor = match.index + match[ 0 ].length
		}

		push_text( segments, value.slice( cursor ) )

	}

	export function $raggu_web_front_lib_cite_parse(
		content: string,
		resolve?: $raggu_web_front_lib_cite_resolver,
	) {

		const segments: $raggu_web_front_lib_cite_segment[] = []
		let cursor = 0

		citation.lastIndex = 0

		for( let match = citation.exec( content ); match !== null; match = citation.exec( content ) ) {

			push_prose( segments, content.slice( cursor, match.index ) )
			cursor = match.index + match[ 0 ].length

			const raws = match[ 2 ].split( /\s*[,;]\s*/ )

			for( let position = 0; position < raws.length; position++ ) {

				const raw = raws[ position ].toLowerCase()
				const type = kind_of( raw, match[ 1 ] ?? '' )
				const id = canonical( raw, type )
				const label = resolve?.( id, type )
				const previous = segments[ segments.length - 1 ]

				if( position === 0 && label && previous?.kind === 'text' ) {
					const trimmed = previous.value.replace( /\s+$/, '' )
					if( trimmed.toLowerCase().endsWith( label.toLowerCase() ) ) {
						const cut = trimmed.length - label.length
						previous.value = trimmed.slice( 0, cut )
						segments.push( { kind: 'ref', id, type, text: trimmed.slice( cut ), inline: true } )
						continue
					}
				}

				if( position > 0 ) segments.push( { kind: 'text', value: ' ' } )

				segments.push( {
					kind: 'ref',
					id,
					type,
					text: label ?? ( type === 'entity' ? id.slice( 4, 12 ) : type === 'relation' ? 'rel' : 'src' ),
					inline: false,
				} )

			}

		}

		push_prose( segments, content.slice( cursor ) )

		return segments
	}

}
