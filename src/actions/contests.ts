import {
	FetchApplicationsFailed,
	FetchApplicationsPending,
	FetchApplicationsSuccess,
	FetchContestDetailFailed,
	FetchContestDetailPending,
	FetchContestDetailSuccess,
	FetchContestsFailed,
	FetchContestsPending,
	FetchContestsSuccess,
	FetchEntriesContestantsFailed,
	FetchEntriesContestantsPending,
	FetchEntriesContestantsSuccess,
	FetchEntriesFailed,
	FetchEntriesJudgeFailed,
	FetchEntriesJudgePending,
	FetchEntriesJudgeSuccess,
	FetchEntriesPending,
	FetchEntriesSuccess
} from '../constants/action-types'
import {
	APPLICATIONS_API, 
	APPLICATIONS_APPROVE_API, 
	APPLICATIONS_REJECT_API,
	APPROVE_CONTESTANTS_API,
	APPROVE_JUDGES_API,
	CONTEST_ADD_API,
	CONTEST_DELETE_API,
	CONTEST_ENTRIES_CONTESTANTS_API,
	CONTEST_ENTRIES_JUDGES_API,
	CONTEST_UPDATE_API,
	CONTESTS_API,
	DELETE_CONTESTANTS_API,
	DELETE_JUDGES_API,
	DELETE_RATING_API,
	ENTRIES_DETAIL_API,
	ENTRIES_DRAFT_API,
	SINGLE_CONTEST_DETAIL_API,
	UPDATE_ENTRIE_API,
	UPDATE_ENTRIE_RATING_API
} from '../constants/api'
import { ApplicationsRecord, ContestRecord} from '../constants/models'

import http from '../utils/httpService'

/**
 * Fetch the contests and dispatch the data
 *
 */
export const fetchContests = () => (dispatch: any) => {
	dispatch(new FetchContestsPending().toObject())

	return doFetchContests()
		.then((contests: ReadonlyArray<ContestRecord>) =>
			dispatch(new FetchContestsSuccess(contests).toObject()))
		.catch((error: any) => dispatch(new FetchContestsFailed(error).toObject()))
}

/**
 * Underlying method to fetch the contests from the API
 *
 * @returns {Promise<[ContestRecord]>}
 */
export const doFetchContests = (): Promise<[ContestRecord]> => {
	return new Promise<[ContestRecord]>((resolve: any, reject: any) => {
		return http.get(CONTESTS_API)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Fetch Contest Detail
 */
export const fetchContestDetail = (contestId: number) => (dispatch: any) => {
	dispatch(new FetchContestDetailPending().toObject())

	return doFetchContestDetail(contestId)
		.then((contest: ContestRecord) => dispatch(new FetchContestDetailSuccess(contest).toObject()))
		.catch((error: any) => dispatch(new FetchContestDetailFailed(error).toObject()))
}

/**
 * Underlying function to fetch Contest Detail
 */
export const doFetchContestDetail = (contestId: number) => {
	return new Promise<ContestRecord>((resolve: any, reject: any) => {
		http.get(`${SINGLE_CONTEST_DETAIL_API}/${contestId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update contest
 */
export const updateContestDetail = (contestId: number, updatedContest: ContestRecord) => (dispatch: any) => {
	dispatch(new FetchContestDetailPending().toObject())

	return doUpdateContestDetail(contestId, updatedContest)
		.then(() => doFetchContestDetail(contestId))
		.then((response: ContestRecord) => dispatch(new FetchContestDetailSuccess(response).toObject()))
		.catch((error: any) => dispatch(new FetchContestDetailFailed(error).toObject()))
}

/**
 * Helper function to update a single contest
 *
 * @returns {Promise<ContestRecord>}
 */
export const doUpdateContestDetail = (contestId: number, updatedContest: ContestRecord) => {
	return new Promise<ContestRecord>((resolve: any, reject: any) => {
		http.patch(`${CONTEST_UPDATE_API}/${contestId}`, updatedContest)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to Add a single contest
 *
 * @returns {Promise<any>}
 */
export const doAddContest = (data: any) => {
	console.log(data)
	return new Promise<any>((resolve: any, reject: any) => {
		http.post(`${CONTEST_ADD_API}`, {
			name: data.name,
			slug: data.slug,
			featuredImageUrl: data.featuredImageUrl,
			description: data.description,
			market: data.market,
			rules: data.rules,
			allowJudgeSignup: data.allowJudgeSignup,
			allowContestantSignup:
			data.allowContestantSignup,
			isDraft: data.isDraft
		})
		.then(response => resolve(response.data))
		.catch(error => reject(error))
	})
}

/**
 * Underlying function to delete contest
 */
export const doRemoveContest = (contestId: number) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${CONTEST_DELETE_API}/${contestId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch Contest Entries Judges
 */
export const fetchContestEntriesJudge = (contestId: number, judgeId: string) => (dispatch: any) => {
	dispatch(new FetchEntriesJudgePending().toObject())

	return doFetchContestEntriesJudge(contestId, judgeId)
		.then((judge: any) => dispatch(new FetchEntriesJudgeSuccess(judge).toObject()))
		.catch((error: any) => dispatch(new FetchEntriesJudgeFailed(error).toObject()))
}

/**
 * Helper function to Fetch Contest Entries Judges
 * ${judgeId}
 *  @returns {Promise<any>}
 */
const doFetchContestEntriesJudge = (contestId: number, judgeId: string) => {
	return new Promise<any>((resolve: any, reject: any) => {
		http.get(`${CONTEST_ENTRIES_JUDGES_API}/${contestId}/judge/${judgeId}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch Contest Entries Contestants
 */
export const fetchContestEntriesContestants = (contestId: number, contestantId: string) => (dispatch: any) => {
	dispatch(new FetchEntriesContestantsPending().toObject())

	return doFetchContestEntriesContestants(contestId, contestantId)
		.then((contestant: any) => dispatch(new FetchEntriesContestantsSuccess(contestant).toObject()))
		.catch((error: any) => dispatch(new FetchEntriesContestantsFailed(error).toObject()))
}

/**
 * Helper function to Fetch Contest Entries Contestants
 *
 *  @returns {Promise<any>}
 */
const doFetchContestEntriesContestants = (contestId: number, contestantId: string) => {
	return new Promise<any>((resolve: any, reject: any) => {
		http.get(`${CONTEST_ENTRIES_CONTESTANTS_API}/${contestId}/contestant/${contestantId}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch Entries Detail
 */
export const fetchEntriesDetail = (entryId: number) => (dispatch: any) => {
	dispatch(new FetchEntriesPending().toObject())

	return doFetchEntries(entryId)
		.then((entry: any) => dispatch(new FetchEntriesSuccess(entry).toObject()))
		.catch((error: any) => dispatch(new FetchEntriesFailed(error).toObject()))
}

/**
 * Helper function to Fetch Entries Detail
 *
 *  @returns {Promise<any>}
 */
const doFetchEntries = (entryId: number) => {
	return new Promise<any>((resolve: any, reject: any) => {
		http.get(`${ENTRIES_DETAIL_API}/${entryId}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * function to Judge Approve
 */
export const doJudgeApprove = (contestId: string, judgeId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(`${APPROVE_JUDGES_API}/${contestId}/approve/judge/${judgeId}`, {isActive: true})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * function to contestants Approve
 */
export const doContestantsApprove = (contestId: string, contestantId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(`${APPROVE_CONTESTANTS_API}/${contestId}/approve/contestant/${contestantId}`, {isActive: true})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
		})
}

/**
 * function to Judge Reject
 */
export const doJudgeReject = (contestId: string, judgeId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(`${APPROVE_JUDGES_API}/${contestId}/reject/judge/${judgeId}`, {isActive: false})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * function to contestants Reject
 */
export const doContestantsReject = (contestId: string, contestantId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(`${APPROVE_CONTESTANTS_API}/${contestId}/reject/contestant/${contestantId}`, {isActive: false})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch the Applications and dispatch the data
 *
 */
export const fetchApplications = (type: string) => (dispatch: any) => {
	dispatch(new FetchApplicationsPending().toObject())

	return doFetchApplications(type)
		.then((applications: ReadonlyArray<ApplicationsRecord>) =>
			dispatch(new FetchApplicationsSuccess(applications).toObject()))
		.catch((error: any) => dispatch(new FetchApplicationsFailed(error).toObject()))
}

/**
 * Underlying method to fetch the Applications from the API
 *
 * @returns {Promise<[ApplicationsRecord]>}
 */
export const doFetchApplications = (type: string): Promise<[ApplicationsRecord]> => {
	return new Promise<[ApplicationsRecord]>((resolve: any, reject: any) => {
		return http.get(`${APPLICATIONS_API}/${type}`)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Underlying function to Application Approve
 */
export const doApplicationApprove = (type: string, data: any) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(`${APPLICATIONS_APPROVE_API}/${type}/add`, {...data})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to Application Reject
 */
export const doApplicationReject = (type: string, applicationId: number) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${APPLICATIONS_REJECT_API}/${type}/delete/${applicationId}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to update a Entry Draft
 *
 * @returns {Promise<any>}
 */
export const doUpdateEntryDraft = (entryId: number, data: any) => {
	console.log(entryId)
	console.log(data)
	return new Promise<any>((resolve: any, reject: any) => {
		http.put(`${ENTRIES_DRAFT_API}/${entryId}`, {
			title: data.title,
			description_design: data.description_design,
			description_funcationality: data.description_funcationality,
			description_usability: data.description_usability,
			description_market_potential: data.description_market_potential,
			isDraft: data.isDraft
		})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to update a Entrie
 *
 * @returns {Promise<any>}
 */
export const doUpdateEntrieDetail = (entryId: number, data: any) => {
	return new Promise<any>((resolve: any, reject: any) => {
		http.patch(`${UPDATE_ENTRIE_API}/${entryId}`, {
			title: data.title,
			descriptionDesign: data.descriptionDesign,
			descriptionFunctionality: data.descriptionFunctionality,
			descriptionUsability: data.descriptionUsability,
			descriptionMarketPotential: data.descriptionMarketPotential,
			isDraft: data.isDraft
		})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to update a Entrie ratings
 *
 * @returns {Promise<any>}
 */
export const doUpdateEntrieRating = (entryId: string, ratingId: string, data: any) => {
	return new Promise<any>((resolve: any, reject: any) => {
		http.patch(`${UPDATE_ENTRIE_RATING_API}/${entryId}/ratings/${ratingId}`, {
			design: data.design,
			functionality: data.functionality,
			marketPotential: data.marketPotential,
			usability: data.usability,
			isSeen: true
		})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to delete contestant
 */
export const doRemoveContestant = (contestId: string, contestantId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${DELETE_CONTESTANTS_API}/${contestId}/contestant-application/${contestantId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to delete judge
 */
export const doRemoveJudge = (contestId: string, judgeId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${DELETE_JUDGES_API}/${contestId}/judge-application/${judgeId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to delete rating
 */
export const doRemoveRating = (EntryId: string, ratingId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${DELETE_RATING_API}/${EntryId}/ratings/${ratingId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

