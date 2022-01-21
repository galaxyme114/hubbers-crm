import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { doUpdateUserDetail, fetchActivities, fetchUserDetail, fetchUserTransactions } from '../actions/usersList'
import Checkbox from '../components/Checkbox'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { TransactionRecord } from '../constants/models'
import {
	educationDegreeYearsOptions,
	eductionDegreeTypeOptions,
	languageExperienceLevel,
	nationalityCountries,
	userCapabilities,
	userGenderOptions, userPreferredRoles
} from '../constants/selectOptions'
import Sidebar from '../containers/Sidebar'
import {
	UserEducationRecord,
	UserLanguageRecord,
	UserLocationRecord,
	UserPositionRecord,
	UserRecord
} from '../interfaces/user'
import { RootState } from '../reducers'
import { State as UserDetailState } from '../reducers/userDetail'
import { getCurrencySymbol } from '../utils/currency'
import { dateFormatForCreatedAt } from '../utils/dateUtils'
import Header from '../containers/Header'

interface EditUserMatchParams {
	id: string
}

interface EditUserProps extends RouteComponentProps<EditUserMatchParams> {
	state: UserDetailState
	fetchUserDetail: any
	fetchActivities: any
	fetchUserTransactions: any
}

interface EditUserState {
	userDetail: UserRecord
	activityList: any
	transactions: TransactionRecord[]
	oldPassword: string
	newPassword: string
	confirmNewPassword: string
	openConfirmModal: boolean
	isValid: boolean
}

class EditUser extends React.Component<EditUserProps, EditUserState> {
	
	public static transactionsActionButton(rowData: any) {
		return <div>
			<Link to={'/transactions/' + rowData._id + '/edit'}>
				<button type="button" className="btn btn-outline-success"><i className="fa fa-edit "/></button>
			</Link>
		</div>
	}
	
	constructor(props: EditUserProps) {
		super(props)
		
		this.state = {
			userDetail: null,
			activityList: null,
			transactions: [],
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
			openConfirmModal: false,
			isValid: true
		}
		
		EditUser.transactionsActionButton = EditUser.transactionsActionButton.bind(this)
	}
	
	public componentDidMount() {
		const userId = this.props.match.params.id
		this.props.fetchUserDetail(userId)
		
		this.props.fetchUserTransactions(userId)
			.then((response: any) => response.payload)
			.then((payload: any) => {
				this.setState({transactions: payload.length > 0 ? payload : []})
			})
	}
	
	public componentWillReceiveProps(nextProps: Readonly<EditUserProps>) {
		if (nextProps.state.user !== this.props.state.user) {
			this.setState({userDetail: nextProps.state.user})
		}
	}
	
	public render() {
		const {state} = this.props
		const {userDetail, transactions} = this.state
		
		return (
			<div className="app">
				<Helmet>
					<title>Users</title>
				</Helmet>
				<Header />
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb>
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Edit User</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid edituser_page">
							<div className="animated fadeIn">
								{
									(state.status === ActionTypeStates.INPROGRESS) &&
									<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
								}
								{
									(state.status === ActionTypeStates.SUCCESS && userDetail) && (
										<div className="row">
											<div className="col-lg-12">
												
												<div className="card">
													<div className="card-header">
														<i className="fa fa-align-justify"/>Edit User
													</div>
													<div className="card-block">
														<div className="row">
															<div className="col-lg-8">
																<div className="row">
																	<div className="col-lg-6">
																		<div className="form-group mb-1">
																			<label>First Name</label>
																			<Input
																				name="name"
																				placeholder="Enter First Name"
																				value={userDetail.name}
																				type={InputType.TEXT}
																				onChange={(name: any) => {
																					this.validateForm({name})
																				}}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="form-group mb-1">
																			<label>Last Name</label>
																			<Input
																				name="lastName"
																				placeholder="Enter Last Name"
																				value={userDetail.lastName}
																				type={InputType.TEXT}
																				onChange={(lastName: any) => {
																					this.validateForm({lastName})
																				}}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-12">
																		<div className="form-group mb-1">
																			<label>Email Address</label>
																			<Input
																				name="email"
																				placeholder="Enter Email"
																				value={userDetail.email}
																				type={InputType.TEXT}
																				onChange={(email: any) => {
																					this.validateForm({email})
																				}}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="form-group mb-1">
																			<label>Preferred Role</label>
																			<Input
																				name="preferredRole"
																				placeholder="Preferred Role"
																				value={userDetail.preferredRole}
																				type={InputType.SELECT}
																				options={userPreferredRoles}
																				onChange={(preferredRole: any) => {
																					this.validateForm({preferredRole})
																				}}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<label>Capabilities</label>
																		<Input
																			name="capabilities"
																			value={userDetail.capabilities}
																			type={InputType.SELECT}
																			placeholder="Select all capabilities"
																			options={userCapabilities}
																			multi={true}
																			onChange={(capabilities: any) => {
																				this.validateForm({capabilities})
																			}}
																		/>
																	</div>
																	<div className="col-lg-6">
																		<div className="form-group mb-1">
																			<label>Country Code</label>
																			<Input
																				name="phoneNumberCountryCode"
																				placeholder="Enter Country Code"
																				value={userDetail.phoneNumberCountryCode}
																				type={InputType.TEXT}
																				onChange={(phoneNumberCountryCode: any) => {
																					this.validateForm({phoneNumberCountryCode})
																				}}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="form-group mb-1">
																			<label>Phone Number</label>
																			<Input
																				name="phoneNumber"
																				placeholder="Enter Phone Number"
																				value={userDetail.phoneNumber}
																				type={InputType.TEXT}
																				onChange={(phoneNumber: any) => {
																					this.validateForm({phoneNumber})
																				}}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="form-group mb-1">
																			<label>Gender</label>
																			<Input
																				name="gender"
																				placeholder="Select Gender"
																				value={userDetail.gender}
																				type={InputType.SELECT}
																				options={userGenderOptions}
																				onChange={(gender: any) => {
																					this.validateForm({gender})
																				}}
																				simpleValue={true}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="form-group mb-1">
																			<label>Date of Birth</label>
																			<Input
																				name="dob"
																				placeholder="Enter Date of Birth"
																				value={userDetail.dob}
																				type={InputType.DATE}
																				onChange={(dob: any) => {
																					this.validateForm({dob})
																				}}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="form-group mb-1">
																			<label>Headline</label>
																			<Input
																				name="headline"
																				placeholder="Enter Headline"
																				value={userDetail.headline}
																				type={InputType.TEXT}
																				onChange={(headline: any) => {
																					this.validateForm({headline})
																				}}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="form-group mb-1">
																			<label>Industry</label>
																			<Input
																				name="industry"
																				placeholder="Enter Industry"
																				value={userDetail.industry}
																				type={InputType.TEXT}
																				onChange={(industry: any) => {
																					this.validateForm({industry})
																				}}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-12">
																		<div className="form-group mb-1">
																			<label>Bio</label>
																			<Input
																				name="bio"
																				placeholder="Enter Bio"
																				value={userDetail.bio}
																				type={InputType.TEXTAREA}
																				onChange={(bio: any) => {
																					this.validateForm({bio})
																				}}
																			/>
																		</div>
																	</div>
																</div>
															</div>
															<div className="col-lg-4">
																<div className="update_user_thumbnail">
																	<UserThumbnailUpload
																		autoUpload={true}
																		thumbnailImageUrl={userDetail.thumbnailImageUrl}
																		onUpload={(thumbnailImageUrl: string) => {
																			this.validateForm({thumbnailImageUrl})
																		}}/>
																</div>
															</div>
															<div className="col-sm-12">
																<button className="btn" onClick={() => this.updateUser()}>Update</button>
															</div>
														</div>
													</div>
												</div>
												
												<div className="card">
													<div className="card-header">
														Locations
													</div>
													<div className="card-block">
														{
															userDetail.locations &&
															userDetail.locations.map((location: UserLocationRecord, i: number) => (
																<div className="row mb-1" key={i}>
																	<div className="col-lg-4 mb-1">
																		<Input
																			name="locationCountry"
																			placeholder="Country"
																			value={location.country}
																			multi={false}
																			type={InputType.SELECT}
																			options={nationalityCountries}
																			simpleValue={true}
																			onChange={(country: string) => {
																				this.updateSubModel('locations', i, {country})
																			}}/>
																	</div>
																	<div className="col-lg-4 mb-1">
																		<Input
																			name="locationState"
																			placeholder="State"
																			value={location.state}
																			type={InputType.TEXT}
																			onChange={(v: string) => {
																				this.updateSubModel('locations', i, {state: v})
																			}}/>
																	</div>
																	<div className="col-lg-4 mb-1">
																		<Input
																			name="locationCity"
																			placeholder="City"
																			value={location.city}
																			type={InputType.TEXT}
																			onChange={(city: string) => {
																				this.updateSubModel('locations', i, {city})
																			}}/>
																	</div>
																	<div className="col-lg-4 mb-1">
																		<Input
																			name="locationPin"
																			placeholder="Pin"
																			value={location.pin}
																			type={InputType.TEXT}
																			onChange={(pin: string) => {
																				this.updateSubModel('locations', i, {pin})
																			}}/>
																	</div>
																	<div className="col-lg-4 mb-1">
																		{
																			(i === (userDetail.locations.length - 1)) && (
																				<button
																					onClick={() => {
																						this.addSubModel('locations',
																							{country: '', name: '', title: '', degree: '', year: ''})
																					}}
																					className="btn btn-outline">Add</button>
																			)
																		}
																		{
																			(i < (userDetail.locations.length - 1)) && (
																				<button
																					onClick={() => {
																						this.removeSubModel('locations', i)
																					}}
																					className="btn btn-outline btn-danger">Remove</button>
																			)
																		}
																	</div>
																</div>
															))
														}
														{
															userDetail.locations.length <= 0 &&
															<div>
																<button onClick={() => {
																	this.addSubModel('locations',
																		{country: '', state: '', city: '', pin: '', name: '', isActive: false})
																}} className="btn btn-outline">Add Location
																</button>
															</div>
														}
													</div>
												</div>
												
												<div className="card">
													<div className="card-header">
														Languages
													</div>
													<div className="card-block">
														{
															userDetail.languages.length > 0 &&
															userDetail.languages.map((l: UserLanguageRecord, i: number) => (
																<div className="row mb-1" key={i}>
																	<div className="col-lg-4">
																		<Input
																			name="language"
																			placeholder="Language"
																			value={l.language}
																			type={InputType.TEXT}
																			onChange={(language: string) => {
																				this.updateSubModel('languages', i, {language})
																			}}/>
																	</div>
																	<div className="col-lg-4">
																		<Input
																			name="languageExperience"
																			placeholder="Experience"
																			value={l.level}
																			type={InputType.SELECT}
																			options={languageExperienceLevel}
																			simpleValue={true}
																			onChange={(level: string) => {
																				this.updateSubModel('languages', i, {level})
																			}}/>
																	</div>
																	<div className="col-lg-4">
																		{
																			(i === (userDetail.languages.length - 1)) && (
																				<button
																					disabled={!l.language || !l.level}
																					onClick={() => {
																						this.addSubModel('languages', {language: '', level: ''})
																					}}
																					className="btn btn-outline">Add</button>
																			)
																		}
																		{
																			(i < (userDetail.languages.length - 1)) && (
																				<button
																					onClick={() => {
																						this.removeSubModel('languages', i)
																					}}
																					className="btn btn-outline btn-danger">Remove</button>
																			)
																		}
																	</div>
																</div>
															))
														}
														{
															userDetail.languages.length <= 0 &&
															<div>
																<button onClick={() => {
																	this.addSubModel(
																		'languages', {language: '', level: ''}
																	)
																}} className="btn btn-outline">Add Language
																</button>
															</div>
														}
													</div>
												</div>
												
												<div className="card">
													<div className="card-header">
														Positions
													</div>
													<div className="card-block">
														{
															userDetail.positions.length > 0 &&
															userDetail.positions.map((p: UserPositionRecord, i: number) => (
																<div className="row mb-1" key={i}>
																	<div className="col-lg-12">
																		<div className="row">
																			<div className="col-lg-8 mb-1">
																				<Input
																					name="title"
																					placeholder="Title"
																					value={p.title}
																					type={InputType.TEXT}
																					onChange={(title: string) => {
																						this.updateSubModel('positions', i, {title})
																					}}/>
																			</div>
																			<div className="col-lg-4 mb-1">
																				<Checkbox
																					text="Is Active"
																					checked={p.isCurrent}
																					onChange={(isCurrent: boolean) => {
																						this.validateForm({isCurrent})
																					}}/>
																			</div>
																		</div>
																		
																		<div className="row">
																			<div className="col-lg-6 mb-1">
																				<Input
																					name="positionStartDate"
																					placeholder="Start Date"
																					value={p.startDate}
																					type={InputType.TEXT}
																					onChange={(startDate: string) => {
																						this.updateSubModel('positions', i, {startDate})
																					}}/>
																			</div>
																			<div className="col-lg-6 mb-1">
																				<Input
																					name="positionEndDate"
																					placeholder="End Date"
																					value={p.endDate}
																					type={InputType.TEXT}
																					onChange={(endDate: string) => {
																						this.updateSubModel('positions', i, {endDate})
																					}}/>
																			</div>
																		</div>
																		
																		<strong>Location</strong>
																		<div className="row">
																			<div className="col-lg-4 mb-1">
																				<Input
																					name="positionLocationCountry"
																					placeholder="Country"
																					value={p.locationCountry}
																					multi={false}
																					type={InputType.SELECT}
																					options={nationalityCountries}
																					simpleValue={true}
																					onChange={(locationCountry: string) => {
																						this.updateSubModel('positions', i, {locationCountry})
																					}}/>
																			</div>
																			<div className="col-lg-4 mb-1">
																				<Input
																					name="positionLocationState"
																					placeholder="State"
																					value={p.locationState}
																					type={InputType.TEXT}
																					onChange={(locationState: string) => {
																						this.updateSubModel('positions', i, {locationState})
																					}}/>
																			</div>
																			<div className="col-lg-4 mb-1">
																				<Input
																					name="positionLocationCity"
																					placeholder="City"
																					value={p.locationCity}
																					type={InputType.TEXT}
																					onChange={(locationCity: string) => {
																						this.updateSubModel('positions', i, {locationCity})
																					}}/>
																			</div>
																		</div>
																		
																		<strong>Company</strong>
																		<div className="row">
																			<div className="col-lg-4 mb-1">
																				<Input
																					name="positionCompanyName"
																					placeholder="Name"
																					value={p.companyName}
																					type={InputType.TEXT}
																					onChange={(companyName: string) => {
																						this.updateSubModel('positions', i, {companyName})
																					}}/>
																			</div>
																			<div className="col-lg-3 mb-1">
																				<Input
																					name="positionCompanyType"
																					placeholder="State"
																					value={p.companyType}
																					type={InputType.TEXT}
																					onChange={(companyType: string) => {
																						this.updateSubModel('positions', i, {companyType})
																					}}/>
																			</div>
																			<div className="col-lg-3 mb-1">
																				<Input
																					name="positionCompanyIndustry"
																					placeholder="City"
																					value={p.companyIndustry}
																					type={InputType.TEXT}
																					onChange={(companyIndustry: string) => {
																						this.updateSubModel('positions', i, {companyIndustry})
																					}}/>
																			</div>
																			<div className="col-lg-2 mb-1">
																				<Input
																					name="positionCompanySize"
																					placeholder="Size"
																					value={p.companySize}
																					type={InputType.TEXT}
																					onChange={(companySize: string) => {
																						this.updateSubModel('positions', i, {companySize})
																					}}/>
																			</div>
																		</div>
																	</div>
																	
																	<div className="col-lg-4">
																		{
																			(i === (userDetail.positions.length - 1)) && (
																				<button
																					onClick={() => {
																						this.addSubModel('positions',
																							{
																								title: '',
																								isCurrent: false,
																								locationCountry: '', locationState: '', locationCity: '',
																								companyName: '', companyType: '', companyIndustry: '', companySize: '',
																								startDate: '', endDate: ''
																							})
																					}}
																					className="btn btn-outline">Add</button>
																			)
																		}
																		{
																			(i < (userDetail.positions.length - 1)) && (
																				<button
																					onClick={() => {
																						this.removeSubModel('positions', i)
																					}}
																					className="btn btn-outline btn-danger">Remove</button>
																			)
																		}
																	</div>
																</div>
															))
														}
														{
															userDetail.positions.length <= 0 &&
															<div>
																<button onClick={() => {
																	this.addSubModel(
																		'positions', {
																			title: '',
																			isCurrent: false,
																			locationCountry: '', locationState: '', locationCity: '',
																			companyName: '', companyType: '', companyIndustry: '', companySize: '',
																			startDate: '', endDate: ''
																		}
																	)
																}} className="btn btn-outline">Add Position
																</button>
															</div>
														}
													</div>
												</div>
												
												<div className="card">
													<div className="card-header">
														Education
													</div>
													<div className="card-block">
														{
															userDetail.education &&
															userDetail.education.map((e: UserEducationRecord, i: number) => (
																<div className="row mb-1" key={i}>
																	<div className="col-lg-4 mb-1">
																		<Input
																			name="educationCountry"
																			placeholder="Country"
																			value={e.country}
																			multi={false}
																			type={InputType.SELECT}
																			options={nationalityCountries}
																			simpleValue={true}
																			onChange={(country: string) => {
																				this.updateSubModel('education', i, {country})
																			}}/>
																	</div>
																	<div className="col-lg-4 mb-1">
																		<Input
																			name="educationName"
																			placeholder="College / University Name"
																			value={e.name}
																			type={InputType.TEXT}
																			onChange={(name: string) => {
																				this.updateSubModel('education', i, {name})
																			}}/>
																	</div>
																	<div className="col-lg-4 mb-1">
																		<Input
																			name="educationTitle"
																			placeholder="Title"
																			value={e.title}
																			multi={false}
																			type={InputType.SELECT}
																			options={eductionDegreeTypeOptions}
																			simpleValue={true}
																			onChange={(title: string) => {
																				this.updateSubModel('education', i, {title})
																			}}/>
																	</div>
																	<div className="col-lg-4 mb-1">
																		<Input
																			name="educationDegree"
																			placeholder="Degree"
																			value={e.degree}
																			type={InputType.TEXT}
																			onChange={(degree: string) => {
																				this.updateSubModel('education', i, {degree})
																			}}/>
																	</div>
																	<div className="col-lg-4 mb-1">
																		<Input
																			name="educationYear"
																			placeholder="Year"
																			value={e.year}
																			multi={false}
																			type={InputType.ASYNC_SELECT}
																			options={() => educationDegreeYearsOptions()}
																			simpleValue={true}
																			onChange={(year: string) => {
																				this.updateSubModel('education', i, {year})
																			}}/>
																	</div>
																	<div className="col-lg-4 mb-1">
																		{
																			(i === (userDetail.education.length - 1)) && (
																				<button
																					onClick={() => {
																						this.addSubModel('education',
																							{country: '', name: '', title: '', degree: '', year: ''})
																					}}
																					className="btn btn-outline">Add</button>
																			)
																		}
																		{
																			(i < (userDetail.education.length - 1)) && (
																				<button
																					onClick={() => {
																						this.removeSubModel('education', i)
																					}}
																					className="btn btn-outline btn-danger">Remove</button>
																			)
																		}
																	</div>
																</div>
															))
														}
														{
															userDetail.education.length <= 0 &&
															<div>
																<button onClick={() => {
																	this.addSubModel('education',
																		{country: '', name: '', title: '', degree: '', year: ''})
																}} className="btn btn-outline">Add Education
																</button>
															</div>
														}
													</div>
												</div>
												
												<div className="card">
													<div className="card-header">
														Reset Password
													</div>
													<div className="card-block">
														<div className="row">
															<div className="col-lg-12">
																<div className="form-group mb-1">
																	<label>Old Password</label>
																	<Input
																		name="oldPassword"
																		placeholder="Enter Old Password"
																		value={this.state.oldPassword}
																		type={InputType.TEXT}
																		onChange={(oldPassword: string) => {
																			this.setState({oldPassword})
																		}}
																	/>
																</div>
															</div>
														</div>
														<div className="row">
															<div className="col-lg-6">
																<div className="form-group mb-1">
																	<label>New Password</label>
																	<Input
																		name="newPassword"
																		placeholder="Enter New Password"
																		value={this.state.newPassword}
																		type={InputType.TEXT}
																		onChange={(newPassword: any) => {
																			this.setState({newPassword})
																		}}
																	/>
																</div>
															</div>
															<div className="col-lg-6">
																<div className="form-group mb-1">
																	<label>Confirm New Password</label>
																	<Input
																		name="confirmNewPassword"
																		placeholder="Enter Confirm New Password"
																		value={this.state.confirmNewPassword}
																		type={InputType.TEXT}
																		onChange={(confirmNewPassword: any) => {
																			this.setState({confirmNewPassword})
																		}}
																	/>
																</div>
															</div>
														</div>
														<div className="row">
															<div className="col-sm-12">
																<button className="btn">Reset Password</button>
															</div>
														</div>
													</div>
												</div>
												
												<div className="card">
													<div className="card-header">
														Transactions
														<Link to={`/transactions/${this.props.match.params.id}/add`}>
															<button className="btn btn-info pull-right">Add New</button>
														</Link>
													</div>
													<div className="card-block">
														<DataTable
															value={transactions}
															resizableColumns={true}
															columnResizeMode="fit">
															<Column field="txId" header="TxID"/>
															<Column field="createdAt" header="Date" body={dateFormatForCreatedAt}/>
															<Column field="type" header="Type"/>
															<Column field="amount" header="Amount" body={(column: any) =>
																`${column.amount} ${getCurrencySymbol(column.currency)}`}/>
															<Column
																header="Actions" body={EditUser.transactionsActionButton}
																style={{textAlign: 'center', width: '10em'}}/>
														</DataTable>
													</div>
												</div>
											</div>
										</div>
									)
								}
							</div>
						</div>
						<SweetAlert
							show={this.state.openConfirmModal}
							title={'Update User'}
							text={'Are you sure you wish to update the user ?'}
							showCancelButton
							onConfirm={() => {
								this.submitForm()
							}}
							onCancel={() => {
								this.setState({openConfirmModal: false})
							}}
							onEscapeKey={() => this.setState({openConfirmModal: false})}
							onOutsideClick={() => this.setState({openConfirmModal: false})}/>
					</main>
				</div>
			</div>
		)
	}
	
	private validateForm(modifiedState: Partial<UserRecord>) {
		const userDetail: UserRecord = {...this.state.userDetail, ...modifiedState}
		this.setState({userDetail, isValid: true})
	}
	
	private updateUser() {
		this.setState({openConfirmModal: true})
	}
	
	private submitForm() {
		if (this.state.isValid) {
			const userId = this.props.match.params.id
			
			doUpdateUserDetail(userId, this.state.userDetail)
				.then(() => {
					this.setState({openConfirmModal: false})
					Alert.success('User Updated Successfully')
				}).catch(() => {
				this.setState({openConfirmModal: false})
				Alert.error('User Update Failed')
			})
		} else {
			this.setState({openConfirmModal: false})
			Alert.error('User Update Failed')
		}
	}
	
	private addSubModel(key: string, insertData: any) {
		const {userDetail} = this.state
		const existingSubModel = userDetail[key]
		
		const newState = {...this.state.userDetail}
		newState[key] = [...existingSubModel, insertData] as any
		this.validateForm(newState)
	}
	
	private removeSubModel(key: string, index: number) {
		const {userDetail} = this.state
		const updatedSubModel = userDetail[key].splice(index, 1)
		
		const newState = {...this.state.userDetail}
		newState[key] = updatedSubModel
		this.validateForm(newState)
	}
	
	private updateSubModel(key: string, index: number, updatedData: any) {
		const {userDetail} = this.state
		
		const updatedSubModel = userDetail[key]
		updatedSubModel[index] = {...updatedSubModel[index], ...updatedData}
		
		const newState = {...this.state.userDetail}
		newState[key] = updatedSubModel
		this.validateForm(newState)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.UserDetail
})
export default connect(mapStateToProps, {
	fetchUserDetail,
	fetchActivities,
	fetchUserTransactions
})(EditUser)