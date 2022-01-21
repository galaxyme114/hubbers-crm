import {
	Actions,
	ActionTypeStates,
	FETCH_EXPERTISE_FAILED,
	FETCH_EXPERTISE_PENDING,
	FETCH_EXPERTISE_SUCCESS
} from '../constants/action-types'
import { ExpertiseRecord} from '../constants/models'

export interface State {
	status: ActionTypeStates
	expertiseList: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	expertiseList: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EXPERTISE_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERTISE_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_EXPERTISE_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, expertiseList: action.payload}
			break
	}

	return state
}