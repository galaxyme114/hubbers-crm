import {
	Actions,
	ActionTypeStates,
	FETCH_EXPERTISE_REVIEW_FAILED,
	FETCH_EXPERTISE_REVIEW_PENDING,
	FETCH_EXPERTISE_REVIEW_SUCCESS
} from '../constants/action-types'
import { ExpertiseReviewRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	expertiseReviewlist: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	expertiseReviewlist: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EXPERTISE_REVIEW_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERTISE_REVIEW_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_EXPERTISE_REVIEW_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, expertiseReviewlist: action.payload}
			break
	}

	return state
}