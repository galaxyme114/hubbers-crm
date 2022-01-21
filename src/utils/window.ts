export const openPopupCenter = (url: string, title: string, w: number, h: number, redirect?: string) => {
	return new Promise((resolve, reject) => {
		// Fixes dual-screen position                         Most browsers      Firefox
		const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
		const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

		const width = window.innerWidth ?
			window.innerWidth : document.documentElement.clientWidth ?
				document.documentElement.clientWidth : screen.width
		const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ?
			document.documentElement.clientHeight : screen.height

		const left = ((width / 2) - (w / 2)) + dualScreenLeft
		const top = ((height / 2) - (h / 2)) + dualScreenTop
		const newWindow = window.open(url, title,
			'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

		// Puts focus on the newWindow
		if (window.focus) {
			newWindow.focus()
		}

		if (redirect) {
			let i = 0
			const popupInterval = setInterval(() => {
				if (newWindow.location.href.indexOf(redirect) !== -1) {
					clearInterval(popupInterval)
					newWindow.close()
					resolve(newWindow.location.href)
				}

				if (i >= 1800) {
					clearInterval(popupInterval)
					newWindow.close()
					reject()
				}

				i++
			}, 100)
		}
	})
}