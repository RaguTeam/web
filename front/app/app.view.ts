namespace $.$$ {

	export class $bog_norweb_front_app extends $.$bog_norweb_front_app {

		body() {
			// Сводка не зависит от датасета, для остальных экранов без него показываем Gallery.
			if( this.screen() === 'summary' ) return [ this.Summary() ]
			const s = this.dataset_id() ? this.screen() : 'gallery'
			switch( s ) {
				case 'gallery': return [ this.Gallery() ]
				case 'explorer': return [ this.Explorer() ]
				case 'chat': return [ this.Chat() ]
				case 'dashboard': return [ this.Dashboard() ]
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
		open_settings() {
			this.settings_open( true )
			return null
		}

		@$mol_action
		select_dataset( id: string ) {
			this.dataset_id( id )
			return null
		}

		@$mol_action
		ask_chat() {
			// Переносим выбранную в графе сущность в чат: переключаем экран и
			// сразу кладём заготовку вопроса про неё в поле ввода.
			const node = ( this.Explorer() as $.$$.$bog_norweb_front_explorer ).selected()
			this.screen( 'chat' )
			if( node?.label ) {
				this.Chat().prompt_text( this.ask_entity_template().replace( '%s', node.label ) )
			}
			return null
		}

		screen_title() {
			switch( this.screen() ) {
				case 'gallery': return this.screen_gallery_title()
				case 'explorer': return this.screen_explorer_title()
				case 'chat': return this.screen_chat_title()
				case 'dashboard': return this.screen_dashboard_title()
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
		preset( next?: string ) { return this.arg_value( 'preset', next, 'demo' ) }

		@$mol_mem
		dataset_id( next?: string ) { return this.arg_value( 'ds', next, '' ) }

	}

}
