namespace $.$$ {

	/**
	 * Свой корпус на каждый тест.
	 *
	 * История лежит в сессии под ключом с dataset_id, и одно общее значение
	 * протекало бы между тестами: соседний тест увидел бы чужую переписку.
	 */
	let seq = 0
	function chat( $: $ ) {
		// Идентификатор считается один раз на вид: он входит в ключ хранилища,
		// и счётчик внутри геттера давал бы новый ключ на каждое обращение.
		const id = `trace-test-${ ++seq }`
		return $raggu_web_front_chat.make( { $, dataset_id: () => id } )
	}

	const full_trace = {
		engine: 'mix',
		entities: [ {}, {} ],
		chunks: [ {}, {}, {} ],
		timings: { total_ms: 4200 },
		rerank_error: null,
		usage: { total_tokens: 1340, cost: 0.25, currency: '₽', priced: true },
	}

	$mol_test( {

		'chat.compact_trace: keeps only what the line shows'( $ ) {
			// История живёт в sessionStorage; целиком трейс несёт тексты всех
			// найденных фрагментов и раздул бы её на порядок.
			const compact = chat( $ ).compact_trace( full_trace, 'mix' )!
			$mol_assert_equal( compact.entities, 2 )
			$mol_assert_equal( compact.chunks, 3 )
			$mol_assert_equal( compact.tokens, 1340 )
			$mol_assert_equal( ( compact as any ).sources, undefined )
		},

		'chat.compact_trace: an answer without a trace stays without one'( $ ) {
			$mol_assert_equal( chat( $ ).compact_trace( undefined, 'mix' ), undefined )
		},

		'chat.compact_trace: survives a backend that knows no usage'( $ ) {
			const compact = chat( $ ).compact_trace( { engine: 'naive' }, 'naive' )!
			$mol_assert_equal( compact.tokens, 0 )
			$mol_assert_equal( compact.priced, false )
		},

		'chat.message_trace: reports engine, context size and time'( $ ) {
			const v = chat( $ )
			v.history( [ { role: 'assistant', text: 'ответ', trace: v.compact_trace( full_trace, 'mix' ) } ] )
			const line = v.message_trace( 0 )
			$mol_assert_equal( /^mix /.test( line ), true )
			$mol_assert_equal( /2 сущн/.test( line ), true )
			$mol_assert_equal( /3 фрагм/.test( line ), true )
			$mol_assert_equal( /4\.2 с/.test( line ), true )
		},

		'chat.message_trace: cost is shown only when prices are configured'( $ ) {
			// Ноль рядом с реальным вопросом читался бы как «бесплатно», а
			// означает «не оценено».
			const v = chat( $ )
			const unpriced = { ... full_trace, usage: { total_tokens: 90, cost: 0, currency: '', priced: false } }
			v.history( [ { role: 'assistant', text: 'a', trace: v.compact_trace( unpriced, 'mix' ) } ] )
			$mol_assert_equal( /90 ток/.test( v.message_trace( 0 ) ), true )
			$mol_assert_equal( /0\.0000/.test( v.message_trace( 0 ) ), false )
		},

		'chat.message_trace: a failed reranker is visible in the line'( $ ) {
			const v = chat( $ )
			const failed = { ... full_trace, rerank_error: 'reranker timed out' }
			v.history( [ { role: 'assistant', text: 'a', trace: v.compact_trace( failed, 'mix' ) } ] )
			$mol_assert_equal( /без реранка/.test( v.message_trace( 0 ) ), true )
			$mol_assert_equal( /timed out/.test( v.message_trace_hint( 0 ) ), true )
		},

		'chat.message_trace_hint: names a substituted mode'( $ ) {
			const v = chat( $ )
			const substituted = { ... full_trace, engine: 'naive' }
			v.history( [ { role: 'assistant', text: 'a', trace: v.compact_trace( substituted, 'mix' ) } ] )
			$mol_assert_equal( /Запрошен режим mix/.test( v.message_trace_hint( 0 ) ), true )
		},

		'chat.message_has_trace: a user message has none'( $ ) {
			const v = chat( $ )
			v.history( [ { role: 'user', text: 'вопрос' } ] )
			$mol_assert_equal( v.message_has_trace( 0 ), false )
			$mol_assert_equal( v.message_trace( 0 ), '' )
		},

		// ---- треды ----

		'chat.threads: a corpus starts with one thread to write into'( $ ) {
			const v = chat( $ )
			$mol_assert_equal( v.threads().length, 1 )
			$mol_assert_equal( v.history().length, 0 )
		},

		'chat.threads: two threads of one corpus keep separate modes'( $ ) {
			// Ровно то, ради чего треды и заводились: сравнить mix и naive на
			// одном корпусе, не переписывая условия уже состоявшегося разговора.
			const v = chat( $ )
			v.thread_engine( 'mix' )
			$mol_assert_equal( v.threads()[ 0 ].engine, 'mix' )
			v.thread_add()
			$mol_assert_equal( v.threads().length, 2 )
			$mol_assert_equal( v.thread_id(), v.threads()[ 1 ].id )
			v.thread_engine( 'naive' )
			$mol_assert_equal( v.threads()[ 1 ].engine, 'naive' )
			$mol_assert_equal( v.engine(), 'naive' )
			v.thread_click( 0 )
			$mol_assert_equal( v.engine(), 'mix' )
		},

		'chat.threads: histories do not leak between threads'( $ ) {
			const v = chat( $ )
			v.history( [ { role: 'user', text: 'первый' } ] )
			v.thread_add()
			$mol_assert_equal( v.history().length, 0 )
			v.thread_click( 0 )
			$mol_assert_equal( v.history()[ 0 ].text, 'первый' )
		},

		'chat.thread_add: a new thread continues in the same mode'( $ ) {
			const v = chat( $ )
			v.thread_engine( 'local' )
			v.thread_add()
			$mol_assert_equal( v.engine(), 'local' )
		},

		'chat.thread_title: named by its first question, not by a number'( $ ) {
			// По номеру нельзя вспомнить, о чём тред, а сравнивают их именно по
			// содержанию.
			const v = chat( $ )
			v.thread_engine( 'naive' )
			v.history( [ { role: 'user', text: 'Кто написал язык C?' } ] )
			$mol_assert_equal( /Кто написал/.test( v.thread_title( 0 ) ), true )
			$mol_assert_equal( /naive/.test( v.thread_title( 0 ) ), true )
		},

		'chat.threads: switching corpus shows that corpus threads'( $ ) {
			const one = $raggu_web_front_chat.make( { $, dataset_id: () => 'corpus-a' } )
			const two = $raggu_web_front_chat.make( { $, dataset_id: () => 'corpus-b' } )
			one.history( [ { role: 'user', text: 'только в A' } ] )
			$mol_assert_equal( two.history().length, 0 )
			$mol_assert_equal( one.history().length, 1 )
		},

		'chat.threads: survive a reload'( $ ) {
			// local, а не session: переписка, пропадающая с вкладкой, сравнением
			// двух режимов быть не может.
			const v = chat( $ )
			const key = v.threads_key()
			v.thread_engine( 'naive' )
			const stored = $.$mol_state_local.value( key ) as any
			$mol_assert_equal( stored[ 0 ].engine, 'naive' )
		},

		'chat.thread_id: a stale id does not leave the chat without a thread'( $ ) {
			const v = chat( $ )
			v.thread_id( 'удалённый' )
			$mol_assert_equal( v.thread_id(), v.threads()[ 0 ].id )
		},

	} )

}
