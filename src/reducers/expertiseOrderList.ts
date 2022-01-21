import {
	Actions,
	ActionTypeStates,
	FETCH_EXPERTISE_ORDER_SUCCESS,
	FETCH_EXPERTISE_ORDER_PENDING,
	FETCH_EXPERTISE_ORDER_FAILED
} from '../constants/action-types'
import { ExpertiseOrderRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	expertiseOrderList: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	expertiseOrderList: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EXPERTISE_ORDER_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERTISE_ORDER_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_EXPERTISE_ORDER_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, expertiseOrderList:  action.payload}
			break
	}

	return state
}