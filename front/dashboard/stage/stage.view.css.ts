/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_norweb_front_dashboard_stage, {
		flex: { direction: 'row' },
		align: { items: 'center' },
		gap: '10px',
		margin: { top: '10px' },

		Name: {
			minWidth: '130px',
			maxWidth: '130px',
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '11px',
			},
			color: $bog_builderui_tokens.shade,
		},
		Bar: {
			flex: { grow: 1 },
			height: '8px',
			border: { radius: '4px' },
			background: { color: $bog_builderui_tokens.field },
			overflow: 'hidden',
		},
		Bar_fill: {
			height: '100%',
			background: { color: '#a89bf0' },
		},
		Time: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 500,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
			minWidth: '42px',
			maxWidth: '42px',
			textAlign: 'right',
		},
	} )
}
