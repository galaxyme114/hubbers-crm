import * as moment from 'moment'
import * as React from 'react'
import DateTimePicker from 'react-datetime-picker'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { doAddExpert, doGetSkills, doGetExpertiseCategory } from '../actions/expert'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { ExpertRecord, EducationRecord, LanguageRecord } from '../constants/models'
import { languages, eductionDegreeTypeOptions, educationDegreeYearsOptions, languageExperienceLevel, nationalityCountries, availabilityScopeOptions, availabilityTimeOptions, availabilityPriceOptions } from '../constants/selectOptions'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'
import { slugify } from '../utils/stringUtils'
import Alert from 'react-s-alert'

interface AddExpertProps {
	doAddExpert: any
}

interface AddExpertState {
	userId: string
	hourlyRate: string
	hoursToWorkWeek: string
	hoursToWorkWeekToken: string
	availabilityScope: string
	availabilityTime: string
	availabilityPrice: string
	categories: any[]
	skills: any[]
	languages: LanguageRecord[]
	education: EducationRecord[]
	isRender: boolean
	isCreateExpert: ActionTypeStates
	openAddModel: boolean
}

class AddExpert extends React.Component<AddExpertProps, AddExpertState> {
	constructor(props: AddExpertProps) {
		super(props)
		
		this.state = {
			userId: '',
			hourlyRate: '',
			hoursToWorkWeek: '',
			hoursToWorkWeekToken: '',
			availabilityScope: '',
			availabilityTime: '',
			availabilityPrice: '',
			categories: [],
			skills: [],
			languages: [{ language: '', level: '' }],
			education: [{ country: '', name: '', title: '', degree: '', year: 0 }],
			// isCatChange: null,
			// isSkillChange : null,
			isRender: false,
			isCreateExpert: null,
			openAddModel: null
		}
	}

	public openExpertAddModal() {
		this.setState({
			openAddModel: true
		})
	}

	public render() {
		const { isCreateExpert} = this.state
		return (
			<div className="app">
				<Helmet>
					<title>Expert</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Add Expert</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Add Expert
											</div>
											<div className="card-block">
												{
													(isCreateExpert === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													isCreateExpert !== ActionTypeStates.INPROGRESS && (
													<div className="row">
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>User Id</label>
																<Input
																	name="userId"
																	placeholder="Enter User Id"
																	value={this.state.userId}
																	type={InputType.TEXT}
																	onChange={(userId: any) => {
																		this.setState({userId})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Languages</label>
															</div>
															{
																this.state.languages.length > 0 && this.state.languages.map((l: LanguageRecord, i: number) => (
																<div className="row" key={i} style={{margin: "14px"}}>
																	<div className="col-lg-4">
																		<Input
																			name="language"
																			placeholder="Language"
																			value={l.language}
																			type={InputType.TEXT}
																			onChange={(language: string) => { this.updateLanguage(i, { language }) }}/>
																	</div>
																	<div className="col-lg-4">
																		<Input
																			name="languageExperience"
																			placeholder="Experience"
																			value={l.level}
																			type={InputType.SELECT}
																			options={languageExperienceLevel}
																			simpleValue={true}
																			onChange={(level: string) => { this.updateLanguage(i, { level }) }}/>
																	</div>
																	<div className="col-lg-4">
																		{
																			(i === (this.state.languages.length - 1)) && (
																				<button
																					disabled={!l.language || !l.level}
																					onClick={() => { this.addLanguage() }}
																					className="btn btn-outline">Add</button>
																			)
																		}
																		{
																			(i < (this.state.languages.length - 1)) && (
																				<button
																					onClick={() => { this.removeLanguage(i) }}
																					className="btn btn-outline btn-danger">Remove</button>
																			)
																		}
																	</div>
																</div>
																))
															}
															{
																this.state.languages.length <= 0 &&
																<div style={{marginBottom: "14px"}}>			
																	<button onClick={() => { this.addLanguage() }} className="btn btn-outline">Add Language</button>
																</div>
															}
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Education</label>
															</div>
															{
																this.state.education && this.state.education.map((e: EducationRecord, i: number) => (
																	<div className="row" key={i} style={{margin: "14px"}}>
																		<div className="col-lg-4">
																			<Input
																				name="educationCountry"
																				placeholder="Country"
																				value={e.country}
																				multi={false}
																				type={InputType.SELECT}
																				options={nationalityCountries}
																				simpleValue={true}
																				onChange={(country: string) => { this.updateEducation(i, { country })}}/>
																		</div>
																		<div className="col-lg-4">
																			<Input
																				name="educationName"
																				placeholder="College / University Name"
																				value={e.name}
																				type={InputType.TEXT}
																				onChange={(name: string) => { this.updateEducation(i, { name })}}/>
																		</div>
																		<div className="col-lg-4">
																			<Input
																				name="educationTitle"
																				placeholder="Title"
																				value={e.title}
																				multi={false}
																				type={InputType.SELECT}
																				options={eductionDegreeTypeOptions}
																				simpleValue={true}
																				onChange={(title: string) => { this.updateEducation(i, { title })}}/>
																		</div>
																		<div className="col-lg-4">
																			<Input
																				name="educationDegree"
																				placeholder="Degree"
																				value={e.degree}
																				type={InputType.TEXT}
																				onChange={(degree: string) => { this.updateEducation(i, { degree })}}/>
																		</div>
																		<div className="col-lg-4">
																			<Input
																				name="educationYear"
																				placeholder="Year"
																				value={e.year}
																				multi={false}
																				type={InputType.ASYNC_SELECT}
																				options={() => educationDegreeYearsOptions()}
																				simpleValue={true}
																				onChange={(year: string) => { this.updateEducation(i, { year })}}/>
																		</div>
																		<div className="col-lg-4">
																		{
																			(i === (this.state.education.length - 1)) && (
																				<button
																					// disabled={!e.country || !e.name || !e.title || !e.degree || !e.year}
																					onClick={() => { this.addEducation() }}
																					className="btn btn-outline">Add</button>
																			)
																		}
																		{
																			(i < (this.state.education.length - 1)) && (
																				<button
																					onClick={() => { this.removeEducation(i) }}
																					className="btn btn-outline btn-danger">Remove</button>
																			)
																		}
																	</div>
																	</div>
																))
															}
															{
																this.state.education.length <= 0 &&
																<div style={{marginBottom: "14px"}}>
																	<button onClick={() => { this.addEducation() }} className="btn btn-outline">Add Education</button>
																</div>	
															}
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<Input
																	name="expertiseCategories"
																	value={this.state.categories}
																	type={InputType.ASYNC_SELECT}
																	label="Expertise category you're interested in"
																	placeholder="Select expertise category"
																	options={doGetExpertiseCategory}
																	multi={true}
																	onChange={(categories: any) => { 
																		console.log(categories)
																		this.setState({categories}) 
																	}}/>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<Input
																	name="Skills"
																	value={this.state.skills}
																	type={InputType.ASYNC_SELECT}
																	label="Expertise Skills"
																	placeholder="Select expertise skills"
																	options={doGetSkills}
																	multi={true}
																	onChange={(skills: any) => { 
																		this.setState({skills})
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Hourly Rate</label>
																<Input
																	name="rate"
																	placeholder="Enter HourlyRate"
																	value={this.state.hourlyRate}
																	type={InputType.TEXT}
																	onChange={(hourlyRate: any) => {
																		this.setState({hourlyRate})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Hours To Work Week</label>
																<Input
																	name="hoursToWorkWeek"
																	placeholder="Enter"
																	value={this.state.hoursToWorkWeek}
																	type={InputType.TEXT}
																	onChange={(hoursToWorkWeek: any) => {
																		this.setState({hoursToWorkWeek})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Hours To Work Week Token</label>
																<Input
																	name="reviews"
																	placeholder="Enter hoursToWorkWeekToken"
																	value={this.state.hoursToWorkWeekToken}
																	type={InputType.TEXT}
																	onChange={(hoursToWorkWeekToken: any) => {
																		this.setState({hoursToWorkWeekToken})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Availability Scope</label>
																<Input
																	name="availability scope"
																	placeholder="Select your availability"
																	value={this.state.availabilityScope}
																	multi={false}
																	type={InputType.SELECT}
																	options={availabilityScopeOptions}
																	simpleValue={true}
																	onChange={(availabilityScope: any) => {
																		this.setState({availabilityScope})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Availability Time</label>
																<Input
																	name="availability time"
																	placeholder="Select your availability Time"
																	value={this.state.availabilityTime}
																	multi={false}
																	type={InputType.SELECT}
																	options={availabilityTimeOptions}
																	simpleValue={true}
																	onChange={(availabilityTime: any) => {
																		this.setState({availabilityTime})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Availability Price</label>
																<Input
																	name="availability price"
																	placeholder="Select your availability Price"
																	value={this.state.availabilityPrice}
																	multi={false}
																	type={InputType.SELECT}
																	options={availabilityPriceOptions}
																	simpleValue={true}
																	onChange={(availabilityPrice: any) => {
																		this.setState({availabilityPrice})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openExpertAddModal()}>
																	Add Expert
																</button>
															</div>
														</div>
													</div>
													)
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<SweetAlert
							show={this.state.openAddModel}
							title="Expert Add"
							text="Are you sure you want to Add Expert"
							showCancelButton
							onConfirm={() => { this.doAddExpertDetail() }}
							onCancel={() => { this.setState({ openAddModel: false }) }}
							onEscapeKey={() => this.setState({ openAddModel: false })}
							onOutsideClick={() => this.setState({ openAddModel: false })}
						/>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}

	private doAddExpertDetail() {
		let submitCat=[];
		let submitSkills=[];
		if(this.state.categories.length>0){
			for(const items of this.state.categories){
				submitCat.push(items._id)
			}	
		}

		if(this.state.skills.length>0){
			for(const items of this.state.skills){
				submitSkills.push(items.id)
			}
		}

		const Expert = {
			userId: this.state.userId,
			skills: submitSkills,
			categories: submitCat,
			languages: this.state.languages,
			education: this.state.education,
			hourlyRate: this.state.hourlyRate,
			hoursToWorkWeek: this.state.hoursToWorkWeek,
			hoursToWorkWeekToken: this.state.hoursToWorkWeekToken,
			availabilityScope: this.state.availabilityScope,
			availabilityTime: this.state.availabilityTime,
			availabilityPrice: this.state.availabilityPrice,
		}
		console.log(Expert)
		doAddExpert(Expert).then(() => {
			this.setState({
				isCreateExpert: ActionTypeStates.SUCCESS,
				openAddModel: false,
				userId: '',
				hourlyRate: '',
				hoursToWorkWeek: '',
				hoursToWorkWeekToken: '',
				availabilityScope: '',
				availabilityTime: '',
				availabilityPrice: '',
				languages: [],
				education: [],
				skills: [],
				categories: [],
			})
		}).catch(() => {
			this.setState({ isCreateExpert: ActionTypeStates.FAILED})
		})
	}

	

	/**
	 * Helper function to add a new language record
	 *
	 */
	private addLanguage() {
		this.state.languages.push({ language: '', level: '' })
		this.setState({
			isRender: true
		})
	}

	/**
	 * Helper function to remove a language
	 *
	 * @param {number} index index of the item to remove
	 */
	private removeLanguage(index: number) {
		this.state.languages.splice(index, 1)
		this.setState({
			isRender: true
		})
	}

	/**
	 * Helper function to update the contents of an existing language record
	 *
	 * @param {number} index index of the item to update
	 * @param updatedLanguageObject updated partial language record
	 */
	private updateLanguage(index: number, updatedLanguageObject: any) {
		const languages = this.state.languages
		languages[index] = {...languages[index], ...updatedLanguageObject}
		this.setState({ languages })
	}

	/**
	 * Helper function to add a new language record
	 *
	 */
	private addEducation() {
		this.state.education.push({ country: '',
			name: '',
			title: '',
			degree: '',
			year: 0 })
		this.setState({
			isRender: true
		})
	}

	/**
	 * Helper function to remove a education
	 *
	 * @param {number} index index of the item to remove
	 */
	private removeEducation(index: number) {
		this.state.education.splice(index, 1)
		this.setState({
			isRender: true
		})
	}

	/**
	 * Helper function to update the contents of an existing education record
	 *
	 * @param {number} index index of the item to update
	 * @param updatedEducationObject updated partial education record
	 */
	private updateEducation(index: number, updatedEducationObject: any) {
		const education = this.state.education
		education[index] = {...education[index], ...updatedEducationObject}

		this.setState({ education })
	}
}

const mapStateToProps = (state: RootState) => ({
})

export default connect(mapStateToProps, {doAddExpert})(AddExpert)