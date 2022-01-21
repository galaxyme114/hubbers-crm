import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'

import { doAddEvent } from '../../actions/event'
import { RootState } from '../../reducers'

import { ActionTypeStates } from '../../constants/action-types'
import { InputType } from '../../constants/enums'

import Input from '../../components/Input'
import Spinner from '../../components/Spinner'

import Footer from '../../containers/Footer'
import Header from '../../containers/Header'
import Sidebar from '../../containers/Sidebar'
import { nationalityCountries, getUsersSelectOptions, getCommunitySelectOptions } from '../../constants/selectOptions'
import { EventScheduleRecord, EventRecord, EventSpeakerRecord } from '../../constants/models'
import UserThumbnailUpload from '../../components/UserThumbnailUpload'
// import { getUsersSelectOptions } from '../../constants/selectOptions'
interface AddEventProps {
	doAddEvent: any
	history: any
}

interface AddEventState extends Partial<EventRecord> {
	isRender: boolean
	isCreatePost: ActionTypeStates
	openAddModel: boolean
	communityStr: string
	attendingStr: string
}

class AddEvent extends React.Component<AddEventProps, AddEventState> {
	constructor(props: AddEventProps) {
		super(props)

		this.state = {
			isRender: false,
			isCreatePost: null,
			openAddModel: null,
			name: '',
			description: '',
			country: '',
			address: '',
			date: '',
			time: '',
			map: '',
			agenda: '',
			community: [],
			attending: [],
			schedule: [],
			speakers: [],
			communityStr: '',
			attendingStr: ''
		}
	}

	public openPostAddModal() {
		this.setState({
			openAddModel: true
		})
	}
	public goBack = () => {
        this.props.history.goBack();
    }
	public render() {
		const {isCreatePost} = this.state
		return (
			<div className="app">
				<Helmet>
					<title>Add Event</title>
				</Helmet>
				<Header/>

				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb>
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Add Event</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Add Event
												<button onClick={() => this.goBack()} className="btn btn-primary pull-right backnewbtn">Back to Event</button>
											</div>
											<div className="card-block">
												{
													(isCreatePost === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													isCreatePost !== ActionTypeStates.INPROGRESS && (
													<div className="row">
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Event Name</label>
																<Input
																	name="name"
																	placeholder="Enter Event Name"
																	value={this.state.name}
																	type={InputType.TEXT}
																	onChange={(name: any) => {
																		this.setState({name})
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
																	value={this.state.description}
																	type={InputType.TEXTAREA}
																	onChange={(description: any) => {
																		this.setState({description})
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
																	value={this.state.country}
																	multi={false}
																	type={InputType.SELECT}
																	options={nationalityCountries}
																	simpleValue={true}
																	onChange={(country: string) => { this.setState({ country })}}/>
															</div>
														</div>
													    <div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Address</label>
																<Input
																	name="address"
																	placeholder="Enter Address"
																	value={this.state.address}
																	type={InputType.TEXTAREA}
																	onChange={(address: any) => {
																		this.setState({address})
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
																	value={this.state.date}
																	type={InputType.DATE}
																	onChange={(date: any) => {
																		this.setState({date})
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
																	value={this.state.time}
																	type={InputType.TIME}
																	onChange={(time: any) => {
																		this.setState({time})
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
																	value={this.state.map}
																	type={InputType.TEXT}
																	onChange={(map: any) => {
																		this.setState({map})
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
																	value={this.state.agenda}
																	type={InputType.TEXT}
																	onChange={(agenda: any) => {
																		this.setState({agenda})
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
																	{/* <button
																		className="btn btn-primary pull-right addnewbtn"
																		onClick={() => {
																			this.addSchedule()
																		}}>
																		Add Schedule
																	</button> */}
																</div>
																<div className="card-block">
																	<div className="form-group mb-1">
																		{
																			this.state.schedule.map((op: EventScheduleRecord, i: number) =>
																				<div className="row mb-2" key={i}>
																					<div className="col-md-6">
																						<label>Time</label>
																						<Input
																							name="schedule_time"
																							placeholder="Time"
																							value={op.time}
																							type={InputType.TIME}
																							onChange={(time: any) => {
																								this.createSchedule(i, {time})
																							}}/>
																						{/* <button
																							onClick={() => {
																								this.removeSchedule(i)
																							}}
																							className="btn btn-outline btn-danger mt-1">Remove
																						</button> */}
																						{
																							(i === (this.state.schedule.length - 1)) && (
																								<button
																									disabled={!op.time || !op.description}
																									onClick={() => {
																										this.addSchedule()
																									}}
																									className="btn btn-outline mt-2">Add</button>
																							)
																						}
																						{
																							(i < (this.state.schedule.length - 1)) && (
																								<button
																									onClick={() => {
																										this.removeSchedule(i)
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
																								this.createSchedule(i, {description})
																							}}/>
																						</div>
																					</div>
																				</div>
																			)
																		}
																		{
																			this.state.schedule.length <= 0 &&
																			<div>
																				<button onClick={() => {
																					this.addSchedule()
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
																	{/* <button
																		className="btn btn-primary pull-right addnewbtn"
																		onClick={() => {
																			this.addSpeakers()
																		}}>
																		Add Speakers
																	</button> */}
																</div>
																<div className="card-block">
																	<div className="form-group mb-1">
																		{
																			this.state.speakers.map((op: EventSpeakerRecord, i: number) =>
																				<div className="row mb-2" key={i}>
																					<div className="col-md-6 mb-1">
																						<label>Name</label>
																						<Input
																							name="speakers_name"
																							placeholder="Name"
																							value={op.name}
																							type={InputType.TEXT}
																							onChange={(name: string) => {
																								this.createSpeakers(i, {name})
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
																								this.createSpeakers(i, {position})
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
																								this.createSpeakers(i, {bio})
																							}}/>
																					</div>
																					<div className="col-md-6 mb-1">
																						<div className="form-group mb-1">
																						<div className="update_user_thumbnail">
																							<UserThumbnailUpload
																								autoUpload={true}
																								thumbnailImageUrl={op.thumbnailImageUrl}
																								onUpload={(thumbnailImageUrl: string) => {
																									this.createSpeakers(i, {thumbnailImageUrl})
																								}}/>
																						</div>

																						{/* <button
																						onClick={() => {
																							this.removeSpeakers(i)
																						}}
																						className="btn btn-outline btn-danger mt-1">Remove
																						</button> */}
																						{
																							(i === (this.state.speakers.length - 1)) && (
																								<button
																									disabled={!op.name || !op.thumbnailImageUrl || !op.position || !op.bio }
																									onClick={() => {
																										this.addSpeakers()
																									}}
																									className="btn btn-outline mt-2">Add</button>
																							)
																						}
																						{
																							(i < (this.state.speakers.length - 1)) && (
																								<button
																									onClick={() => {
																										this.removeSpeakers(i)
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
																			this.state.speakers.length <= 0 &&
																			<div>
																				<button onClick={() => {
																					this.addSpeakers()
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
																	onClick={() => this.openPostAddModal()}>
																	Add Event
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
							title="Event Add"
							text="Are you sure you want to Add Event"
							showCancelButton
							onConfirm={() => { this.doAddEvent() }}
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
	
	private createSchedule(index: number, createSchedule: Partial<EventScheduleRecord>) {
		const schedule = this.state.schedule
		schedule[index] = {...schedule[index], ...createSchedule}
		
		this.setState({schedule})
	}
	
	private addSchedule() {
		this.setState({schedule: [...this.state.schedule, {time: '', description: ''}]})
	}
	
	private removeSchedule(index: number) {
		const createSchedule = this.state.schedule.splice(index, 1)
		this.setState({ schedule: createSchedule })
	}

	private createSpeakers(index: number, createSpeakers: Partial<EventSpeakerRecord>) {
		const speakers = this.state.speakers
		speakers[index] = {...speakers[index], ...createSpeakers}
		
		this.setState({speakers})
	}
	
	private addSpeakers() {
		this.setState({speakers: [...this.state.speakers, {name: '', thumbnailImageUrl: '', position: '', bio: ''}]})
	}
	
	private removeSpeakers(index: number) {
		const createSpeakers = this.state.speakers.splice(index, 1)
		this.setState({ speakers: createSpeakers })
	}

	private doAddEvent() {
		this.setState({
			openAddModel: false,
		});
		let communityString: string[]
		let attendingString: string[]
		if (this.state.communityStr !== '') {
			communityString = this.state.communityStr.split(',')
		}
		if (this.state.attendingStr !== '') {
			attendingString = this.state.attendingStr.split(',')
		}
		const event = {
			name: this.state.name,
			description: this.state.description,
			country: this.state.country,
			address: this.state.address,
			date: this.state.date,
			time: this.state.time,
			speakers: this.state.speakers,
			map: this.state.map,
			agenda: this.state.agenda,
			schedule: this.state.schedule,
			community: this.state.communityStr ? communityString : this.state.community,
			attending: this.state.attendingStr ? attendingString : this.state.attending

		}
		doAddEvent(event).then(() => {
			this.setState({
				isCreatePost: ActionTypeStates.SUCCESS,
				name: '',
				description: '',
				country: '',
				address: '',
				date: '',
				time: '',
				speakers: [],
				map: '',
				agenda: '',
				community: [],
				attending: []
			})
			this.props.history.push(`/events`)
			
		}).catch(() => {
			this.setState({ isCreatePost: ActionTypeStates.FAILED})
		})
	}

}

const mapStateToProps = (state: RootState) => ({
})

export default connect(mapStateToProps, {
	doAddEvent
})(AddEvent)