namespace $.$$ {

	export type Raggu_chat_role = 'user' | 'assistant'

	export type Raggu_chat_item = {
		role: Raggu_chat_role
		text: string
		/** Отвечено фолбэком (прямой LLM без графа), а не GraphRAG-бэком. */
		off_graph?: boolean
	}

	export class $bog_norweb_front_chat extends $.$bog_norweb_front_chat {

		// История привязана к dataset_id — у каждого корпуса своя ветка чата.
		// Иначе фолбэк-плашка, полученная на одном датасете (напр. мок без бэка),
		// висела бы на сообщениях другого, где бэк отвечает через граф.
		@ $mol_mem
		history( next?: Raggu_chat_item[] ): Raggu_chat_item[] {
			const key = `$bog_norweb_front_chat.history@${ this.dataset_id() || '' }`
			const stored = this.$.$mol_state_session.value( key, next as any ) as Raggu_chat_item[] | null
			if( stored ) return stored
			return [
				{ role: 'user', text: this.seed_user_text() },
				{ role: 'assistant', text: this.seed_assistant_text() },
			]
		}

		override prompt_text( next?: string ) {
			return this.$.$mol_state_session.value( '$bog_norweb_front_chat.prompt_text', next ) ?? ''
		}

		@ $mol_mem
		llm() {
			// GitHub Models API forces response_format: json_object и требует чтобы
			// слово "json" присутствовало в messages — иначе 400 Bad Request.
			// Инструктируем модель отвечать одним JSON-полем reply, чтобы потом
			// вытащить чистый текст.
			return $mol_github_model.make({
				$: this.$,
				rules: () => 'Ты русскоязычный чат-ассистент. Отвечай ВСЕГДА строго валидным JSON вида {"reply": "<твой ответ обычным текстом>"}. Никаких других полей, никаких префиксов, только этот JSON.',
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

		@ $mol_action
		override prompt_submit() {
			const text = this.prompt_text().trim()
			if( !text ) return null
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
					console.error( '[norweb chat] GraphRAG backend failed, falling back to direct LLM:', error )
					// провалились в фолбэк ниже
				}
			}
			this.ask_llm( text )
		}

		// GraphRAG-агент бэка: возвращает готовый ответ с подмешанным контекстом
		// графа. Промис fetch пробрасывается через wire, реальная ошибка — наверх.
		ask_backend( text: string ) {
			const history = this.history()
				.slice( 0, -1 )
				.map( m => ( { role: m.role, content: m.text } ) )
			const resp = this.$.$bog_norweb_front_api(
				$bog_norweb_front_api_ragu_create_agent_message,
				{
					params: { dataset_id: this.dataset_id() },
					body: {
						message: text,
						history,
						engine: 'local',
						top_k: 15,
						rerank: true,
						include_trace: false,
						locale: this.$.$mol_locale.lang() === 'en' ? 'en' : 'ru',
					},
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
				const res = this.$.$bog_norweb_front_api(
					$bog_norweb_front_api_ragu_get_graph,
					{ params: { dataset_id: id }, query: { limit: 200 } },
				)
				const labels = ( res as any ).nodes
					.slice()
					.sort( ( a: any, b: any ) => ( b.degree ?? 0 ) - ( a.degree ?? 0 ) )
					.slice( 0, 60 )
					.map( ( n: any ) => `${ n.label } (${ n.entity_type })` )
				if( !labels.length ) return ''
				return `Ключевые сущности из графа знаний этого корпуса: ${ labels.join( '; ' ) }. Отвечай, опираясь на них, если вопрос по теме корпуса.`
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

		@ $mol_action
		override use_sug_one() {
			this.prompt_text( this.sug_one_text() )
			return null
		}

		@ $mol_action
		override use_sug_two() {
			this.prompt_text( this.sug_two_text() )
			return null
		}

		@ $mol_action
		override clear_click() {
			this.history( [] )
			return null
		}

	}

}
