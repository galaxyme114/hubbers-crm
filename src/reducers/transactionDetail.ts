import {
	Actions,
	ActionTypeStates,
	FETCH_TRANSACTION_DETAIL_FAILED,
	FETCH_TRANSACTION_DETAIL_PENDING,
	FETCH_TRANSACTION_DETAIL_SUCCESS
} from '../constants/action-types'
import { TransactionRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	transaction: TransactionRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	transaction: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_TRANSACTION_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_TRANSACTION_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_TRANSACTION_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, transaction: action.payload}
			break
	}
	
	return state
}