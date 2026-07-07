/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_norweb_front_settings_group, {
		flex: { direction: 'column' },

		Head: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '8px',
		},
		Step: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 700,
				size: '10px',
			},
			color: $bog_builderui_tokens.current,
			textTransform: 'uppercase',
			letterSpacing: '0.6px',
		},
		Reindex: {
			background: { color: '#fdf0e6' },
			color: '#c2691a',
			border: { radius: '4px' },
			padding: {
				top: '2px',
				bottom: '2px',
				left: '6px',
				right: '6px',
			},
			font: { size: '9px', weight: 600 },
			display: 'none',
			'@': {
				bog_norweb_front_settings_group_reindex: {
					true: { display: 'flex' },
				},
			},
		},
		Title: {
			font: { weight: 600, size: '13px' },
			margin: { top: '5px' },
		},
		Opts: {
			font: { size: '11px' },
			color: $bog_builderui_tokens.shade,
			lineHeight: '1.5',
			margin: { top: '4px' },
		},
		Controls: {
			margin: { top: '8px' },
			flex: { direction: 'column' },
			gap: '8px',
		},
	} )
}
