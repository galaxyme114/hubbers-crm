import {
	Actions,
	ActionTypeStates,
	FETCH_USER_FAILED,
	FETCH_USER_PENDING,
	FETCH_USER_SUCCESS
} from '../constants/action-types'
import { UserRecord } from '../interfaces/user'

export interface State {
	status: ActionTypeStates
	usersList: UserRecord[]
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	usersList: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_USER_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_USER_SUCCESS:
			action.payload.reverse()
			state = {...state, status: ActionTypeStates.SUCCESS, usersList: action.payload}
			break
		case FETCH_USER_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}

	return state
}