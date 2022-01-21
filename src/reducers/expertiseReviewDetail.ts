import {
	Actions,
	ActionTypeStates,
	FETCH_EXPERTISE_REVIEW_DETAIL_FAILED,
	FETCH_EXPERTISE_REVIEW_DETAIL_PENDING,
	FETCH_EXPERTISE_REVIEW_DETAIL_SUCCESS
} from '../constants/action-types'
import { ExpertiseReviewRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	expertiseReview: ExpertiseReviewRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	expertiseReview: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EXPERTISE_REVIEW_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERTISE_REVIEW_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_EXPERTISE_REVIEW_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, expertiseReview: action.payload}
			break
	}

	return state
}