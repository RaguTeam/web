/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_norweb_front_summary_card, {
		background: { color: $bog_builderui_tokens.card },
		border: { width: '2px', style: 'solid', color: $bog_builderui_tokens.line, radius: '10px' },
		padding: {
			top: '12px',
			bottom: '12px',
			left: '12px',
			right: '12px',
		},
		flex: { direction: 'column' },
		cursor: 'pointer',
		':hover': {
			border: { color: $bog_builderui_tokens.current },
		},

		Head: {
			flex: { direction: 'row' },
			align: { items: 'center' },
		},
		Icon: {
			font: { size: '22px' },
		},
		Spacer: {
			flex: { grow: 1 },
		},
		Badge: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
			background: { color: $bog_builderui_tokens.field },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '5px' },
			padding: {
				top: '2px',
				bottom: '2px',
				left: '7px',
				right: '7px',
			},
		},

		Title: {
			font: { weight: 700, size: '14px' },
			margin: { top: '11px' },
		},
		Desc: {
			font: { size: '11px' },
			color: $bog_builderui_tokens.shade,
			margin: { top: '4px' },
			lineHeight: '1.4',
			flex: { grow: 1 },
		},
		More: {
			font: { weight: 600, size: '11px' },
			color: $bog_builderui_tokens.current,
			margin: { top: '10px' },
		},
	} )
}
