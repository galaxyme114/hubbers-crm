import {
	Actions,
	ActionTypeStates,
	FETCH_ENTRIES_FAILED,
	FETCH_ENTRIES_PENDING,
	FETCH_ENTRIES_SUCCESS
} from '../constants/action-types'

export interface State {
	status: ActionTypeStates
	entrieDetail: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	entrieDetail: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_ENTRIES_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_ENTRIES_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_ENTRIES_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, entrieDetail: action.payload}
			break
	}

	return state
}