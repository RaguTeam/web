/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_norweb_front_summary, {
		flex: { direction: 'column', shrink: 1 },
		minWidth: 0,
		padding: {
			top: '1.5rem',
			bottom: '1.5rem',
			left: '1.75rem',
			right: '1.75rem',
		},

		Header: {
			flex: { direction: 'column' },
			margin: { bottom: '1.25rem' },
		},
		Header_title: {
			font: { weight: 700, size: '20px' },
		},
		Header_subtitle: {
			font: { size: '13px' },
			color: $bog_builderui_tokens.shade,
			margin: { top: '3px' },
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
