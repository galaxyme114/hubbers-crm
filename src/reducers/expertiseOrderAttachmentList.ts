import {
	Actions,
	ActionTypeStates,
	FETCH_EXPERTISE_ORDER_ATTACHMENT_SUCCESS,
	FETCH_EXPERTISE_ORDER_ATTACHMENT_PENDING,
	FETCH_EXPERTISE_ORDER_ATTACHMENT_FAILED
} from '../constants/action-types'
import { ExpertiseOrderRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	orderAttachmentList: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	orderAttachmentList: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EXPERTISE_ORDER_ATTACHMENT_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERTISE_ORDER_ATTACHMENT_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_EXPERTISE_ORDER_ATTACHMENT_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, orderAttachmentList:  action.payload}
			break
	}

	return state
}