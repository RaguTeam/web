namespace $ {

	$mol_test({

		'badge keeps five characters at most'() {
			$mol_assert_equal( $raggu_web_front_lib_badge( 999 ), '999' )
			$mol_assert_equal( $raggu_web_front_lib_badge( 1234 ), '1.2k' )
			$mol_assert_equal( $raggu_web_front_lib_badge( 41767 ), '42k' )
			$mol_assert_equal( $raggu_web_front_lib_badge( 2_400_000 ), '2.4M' )
		},

		'type names come from the tree and fall back to the token'() {
			$mol_locale.lang( 'en' )
			$mol_locale.texts( 'en', {
				'$raggu_web_front_lib_names_relation_RELATED_TO': 'Related to',
				'$raggu_web_front_lib_names_entity_GENE_MUTATION': 'Gene mutation',
			} )
			$mol_assert_equal( $raggu_web_front_lib_relation_name( 'RELATED_TO' ), 'Related to' )
			$mol_assert_equal( $raggu_web_front_lib_entity_name( 'GeneMutation' ), 'Gene mutation' )
			$mol_assert_equal( $raggu_web_front_lib_entity_name( 'UNKNOWN_KIND' ), 'Unknown kind' )
		},

		'settings revive clamps and fills defaults'() {
			const value = $raggu_web_front_lib_settings_revive( { topK: 900, graphLimit: 9, useGraph: 'yes' } )
			$mol_assert_equal( value.topK, 50 )
			$mol_assert_equal( value.graphLimit, 50 )
			$mol_assert_equal( value.useGraph, true )
			$mol_assert_equal( value.rerank, false )
		},

		'citation folds into the phrase that named it'() {
			const segments = $raggu_web_front_lib_cite_parse(
				'Aspirin (Entity: ent-abc123def) lowers fever.',
				id => id === 'ent-abc123def' ? 'Aspirin' : undefined,
			)
			$mol_assert_equal( segments, [
				{ kind: 'text', value: '' },
				{ kind: 'ref', id: 'ent-abc123def', type: 'entity', text: 'Aspirin', inline: true },
				{ kind: 'text', value: ' lowers fever.' },
			] )
		},

		'bare russian chunk id gets its prefix back'() {
			const segments = $raggu_web_front_lib_cite_parse( 'Текст (см. 0123456789abcdef0123) и **жирный**.' )
			$mol_assert_equal( segments, [
				{ kind: 'text', value: 'Текст ' },
				{ kind: 'ref', id: 'chunk-0123456789abcdef0123', type: 'chunk', text: 'src', inline: false },
				{ kind: 'text', value: ' и ' },
				{ kind: 'strong', value: 'жирный' },
				{ kind: 'text', value: '.' },
			] )
		},

		'sse survives pieces split mid line'() {
			const got: string[] = []
			const parser = $raggu_web_front_lib_sse( event => got.push( `${ event.event }:${ event.data }` ) )
			parser.push( 'event: delta\nda' )
			parser.push( 'ta: {"text":"a"}\n\nevent: message\ndata: 1' )
			parser.end()
			$mol_assert_equal( got, [ 'delta:{"text":"a"}', 'message:1' ] )
		},

		'math keeps dollar prices as text'() {
			$mol_assert_equal( $raggu_web_front_lib_rich_math( 'from $5 to $10' ), false )
			$mol_assert_equal( $raggu_web_front_lib_rich_split( 'mass $m_1$ here' ), [
				{ kind: 'text', value: 'mass ' },
				{ kind: 'math', value: 'm_1', display: false },
				{ kind: 'text', value: ' here' },
			] )
		},

	})

}
