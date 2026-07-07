/** @see $bog_builderui_tokens */
namespace $ {

	const suggestion = {
		border: { width: '1px', style: 'dashed', color: $bog_builderui_tokens.line, radius: '14px' },
		padding: {
			top: '5px',
			bottom: '5px',
			left: '11px',
			right: '11px',
		},
		font: { size: '11px' },
		color: $bog_builderui_tokens.shade,
		cursor: 'pointer',
	} as const

	$mol_style_define( $bog_norweb_front_chat, {
		flex: { direction: 'column', shrink: 1 },
		minWidth: 0,
		minHeight: 0,
		height: '100%',

		Clear: {
			marginLeft: 'auto',
			minWidth: '40px',
			height: '26px',
			padding: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			},
			align: { items: 'center' },
			justify: { content: 'center' },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '6px' },
			color: $bog_builderui_tokens.shade,
			font: { size: '14px', weight: 500 },
			lineHeight: '1',
		},

		Body: {
			flex: { grow: 1, direction: 'column' },
			overflow: 'auto',
			// min-height: 0 обязателен для flex-child с overflow:auto,
			// иначе элемент раздувается до scrollHeight и внешний контейнер скроллится вместо него.
			minHeight: 0,
			padding: {
				top: '22px',
				bottom: '22px',
				left: '22px',
				right: '22px',
			},
		},
		Body_flow: {
			flex: { direction: 'column' },
			gap: '16px',
		},
		Status: {
			background: { color: $bog_builderui_tokens.card },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			borderRadius: '12px 12px 12px 3px',
			padding: {
				top: '13px',
				bottom: '13px',
				left: '16px',
				right: '16px',
			},
			maxWidth: '78%',
			align: { self: 'flex-start' },
			flex: { direction: 'column' },
			gap: '10px',
			// По дефолту скрыт. attr raggu_loading=true → показываем скелет.
			// Boolean false → mol удаляет атрибут → [attr="true"] селектор ниже включает display.
			display: 'none',
			'@': {
				raggu_loading: {
					true: {
						display: 'flex',
					},
				},
			},
		},
		Skel_line_one: {
			height: '12px',
			borderRadius: '4px',
			minWidth: '260px',
		},
		Skel_line_two: {
			height: '12px',
			borderRadius: '4px',
			minWidth: '320px',
		},
		Skel_line_three: {
			height: '12px',
			borderRadius: '4px',
			minWidth: '200px',
		},
		Messages: {
			gap: '16px',
		},

		Message: {
			flex: { direction: 'column' },
			maxWidth: '78%',
			'@': {
				raggu_role: {
					user: {
						align: { self: 'flex-end' },
						maxWidth: '70%',
					},
					assistant: {
						align: { self: 'flex-start' },
					},
				},
			},
		},
		Message_text: {
			font: { size: '13px' },
			lineHeight: '1.55',
			'@': {
				raggu_role: {
					user: {
						background: { color: $bog_builderui_tokens.current },
						color: '#ffffff',
						borderRadius: '12px 12px 3px 12px',
						padding: {
							top: '11px',
							bottom: '11px',
							left: '15px',
							right: '15px',
						},
					},
					assistant: {
						background: { color: $bog_builderui_tokens.card },
						border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
						borderRadius: '12px 12px 12px 3px',
						padding: {
							top: '13px',
							bottom: '13px',
							left: '16px',
							right: '16px',
						},
						color: $bog_builderui_tokens.text,
					},
				},
			},
		},

		Message_badge: {
			display: 'none',
			alignSelf: 'flex-start',
			margin: { top: '6px' },
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '10px',
			},
			color: '#8a6d1b',
			background: { color: '#f5c84226' },
			border: { width: '1px', style: 'solid', color: '#d9b23a66', radius: '5px' },
			padding: {
				top: '2px',
				bottom: '2px',
				left: '7px',
				right: '7px',
			},
			'@': {
				raggu_off_graph: {
					true: { display: 'flex' },
				},
			},
		},

		Footer: {
			padding: {
				top: '14px',
				bottom: '14px',
				left: '22px',
				right: '22px',
			},
			border: {
				top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
			},
			flex: { direction: 'column' },
		},
		Suggestions: {
			flex: { direction: 'row' },
			flexWrap: 'wrap',
			gap: '7px',
			margin: { bottom: '10px' },
			align: { items: 'center' },
		},
		Sug_one: suggestion,
		Sug_two: suggestion,
		Input_row: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '8px',
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '10px' },
			padding: {
				top: '8px',
				bottom: '8px',
				left: '12px',
				right: '8px',
			},
			color: $bog_builderui_tokens.shade,
			font: { size: '13px' },
		},
		Prompt: {
			flex: { grow: 1 },
			border: { width: 0 },
			background: { color: 'transparent' },
			minHeight: '24px',
			color: $bog_builderui_tokens.text
		},
		Input_send: {
			background: { color: $bog_builderui_tokens.current },
			color: '#ffffff',
			border: { radius: '7px' },
			padding: {
				top: '6px',
				bottom: '6px',
				left: '14px',
				right: '14px',
			},
			font: { size: '12px', weight: 600 },
		},
	} )
}
