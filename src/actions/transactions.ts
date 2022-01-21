import http from '../utils/httpService'

import {
	FetchTransactionDetailFailed,
	FetchTransactionDetailPending,
	FetchTransactionDetailSuccess
} from '../constants/action-types'
import { USER_TRANSACTIONS_API } from '../constants/api'
import { TransactionRecord } from '../constants/models'

/**
 * Fetch User Transactions
 */
export const fetchTransactionDetail = (transactionId: string) => (dispatch: any) => {
	dispatch(new FetchTransactionDetailPending().toObject())
	
	return doFetchTransactionDetail(transactionId)
		.then((transaction: TransactionRecord) => dispatch(new FetchTransactionDetailSuccess(transaction).toObject()))
		.catch((error: any) => dispatch(new FetchTransactionDetailFailed(error).toObject()))
}

/**
 * Underlying function to Fetch User Transactions
 */
export const doFetchTransactionDetail = (transactionId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.get(`${USER_TRANSACTIONS_API}/${transactionId}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to Update User Transactions
 */
export const doUpdateTransactionDetail = (transactionId: string, updatedTransaction: TransactionRecord) => {
	return new Promise((resolve: any, reject: any) => {
		http.patch(`${USER_TRANSACTIONS_API}/${transactionId}`, updatedTransaction)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}
