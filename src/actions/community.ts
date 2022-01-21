import {
	FetchCommunityPending,
	FetchCommunitySuccess,
	FetchCommunityFailed,
	FetchCommunityDetailPending,
	FetchCommunityDetailSuccess,
	FetchCommunityDetailFailed
} from '../constants/action-types'
import {
	COMMUNITY_API,
	COMMUNITY_DELETE_API,
	COMMUNITY_ADD_API,
	SINGLE_COMMUNITY_DETAIL_API,
	COMMUNITY_UPDATE_API 
} from '../constants/api'
import { CommunityRecord } from '../constants/models'

import http from '../utils/httpService'

/**
 * Fetch community
 */
export const fetchCommunity = () => (dispatch: any) => {
	dispatch(new FetchCommunityPending().toObject())

	return doFetchCommunity()
		.then((communities: CommunityRecord) =>
			dispatch(new FetchCommunitySuccess(communities).toObject()))
		.catch((error: any) => dispatch(new FetchCommunityFailed(error).toObject()))
}

/**
 * Underlying method to fetch the community from the API
 *
 * @returns {Promise<[CommunityRecord]>}
 */
export const doFetchCommunity = (): Promise<any> => {
	return new Promise<any>((resolve: any, reject: any) => {
		return http.get(COMMUNITY_API)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Fetch community Detail
 */
export const fetchCommunityDetail = (CommunityId: any) => (dispatch: any) => {
	dispatch(new FetchCommunityDetailPending().toObject())

	return dofetchCommunityDetail(CommunityId)
		.then((community: CommunityRecord) => dispatch(new FetchCommunityDetailSuccess(community).toObject()))
		.catch((error: any) => dispatch(new FetchCommunityDetailFailed(error).toObject()))
}

/**
 * Underlying function to fetch community Detail
 */
export const dofetchCommunityDetail = (CommunityId: any) => {
	return new Promise<CommunityRecord>((resolve: any, reject: any) => {
		http.get(`${SINGLE_COMMUNITY_DETAIL_API}/${CommunityId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to fetch community Detail
 */
export const doFetchUpdateDetail = (CommunityId: any) => {
	return new Promise<CommunityRecord>((resolve: any, reject: any) => {
		http.get(`${SINGLE_COMMUNITY_DETAIL_API}/${CommunityId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update community
 */
export const updateCommunityDetail = (CommunityId: any, updatedCommunity: CommunityRecord) => (dispatch: any) => {
	dispatch(new FetchCommunityDetailPending().toObject())

	return doUpdateCommunityDetail(CommunityId, updatedCommunity)
		.then(() => doFetchUpdateDetail(CommunityId))
		.then((response: CommunityRecord) => dispatch(new FetchCommunityDetailSuccess(response).toObject()))
		.catch((error: any) => dispatch(new FetchCommunityDetailFailed(error).toObject()))
}

/**
 * Helper function to update a single community
 *
//  * @returns {Promise<CommunityRecord>}
//  */
export const doUpdateCommunityDetail = (CommunityId: any, updatedCommunity: CommunityRecord) => {
	return new Promise<CommunityRecord>((resolve: any, reject: any) => {
		http.patch(`${COMMUNITY_UPDATE_API}/${CommunityId}`, updatedCommunity)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to Add a single community
 *
 * @returns {Promise<any>}
 */
export const doAddCommunity = (data: any) => {
	console.log('payload', data)
	return new Promise<any>((resolve: any, reject: any) => {
		http.post(`${COMMUNITY_ADD_API}`, data)
		.then(response => resolve(response.data))
		.catch(error => reject(error))
	})
}
/**
 * Underlying function to delete community
 */
export const doRemoveCommunity = (CommunityId: any) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${COMMUNITY_DELETE_API}/${CommunityId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}