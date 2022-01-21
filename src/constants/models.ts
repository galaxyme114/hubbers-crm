// Model interfaces
import { Currency, InputType, QuestionTypes, VideoService } from './enums'
import { UserRecord } from '../interfaces/user'

// export interface UserRecord {
// 	id: number
// 	thumbnailImageUrl: string
// 	thumbnail_image_url: string
// 	thumbnail_url: string
// 	thumbnail: string
// 	name: string
// 	last_name: string
// 	email: string
// 	role: string
// 	firstName: string
// 	lastName: string
// 	displayName: string
// 	full_name: string
// 	balance: number
// 	shares: number
// 	country_origin: string
// 	linkedin: string
// 	facebook: string
// 	twitter: string
// 	is_site_investor: boolean
// 	contact_time: string
// 	updated_at: string
// 	bio: string
// 	innovations: any[]
// 	products: any[]
// 	judging: any[]
// 	contesting: any[]
// }

export interface ProfileRecord extends UserRecord {
	contact_number: number
	bio: string
	position: string
	address: string
	products: any
	innovations: any
	creator: any
	expert: any
	investor: any
	skills: ReadonlyArray<SkillRecord>
	expertise_categories: ReadonlyArray<ExpertiseCategoryRecord>
	follower_count: number
	following_count: number
	created_at: string
	activities: any
	projects: any
	contests: any
	user_roles: any
}

export interface ProjectRecord {
	_id: string
	shortId: string
	userId: number
	name: string
	slug: string
	description: string
	productCategory: any
	innovationCategory: any
	market: string
	price: number
	geography: string
	language: string
	featuredImageUrl: string
	gallery?: string[],
	display: number
	isDraft: boolean
	state: number
	created_at: string
	likesCount: number
	shares: number
	views: number
	pldt_session: string
	value: any
	label: any
}

export interface PostRecord {
	gallery?: string[],
	likes: any,
	_id: string,
	userId: number,
	body: string,
	isDraft: false,
	shortId: string,
	comments: any,
	user: any
}

export interface SkillRecord {
	id: number
	name: string
	description: string
}

export interface ExpertiseCategoryRecord {
	_id: string
	name: string
	description: string
}

// export interface ContestRecord {
// 	id: number
// 	shortId: string
// 	status: number
// 	featuredImageUrl: string
// 	name: string
// 	description: string
// 	market: string
// 	rules: string
// 	duration: number
// 	visible: number
// 	views: number
// 	shares: number
// 	likes_count: number
// 	numContestants: number
// 	numJudges: number
// 	followers_count: number
// 	isDraft: boolean
// 	judges: [any]
// 	contestants: [any]
// 	startTime: string
// 	end_time: string
// 	prizes: [any]
// 	start_timestamp: number
// 	end_timestamp: number
// 	member_application: any
// 	innovationCategory: string
// 	productCategory: string
// 	criteria: CriteriaRecord[]
// }

export interface ContestRecord {
	_id: string
	name: string
	shortId?: string
	slug: string
	featuredImageUrl: string
	description: string
	market: string
	rules: string
	startTime: any
	endTime: any
	numContestants: number
	numJudges: number
	prizes: any
	duration: number
	geography: string
	budget: number
	views: number
	likes: number[]
	innovationCategory: string
	productCategory: string
	shares: number
	allowJudgeSignup: boolean
	allowContestantSignup: boolean
	isDraft: boolean
	memberApplication: any
	contestants: [ContestantApplicationRecord]
	judges: [JudgeApplicationRecord]
	entries: any
	criteria?: any
}

export interface JudgeApplicationRecord {
	user: string | UserRecord
	isActive: boolean
	currentRank?: number
	previousRank?: number
	createdAt?: string
	updatedAt?: string
	isJudgeOpen?: boolean
}

export interface ContestantApplicationRecord {
	user: string | UserRecord
	isActive: boolean
	currentRank?: number
	previousRank?: number
	createdAt?: string
	updatedAt?: string
	isContestantOpen?: boolean
}

export interface CriteriaRecord {
	title: string,
	body: string
}

export interface ExpertiseRecord {
	gallery?: string[],
	name: string,
	slug: string,
	featuredImageUrl: string,
	about: string,
	category:string,
	isDraft: boolean,
	_id: string,
	tags: string[]
	// expert: ReadonlyArray<ExpertRecord>,
	shortId: string,
	faq: FAQRecord[]
	expert: ExpertRecord
	packages?: PackageRecord[]
	briefTemplate: BriefTemplateRecord
	email: string,
	userId: number
}

export interface ExpertiseReviewRecord {
	body: string
	_id: string,
	userId: number,
	rating: number,
	userInfo: UserRecord
}

export interface FAQRecord {
	title: string
	answer: string
}

export interface PackageRecord {
	_id?: string
	name: string
	price: number
	currency: Currency
	description: string
	availability: string
	delivery: number
}

export interface BriefTemplateRecord {
	nda: boolean
	attachments: boolean
	additionalInfo: boolean
	fields: [BriefTemplateFieldRecord]
	version: number
}

export interface BriefTemplateFieldRecord {
	name: any
	formType: any
}

export interface ExpertiseOrderRecord {
	completed: boolean,
	_id: string,
	userId: number,
	project: string,
	expertise: [any],
	selectedPackage: string,
	sku: string,
	offers: [any],
	conversation: [any],
	briefData:  any
}

// export interface ProjectRecord {
// 	value: any,
// 	label: any
// }

export interface OrderBriefDataFieldRecord {
	name: string,
	value: string
	formType: string
}

export interface ExpertRecord {
	id: number,
	name: string,
	description: string,
	rating: number,
	reviews: number,
	skills: ReadonlyArray<SkillRecord>,
	categories: ReadonlyArray<ExpertiseCategoryRecord>,
	_id: string,
	userId: number,
	languages: [any],
	education: [any],
	caption: string,
	user: ReadonlyArray<UserRecord>
	hourlyRate: string,
	hoursToWorkWeek: string,
	hoursToWorkWeekToken: string,
	availabilityScope: string,
	availabilityTime: string,
	availabilityPrice: string
}

export interface PageRecord {
	id: number
	title: string
	slug: string
	content: string
}

export interface OrderRecord {
	shortId: string
	tokens: number
	method: string
	amount: number
	referral: UserRecord
	priorityHBSConversion: boolean
	status: string
}

export interface ApplicationsRecord {
	id: number
	contestant_id: number
	judge_id: number
	contest_id: number
	current_rank: number
	previous_rank: number
	status: number
	created_at: string
	updated_at: string
	contestant: any
	judge: any
	contest: any
}

export interface LanguageRecord {
	language: string
	level: string
}

export interface EducationRecord {
	country: string
	name: string
	title: string
	degree: string
	year: number
}

export interface orderOffersRecord {
	breakdown: [any]
	currency: string
	name: string
	selected: boolean
	_id: string
}

export interface EntriesRecord {
	_id: string
	contestant_id: number
	contest_id: number
	thumbnail: string
	name: string
	title: string
	created_at: string
	updated_at: string
	marked_at: string
	descriptionDesign: string
	descriptionFunctionality: string
	descriptionUsability: string
	descriptionMarketPotential: string
	isDraft: boolean
	revision: number
	messages: any
	contestant: any
	revisions: any
	ratings: any
	avg_data: any
	attachments: any
	design: number
	designComment: string
	usability: number
	usabilityComment: string
	functionality: number
	functionalityComment: string
	marketPotential: number
	marketPotentialComment: string
}

export interface ContestEntryAttachmentRecord {
	caption: string
	previewUrl: any
	title: string
	_id: string
}

export interface TransactionRecord {
	txId?: string
	userId?: number
	amount: number
	currency: string
	usdAmount: number
	type: string
	status: string // pending; completed; revoked
	silent: boolean
}

export interface EventSpeakerRecord {
	name: string
	thumbnailImageUrl: string
	position: string
	bio: string
}

export interface EventScheduleRecord {
	time: string
	description: string
}
interface IndexSignature {
	[key: string]: any
}
export interface EventRecord extends IndexSignature {
	name: string
	description: string
	country: string
	address: string
	date: string
	time: string
	speakers: EventSpeakerRecord[]
	map: string
	agenda: string
	schedule: EventScheduleRecord[]
	attending: string[]
	community: string[]
}
export interface CommunityRecord {
	name: string
	shortId: string
	country: string
	city: string
	facilitators: CommunityFacilitatorRecord[]
	featuredImageUrl?: string
	numConsultants: string
	socialMediaTags: string[]
	partners: string[]
	tags: string[]
}
export interface CommunityFacilitatorRecord {
	availability: string
	user: string[]
}