namespace $.$$ {

	export class $raggu_web_front_app extends $.$raggu_web_front_app {

		body() {
			// Сводка не зависит от датасета, для остальных экранов без него показываем Gallery.
			if( this.screen() === 'summary' ) return [ this.Summary() ]
			const s = this.dataset_id() ? this.screen() : 'gallery'
			switch( s ) {
				case 'gallery': return [ this.Gallery() ]
				case 'explorer': return [ this.Explorer() ]
				case 'chat': return [ this.Chat() ]
				// Дашборд спрятан до готовности бэка:
				// case 'dashboard': return [ this.Dashboard() ]
			}
			return []
		}

		// Буклетный UX на телефоне: при смене раздела доскролливаем горизонтальный
		// снап к контенту. На десктопе скролла нет — вызов безвреден.
		// Таймаут вместо after_tick: на первом рендере layout ещё не готов
		// и scrollWidth равен clientWidth.
		override auto() {
			void this.screen()
			new this.$.$mol_after_timeout( 100, () => {
				const root = this.dom_node() as HTMLElement
				const main = this.Main().dom_node() as HTMLElement
				if( !root || !main ) return
				if( root.scrollWidth <= root.clientWidth ) return
				root.scroll( {
					left: main.offsetLeft + main.offsetWidth - root.clientWidth,
					behavior: 'smooth',
				} )
			} )
			return [] as any
		}

		@$mol_mem
		lights_mode() {
			return this.Theme_auto().is_light_now() ? 'light' : 'dark'
		}

		// Попап деталей сводки рендерим на уровне app: внутри Body его ломает
		// contain:content у скролла — fixed-оверлей позиционируется не от вьюпорта.
		Summary_popup() {
			return this.Summary().Detail()
		}

		@$mol_action
		open_help() {
			this.help_open( true )
			return null
		}

		@$mol_action
		open_settings() {
			this.settings_open( true )
			return null
		}

		@$mol_action
		close_settings() {
			this.settings_open( false )
			return null
		}

		sidebar_hidden() { return this.sidebar_collapsed() }

		@$mol_action
		toggle_sidebar() {
			this.sidebar_collapsed( !this.sidebar_collapsed() )
			return null
		}

		// Gallery владеет фетчем списка датасетов — сайдбар получает данные
		// через эти прокси, чтобы не дублировать remote_datasets.
		dataset_ids() {
			return this.Gallery().datasets().map( ( ds: any ) => ds.id as string )
		}

		sidebar_dataset_name( id: string ) {
			return this.Gallery().card_title( id )
		}

		sidebar_dataset_meta( id: string ) {
			const g = this.Gallery()
			return `⬡ ${ g.card_nodes( id ) } · ⇄ ${ g.card_edges( id ) }`
		}

		@$mol_action
		select_dataset( id: string ) {
			this.dataset_id( id )
			return null
		}

		// Клик по карточке в галерее — сразу в граф: выбрать корпус и значит
		// начать его смотреть, отдельный шаг «выбрал и стой на галерее» лишний.
		// Сайдбар остаётся мягким переключателем — там select_dataset без прыжка.
		@$mol_action
		open_dataset( id: string ) {
			this.dataset_id( id )
			this.screen( 'explorer' )
			return null
		}

		@$mol_action
		ask_chat() {
			// Переносим выбранное в графе (сущность или связь) в чат: переключаем
			// экран и сразу кладём заготовку вопроса в поле ввода.
			const explorer = this.Explorer()
			const node = explorer.selected()
			const edge = explorer.selected_edge()
			this.screen( 'chat' )
			if( edge ) {
				const label = `${ explorer.node_label( edge.source ) } ${ edge.relation } ${ explorer.node_label( edge.target ) }`
				this.Chat().prompt_text( this.ask_relation_template().replace( '%s', label ) )
			} else if( node?.label ) {
				this.Chat().prompt_text( this.ask_entity_template().replace( '%s', node.label ) )
			}
			return null
		}

		/**
		 * Переключалка «Граф при поиске» ложится прямо на поле `engine` запроса
		 * к агенту, отдельная ручка на бэке не нужна: `naive` ищет только по
		 * чанкам, `mix` — по чанкам и графу. Оба значения бэк поддерживает
		 * (`SUPPORTED_ENGINES` в schemas/datasets.py).
		 *
		 * Вторая переключалка, QueryPlanEngine, сюда пока не заводится: `query_plan`
		 * в enum есть, но в `SUPPORTED_ENGINES` его нет — бэк молча свалится в
		 * `mix`, и тумблер врал бы. Ждём готовности декомпозиции.
		 */
		chat_engine() {
			return this.Settings().use_graph() === 'on' ? 'mix' : 'naive'
		}

		screen_title() {
			switch( this.screen() ) {
				case 'gallery': return this.screen_gallery_title()
				case 'explorer': return this.screen_explorer_title()
				case 'chat': return this.screen_chat_title()
				case 'summary': return this.screen_summary_title()
			}
			return ''
		}

		dataset_title() {
			const id = this.dataset_id()
			if( !id ) return ''
			return this.Gallery().card_title( id )
		}

		arg_value( key: string, next: string | undefined, fallback: string ) {
			const arg = this.$.$mol_state_arg
			if ( next === undefined ) return arg.value( key ) ?? fallback
			arg.value( key, next === fallback ? null : next )
			return next
		}

		@$mol_mem
		screen( next?: string ) { return this.arg_value( 'screen', next, 'gallery' ) }

		@$mol_mem
		dataset_id( next?: string ) { return this.arg_value( 'ds', next, '' ) }

	}

}
