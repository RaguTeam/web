namespace $.$$ {

	/**
	 * Панель настроек поиска.
	 *
	 * Раньше здесь жил мок движка индексации — три пресета и четырнадцать полей
	 * (chunking, extraction, summarization, communities, refinement, search).
	 * Он ничего не менял: значения лежали в local-state и никуда не уходили.
	 * По просьбе Матвея убран целиком, остались две настройки, которые реально
	 * влияют на запрос к агенту. Мок при надобности достаётся из истории git.
	 */
	export class $raggu_web_front_settings extends $.$raggu_web_front_settings {

		@$mol_action
		close() {
			this.showed( false )
			return null
		}

		// ---- runtime-переключалки поиска ----
		//
		// Уезжают на бэк полями запроса к агенту, а не отдельной ручкой настроек:
		// они относятся к конкретному вопросу, и хранить их на сервере значило бы
		// разводить состояние между вкладками. Читает их app: chat_engine() и
		// chat_query_plan().

		/**
		 * Режим поиска. Раньше здесь была галочка «граф вкл/выкл» на два
		 * значения из четырёх: global и local выбрать было нельзя, хотя сервис
		 * их умеет, а на каком корпусе они работают — решает сам корпус.
		 */
		@$mol_mem
		engine( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.engine', next ?? null ) ?? 'mix'
		}

		/**
		 * Что предложить в выпадающем списке.
		 *
		 * Только то, что этот корпус обслуживает. Недоступный режим в списке
		 * был бы кнопкой, на которую некому ответить, — а какие именно отсутствуют
		 * и почему, говорит строка ниже.
		 */
		@$mol_mem
		engine_dictionary(): Record<string, string> {
			const labels = this.engine_labels()
			const dictionary: Record<string, string> = {}
			for( const mode of this.available_engines() ) dictionary[ mode ] = labels[ mode ] ?? mode
			return dictionary
		}

		engine_labels(): Record<string, string> {
			return {
				mix: this.engine_mix_text(),
				local: this.engine_local_text(),
				naive: this.engine_naive_text(),
				global: this.engine_global_text(),
			}
		}

		/** Значение селекта: выбранное, если корпус его обслуживает. */
		@$mol_mem
		engine_value( next?: string ): string {
			if( next !== undefined ) return this.engine( next )
			const available = this.available_engines()
			const chosen = this.engine()
			return available.includes( chosen ) ? chosen : ( available[ 0 ] ?? 'mix' )
		}

		/** Каких режимов этот корпус не обслуживает — словами, а не молчанием. */
		engine_missing_text() {
			const available = new Set( this.available_engines() )
			const missing = Object.keys( this.engine_labels() ).filter( mode => !available.has( mode ) )
			if( !missing.length ) return ''
			return this.engine_missing_prefix_text() + ' ' + missing.join( ', ' )
		}

		/**
		 * QueryPlanEngine: декомпозиция сложного вопроса на подвопросы через DAG.
		 *
		 * По умолчанию выключен: каждый подвопрос — отдельный проход поиска и
		 * лишние вызовы модели, и включать это всем по умолчанию значит платить
		 * за то, чего никто не просил.
		 */
		@$mol_mem
		query_plan( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.query_plan', next ?? null ) ?? 'off'
		}

	}

}
