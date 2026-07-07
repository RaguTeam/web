/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_norweb_front_sidebar_nav, {
		flex: { direction: 'row' },
		align: { items: 'center' },
		gap: '0.625rem',
		padding: {
			top: '0.5625rem',
			bottom: '0.5625rem',
			left: '0.6875rem',
			right: '0.6875rem',
		},
		border: { radius: '7px' },
		font: { size: '13px', weight: 600 },
		cursor: 'pointer',
		color: $bog_builderui_tokens.shade,
		Icon: {
			minWidth: '18px',
			textAlign: 'center',
		},
		'@': {
			bog_norweb_front_sidebar_nav_active: {
				true: {
					background: { color: $bog_builderui_tokens.current },
					color: '#ffffff',
				},
			},
			bog_norweb_front_sidebar_nav_disabled: {
				true: {
					opacity: 0.4,
					cursor: 'not-allowed',
					pointerEvents: 'none',
				},
			},
		},
	} )
}
