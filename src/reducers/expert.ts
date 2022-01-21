import {
	Actions,
	ActionTypeStates,
	FETCH_EXPERT_FAILED,
	FETCH_EXPERT_PENDING,
	FETCH_EXPERT_SUCCESS
} from '../constants/action-types'
import { ExpertRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	expertList: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	expertList: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EXPERT_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERT_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_EXPERT_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, expertList: action.payload}
			break
	}

	return state
}