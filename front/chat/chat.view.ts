namespace $.$$ {

	export type Raggu_chat_role = 'user' | 'assistant'

	export type Raggu_chat_item = {
		role: Raggu_chat_role
		text: string
		/** Отвечено фолбэком (прямой LLM без графа), а не GraphRAG-бэком. */
		off_graph?: boolean
	}

	export class $raggu_web_front_chat extends $.$raggu_web_front_chat {

		// История привязана к dataset_id — у каждого корпуса своя ветка чата.
		// Иначе фолбэк-плашка, полученная на одном датасете (напр. мок без бэка),
		// висела бы на сообщениях другого, где бэк отвечает через граф.
		@ $mol_mem
		history( next?: Raggu_chat_item[] ): Raggu_chat_item[] {
			const key = `$raggu_web_front_chat.history@${ this.dataset_id() || '' }`
			const stored = this.$.$mol_state_session.value( key, next as any ) as Raggu_chat_item[] | null
			return stored ?? []
		}

		is_empty() { return this.history().length === 0 }

		override prompt_text( next?: string ) {
			return this.$.$mol_state_session.value( '$raggu_web_front_chat.prompt_text', next ) ?? ''
		}

		@ $mol_mem
		llm() {
			// GitHub Models API forces response_format: json_object и требует чтобы
			// слово "json" присутствовало в messages — иначе 400 Bad Request.
			// Инструктируем модель отвечать одним JSON-полем reply, чтобы потом
			// вытащить чистый текст.
			const ru = $raggu_web_front_api_locale() === 'ru'
			return $mol_github_model.make({
				$: this.$,
				rules: () => ru
					? 'Ты русскоязычный чат-ассистент. Отвечай ВСЕГДА строго валидным JSON вида {"reply": "<твой ответ обычным текстом>"}. Никаких других полей, никаких префиксов, только этот JSON.'
					: 'You are a chat assistant answering in English. ALWAYS reply with strictly valid JSON of the form {"reply": "<your answer as plain text>"}. No other fields, no prefixes, just this JSON.',
			})
		}

		@ $mol_mem
		override rows() {
			return this.history().map( ( _, i ) => this.Message( i ) )
		}

		// Автоскролл вниз при появлении нового сообщения.
		// auto() вызывается $mol_view.dom_tree после render — DOM уже актуален.
		override auto() {
			void this.history()
			const el = this.Body().dom_node() as HTMLElement
			el.scrollTop = el.scrollHeight
			return [] as any
		}

		message_text( index: number ) {
			return this.history()[ index ]?.text ?? ''
		}

		message_role( index: number ) {
			return this.history()[ index ]?.role ?? 'user'
		}

		message_off_graph( index: number ) {
			return this.history()[ index ]?.off_graph ?? false
		}

		/**
		 * Enter отправляет, Shift+Enter переносит строку.
		 *
		 * Штатный submit у $mol_textarea висит на Ctrl+Enter (`submit_with_ctrl`),
		 * а голый Enter вставляет перенос. Переключить один флаг мало: хоткей не
		 * гасит ввод символа, и в очищенное после отправки поле прилетел бы
		 * перенос строки. Поэтому ловим сами и гасим событие первым же действием —
		 * обработчик обёрнут в $mol_wire_async и выполняется синхронно лишь до
		 * первой приостановки, так что preventDefault должен успеть до чтений.
		 */
		prompt_press( event?: KeyboardEvent ) {
			if( event?.key !== 'Enter' ) return null
			if( event.shiftKey || event.ctrlKey || event.metaKey || event.altKey ) return null
			event.preventDefault()
			this.prompt_submit()
			return null
		}

		@ $mol_action
		override prompt_submit() {
			const text = this.prompt_text().trim()
			if( !text ) return null
			// Само действие, без текста вопроса: аналитике нужна частота, а не
			// содержание, и чужие вопросы — не то, что стоит выгружать наружу.
			$raggu_web_front_analytics_event( 'question_asked', {
				dataset: this.dataset_id(),
				engine: this.engine(),
				query_plan: this.use_query_plan(),
				length: text.length,
			} )
			this.history( [ ... this.history(), { role: 'user', text } ] )
			this.prompt_text( '' )
			// Ответ в detached wire — не блокирует action, не мутирует state внутри fiber body,
			// сам ретаинится при suspension от fetch/model.
			$mol_wire_async( this ).ask( text )
			return null
		}

		// Скелет виден когда мы ждём ответа: последнее сообщение = user.
		// Реактивно, без ловли suspension: ask сам мутирует history когда ответ придёт,
		// last=assistant → is_communicating становится false → скелет скрывается.
		is_communicating(): boolean {
			const h = this.history()
			if( h.length === 0 ) return false
			return h[ h.length - 1 ].role === 'user'
		}

		// Роутинг ответа. Аргумент text — для уникальности fiber-slot в
		// $mol_wire_async cache. Основной путь — GraphRAG-агент на бэке RAGU:
		// он сам достаёт контекст из графа знаний и подмешивает его перед
		// генерацией. Если датасет не выбран или бэк недоступен — фолбэк на
		// прямой LLM, чтобы демо не умирало.
		ask( text: string ) {
			if( this.dataset_id() ) {
				try {
					return this.ask_backend( text )
				} catch( error: any ) {
					if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					console.error( '[raggu chat] GraphRAG backend failed, falling back to direct LLM:', error )
					// провалились в фолбэк ниже
				}
			}
			this.ask_llm( text )
		}

		/**
		 * Свойство из view.tree — просто string, а тело запроса ждёт литерал.
		 * Сужаем здесь и заодно страхуемся: всё, что не `naive`, уходит как
		 * `mix` — бэк из неподдерживаемых движков всё равно падает в него.
		 */
		override engine(): 'mix' | 'naive' {
			return super.engine() === 'naive' ? 'naive' : 'mix'
		}

		// GraphRAG-агент бэка: возвращает готовый ответ с подмешанным контекстом
		// графа. Промис fetch пробрасывается через wire, реальная ошибка — наверх.
		ask_backend( text: string ) {
			const history = this.history()
				.slice( 0, -1 )
				.map( m => ( { role: m.role, content: m.text } ) )
			// `use_query_plan` кладём в тело, ТОЛЬКО когда план включён. У бэка
			// APIModel с extra="forbid", и задеплоенная версия, которая про это
			// поле ещё не знает, отвечает 422 на весь запрос. Пока она не
			// обновилась, выключенный тумблер = прежний контракт, включённый —
			// осознанный опт-ин. Каст нужен потому, что генератор помечает поля
			// с дефолтом как обязательные: опустить их типом нельзя.
			const body = {
				message: text,
				history,
				engine: this.engine(),
				top_k: 15,
				rerank: true,
				include_trace: false,
				locale: $raggu_web_front_api_locale(),
				...( this.use_query_plan() ? { use_query_plan: true } : {} ),
			}
			const resp = this.$.$raggu_web_front_api(
				$raggu_web_front_api_ragu_create_agent_message,
				{
					params: { dataset_id: this.dataset_id() },
					body: body as typeof $raggu_web_front_api_ragu_create_agent_message.body,
				},
			)
			const reply = ( resp as any )?.message?.content ?? ''
			this.history( [ ... this.history(), { role: 'assistant', text: reply } ] )
		}

		// Лёгкий контекст для фолбэка: сущности графа (лейбл + тип, топ по degree)
		// прямо с бэка. Полноценного RAG-ретривала тут нет, но модель хотя бы
		// «видит» какие сущности есть в корпусе и отвечает ближе к теме.
		// Возвращает '' если графа нет (мок без бэка) — тогда чистый LLM.
		graph_context(): string {
			const id = this.dataset_id()
			if( !id ) return ''
			try {
				const res = this.$.$raggu_web_front_api(
					$raggu_web_front_api_ragu_get_graph,
					{ params: { dataset_id: id }, query: { limit: 200 } },
				)
				const labels = ( res as any ).nodes
					.slice()
					.sort( ( a: any, b: any ) => ( b.degree ?? 0 ) - ( a.degree ?? 0 ) )
					.slice( 0, 60 )
					.map( ( n: any ) => `${ n.label } (${ n.entity_type })` )
				if( !labels.length ) return ''
				const list = labels.join( '; ' )
				return $raggu_web_front_api_locale() === 'ru'
					? `Ключевые сущности из графа знаний этого корпуса: ${ list }. Отвечай, опираясь на них, если вопрос по теме корпуса.`
					: `Key entities from the knowledge graph of this corpus: ${ list }. Rely on them when the question is about the corpus.`
			} catch( error: any ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				return ''
			}
		}

		// Фолбэк: прямой LLM. Если удаётся достать граф с бэка — подмешиваем
		// сущности как контекст, чтобы ответ был ближе к корпусу.
		ask_llm( text: string ) {
			const history = this.history()
			const context = this.graph_context()
			const model = this.llm().fork()
			if( context ) model.tell( [ context ] )
			for( const item of history ) {
				if( item.role === 'user' ) model.ask( [ item.text ] )
				else model.tell( [ item.text ] )
			}
			try {
				const resp = model.response() as { reply?: string } | string
				const reply = typeof resp === 'string' ? resp : resp?.reply ?? JSON.stringify( resp, null, 2 )
				this.history( [ ... this.history(), { role: 'assistant', text: reply, off_graph: true } ] )
			} catch( error: any ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				if( $mol_fail_log( error ) ) {
					this.history( [ ... this.history(), { role: 'assistant', text: '📛 ' + ( error.message || String( error ) ), off_graph: true } ] )
				}
			}
		}

		// Заготовки вопросов бэк отдаёт под конкретный корпус и локаль — они
		// построены на реальных сущностях индекса, поэтому лучше любых наших.
		// Читаются внутри Suggestions, так что подвисание фетча гасит только
		// строку подсказок, а не весь чат.
		// URL-флаг `?mock=1` — как в галерее и графе: демо и node-тесты без бэка
		// не должны ронять в чат висящий $mol_fetch.
		mock_flag(): boolean {
			return this.$.$mol_state_arg.value( 'mock' ) === '1'
		}

		@ $mol_mem
		remote_suggestions(): readonly string[] | null {
			const id = this.dataset_id()
			if( !id || this.mock_flag() ) return null
			try {
				const res = this.$.$raggu_web_front_api(
					$raggu_web_front_api_ragu_get_agent_suggestions,
					{ params: { dataset_id: id }, query: { locale: $raggu_web_front_api_locale() } },
				)
				const list = ( res as any )?.suggestions as string[] | undefined
				return list?.length ? list : null
			} catch( error: any ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				console.warn( '[raggu chat] suggestions fetch failed, falling back to built-ins:', error )
				return null
			}
		}

		// Фолбэк без бэка: свои 3 вопроса на встроенные корпуса, общие — на всё
		// остальное. Строки объявлены в view.tree, значит переводятся локалью.
		fallback_suggestions(): readonly string[] {
			switch( this.dataset_id() ) {
				case 'law': return [ this.sug_law_one_text(), this.sug_law_two_text(), this.sug_law_three_text() ]
				case 'wiki': return [ this.sug_wiki_one_text(), this.sug_wiki_two_text(), this.sug_wiki_three_text() ]
			}
			return [ this.sug_any_one_text(), this.sug_any_two_text(), this.sug_any_three_text() ]
		}

		suggestions(): readonly string[] {
			return ( this.remote_suggestions() ?? this.fallback_suggestions() ).slice( 0, 3 )
		}

		// Кнопка очистки живёт в том же ряду — у неё margin-left:auto в стилях.
		suggestion_rows() {
			return [ ... this.suggestions().map( ( _, i ) => this.Sug( i ) ), this.Clear() ]
		}

		sug_text( index: number ) {
			return this.suggestions()[ index ] ?? ''
		}

		@ $mol_action
		sug_click( index: number ) {
			this.prompt_text( this.sug_text( index ) )
			return null
		}

		@ $mol_action
		override clear_click() {
			this.history( [] )
			return null
		}

	}

}
