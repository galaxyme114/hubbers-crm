import {
	Actions,
	ActionTypeStates,
	FETCH_EXPERTISE_DETAIL_FAILED,
	FETCH_EXPERTISE_DETAIL_PENDING,
	FETCH_EXPERTISE_DETAIL_SUCCESS
} from '../constants/action-types'
import { ExpertiseRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	expertise: ExpertiseRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	expertise: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EXPERTISE_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERTISE_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_EXPERTISE_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, expertise: action.payload}
			break
	}

	return state
}