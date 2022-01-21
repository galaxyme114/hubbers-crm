import {
	Actions,
	ActionTypeStates,
	FETCH_APPLICATIONS_FAILED,
	FETCH_APPLICATIONS_PENDING,
	FETCH_APPLICATIONS_SUCCESS
} from '../constants/action-types'

export interface State {
	status: ActionTypeStates
	applicationsList: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	applicationsList: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_APPLICATIONS_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_APPLICATIONS_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_APPLICATIONS_SUCCESS:
			if (action.payload.jury_applications) {
				action.payload.jury_applications.reverse()
			}
			if (action.payload.contestant_applications) {
				action.payload.contestant_applications.reverse()
			}

			state = {...state, status: ActionTypeStates.SUCCESS, applicationsList: action.payload}
			break
	}

	return state
}