namespace $ {

	$mol_style_define( $raggu_web_front_explorer_forcegraph_demo, {
		flex: { direction: 'row' },
		width: '100%',
		height: '100vh',
		background: { color: '#161514' },
		color: '#ede7d8',
		font: { family: 'ui-sans-serif, system-ui, sans-serif', size: '13px' },

		Canvas: {
			flex: { grow: 1, shrink: 1 },
			minWidth: 0,
			position: 'relative',
		},

		Panel: {
			minWidth: '320px',
			maxWidth: '320px',
			overflow: 'auto',
			padding: {
				top: '18px', bottom: '18px', left: '18px', right: '18px',
			},
			background: { color: '#1c1b1a' },
			border: {
				left: { width: '1px', style: 'solid', color: '#3a3937' },
			},
			flex: { direction: 'column' },
			gap: '14px',
		},

		Panel_title: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 700,
				size: '11px',
			},
			color: '#8f8b83',
			textTransform: 'uppercase',
			letterSpacing: '0.8px',
			margin: { bottom: '4px' },
		},

	} )

	$mol_style_define( $raggu_web_front_explorer_forcegraph_demo_row, {
		flex: { direction: 'column' },
		gap: '4px',
		padding: {
			top: '8px', bottom: '8px', left: '10px', right: '10px',
		},
		border: {
			width: '1px', style: 'solid', color: '#2a2927', radius: '6px',
		},
		background: { color: '#171614' },

		Row_top: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			justify: { content: 'space-between' },
			gap: '10px',
		},

		Label: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '11px',
			},
			color: '#ede7d8',
		},

		Info: {
			font: { size: '10px' },
			color: '#8f8b83',
			lineHeight: '1.4',
		},

		// $mol_number renders as a container with Dec/String/Inc children.
		// Give the whole widget a dark backdrop so the input field doesn't sit
		// on the browser's default light color.
		Slider: {
			background: { color: '#0f0e0d' },
			border: {
				width: '1px', style: 'solid', color: '#2a2927', radius: '4px',
			},
			overflow: 'hidden',
		},

		// Descendant attribute selector — reaches into $mol_number's inner
		// $mol_string input and styles the actual field.
		'@': {
			mol_number_string: {
				'': {
					background: { color: 'transparent' },
					color: '#ede7d8',
					font: {
						family: 'ui-monospace, monospace',
						size: '11px',
					},
				},
			},
		},

	} )

}
