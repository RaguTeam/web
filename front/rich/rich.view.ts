namespace $.$$ {

	const katex_uri = 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/'

	export class $raggu_web_front_rich extends $.$raggu_web_front_rich {

		plain() {
			return !$raggu_web_front_lib_rich_markup( this.text() )
		}

		has_html() {
			return $raggu_web_front_lib_rich_html( this.text() )
		}

		@ $mol_mem
		katex() {
			if( !$raggu_web_front_lib_rich_math( this.text() ) ) return null
			try {
				this.$.$mol_import.style( katex_uri + 'katex.min.css' )
				return this.$.$mol_import.script( katex_uri + 'katex.min.js' ).katex as {
					renderToString( tex: string, options: object ): string
				}
			} catch( error ) {
				if( $mol_promise_like( error ) ) return null
				return null
			}
		}

		@ $mol_mem
		html() {

			const text = this.text()
			const doc = this.$.$mol_dom_context.document
			const root = doc.createElement( 'div' )

			if( !$raggu_web_front_lib_rich_markup( text ) ) {
				root.textContent = text
				return root.innerHTML
			}

			if( $raggu_web_front_lib_rich_html( text ) ) {
				const parsed = new DOMParser().parseFromString( text, 'text/html' )
				root.append( ... $raggu_web_front_rich_clean( parsed.body ) )
			} else {
				root.append( doc.createTextNode( text ) )
			}

			const katex = this.katex()
			const walker = doc.createTreeWalker( root, NodeFilter.SHOW_TEXT )
			const texts: Text[] = []
			for( let node = walker.nextNode(); node; node = walker.nextNode() ) texts.push( node as Text )

			for( const node of texts ) {
				const parts = $raggu_web_front_lib_rich_split( node.data )
				if( !parts.some( part => part.kind === 'math' ) ) continue
				node.replaceWith( ... parts.map( part => {
					if( part.kind === 'text' ) return doc.createTextNode( part.value )
					const slot = doc.createElement( 'span' )
					slot.className = part.display ? 'rich-math rich-math-display' : 'rich-math'
					if( katex ) slot.innerHTML = katex.renderToString( part.value, { displayMode: part.display, throwOnError: false, trust: false } )
					else slot.textContent = part.value
					return slot
				} ) )
			}

			return root.innerHTML
		}

	}

	const allowed = new Set< string >( $raggu_web_front_lib_rich_tags )

	export function $raggu_web_front_rich_clean( from: Node ): Node[] {

		const out: Node[] = []

		for( const child of Array.from( from.childNodes ) ) {

			if( child.nodeType === Node.TEXT_NODE ) {
				out.push( document.createTextNode( child.textContent ?? '' ) )
				continue
			}

			if( child.nodeType !== Node.ELEMENT_NODE ) continue

			const element = child as Element
			const tag = element.tagName.toLowerCase()
			const kids = $raggu_web_front_rich_clean( element )

			if( tag === 'script' || tag === 'style' || tag === 'iframe' || tag === 'object' ) continue

			if( !allowed.has( tag ) ) {
				out.push( ... kids )
				continue
			}

			const copy = document.createElement( tag )
			for( const name of [ 'colspan', 'rowspan' ] ) {
				const value = element.getAttribute( name )
				if( value !== null && /^\d+$/.test( value ) ) copy.setAttribute( name, value )
			}
			copy.append( ... kids )
			out.push( copy )
		}

		return out
	}

}
