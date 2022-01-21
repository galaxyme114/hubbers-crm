import {
	Actions,
	ActionTypeStates,
	AUTHENTICATE_USER_FAILED,
	AUTHENTICATE_USER_PENDING,
	AUTHENTICATE_USER_SUCCESS
} from '../constants/action-types'
import { UserRecord } from '../interfaces/user'

export interface State {
	status: ActionTypeStates
	user: UserRecord
	redirectTo: string
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	user: null,
	redirectTo: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case AUTHENTICATE_USER_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS, user: null}
			break
		case AUTHENTICATE_USER_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload, user: null}
			break
		case AUTHENTICATE_USER_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, ...action.payload}
			break
	}

	return state
}