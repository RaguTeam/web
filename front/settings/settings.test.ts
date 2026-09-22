namespace $.$$ {

	// Проверки идут по спискам режимов, а не по их подписям: чтение
	// @-локализованных строк в свежем $ каждого теста даёт фантомные
	// «Not translated» уже после прогона. Подписи — предмет браузерного
	// сценария, где локаль прогрета.
	function panel( $: $, available: string[] ) {
		return $raggu_web_front_settings.make( { $, available_engines: () => available } )
	}

	$mol_test( {

		'settings.engine_options: offers only what the corpus serves'( $ ) {
			// Недоступный режим в списке был бы кнопкой, на которую некому
			// ответить: без своего хранилища он здесь не заработает никогда.
			$mol_assert_equal( panel( $, [ 'mix', 'naive' ] ).engine_options().join( ',' ), 'mix,naive' )
		},

		'settings.engine_options: keeps the preferred order, not the given one'( $ ) {
			$mol_assert_equal( panel( $, [ 'naive', 'mix' ] ).engine_options().join( ',' ), 'mix,naive' )
		},

		'settings.engine_value: falls back when the choice is not served'( $ ) {
			// Бэк подставит доступный режим и сам, но интерфейс не должен
			// показывать одно, а отправлять другое.
			const view = panel( $, [ 'naive' ] )
			view.engine( 'mix' )
			$mol_assert_equal( view.engine_value(), 'naive' )
		},

		'settings.engine_value: keeps the choice when it is served'( $ ) {
			const view = panel( $, [ 'mix', 'local', 'naive' ] )
			view.engine( 'local' )
			$mol_assert_equal( view.engine_value(), 'local' )
		},

		'settings.engine_missing: names what this corpus cannot do'( $ ) {
			$mol_assert_equal( panel( $, [ 'mix', 'naive' ] ).engine_missing().join( ',' ), 'local,global' )
		},

		'settings.engine_missing: empty when everything is served'( $ ) {
			const all = [ 'mix', 'local', 'naive', 'global' ]
			$mol_assert_equal( panel( $, all ).engine_missing().length, 0 )
		},

		'settings.engine_value: a corpus with nothing still yields a mode'( $ ) {
			// Пустой список — сломанный корпус. Селект всё равно обязан иметь
			// значение, иначе виджет остаётся без выбранного пункта.
			$mol_assert_equal( panel( $, [] ).engine_value(), 'mix' )
		},

	} )

}
