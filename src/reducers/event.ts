import {
	Actions,
	ActionTypeStates,
	FETCH_EVENT_FAILED,
	FETCH_EVENT_PENDING,
	FETCH_EVENT_SUCCESS
} from '../constants/action-types'

export interface State {
	status: ActionTypeStates
	eventsList: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	eventsList: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EVENT_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EVENT_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_EVENT_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, eventsList: action.payload}
			break
	}

	return state
}