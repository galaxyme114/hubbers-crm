import {
	CreatePageFailed,
	CreatePagePending,
	CreatePageSuccess,
	FetchPageDetailFailed,
	FetchPageDetailPending,
	FetchPageDetailSuccess,
	FetchPageFailed,
	FetchPagePending,
	FetchPageSuccess,
	PageUpdateFailed,
	PageUpdatePending,
	PageUpdateSuccess
} from '../constants/action-types'
import { PAGE_ADD_API, PAGE_DELETE_API, PAGE_DETAIL_API, PAGE_UPDATE_API, PAGES_API } from '../constants/api'
import { PageRecord } from '../constants/models'

import http from '../utils/httpService'

/**
 * Fetch the Pages and dispatch the data
 *
 */
export const fetchPages = () => (dispatch: any) => {
	dispatch(new FetchPagePending().toObject())

	return doFetchPages()
		.then((pages: PageRecord) =>
			dispatch(new FetchPageSuccess(pages).toObject()))
		.catch((error: any) => dispatch(new FetchPageFailed(error).toObject()))
}

/**
 * Underlying method to fetch the Pages from the API
 *
 * @returns {Promise<[ContestRecord]>}
 */
export const doFetchPages = (): Promise<any> => {
	return new Promise<any>((resolve: any, reject: any) => {
		return http.get(PAGES_API)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Fetch the page detail and dispatch the data
 *
 */
export const fetchPageDetail = (pageId: number) => (dispatch: any) => {
	dispatch(new FetchPageDetailPending().toObject())

	return doFetchPageDetail(pageId)
		.then((page: PageRecord) =>
			dispatch(new FetchPageDetailSuccess(page).toObject()))
		.catch((error: any) => dispatch(new FetchPageDetailFailed(error).toObject()))
}

/**
 * Underlying method to fetch the page detail from the API
 *
 * @returns {Promise<[ContestRecord]>}
 */
export const doFetchPageDetail = (pageId: number) => {
	return new Promise<PageRecord>((resolve: any, reject: any) => {
		http.get(`${PAGE_DETAIL_API}/${pageId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}
/**
 * Fetch the page update and dispatch the data
 *
 */
export const PageUpdate = (data: any) => (dispatch: any) => {
	console.log(data)
	dispatch(new PageUpdatePending().toObject())

	return doPageUpdate(data)
		.then((page: PageRecord) =>
			dispatch(new PageUpdateSuccess(page).toObject()))
		.catch((error: any) => dispatch(new PageUpdateFailed(error).toObject()))
}

/**
 * Underlying method to fetch the page update from the API
 *
 * @returns {Promise<[ContestRecord]>}
 */
export const doPageUpdate = (data: any) => {
	return new Promise<PageRecord>((resolve: any, reject: any) => {
		http.put(PAGE_UPDATE_API, {id: data.id, title: data.title, slug: data.slug, content: data.content})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to page delete
 */
export const doPageDelete = (pageId: number) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${PAGE_DELETE_API}/${pageId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}
/**
 * Fetch the page update and dispatch the data
 *
 */
export const CreatePage = (data: any) => (dispatch: any) => {
	console.log(data)
	dispatch(new CreatePagePending().toObject())
	return doPageAdd(data)
		.then((page: PageRecord) =>
			dispatch(new CreatePageSuccess(page).toObject()))
		.catch((error: any) => dispatch(new CreatePageFailed(error).toObject()))
}

/**
 * Underlying method to page add from the API
 *
 * @returns {Promise<[ContestRecord]>}
 */
export const doPageAdd = (data: any) => {
	console.log(data)
	return new Promise<PageRecord>((resolve: any, reject: any) => {
		http.post(PAGE_ADD_API, {title: data.title, slug: data.slug, content: data.content})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}