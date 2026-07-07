namespace $.$$ {

	type FormatId = 'graphml' | 'gexf' | 'json_graph' | 'png_graph'
		| 'md_chat' | 'json_chat'
		| 'csv_dash' | 'json_dash'

	type FormatDef = {
		id: FormatId
		label_key: string
		fallback: string
		ext: string
		mime: string
	}

	const FORMATS: Record<string, FormatDef[]> = {
		explorer: [
			{ id: 'graphml', label_key: '$raggu_web_front_export_fmt_graphml', fallback: 'GraphML (.xml)', ext: 'xml', mime: 'application/xml' },
			{ id: 'gexf', label_key: '$raggu_web_front_export_fmt_gexf', fallback: 'GEXF (.gexf)', ext: 'gexf', mime: 'application/xml' },
			{ id: 'json_graph', label_key: '$raggu_web_front_export_fmt_json_graph', fallback: 'JSON (.json)', ext: 'json', mime: 'application/json' },
			{ id: 'png_graph', label_key: '$raggu_web_front_export_fmt_png_graph', fallback: 'PNG (.png)', ext: 'png', mime: 'image/png' },
		],
		chat: [
			{ id: 'md_chat', label_key: '$raggu_web_front_export_fmt_md_chat', fallback: 'Markdown (.md)', ext: 'md', mime: 'text/markdown' },
			{ id: 'json_chat', label_key: '$raggu_web_front_export_fmt_json_chat', fallback: 'JSON (.json)', ext: 'json', mime: 'application/json' },
		],
		dashboard: [
			{ id: 'csv_dash', label_key: '$raggu_web_front_export_fmt_csv_dash', fallback: 'CSV (.csv)', ext: 'csv', mime: 'text/csv' },
			{ id: 'json_dash', label_key: '$raggu_web_front_export_fmt_json_dash', fallback: 'JSON (.json)', ext: 'json', mime: 'application/json' },
		],
		gallery: [],
	}

	type GraphNode = { id: string; label: string; type: string }
	type GraphEdge = { source: string; target: string; type: string; weight: number }

	const GRAPH_NODES: GraphNode[] = [
		{ id: 'n1', label: 'Bjørnstjerne Bjørnson', type: 'PERSON' },
		{ id: 'n2', label: 'Norwegian anthem', type: 'WORK_OF_ART' },
		{ id: 'n3', label: '1859', type: 'DATE' },
		{ id: 'n4', label: 'Nobel Prize', type: 'EVENT' },
		{ id: 'n5', label: 'Kvikne, Norway', type: 'LOCATION' },
		{ id: 'n6', label: 'Henrik Ibsen', type: 'PERSON' },
		{ id: 'n7', label: 'Det Norske Theater', type: 'ORGANIZATION' },
		{ id: 'n8', label: 'Romantic Nationalism', type: 'EVENT' },
	]

	const GRAPH_EDGES: GraphEdge[] = [
		{ source: 'n1', target: 'n2', type: 'AUTHORED', weight: 0.95 },
		{ source: 'n2', target: 'n3', type: 'YEAR', weight: 0.9 },
		{ source: 'n1', target: 'n4', type: 'AWARDED_WITH', weight: 0.8 },
		{ source: 'n1', target: 'n5', type: 'PLACE_OF_BIRTH', weight: 0.7 },
		{ source: 'n1', target: 'n6', type: 'CONTEMPORARY_OF', weight: 0.6 },
		{ source: 'n1', target: 'n7', type: 'AFFILIATED_WITH', weight: 0.5 },
		{ source: 'n1', target: 'n8', type: 'PART_OF', weight: 0.65 },
		{ source: 'n6', target: 'n7', type: 'AFFILIATED_WITH', weight: 0.55 },
	]

	function xml_escape( s: string ) {
		return s.replace( /&/g, '&amp;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
			.replace( /"/g, '&quot;' )
			.replace( /'/g, '&apos;' )
	}

	function to_graphml() {
		const nodes = GRAPH_NODES.map(
			n => `    <node id="${ xml_escape( n.id ) }"><data key="label">${ xml_escape( n.label ) }</data><data key="type">${ xml_escape( n.type ) }</data></node>`
		).join( '\n' )
		const edges = GRAPH_EDGES.map(
			( e, i ) => `    <edge id="e${ i }" source="${ xml_escape( e.source ) }" target="${ xml_escape( e.target ) }"><data key="rel">${ xml_escape( e.type ) }</data><data key="weight">${ e.weight }</data></edge>`
		).join( '\n' )
		return `<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns">
  <key id="label" for="node" attr.name="label" attr.type="string"/>
  <key id="type" for="node" attr.name="type" attr.type="string"/>
  <key id="rel" for="edge" attr.name="rel" attr.type="string"/>
  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>
  <graph id="G" edgedefault="directed">
${ nodes }
${ edges }
  </graph>
</graphml>`
	}

	function to_gexf() {
		const nodes = GRAPH_NODES.map(
			n => `      <node id="${ xml_escape( n.id ) }" label="${ xml_escape( n.label ) }"><attvalues><attvalue for="0" value="${ xml_escape( n.type ) }"/></attvalues></node>`
		).join( '\n' )
		const edges = GRAPH_EDGES.map(
			( e, i ) => `      <edge id="${ i }" source="${ xml_escape( e.source ) }" target="${ xml_escape( e.target ) }" weight="${ e.weight }" label="${ xml_escape( e.type ) }"/>`
		).join( '\n' )
		return `<?xml version="1.0" encoding="UTF-8"?>
<gexf xmlns="http://www.gexf.net/1.3" version="1.3">
  <graph mode="static" defaultedgetype="directed">
    <attributes class="node">
      <attribute id="0" title="type" type="string"/>
    </attributes>
    <nodes>
${ nodes }
    </nodes>
    <edges>
${ edges }
    </edges>
  </graph>
</gexf>`
	}

	function to_json_graph() {
		return JSON.stringify( { nodes: GRAPH_NODES, edges: GRAPH_EDGES }, null, '\t' )
	}

	// Stub PNG: 1x1 transparent pixel. Real graph rasterization is future work.
	function to_png_stub(): Blob {
		const bytes = new Uint8Array( [
			0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
			0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
			0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
			0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
			0x89, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x44, 0x41,
			0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
			0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00,
			0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
			0x42, 0x60, 0x82,
		] )
		return new Blob( [ bytes ], { type: 'image/png' } )
	}

	const CHAT = {
		question: 'Who wrote the Norwegian anthem and when?',
		answer: 'The Norwegian anthem was written by Bjørnstjerne Bjørnson in 1859.',
		trace: {
			mode: 'LocalSearch',
			top_k: 8,
			rerank: true,
			entities: [ 'Bjørnson', 'Norwegian anthem', '1859' ],
			chunks: 3,
			communities: 1,
			retrieval_ms: 140,
			gen_s: 1.2,
			power_wh: 0.4,
		},
	}

	function to_md_chat() {
		const t = CHAT.trace
		return `# Chat export

## Q
${ CHAT.question }

## A
${ CHAT.answer }

## Trace
- mode: ${ t.mode }
- top-k: ${ t.top_k }
- rerank: ${ t.rerank ? 'yes' : 'no' }
- entities: ${ t.entities.join( ', ' ) }
- chunks: ${ t.chunks }
- communities: ${ t.communities }
- retrieval: ${ t.retrieval_ms } ms
- generation: ${ t.gen_s } s
- power: ~${ t.power_wh } Wh
`
	}

	function to_json_chat() {
		return JSON.stringify( CHAT, null, '\t' )
	}

	const METRICS = [
		{ id: 'correctness', name: 'Answer Correctness', value: '59.0', pct: '59%' },
		{ id: 'recall', name: 'Evidence Recall', value: '84.2', pct: '84%' },
		{ id: 'relevancy', name: 'Context Relevancy', value: '90.8', pct: '91%' },
	]

	const STAGES = [
		{ id: 'chunking', name: 'Chunking', time: '1.2s', pct: '15%' },
		{ id: 'extraction', name: 'Extraction', time: '8.4s', pct: '70%' },
		{ id: 'summarization', name: 'Summarization', time: '3.1s', pct: '38%' },
		{ id: 'communities', name: 'Communities', time: '2.0s', pct: '26%' },
		{ id: 'refinement', name: 'Refinement', time: '0.6s', pct: '9%' },
	]

	function csv_field( s: string ) {
		const needs = /[",\n]/.test( s )
		const esc = s.replace( /"/g, '""' )
		return needs ? `"${ esc }"` : esc
	}

	function to_csv_dash() {
		const lines: string[] = []
		lines.push( [ 'section', 'id', 'name', 'value', 'pct' ].join( ',' ) )
		for ( const m of METRICS ) {
			lines.push( [ 'metric', m.id, m.name, m.value, m.pct ].map( csv_field ).join( ',' ) )
		}
		for ( const s of STAGES ) {
			lines.push( [ 'stage', s.id, s.name, s.time, s.pct ].map( csv_field ).join( ',' ) )
		}
		return lines.join( '\n' ) + '\n'
	}

	function to_json_dash() {
		return JSON.stringify( { metrics: METRICS, stages: STAGES }, null, '\t' )
	}

	export class $raggu_web_front_export extends $.$raggu_web_front_export {

		@$mol_action
		toggle() {
			this.showed( !this.showed() )
			return null
		}

		formats() {
			return FORMATS[ this.screen() ] ?? []
		}

		items() {
			const list = this.formats()
			if ( !list.length ) return [ this.Empty() ]
			return list.map( ( _, i ) => this.Item( i ) )
		}

		format_at( i: number ) {
			return this.formats()[ i ]
		}

		item_label( i: number ) {
			const f = this.format_at( i )
			if ( !f ) return ''
			return this.$.$mol_locale.text( f.label_key ) || f.fallback
		}

		@$mol_action
		item_click( i: number ) {
			const f = this.format_at( i )
			if ( !f ) return null
			this.download( f )
			this.showed( false )
			return null
		}

		filename( f: FormatDef ) {
			const stamp = new Date().toISOString().slice( 0, 10 )
			return `raggu-${ this.screen() }-${ stamp }.${ f.ext }`
		}

		payload( id: FormatId ): Blob {
			switch ( id ) {
				case 'graphml': return new Blob( [ to_graphml() ], { type: 'application/xml' } )
				case 'gexf': return new Blob( [ to_gexf() ], { type: 'application/xml' } )
				case 'json_graph': return new Blob( [ to_json_graph() ], { type: 'application/json' } )
				case 'png_graph': return to_png_stub()
				case 'md_chat': return new Blob( [ to_md_chat() ], { type: 'text/markdown' } )
				case 'json_chat': return new Blob( [ to_json_chat() ], { type: 'application/json' } )
				case 'csv_dash': return new Blob( [ to_csv_dash() ], { type: 'text/csv' } )
				case 'json_dash': return new Blob( [ to_json_dash() ], { type: 'application/json' } )
			}
		}

		download( f: FormatDef ) {
			const blob = this.payload( f.id )
			const url = URL.createObjectURL( blob )
			const a = document.createElement( 'a' )
			a.href = url
			a.download = this.filename( f )
			document.body.appendChild( a )
			a.click()
			a.remove()
			setTimeout( () => URL.revokeObjectURL( url ), 1000 )
		}

	}

}
