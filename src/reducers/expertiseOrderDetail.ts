import {
	Actions,
	ActionTypeStates,
	FETCH_EXPERTISE_ORDER_DETAIL_FAILED,
	FETCH_EXPERTISE_ORDER_DETAIL_PENDING,
	FETCH_EXPERTISE_ORDER_DETAIL_SUCCESS
} from '../constants/action-types'
import { ExpertiseOrderRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	expertiseOrder: ExpertiseOrderRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	expertiseOrder: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EXPERTISE_ORDER_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERTISE_ORDER_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_EXPERTISE_ORDER_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, expertiseOrder: action.payload}
			break
	}

	return state
}