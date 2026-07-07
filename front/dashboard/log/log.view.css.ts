/** @see $bog_builderui_tokens */
namespace $ {

	const trace_stat = {
		font: {
			family: 'ui-monospace, monospace',
			weight: 500,
			size: '10px',
		},
		color: $bog_builderui_tokens.shade,
	} as const

	$mol_style_define( $raggu_web_front_dashboard_log, {
		flex: { direction: 'column' },
		border: { radius: '6px' },
		overflow: 'hidden',
		background: { color: $bog_builderui_tokens.back },

		Head: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '14px',
			font: {
				family: 'ui-monospace, monospace',
				weight: 500,
				size: '11px',
			},
			color: $bog_builderui_tokens.shade,
			padding: {
				top: '8px',
				bottom: '8px',
				left: '10px',
				right: '10px',
			},
			cursor: 'pointer',
		},
		Time: {
			color: $bog_builderui_tokens.shade,
		},
		Text: {
			flex: { grow: 1 },
		},
		Mode: {
			color: $bog_builderui_tokens.shade,
		},
		Dur: {
			color: '#1f8a5b',
		},
		Arrow: {
			color: $bog_builderui_tokens.shade,
			minWidth: '12px',
			textAlign: 'center',
		},

		Trace: {
			display: 'none',
			flex: { direction: 'column' },
			gap: '8px',
			padding: {
				top: '11px',
				bottom: '11px',
				left: '13px',
				right: '13px',
			},
			border: {
				top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			},
			transition: 'opacity 0.18s ease',
		},
		Trace_label: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
		},
		Trace_stats: {
			flex: { direction: 'row' },
			flexWrap: 'wrap',
			gap: '14px',
			margin: { top: '2px' },
		},
		Trace_stat_chunks: trace_stat,
		Trace_stat_comms: trace_stat,
		Trace_stat_retr: trace_stat,
		Trace_stat_gen: trace_stat,
		Trace_stat_power: trace_stat,
		Trace_link: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 500,
				size: '10px',
			},
			color: $bog_builderui_tokens.current,
		},

		'@': {
			raggu_web_front_dashboard_log_expanded: {
				true: {
					Trace: {
						display: 'flex',
					},
				},
			},
		},
	} )
}
