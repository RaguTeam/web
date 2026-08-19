/** @see $bog_builderui_tokens */
namespace $ {

	const { radial_gradient } = $mol_style_func

	const dot_base = {
		minWidth: '9px',
		maxWidth: '9px',
		height: '9px',
		border: { radius: '50%' },
	} as const

	const legend_row = {
		flex: { direction: 'row' },
		align: { items: 'center' },
		gap: '8px',
		padding: {
			top: '2px',
			bottom: '2px',
			left: '4px',
			right: '4px',
		},
		cursor: 'pointer',
		border: { radius: '5px' },
		'@': {
			raggu_web_front_explorer_legend_on: {
				true: {
					background: { color: '#ffffff26' },
				},
			},
		},
	} as const

	const legend_label = {
		font: {
			family: 'ui-monospace, monospace',
			weight: 500,
			size: '10px',
		},
		color: $bog_builderui_tokens.shade,
	} as const

	// Общий каркас панелек-легенд поверх канвы. Сворачивание: атрибут
	// raggu_web_front_explorer_panel_collapsed прячет список, остаётся шапка.
	const legend_panel = {
		background: { color: '#1c1b1ae6' },
		border: { width: '1px', style: 'solid', color: '#3a3937', radius: '8px' },
		padding: {
			top: '11px',
			bottom: '11px',
			left: '13px',
			right: '13px',
		},
		flex: { direction: 'column', shrink: 1 },
		minHeight: 0,
	} as const

	const legend_head = {
		flex: { direction: 'row' },
		align: { items: 'center' },
		gap: '8px',
		cursor: 'pointer',
	} as const

	const legend_title = {
		font: {
			family: 'ui-monospace, monospace',
			weight: 700,
			size: '10px',
		},
		color: $bog_builderui_tokens.line,
		textTransform: 'uppercase',
		letterSpacing: '0.6px',
		flex: { grow: 1 },
	} as const

	const legend_caret = {
		color: '#8a8a8a',
		font: { size: '10px' },
	} as const

	// shrink+minHeight: без них flex не ужимает список и панель вылезает
	// за экран вместо прокрутки. maxHeight делит вьюпорт между двумя
	// легендами — иначе длинная (типы связей) выдавливает короткую в ноль.
	const legend_list = {
		flex: { direction: 'column', shrink: 1 },
		minHeight: 0,
		maxHeight: '34vh',
		overflow: 'auto',
		margin: { top: '8px' },
	} as const

	const relation_card = {
		border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '6px' },
		padding: {
			top: '8px',
			bottom: '8px',
			left: '10px',
			right: '10px',
		},
		margin: { bottom: '6px' },
		font: { size: '11px' },
		flex: { direction: 'column' },
	} as const

	const relation_type = {
		font: {
			family: 'ui-monospace, monospace',
			weight: 600,
			size: '10px',
		},
		color: $bog_builderui_tokens.current,
	} as const

	const relation_target = {
		color: $bog_builderui_tokens.shade,
		margin: { top: '2px' },
	} as const

	$mol_style_define( $raggu_web_front_explorer, {
		flex: { direction: 'row', shrink: 1 },
		minWidth: 0,
		height: '100%',

		Canvas: {
			flex: { grow: 1, shrink: 1, direction: 'column' },
			position: 'relative',
			background: { color: $bog_builderui_tokens.back },
			minWidth: 0,
		},
		Canvas_bg: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			align: { items: 'center' },
			justify: { content: 'center' },
			background: {
				image: [
					[ radial_gradient( 'circle at 35% 40%, #5b5bd62e, transparent 45%' ) ],
					[ radial_gradient( 'circle at 70% 65%, #d65b8c24, transparent 45%' ) ],
				],
			},
		},
		Filters: {
			position: 'absolute',
			top: '14px',
			left: '14px',
			flex: { direction: 'row' },
			flexWrap: 'wrap',
			gap: '8px',
			maxWidth: '62%',
		},
		Filter_search: {
			background: { color: $bog_builderui_tokens.field },
			color: $bog_builderui_tokens.text,
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
			padding: {
				top: '8px',
				bottom: '8px',
				left: '11px',
				right: '11px',
			},
			font: { size: '11px', weight: 600 },
			width: '200px',
		},

		// Выпадашка сообществ: кнопка в ряду фильтров, список поверх канвы
		Comms: {
			position: 'relative',
			flex: { direction: 'column' },
			'@': {
				raggu_web_front_explorer_panel_collapsed: {
					true: {
						Comms_list: { display: 'none' },
					},
				},
			},
		},
		Comms_btn: {
			background: { color: $bog_builderui_tokens.field },
			color: $bog_builderui_tokens.text,
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
			padding: {
				top: '8px',
				bottom: '8px',
				left: '11px',
				right: '11px',
			},
			font: { size: '11px', weight: 600 },
			cursor: 'pointer',
			whiteSpace: 'nowrap',
		},
		Comms_list: {
			...legend_panel,
			position: 'absolute',
			top: $mol_style_func.calc( '100% + 6px' ),
			left: 0,
			width: '250px',
			maxHeight: '320px',
			zIndex: 5,
		},
		// Кнопка «очистить выбор» приколочена к шапке выпадашки, скроллится
		// только список сообществ под ней. Прячется, когда выбирать нечего.
		Comms_clear: {
			display: 'none',
			align: { self: 'stretch', items: 'center' },
			justify: { content: 'center' },
			margin: { bottom: '8px' },
			padding: {
				top: '5px',
				bottom: '5px',
				left: '8px',
				right: '8px',
			},
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '6px' },
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '10px',
			},
			color: $bog_builderui_tokens.current,
			cursor: 'pointer',
			whiteSpace: 'nowrap',
			'@': {
				raggu_web_front_explorer_clear_showed: {
					true: { display: 'flex' },
				},
			},
		},
		Comms_rows: {
			flex: { direction: 'column', shrink: 1 },
			minHeight: 0,
			overflow: 'auto',
		},
		Comm_row: legend_row,
		Comm_mark: {
			minWidth: '13px',
			maxWidth: '13px',
			color: $bog_builderui_tokens.current,
			font: { size: '11px', weight: 700 },
		},
		Comm_dot: dot_base,
		Comm_label: {
			...legend_label,
			flex: { grow: 1 },
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
		},
		Comm_count: {
			...legend_label,
			color: '#8a8a8a',
		},

		Legends: {
			position: 'absolute',
			top: '14px',
			right: '14px',
			width: '184px',
			maxHeight: $mol_style_func.calc( '100% - 28px' ),
			flex: { direction: 'column' },
			gap: '8px',
		},
		Legend: {
			...legend_panel,
			'@': {
				raggu_web_front_explorer_panel_collapsed: {
					true: {
						Legend_list: { display: 'none' },
					},
				},
			},
		},
		Legend_head: legend_head,
		Legend_title: legend_title,
		Legend_caret: legend_caret,
		Legend_list: legend_list,
		Legend_row: legend_row,
		Legend_dot: dot_base,
		Legend_label: {
			...legend_label,
			flex: { grow: 1 },
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
		},
		Legend_count: {
			...legend_label,
			color: '#8a8a8a',
		},

		Rels: {
			...legend_panel,
			'@': {
				raggu_web_front_explorer_panel_collapsed: {
					true: {
						Rels_list: { display: 'none' },
					},
				},
			},
		},
		Rels_head: legend_head,
		Rels_title: legend_title,
		Rels_caret: legend_caret,
		Rels_list: legend_list,
		Rel_row: legend_row,
		Rel_row_label: {
			...legend_label,
			flex: { grow: 1 },
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
		},
		Rel_row_count: {
			...legend_label,
			color: '#8a8a8a',
		},

		Mock_badge: {
			display: 'none',
			position: 'absolute',
			bottom: '14px',
			left: '14px',
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '11px',
			},
			color: '#8a6d1b',
			background: { color: '#f5c84226' },
			border: { width: '1px', style: 'solid', color: '#d9b23a66', radius: '6px' },
			padding: {
				top: '3px',
				bottom: '3px',
				left: '8px',
				right: '8px',
			},
			'@': {
				raggu_web_front_explorer_mock_badge_showed: {
					true: { display: 'flex' },
				},
			},
		},

		// Плашка выборки: сколько вершин на канве против размера корпуса.
		// Живёт там же, где Mock_badge — они взаимоисключающие: meta приходит
		// только с живого бэка, а мок-плашка только при его отсутствии.
		Limit_badge: {
			display: 'none',
			position: 'absolute',
			bottom: '14px',
			left: '14px',
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '8px',
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '11px',
			},
			color: $bog_builderui_tokens.shade,
			background: { color: '#1c1b1ae6' },
			border: { width: '1px', style: 'solid', color: '#3a3937', radius: '6px' },
			padding: {
				top: '4px',
				bottom: '4px',
				left: '9px',
				right: '9px',
			},
			maxWidth: $mol_style_func.calc( '100% - 28px' ),
			'@': {
				raggu_web_front_explorer_limit_badge_showed: {
					true: { display: 'flex' },
				},
			},
		},
		Limit_text: {
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
		},
		Limit_more: {
			display: 'none',
			color: $bog_builderui_tokens.current,
			cursor: 'pointer',
			whiteSpace: 'nowrap',
			textDecoration: 'underline',
			'@': {
				raggu_web_front_explorer_limit_more_showed: {
					true: { display: 'flex' },
				},
			},
		},

		Aside: {
			minWidth: '240px',
			maxWidth: '240px',
			background: { color: $bog_builderui_tokens.card },
			border: {
				left: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			},
			padding: {
				top: '18px',
				bottom: '18px',
				left: '18px',
				right: '18px',
			},
			overflow: 'auto',
			flex: { direction: 'column' },
			// Свёрнутая панель — узкая полоска с шевроном, граф забирает ширину
			'@': {
				raggu_web_front_explorer_aside_collapsed: {
					true: {
						minWidth: '34px',
						maxWidth: '34px',
						padding: {
							top: '10px',
							bottom: '10px',
							left: '4px',
							right: '4px',
						},
						Aside_title: { display: 'none' },
						Aside_body: { display: 'none' },
					},
				},
			},
		},
		Aside_head: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '8px',
		},
		Aside_toggle: {
			cursor: 'pointer',
			color: $bog_builderui_tokens.shade,
			font: { size: '13px', weight: 600 },
			padding: {
				top: '2px',
				bottom: '2px',
				left: '8px',
				right: '8px',
			},
			border: { radius: '5px' },
			':hover': {
				background: { color: $bog_builderui_tokens.field },
			},
		},
		Aside_body: {
			flex: { direction: 'column' },
		},
		Aside_title: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
			textTransform: 'uppercase',
			letterSpacing: '0.7px',
		},
		Entity_head: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '8px',
			margin: { top: '11px' },
		},
		Entity_dot: {
			minWidth: '12px',
			maxWidth: '12px',
			height: '12px',
			border: { radius: '50%' },
			background: { color: '#7c6ce0' },
		},
		Entity_name: {
			font: { weight: 700, size: '16px' },
			// Длинные имена сущностей не должны вылезать за панель
			minWidth: 0,
			overflowWrap: 'anywhere',
		},
		Entity_type: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '10px',
			},
			color: $bog_builderui_tokens.current,
			margin: { top: '6px' },
			overflowWrap: 'anywhere',
		},
		Entity_desc: {
			font: { size: '12px' },
			color: $bog_builderui_tokens.shade,
			lineHeight: '1.5',
			margin: { top: '10px' },
		},

		Relations_title: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
			textTransform: 'uppercase',
			margin: { top: '18px', bottom: '8px' },
		},
		Relations_list: {
			flex: { direction: 'column' },
		},
		Rel: relation_card,
		Rel_type: relation_type,
		Rel_target: relation_target,

		Ask_btn: {
			margin: { top: '16px' },
			background: { color: $bog_builderui_tokens.current },
			color: '#ffffff',
			border: { radius: '7px' },
			padding: {
				top: '10px',
				bottom: '10px',
				left: '10px',
				right: '10px',
			},
			textAlign: 'center',
			font: { size: '12px', weight: 600 },
			cursor: 'pointer',
		},

		'@media': {
			'(max-width: 720px)': {
				flex: { direction: 'column' },
				overflow: 'auto',
				Canvas: {
					minHeight: '55vh',
				},
				Aside: {
					minWidth: 0,
					maxWidth: '100%',
					border: {
						left: { width: 0 },
						top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
					},
					overflow: 'visible',
				},
				Filters: {
					maxWidth: $mol_style_func.calc( '100% - 28px' ),
				},
			},
		},
	} )
}
