import {
	Actions,
	ActionTypeStates,
	FETCH_COMMUNITY_DETAIL_FAILED,
	FETCH_COMMUNITY_DETAIL_SUCCESS,
	FETCH_COMMUNITY_DETAIL_PENDING
} from '../constants/action-types'
import { CommunityRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	communityDetail: CommunityRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	communityDetail: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_COMMUNITY_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_COMMUNITY_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_COMMUNITY_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, communityDetail: action.payload}
			break
	}

	return state
}