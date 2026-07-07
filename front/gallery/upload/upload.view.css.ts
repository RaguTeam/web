/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $raggu_web_front_gallery_upload, {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		display: 'none',
		zIndex: 50,
		justify: { content: 'center' },
		align: { items: 'center' },
		'@': {
			raggu_web_front_gallery_upload_showed: {
				true: { display: 'flex' },
			},
		},

		Backdrop: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			background: { color: '#1c1b1a8c' },
		},

		Panel: {
			position: 'relative',
			zIndex: 1,
			minWidth: '420px',
			maxWidth: '520px',
			width: '90%',
			gap: '14px',
			padding: {
				top: '20px',
				bottom: '20px',
				left: '22px',
				right: '22px',
			},
		},

		Header: {
			flex: { direction: 'row' },
			align: { items: 'flex-start' },
			gap: '12px',
		},
		Header_text: {
			flex: { direction: 'column', grow: 1, shrink: 1 },
			minWidth: 0,
		},
		Header_title: {
			font: { weight: 700, size: '16px' },
			color: $bog_builderui_tokens.text,
		},
		Header_subtitle: {
			font: { size: '12px' },
			color: $bog_builderui_tokens.shade,
			margin: { top: '3px' },
		},
		Spacer: { flex: { grow: 1 } },
		Close_btn: {
			minWidth: '28px',
			maxWidth: '28px',
			height: '28px',
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '6px' },
			align: { items: 'center' },
			justify: { content: 'center' },
			cursor: 'pointer',
			font: { size: '13px' },
			color: $bog_builderui_tokens.shade,
		},

		Body: {
			flex: { direction: 'column' },
			gap: '14px',
		},

		Progress_body: {
			flex: { direction: 'column' },
			gap: '14px',
		},
		Progress_label: {
			flex: { direction: 'row' },
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '11px',
			},
			color: $bog_builderui_tokens.shade,
		},
		Steps_list: {
			flex: { direction: 'column' },
			gap: '6px',
			margin: { top: '4px' },
		},
		Step: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '10px',
			padding: {
				top: '6px',
				bottom: '6px',
				left: '8px',
				right: '8px',
			},
			border: { radius: '6px' },
			font: { size: '13px' },
			color: $bog_builderui_tokens.shade,
			'@': {
				raggu_web_front_gallery_upload_step_status: {
					active: {
						background: { color: $bog_builderui_tokens.field },
						color: $bog_builderui_tokens.text,
						font: { weight: 600 },
					},
					done: {
						color: $bog_builderui_tokens.text,
					},
				},
			},
		},
		Step_marker: {
			minWidth: '16px',
			font: {
				family: 'ui-monospace, monospace',
				size: '14px',
			},
		},

		Error_body: {
			flex: { direction: 'column' },
			gap: '8px',
			padding: {
				top: '12px',
				bottom: '12px',
				left: '14px',
				right: '14px',
			},
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '8px' },
			background: { color: $bog_builderui_tokens.field },
		},
		Error_title: {
			font: { weight: 700, size: '13px' },
			color: $bog_builderui_tokens.text,
		},
		Error_text: {
			font: { size: '12px' },
			color: $bog_builderui_tokens.shade,
		},
	} )
}
