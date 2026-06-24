/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_builderui_card, {
		background: {
			color: $bog_builderui_tokens.card,
		},
		color: $bog_builderui_tokens.text,
		border: {
			radius: $bog_builderui_tokens.radius,
			width: '1px',
			style: 'solid',
			color: $bog_builderui_tokens.line,
		},
		padding: {
			top: '1rem',
			bottom: '1rem',
			left: '1.25rem',
			right: '1.25rem',
		},
		box: {
			shadow: [ {
				x: 0,
				y: '1px',
				blur: '3px',
				spread: 0,
				color: '#0000001a',
			} ],
		},
		gap: '0.75rem',
		flex: {
			direction: 'column',
		},
		breakInside: 'avoid',
		margin: {
			bottom: '1rem',
		},
	} )
}
