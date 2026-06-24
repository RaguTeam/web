/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_builderui_field, {
		font: {
			family: $bog_builderui_tokens.font_body,
		},
		color: $bog_builderui_tokens.text,
		background: {
			color: $bog_builderui_tokens.field,
		},
		border: {
			radius: $bog_builderui_tokens.radius,
			width: '1px',
			style: 'solid',
			color: $bog_builderui_tokens.line,
		},
		padding: {
			top: '0.5rem',
			bottom: '0.5rem',
			left: '0.75rem',
			right: '0.75rem',
		},
		flex: {
			grow: 0,
			shrink: 1,
		},
		align: {
			self: 'stretch',
		},
		minWidth: 0,
		maxWidth: '100%',
		boxSizing: 'border-box',
	} )
}
