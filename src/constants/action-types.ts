// Constants for actions

import { Action } from 'redux'

import { UserRecord } from '../interfaces/user'
import {
	ContestRecord,
	ExpertiseRecord,
	ExpertRecord,
	PageRecord,
	ProfileRecord,
	TransactionRecord,
	EventRecord,
	CommunityRecord
} from './models'

export enum ActionTypeStates {
	INPROGRESS = 'INPROGRESS',
	SUCCESS = 'SUCCESS',
	FAILED = 'FAILED'
}

class BaseAction {
	public toObject() {
		return Object.assign({}, this)
	}
}

/**
 * Authenticate
 */
type AUTHENTICATE_USER_SUCCESS = 'pldt/authenticate/success'
type AUTHENTICATE_USER_PENDING = 'pldt/authenticate/pending'
type AUTHENTICATE_USER_FAILED = 'pldt/authenticate/failed'
export const AUTHENTICATE_USER_SUCCESS: AUTHENTICATE_USER_SUCCESS = 'pldt/authenticate/success'
export const AUTHENTICATE_USER_PENDING: AUTHENTICATE_USER_PENDING = 'pldt/authenticate/pending'
export const AUTHENTICATE_USER_FAILED: AUTHENTICATE_USER_FAILED = 'pldt/authenticate/failed'

export class AuthenticateUserPending extends BaseAction implements Action {
	public readonly type = AUTHENTICATE_USER_PENDING
}

export class AuthenticateUserSuccess extends BaseAction implements Action {
	public readonly type = AUTHENTICATE_USER_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class AuthenticateUserFailed extends BaseAction implements Action {
	public readonly type = AUTHENTICATE_USER_FAILED

	constructor(public payload: any) {
		super()
	}
}

type REMOVE_USER_SUCCESS = 'pldt/users/removeuser/success'
export const REMOVE_USER_SUCCESS: REMOVE_USER_SUCCESS =
	'pldt/users/removeuser/success'

export class RemoveUser extends BaseAction implements Action {
	public readonly type = REMOVE_USER_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

/*
 * Fetching Users
 */
type FETCH_USER_SUCCESS = 'pldt/user/fetch/success'
type FETCH_USER_PENDING = 'pldt/user/fetch/pending'
type FETCH_USER_FAILED = 'pldt/user/fetch/failed'
export const FETCH_USER_SUCCESS: FETCH_USER_SUCCESS = 'pldt/user/fetch/success'
export const FETCH_USER_PENDING: FETCH_USER_PENDING = 'pldt/user/fetch/pending'
export const FETCH_USER_FAILED: FETCH_USER_FAILED = 'pldt/user/fetch/failed'

export class FetchUserPending extends BaseAction implements Action {
	public readonly type = FETCH_USER_PENDING
}

export class FetchUserSuccess extends BaseAction implements Action {
	public readonly type = FETCH_USER_SUCCESS

	constructor(public payload: UserRecord[]) {
		super()
	}
}

export class FetchUserFailed extends BaseAction implements Action {
	public readonly type = FETCH_USER_FAILED

	constructor(public payload: any) {
		super()
	}
}

/*
 * Fetching User detail
 */
type FETCH_USER_DETAIL_SUCCESS = 'pldt/userdetail/fetch/success'
type FETCH_USER_DETAIL_PENDING = 'pldt/userdetail/fetch/pending'
type FETCH_USER_DETAIL_FAILED = 'pldt/userdetail/fetch/failed'
export const FETCH_USER_DETAIL_SUCCESS: FETCH_USER_DETAIL_SUCCESS = 'pldt/userdetail/fetch/success'
export const FETCH_USER_DETAIL_PENDING: FETCH_USER_DETAIL_PENDING = 'pldt/userdetail/fetch/pending'
export const FETCH_USER_DETAIL_FAILED: FETCH_USER_DETAIL_FAILED = 'pldt/userdetail/fetch/failed'

export class FetchUserDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_USER_DETAIL_PENDING
}

export class FetchUserDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_USER_DETAIL_SUCCESS

	constructor(public payload: ProfileRecord) {
		super()
	}
}

export class FetchUserDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_USER_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/*
 * Updating Single User detail
 */
type UPDATE_USER_DETAIL_SUCCESS = 'pldt/userdetail/update/success'
type UPDATE_USER_DETAIL_PENDING = 'pldt/userdetail/update/pending'
type UPDATE_USER_DETAIL_FAILED = 'pldt/userdetail/update/failed'
export const UPDATE_USER_DETAIL_SUCCESS: UPDATE_USER_DETAIL_SUCCESS = 'pldt/userdetail/update/success'
export const UPDATE_USER_DETAIL_PENDING: UPDATE_USER_DETAIL_PENDING = 'pldt/userdetail/update/pending'
export const UPDATE_USER_DETAIL_FAILED: UPDATE_USER_DETAIL_FAILED = 'pldt/userdetail/update/failed'

export class UpdateUserDetailPending extends BaseAction implements Action {
	public readonly type = UPDATE_USER_DETAIL_PENDING
}

export class UpdateUserDetailSuccess extends BaseAction implements Action {
	public readonly type = UPDATE_USER_DETAIL_SUCCESS

	constructor(public payload: ProfileRecord) {
		super()
	}
}

export class UpdateUserDetailFailed extends BaseAction implements Action {
	public readonly type = UPDATE_USER_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Contests
 */
type FETCH_CONTESTS_SUCCESS = 'pldt/contests/fetch/success'
type FETCH_CONTESTS_PENDING = 'pldt/contests/fetch/pending'
type FETCH_CONTESTS_FAILED = 'pldt/contests/fetch/failed'
export const FETCH_CONTESTS_SUCCESS: FETCH_CONTESTS_SUCCESS = 'pldt/contests/fetch/success'
export const FETCH_CONTESTS_PENDING: FETCH_CONTESTS_PENDING = 'pldt/contests/fetch/pending'
export const FETCH_CONTESTS_FAILED: FETCH_CONTESTS_FAILED = 'pldt/contests/fetch/failed'

export class FetchContestsPending extends BaseAction implements Action {
	public readonly type = FETCH_CONTESTS_PENDING
}

export class FetchContestsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_CONTESTS_SUCCESS

	constructor(public payload: ReadonlyArray<ContestRecord>) {
		super()
	}
}

export class FetchContestsFailed extends BaseAction implements Action {
	public readonly type = FETCH_CONTESTS_FAILED

	constructor(public payload: any) {
		super()
	}
}

/*
 * Fetching Single Contest detail
 */
type FETCH_CONTEST_DETAIL_SUCCESS = 'pldt/contestdetail/success'
type FETCH_CONTEST_DETAIL_PENDING = 'pldt/contestdetail/pending'
type FETCH_CONTEST_DETAIL_FAILED = 'pldt/contestdetail/failed'
export const FETCH_CONTEST_DETAIL_SUCCESS: FETCH_CONTEST_DETAIL_SUCCESS = 'pldt/contestdetail/success'
export const FETCH_CONTEST_DETAIL_PENDING: FETCH_CONTEST_DETAIL_PENDING = 'pldt/contestdetail/pending'
export const FETCH_CONTEST_DETAIL_FAILED: FETCH_CONTEST_DETAIL_FAILED = 'pldt/contestdetail/failed'

export class FetchContestDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_CONTEST_DETAIL_PENDING
}

export class FetchContestDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_CONTEST_DETAIL_SUCCESS

	constructor(public payload: ContestRecord) {
		super()
	}
}

export class FetchContestDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_CONTEST_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/*
 * Updating Single Contest detail
 */
type UPDATE_CONTEST_DETAIL_SUCCESS = 'pldt/contestdetail/update/success'
type UPDATE_CONTEST_DETAIL_PENDING = 'pldt/contestdetail/update/pending'
type UPDATE_CONTEST_DETAIL_FAILED = 'pldt/contestdetail/update/failed'
export const UPDATE_CONTEST_DETAIL_SUCCESS: UPDATE_CONTEST_DETAIL_SUCCESS = 'pldt/contestdetail/update/success'
export const UPDATE_CONTEST_DETAIL_PENDING: UPDATE_CONTEST_DETAIL_PENDING = 'pldt/contestdetail/update/pending'
export const UPDATE_CONTEST_DETAIL_FAILED: UPDATE_CONTEST_DETAIL_FAILED = 'pldt/contestdetail/update/failed'

export class UpdateContestDetailPending extends BaseAction implements Action {
	public readonly type = UPDATE_CONTEST_DETAIL_PENDING
}

export class UpdateContestDetailSuccess extends BaseAction implements Action {
	public readonly type = UPDATE_CONTEST_DETAIL_SUCCESS

	constructor(public payload: ProfileRecord) {
		super()
	}
}

export class UpdateContestDetailFailed extends BaseAction implements Action {
	public readonly type = UPDATE_CONTEST_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/*
 * Fetch Entroes Judges List
 */
type FETCH_ENTRIES_JUDGE_SUCCESS = 'pldt/entriesjudge/update/success'
type FETCH_ENTRIES_JUDGE_PENDING = 'pldt/entriesjudge/update/pending'
type FETCH_ENTRIES_JUDGE_FAILED = 'pldt/entriesjudge/update/failed'
export const FETCH_ENTRIES_JUDGE_SUCCESS: FETCH_ENTRIES_JUDGE_SUCCESS = 'pldt/entriesjudge/update/success'
export const FETCH_ENTRIES_JUDGE_PENDING: FETCH_ENTRIES_JUDGE_PENDING = 'pldt/entriesjudge/update/pending'
export const FETCH_ENTRIES_JUDGE_FAILED: FETCH_ENTRIES_JUDGE_FAILED = 'pldt/entriesjudge/update/failed'

export class FetchEntriesJudgePending extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIES_JUDGE_PENDING
}

export class FetchEntriesJudgeSuccess extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIES_JUDGE_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class FetchEntriesJudgeFailed extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIES_JUDGE_FAILED

	constructor(public payload: any) {
		super()
	}
}

/*
 * Fetch Entroes Contestants List
 */
type FETCH_ENTRIES_CONTESTANTS_SUCCESS = 'pldt/entriescontestants/update/success'
type FETCH_ENTRIES_CONTESTANTS_PENDING = 'pldt/entriescontestants/update/pending'
type FETCH_ENTRIES_CONTESTANTS_FAILED = 'pldt/entriescontestants/update/failed'
export const FETCH_ENTRIES_CONTESTANTS_SUCCESS:
FETCH_ENTRIES_CONTESTANTS_SUCCESS = 'pldt/entriescontestants/update/success'
export const FETCH_ENTRIES_CONTESTANTS_PENDING:
FETCH_ENTRIES_CONTESTANTS_PENDING = 'pldt/entriescontestants/update/pending'
export const FETCH_ENTRIES_CONTESTANTS_FAILED:
FETCH_ENTRIES_CONTESTANTS_FAILED = 'pldt/entriescontestants/update/failed'

export class FetchEntriesContestantsPending extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIES_CONTESTANTS_PENDING
}

export class FetchEntriesContestantsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIES_CONTESTANTS_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class FetchEntriesContestantsFailed extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIES_CONTESTANTS_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch page
 */
type FETCH_PAGE_SUCCESS = 'pldt/page/fetch/success'
type FETCH_PAGE_PENDING = 'pldt/page/fetch/pending'
type FETCH_PAGE_FAILED = 'pldt/page/fetch/failed'
export const FETCH_PAGE_SUCCESS: FETCH_PAGE_SUCCESS = 'pldt/page/fetch/success'
export const FETCH_PAGE_PENDING: FETCH_PAGE_PENDING = 'pldt/page/fetch/pending'
export const FETCH_PAGE_FAILED: FETCH_PAGE_FAILED = 'pldt/page/fetch/failed'

export class FetchPagePending extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_PENDING
}

export class FetchPageSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_SUCCESS

	constructor(public payload: PageRecord) {
		super()
	}
}

export class FetchPageFailed extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Page Detail
 */
type FETCH_PAGE_DETAIL_SUCCESS = 'pldt/pagedetail/fetch/success'
type FETCH_PAGE_DETAIL_PENDING = 'pldt/pagedetail/fetch/pending'
type FETCH_PAGE_DETAIL_FAILED = 'pldt/pagedetail/fetch/failed'
export const FETCH_PAGE_DETAIL_SUCCESS: FETCH_PAGE_DETAIL_SUCCESS = 'pldt/pagedetail/fetch/success'
export const FETCH_PAGE_DETAIL_PENDING: FETCH_PAGE_DETAIL_PENDING = 'pldt/pagedetail/fetch/pending'
export const FETCH_PAGE_DETAIL_FAILED: FETCH_PAGE_DETAIL_FAILED = 'pldt/pagedetail/fetch/failed'

export class FetchPageDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_DETAIL_PENDING
}

export class FetchPageDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_DETAIL_SUCCESS

	constructor(public payload: PageRecord) {
		super()
	}
}

export class FetchPageDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Page Update
 */
type PAGE_UPDATE_SUCCESS = 'pldt/pageupdate/fetch/success'
type PAGE_UPDATE_PENDING = 'pldt/pageupdate/fetch/pending'
type PAGE_UPDATE_FAILED = 'pldt/pageupdate/fetch/failed'
export const PAGE_UPDATE_SUCCESS: PAGE_UPDATE_SUCCESS = 'pldt/pageupdate/fetch/success'
export const PAGE_UPDATE_PENDING: PAGE_UPDATE_PENDING = 'pldt/pageupdate/fetch/pending'
export const PAGE_UPDATE_FAILED: PAGE_UPDATE_FAILED = 'pldt/pageupdate/fetch/failed'

export class PageUpdatePending extends BaseAction implements Action {
	public readonly type = PAGE_UPDATE_PENDING
}

export class PageUpdateSuccess extends BaseAction implements Action {
	public readonly type = PAGE_UPDATE_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class PageUpdateFailed extends BaseAction implements Action {
	public readonly type = PAGE_UPDATE_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Page Delete
 */
type FETCH_PAGE_DELETE_SUCCESS = 'pldt/pagedelete/fetch/success'
type FETCH_PAGE_DELETE_PENDING = 'pldt/pagedelete/fetch/pending'
type FETCH_PAGE_DELETE_FAILED = 'pldt/pagedelete/fetch/failed'
export const FETCH_PAGE_DELETE_SUCCESS: FETCH_PAGE_DELETE_SUCCESS = 'pldt/pagedelete/fetch/success'
export const FETCH_PAGE_DELETE_PENDING: FETCH_PAGE_DELETE_PENDING = 'pldt/pagedelete/fetch/pending'
export const FETCH_PAGE_DELETE_FAILED: FETCH_PAGE_DELETE_FAILED = 'pldt/pagedelete/fetch/failed'

export class FetchPageDeletePending extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_DELETE_PENDING
}

export class FetchPageDeleteSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_DELETE_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class FetchPageDeleteFailed extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_DELETE_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Create Page
 */
type CREATE_PAGE_SUCCESS = 'pldt/page/create/success'
type CREATE_PAGE_PENDING = 'pldt/page/create/pending'
type CREATE_PAGE_FAILED = 'pldt/page/create/failed'
export const CREATE_PAGE_SUCCESS: CREATE_PAGE_SUCCESS = 'pldt/page/create/success'
export const CREATE_PAGE_PENDING: CREATE_PAGE_PENDING = 'pldt/page/create/pending'
export const CREATE_PAGE_FAILED: CREATE_PAGE_FAILED = 'pldt/page/create/failed'

export class CreatePagePending extends BaseAction implements Action {
	public readonly type = CREATE_PAGE_PENDING
}

export class CreatePageSuccess extends BaseAction implements Action {
	public readonly type = CREATE_PAGE_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class CreatePageFailed extends BaseAction implements Action {
	public readonly type = CREATE_PAGE_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch User Activities
 */
type FETCH_USER_ACTIVITIES_SUCCESS = 'pldt/user/activities/fetch/success'
type FETCH_USER_ACTIVITIES_PENDING = 'pldt/user/activities/fetch/pending'
type FETCH_USER_ACTIVITIES_FAILED = 'pldt/user/activities/fetch/failed'
export const FETCH_USER_ACTIVITIES_SUCCESS: FETCH_USER_ACTIVITIES_SUCCESS = 'pldt/user/activities/fetch/success'
export const FETCH_USER_ACTIVITIES_PENDING: FETCH_USER_ACTIVITIES_PENDING = 'pldt/user/activities/fetch/pending'
export const FETCH_USER_ACTIVITIES_FAILED: FETCH_USER_ACTIVITIES_FAILED = 'pldt/user/activities/fetch/failed'

export class FetchUserActivitiesPending extends BaseAction implements Action {
	public readonly type = FETCH_USER_ACTIVITIES_PENDING
}

export class FetchUserActivitiesSuccess extends BaseAction implements Action {
	public readonly type = FETCH_USER_ACTIVITIES_SUCCESS

	constructor(public payload: PageRecord) {
		super()
	}
}

export class FetchUserActivitiesFailed extends BaseAction implements Action {
	public readonly type = FETCH_USER_ACTIVITIES_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch User Transactions
 */
type FETCH_USER_TRANSACTIONS_SUCCESS = 'pldt/user/transactions/fetch/success'
type FETCH_USER_TRANSACTIONS_PENDING = 'pldt/user/transactions/fetch/pending'
type FETCH_USER_TRANSACTIONS_FAILED = 'pldt/user/transactions/fetch/failed'
export const FETCH_USER_TRANSACTIONS_SUCCESS: FETCH_USER_TRANSACTIONS_SUCCESS = 'pldt/user/transactions/fetch/success'
export const FETCH_USER_TRANSACTIONS_PENDING: FETCH_USER_TRANSACTIONS_PENDING = 'pldt/user/transactions/fetch/pending'
export const FETCH_USER_TRANSACTIONS_FAILED: FETCH_USER_TRANSACTIONS_FAILED = 'pldt/user/transactions/fetch/failed'

export class FetchUserTransactionsPending extends BaseAction implements Action {
	public readonly type = FETCH_USER_TRANSACTIONS_PENDING
}

export class FetchUserTransactionsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_USER_TRANSACTIONS_SUCCESS
	
	constructor(public payload: TransactionRecord[]) {
		super()
	}
}

export class FetchUserTransactionsFailed extends BaseAction implements Action {
	public readonly type = FETCH_USER_TRANSACTIONS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch User Transaction Detail
 */
type FETCH_TRANSACTION_DETAIL_SUCCESS = 'pldt/transactionDetail/fetch/success'
type FETCH_TRANSACTION_DETAIL_PENDING = 'pldt/transactionDetail/fetch/pending'
type FETCH_TRANSACTION_DETAIL_FAILED = 'pldt/transactionDetail/fetch/failed'
export const FETCH_TRANSACTION_DETAIL_SUCCESS: FETCH_TRANSACTION_DETAIL_SUCCESS = 'pldt/transactionDetail/fetch/success'
export const FETCH_TRANSACTION_DETAIL_PENDING: FETCH_TRANSACTION_DETAIL_PENDING = 'pldt/transactionDetail/fetch/pending'
export const FETCH_TRANSACTION_DETAIL_FAILED: FETCH_TRANSACTION_DETAIL_FAILED = 'pldt/transactionDetail/fetch/failed'

export class FetchTransactionDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_TRANSACTION_DETAIL_PENDING
}

export class FetchTransactionDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_TRANSACTION_DETAIL_SUCCESS
	
	constructor(public payload: TransactionRecord) {
		super()
	}
}

export class FetchTransactionDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_TRANSACTION_DETAIL_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Applications
 */
type FETCH_APPLICATIONS_SUCCESS = 'pldt/applications/fetch/success'
type FETCH_APPLICATIONS_PENDING = 'pldt/applications/fetch/pending'
type FETCH_APPLICATIONS_FAILED = 'pldt/applications/fetch/failed'
export const FETCH_APPLICATIONS_SUCCESS: FETCH_APPLICATIONS_SUCCESS = 'pldt/applications/fetch/success'
export const FETCH_APPLICATIONS_PENDING: FETCH_APPLICATIONS_PENDING = 'pldt/applications/fetch/pending'
export const FETCH_APPLICATIONS_FAILED: FETCH_APPLICATIONS_FAILED = 'pldt/applications/fetch/failed'

export class FetchApplicationsPending extends BaseAction implements Action {
	public readonly type = FETCH_APPLICATIONS_PENDING
}

export class FetchApplicationsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_APPLICATIONS_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class FetchApplicationsFailed extends BaseAction implements Action {
	public readonly type = FETCH_APPLICATIONS_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Applications
 */
type FETCH_ENTRIES_SUCCESS = 'pldt/entries/fetch/success'
type FETCH_ENTRIES_PENDING = 'pldt/entries/fetch/pending'
type FETCH_ENTRIES_FAILED = 'pldt/entries/fetch/failed'
export const FETCH_ENTRIES_SUCCESS: FETCH_ENTRIES_SUCCESS = 'pldt/entries/fetch/success'
export const FETCH_ENTRIES_PENDING: FETCH_ENTRIES_PENDING = 'pldt/entries/fetch/pending'
export const FETCH_ENTRIES_FAILED: FETCH_ENTRIES_FAILED = 'pldt/entries/fetch/failed'

export class FetchEntriesPending extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIES_PENDING
}

export class FetchEntriesSuccess extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIES_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class FetchEntriesFailed extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIES_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Expertise
 */
type FETCH_EXPERTISE_SUCCESS = 'pldt/expertise/fetch/success'
type FETCH_EXPERTISE_PENDING = 'pldt/expertise/fetch/pending'
type FETCH_EXPERTISE_FAILED = 'pldt/expertise/fetch/failed'
export const FETCH_EXPERTISE_SUCCESS: FETCH_EXPERTISE_SUCCESS = 'pldt/expertise/fetch/success'
export const FETCH_EXPERTISE_PENDING: FETCH_EXPERTISE_PENDING = 'pldt/expertise/fetch/pending'
export const FETCH_EXPERTISE_FAILED: FETCH_EXPERTISE_FAILED = 'pldt/expertise/fetch/failed'

export class FetchExpertisePending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_PENDING
}

export class FetchExpertiseSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class FetchExpertiseFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Expertise Detail
 */
type FETCH_EXPERTISE_DETAIL_SUCCESS = 'pldt/expertiseDetail/fetch/success'
type FETCH_EXPERTISE_DETAIL_PENDING = 'pldt/expertiseDetail/fetch/pending'
type FETCH_EXPERTISE_DETAIL_FAILED = 'pldt/expertiseDetail/fetch/failed'
export const FETCH_EXPERTISE_DETAIL_SUCCESS: FETCH_EXPERTISE_DETAIL_SUCCESS = 'pldt/expertiseDetail/fetch/success'
export const FETCH_EXPERTISE_DETAIL_PENDING: FETCH_EXPERTISE_DETAIL_PENDING = 'pldt/expertiseDetail/fetch/pending'
export const FETCH_EXPERTISE_DETAIL_FAILED: FETCH_EXPERTISE_DETAIL_FAILED = 'pldt/expertiseDetail/fetch/failed'

export class FetchExpertiseDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_DETAIL_PENDING
}

export class FetchExpertiseDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_DETAIL_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class FetchExpertiseDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Expertise OrderList
 */
type FETCH_EXPERTISE_ORDER_SUCCESS = 'pldt/expertiseOrderList/fetch/success'
type FETCH_EXPERTISE_ORDER_PENDING = 'pldt/expertiseOrderList/fetch/pending'
type FETCH_EXPERTISE_ORDER_FAILED = 'pldt/expertiseOrderList/fetch/failed'
export const FETCH_EXPERTISE_ORDER_SUCCESS: FETCH_EXPERTISE_ORDER_SUCCESS = 'pldt/expertiseOrderList/fetch/success'
export const FETCH_EXPERTISE_ORDER_PENDING: FETCH_EXPERTISE_ORDER_PENDING = 'pldt/expertiseOrderList/fetch/pending'
export const FETCH_EXPERTISE_ORDER_FAILED: FETCH_EXPERTISE_ORDER_FAILED = 'pldt/expertiseOrderList/fetch/failed'

export class FetchExpertiseOrderPending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_PENDING
}

export class FetchExpertiseOrderSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_SUCCESS
	constructor(public payload: any) {
		super()
	}
}

export class FetchExpertiseOrderFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Expertise Order Detail
 */
type FETCH_EXPERTISE_ORDER_DETAIL_SUCCESS = 'pldt/expertiseOrderDetail/fetch/success'
type FETCH_EXPERTISE_ORDER_DETAIL_PENDING = 'pldt/expertiseOrderDetail/fetch/pending'
type FETCH_EXPERTISE_ORDER_DETAIL_FAILED = 'pldt/expertiseOrderDetail/fetch/failed'
export const FETCH_EXPERTISE_ORDER_DETAIL_SUCCESS: FETCH_EXPERTISE_ORDER_DETAIL_SUCCESS = 'pldt/expertiseOrderDetail/fetch/success'
export const FETCH_EXPERTISE_ORDER_DETAIL_PENDING: FETCH_EXPERTISE_ORDER_DETAIL_PENDING = 'pldt/expertiseOrderDetail/fetch/pending'
export const FETCH_EXPERTISE_ORDER_DETAIL_FAILED: FETCH_EXPERTISE_ORDER_DETAIL_FAILED = 'pldt/expertiseOrderDetail/fetch/failed'

export class FetchExpertiseOrderDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_DETAIL_PENDING
}

export class FetchExpertiseOrderDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_DETAIL_SUCCESS
	constructor(public payload: any) {
		super()
	}
}

export class FetchExpertiseOrderDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Expertise Order Attachment List
 */
type FETCH_EXPERTISE_ORDER_ATTACHMENT_SUCCESS = 'pldt/expertiseOrderAttachmentList/fetch/success'
type FETCH_EXPERTISE_ORDER_ATTACHMENT_PENDING = 'pldt/expertiseOrderAttachmentList/fetch/pending'
type FETCH_EXPERTISE_ORDER_ATTACHMENT_FAILED = 'pldt/expertiseOrderAttachmentList/fetch/failed'
export const FETCH_EXPERTISE_ORDER_ATTACHMENT_SUCCESS: FETCH_EXPERTISE_ORDER_ATTACHMENT_SUCCESS = 'pldt/expertiseOrderAttachmentList/fetch/success'
export const FETCH_EXPERTISE_ORDER_ATTACHMENT_PENDING: FETCH_EXPERTISE_ORDER_ATTACHMENT_PENDING = 'pldt/expertiseOrderAttachmentList/fetch/pending'
export const FETCH_EXPERTISE_ORDER_ATTACHMENT_FAILED: FETCH_EXPERTISE_ORDER_ATTACHMENT_FAILED = 'pldt/expertiseOrderAttachmentList/fetch/failed'

export class FetchExpertiseOrderAttachmentPending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_ATTACHMENT_PENDING
}

export class FetchExpertiseOrderAttachmentSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_ATTACHMENT_SUCCESS
	constructor(public payload: any) {
		super()
	}
}

export class FetchExpertiseOrderAttachmentFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_ATTACHMENT_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Expert
 */
type FETCH_EXPERT_SUCCESS = 'pldt/expert/fetch/success'
type FETCH_EXPERT_PENDING = 'pldt/expert/fetch/pending'
type FETCH_EXPERT_FAILED = 'pldt/expert/fetch/failed'
export const FETCH_EXPERT_SUCCESS: FETCH_EXPERT_SUCCESS = 'pldt/expert/fetch/success'
export const FETCH_EXPERT_PENDING: FETCH_EXPERT_PENDING = 'pldt/expert/fetch/pending'
export const FETCH_EXPERT_FAILED: FETCH_EXPERT_FAILED = 'pldt/expert/fetch/failed'

export class FetchExpertPending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERT_PENDING
}

export class FetchExpertSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERT_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class FetchExpertFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERT_FAILED

	constructor(public payload: any) {
		super()
	}
}


/**
 * Fetch Expert DETAIL
 */
type FETCH_EXPERT_DETAIL_SUCCESS = 'pldt/expertdetail/fetch/success'
type FETCH_EXPERT_DETAIL_PENDING = 'pldt/expertdetail/fetch/pending'
type FETCH_EXPERT_DETAIL_FAILED = 'pldt/expertdetail/fetch/failed'
export const FETCH_EXPERT_DETAIL_SUCCESS: FETCH_EXPERT_DETAIL_SUCCESS = 'pldt/expertdetail/fetch/success'
export const FETCH_EXPERT_DETAIL_PENDING: FETCH_EXPERT_DETAIL_PENDING = 'pldt/expertdetail/fetch/pending'
export const FETCH_EXPERT_DETAIL_FAILED: FETCH_EXPERT_DETAIL_FAILED = 'pldt/expertdetail/fetch/failed'

export class FetchExpertDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERT_DETAIL_PENDING
}

export class FetchExpertDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERT_DETAIL_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class FetchExpertDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERT_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Projects
 */
type FETCH_PROJECTS_SUCCESS = 'pldt/projects/fetch/success'
type FETCH_PROJECTS_PENDING = 'pldt/projects/fetch/pending'
type FETCH_PROJECTS_FAILED = 'pldt/projects/fetch/failed'
export const FETCH_PROJECTS_SUCCESS: FETCH_PROJECTS_SUCCESS = 'pldt/projects/fetch/success'
export const FETCH_PROJECTS_PENDING: FETCH_PROJECTS_PENDING = 'pldt/projects/fetch/pending'
export const FETCH_PROJECTS_FAILED: FETCH_PROJECTS_FAILED = 'pldt/projects/fetch/failed'

export class FetchProjectsPending extends BaseAction implements Action {
	public readonly type = FETCH_PROJECTS_PENDING
}

export class FetchProjectsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PROJECTS_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class FetchProjectsFailed extends BaseAction implements Action {
	public readonly type = FETCH_PROJECTS_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Project Detail
 */
type FETCH_PROJECTS_DETAIL_SUCCESS = 'pldt/projectsDetail/fetch/success'
type FETCH_PROJECTS_DETAIL_PENDING = 'pldt/projectsDetail/fetch/pending'
type FETCH_PROJECTS_DETAIL_FAILED = 'pldt/projectsDetail/fetch/failed'
export const FETCH_PROJECTS_DETAIL_SUCCESS: FETCH_PROJECTS_DETAIL_SUCCESS = 'pldt/projectsDetail/fetch/success'
export const FETCH_PROJECTS_DETAIL_PENDING: FETCH_PROJECTS_DETAIL_PENDING = 'pldt/projectsDetail/fetch/pending'
export const FETCH_PROJECTS_DETAIL_FAILED: FETCH_PROJECTS_DETAIL_FAILED = 'pldt/projectsDetail/fetch/failed'

export class FetchProjectsDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_PROJECTS_DETAIL_PENDING
}

export class FetchProjectsDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PROJECTS_DETAIL_SUCCESS
	constructor(public payload: any) {
		super()
	}
}

export class FetchProjectsDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_PROJECTS_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Post
 */
type FETCH_POST_SUCCESS = 'pldt/post/fetch/success'
type FETCH_POST_PENDING = 'pldt/post/fetch/pending'
type FETCH_POST_FAILED = 'pldt/post/fetch/failed'
export const FETCH_POST_SUCCESS: FETCH_POST_SUCCESS = 'pldt/post/fetch/success'
export const FETCH_POST_PENDING: FETCH_POST_PENDING = 'pldt/post/fetch/pending'
export const FETCH_POST_FAILED: FETCH_POST_FAILED = 'pldt/post/fetch/failed'

export class FetchPostPending extends BaseAction implements Action {
	public readonly type = FETCH_POST_PENDING
}

export class FetchPostSuccess extends BaseAction implements Action {
	public readonly type = FETCH_POST_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class FetchPostFailed extends BaseAction implements Action {
	public readonly type = FETCH_POST_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Post Detail
 */
type FETCH_POST_DETAIL_SUCCESS = 'pldt/postDetail/fetch/success'
type FETCH_POST_DETAIL_PENDING = 'pldt/postDetail/fetch/pending'
type FETCH_POST_DETAIL_FAILED = 'pldt/postDetail/fetch/failed'
export const FETCH_POST_DETAIL_SUCCESS: FETCH_POST_DETAIL_SUCCESS = 'pldt/postDetail/fetch/success'
export const FETCH_POST_DETAIL_PENDING: FETCH_POST_DETAIL_PENDING = 'pldt/postDetail/fetch/pending'
export const FETCH_POST_DETAIL_FAILED: FETCH_POST_DETAIL_FAILED = 'pldt/postDetail/fetch/failed'

export class FetchPostDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_POST_DETAIL_PENDING
}

export class FetchPostDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_POST_DETAIL_SUCCESS
	constructor(public payload: any) {
		super()
	}
}

export class FetchPostDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_POST_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Expertise REVIEWList
 */
type FETCH_EXPERTISE_REVIEW_SUCCESS = 'pldt/expertiseReviewList/fetch/success'
type FETCH_EXPERTISE_REVIEW_PENDING = 'pldt/expertiseReviewList/fetch/pending'
type FETCH_EXPERTISE_REVIEW_FAILED = 'pldt/expertiseReviewList/fetch/failed'
export const FETCH_EXPERTISE_REVIEW_SUCCESS: FETCH_EXPERTISE_REVIEW_SUCCESS = 'pldt/expertiseReviewList/fetch/success'
export const FETCH_EXPERTISE_REVIEW_PENDING: FETCH_EXPERTISE_REVIEW_PENDING = 'pldt/expertiseReviewList/fetch/pending'
export const FETCH_EXPERTISE_REVIEW_FAILED: FETCH_EXPERTISE_REVIEW_FAILED = 'pldt/expertiseReviewList/fetch/failed'

export class FetchExpertiseReviewPending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_REVIEW_PENDING
}

export class FetchExpertiseReviewSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_REVIEW_SUCCESS
	constructor(public payload: any) {
		super()
	}
}

export class FetchExpertiseReviewFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_REVIEW_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Expertise Review Detail
 */
type FETCH_EXPERTISE_REVIEW_DETAIL_SUCCESS = 'pldt/expertiseReviewDetail/fetch/success'
type FETCH_EXPERTISE_REVIEW_DETAIL_PENDING = 'pldt/expertiseReviewDetail/fetch/pending'
type FETCH_EXPERTISE_REVIEW_DETAIL_FAILED = 'pldt/expertiseReviewDetail/fetch/failed'
export const FETCH_EXPERTISE_REVIEW_DETAIL_SUCCESS: FETCH_EXPERTISE_REVIEW_DETAIL_SUCCESS = 'pldt/expertiseReviewDetail/fetch/success'
export const FETCH_EXPERTISE_REVIEW_DETAIL_PENDING: FETCH_EXPERTISE_REVIEW_DETAIL_PENDING = 'pldt/expertiseReviewDetail/fetch/pending'
export const FETCH_EXPERTISE_REVIEW_DETAIL_FAILED: FETCH_EXPERTISE_REVIEW_DETAIL_FAILED = 'pldt/expertiseReviewDetail/fetch/failed'

export class FetchExpertiseReviewDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_REVIEW_DETAIL_PENDING
}

export class FetchExpertiseReviewDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_REVIEW_DETAIL_SUCCESS
	constructor(public payload: any) {
		super()
	}
}

export class FetchExpertiseReviewDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_REVIEW_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}



/**
 * Create Event
 */
type CREATE_EVENT_SUCCESS = 'pldt/event/create/success'
type CREATE_EVENT_PENDING = 'pldt/event/create/pending'
type CREATE_EVENT_FAILED = 'pldt/event/create/failed'
export const CREATE_EVENT_SUCCESS: CREATE_EVENT_SUCCESS = 'pldt/event/create/success'
export const CREATE_EVENT_PENDING: CREATE_EVENT_PENDING = 'pldt/event/create/pending'
export const CREATE_EVENT_FAILED: CREATE_EVENT_FAILED = 'pldt/event/create/failed'

export class CreateEventPending extends BaseAction implements Action {
	public readonly type = CREATE_EVENT_PENDING
}

export class CreateEventSuccess extends BaseAction implements Action {
	public readonly type = CREATE_EVENT_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class CreateEventFailed extends BaseAction implements Action {
	public readonly type = CREATE_EVENT_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Event Update
 */
type EVENT_UPDATE_SUCCESS = 'pldt/eventupdate/fetch/success'
type EVENT_UPDATE_PENDING = 'pldt/eventupdate/fetch/pending'
type EVENT_UPDATE_FAILED = 'pldt/eventupdate/fetch/failed'
export const EVENT_UPDATE_SUCCESS: EVENT_UPDATE_SUCCESS = 'pldt/eventupdate/fetch/success'
export const EVENT_UPDATE_PENDING: EVENT_UPDATE_PENDING = 'pldt/eventupdate/fetch/pending'
export const EVENT_UPDATE_FAILED: EVENT_UPDATE_FAILED = 'pldt/eventupdate/fetch/failed'

export class EventUpdatePending extends BaseAction implements Action {
	public readonly type = EVENT_UPDATE_PENDING
}

export class EventUpdateSuccess extends BaseAction implements Action {
	public readonly type = EVENT_UPDATE_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class EventUpdateFailed extends BaseAction implements Action {
	public readonly type = EVENT_UPDATE_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Event
 */
type FETCH_EVENT_SUCCESS = 'pldt/event/fetch/success'
type FETCH_EVENT_PENDING = 'pldt/event/fetch/pending'
type FETCH_EVENT_FAILED = 'pldt/event/fetch/failed'
export const FETCH_EVENT_SUCCESS: FETCH_EVENT_SUCCESS = 'pldt/event/fetch/success'
export const FETCH_EVENT_PENDING: FETCH_EVENT_PENDING = 'pldt/event/fetch/pending'
export const FETCH_EVENT_FAILED: FETCH_EVENT_FAILED = 'pldt/event/fetch/failed'

export class FetchEventPending extends BaseAction implements Action {
	public readonly type = FETCH_EVENT_PENDING
}

export class FetchEventSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EVENT_SUCCESS

	constructor(public payload: EventRecord) {
		super()
	}
}

export class FetchEventFailed extends BaseAction implements Action {
	public readonly type = FETCH_EVENT_FAILED

	constructor(public payload: any) {
		super()
	}
}


/**
 * Fetch Event Detail
 */
type FETCH_EVENT_DETAIL_SUCCESS = 'pldt/eventdetail/fetch/success'
type FETCH_EVENT_DETAIL_PENDING = 'pldt/eventdetail/fetch/pending'
type FETCH_EVENT_DETAIL_FAILED = 'pldt/eventdetail/fetch/failed'
export const FETCH_EVENT_DETAIL_SUCCESS: FETCH_EVENT_DETAIL_SUCCESS = 'pldt/eventdetail/fetch/success'
export const FETCH_EVENT_DETAIL_PENDING: FETCH_EVENT_DETAIL_PENDING = 'pldt/eventdetail/fetch/pending'
export const FETCH_EVENT_DETAIL_FAILED: FETCH_EVENT_DETAIL_FAILED = 'pldt/eventdetail/fetch/failed'

export class FetchEventDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_EVENT_DETAIL_PENDING
}

export class FetchEventDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EVENT_DETAIL_SUCCESS

	constructor(public payload: EventRecord) {
		super()
	}
}

export class FetchEventDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_EVENT_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Community List
 */
type FETCH_COMMUNITY_SUCCESS = 'pldt/community/fetch/success'
type FETCH_COMMUNITY_PENDING = 'pldt/community/fetch/pending'
type FETCH_COMMUNITY_FAILED = 'pldt/community/fetch/failed'
export const FETCH_COMMUNITY_SUCCESS: FETCH_COMMUNITY_SUCCESS = 'pldt/community/fetch/success'
export const FETCH_COMMUNITY_PENDING: FETCH_COMMUNITY_PENDING = 'pldt/community/fetch/pending'
export const FETCH_COMMUNITY_FAILED: FETCH_COMMUNITY_FAILED = 'pldt/community/fetch/failed'

export class FetchCommunityPending extends BaseAction implements Action {
	public readonly type = FETCH_COMMUNITY_PENDING
}

export class FetchCommunitySuccess extends BaseAction implements Action {
	public readonly type = FETCH_COMMUNITY_SUCCESS

	constructor(public payload: CommunityRecord) {
		super()
	}
}

export class FetchCommunityFailed extends BaseAction implements Action {
	public readonly type = FETCH_COMMUNITY_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Community Detail
 */
type FETCH_COMMUNITY_DETAIL_SUCCESS = 'pldt/CommunityDetail/fetch/success'
type FETCH_COMMUNITY_DETAIL_PENDING = 'pldt/CommunityDetail/fetch/pending'
type FETCH_COMMUNITY_DETAIL_FAILED = 'pldt/CommunityDetail/fetch/failed'
export const FETCH_COMMUNITY_DETAIL_SUCCESS: FETCH_COMMUNITY_DETAIL_SUCCESS = 'pldt/CommunityDetail/fetch/success'
export const FETCH_COMMUNITY_DETAIL_PENDING: FETCH_COMMUNITY_DETAIL_PENDING = 'pldt/CommunityDetail/fetch/pending'
export const FETCH_COMMUNITY_DETAIL_FAILED: FETCH_COMMUNITY_DETAIL_FAILED = 'pldt/CommunityDetail/fetch/failed'

export class FetchCommunityDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_COMMUNITY_DETAIL_PENDING
}

export class FetchCommunityDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_COMMUNITY_DETAIL_SUCCESS
	constructor(public payload: CommunityRecord) {
		super()
	}
}

export class FetchCommunityDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_COMMUNITY_DETAIL_FAILED

	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch Community Update
 */
type COMMUNITY_UPDATE_SUCCESS = 'pldt/communityupdate/fetch/success'
type COMMUNITY_UPDATE_PENDING = 'pldt/communityupdate/fetch/pending'
type COMMUNITY_UPDATE_FAILED = 'pldt/communityupdate/fetch/failed'
export const COMMUNITY_UPDATE_SUCCESS: COMMUNITY_UPDATE_SUCCESS = 'pldt/communityupdate/fetch/success'
export const COMMUNITY_UPDATE_PENDING: COMMUNITY_UPDATE_PENDING = 'pldt/communityupdate/fetch/pending'
export const COMMUNITY_UPDATE_FAILED: COMMUNITY_UPDATE_FAILED = 'pldt/communityupdate/fetch/failed'

export class CommunityUpdatePending extends BaseAction implements Action {
	public readonly type = COMMUNITY_UPDATE_PENDING
}

export class CommunityUpdateSuccess extends BaseAction implements Action {
	public readonly type = COMMUNITY_UPDATE_SUCCESS

	constructor(public payload: any) {
		super()
	}
}

export class CommunityUpdateFailed extends BaseAction implements Action {
	public readonly type = COMMUNITY_UPDATE_FAILED

	constructor(public payload: any) {
		super()
	}
}


export type Actions =
	| AuthenticateUserSuccess
	| AuthenticateUserPending
	| AuthenticateUserFailed
	| RemoveUser
	| FetchUserSuccess
	| FetchUserPending
	| FetchUserFailed
	| FetchUserDetailSuccess
	| FetchUserDetailPending
	| FetchUserDetailFailed
	| UpdateUserDetailSuccess
	| UpdateUserDetailPending
	| UpdateUserDetailFailed
	| FetchContestsPending
	| FetchContestsSuccess
	| FetchContestsFailed
	| FetchContestDetailSuccess
	| FetchContestDetailPending
	| FetchContestDetailFailed
	| UpdateContestDetailSuccess
	| UpdateContestDetailPending
	| UpdateContestDetailFailed
	| FetchEntriesJudgeSuccess
	| FetchEntriesJudgePending
	| FetchEntriesJudgeFailed
	| FetchEntriesContestantsSuccess
	| FetchEntriesContestantsPending
	| FetchEntriesContestantsFailed
	| FetchPageSuccess
	| FetchPagePending
	| FetchPageFailed
	| FetchPageDetailSuccess
	| FetchPageDetailPending
	| FetchPageDetailFailed
	| PageUpdateSuccess
	| PageUpdatePending
	| PageUpdateFailed
	| FetchPageDeleteSuccess
	| FetchPageDeletePending
	| FetchPageDeleteFailed
	| CreatePageSuccess
	| CreatePagePending
	| CreatePageFailed
	| FetchUserActivitiesSuccess
	| FetchUserActivitiesPending
	| FetchUserActivitiesFailed
	| FetchApplicationsSuccess
	| FetchApplicationsPending
	| FetchApplicationsFailed
	| FetchEntriesSuccess
	| FetchEntriesPending
	| FetchEntriesFailed
	| FetchExpertiseSuccess
	| FetchExpertisePending
	| FetchExpertiseFailed
	| FetchExpertiseDetailSuccess
	| FetchExpertiseDetailPending
	| FetchExpertiseDetailFailed
	| FetchExpertSuccess
	| FetchExpertPending
	| FetchExpertFailed
	| FetchExpertDetailSuccess
	| FetchExpertDetailPending
	| FetchExpertDetailFailed
	| FetchExpertiseOrderPending
	| FetchExpertiseOrderSuccess
	| FetchExpertiseOrderFailed
	| FetchExpertiseOrderDetailPending
	| FetchExpertiseOrderDetailSuccess
	| FetchExpertiseOrderDetailFailed
	| FetchProjectsPending
	| FetchProjectsSuccess
	| FetchProjectsFailed
	| FetchProjectsDetailPending
	| FetchProjectsDetailSuccess
	| FetchProjectsDetailFailed
	| FetchPostPending
	| FetchPostSuccess
	| FetchPostFailed
	| FetchPostDetailPending
	| FetchPostDetailSuccess
	| FetchPostDetailFailed
	| FetchExpertiseReviewPending
	| FetchExpertiseReviewSuccess
	| FetchExpertiseReviewFailed
	| FetchExpertiseReviewDetailPending
	| FetchExpertiseReviewDetailSuccess
	| FetchExpertiseReviewDetailFailed
	| FetchExpertiseOrderAttachmentPending
	| FetchExpertiseOrderAttachmentSuccess
	| FetchExpertiseOrderAttachmentFailed
	| FetchTransactionDetailPending
	| FetchTransactionDetailSuccess
	| FetchTransactionDetailFailed
	| CreateEventPending
	| CreateEventFailed
	| CreateEventSuccess
	| FetchEventDetailFailed
	| FetchEventDetailPending
	| FetchEventDetailSuccess
	| FetchEventFailed
	| FetchEventPending
	| FetchEventSuccess
	| EventUpdateFailed
	| EventUpdatePending
	| EventUpdateSuccess
	| FetchCommunityPending
	| FetchCommunityFailed
	| FetchCommunitySuccess
	| FetchCommunityDetailPending
	| FetchCommunityDetailFailed
	| FetchCommunityDetailSuccess
	| CommunityUpdatePending
	| CommunityUpdateFailed
	| CommunityUpdateSuccess