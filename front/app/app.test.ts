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
			$mol_assert_equal( v.Chat() instanceof $raggu_web_front_chat, true )
			$mol_assert_equal( v.Dashboard() instanceof $raggu_web_front_dashboard, true )
		},

		'app.body: switches by screen()'( $ ) {
			const v = $raggu_web_front_app.make({ $ })
			// body() forces Gallery when no dataset selected — задать датасет чтобы проверить остальные экраны
			v.dataset_id( 'wiki' )
			v.screen( 'gallery' )
			$mol_assert_equal( v.body()[0], v.Gallery() )
			v.screen( 'explorer' )
			$mol_assert_equal( v.body()[0], v.Explorer() )
			v.screen( 'chat' )
			$mol_assert_equal( v.body()[0], v.Chat() )
			v.screen( 'dashboard' )
			$mol_assert_equal( v.body()[0], v.Dashboard() )
		},

		'app.body: forces Gallery when no dataset selected'( $ ) {
			const v = $raggu_web_front_app.make({ $ })
			v.screen( 'explorer' )
			$mol_assert_equal( v.dataset_id(), '' )
			$mol_assert_equal( v.body()[0], v.Gallery() )
		},

		'dashboard: metric and stage rows match data'( $ ) {
			const v = $raggu_web_front_dashboard.make({ $ })
			$mol_assert_equal( v.Metric_rows().sub().length, 3 )
			$mol_assert_equal( v.Stage_rows().sub().length, 5 )
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

			// user clicks "Чат" → chat
			app.Topbar().click_chat()
			$mol_assert_equal( app.screen(), 'chat' )

			// user clicks "Дашборд" → dashboard
			app.Topbar().click_dashboard()
			$mol_assert_equal( app.screen(), 'dashboard' )

			// user navigates back to Датасеты and clicks a card → dataset selected, screen stays
			app.Topbar().click_gallery()
			$mol_assert_equal( app.screen(), 'gallery' )
			app.Gallery().click( 'law' )
			$mol_assert_equal( app.screen(), 'gallery' )
			$mol_assert_equal( app.dataset_id(), 'law' )
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

		// ---- dashboard energy formula ----

		'dashboard.pipeline_seconds: sum of STAGES.time'( $ ) {
			const d = $raggu_web_front_dashboard.make({ $ })
			// 1.2 + 8.4 + 3.1 + 2.0 + 0.6 = 15.3
			$mol_assert_equal( d.pipeline_seconds().toFixed( 1 ), '15.3' )
		},

		'dashboard.energy_kwh: TDP × time × PUE / 1000'( $ ) {
			const d = $raggu_web_front_dashboard.make({ $ })
			// 300 × (15.3 / 3600) × 1.4 / 1000 ≈ 0.001785
			const kwh = d.energy_kwh()
			$mol_assert_equal( kwh > 0.0017 && kwh < 0.0019, true )
			$mol_assert_equal( d.energy_kwh_val(), '0.00' )
		},

		'dashboard.energy_cost_val: formatted % vs gpt-4 baseline'( $ ) {
			const d = $raggu_web_front_dashboard.make({ $ })
			const val = d.energy_cost_val()
			$mol_assert_equal( /^[−+]\d+%$/.test( val ), true )
		},

		// ---- dashboard log expand ----

		'dashboard.log: default not expanded'( $ ) {
			const d = $raggu_web_front_dashboard.make({ $ })
			$mol_assert_equal( d.Log( 'q1' ).expanded(), false )
		},

		'dashboard.log.toggle: flips expanded'( $ ) {
			const d = $raggu_web_front_dashboard.make({ $ })
			const log = d.Log( 'q1' )
			$mol_assert_equal( log.expanded(), false )
			log.toggle()
			$mol_assert_equal( log.expanded(), true )
			log.toggle()
			$mol_assert_equal( log.expanded(), false )
		},

		'dashboard.log: Trace sub-view exists, attr reflects expanded state'( $ ) {
			const d = $raggu_web_front_dashboard.make({ $ })
			const log = d.Log( 'q1' )
			$mol_assert_equal( !! log.Trace(), true )
			$mol_assert_equal( log.attr().raggu_web_front_dashboard_log_expanded, false )
			log.toggle()
			$mol_assert_equal( log.attr().raggu_web_front_dashboard_log_expanded, true )
		},

		'dashboard.log.arrow: glyph depends on expanded'( $ ) {
			const d = $raggu_web_front_dashboard.make({ $ })
			const log = d.Log( 'q2' )
			$mol_assert_equal( log.arrow(), '▾' )
			log.toggle()
			$mol_assert_equal( log.arrow(), '▴' )
		},


	} )

}
