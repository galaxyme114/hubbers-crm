import {
	Actions,
	ActionTypeStates,
	FETCH_POST_FAILED,
	FETCH_POST_PENDING,
	FETCH_POST_SUCCESS
} from '../constants/action-types'
import { PostRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	postlist: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	postlist: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_POST_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_POST_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_POST_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, postlist: action.payload}
			break
	}

	return state
}