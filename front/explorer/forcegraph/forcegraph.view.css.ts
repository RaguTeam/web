/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_norweb_front_explorer_forcegraph, {
		width: '100%',
		height: '100%',
		display: 'block',
		// Disable browser default drag actions during pointer-capture:
		// - text selection on drag
		// - touch scroll/zoom gestures
		// - native image drag
		userSelect: 'none',
		touchAction: 'none',
	} )

	// SVG stroke/fill don't accept $mol_style_func in the typed-prop schema,
	// so wire tokens through raw CSS via style_attach — same trick mol_svg uses
	// for its own text-box background. Selectors match by data-* set on the
	// tooltip elements in view.tree.
	$mol_style_attach( 'bog/norweb/front/explorer/forcegraph/forcegraph.view.css',
		'[data-forcegraph-tooltip-bg] {\n'
		+ '\tfill: var(--bog_builderui_card);\n'
		+ '\tstroke: var(--bog_builderui_line);\n'
		+ '}\n'
		+ '[data-forcegraph-tooltip-text] {\n'
		+ '\tfill: var(--bog_builderui_text);\n'
		+ '}\n'
	)
}
