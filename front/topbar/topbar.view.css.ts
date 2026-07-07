/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_norweb_front_topbar, {
		height: '58px',
		minHeight: '58px',
		background: { color: $bog_builderui_tokens.card },
		border: {
			bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
		},
		flex: { direction: 'row' },
		align: { items: 'center' },
		gap: '0.875rem',
		padding: {
			left: '1.25rem',
			right: '1.25rem',
		},

		Title_block: {
			flex: { direction: 'column' },
		},
		Title: {
			font: { weight: 700, size: '15px' },
		},
		Subtitle: {
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

		Preset_label: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
			textTransform: 'uppercase',
		},

		Preset_group: {
			flex: { direction: 'row' },
			gap: '0.25rem',
			background: { color: $bog_builderui_tokens.field },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
			padding: {
				top: '3px',
				bottom: '3px',
				left: '3px',
				right: '3px',
			},
		},

		Settings_btn: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '6px',
			background: { color: $bog_builderui_tokens.card },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
			padding: {
				top: '7px',
				bottom: '7px',
				left: '12px',
				right: '12px',
			},
			font: { size: '12px', weight: 600 },
			cursor: 'pointer',
		},

		'@media': {
			'(max-width: 720px)': {
				height: 'auto',
				minHeight: '58px',
				flexWrap: 'wrap',
				gap: '0.5rem',
				padding: {
					top: '8px',
					bottom: '8px',
					left: '0.75rem',
					right: '0.75rem',
				},
			},
		},

	} )
}
