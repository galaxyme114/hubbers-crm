/**
 * Smooth scroll helper class
 */

interface SmoothScrollSettings {
	duration: number
	easing: {
		outQuint: any
	}
}

export default class SmoothScroll {
	private timer: any
	private settings: SmoothScrollSettings

	public constructor(duration?: number) {
		this.timer = null
		this.settings = {
			duration: duration || 1000,
			easing: {
				outQuint: (x: any, t: any, b: any, c: any, d: any) => (c * ((t = t / d - 1) * t * t * t * t + 1) + b)
			}
		}
	}

	public scrollTo(id: string, topOffset?: number) {
		return new Promise((resolve: any) => {
			let percentage
			let startTime: any
			const node = document.getElementById(id)
			const nodeTop = node.offsetTop - (topOffset ? topOffset : 0)
			const nodeHeight = node.offsetHeight
			const body = document.body
			const html = document.documentElement
			const height = Math.max(
				body.scrollHeight,
				body.offsetHeight,
				html.clientHeight,
				html.scrollHeight,
				html.offsetHeight
			)
			const windowHeight = window.innerHeight
			const offset = window.pageYOffset
			const delta = nodeTop - offset
			const bottomScrollableY = height - windowHeight
			const targetY = (bottomScrollableY < delta) ?
				bottomScrollableY - (height - nodeTop - nodeHeight + offset) :
				delta

			startTime = Date.now()
			percentage = 0

			if (this.timer) {
				clearInterval(this.timer)
			}

			const step = () => {
				let yScroll
				const elapsed = Date.now() - startTime

				if (elapsed > this.settings.duration) {
					clearTimeout(this.timer)
				}

				percentage = elapsed / this.settings.duration

				if (percentage > 1) {
					clearTimeout(this.timer)
					resolve()
				} else {
					yScroll = this.settings.easing.outQuint(0, elapsed, offset, targetY, this.settings.duration)
					window.scrollTo(0, yScroll)
					this.timer = setTimeout(step, 10)
				}
			}

			this.timer = setTimeout(step, 10)
		})
	}

	public stop() {
		clearTimeout(this.timer)
	}
}