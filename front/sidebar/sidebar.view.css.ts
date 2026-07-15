/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $raggu_web_front_sidebar, {
		minWidth: '228px',
		maxWidth: '228px',
		background: { color: $bog_builderui_tokens.field },
		border: {
			right: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
		},
		flex: { direction: 'column' },
		padding: {
			top: '1.125rem',
			bottom: '1.125rem',
			left: '0.875rem',
			right: '0.875rem',
		},
		'@': {
			raggu_web_front_sidebar_hidden: {
				true: { display: 'none' },
			},
		},

		Brand: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '0.5625rem',
			padding: {
				top: '0.25rem',
				bottom: '1.125rem',
				left: '0.375rem',
				right: '0.375rem',
			},
		},
		Brand_logo: {
			minWidth: '26px',
			maxWidth: '26px',
			height: '26px',
			border: { radius: '6px' },
			objectFit: 'cover',
			overflow: 'hidden',
		},
		Brand_title: {
			font: { weight: 700, size: '16px' },
			letterSpacing: '0.3px',
		},
		Brand_badge: {
			marginLeft: 'auto',
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '9px',
			},
			color: $bog_builderui_tokens.shade,
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '4px' },
			padding: {
				top: '2px',
				bottom: '2px',
				left: '5px',
				right: '5px',
			},
		},

		Datasets_label: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
			textTransform: 'uppercase',
			letterSpacing: '0.8px',
			padding: {
				top: 0,
				bottom: '0.5rem',
				left: '0.375rem',
				right: '0.375rem',
			},
		},

		Datasets: {
			flex: { grow: 1, shrink: 1 },
			minHeight: 0,
		},
		Dataset_list: {
			flex: { direction: 'column' },
			gap: '0.25rem',
			// Рамка активной строки — box-shadow, торчит наружу; без отступов
			// её срезает overflow скролла
			padding: {
				top: '2px',
				bottom: '2px',
				left: '3px',
				right: '3px',
			},
		},
		Dataset_row: {
			flex: { direction: 'column' },
			gap: '0.125rem',
			padding: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '0.6875rem',
				right: '0.6875rem',
			},
			border: { radius: '7px' },
			cursor: 'pointer',
			':hover': {
				background: { color: $bog_builderui_tokens.card },
			},
			'@': {
				raggu_web_front_sidebar_dataset_active: {
					true: {
						background: { color: $bog_builderui_tokens.card },
						box: {
							shadow: [ {
								x: 0,
								y: 0,
								blur: 0,
								spread: '1.5px',
								color: $bog_builderui_tokens.current,
							} ],
						},
						// Имя активного корпуса — в акцент, эффект виден и без рамки
						Dataset_name: {
							color: $bog_builderui_tokens.current,
						},
					},
				},
			},
		},
		Dataset_name: {
			font: { weight: 600, size: '13px' },
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
		},
		Dataset_meta: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 500,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
		},

		Footer: {
			flex: { direction: 'column' },
			gap: '0.625rem',
			padding: { top: '0.625rem' },
		},

		Lang_row: {
			flex: { direction: 'row' },
			flexWrap: 'wrap',
			gap: '0.125rem',
			align: { items: 'center' },
			padding: {
				top: '2px',
				bottom: '2px',
				left: '4px',
				right: '4px',
			},
		},
		Lang_label: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 600,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
			marginRight: 'auto',
		},
		Theme_switch: {
			padding: { top: '2px', bottom: '2px', left: '2px', right: '2px' },
			background: { color: $bog_builderui_tokens.card },
			border: { color: $bog_builderui_tokens.line },
			$mol_button_minor: {
				minWidth: '1.5rem',
				minHeight: '1.5rem',
				padding: { top: 0, bottom: 0, left: '0.375rem', right: '0.375rem' },
			},
		},
	} )
}
