import {
	FetchUserActivitiesFailed,
	FetchUserActivitiesPending,
	FetchUserActivitiesSuccess,
	FetchUserDetailFailed,
	FetchUserDetailPending,
	FetchUserDetailSuccess,
	FetchUserFailed,
	FetchUserPending,
	FetchUserSuccess, FetchUserTransactionsFailed, FetchUserTransactionsPending, FetchUserTransactionsSuccess,
	UpdateUserDetailFailed,
	UpdateUserDetailPending,
	UpdateUserDetailSuccess
} from '../constants/action-types'
import {
	USER_ACTIVITY_API,
	USER_TRANSACTIONS_API,
	USERS_API
} from '../constants/api'
import { ProfileRecord, TransactionRecord } from '../constants/models'
import { UserRecord } from '../interfaces/user'
import http from '../utils/httpService'

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
 * @returns {Promise<UserRecord[]>}
 */
export const doFetchUsers = () => {
	return new Promise<UserRecord[]>((resolve: any, reject: any) => {
		return http.get(USERS_API)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch User Detail
 */
export const fetchUserDetail = (userId: string) => (dispatch: any) => {
	dispatch(new FetchUserDetailPending().toObject())

	return doFetchUserDetail(userId)
		.then((user: ProfileRecord) => dispatch(new FetchUserDetailSuccess(user).toObject()))
		.catch((error: any) => dispatch(new FetchUserDetailFailed(error).toObject()))
}

/**
 * Underlying function to fetch User Detail
 */
export const doFetchUserDetail = (userId: string) => {
	return new Promise<ProfileRecord>((resolve: any, reject: any) => {
		http.get(`${USERS_API}/${userId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

// /**
//  * Update User
//  */
// export const updateUserDetail = (userId: string, userData: UserRecord) => (dispatch: any) => {
// 	dispatch(new UpdateUserDetailPending().toObject())
//
// 	return doUpdateUserDetail(userId, userData)
// 		.then((response: ProfileRecord) => dispatch(new UpdateUserDetailSuccess(response).toObject()))
// 		.catch((error: any) => dispatch(new UpdateUserDetailFailed(error).toObject()))
// }

/**
 * Helper function to update a single User
 *
 * @returns {Promise<UserRecord>}
 */
export const doUpdateUserDetail = (userId: string, userData: UserRecord) => {
	return new Promise<UserRecord>((resolve: any, reject: any) => {
		http.patch(`${USERS_API}/${userId}`, userData)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to fetch User Detail
 */
export const doRemoveUser = (userId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${USERS_API}/${userId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * fetch User Activities
 */
export const fetchActivities = (userId: number) => (dispatch: any) => {
	dispatch(new FetchUserActivitiesPending().toObject())

	return doFetchActivities(userId)
		.then((userActivities: any) => dispatch(new FetchUserActivitiesSuccess(userActivities).toObject()))
		.catch((error: any) => dispatch(new FetchUserActivitiesFailed(error).toObject()))
}
/**
 * Underlying function to fetch User Activities
 */
export const doFetchActivities = (userId: number) => {
	return new Promise((resolve: any, reject: any) => {
		http.get(`${USER_ACTIVITY_API}/${userId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch User Transactions
 */
export const fetchUserTransactions = (userId: string) => (dispatch: any) => {
	dispatch(new FetchUserTransactionsPending().toObject())
	
	return doFetchUserTransactions(userId)
		.then((userTransactions: TransactionRecord[]) =>
			dispatch(new FetchUserTransactionsSuccess(userTransactions).toObject()))
		.catch((error: any) => dispatch(new FetchUserTransactionsFailed(error).toObject()))
}

/**
 * Underlying function to Fetch User Transactions
 */
export const doFetchUserTransactions = (userId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.get(`${USER_TRANSACTIONS_API}/user/${userId}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to Fetch User Transactions
 */
export const doAddUserTransactions = (userId: string, txData: TransactionRecord) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(`${USER_TRANSACTIONS_API}/user/${userId}`, txData)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}