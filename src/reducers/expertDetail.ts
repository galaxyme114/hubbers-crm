import {
	Actions,
	ActionTypeStates,
	FETCH_EXPERT_DETAIL_FAILED,
	FETCH_EXPERT_DETAIL_PENDING,
	FETCH_EXPERT_DETAIL_SUCCESS
} from '../constants/action-types'
import { ExpertRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	expert: ExpertRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	expert: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EXPERT_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERT_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_EXPERT_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, expert: action.payload}
			break
	}

	return state
}