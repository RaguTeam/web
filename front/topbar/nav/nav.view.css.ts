/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $raggu_web_front_topbar_nav, {
		align: { items: 'center' },
		justify: { content: 'center' },
		minWidth: '34px',
		minHeight: '34px',
		border: { radius: '7px' },
		font: { size: '15px' },
		cursor: 'pointer',
		color: $bog_builderui_tokens.shade,
		'@': {
			raggu_web_front_topbar_nav_active: {
				true: {
					background: { color: $bog_builderui_tokens.current },
					color: '#ffffff',
				},
			},
			raggu_web_front_topbar_nav_disabled: {
				true: {
					opacity: 0.4,
					cursor: 'not-allowed',
					pointerEvents: 'none',
				},
			},
		},
	} )
}
