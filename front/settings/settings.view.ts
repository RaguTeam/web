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

		/** Граф при поиске: 'on' → MixSearchEngine (чанки + граф), 'off' → NaiveSearchEngine (только чанки). */
		@$mol_mem
		use_graph( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.use_graph', next ?? null ) ?? 'on'
		}

		/**
		 * QueryPlanEngine: декомпозиция сложного вопроса на подвопросы через DAG.
		 *
		 * По умолчанию ВЫКЛЮЧЕН, пока бэк с `use_query_plan` не выкачен: у него
		 * extra="forbid", и старая версия отвечает 422 на весь запрос. Включённый
		 * по умолчанию тумблер сломал бы чат всем сразу после деплоя фронта.
		 */
		@$mol_mem
		query_plan( next?: string ): string {
			return this.$.$mol_state_local.value( '$raggu_web_front_settings.query_plan', next ?? null ) ?? 'off'
		}

	}

}
