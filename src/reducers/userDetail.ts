import {
	Actions,
	ActionTypeStates,
	FETCH_USER_DETAIL_FAILED,
	FETCH_USER_DETAIL_PENDING,
	FETCH_USER_DETAIL_SUCCESS
} from '../constants/action-types'
import { ProfileRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	user: ProfileRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	user: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_USER_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_USER_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, user: action.payload}
			break
		case FETCH_USER_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}

	return state
}