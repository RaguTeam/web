/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_norweb_front_dashboard_metric, {
		flex: { direction: 'row' },
		align: { items: 'center' },
		gap: '10px',
		margin: { top: '12px' },

		Name: {
			minWidth: '120px',
			maxWidth: '120px',
			font: { size: '12px', weight: 600 },
		},
		Bar: {
			flex: { grow: 1 },
			height: '8px',
			border: { radius: '4px' },
			background: { color: $bog_builderui_tokens.field },
			position: 'relative',
			overflow: 'hidden',
		},
		Bar_fill: {
			position: 'absolute',
			left: 0,
			top: 0,
			bottom: 0,
			background: { color: $bog_builderui_tokens.current },
		},
		Value: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '11px',
			},
			color: $bog_builderui_tokens.current,
			minWidth: '36px',
			maxWidth: '36px',
			textAlign: 'right',
		},
	} )
}
