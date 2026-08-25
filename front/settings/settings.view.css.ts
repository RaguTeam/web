/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $raggu_web_front_settings, {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		display: 'none',
		zIndex: 40,
		'@': {
			raggu_web_front_settings_showed: {
				true: { display: 'flex' },
			},
		},

		Backdrop: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			background: { color: '#1c1b1a59' },
		},

		Panel: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			width: '380px',
			background: { color: $bog_builderui_tokens.card },
			border: {
				left: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			},
			zIndex: 1,
			flex: { direction: 'column' },
			box: {
				shadow: [ {
					x: '-12px',
					y: 0,
					blur: '40px',
					spread: 0,
					color: '#0000001f',
				} ],
			},
		},

		Header: {
			padding: {
				top: '18px',
				bottom: '18px',
				left: '20px',
				right: '20px',
			},
			border: {
				bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			},
			flex: { direction: 'row' },
			align: { items: 'center' },
		},
		Header_text: {
			flex: { direction: 'column' },
		},
		Header_title: {
			font: { weight: 700, size: '16px' },
		},
		Header_sub: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 500,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
			margin: { top: '2px' },
		},
		Spacer: {
			flex: { grow: 1 },
		},
		Close_btn: {
			minWidth: '30px',
			maxWidth: '30px',
			height: '30px',
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
			align: { items: 'center' },
			justify: { content: 'center' },
			cursor: 'pointer',
			font: { size: '15px' },
		},

		Body: {
			padding: {
				top: '18px',
				bottom: '18px',
				left: '20px',
				right: '20px',
			},
			display: 'flex',
			flex: { direction: 'column' },
			gap: '18px',
		},

		Presets: {
			flex: { direction: 'row' },
			gap: '6px',
			padding: {
				bottom: '6px',
			},
			border: {
				bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			},
		},

		// Метка, вопросик-подсказка и переключалка — одной строкой.
		// $bog_builderui_div по умолчанию колонка, без этого «?» уезжает вниз.
		Use_graph_row: {
			flex: { direction: 'row', wrap: 'wrap' },
			align: { items: 'center' },
			gap: '8px',
		},
		Query_plan_row: {
			flex: { direction: 'row', wrap: 'wrap' },
			align: { items: 'center' },
			gap: '8px',
		},
		Use_graph_label: {
			font: { size: '12px', weight: 600 },
		},
		Query_plan_label: {
			font: { size: '12px', weight: 600 },
		},
		// Кружок с «?»: подсказка висит нативным title, всплывает по наведению.
		Use_graph_help: {
			width: '16px',
			height: '16px',
			flex: { shrink: 0 },
			align: { items: 'center' },
			justify: { content: 'center' },
			border: { radius: '50%', width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			color: $bog_builderui_tokens.shade,
			font: { size: '10px', weight: 700 },
			cursor: 'help',
		},
		Query_plan_help: {
			width: '16px',
			height: '16px',
			flex: { shrink: 0 },
			align: { items: 'center' },
			justify: { content: 'center' },
			border: { radius: '50%', width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			color: $bog_builderui_tokens.shade,
			font: { size: '10px', weight: 700 },
			cursor: 'help',
		},

		Chunking_size_row: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '8px',
		},
		Chunking_overlap_row: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '8px',
		},
		Communities_resolution_row: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			justify: { content: 'space-between' },
		},
		Search_topk_row: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			justify: { content: 'space-between' },
		},

		Chunking_size_label: {
			minWidth: '90px',
			color: $bog_builderui_tokens.shade,
			font: { size: '11px' },
		},
		Chunking_overlap_label: {
			minWidth: '90px',
			color: $bog_builderui_tokens.shade,
			font: { size: '11px' },
		},
		Communities_resolution_label: {
			color: $bog_builderui_tokens.shade,
			font: { size: '11px' },
		},
		Search_topk_label: {
			color: $bog_builderui_tokens.shade,
			font: { size: '11px' },
		},
		Communities_resolution_value: {
			color: $bog_builderui_tokens.text,
			font: {
				family: 'ui-monospace, monospace',
				size: '11px',
				weight: 600,
			},
		},
		Search_topk_value: {
			color: $bog_builderui_tokens.text,
			font: {
				family: 'ui-monospace, monospace',
				size: '11px',
				weight: 600,
			},
		},

		Chunking_size_input: {
			flex: { grow: 1 },
		},
		Chunking_overlap_input: {
			flex: { grow: 1 },
		},

		'@media': {
			'(max-width: 720px)': {
				Panel: {
					width: '100vw',
				},
			},
		},

	} )
}
