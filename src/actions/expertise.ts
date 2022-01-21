import {
	FetchExpertiseFailed,
	FetchExpertisePending,
	FetchExpertiseSuccess,
	FetchExpertiseDetailFailed,
	FetchExpertiseDetailPending,
	FetchExpertiseDetailSuccess,
	FetchExpertiseOrderPending,
	FetchExpertiseOrderSuccess,
	FetchExpertiseOrderFailed,
	FetchExpertiseOrderDetailPending,
	FetchExpertiseOrderDetailSuccess,
	FetchExpertiseOrderDetailFailed,
	FetchProjectsPending,
	FetchProjectsSuccess,
	FetchProjectsFailed,
	FetchExpertiseReviewPending,
	FetchExpertiseReviewSuccess,
	FetchExpertiseReviewFailed,
	FetchExpertiseReviewDetailPending,
	FetchExpertiseReviewDetailSuccess,
	FetchExpertiseReviewDetailFailed,
	FetchExpertiseOrderAttachmentPending,
	FetchExpertiseOrderAttachmentSuccess,
	FetchExpertiseOrderAttachmentFailed
} from '../constants/action-types'
import {
	EXPERTISE_API,
	EXPERTISE_ADD_API,
	EXPERTISE_SINGLE_DETAIL_API,
	EXPERTISE_UPDATE_API,
	EXPERTISE_CATEGORY_LIST_API,
	EXPERTISE_DELETE_API,
	SKILLS_API,
	EXPERTISE_ORDERLIST_API,
	EXPERTISE_ORDER_SINGLE_DETAIL_API,
	EXPERTISE_ORDER_UPDATE_API,
	EXPERTISE_ORDER_DELETE_API,
	PROJECTS_API,
	EXPERTISE_REVIEW_API,
	EXPERTISE_REVIEW_SINGLE_DETAIL_API,
	EXPERTISE_REVIEW_ADD_API,
	EXPERTISE_REVIEW_UPDATE_API,
	EXPERTISE_REVIEW_DELETE_API,
	EXPERTISE_ORDER_ATTACHMENT_LIST,
	EXPERTISE_ORDER_ADD_ATTACHMENT,
	EXPERTISE_ORDER_UPDATE_ATTACHMENT
} from '../constants/api'
import { ExpertiseRecord, SkillRecord , ExpertiseOrderRecord, ProjectRecord, ExpertiseReviewRecord} from '../constants/models'

import http from '../utils/httpService'

/**
 * Fetch the Expertise and dispatch the data
 *
 */
export const fetchExpertise = () => (dispatch: any) => {
	dispatch(new FetchExpertisePending().toObject())

	return doFetchExpertise()
		.then((expertise: ReadonlyArray<ExpertiseRecord>) =>
			dispatch(new FetchExpertiseSuccess(expertise).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseFailed(error).toObject()))
}

/**
 * Underlying method to fetch the Expertise from the API
 *
 * @returns {Promise<[ExpertiseRecord]>}
 */
export const doFetchExpertise = (): Promise<[ExpertiseRecord]> => {
	return new Promise<[ExpertiseRecord]>((resolve: any, reject: any) => {
		return http.get(EXPERTISE_API)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Fetch Expertise Order
 */
export const fetchExpertiseOrderList = (expertiseId: number) => (dispatch: any) => {
	dispatch(new FetchExpertiseOrderPending().toObject())

	return doFetchExpertiseOrderList(expertiseId)
		.then((expertiseorder: ReadonlyArray<ExpertiseOrderRecord>) => 
			dispatch(new FetchExpertiseOrderSuccess(expertiseorder).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseOrderFailed(error).toObject()))
}

/**
 * @returns {Promise<[ExpertiseOrderRecord]>}
 */
export const doFetchExpertiseOrderList = (expertiseId: number): Promise<[ExpertiseOrderRecord]> => {
	return new Promise<[ExpertiseOrderRecord]>((resolve: any, reject: any) => {
		http.get(`${EXPERTISE_ORDERLIST_API}/${expertiseId}/orders`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch Expertise Order attachment
 */
export const fetchExpertiseOrderAttachmentList = (orderId: number) => (dispatch: any) => {
	dispatch(new FetchExpertiseOrderAttachmentPending().toObject())

	return doFetchExpertiseOrderAttachmentList(orderId)
		.then((expertiseorder: ReadonlyArray<ExpertiseOrderRecord>) => 
			dispatch(new FetchExpertiseOrderAttachmentSuccess(expertiseorder).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseOrderAttachmentFailed(error).toObject()))
}

/**
 * @returns {Promise<[ExpertiseOrderRecord]>}
 */
export const doFetchExpertiseOrderAttachmentList = (orderId: number): Promise<[ExpertiseOrderRecord]> => {
	return new Promise<[ExpertiseOrderRecord]>((resolve: any, reject: any) => {
		http.get(`${EXPERTISE_ORDER_ATTACHMENT_LIST}/${orderId}/attachments`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch Expertise Review
 */
export const fetchExpertiseReviewList = (expertiseId: number) => (dispatch: any) => {
	dispatch(new FetchExpertiseReviewPending().toObject())

	return doFetchExpertiseReviewList(expertiseId)
		.then((expertiseReview: ReadonlyArray<ExpertiseReviewRecord>) => 
			dispatch(new FetchExpertiseReviewSuccess(expertiseReview).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseReviewFailed(error).toObject()))
}

/**
 * @returns {Promise<[ExpertiseReviewRecord]>}
 */
export const doFetchExpertiseReviewList = (expertiseId: number): Promise<[ExpertiseReviewRecord]> => {
	return new Promise<[ExpertiseReviewRecord]>((resolve: any, reject: any) => {
		http.get(`${EXPERTISE_REVIEW_API}/${expertiseId}/reviews`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch Expertise Detail
 */
export const fetchExpertiseDetail = (expertiseId: number) => (dispatch: any) => {
	dispatch(new FetchExpertiseDetailPending().toObject())

	return doFetchExpertiseDetail(expertiseId)
		.then((expertise: ExpertiseRecord) => dispatch(new FetchExpertiseDetailSuccess(expertise).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseDetailFailed(error).toObject()))
}

/**
 * Underlying function to fetch Expertise Detail
 */
export const doFetchExpertiseDetail = (expertiseId: number) => {
	return new Promise<ExpertiseRecord>((resolve: any, reject: any) => {
		http.get(`${EXPERTISE_SINGLE_DETAIL_API}/${expertiseId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch Expertise Order Detail
 */
export const fetchExpertiseOrderDetail = (expertiseId: number, orderId:string) => (dispatch: any) => {
	dispatch(new FetchExpertiseOrderDetailPending().toObject())

	return doFetchExpertiseOrderDetail(expertiseId, orderId)
		.then((expertiseorder: ExpertiseOrderRecord) => dispatch(new FetchExpertiseOrderDetailSuccess(expertiseorder).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseOrderDetailFailed(error).toObject()))
}

/**
 * Underlying function to fetch Expertise Order Detail
 */
export const doFetchExpertiseOrderDetail = (expertiseId: number, orderId:string) => {
	return new Promise<ExpertiseOrderRecord>((resolve: any, reject: any) => {
		http.get(`${EXPERTISE_ORDER_SINGLE_DETAIL_API}/${expertiseId}/orders/${orderId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch Expertise Review Detail
 */
export const fetchExpertiseReviewDetail = (expertiseId: number, ReviewId:string) => (dispatch: any) => {
	dispatch(new FetchExpertiseReviewDetailPending().toObject())

	return doFetchExpertiseReviewDetail(expertiseId, ReviewId)
		.then((expertiseReview: ExpertiseReviewRecord) => dispatch(new FetchExpertiseReviewDetailSuccess(expertiseReview).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseReviewDetailFailed(error).toObject()))
}

/**
 * Underlying function to fetch Expertise Review Detail
 */
export const doFetchExpertiseReviewDetail = (expertiseId: number, ReviewId:string) => {
	return new Promise<ExpertiseReviewRecord>((resolve: any, reject: any) => {
		http.get(`${EXPERTISE_REVIEW_SINGLE_DETAIL_API}/${expertiseId}/reviews/${ReviewId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

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
 * Underlying method to fetch the Expertise from the API
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
 * Helper function to fetch category
 *
 * @returns {Promise<any>}
 */
export const doGetExpertiseCategory = () => {
    return new Promise<any>((resolve, reject) => {
        http.get(`${EXPERTISE_CATEGORY_LIST_API}`)
            .then(response => response.data)
            .then(categories => {
                categories.map((c: any) => {
                    c.id = c._id
                    return c
                })
                resolve({ options: categories })
            })
            .catch(error => reject(error))
    })
}

/**
 * Helper function to fetch all skills
 *
 * @returns {Promise<any>}
 */
export const doGetSkills = () => {
    return new Promise<any>((resolve, reject) => {
        http.get(`${SKILLS_API}`)
            .then(response => response.data)
            .then((skills: ReadonlyArray<SkillRecord>) => { resolve({ options: skills }) })
            .catch(error => reject(error))
    })
}

/**
 * Helper function to Add a single Expertise
 *
 * @returns {Promise<any>}
 */
export const doAddExpertise = (data: any) => {
	console.log(data)
	return new Promise<any>((resolve: any, reject: any) => {
		http.post(`${EXPERTISE_ADD_API}`, {
			name: data.name,
			slug: data.slug,
			about: data.about,
		    featuredImageUrl: data.featuredImageUrl,
			tags: data.tags,
			gallery: data.gallery,
			packages: data.packages,
		    faq: data.faq,
		    category: data.category,
		    rating: data.rating,
		    expert: data.expert,
		    briefTemplate: data.briefTemplate,
			isDraft: data.isDraft,
		})
		.then(response => resolve(response.data))
		.catch(error => reject(error))
	})
}

/**
 * Helper function to Add a single Expertise Review
 *
 * @returns {Promise<any>}
 */
export const doAddExpertiseReview = (ExpertiseId: string, data: any) => {
	console.log(data)
	return new Promise<any>((resolve: any, reject: any) => {
		http.put(`${EXPERTISE_REVIEW_ADD_API}/${ExpertiseId}/reviews`, {
			rating: data.rating,
			body: data.body
		})
		.then(response => resolve(response.data))
		.catch(error => reject(error))
	})
}

/**
 * Helper function to Add a single Expertise Attachment
 *
 * @returns {Promise<any>}
 */
export const doAddExpertiseAttachment = (orderId: string, data: any) => {
	console.log(data)
	return new Promise<any>((resolve: any, reject: any) => {
		http.put(`${EXPERTISE_ORDER_ADD_ATTACHMENT}/${orderId}/attachments`, {
			attachments: [{
				title: data.title,
				caption: data.caption,
				previewUrl: data.previewUrl,
				fileType:data.fileType
			}]
		})
		.then(response => resolve(response.data))
		.catch(error => reject(error))
	})
}

/**
 * Update Expertise
 */
export const updateExpertiseDetail = (expertiseId: number, updatedExpertise: ExpertiseRecord, shortId:number) => (dispatch: any) => {
	dispatch(new FetchExpertiseDetailPending().toObject())

	return doUpdateExpertiseDetail(expertiseId, updatedExpertise)
		.then(() => doFetchExpertiseDetail(shortId))
		.then((response: ExpertiseRecord) => dispatch(new FetchExpertiseDetailSuccess(response).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseDetailFailed(error).toObject()))
}

/**
 * Helper function to update a single Expertise
 *
 * @returns {Promise<ExpertiseRecord>}
 */
export const doUpdateExpertiseDetail = (expertiseId: number, updatedExpertise: ExpertiseRecord) => {
	return new Promise<ExpertiseRecord>((resolve: any, reject: any) => {
		http.patch(`${EXPERTISE_UPDATE_API}/${expertiseId}`, updatedExpertise)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update Expertise order
 */
export const updateExpertiseOrderDetail = (expertiseId: number, orderId: string, updatedExpertiseOrder: ExpertiseOrderRecord) => (dispatch: any) => {
	dispatch(new FetchExpertiseOrderDetailPending().toObject())

	return doUpdateExpertiseOrderDetail(expertiseId, orderId, updatedExpertiseOrder)
		.then(() => doFetchExpertiseOrderDetail(expertiseId, orderId))
		.then((response: ExpertiseOrderRecord) => dispatch(new FetchExpertiseOrderDetailSuccess(response).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseOrderDetailFailed(error).toObject()))
}

/**
 * Helper function to update a single Expertise
 *
 * @returns {Promise<ExpertiseOrderRecord>}
 */
export const doUpdateExpertiseOrderDetail = (expertiseId: number, orderId: string, updatedExpertiseOrder: ExpertiseOrderRecord) => {
	return new Promise<ExpertiseOrderRecord>((resolve: any, reject: any) => {
		http.patch(`${EXPERTISE_ORDER_UPDATE_API}/${expertiseId}/orders/${orderId}`, updatedExpertiseOrder)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update Expertise Review
 */
export const updateExpertiseReviewDetail = (expertiseId: number, ReviewId: string, updatedExpertiseReview: ExpertiseReviewRecord) => (dispatch: any) => {
	dispatch(new FetchExpertiseReviewDetailPending().toObject())

	return doUpdateExpertiseReviewDetail(expertiseId, ReviewId, updatedExpertiseReview)
		.then(() => doFetchExpertiseReviewDetail(expertiseId, ReviewId))
		.then((response: ExpertiseReviewRecord) => dispatch(new FetchExpertiseReviewDetailSuccess(response).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseReviewDetailFailed(error).toObject()))
}

/**
 * Helper function to update a single Expertise
 *
 * @returns {Promise<ExpertiseReviewRecord>}
 */
export const doUpdateExpertiseReviewDetail = (expertiseId: number, ReviewId: string, updatedExpertiseReview: ExpertiseReviewRecord) => {
	return new Promise<ExpertiseReviewRecord>((resolve: any, reject: any) => {
		http.patch(`${EXPERTISE_ORDER_UPDATE_API}/${expertiseId}/reviews/${ReviewId}`, updatedExpertiseReview)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update Expertise order
 */
export const updateExpertiseOrderAttachment = (orderId: string, attachmentId: string, updatedExpertiseOrderAttach: ExpertiseOrderRecord) => (dispatch: any) => {
	dispatch(new FetchExpertiseOrderAttachmentPending().toObject())
	console.log(orderId)
	console.log(attachmentId)
	return doUpdateExpertiseOrderAttachment( orderId, attachmentId, updatedExpertiseOrderAttach)
		// .then(() => doFetchExpertiseOrderDetail(orderId, attachmentId))
		.then((response: ExpertiseOrderRecord) => dispatch(new FetchExpertiseOrderAttachmentSuccess(response).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseOrderAttachmentFailed(error).toObject()))
}

/**
 * Helper function to update a single Expertise
 *
 * @returns {Promise<ExpertiseOrderRecord>}
 */
export const doUpdateExpertiseOrderAttachment = (orderId: string, attachmentId: string, updatedExpertiseOrderAttach: ExpertiseOrderRecord) => {
	return new Promise<ExpertiseOrderRecord>((resolve: any, reject: any) => {
		http.patch(`${EXPERTISE_ORDER_UPDATE_ATTACHMENT}/${orderId}/attachments/${attachmentId}`, updatedExpertiseOrderAttach)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}


/**
 * Underlying function to delete expertise
 */
export const doRemoveExpertise = (expertiseId: number) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${EXPERTISE_DELETE_API}/${expertiseId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to delete expertise order
 */
export const doRemoveExpertiseOrder = (expertiseId: string, orderId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${EXPERTISE_ORDER_DELETE_API}/${expertiseId}/orders/${orderId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to delete expertise Review
 */
export const doRemoveExpertiseReview = (expertiseId: string, ReviewsId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${EXPERTISE_REVIEW_DELETE_API}/${expertiseId}/reviews/${ReviewsId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}