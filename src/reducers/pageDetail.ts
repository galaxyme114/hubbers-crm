import {
	Actions,
	ActionTypeStates,
	FETCH_PAGE_DETAIL_FAILED,
	FETCH_PAGE_DETAIL_PENDING,
	FETCH_PAGE_DETAIL_SUCCESS
} from '../constants/action-types'
import { PageRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	pageDetail: PageRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	pageDetail: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_PAGE_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_PAGE_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_PAGE_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, pageDetail: action.payload}
			break
	}

	return state
}