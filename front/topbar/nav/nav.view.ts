namespace $.$$ {

	export class $raggu_web_front_topbar_nav extends $.$raggu_web_front_topbar_nav {

		/**
		 * Без подписи кнопка остаётся чисто иконочной. Пустой Label не просто
		 * невидим: он всё равно flex-элемент и съедает gap, из-за чего иконка
		 * перестаёт стоять по центру квадрата.
		 */
		Label() {
			if( !this.label() ) return null as any
			return super.Label()
		}

	}

}
