/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $raggu_web_front_topbar, {
		height: '58px',
		minHeight: '58px',
		background: { color: $bog_builderui_tokens.card },
		border: {
			bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
		},
		flex: { direction: 'row' },
		align: { items: 'center' },
		gap: '0.875rem',
		padding: {
			left: '1.25rem',
			right: '1.25rem',
		},

		// Не `Nav`: имя свойства даёт атрибут `raggu_web_front_topbar_nav`, а он
		// совпадает с именем класса кнопки $raggu_web_front_topbar_nav — стиль
		// контейнера красил и сами кнопки. Специфичность у обоих правил равна
		// (`:where` у активного состояния не добавляет веса), решал порядок
		// файлов, и фон контейнера перебивал акцент активной вкладки.
		Nav_row: {
			flex: { direction: 'row' },
			gap: '0.125rem',
			background: { color: $bog_builderui_tokens.field },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
			padding: {
				top: '3px',
				bottom: '3px',
				left: '3px',
				right: '3px',
			},
		},

		// Заголовок сразу после переключалок разделов, не по центру окна
		Title_block: {
			flex: { direction: 'column' },
			align: { items: 'flex-start' },
			textAlign: 'left',
			margin: { left: '0.5rem' },
		},
		Title: {
			font: { weight: 700, size: '15px' },
		},
		Subtitle: {
			font: {
				family: 'ui-monospace, monospace',
				weight: 500,
				size: '10px',
			},
			color: $bog_builderui_tokens.shade,
		},

		Spacer: {
			flex: { grow: 1 },
		},

		// Шестерёнка стоит одна справа, без групповой подложки, какая есть у
		// Nav_row — серым по светлой карточке её не видно. Даём рамку, как у
		// «Помощи», обычный цвет текста и икону покрупнее.
		//
		// Активное состояние переигрываем здесь же: правило акцента живёт в
		// nav.view.css.ts, специфичность у обоих одинаковая, и кто победит —
		// решал бы порядок файлов в бандле.
		Nav_settings: {
			color: $bog_builderui_tokens.text,
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
			font: { size: '17px' },
			'@': {
				raggu_web_front_topbar_nav_active: {
					true: {
						background: { color: $bog_builderui_tokens.current },
						color: '#ffffff',
					},
				},
			},
		},

		Help_btn: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '6px',
			background: { color: $bog_builderui_tokens.card },
			border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
			padding: {
				top: '7px',
				bottom: '7px',
				left: '12px',
				right: '12px',
			},
			font: { size: '12px', weight: 600 },
			cursor: 'pointer',
		},

		// Навигация + центрированный заголовок не влезают уже на
		// ноутбучных ширинах, поэтому враппим сильно раньше, чем раньше (720).
		'@media': {
			'(max-width: 1200px)': {
				height: 'auto',
				minHeight: '58px',
				flexWrap: 'wrap',
				gap: '0.5rem',
				padding: {
					top: '8px',
					bottom: '8px',
					left: '0.75rem',
					right: '0.75rem',
				},
			},
		},

	} )
}
