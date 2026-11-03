namespace $ {

	$mol_test({

		'question limits keep their code, anything else is failed'() {
			const limit = new Error( JSON.stringify( { detail: { code: 'daily_limit_reached', message: 'x' } } ) )
			$mol_assert_equal( $raggu_web_front_viewer_failure( limit ), 'daily_limit_reached' )
			$mol_assert_equal( $raggu_web_front_viewer_failure( new Error( JSON.stringify( { detail: { code: 'boom' } } ) ) ), 'failed' )
			$mol_assert_equal( $raggu_web_front_viewer_failure( new Error( 'Bad Gateway' ) ), 'failed' )
		},

	})

}
