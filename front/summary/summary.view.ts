namespace $.$$ {

	type TechLink = { label: string, uri: string }

	export class $bog_norweb_front_summary extends $.$bog_norweb_front_summary {

		ids() {
			return [ 'ragu', 'mol', 'menolite', 'nerel', 'ocr' ]
		}

		rows() {
			return this.ids().map( id => this.Card( id ) )
		}

		card_icon( id: string ) {
			switch( id ) {
				case 'ragu': return '🧠'
				case 'mol': return '⚡'
				case 'menolite': return '🤖'
				case 'nerel': return '🏷'
				case 'ocr': return '📄'
			}
			return ''
		}

		card_title( id: string ) {
			switch( id ) {
				case 'ragu': return 'RAGU'
				case 'mol': return '$mol'
				case 'menolite': return 'Meno-Lite-0.1'
				case 'nerel': return 'NEREL+'
				case 'ocr': return 'OCR'
			}
			return ''
		}

		card_badge( id: string ) {
			switch( id ) {
				case 'ragu': return this.ragu_badge()
				case 'mol': return this.mol_badge()
				case 'menolite': return this.menolite_badge()
				case 'nerel': return this.nerel_badge()
				case 'ocr': return this.ocr_badge()
			}
			return ''
		}

		card_desc( id: string ) {
			switch( id ) {
				case 'ragu': return this.ragu_desc()
				case 'mol': return this.mol_desc()
				case 'menolite': return this.menolite_desc()
				case 'nerel': return this.nerel_desc()
				case 'ocr': return this.ocr_desc()
			}
			return ''
		}

		card_facts( id: string ): string[] {
			switch( id ) {
				case 'ragu': return [ this.ragu_fact_1(), this.ragu_fact_2(), this.ragu_fact_3() ]
				case 'mol': return [ this.mol_fact_1(), this.mol_fact_2(), this.mol_fact_3() ]
				case 'menolite': return [ this.menolite_fact_1(), this.menolite_fact_2(), this.menolite_fact_3() ]
				case 'nerel': return [ this.nerel_fact_1(), this.nerel_fact_2(), this.nerel_fact_3() ]
				case 'ocr': return [ this.ocr_fact_1(), this.ocr_fact_2() ]
			}
			return []
		}

		card_links( id: string ): TechLink[] {
			switch( id ) {
				case 'ragu': return [
					{ label: 'github.com/RaguTeam/RAGU', uri: 'https://github.com/RaguTeam/RAGU' },
				]
				case 'mol': return [
					{ label: 'github.com/b-on-g/norweb', uri: 'https://github.com/b-on-g/norweb' },
					{ label: 'mol.hyoo.ru', uri: 'https://mol.hyoo.ru/' },
				]
				case 'menolite': return [
					{ label: 'huggingface.co/bond005/meno-lite-0.1', uri: 'https://huggingface.co/bond005/meno-lite-0.1' },
				]
				case 'nerel': return [
					{ label: 'NEREL paper (arXiv:2108.13112)', uri: 'https://arxiv.org/abs/2108.13112' },
				]
				case 'ocr': return [
					{ label: 'github.com/AleksanderMerkulov/text_extractor', uri: 'https://github.com/AleksanderMerkulov/text_extractor' },
				]
			}
			return []
		}

		card_image( id: string ) {
			// Архитектура RAGU из статьи, лежит в assets и деплоится через meta.tree.
			if( id === 'ragu' ) return 'bog/norweb/front/assets/ragu.jpg'
			return ''
		}

		detail_showed() {
			return !!this.opened()
		}

		opened_icon() { return this.card_icon( this.opened() ) }
		opened_badge() { return this.card_badge( this.opened() ) }
		opened_title() { return this.card_title( this.opened() ) }
		opened_facts() { return this.card_facts( this.opened() ) }
		opened_links() { return this.card_links( this.opened() ) }
		opened_image() { return this.card_image( this.opened() ) }

		@$mol_action
		click( id: string ) {
			this.opened( id )
			return null
		}

		@$mol_action
		close() {
			this.opened( '' )
			return null
		}

	}

}
