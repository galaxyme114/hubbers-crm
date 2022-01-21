import axios from 'axios'

import { AuthenticateUserFailed, AuthenticateUserPending, AuthenticateUserSuccess } from '../constants/action-types'
import { AUTHENTICATE_API, LOGIN_API } from '../constants/api'
import { UserRecord } from '../interfaces/user'
import { rebuildHttp } from '../utils/httpService'

/**
 * Authenticate the user
 */
export const authenticateUser = (redirectTo?: string) => (dispatch: any) => {
	dispatch(new AuthenticateUserPending().toObject())

	return doAuthenticate()
		.then((user: UserRecord) => dispatch(new AuthenticateUserSuccess({user, redirectTo}).toObject()))
		.then(() => {
			if (redirectTo) {
				window.location.href = redirectTo
			}
		})
		.catch((error: any) => {
			doLogoutUser().then(() => dispatch(new AuthenticateUserFailed(error).toObject()))
		})
}

/**
 * Helper function to retrieve the user data after authenticating using the token from local storage
 *
 * @returns {Promise<any>}
 */
export const doAuthenticate = () => {
	return new Promise((resolve: any, reject: any) => {
		const token = window.localStorage.fundator_token

		if (!token || token === 'undefined') {
			reject()
		} else {
			axios.get(AUTHENTICATE_API, {params: {token}})
				.then(response => {
					if (response.data.message) {
						reject(response)
					} else {
						resolve(response.data)
					}
				}).catch(error => reject(error))
		}
	})
}

/**
 * Login user
 *
 */
export const loginUser = (email: string, password: string, redirectTo?: string) => (dispatch: any) => {
	return doLoginUser(email, password)
		.then(() => dispatch(authenticateUser(redirectTo)))
}

/**
 * Helper function to login user
 *
 * @returns {Promise<any>}
 */
const doLoginUser = (email: string, password: string) => {
	return new Promise((resolve: any, reject: any) => {
		axios.post(LOGIN_API, {email, password})
			.then(response => {
				const token = response.data.token
				window.localStorage.fundator_token = token
				rebuildHttp()
				resolve(token)
			})
			.catch(error => reject(error))
	})
}

/**
 * Logout user
 *
 */
export const logoutUser = (redirectTo?: string) => (dispatch: any) => {
	return doLogoutUser()
		.then(() => dispatch(authenticateUser(redirectTo)))
}

/**
 * Helper function to login user
 *
 * @returns {Promise<any>}
 */
const doLogoutUser = () => {
	return new Promise((resolve: any) => {
		window.localStorage.removeItem('fundator_token')
		resolve()
	})
}
