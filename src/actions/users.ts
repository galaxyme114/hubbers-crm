import { AuthenticateUserSuccess, FetchUserFailed, FetchUserPending, FetchUserSuccess } from '../constants/action-types'
import { USER_ACTIVITY_API, USERS_API } from '../constants/api'
import { UserRecord } from '../interfaces/user'
import http from '../utils/httpService'
import { doAuthenticate } from './authenticate'

/**
 * Fetch users
 */
export const fetchUsers = () => (dispatch: any) => {
	dispatch(new FetchUserPending().toObject())

	return doFetchUsers()
		.then((users: UserRecord[]) => dispatch(new FetchUserSuccess(users).toObject()))
		.catch((error: any) => dispatch(new FetchUserFailed(error).toObject()))
}

/**
 * Helper function to fetch a list of users
 *
 * @returns {Promise<ReadonlyArray<UserRecord>>}
 */
const doFetchUsers = () => {
	return new Promise<UserRecord[]>((resolve: any, reject: any) => {
		return http.get(USERS_API)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch User Detail
 */
export const fetchUser = (userId: number) => (dispatch: any) => {
	dispatch(new FetchUserPending().toObject())

	return doFetchUser(userId)
		.then((user: UserRecord[]) => dispatch(new FetchUserSuccess(user).toObject()))
		.catch((error: any) => dispatch(new FetchUserFailed(error).toObject()))
}

/**
 * Underlying function to fetch User Detail
 */
export const doFetchUser = (userId: number) => {
	return new Promise((resolve: any, reject: any) => {
		http.get(`${USERS_API}/${userId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update User
 */
export const updateUser = (user: UserRecord) => (dispatch: any) => {
	return doUpdateUser(user)
		.then((users: UserRecord[]) => dispatch(new FetchUserSuccess(users).toObject()))
		.then(() => doAuthenticate())
		.then((users: UserRecord[]) => dispatch(new AuthenticateUserSuccess({users}).toObject()))
}

/**
 * Underlying function to Update User
 */
export const doUpdateUser = (user: UserRecord) => {
	return new Promise<UserRecord[]>((resolve: any, reject: any) => {
		http.put(USERS_API, user)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}
/**
 * Underlying function to fetch User Detail
 */
export const doRemoveUser = (userId: number) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${USERS_API}/${userId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to fetch User Activities
 */
export const fetchActivities = (userId: number) => {
	return new Promise((resolve: any, reject: any) => {
		http.get(`${USER_ACTIVITY_API}/${userId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}