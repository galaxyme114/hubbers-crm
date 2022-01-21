import {
	Actions,
	ActionTypeStates,
	FETCH_CONTESTS_FAILED,
	FETCH_CONTESTS_PENDING,
	FETCH_CONTESTS_SUCCESS
} from '../constants/action-types'

export interface State {
	status: ActionTypeStates
	contestsList: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	contestsList: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_CONTESTS_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_CONTESTS_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_CONTESTS_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, contestsList: action.payload}
			break
	}

	return state
}