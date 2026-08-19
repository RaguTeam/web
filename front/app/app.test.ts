namespace $.$$ {

	function style_rule( component: string, key: string ) {
		const el = $mol_dom_context.document.getElementById(
			`$mol_style_attach:${ component }`
		)
		const css = ( el?.textContent ?? '' ).replace( /\s+/g, ' ' )
		return css.match( new RegExp( `\\[${ key }\\][^{]*\\{[^}]*\\}` ) )?.[ 0 ] ?? ''
	}

	$mol_test( {

		'app.Body: $mol_scroll override is flex column'( $ ) {
			const rule = style_rule( '$raggu_web_front_app', 'raggu_web_front_app_body' )
			$mol_assert_equal( /display: flex/.test( rule ), true )
			$mol_assert_equal( /flex-direction: column/.test( rule ), true )
		},

		'app: every screen exists as sub-view'( $ ) {
			const v = $raggu_web_front_app.make({ $ })
			$mol_assert_equal( v.Gallery() instanceof $raggu_web_front_gallery, true )
			$mol_assert_equal( v.Explorer() instanceof $raggu_web_front_explorer, true )
		},

		'app.body: switches by screen()'( $ ) {
			const v = $raggu_web_front_app.make({ $ })
			// body() forces Gallery when no dataset selected — задать датасет чтобы проверить остальные экраны
			v.dataset_id( 'wiki' )
			v.screen( 'gallery' )
			$mol_assert_equal( v.body()[0], v.Gallery() )
			v.screen( 'explorer' )
			$mol_assert_equal( v.body()[0], v.Explorer() )
		},

		'app.body: forces Gallery when no dataset selected'( $ ) {
			const v = $raggu_web_front_app.make({ $ })
			v.screen( 'explorer' )
			$mol_assert_equal( v.dataset_id(), '' )
			$mol_assert_equal( v.body()[0], v.Gallery() )
		},

		'gallery: BUILTIN mock renders two cards (law, wiki)'( $ ) {
			// No live backend in node tests → force ?mock=1 so remote_datasets returns null
			// and falls back to BUILTIN; otherwise $mol_fetch leaks a pending promise.
			$.$mol_state_arg.value( 'mock', '1' )
			const v = $raggu_web_front_gallery.make({ $ })
			$mol_assert_equal( v.Grid().sub().length, 2 )
		},

		'url state: screen / dataset_id round-trip through $mol_state_arg'( $ ) {
			const app = $raggu_web_front_app.make({ $ })
			const arg = $.$mol_state_arg

			// defaults are NOT written to URL (kept clean)
			$mol_assert_equal( app.screen(), 'gallery' )
			$mol_assert_equal( arg.value( 'screen' ), null )

			// non-default values land in $mol_state_arg
			app.screen( 'explorer' )
			$mol_assert_equal( arg.value( 'screen' ), 'explorer' )

			app.dataset_id( 'law' )
			$mol_assert_equal( arg.value( 'ds' ), 'law' )

			// resetting to default removes from URL
			app.screen( 'gallery' )
			$mol_assert_equal( arg.value( 'screen' ), null )
		},

		'e2e: full user flow through all screens'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			const app = $raggu_web_front_app.make({ $ })

			// initial: gallery screen, BUILTIN mock has two cards (law, wiki)
			$mol_assert_equal( app.screen(), 'gallery' )
			$mol_assert_equal( app.body()[0], app.Gallery() )
			$mol_assert_equal( app.Gallery().Grid().sub().length, 2 )

			// user picks dataset first — иначе body() держит Gallery
			app.dataset_id( 'law' )

			// user clicks "Граф" in topbar → explorer
			app.Topbar().click_explorer()
			$mol_assert_equal( app.screen(), 'explorer' )
			$mol_assert_equal( app.body()[0], app.Explorer() )

			// user navigates back to Датасеты and clicks a card → корпус выбран
			// и мы сразу в графе, без промежуточного шага
			app.Topbar().click_gallery()
			$mol_assert_equal( app.screen(), 'gallery' )
			app.Gallery().click( 'law' )
			$mol_assert_equal( app.dataset_id(), 'law' )
			$mol_assert_equal( app.screen(), 'explorer' )
			$mol_assert_equal( app.body()[0], app.Explorer() )
		},

		'gallery card click jumps straight to the graph'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			const app = $raggu_web_front_app.make({ $ })
			$mol_assert_equal( app.screen(), 'gallery' )
			app.Gallery().click( 'wiki' )
			$mol_assert_equal( app.dataset_id(), 'wiki' )
			$mol_assert_equal( app.screen(), 'explorer' )
		},

		'sidebar dataset click keeps the current screen'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			const app = $raggu_web_front_app.make({ $ })
			app.dataset_id( 'law' )
			app.screen( 'chat' )
			app.select_dataset( 'wiki' )
			$mol_assert_equal( app.dataset_id(), 'wiki' )
			$mol_assert_equal( app.screen(), 'chat' )
		},

		// ---- explorer communities dropdown ----

		'explorer.communities: mock graph groups nodes by community'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			const v = $raggu_web_front_explorer.make({ $ })
			const comms = v.communities()
			$mol_assert_equal( comms.length > 1, true )
			// суммарный размер сообществ = число узлов мока
			const total = comms.reduce( ( s, c ) => s + c.size, 0 )
			$mol_assert_equal( total, v.graph_nodes().length )
			// у каждого сообщества свой цвет
			const colors = new Set( comms.map( c => v.comm_color_map()[ c.id ] ) )
			$mol_assert_equal( colors.size, comms.length <= 15 ? comms.length : colors.size )
		},

		'explorer.comm_click: toggles selection, comm_mark reflects it'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			const v = $raggu_web_front_explorer.make({ $ })
			$mol_assert_equal( v.comms_selected().length, 0 )
			v.comm_click( 0 )
			$mol_assert_equal( v.comms_selected().length, 1 )
			$mol_assert_equal( v.comm_active( 0 ), true )
			$mol_assert_equal( v.comm_mark( 0 ), '✓' )
			v.comm_click( 0 )
			$mol_assert_equal( v.comms_selected().length, 0 )
			$mol_assert_equal( v.comm_mark( 0 ), '' )
		},

		'explorer.comms_clear: drops the whole selection'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			const v = $raggu_web_front_explorer.make({ $ })
			$mol_assert_equal( v.has_comms_selection(), false )
			v.comm_click( 0 )
			v.comm_click( 1 )
			$mol_assert_equal( v.comms_selected().length, 2 )
			$mol_assert_equal( v.has_comms_selection(), true )
			v.comms_clear()
			$mol_assert_equal( v.comms_selected().length, 0 )
			$mol_assert_equal( v.has_comms_selection(), false )
			$mol_assert_equal( v.comm_mark( 0 ), '' )
		},

		// Плашка лимита живёт на meta с бэка: на моке её нет — и не должно быть.
		'explorer.limit badge: hidden without backend meta'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			const v = $raggu_web_front_explorer.make({ $ })
			$mol_assert_equal( v.graph_meta(), null )
			$mol_assert_equal( v.is_limited(), false )
			$mol_assert_equal( v.limit_text(), '' )
		},

		'explorer.graph_limit: default stays out of the URL, raise writes it'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			const v = $raggu_web_front_explorer.make({ $ })
			$mol_assert_equal( v.graph_limit(), 500 )
			$mol_assert_equal( $.$mol_state_arg.value( 'limit' ), null )
			v.graph_limit( 2000 )
			$mol_assert_equal( v.graph_limit(), 2000 )
			$mol_assert_equal( $.$mol_state_arg.value( 'limit' ), '2000' )
			$mol_assert_equal( v.can_show_more(), true )
			v.graph_limit( 5000 )
			$mol_assert_equal( v.can_show_more(), false )
			v.graph_limit( 500 )
			$mol_assert_equal( $.$mol_state_arg.value( 'limit' ), null )
		},

		// ---- chat ----

		'chat: starts empty, no seeded conversation'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			const v = $raggu_web_front_chat.make({ $ })
			$mol_assert_equal( v.history().length, 0 )
			$mol_assert_equal( v.is_empty(), true )
			$mol_assert_equal( v.rows().length, 0 )
		},

		'chat: fallback suggestions are per corpus, three of them'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			// dataset_id — не сеттер, задаём его override'ом при создании
			const chat = ( id: string ) => $raggu_web_front_chat.make({ $, dataset_id: () => id })
			const generic = chat( '' ).fallback_suggestions()
			const law = chat( 'law' ).fallback_suggestions()
			const wiki = chat( 'wiki' ).fallback_suggestions()
			$mol_assert_equal( generic.length, 3 )
			$mol_assert_equal( law.length, 3 )
			$mol_assert_equal( wiki.length, 3 )
			$mol_assert_equal( law[0] === wiki[0], false )
			$mol_assert_equal( law[0] === generic[0], false )
		},

		'forcegraph: community filter dims outsiders, highlights internal edges only'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			const v = $raggu_web_front_explorer.make({ $ })
			v.comm_click( 0 )
			const comm = v.communities()[ 0 ].id
			const g = v.graph_view()
			// узел выбранного сообщества виден, чужой — затемнён
			const inside = v.graph_nodes().find( n => n.community === comm )!
			const outside = v.graph_nodes().find( n => n.community && n.community !== comm )!
			$mol_assert_equal( g.node_matches( inside.id ), true )
			$mol_assert_equal( g.node_matches( outside.id ), false )
			$mol_assert_equal( g.node_color( inside.id ), v.comm_color_map()[ comm ] )
			// ребро подсвечено только когда ОБА конца в выбранном сообществе
			for ( const e of v.graph_edges() ) {
				const both_in = v.graph_nodes().find( n => n.id === e.source )?.community === comm
					&& v.graph_nodes().find( n => n.id === e.target )?.community === comm
				$mol_assert_equal( g.edge_matches( e.id ), both_in )
			}
		},

		// Тесты чата и дашборда убраны вместе с вкладками из бандла:
		// вкладки спрятаны до готовности бэка.

	} )

}
