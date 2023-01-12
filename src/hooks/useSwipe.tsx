import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

interface Config {
	onTouchstart?: (e: TouchEvent) => any
	onTouchmove?: (e: TouchEvent) => any
	onTouchend?: (e: TouchEvent) => any
}

export const useSwipe = (element: RefObject<HTMLElement>, config?: Config) => {
	const [direction, setDiection] = useState<'left' | 'right' | ''>('')
	const startPosition = useRef(0)

	const touchstartEvent = (e: TouchEvent) => {
		config?.onTouchstart?.(e)

		startPosition.current = e.touches[0].clientX
	}
	const touchmoveEvent = (e: TouchEvent) => {
		config?.onTouchmove?.(e)

		const currentPosition = e.touches[0].clientX
		const moved = currentPosition - startPosition.current

		if (Math.abs(moved) < 3) {
			setDiection('')
		}else if (moved < 0) {
			setDiection('left')
		}else if (moved > 0) {
			setDiection('right')
		}
	}
	const touchendEvent = (e: TouchEvent) => {
		config?.onTouchend?.(e)

		setDiection('')
	}

	useEffect(() => {
		if (element.current) {
			element.current.addEventListener('touchstart', touchstartEvent)
			element.current.addEventListener('touchmove', touchmoveEvent)
			element.current.addEventListener('touchend', touchendEvent)
		}

		return () => {
			if (element.current) {
				element.current.removeEventListener('touchstart', touchstartEvent)
				element.current.removeEventListener('touchmove', touchmoveEvent)
				element.current.removeEventListener('touchend', touchendEvent)
			}
		}
	}, [])

	// if (Math.abs(currentPosition - initalPosition) < 0)
	//   return 'left'
	// else (Math.abs(initalPosition - currentPosition) < 3)
	return direction
}
