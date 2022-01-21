import {
	FetchProjectsPending,
	FetchProjectsSuccess,
	FetchProjectsFailed,
	FetchProjectsDetailPending,
	FetchProjectsDetailSuccess,
	FetchProjectsDetailFailed
} from '../constants/action-types'
import {
	PROJECTS_API,
	PROJECTS_DELETE_API,
	PROJECTS_ADD_API,
	SINGLE_PROJECTS_DETAIL_API,
	PROJECTS_UPDATE_API 
} from '../constants/api'
import { ProjectRecord } from '../constants/models'

import http from '../utils/httpService'

/**
 * Fetch Projects
 */
export const fetchProjects = () => (dispatch: any) => {
	dispatch(new FetchProjectsPending().toObject())

	return doFetchProjects()
		.then((Projects: ReadonlyArray<ProjectRecord>) =>
			dispatch(new FetchProjectsSuccess(Projects).toObject()))
		.catch((error: any) => dispatch(new FetchProjectsFailed(error).toObject()))
}

/**
 * Underlying method to fetch the Projects from the API
 *
 * @returns {Promise<[ProjectRecord]>}
 */
export const doFetchProjects = (): Promise<[ProjectRecord]> => {
	return new Promise<[ProjectRecord]>((resolve: any, reject: any) => {
		return http.get(PROJECTS_API)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Fetch Projects Detail
 */
export const fetchProjectsDetail = (ProjectId: number) => (dispatch: any) => {
	dispatch(new FetchProjectsDetailPending().toObject())

	return doFetchProjectsDetail(ProjectId)
		.then((Projects: ProjectRecord) => dispatch(new FetchProjectsDetailSuccess(Projects).toObject()))
		.catch((error: any) => dispatch(new FetchProjectsDetailFailed(error).toObject()))
}

/**
 * Underlying function to fetch Projects Detail
 */
export const doFetchProjectsDetail = (ProjectId: number) => {
	return new Promise<ProjectRecord>((resolve: any, reject: any) => {
		http.get(`${SINGLE_PROJECTS_DETAIL_API}/${ProjectId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update Projects
 */
export const updateProjectsDetail = (ProjectId: number, updatedProjects: ProjectRecord) => (dispatch: any) => {
	dispatch(new FetchProjectsDetailPending().toObject())

	return doUpdateProjectsDetail(ProjectId, updatedProjects)
		.then(() => doFetchProjectsDetail(ProjectId))
		.then((response: ProjectRecord) => dispatch(new FetchProjectsDetailSuccess(response).toObject()))
		.catch((error: any) => dispatch(new FetchProjectsDetailFailed(error).toObject()))
}

/**
 * Helper function to update a single Projects
 *
 * @returns {Promise<ProjectRecord>}
 */
export const doUpdateProjectsDetail = (ProjectId: number, updatedProjects: ProjectRecord) => {
	return new Promise<ProjectRecord>((resolve: any, reject: any) => {
		http.patch(`${PROJECTS_UPDATE_API}/${ProjectId}`, updatedProjects)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to Add a single Project
 *
 * @returns {Promise<any>}
 */
export const doAddProject = (data: any) => {
	console.log(data)
	return new Promise<any>((resolve: any, reject: any) => {
		http.post(`${PROJECTS_ADD_API}`, {
			name: data.name,
			featuredImageUrl: data.featuredImageUrl,
			description: data.description,
			market: data.market,
			gallery: data.gallery,
			state: data.state,
			productCategory: data.productCategory,
			innovationCategory: data.innovationCategory,
			geography: data.geography,
			language: data.language,
			price: data.price,
			shares: data.shares,
			isDraft:  data.isVisible ? false: true
		})
		.then(response => resolve(response.data))
		.catch(error => reject(error))
	})
}

/**
 * Underlying function to delete Projects
 */
export const doRemoveProject = (ProjectId: number) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${PROJECTS_DELETE_API}/${ProjectId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}