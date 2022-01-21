import {
	Actions,
	ActionTypeStates,
	FETCH_EXPERTISE_DETAIL_FAILED,
	FETCH_EXPERTISE_DETAIL_PENDING,
	FETCH_EXPERTISE_DETAIL_SUCCESS,
	FETCH_PROJECTS_DETAIL_SUCCESS,
	FETCH_PROJECTS_DETAIL_PENDING,
	FETCH_PROJECTS_DETAIL_FAILED
} from '../constants/action-types'
import { ProjectRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	projectsDetail: ProjectRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	projectsDetail: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_PROJECTS_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_PROJECTS_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_PROJECTS_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, projectsDetail: action.payload}
			break
	}

	return state
}