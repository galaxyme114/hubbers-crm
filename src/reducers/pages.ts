import {
	Actions,
	ActionTypeStates,
	FETCH_PAGE_FAILED,
	FETCH_PAGE_PENDING,
	FETCH_PAGE_SUCCESS
} from '../constants/action-types'

export interface State {
	status: ActionTypeStates
	pagesList: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	pagesList: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_PAGE_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_PAGE_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_PAGE_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, pagesList: action.payload}
			break
	}

	return state
}