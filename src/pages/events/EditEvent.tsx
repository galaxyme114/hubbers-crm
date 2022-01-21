import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { fetchEventDetail, EventUpdate } from '../../actions/event'
import Input from '../../components/Input'
import Spinner from '../../components/Spinner'
import { ActionTypeStates } from '../../constants/action-types'
import { InputType } from '../../constants/enums'
import { EventScheduleRecord, EventRecord, EventSpeakerRecord } from '../../constants/models'
import Footer from '../../containers/Footer'
import Header from '../../containers/Header'
import Sidebar from '../../containers/Sidebar'
import { RootState } from '../../reducers/index'
import { State as EventDetailState } from '../../reducers/eventDetail'
import UserThumbnailUpload from '../../components/UserThumbnailUpload'
import { nationalityCountries, getUsersSelectOptions, getCommunitySelectOptions } from '../../constants/selectOptions'

interface EditEventMatchParams {
	id: string
}

interface EditEventProps extends RouteComponentProps<EditEventMatchParams> {
	state: EventDetailState
	fetchEventDetail: any
	EventUpdate: any
}

interface EditEventState {
	eventDetail: EventRecord
	isEventUpdate: ActionTypeStates
	selectedEventID: any
	openEventUpdateConfirmModal: boolean
	communityStr: string
	attendingStr: string
}

class EditEvent extends React.Component<EditEventProps, EditEventState> {
	constructor(props: EditEventProps) {
		super(props)
		this.state = {
			eventDetail: null,
			isEventUpdate: null,
			selectedEventID: null,
			openEventUpdateConfirmModal: null,
			communityStr: '',
			attendingStr: ''
		}
		this.openEventUpdateConfirmModal = this.openEventUpdateConfirmModal.bind(this);
	}

	public componentDidMount() {
		const eventId = this.props.match.params.id
		this.setState({
			selectedEventID: eventId
		})
		this.props.fetchEventDetail(eventId)
	}
	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state) {
			if (nextProps.state.eventDetail) {
				this.setState({
					eventDetail: nextProps.state.eventDetail
				}, () => {
					if (this.state.eventDetail) {
						if (this.state.eventDetail.community) {
							if (this.state.eventDetail.community.length > 0) {
								
								this.setState({
									communityStr: this.state.eventDetail.community.toString()
								})
							}
						}
						if (this.state.eventDetail.attending) {
							if (this.state.eventDetail.attending.length > 0) {
								
								this.setState({
									attendingStr: this.state.eventDetail.attending.toString()
								})
							}
						}
					}
					
				})
			}
			
		}

	}

	public openEventUpdateConfirmModal() {

		this.setState({
			openEventUpdateConfirmModal: true
		})

	}
	public goBack = () => {
        this.props.history.goBack();
    }
	public render() {
		const {state} = this.props
		const {eventDetail, isEventUpdate} = this.state
		return (
			<div className="app">
				<Helmet>
					<title>Edit Event</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb>
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Edit Event</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid editpage_page">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i> Events List
												<button onClick={() => this.goBack()} className="btn btn-primary pull-right backnewbtn">Back to Event</button>
											</div>
											<div className="card-block">
												{
													isEventUpdate === ActionTypeStates.INPROGRESS && (
														<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
													)
												}
												{
													isEventUpdate === ActionTypeStates.FAILED && (
														<div className="alert alert-danger">
															Something went wrong
														</div>
													)
												}
												{
													(state.status === ActionTypeStates.SUCCESS) && eventDetail &&
													<div className="row">
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Event Name</label>
																<Input
																	name="name"
																	placeholder="Enter Event Name"
																	value={eventDetail.name}
																	type={InputType.TEXT}
																	onChange={(name: any) => {
																		this.validateForm({name})
																	}}
																/>
															</div>
														</div>
												        <div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Description</label>
																<Input
																	name="description"
																	placeholder="Enter Description"
																	value={eventDetail.description}
																	type={InputType.TEXTAREA}
																	onChange={(description: any) => {
																		this.validateForm({description})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Country</label>
																<Input
																	name="country"
																	placeholder="Country"
																	value={eventDetail.country}
																	multi={false}
																	type={InputType.SELECT}
																	options={nationalityCountries}
																	simpleValue={true}
																	onChange={(country: any) => {
																		this.validateForm({country})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Address</label>
																<Input
																	name="address"
																	placeholder="Enter Address"
																	value={eventDetail.address}
																	type={InputType.TEXTAREA}
																	onChange={(address: any) => {
																		this.validateForm({address})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Date</label>
																<Input
																	name="date"
																	placeholder="Enter Date"
																	value={eventDetail.date}
																	type={InputType.DATE}
																	onChange={(date: any) => {
																		this.validateForm({date})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Time</label>
																<Input
																	name="time"
																	placeholder="Enter Time"
																	value={eventDetail.time}
																	type={InputType.TIME}
																	onChange={(time: any) => {
																		this.validateForm({time})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Map</label>
																<Input
																	name="map"
																	placeholder="Enter Map"
																	value={eventDetail.map}
																	type={InputType.TEXT}
																	onChange={(map: any) => {
																		this.validateForm({map})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Agenda</label>
																<Input
																	name="agenda"
																	placeholder="Enter Agenda"
																	value={eventDetail.agenda}
																	type={InputType.TEXT}
																	onChange={(agenda: any) => {
																		this.validateForm({agenda})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Community</label>
																<Input
																	name="community"
																	placeholder="Choose community"
																	value={this.state.communityStr}
																	disabled={false}
																	type={InputType.ASYNC_SELECT}
																	options={getCommunitySelectOptions}
																	onChange={(communityStr: any) => {
																		this.setState({communityStr})
																	}}
																	multi={true}
																	simpleValue={true}
																	valueKey="_id"
																	labelKey="name"
																/>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Attending</label>
																<Input
																	name="attending"
																	placeholder="Choose attending"
																	value={this.state.attendingStr}
																	disabled={false}
																	type={InputType.ASYNC_SELECT}
																	options={getUsersSelectOptions}
																	onChange={(attendingStr: any) => {
																		this.setState({attendingStr})
																	}}
																	multi={true}
																	simpleValue={true}
																	valueKey="_id"
																	labelKey="fullName"
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="card">
																<div className="card-header">
																	<i className="fa fa-align-justify"/> Schedule
																</div>
																<div className="card-block">
																	<div className="form-group mb-1">
																		{
																			eventDetail.schedule && eventDetail.schedule.map((op: EventScheduleRecord, i: number) =>
																				<div className="row mb-2" key={i}>
																					<div className="col-md-6">
																						<label>Time</label>
																						<Input
																							name="schedule_time"
																							placeholder="Time"
																							value={op.time}
																							type={InputType.TIME}
																							onChange={(time: string) => {
																								this.updateSubModel('schedule', i, {time})
																							}}/>
																						{
																							(i === (eventDetail.schedule.length - 1)) && (
																								<button
																									disabled={!op.time || !op.description}
																									onClick={() => {
																										this.addSubModel('schedule', {time: '', description: ''})
																									}}
																									className="btn btn-outline mt-2">Add</button>
																							)
																						}
																						{
																							(i < (eventDetail.schedule.length - 1)) && (
																								<button
																									onClick={() => {
																										this.removeSubModel('schedule', i)
																									}}
																									className="btn btn-outline btn-danger mt-2">Remove</button>
																							)
																						}
																					</div>
																					<div className="col-md-6">
																						<div className="form-group mb-1">
																							<label>Description</label>
																							<Input
																							name="schedule_description"
																							placeholder="Description"
																							value={op.description}
																							type={InputType.TEXTAREA}
																							onChange={(description: string) => {
																								this.updateSubModel('schedule', i, {description})
																							}}/>
																						</div>
																					</div>
																				</div>
																			)
																		}
																		{
																			eventDetail.schedule.length <= 0 &&
																			<div>
																				<button onClick={() => {
																					this.addSubModel('schedule',
																					{time: '', description: ''})
																				}} className="btn btn-outline">Add Schedule
																				</button>
																			</div>
																		}
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="card">
																<div className="card-header">
																	<i className="fa fa-align-justify"/> Speakers
																</div>
																<div className="card-block">
																	<div className="form-group mb-1">
																		{
																			eventDetail.speakers && eventDetail.speakers.map((op: EventSpeakerRecord, i: number) =>
																				<div className="row mb-2" key={i}>
																					<div className="col-md-6 mb-1">
																						<label>Name</label>
																						<Input
																							name="speakers_name"
																							placeholder="Time"
																							value={op.name}
																							type={InputType.TEXT}
																							onChange={(name: string) => {
																								this.updateSubModel('speakers', i, {name})
																							}}/>
																					</div>
																					<div className="col-md-6 mb-1">
																						<label>Position</label>
																						<Input
																							name="speakers_position"
																							placeholder="Position"
																							value={op.position}
																							type={InputType.TEXT}
																							onChange={(position: string) => {
																								this.updateSubModel('speakers', i, {position})
																							}}/>
																					</div>
																					<div className="col-md-6 mb-1">
																						<label>Bio</label>
																						<Input
																							name="speakers_bio"
																							placeholder="Bio"
																							value={op.bio}
																							type={InputType.TEXTAREA}
																							onChange={(bio: string) => {
																								this.updateSubModel('speakers', i, {bio})
																							}}/>
																					</div>
																					<div className="col-md-6 mb-1">
																						<div className="form-group mb-1">
																							<div className="update_user_thumbnail">
																								<UserThumbnailUpload
																									autoUpload={true}
																									thumbnailImageUrl={op.thumbnailImageUrl}
																									onUpload={(thumbnailImageUrl: string) => {
																										this.updateSubModel('speakers', i, {thumbnailImageUrl})
																									}}/>
																							</div>
																							{/* <button
																							onClick={() => {
																								this.removeSubModel('speakers', i)
																							}}
																							className="btn btn-outline btn-danger mt-1">Remove
																							</button> */}
																							{
																							(i === (eventDetail.speakers.length - 1)) && (
																								<button
																									disabled={!op.name || !op.thumbnailImageUrl || !op.position || !op.bio}
																									onClick={() => {
																										this.addSubModel('speakers', {name: '', thumbnailImageUrl: '', position: '',  bio: ''})
																									}}
																									className="btn btn-outline mt-2">Add</button>
																							)
																						}
																						{
																							(i < (eventDetail.speakers.length - 1)) && (
																								<button
																									onClick={() => {
																										this.removeSubModel('speakers', i)
																									}}
																									className="btn btn-outline btn-danger mt-2">Remove</button>
																							)
																						}
																						</div>
																					</div>
																				</div>
																			)
																		}
																		{
																			eventDetail.speakers.length <= 0 &&
																			<div>
																				<button onClick={() => {
																					this.addSubModel('speakers',
																					{name: '', position: '',  thumbnailImageUrl: '', bio: ''})
																				}} className="btn btn-outline">Add Speakers
																				</button>
																			</div>
																		}
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openEventUpdateConfirmModal()}>
																	Update Event
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
							show={this.state.openEventUpdateConfirmModal}
							title="Update Event"
							text="Are you sure to Update"
							showCancelButton
							onConfirm={() => {
								this.updateEventDetail()
								this.setState({openEventUpdateConfirmModal: false})
							}}
							onCancel={() => {
								this.setState({openEventUpdateConfirmModal: false})
							}}
							onEscapeKey={() => this.setState({openEventUpdateConfirmModal: false})}
							onOutsideClick={() => this.setState({openEventUpdateConfirmModal: false})}
						/>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}

	
	private validateForm(modifiedState: Partial<EventRecord>) {
		const eventDetail: EventRecord = {...this.state.eventDetail, ...modifiedState}
		this.setState({eventDetail})
	}
	private addSubModel(key: string, insertData: any) {
		const {eventDetail} = this.state
		const existingSubModel = eventDetail[key]
		
		const newState = {...this.state.eventDetail}
		newState[key] = [...existingSubModel, insertData] as any
		this.validateForm(newState)
	}
	
	private removeSubModel(key: string, index: number) {
		const {eventDetail} = this.state
		const updatedSubModel = eventDetail[key].splice(index, 1)
		
		const newState = {...this.state.eventDetail}
		newState[key] = updatedSubModel
		this.validateForm(newState)
	}
	
	private updateSubModel(key: string, index: number, updatedData: any) {
		const {eventDetail} = this.state
		
		const updatedSubModel = eventDetail[key]
		updatedSubModel[index] = {...updatedSubModel[index], ...updatedData}
		
		const newState = {...this.state.eventDetail}
		newState[key] = updatedSubModel
		this.validateForm(newState)
	}
	
	private updateEventDetail() {
		let communityString: string[]
		let attendingString: string[]
		if (this.state.communityStr !== '') {
			communityString = this.state.communityStr.split(',')
		}
		if (this.state.attendingStr !== '') {
			attendingString = this.state.attendingStr.split(',')
		}
		const data = {
			name: this.state.eventDetail.name,
			description: this.state.eventDetail.description,
			country: this.state.eventDetail.country,
			address: this.state.eventDetail.address,
			date: this.state.eventDetail.date,
			time: this.state.eventDetail.time,
			speakers: this.state.eventDetail.speakers,
			map: this.state.eventDetail.map,
			agenda: this.state.eventDetail.agenda,
			schedule: this.state.eventDetail.schedule,
			community: this.state.communityStr ? communityString : [],
			attending: this.state.attendingStr ? attendingString : []
		}
		this.props.EventUpdate(data, this.state.selectedEventID)
			.then(() => {
				this.setState({
					isEventUpdate: ActionTypeStates.SUCCESS
				})
				Alert.success('Event Update Successfully', {
					effect: 'genie',
					position: 'bottom-right',
					timeout: 3000
				})
			}).catch(() => {
			this.setState({isEventUpdate: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong',{position: 'bottom-right', timeout: 3000})
		})
	}

}

const mapStateToProps = (state: RootState) => ({
	state: state.EventDetail
})

export default connect(mapStateToProps, {
	fetchEventDetail,
	EventUpdate
})(EditEvent)
