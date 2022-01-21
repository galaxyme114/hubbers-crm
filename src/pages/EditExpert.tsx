import * as React from 'react'
import DateTimePicker from 'react-datetime-picker'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { fetchExpertDetail, doGetSkills, doGetExpertiseCategory, updateExpertDetail } from '../actions/expert'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import Switch from '../components/Switch'
import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { ExpertRecord, EducationRecord, LanguageRecord } from '../constants/models'
import { languages, eductionDegreeTypeOptions, educationDegreeYearsOptions, languageExperienceLevel, nationalityCountries, availabilityScopeOptions, availabilityTimeOptions, availabilityPriceOptions } from '../constants/selectOptions'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as ExpertDetailState } from '../reducers/expertDetail'
// import { State as ExpertiseOrderState } from '../reducers/expertDetail'
import { RootState } from '../reducers/index'
import { slugify } from '../utils/stringUtils'
import Alert from 'react-s-alert'


interface EditExpertMatchParams {
	id: string
}

interface EditExpertProps extends RouteComponentProps<EditExpertMatchParams> {
	state: ExpertDetailState
	fetchExpertDetail: any
	updateExpertDetail:any
}

interface EditExpertState {
	ExpertDetail: ExpertRecord
	isPageUpdate: ActionTypeStates
	openUpdateModel: boolean
	isRender: boolean
	isExpertDetailsValid:boolean
	skills: string[]
	languages: LanguageRecord[]
	education: EducationRecord[]
	isCatChange: boolean
	isSkillChange: boolean
	ExpertDetailUser: any
}

class EditExpert extends React.Component<EditExpertProps, EditExpertState> {
	constructor(props: EditExpertProps) {
		super(props)

		this.state = {
			ExpertDetail: null,
			isPageUpdate: null,
			openUpdateModel: null,
			isRender: false,
			isExpertDetailsValid: null,
			skills: [],
			languages: [{ language: '', level: '' }],
			education: [{ country: '', name: '', title: '', degree: '', year: 0 }],
			isCatChange: null,
			isSkillChange : null,
			ExpertDetailUser: null
		}

		this.openExpertUpdateModal = this.openExpertUpdateModal.bind(this)
	}

	public openExpertUpdateModal() {
		this.setState({
			openUpdateModel: true
		})
	}

	public componentDidMount() {
		const ExpertId = this.props.match.params.id
		console.log(ExpertId)
		this.props.fetchExpertDetail(ExpertId)
		setTimeout(() => {
			this.validateForm({})
		}, 1000)
	}

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state && nextProps.state.expert) {
			this.setState({
				ExpertDetail: nextProps.state.expert,
				ExpertDetailUser: nextProps.state.expert.user
				})
		}
	}

	public render() {
		const {state} = this.props
		const {ExpertDetail, ExpertDetailUser} = this.state
		console.log(ExpertDetail)
		console.log(ExpertDetailUser)
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
								<BreadcrumbItem active>Edit Expert</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Edit Expert
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													(ExpertDetail && state.status === ActionTypeStates.SUCCESS) &&
													<div className="row">
														<div className="col-lg-12">
															<div className="row">
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>User Name:
																			<Link to={'/user/edit/' + ExpertDetail.userId + '/'}>
																				<span style={{"margin":"15px"}}>{ExpertDetailUser.name}</span>
																			</Link>
																		</label>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>User Email:<span style={{"margin":"15px"}}>{ExpertDetailUser.email}</span></label>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Rating</label>
																<Input
																	name="rating"
																	placeholder="Enter Rating"
																	value={ExpertDetail.rating}
																	type={InputType.TEXT}
																	onChange={(value: any) => {
																		this.UpdateExpert('rating', value)
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Review</label>
																<Input
																	name="reviews"
																	placeholder="Enter Review"
																	value={ExpertDetail.reviews}
																	type={InputType.TEXT}
																	onChange={(value: any) => {
																		this.UpdateExpert('reviews', value)
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Languages</label>
															</div>
															{
																this.state.ExpertDetail.languages.length > 0 && this.state.ExpertDetail.languages.map((l: LanguageRecord, i: number) => (
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
																			(i === (this.state.ExpertDetail.languages.length - 1)) && (
																				<button
																					disabled={!l.language || !l.level}
																					onClick={() => { this.addLanguage() }}
																					className="btn btn-outline">Add</button>
																			)
																		}
																		{
																			(i < (this.state.ExpertDetail.languages.length - 1)) && (
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
																this.state.ExpertDetail.languages.length <= 0 &&
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
																this.state.ExpertDetail.education && this.state.ExpertDetail.education.map((e: EducationRecord, i: number) => (
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
																			(i === (this.state.ExpertDetail.education.length - 1)) && (
																				<button
																					// disabled={!e.country || !e.name || !e.title || !e.degree || !e.year}
																					onClick={() => { this.addEducation() }}
																					className="btn btn-outline">Add</button>
																			)
																		}
																		{
																			(i < (this.state.ExpertDetail.education.length - 1)) && (
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
																this.state.ExpertDetail.education.length <= 0 &&
																<div style={{marginBottom: "14px"}}>
																	<button onClick={() => { this.addEducation() }} className="btn btn-outline">Add Education</button>
																</div>	
															}
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<Input
																	name="expertiseCategories"
																	value={ExpertDetail.categories}
																	type={InputType.ASYNC_SELECT}
																	label="Expertise category you're interested in"
																	placeholder="Select expertise category"
																	options={doGetExpertiseCategory}
																	multi={true}
																	onChange={(v: any) => { 
																		console.log(v)
																		this.UpdateExpert('categories', v) 
																	}}/>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<Input
																	name="Skills"
																	value={ExpertDetail.skills}
																	type={InputType.ASYNC_SELECT}
																	label="Expertise Skills"
																	placeholder="Select expertise skills"
																	options={doGetSkills}
																	multi={true}
																	onChange={(v: any) => { 
																		this.UpdateExpert('skills', v) 
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Hourly Rate</label>
																<Input
																	name="reviews"
																	placeholder="Enter HourlyRate"
																	value={ExpertDetail.hourlyRate}
																	type={InputType.TEXT}
																	onChange={(value: any) => {
																		this.UpdateExpert('hourlyRate', value)
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
																	value={ExpertDetail.hoursToWorkWeek}
																	type={InputType.TEXT}
																	onChange={(value: any) => {
																		this.UpdateExpert('hoursToWorkWeek', value)
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
																	value={ExpertDetail.hoursToWorkWeekToken}
																	type={InputType.TEXT}
																	onChange={(value: any) => {
																		this.UpdateExpert('hoursToWorkWeekToken', value)
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
																	value={ExpertDetail.availabilityScope}
																	multi={false}
																	type={InputType.SELECT}
																	options={availabilityScopeOptions}
																	simpleValue={true}
																	onChange={(availabilityScope: any) => {
																		this.UpdateExpert('availabilityScope', availabilityScope)
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
																	value={ExpertDetail.availabilityTime}
																	multi={false}
																	type={InputType.SELECT}
																	options={availabilityTimeOptions}
																	simpleValue={true}
																	onChange={(availabilityTime: any) => {
																		this.UpdateExpert('availabilityTime', availabilityTime)
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
																	value={ExpertDetail.availabilityPrice}
																	multi={false}
																	type={InputType.SELECT}
																	options={availabilityPriceOptions}
																	simpleValue={true}
																	onChange={(availabilityPrice: any) => {
																		this.UpdateExpert('availabilityPrice', availabilityPrice)
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openExpertUpdateModal()}>
																	Update Expert
																</button>
															</div>
														</div>
													</div>
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<SweetAlert
							show={this.state.openUpdateModel}
							title="Expert Update"
							text="Are you sure you want to update Expert"
							showCancelButton
							onConfirm={() => {
								this.updateExpertDetail()
								this.setState({openUpdateModel: false})
							}}
							onCancel={() => {
								this.setState({openUpdateModel: false})
							}}
							onEscapeKey={() => this.setState({openUpdateModel: false})}
							onOutsideClick={() => this.setState({openUpdateModel: false})}
						/>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}

	private UpdateExpert(key: string, value: any) {
		const ExpertDetail: any = {...this.state.ExpertDetail}
		ExpertDetail[key] = value;

		if(key==="categories"){
			this.setState({
				isCatChange: true
			})
		}
		if(key==="skills"){
			this.setState({
				isSkillChange: true
			})
		}
		this.setState({ExpertDetail})
	}

	private updateExpertDetail() {

		let submitCat=[];
		let submitSkills=[];
		if(this.state.ExpertDetail.categories.length>0){
			if(this.state.isCatChange===true){
				for(const items of this.state.ExpertDetail.categories){
					submitCat.push(items._id)
				}
			}else{				
				for(const items of this.state.ExpertDetail.categories){
					submitCat.push(items)
				}
			}			
		}

		if(this.state.ExpertDetail.skills.length>0){
			if(this.state.isSkillChange===true){
				console.log("change")
				for(const items of this.state.ExpertDetail.skills){
					submitSkills.push(items.id)
				}
			}else{		
				console.log("No change")
				
				for(const items of this.state.ExpertDetail.skills){
					submitSkills.push(items)
				}
			}
		}

		const Expert = {
			rating: this.state.ExpertDetail.rating,
			reviews: this.state.ExpertDetail.reviews,
			skills: submitSkills,
			categories: submitCat,
			_id: this.state.ExpertDetail._id,
			userId: this.state.ExpertDetail.userId,
			languages: this.state.ExpertDetail.languages,
			education: this.state.ExpertDetail.education,
			hourlyRate: this.state.ExpertDetail.hourlyRate,
			hoursToWorkWeek: this.state.ExpertDetail.hoursToWorkWeek,
			hoursToWorkWeekToken: this.state.ExpertDetail.hoursToWorkWeekToken,
			availabilityScope: this.state.ExpertDetail.availabilityScope,
			availabilityTime: this.state.ExpertDetail.availabilityTime,
			availabilityPrice: this.state.ExpertDetail.availabilityPrice,
		}
		console.log(Expert)
		this.props.updateExpertDetail(this.state.ExpertDetail._id, Expert).then(() => {
			this.setState({
				isPageUpdate: ActionTypeStates.SUCCESS,
				openUpdateModel: false
			})			
			Alert.success('New Expert Updated Successfully',{position: 'bottom-right'})
		}).catch(() => {
			this.setState({isPageUpdate: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})			
		})
	}

	/**
	 * Helper function to add a new language record
	 *
	 */
	private addLanguage() {
		this.state.ExpertDetail.languages.push({ language: '', level: '' })
		this.validateForm({ languages: [...this.state.ExpertDetail.languages, { language: '', level: '' }] })
	}

	/**
	 * Helper function to remove a language
	 *
	 * @param {number} index index of the item to remove
	 */
	private removeLanguage(index: number) {
		this.state.ExpertDetail.languages.splice(index, 1)
		this.validateForm({ languages: this.state.ExpertDetail.languages })
	}

	/**
	 * Helper function to update the contents of an existing language record
	 *
	 * @param {number} index index of the item to update
	 * @param updatedLanguageObject updated partial language record
	 */
	private updateLanguage(index: number, updatedLanguageObject: any) {
		const languages = this.state.ExpertDetail.languages
		languages[index] = {...languages[index], ...updatedLanguageObject}

		this.validateForm({ languages })
	}

	/**
	 * Helper function to update the existing state while performing the necessary validation newState.ExpertDetail.skills.length > 0
			&& 
	 *
	 * @param modifiedState
	 */
	private validateForm(modifiedState?: any) {
		const newState: EditExpertState = {...this.state, ...modifiedState}

		// newState.isExpertDetailsValid = (newState.languages.length > 0 && (newState.ExpertDetail.languages[0].language !== '' && newState.ExpertDetail.languages[0].level !== ''))

		this.setState(newState)
	}

	/**
	 * Helper function to add a new language record
	 *
	 */
	private addEducation() {
		this.state.ExpertDetail.education.push({ country: '',
			name: '',
			title: '',
			degree: '',
			year: 0 })		
		this.validateForm({ education: [...this.state.ExpertDetail.education, {
			country: '',
			name: '',
			title: '',
			degree: '',
			year: 0
		}] })
	}

	/**
	 * Helper function to remove a education
	 *
	 * @param {number} index index of the item to remove
	 */
	private removeEducation(index: number) {
		this.state.ExpertDetail.education.splice(index, 1)
		this.validateForm({ education: this.state.ExpertDetail.education })
	}

	/**
	 * Helper function to update the contents of an existing education record
	 *
	 * @param {number} index index of the item to update
	 * @param updatedEducationObject updated partial education record
	 */
	private updateEducation(index: number, updatedEducationObject: any) {
		const education = this.state.ExpertDetail.education
		education[index] = {...education[index], ...updatedEducationObject}

		this.validateForm({ education })
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.ExpertDetail
})
export default connect(mapStateToProps, {
	fetchExpertDetail,
	updateExpertDetail
})(EditExpert)