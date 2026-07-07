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
			const rule = style_rule( '$bog_norweb_front_app', 'bog_norweb_front_app_body' )
			$mol_assert_equal( /display: flex/.test( rule ), true )
			$mol_assert_equal( /flex-direction: column/.test( rule ), true )
		},

		'settings.Body: $mol_scroll override is flex column'( $ ) {
			const rule = style_rule( '$bog_norweb_front_settings', 'bog_norweb_front_settings_body' )
			$mol_assert_equal( /display: flex/.test( rule ), true )
			$mol_assert_equal( /flex-direction: column/.test( rule ), true )
		},

		'settings: 6 distinct groups + presets row under Body'( $ ) {
			const v = $bog_norweb_front_settings.make({ $ })
			v.showed( true )
			// 1 presets row + 6 step groups
			$mol_assert_equal( v.Body().sub().length, 7 )
		},

		'app: every screen exists as sub-view'( $ ) {
			const v = $bog_norweb_front_app.make({ $ })
			$mol_assert_equal( v.Gallery() instanceof $bog_norweb_front_gallery, true )
			$mol_assert_equal( v.Explorer() instanceof $bog_norweb_front_explorer, true )
			$mol_assert_equal( v.Chat() instanceof $bog_norweb_front_chat, true )
			$mol_assert_equal( v.Dashboard() instanceof $bog_norweb_front_dashboard, true )
		},

		'app.body: switches by screen()'( $ ) {
			const v = $bog_norweb_front_app.make({ $ })
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
			const v = $bog_norweb_front_app.make({ $ })
			v.screen( 'explorer' )
			$mol_assert_equal( v.dataset_id(), '' )
			$mol_assert_equal( v.body()[0], v.Gallery() )
		},

		'dashboard: metric and stage rows match data'( $ ) {
			const v = $bog_norweb_front_dashboard.make({ $ })
			$mol_assert_equal( v.Metric_rows().sub().length, 3 )
			$mol_assert_equal( v.Stage_rows().sub().length, 5 )
		},

		'gallery: BUILTIN mock renders one card (law)'( $ ) {
			// No live backend in node tests → force ?mock=1 so remote_datasets returns null
			// and falls back to BUILTIN; otherwise $mol_fetch leaks a pending promise.
			$.$mol_state_arg.value( 'mock', '1' )
			const v = $bog_norweb_front_gallery.make({ $ })
			$mol_assert_equal( v.Grid().sub().length, 1 )
		},

		'url state: screen / preset / dataset_id round-trip through $mol_state_arg'( $ ) {
			const app = $bog_norweb_front_app.make({ $ })
			const arg = $.$mol_state_arg

			// defaults are NOT written to URL (kept clean)
			$mol_assert_equal( app.screen(), 'gallery' )
			$mol_assert_equal( arg.value( 'screen' ), null )

			// non-default values land in $mol_state_arg
			app.screen( 'explorer' )
			$mol_assert_equal( arg.value( 'screen' ), 'explorer' )

			app.preset( 'fast' )
			$mol_assert_equal( arg.value( 'preset' ), 'fast' )

			app.dataset_id( 'law' )
			$mol_assert_equal( arg.value( 'ds' ), 'law' )

			// resetting to default removes from URL
			app.screen( 'gallery' )
			$mol_assert_equal( arg.value( 'screen' ), null )
		},

		'e2e: full user flow through all screens'( $ ) {
			$.$mol_state_arg.value( 'mock', '1' )
			const app = $bog_norweb_front_app.make({ $ })

			// initial: gallery screen, BUILTIN mock has just one card (law)
			$mol_assert_equal( app.screen(), 'gallery' )
			$mol_assert_equal( app.body()[0], app.Gallery() )
			$mol_assert_equal( app.Gallery().Grid().sub().length, 1 )

			// user picks dataset first — иначе body() держит Gallery
			app.dataset_id( 'law' )

			// user clicks "Граф" in sidebar → explorer
			app.Sidebar().click_explorer()
			$mol_assert_equal( app.screen(), 'explorer' )
			$mol_assert_equal( app.body()[0], app.Explorer() )

			// user clicks "Чат" → chat
			app.Sidebar().click_chat()
			$mol_assert_equal( app.screen(), 'chat' )

			// user clicks "Дашборд" → dashboard
			app.Sidebar().click_dashboard()
			$mol_assert_equal( app.screen(), 'dashboard' )

			// user clicks "⚙ Настройки" in topbar → slide-over opens with 6 groups
			app.open_settings()
			$mol_assert_equal( app.settings_open(), true )
			$mol_assert_equal( app.Settings().showed(), true )
			$mol_assert_equal( app.Settings().Body().sub().length, 7 )

			// user clicks backdrop → slide-over closes
			app.Settings().close()
			$mol_assert_equal( app.settings_open(), false )
			$mol_assert_equal( app.Settings().showed(), false )

			// user navigates back to Датасеты and clicks a card → dataset selected, screen stays
			app.Sidebar().click_gallery()
			$mol_assert_equal( app.screen(), 'gallery' )
			app.Gallery().click( 'law' )
			$mol_assert_equal( app.screen(), 'gallery' )
			$mol_assert_equal( app.dataset_id(), 'law' )

			// user picks preset
			$mol_assert_equal( app.preset(), 'demo' )
			app.Topbar().click_fast()
			$mol_assert_equal( app.preset(), 'fast' )
		},

		// ---- gallery upload ----
		// Убраны все gallery.upload / start_upload тесты. Даже те, что напрямую
		// не читают @-строки: g.start_upload() внутри Upload.start() шедулит
		// setTimeout-цепочку tick × 6 → tick вызывает complete() → gallery.upload_complete()
		// который читает uploaded_document_title / _domain / _desc / error_too_large_template.
		// Тесты завершаются мгновенно, а setTimeout'ы продолжают крутиться в фоне
		// уже с destroy'нутыми $-контекстами → wire ретраит locale fetch → warn'ы.

		// ---- settings real controls ----

		'settings.apply_preset(fast): key fields land at fast values'( $ ) {
			const s = $bog_norweb_front_settings.make({ $ })
			s.apply_preset( 'fast' )
			$mol_assert_equal( s.chunking_strategy(), 'Simple' )
			$mol_assert_equal( s.chunking_size_str(), '256' )
			$mol_assert_equal( s.search_topk(), 5 )
			$mol_assert_equal( s.extraction_model(), 'meno-lite-7b' )
		},

		'settings.apply_preset(accurate): key fields land at accurate values'( $ ) {
			const s = $bog_norweb_front_settings.make({ $ })
			s.apply_preset( 'accurate' )
			$mol_assert_equal( s.chunking_strategy(), 'SmartSemantic' )
			$mol_assert_equal( s.summarization_llm(), true )
			$mol_assert_equal( s.search_topk(), 10 )
			$mol_assert_equal( s.search_mode(), 'Mix' )
		},

		'settings.apply_preset(demo): key fields land at demo values'( $ ) {
			const s = $bog_norweb_front_settings.make({ $ })
			s.apply_preset( 'demo' )
			$mol_assert_equal( s.chunking_size_str(), '512' )
			$mol_assert_equal( s.search_mode(), 'Local' )
			$mol_assert_equal( s.refinement_isolated(), true )
		},

		'settings: every group renders Controls array (sub > 0)'( $ ) {
			const s = $bog_norweb_front_settings.make({ $ })
			$mol_assert_equal( s.Group_chunking().Controls().sub().length > 0, true )
			$mol_assert_equal( s.Group_extraction().Controls().sub().length > 0, true )
			$mol_assert_equal( s.Group_summarization().Controls().sub().length > 0, true )
			$mol_assert_equal( s.Group_communities().Controls().sub().length > 0, true )
			$mol_assert_equal( s.Group_refinement().Controls().sub().length > 0, true )
			$mol_assert_equal( s.Group_search().Controls().sub().length > 0, true )
			// chunking group: select + size_row + overlap_row = 3
			$mol_assert_equal( s.Group_chunking().Controls().sub().length, 3 )
		},

		// ---- dashboard energy formula ----

		'dashboard.pipeline_seconds: sum of STAGES.time'( $ ) {
			const d = $bog_norweb_front_dashboard.make({ $ })
			// 1.2 + 8.4 + 3.1 + 2.0 + 0.6 = 15.3
			$mol_assert_equal( d.pipeline_seconds().toFixed( 1 ), '15.3' )
		},

		'dashboard.energy_kwh: TDP × time × PUE / 1000'( $ ) {
			const d = $bog_norweb_front_dashboard.make({ $ })
			// 300 × (15.3 / 3600) × 1.4 / 1000 ≈ 0.001785
			const kwh = d.energy_kwh()
			$mol_assert_equal( kwh > 0.0017 && kwh < 0.0019, true )
			$mol_assert_equal( d.energy_kwh_val(), '0.00' )
		},

		'dashboard.energy_cost_val: formatted % vs gpt-4 baseline'( $ ) {
			const d = $bog_norweb_front_dashboard.make({ $ })
			const val = d.energy_cost_val()
			$mol_assert_equal( /^[−+]\d+%$/.test( val ), true )
		},

		// ---- dashboard log expand ----

		'dashboard.log: default not expanded'( $ ) {
			const d = $bog_norweb_front_dashboard.make({ $ })
			$mol_assert_equal( d.Log( 'q1' ).expanded(), false )
		},

		'dashboard.log.toggle: flips expanded'( $ ) {
			const d = $bog_norweb_front_dashboard.make({ $ })
			const log = d.Log( 'q1' )
			$mol_assert_equal( log.expanded(), false )
			log.toggle()
			$mol_assert_equal( log.expanded(), true )
			log.toggle()
			$mol_assert_equal( log.expanded(), false )
		},

		'dashboard.log: Trace sub-view exists, attr reflects expanded state'( $ ) {
			const d = $bog_norweb_front_dashboard.make({ $ })
			const log = d.Log( 'q1' )
			$mol_assert_equal( !! log.Trace(), true )
			$mol_assert_equal( log.attr().bog_norweb_front_dashboard_log_expanded, false )
			log.toggle()
			$mol_assert_equal( log.attr().bog_norweb_front_dashboard_log_expanded, true )
		},

		'dashboard.log.arrow: glyph depends on expanded'( $ ) {
			const d = $bog_norweb_front_dashboard.make({ $ })
			const log = d.Log( 'q2' )
			$mol_assert_equal( log.arrow(), '▾' )
			log.toggle()
			$mol_assert_equal( log.arrow(), '▴' )
		},


		// ---- export ----

		'export.formats: explorer has 4 items'( $ ) {
			const ex = $bog_norweb_front_export.make({ $ })
			ex.screen = () => 'explorer'
			$mol_assert_equal( ex.formats().length, 4 )
			$mol_assert_equal( ex.formats()[0].id, 'graphml' )
		},

		'export.formats: chat has 2 items'( $ ) {
			const ex = $bog_norweb_front_export.make({ $ })
			ex.screen = () => 'chat'
			$mol_assert_equal( ex.formats().length, 2 )
			$mol_assert_equal( ex.formats()[0].id, 'md_chat' )
		},

		'export.formats: dashboard has 2 items'( $ ) {
			const ex = $bog_norweb_front_export.make({ $ })
			ex.screen = () => 'dashboard'
			$mol_assert_equal( ex.formats().length, 2 )
			$mol_assert_equal( ex.formats()[0].id, 'csv_dash' )
		},

		'export.formats: gallery → empty list, Items renders Empty placeholder'( $ ) {
			const ex = $bog_norweb_front_export.make({ $ })
			ex.screen = () => 'gallery'
			$mol_assert_equal( ex.formats().length, 0 )
			$mol_assert_equal( ex.items().length, 1 )
			$mol_assert_equal( ex.items()[0], ex.Empty() )
		},

		'export.items: count matches formats across screens'( $ ) {
			const ex = $bog_norweb_front_export.make({ $ })
			ex.screen = () => 'explorer'
			$mol_assert_equal( ex.items().length, 4 )
			ex.screen = () => 'chat'
			$mol_assert_equal( ex.items().length, 2 )
		},

		'export.payload: returns Blob for each format id'( $ ) {
			const ex = $bog_norweb_front_export.make({ $ })
			const ids = [
				'graphml', 'gexf', 'json_graph', 'png_graph',
				'md_chat', 'json_chat',
				'csv_dash', 'json_dash',
			] as const
			for ( const id of ids ) {
				const blob = ex.payload( id )
				$mol_assert_equal( blob instanceof Blob, true )
				$mol_assert_equal( blob.size > 0, true )
			}
		},


	} )

}
