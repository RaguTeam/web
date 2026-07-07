/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $raggu_web_front_topbar_preset, {
		font: { size: '11px', weight: 600 },
		padding: {
			top: '5px',
			bottom: '5px',
			left: '10px',
			right: '10px',
		},
		border: { radius: '5px' },
		cursor: 'pointer',
		color: $bog_builderui_tokens.shade,
		'@': {
			raggu_web_front_topbar_preset_active: {
				true: {
					background: { color: $bog_builderui_tokens.card },
					color: $bog_builderui_tokens.text,
					box: {
						shadow: [ {
							x: 0,
							y: '1px',
							blur: '2px',
							spread: 0,
							color: '#00000014',
						} ],
					},
				},
			},
		},
	} )
}
