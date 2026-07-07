/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $raggu_web_front_sidebar_lang, {
		font: {
			family: 'ui-monospace, monospace',
			weight: 700,
			size: '11px',
		},
		padding: {
			top: '4px',
			bottom: '4px',
			left: '8px',
			right: '8px',
		},
		border: { radius: '5px' },
		cursor: 'pointer',
		color: $bog_builderui_tokens.shade,
		'@': {
			raggu_web_front_sidebar_lang_active: {
				true: {
					background: { color: $bog_builderui_tokens.current },
					color: '#ffffff',
				},
			},
		},
	} )
}
