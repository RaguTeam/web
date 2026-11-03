namespace $.$$ {

	export class $raggu_web_front_chrome_theme extends $.$raggu_web_front_chrome_theme {

		Current_icon() {
			if( this.choice() === 'system' ) return this.Display_icon()
			return this.resolved() === 'dark' ? this.Moon_icon() : this.Sun_icon()
		}

		light_checked() { return this.choice() === 'light' }
		dark_checked() { return this.choice() === 'dark' }
		system_checked() { return this.choice() === 'system' }

		pick( next: string ) {
			this.choice( next )
			this.close()
		}

		pick_light() { this.pick( 'light' ) }
		pick_dark() { this.pick( 'dark' ) }
		pick_system() { this.pick( 'system' ) }

	}

	export class $raggu_web_front_chrome_lang extends $.$raggu_web_front_chrome_lang {

		en_checked() { return $raggu_web_front_lib_lang() === 'en' }
		ru_checked() { return $raggu_web_front_lib_lang() === 'ru' }

		pick( next: 'en' | 'ru' ) {
			this.$.$mol_locale.lang( next )
			this.close()
		}

		pick_en() { this.pick( 'en' ) }
		pick_ru() { this.pick( 'ru' ) }

	}

}
