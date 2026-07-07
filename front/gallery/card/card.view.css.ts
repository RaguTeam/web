/** @see $bog_builderui_tokens */
namespace $ {
	const tag_style = {
		font: {
			family: 'ui-monospace, monospace',
			weight: 600,
			size: '10px',
		},
		color: $bog_builderui_tokens.shade,
		background: { color: $bog_builderui_tokens.field },
		border: { radius: '5px' },
		padding: {
			top: '3px',
			bottom: '3px',
			left: '7px',
			right: '7px',
		},
	} as const

	$mol_style_define( $raggu_web_front_gallery_card, {
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
		'@': {
			raggu_web_front_gallery_card_active: {
				true: {
					border: { color: $bog_builderui_tokens.current },
					background: { color: $bog_builderui_tokens.field },
				},
			},
		},

		Preview: {
			height: '118px',
			border: { radius: '7px' },
			align: { items: 'center' },
			justify: { content: 'center' },
			position: 'relative',
		},
		Preview_label: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
		},
		Domain_badge: {
			position: 'absolute',
			top: '8px',
			left: '8px',
			background: { color: $bog_builderui_tokens.card },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '5px' },
			padding: {
				top: '2px',
				bottom: '2px',
				left: '7px',
				right: '7px',
			},
			font: { size: '10px' },
			color: $bog_builderui_tokens.shade,
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
		},

		Tags: {
			flex: { direction: 'row' },
			flexWrap: 'wrap',
			gap: '6px',
			margin: { top: '10px' },
		},
		Tag_nodes: tag_style,
		Tag_edges: tag_style,
		Tag_comms: tag_style,
	} )
}
