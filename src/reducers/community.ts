import {
	Actions,
	ActionTypeStates,
	FETCH_COMMUNITY_FAILED,
	FETCH_COMMUNITY_PENDING,
	FETCH_COMMUNITY_SUCCESS
} from '../constants/action-types'
import { CommunityRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	communitylist: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	communitylist: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_COMMUNITY_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_COMMUNITY_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_COMMUNITY_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, communitylist: action.payload}
			break
	}

	return state
}