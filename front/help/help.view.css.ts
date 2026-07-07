/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $raggu_web_front_help, {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		display: 'none',
		zIndex: 40,
		'@': {
			raggu_web_front_help_showed: {
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
			width: '420px',
			maxWidth: '100vw',
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
			gap: '0.75rem',
		},
		Header_text: {
			flex: { direction: 'column' },
			gap: '0.125rem',
		},
		Header_title: {
			font: { weight: 700, size: '15px' },
		},
		Header_sub: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 500,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
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
			border: { radius: '6px' },
		},

		Body: {
			// $mol_scroll по умолчанию grid — дети лягут друг на друга (1/1)
			display: 'flex',
			flex: { grow: 1, shrink: 1, direction: 'column' },
			minHeight: 0,
			padding: {
				top: '16px',
				bottom: '16px',
				left: '20px',
				right: '20px',
			},
			gap: '1rem',
		},

		Intro: {
			font: { size: '13px' },
			lineHeight: '1.5',
			color: $bog_builderui_tokens.shade,
		},
	} )

	$mol_style_define( $raggu_web_front_help_section, {
		flex: { direction: 'row' },
		gap: '0.75rem',
		align: { items: 'flex-start' },

		Icon: {
			minWidth: '30px',
			maxWidth: '30px',
			height: '30px',
			align: { items: 'center' },
			justify: { content: 'center' },
			background: { color: $bog_builderui_tokens.field },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
			font: { size: '14px' },
		},

		Text: {
			flex: { direction: 'column', shrink: 1 },
			gap: '0.25rem',
			minWidth: 0,
		},
		Title: {
			font: { weight: 700, size: '13px' },
		},
		Desc: {
			font: { size: '12px' },
			lineHeight: '1.5',
			color: $bog_builderui_tokens.shade,
		},
	} )
}
