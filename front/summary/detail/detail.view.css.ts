/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_norweb_front_summary_detail, {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		display: 'none',
		zIndex: 40,
		'@': {
			bog_norweb_front_summary_detail_showed: {
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
			position: 'relative',
			zIndex: 1,
			margin: 'auto',
			width: '760px',
			maxWidth: $mol_style_func.calc( '100vw - 4rem' ),
			maxHeight: $mol_style_func.calc( '100vh - 4rem' ),
			background: { color: $bog_builderui_tokens.card },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '12px' },
			flex: { direction: 'column' },
			box: {
				shadow: [ {
					x: 0,
					y: '12px',
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
			gap: '12px',
		},
		Icon: {
			font: { size: '24px' },
		},
		Header_text: {
			flex: { direction: 'column' },
		},
		Title: {
			font: { weight: 700, size: '16px' },
		},
		Badge: {
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
			cursor: 'pointer',
			color: $bog_builderui_tokens.shade,
			font: { size: '14px' },
			padding: {
				top: '4px',
				bottom: '4px',
				left: '8px',
				right: '8px',
			},
		},

		Content: {
			padding: {
				top: '18px',
				bottom: '18px',
				left: '20px',
				right: '20px',
			},
			flex: { direction: 'column' },
			gap: '12px',
		},

		Image: {
			maxWidth: '100%',
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '8px' },
		},

		Fact: {
			flex: { direction: 'row' },
			gap: '8px',
			align: { items: 'flex-start' },
		},
		Fact_marker: {
			color: $bog_builderui_tokens.current,
			font: { weight: 700, size: '13px' },
		},
		Fact_text: {
			font: { size: '13px' },
			lineHeight: '1.5',
			flex: { shrink: 1 },
			minWidth: 0,
		},

		Links: {
			flex: { direction: 'row' },
			flexWrap: 'wrap',
			gap: '10px',
			margin: { top: '4px' },
		},
		Link: {
			font: { weight: 600, size: '12px' },
			color: $bog_builderui_tokens.current,
		},

		'@media': {
			'(max-width: 720px)': {
				Panel: {
					maxWidth: $mol_style_func.calc( '100vw - 1.5rem' ),
					maxHeight: $mol_style_func.calc( '100vh - 1.5rem' ),
				},
			},
		},
	} )
}
