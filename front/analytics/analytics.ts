namespace $ {

	/**
	 * Тонкая обёртка над трекером Umami.
	 *
	 * Зачем она нужна отдельно, а не вызовы `umami.track()` по месту:
	 *
	 * 1. Трекера может не быть — локальная разработка, блокировщик рекламы,
	 *    отсутствие сети у стенда. Аналитика не тот повод, чтобы ронять UI,
	 *    поэтому здесь всё молча превращается в no-op.
	 * 2. $mol маршрутизирует хешем (`#!screen=chat/ds=medical`), а не путём.
	 *    Автотрекинг Umami считает переходы по смене пути, поэтому все экраны
	 *    склеились бы в один просмотр `/web/`. Экранные просмотры отправляем
	 *    руками — см. `pageview`.
	 */

	type Umami = {
		track( payload: { url: string, title?: string } ): void
		track( event: string, data?: Record< string, string | number | boolean > ): void
	}

	function umami(): Umami | null {
		return ( $mol_dom_context as any ).umami ?? null
	}

	/** Просмотр экрана. `screen` и `dataset` — то, что реально определяет страницу. */
	export function $raggu_web_front_analytics_pageview( screen: string, dataset: string ) {
		const api = umami()
		if( !api ) return
		const url = dataset ? `/${ screen }/${ dataset }` : `/${ screen }`
		try {
			api.track( { url, title: screen } )
		} catch {
			// Сеть, блокировщик, смена контракта трекера — не наше дело.
		}
	}

	/** Именованное действие пользователя: выбор корпуса, отправка вопроса и т.п. */
	export function $raggu_web_front_analytics_event(
		event: string,
		data?: Record< string, string | number | boolean >,
	) {
		const api = umami()
		if( !api ) return
		try {
			api.track( event, data )
		} catch {}
	}

}
