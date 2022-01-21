import {
	FetchPostPending,
	FetchPostSuccess,
	FetchPostFailed,
	FetchPostDetailPending,
	FetchPostDetailSuccess,
	FetchPostDetailFailed
} from '../constants/action-types'
import {
	POSTS_API,
	POSTS_DELETE_API,
	POSTS_ADD_API,
	SINGLE_POSTS_DETAIL_API,
	POSTS_UPDATE_API 
} from '../constants/api'
import { PostRecord } from '../constants/models'

import http from '../utils/httpService'

/**
 * Fetch Post
 */
export const fetchPost = () => (dispatch: any) => {
	dispatch(new FetchPostPending().toObject())

	return doFetchPost()
		.then((post: ReadonlyArray<PostRecord>) =>
			dispatch(new FetchPostSuccess(post).toObject()))
		.catch((error: any) => dispatch(new FetchPostFailed(error).toObject()))
}

/**
 * Underlying method to fetch the post from the API
 *
 * @returns {Promise<[PostRecord]>}
 */
export const doFetchPost = (): Promise<[PostRecord]> => {
	return new Promise<[PostRecord]>((resolve: any, reject: any) => {
		return http.get(POSTS_API)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Fetch Post Detail
 */
export const fetchPostDetail = (PostId: number) => (dispatch: any) => {
	dispatch(new FetchPostDetailPending().toObject())

	return doFetchPostDetail(PostId)
		.then((post: PostRecord) => dispatch(new FetchPostDetailSuccess(post).toObject()))
		.catch((error: any) => dispatch(new FetchPostDetailFailed(error).toObject()))
}

/**
 * Underlying function to fetch Post Detail
 */
export const doFetchPostDetail = (PostId: number) => {
	return new Promise<PostRecord>((resolve: any, reject: any) => {
		http.get(`${SINGLE_POSTS_DETAIL_API}/${PostId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update Post
 */
export const updatePostDetail = (PostId: number, updatedPost: PostRecord) => (dispatch: any) => {
	dispatch(new FetchPostDetailPending().toObject())

	return doUpdatePostDetail(PostId, updatedPost)
		.then(() => doFetchPostDetail(PostId))
		.then((response: PostRecord) => dispatch(new FetchPostDetailSuccess(response).toObject()))
		.catch((error: any) => dispatch(new FetchPostDetailFailed(error).toObject()))
}

/**
 * Helper function to update a single Post
 *
 * @returns {Promise<PostRecord>}
 */
export const doUpdatePostDetail = (PostId: number, updatedPost: PostRecord) => {
	return new Promise<PostRecord>((resolve: any, reject: any) => {
		http.patch(`${POSTS_UPDATE_API}/${PostId}`, updatedPost)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to Add a single post
 *
 * @returns {Promise<any>}
 */
export const doAddpost = (data: any) => {
	console.log(data)
	return new Promise<any>((resolve: any, reject: any) => {
		http.post(`${POSTS_ADD_API}`, {
			body: data.body,
			gallery: data.gallery
		})
		.then(response => resolve(response.data))
		.catch(error => reject(error))
	})
}

/**
 * Underlying function to delete Post
 */
export const doRemovePost = (PostId: number) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${POSTS_DELETE_API}/${PostId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}