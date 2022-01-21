import { doFetchUsers } from '../actions/usersList'
import { doFetchCommunity } from '../actions/community'
import { doFetchContests } from '../actions/contests'

export const userPreferredRoles = [
	{ value: 'expert', label: 'Expert'},
	{ value: 'creator', label: 'Creator'},
	{ value: 'investor', label: 'Investor'}
]

export const userCapabilities = [
	{ value: 'admin', label: 'Admin'},
	{ value: 'event', label: 'Event Organizer'},
	{ value: 'contest', label: 'Contest Organizer'}
]

export const userGenderOptions = [
	{ value: 'na', label: 'N/A' },
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' }
]

export const currencySelectOption = [
	{value: 'hbs', label: 'HBS'},
	{value: 'hbb', label: 'HBB'},
	{value: 'usd', label: 'USD'}
]

export const transactionTypeSelectOptions = [
	{value: 'token-purchase', label: 'Token Purchase'},
	{value: 'contestant-reward', label: 'Contestant Reward'},
	{value: 'judge-earnings', label: 'Awards Judge Earnings'},
	{value: 'expertise', label: 'Expertise Earnings'}
]

export const transactionStatusSelectOptions = [
	{value: 'PENDING', label: 'Pending'},
	{value: 'COMPLETED', label: 'Completed'},
	{value: 'REVOKED', label: 'Revoked'}
]

export const productCategories = [
	{value: 'audio', label: 'Audio'},
	{value: 'clothing-and-apparel', label: 'Clothing and apparel'},
	{value: 'electronics', label: 'Electronics'},
	{value: 'fitness', label: 'Fitness'},
	{value: 'health-beauty', label: 'Health & Beauty'},
	{value: 'household-appliances', label: 'Household Appliances'},
	{value: 'indoor-games', label: 'Indoor Games'},
	{value: 'kitchen-dining', label: 'Kitchen & Dining'},
	{value: 'lawn-garden', label: 'Lawn & Garden'},
	{value: 'luggage-and-travel', label: 'Luggage and Travel'},
	{value: 'outdoor-recreation', label: 'Outdoor Recreation'},
	{value: 'personal-care', label: 'Personal Care'},
	{value: 'pet-supplies', label: 'Pet Supplies'},
	{value: 'vehicle-parts-accessories', label: 'Vehicle Parts & Accessories'},
	{value: 'furniture', label: 'Furniture'}
]

export const innovationCategories = [
	{value: 'connected', label: 'Connected'},
	{value: 'artistic-design', label: 'Artistic Design'},
	{value: 'eco-friendly', label: 'Eco friendly'},
	{value: 'low-cost', label: 'Low cost'},
	{value: 'unusual-materials', label: 'Unusual materials'},
	{value: 'new-hitech-materials', label: 'New Hitech materials'},
	{value: 'new-function', label: 'New function'},
	{value: 'other-function', label: 'Other function'}
]

export const investmentGoals = [
	{value: 'good-return', label: 'Good return on investment'},
	{value: 'new-business', label: 'New business Opportunities'},
	{value: 'great-teams', label: 'Network with great minds & great terms'}
]

export const languages = [
	{
		label: 'English',
		value: 'en'
	}, {
		label: 'Chinese',
		value: 'zh'
	}, {
		label: 'German',
		value: 'de'
	}, {
		label: 'Spanish',
		value: 'es'
	}, {
		label: 'Italian',
		value: 'it'
	}, {
		label: 'polish',
		value: 'pl'
	}
]

export const languageExperienceLevel = [
	{
		label: 'Beginner',
		value: 'beginner'
	}, {
		label: 'Conversational',
		value: 'conversational'
	}, {
		label: 'Business',
		value: 'business'
	}, {
		label: 'Fluent',
		value: 'fluent'
	}
]

export const contactTimes = [
	{value: '24', label: 'Anytime'},
	{value: '9-6', label: 'Working hours (9am to 6pm)'},
	{value: '6-9', label: 'Evening time (6pm to 9pm)'}
]

export const availabilityScopeOptions = [
	{value: 'fulltime', label: 'Full time'},
	{value: 'parttime', label: 'Part time'}
]

export const availabilityTimeOptions = [
	{value: '10', label: 'less than 10 hours'},
	{value: '10-20', label: '10 - 20 hours'},
	{value: '20-30', label: '20 - 30 hours'},
	{value: '30-40', label: '30 - 40 hours'},
	{value: '40', label: 'more than 40 hours'}
]

export const availabilityPriceOptions = [
	{value: '100', label: 'less than $100'},
	{value: '100-500', label: '$100 - $50'},
	{value: '500-1000', label: '$500 - $1000'},
	{value: '1000', label: 'more than $1000'}
]

export const eductionDegreeTypeOptions = [
	{value: 'a-a', label: 'A.A.'},
	{value: 'a-s', label: 'A.S.'},
	{value: 'aas', label: 'AAS'},
	{value: 'b-a', label: 'B.A.'},
	{value: 'b-s', label: 'B.S.'},
	{value: 'bfa', label: 'BFA'},
	{value: 'bas', label: 'BAS'},
	{value: 'm-a', label: 'M.A.'},
	{value: 'm-s', label: 'M.S.'},
	{value: 'mba', label: 'MBA'},
	{value: 'mfa', label: 'MFA'},
	{value: 'ph-d', label: 'Ph.D.'},
	{value: 'j-d', label: 'J.D.'},
	{value: 'm-d', label: 'M.D.'},
	{value: 'dds', label: 'DDS'}
]

export const ExpertiseCategoryOption = [
	{_id: '5aff90929477100015b2bb7c', name: 'Brainstorming',
		__v: 0, createdAt: '2018-05-19T02:48:50.605Z', updatedAt: '2018-05-21T08:26:18.926Z'},
	{_id: '5aff90929477100015b2bb7d', name: 'Design',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.927Z'},
	{_id: '5aff90929477100015b2bb7e', name: 'Legal',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.927Z'},
	{_id: '5aff90929477100015b2bb81', name: 'Sales and Distribution',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.927Z'},
	{_id: '5aff90929477100015b2bb82', name: 'Marketing',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.927Z'},
	{_id: '5aff90929477100015b2bb86', name: 'Social media',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.927Z'},
	{_id: '5aff90929477100015b2bb87', name: 'Project management',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.928Z'},
	{_id: '5aff90929477100015b2bb8b', name: 'Fundraising',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.928Z'},
	{_id: '5aff90929477100015b2bb83', name: 'Packaging',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.927Z'},
	{_id: '5aff90929477100015b2bb7f', name: 'Prototyping',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.927Z'},
	{_id: '5aff90929477100015b2bb88', name: 'Crowdfunding',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.928Z'},
	{_id: '5aff90929477100015b2bb84', name: 'Web & APP',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.927Z'},
	{_id: '5aff90929477100015b2bb89', name: 'Purchasing',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.928Z'},
	{_id: '5aff90929477100015b2bb80', name: 'Manufacturing',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.927Z'},
	{_id: '5aff90929477100015b2bb85', name: 'Communication',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.927Z'},
	{_id: '5aff90929477100015b2bb8a', name: 'Logistic',
		__v: 0, createdAt: '2018-05-19T02:48:50.606Z', updatedAt: '2018-05-21T08:26:18.928Z'}
]

export const educationDegreeYearsOptions = () => {
	return new Promise<any>((resolve) => {

		const years = []

		for (let i = new Date().getFullYear(); i >= 1950; i--) {
			years.push({id: i, name: i.toString()})
		}

		resolve({options: years})
	})
}

export const countries = require('../data/countries.json').countries
export const nationalityCountries = require('../data/countries.json').countries.filter((c: any) => c.value !== '--')

export const getUsersSelectOptions = () => {
	return new Promise<any>((resolve: any, reject: any) => {
		return doFetchUsers()
			.then(users => resolve({options: users}))
			.catch(error => reject(error))
	})
}
export const getContestSelectOptions = () => {
	return new Promise<any>((resolve: any, reject: any) => {
		return doFetchContests()
			.then(contests => resolve({options: contests}))
			.catch(error => reject(error))
	})
}
export const getCommunitySelectOptions = () => {
	return new Promise<any>((resolve: any, reject: any) => {
		return doFetchCommunity()
			.then(communities => resolve({options: communities}))
			.catch(error => reject(error))
	})
}