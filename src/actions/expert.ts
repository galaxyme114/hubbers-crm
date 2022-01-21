import {
	FetchExpertFailed,
	FetchExpertPending,
	FetchExpertSuccess,
	FetchExpertDetailPending,
	FetchExpertDetailSuccess,
	FetchExpertDetailFailed
} from '../constants/action-types'
import {
	EXPERT_API,
	SKILLS_API,
	EXPERTISE_CATEGORY_LIST_API,
	EXPERT_SINGLE_DETAIL_API,
	EXPERT_UPDATE_API,
	EXPERT_DELETE_API,
	EXPERT_ADD_API
} from '../constants/api'
import { ExpertRecord, SkillRecord } from '../constants/models'

import http from '../utils/httpService'

/**
 * Fetch the Expert and dispatch the data
 *
 */
export const fetchExpert = () => (dispatch: any) => {
	dispatch(new FetchExpertPending().toObject())

	return doFetchExpert()
		.then((expert: ReadonlyArray<ExpertRecord>) =>
			dispatch(new FetchExpertSuccess(expert).toObject()))
		.catch((error: any) => dispatch(new FetchExpertFailed(error).toObject()))
}

/**
 * Underlying method to fetch the Expert from the API
 *
 * @returns {Promise<[ExpertRecord]>}
 */
export const doFetchExpert = (): Promise<[ExpertRecord]> => {
	return new Promise<[ExpertRecord]>((resolve: any, reject: any) => {
		return http.get(EXPERT_API)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}


/**
 * Fetch Expert Detail
 */
export const fetchExpertDetail = (expertId: number) => (dispatch: any) => {
	dispatch(new FetchExpertDetailPending().toObject())

	return doFetchExpertDetail(expertId)
		.then((expert: ExpertRecord) => dispatch(new FetchExpertDetailSuccess(expert).toObject()))
		.catch((error: any) => dispatch(new FetchExpertDetailFailed(error).toObject()))
}

/**
 * Underlying function to fetch Expert Detail
 */
export const doFetchExpertDetail = (expertId: number) => {
	return new Promise<ExpertRecord>((resolve: any, reject: any) => {
		http.get(`${EXPERT_SINGLE_DETAIL_API}/${expertId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to fetch a single expertise
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
            .then((skills: ReadonlyArray<SkillRecord>) => {
				// console.log(skills)	
				resolve({ options: skills }) 
			})
            .catch(error => reject(error))
    })
}

/**
 * Helper function to Add a single Expert
 *
 * @returns {Promise<any>}
 */
export const doAddExpert = (data: any) => {
	console.log(data)
	return new Promise<any>((resolve: any, reject: any) => {
		http.post(`${EXPERT_ADD_API}`, {
			skills: data.skills,
			categories: data.categories,
			userId: data.userId,
			languages: data.languages,
			availabilityScope: data.availabilityScope,
			availabilityTime: data.availabilityTime,
			availabilityPrice: data.availabilityPrice,
			hourlyRate: data.hourlyRate,
			hoursToWorkWeek: data.hoursToWorkWeek,
			hoursToWorkWeekToken: data.hoursToWorkWeekToken,
			education: data.education,
		})
		.then(response => resolve(response.data))
		.catch(error => reject(error))
	})
}

/**
 * Update Expert
 */
export const updateExpertDetail = (expertId: number, updatedExpert: ExpertRecord) => (dispatch: any) => {
	dispatch(new FetchExpertDetailPending().toObject())

	return doUpdateExpertDetail(expertId, updatedExpert)
		.then(() => doFetchExpertDetail(expertId))
		.then((response: ExpertRecord) => dispatch(new FetchExpertDetailSuccess(response).toObject()))
		.catch((error: any) => dispatch(new FetchExpertDetailFailed(error).toObject()))
}

/**
 * Helper function to update a single Expert
 *
 * @returns {Promise<ExpertRecord>}
 */
export const doUpdateExpertDetail = (expertId: number, updatedExpert: ExpertRecord) => {
	return new Promise<ExpertRecord>((resolve: any, reject: any) => {
		http.patch(`${EXPERT_UPDATE_API}/${expertId}`, updatedExpert)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to delete expert
 */
export const doRemoveExpert = (expertId: number) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${EXPERT_DELETE_API}/${expertId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}
