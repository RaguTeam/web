namespace $ {

	export const $raggu_web_front_lib_rich_tags = [
		'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
		'b', 'strong', 'i', 'em', 'u', 'sub', 'sup', 'br', 'p', 'span', 'ul', 'ol', 'li', 'code',
	] as const

	const html_tag = new RegExp( `</?(?:${ $raggu_web_front_lib_rich_tags.join( '|' ) })\\b[^>]*>`, 'i' )

	export type $raggu_web_front_lib_rich_part =
		| { kind: 'text', value: string }
		| { kind: 'math', value: string, display: boolean }

	export function $raggu_web_front_lib_rich_html( text: string ) {
		return html_tag.test( text )
	}

	export function $raggu_web_front_lib_rich_math( text: string ) {
		return $raggu_web_front_lib_rich_split( text ).some( part => part.kind === 'math' )
	}

	export function $raggu_web_front_lib_rich_markup( text: string ) {
		return $raggu_web_front_lib_rich_html( text ) || $raggu_web_front_lib_rich_math( text )
	}

	const pairs = [
		{ open: '$$', close: '$$', display: true },
		{ open: '\\[', close: '\\]', display: true },
		{ open: '\\(', close: '\\)', display: false },
	] as const

	function closing_dollar( text: string, open: number ) {

		const first = text[ open + 1 ]
		if( first === undefined || /\s/.test( first ) ) return -1

		for( let j = open + 1; j < text.length; j += 1 ) {
			if( text[ j ] === '\n' && text[ j + 1 ] === '\n' ) return -1
			if( text[ j ] === '$' && text[ j - 1 ] !== '\\' ) {
				if( /\s/.test( text[ j - 1 ] ) || /\d/.test( text[ j + 1 ] ?? '' ) ) return -1
				return j
			}
		}

		return -1
	}

	export function $raggu_web_front_lib_rich_split( text: string ) {

		const parts: $raggu_web_front_lib_rich_part[] = []
		let prose = ''
		let i = 0

		const flush = () => {
			if( !prose ) return
			parts.push( { kind: 'text', value: prose } )
			prose = ''
		}

		while( i < text.length ) {

			if( text.startsWith( '\\$', i ) ) {
				prose += '$'
				i += 2
				continue
			}

			const pair = pairs.find( candidate => text.startsWith( candidate.open, i ) )
			if( pair ) {
				const end = text.indexOf( pair.close, i + pair.open.length )
				const body = end === -1 ? '' : text.slice( i + pair.open.length, end )
				if( body.trim() ) {
					flush()
					parts.push( { kind: 'math', value: body.trim(), display: pair.display } )
					i = end + pair.close.length
					continue
				}
			}

			if( text[ i ] === '$' && !text.startsWith( '$$', i ) ) {
				const end = closing_dollar( text, i )
				if( end !== -1 ) {
					flush()
					parts.push( { kind: 'math', value: text.slice( i + 1, end ), display: false } )
					i = end + 1
					continue
				}
			}

			prose += text[ i ]
			i += 1
		}

		flush()

		return parts
	}

}
