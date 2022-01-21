interface IndexSignature {
	[key: string]: any
}

export interface UserRecord extends IndexSignature {
	_id: string
	thumbnailImageUrl: string
	name: string
	lastName: string
	email: string
	preferredRole: string
	capabilities: string[]
	phoneNumber: string
	phoneNumberCountryCode: string
	resetPasswordToken: string
	gender: string
	dob: string
	bio: string
	headline: string
	industry: string
	legacyId: string
	linkedinId: string
	locations: UserLocationRecord[]
	languages: UserLanguageRecord[]
	positions: UserPositionRecord[]
	education: UserEducationRecord[]
}

export interface UserLocationRecord {
	_id: string
	country: string
	state: string
	city: string
	pin: string
	name: string
	isPrimary: boolean
}

export interface UserLanguageRecord {
	language: string
	level: string
}

export interface UserPositionRecord {
	_id: string
	title: string
	isCurrent: boolean
	locationCountry: string
	locationState: string
	locationCity: string
	companyName: string
	companyType: string
	companyIndustry: string
	companySize: string
	startDate: string
	endDate: string
}

export interface UserEducationRecord {
	_id: string
	country: string
	name: string
	title: string
	degree: string
	year: string
}