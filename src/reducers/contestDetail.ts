import {
	Actions,
	ActionTypeStates,
	FETCH_CONTEST_DETAIL_FAILED,
	FETCH_CONTEST_DETAIL_PENDING,
	FETCH_CONTEST_DETAIL_SUCCESS
} from '../constants/action-types'
import { ContestRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	contest: ContestRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	contest: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_CONTEST_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_CONTEST_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_CONTEST_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, contest: action.payload}
			break
	}

	return state
}