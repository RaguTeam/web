/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $raggu_web_front_explorer_forcegraph, {
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
	$mol_style_attach( 'raggu/web/front/explorer/forcegraph/forcegraph.view.css',
		'[data-forcegraph-tooltip-bg] {\n'
		+ '\tfill: var(--bog_builderui_card);\n'
		+ '\tstroke: var(--bog_builderui_line);\n'
		+ '}\n'
		+ '[data-forcegraph-tooltip-text] {\n'
		+ '\tfill: var(--bog_builderui_text);\n'
		+ '}\n'
		// Halo (paint-order: stroke) отделяет подписи от линий графа под ними.
		+ '[data-forcegraph-node-label] {\n'
		+ '\tfill: var(--bog_builderui_text);\n'
		+ '\tpaint-order: stroke;\n'
		+ '\tstroke: var(--bog_builderui_back);\n'
		+ '\tstroke-width: 2px;\n'
		+ '\tstroke-opacity: 0.7;\n'
		+ '}\n'
		+ '[data-forcegraph-edge-label] {\n'
		+ '\tfill: var(--bog_builderui_shade);\n'
		+ '\tpaint-order: stroke;\n'
		+ '\tstroke: var(--bog_builderui_back);\n'
		+ '\tstroke-width: 2px;\n'
		+ '\tstroke-opacity: 0.6;\n'
		+ '}\n'
		// Ховер гасит базовые слои ОДНИМ свойством на группу — вместо
		// пересчёта opacity у тысяч элементов. Подсветка живёт в G_overlay.
		+ '[data-forcegraph-base] {\n'
		+ '\ttransition: opacity 0.15s ease;\n'
		+ '}\n'
		+ '[data-forcegraph-dim="true"] [data-forcegraph-base] {\n'
		+ '\topacity: 0.22;\n'
		+ '}\n'
		// Обводка/линии оверлея — темозависимые: белое на светлой теме
		// поверх приглушённой базы было невидимым
		+ '[raggu_web_front_explorer_forcegraph_overlay_edge] {\n'
		+ '\tstroke: var(--bog_builderui_text);\n'
		+ '}\n'
		+ '[raggu_web_front_explorer_forcegraph_overlay_node] {\n'
		+ '\tstroke: var(--bog_builderui_text);\n'
		+ '}\n'
	)
}
