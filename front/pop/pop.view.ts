namespace $.$$ {

	export class $raggu_web_front_pop extends $.$raggu_web_front_pop {

		toggle() {
			this.showed( !this.showed() )
		}

		close() {
			this.showed( false )
		}

		bubble_keydown( event: KeyboardEvent ) {
			if( event.key !== 'Escape' ) return
			this.close()
			;( this.Trigger().dom_node() as HTMLElement ).focus()
		}

		place() {

			const trigger = this.Trigger().dom_node() as HTMLElement
			const bubble = this.Bubble().dom_node() as HTMLElement
			const rect = trigger.getBoundingClientRect()
			const width = bubble.offsetWidth
			const gap = 8

			let left = this.align() === 'end' ? rect.right - width : rect.left
			left = Math.max( gap, Math.min( window.innerWidth - width - gap, left ) )

			bubble.style.left = `${ left }px`
			bubble.style.top = `${ rect.bottom + this.offset() }px`
		}

		@ $mol_mem
		watch() {

			const bubble = this.Bubble().dom_node() as HTMLElement & { showPopover?: ()=> void, hidePopover?: ()=> void }
			if( !this.showed() ) {
				if( bubble.matches?.( ':popover-open' ) ) bubble.hidePopover?.()
				return null
			}

			bubble.showPopover?.()
			this.place()

			const follow = ()=> this.place()
			let tracking = requestAnimationFrame( function step() {
				follow()
				tracking = requestAnimationFrame( step )
			} )

			const outside = ( event: PointerEvent )=> {
				const target = event.target as Node
				if( bubble.contains( target ) ) return
				if( ( this.Trigger().dom_node() as HTMLElement ).contains( target ) ) return
				this.close()
			}
			document.addEventListener( 'pointerdown', outside, true )

			return {
				destructor: ()=> {
					cancelAnimationFrame( tracking )
					document.removeEventListener( 'pointerdown', outside, true )
				},
			}
		}

		auto() {
			this.watch()
			return [] as never
		}

	}

}
