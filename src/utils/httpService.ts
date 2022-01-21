import axios from 'axios'

const http = axios.create()

export const rebuildHttp = () => {
	let headers = {}

	if (window.localStorage.fundator_token) {
		headers = {...headers, Authorization: 'Bearer ' + window.localStorage.fundator_token}
	}

	http.defaults.headers.common = headers
}

rebuildHttp()

export default http