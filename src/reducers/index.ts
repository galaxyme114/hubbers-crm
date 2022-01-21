import { reducer as ApplicationsList, State as ApplicationsListState } from './applications'
import { reducer as authenticate, State as AuthenticateState } from './authenticate'
import { reducer as ContestDetail, State as ContestDetailState } from './contestDetail'
import { reducer as ContestsList, State as ContestListState } from './contests'
import { reducer as EntriesDetail, State as EntriesDetailState } from './entries'
import { reducer as ExpertList, State as ExpertListState } from './expert'
import { reducer as ExpertDetail, State as ExpertDetailState } from './expertDetail'
import { reducer as ExpertiseList, State as ExpertiseListState } from './expertise'
import { reducer as ExpertiseDetail, State as ExpertiseDetailState } from './expertiseDetail'
import { reducer as ExpertiseOrderAttachmentList,
	State as ExpertiseOrderAttachmentState } from './expertiseOrderAttachmentList'
import { reducer as ExpertiseOrderDetail, State as ExpertiseOrderDetailState } from './expertiseOrderDetail'
import { reducer as ExpertiseOrderList, State as ExpertiseOrderState } from './expertiseOrderList'
import { reducer as ExpertiseReviewDetail, State as ExpertiseReviewDetailState } from './expertiseReviewDetail'
import { reducer as ExpertiseReviewList, State as ExpertiseReviewState } from './expertiseReviewList'
import { reducer as PageDetail, State as PageDetailState } from './pageDetail'
import { reducer as PagesList, State as PagesListState } from './pages'
import { reducer as PostList, State as PostListState } from './post'
import { reducer as PostDetail, State as PostDetailState } from './postDetail'
import { reducer as ProjectsList, State as ProjectsListState } from './projects'
import { reducer as ProjectsDetail, State as ProjectsDetailState } from './projectsDetail'
import { reducer as transactionDetail, State as TransactionDetailState } from './transactionDetail'
import { reducer as UserDetail, State as UserDetailState } from './userDetail'
import { reducer as UsersList, State as UsersListState } from './usersList'
import { reducer as EventDetail, State as EventDetailState } from './eventDetail'
import { reducer as EventsList, State as EventsListState } from './event'
import { reducer as CommunityDetail, State as CommunityDetailState } from './communityDetail'
import { reducer as CommunityList, State as CommunityListState } from './community'

export interface RootState {
	authenticate: AuthenticateState
	UsersList: UsersListState
	UserDetail: UserDetailState
	ContestsList: ContestListState
	ContestDetail: ContestDetailState
	PagesList: PagesListState
	PageDetail: PageDetailState
	ApplicationsList: ApplicationsListState
	EntriesDetail: EntriesDetailState
	ExpertiseList: ExpertiseListState
	ExpertiseDetail: ExpertiseDetailState
	ExpertList: ExpertListState
	ExpertDetail: ExpertDetailState
	ExpertiseOrderList: ExpertiseOrderState
	ExpertiseOrderDetail: ExpertiseOrderDetailState
	ExpertiseReviewList: ExpertiseReviewState
	ExpertiseReviewDetail: ExpertiseReviewDetailState
	ProjectsList: ProjectsListState
	ProjectsDetail: ProjectsDetailState
	PostList: PostListState
	PostDetail: PostDetailState
	ExpertiseOrderAttachmentList: ExpertiseOrderAttachmentState
	transactionDetail: TransactionDetailState
	EventsList: EventsListState
	EventDetail: EventDetailState
	CommunityList: CommunityListState
	CommunityDetail: CommunityDetailState
}

export const rootReducer = {
	authenticate,
	UsersList,
	UserDetail,
	ContestsList,
	ContestDetail,
	PagesList,
	PageDetail,
	ApplicationsList,
	EntriesDetail,
	ExpertiseList,
	ExpertiseDetail,
	ExpertList,
	ExpertDetail,
	ExpertiseOrderList,
	ExpertiseOrderDetail,
	ExpertiseReviewList,
	ExpertiseReviewDetail,
	ProjectsList,
	ProjectsDetail,
	PostList,
	PostDetail,
	ExpertiseOrderAttachmentList,
	transactionDetail,
	EventsList,
	EventDetail,
	CommunityList,
	CommunityDetail
}
