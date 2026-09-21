namespace $.$$ {

	function panel( $: $, available: string[] ) {
		return $raggu_web_front_settings.make( { $, available_engines: () => available } )
	}

	$mol_test( {

		'settings.engine_dictionary: offers only what the corpus serves'( $ ) {
			// Недоступный режим в списке был бы кнопкой, на которую некому
			// ответить: без своего хранилища он здесь не заработает никогда.
			const modes = Object.keys( panel( $, [ 'mix', 'naive' ] ).engine_dictionary() )
			$mol_assert_equal( modes.join( ',' ), 'mix,naive' )
		},

		'settings.engine_dictionary: labels say what each mode reads'( $ ) {
			const labels = panel( $, [ 'naive' ] ).engine_dictionary()
			$mol_assert_equal( /naive/.test( labels.naive ), true )
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

		'settings.engine_missing_text: names what this corpus cannot do'( $ ) {
			const text = panel( $, [ 'mix', 'naive' ] ).engine_missing_text()
			$mol_assert_equal( /local/.test( text ), true )
			$mol_assert_equal( /global/.test( text ), true )
			$mol_assert_equal( /mix/.test( text ), false )
		},

		'settings.engine_missing_text: silent when everything is served'( $ ) {
			const all = [ 'mix', 'local', 'naive', 'global' ]
			$mol_assert_equal( panel( $, all ).engine_missing_text(), '' )
		},

		'settings.engine_value: a corpus with nothing still yields a mode'( $ ) {
			// Пустой список — сломанный корпус. Селект всё равно обязан иметь
			// значение, иначе виджет остаётся без выбранного пункта.
			$mol_assert_equal( panel( $, [] ).engine_value(), 'mix' )
		},

	} )

}
