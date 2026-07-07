/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_norweb_front_gallery, {
		flex: { direction: 'column', shrink: 1 },
		minWidth: 0,
		padding: {
			top: '1.5rem',
			bottom: '1.5rem',
			left: '1.75rem',
			right: '1.75rem',
		},

		Header: {
			flex: { direction: 'row' },
			flexWrap: 'wrap',
			align: { items: 'flex-end' },
			gap: '0.875rem',
			margin: { bottom: '1.25rem' },
		},
		Header_text: {
			flex: { direction: 'column', grow: 1, shrink: 1 },
			minWidth: 0,
		},
		Header_title: {
			font: { weight: 700, size: '20px' },
		},
		Header_subtitle: {
			font: { size: '13px' },
			color: $bog_builderui_tokens.shade,
			margin: { top: '3px' },
		},
		Mock_badge: {
			display: 'none',
			alignSelf: 'flex-start',
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '11px',
			},
			color: '#8a6d1b',
			background: { color: '#f5c84226' },
			border: { width: '1px', style: 'solid', color: '#d9b23a66', radius: '6px' },
			padding: {
				top: '3px',
				bottom: '3px',
				left: '8px',
				right: '8px',
			},
			margin: { top: '8px' },
			'@': {
				bog_norweb_front_gallery_mock_badge_showed: {
					true: { display: 'flex' },
				},
			},
		},
		Spacer: {
			flex: { grow: 1 },
		},
		Upload_doc: {
			border: { width: '1px', style: 'dashed', color: '#b8b4b0', radius: '8px' },
			padding: {
				top: '10px',
				bottom: '10px',
				left: '16px',
				right: '16px',
			},
			font: { size: '12px', weight: 600 },
			color: $bog_builderui_tokens.shade,
			background: { color: $bog_builderui_tokens.card },
			cursor: 'pointer',
		},
		Upload_idx: {
			border: { width: '1px', style: 'dashed', color: '#b8b4b0', radius: '8px' },
			padding: {
				top: '10px',
				bottom: '10px',
				left: '16px',
				right: '16px',
			},
			font: { size: '12px', weight: 600 },
			color: $bog_builderui_tokens.shade,
			background: { color: $bog_builderui_tokens.card },
			cursor: 'pointer',
		},

		Grid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
			gap: '16px',
			minWidth: 0,
		},

		'@media': {
			'(max-width: 720px)': {
				padding: {
					top: '1rem',
					bottom: '1rem',
					left: '0.75rem',
					right: '0.75rem',
				},
			},
		},
	} )
}
