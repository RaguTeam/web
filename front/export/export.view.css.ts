/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_norweb_front_export, {
		Anchor: {
			display: 'flex',
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '6px',
			background: { color: $bog_builderui_tokens.current },
			color: '#ffffff',
			border: { radius: '7px' },
			padding: {
				top: '7px',
				bottom: '7px',
				left: '12px',
				right: '12px',
			},
			font: { size: '12px', weight: 600 },
			cursor: 'pointer',
			userSelect: 'none',
		},
		Menu: {
			minWidth: '200px',
			background: { color: $bog_builderui_tokens.card },
			border: {
				width: '1px',
				style: 'solid',
				color: $bog_builderui_tokens.line,
				radius: $bog_builderui_tokens.radius,
			},
			box: {
				shadow: [ {
					x: 0,
					y: '4px',
					blur: '16px',
					spread: 0,
					color: '#0000001a',
				} ],
			},
		},
		Empty: {
			padding: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '0.75rem',
				right: '0.75rem',
			},
			color: $bog_builderui_tokens.shade,
			font: {
				family: $bog_builderui_tokens.font_body,
				size: '0.85rem',
			},
		},
	} )
}
