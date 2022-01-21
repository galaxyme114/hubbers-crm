import {
	Actions,
	ActionTypeStates,
	FETCH_POST_DETAIL_FAILED,
	FETCH_POST_DETAIL_SUCCESS,
	FETCH_POST_DETAIL_PENDING
} from '../constants/action-types'
import { PostRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	postDetail: PostRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	postDetail: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_POST_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_POST_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_POST_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, postDetail: action.payload}
			break
	}

	return state
}