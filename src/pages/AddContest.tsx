import * as React from 'react'
import DateTimePicker from 'react-datetime-picker'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { doAddContest } from '../actions/contests'
import Input from '../components/Input'
import Switch from '../components/Switch'
import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { ContestRecord, CriteriaRecord } from '../constants/models'
import { innovationCategories, productCategories } from '../constants/selectOptions'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers'
import { slugify } from '../utils/stringUtils'
import Header from '../containers/Header'

interface AddContestProps extends RouteComponentProps<any> {
	doAddContest: any
}

interface AddContestState extends Partial<ContestRecord> {
	name: string
	featuredImageUrl: string
	description: string
	market: string
	rules: string
	isCreateContest: ActionTypeStates
	openAddModel: boolean
}

class AddContest extends React.Component<AddContestProps, AddContestState> {
	constructor(props: AddContestProps) {
		super(props)
		
		this.state = {
			name: null,
			startTime: new Date().getTime(),
			duration: 40,
			innovationCategory: '',
			productCategory: '',
			isDraft: true,
			featuredImageUrl: null,
			description: null,
			rules: null,
			market: null,
			criteria: [{title: '', body: ''}],
			isCreateContest: null,
			openAddModel: null
		}
	}
	
	public render() {

		return (
			<div className="app">
				<Helmet>
					<title>Add Contest</title>
				</Helmet>
				<Header />
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb>
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Add Contest</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												Basic Information
											</div>
											<div className="card-block">
												<div className="card-block">
													<div className="row">
														<div className="col-lg-8">
															<div className="row">
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Name</label>
																		<Input
																			name="name"
																			placeholder="Enter Contest Name"
																			value={this.state.name}
																			type={InputType.TEXT}
																			onChange={(value: any) => {
																				this.UpdateContest('name', value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Start Date</label>
																		<div>
																			<DateTimePicker
																				value={this.state.startTime ? new Date(this.state.startTime) : ''}
																				onChange={(value: any) => {
																					this.UpdateContest('startTime', value)
																				}}/>
																		</div>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Duration</label>
																		<Input
																			name="duration"
																			placeholder="Enter Duration"
																			value={this.state.duration}
																			type={InputType.NUMBER}
																			onChange={(value: any) => {
																				this.UpdateContest('duration', value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Contest Innovations</label>
																		<Input
																			name="contestInnovation"
																			value={this.state.innovationCategory}
																			type={InputType.SELECT}
																			placeholder="Select an Innovation Category"
																			options={innovationCategories}
																			multi={false}
																			onChange={(v: any) => {
																				this.UpdateContest('innovationCategory', v.value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Contest Product Categories</label>
																		<Input
																			name="contestProductCategory"
																			value={this.state.productCategory}
																			type={InputType.SELECT}
																			placeholder="Select a Product Category"
																			options={productCategories}
																			multi={false}
																			onChange={(v: any) => {
																				this.UpdateContest('productCategory', v.value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Visible</label>
																		<Switch
																			checked={!this.state.isDraft}
																			onChange={(v: any) => { this.UpdateContest('isDraft', !v) }}/>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-4">
															<div className="update_user_thumbnail">
																<UserThumbnailUpload
																	autoUpload={true}
																	thumbnailImageUrl={this.state.featuredImageUrl}
																	onUpload={(featuredImageUrl: string) => {
																		this.UpdateContest('featuredImageUrl', featuredImageUrl)
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Description</label>
																<ReactQuill
																	value={this.state.description}
																	onChange={(value: any) => {
																		this.UpdateContest('description', value)
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Official Rules</label>
																<ReactQuill
																	value={this.state.rules}
																	onChange={(value: any) => {
																		this.UpdateContest('rules', value)
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Market Official Rules</label>
																<ReactQuill
																	value={this.state.market}
																	onChange={(value: any) => {
																		this.UpdateContest('market', value)
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => { this.setState({ openAddModel: true })}}>
																	Update Contest
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"/> Criteria
												<button
													className="btn btn-primary pull-right addnewbtn"
													onClick={() => {
														this.addCriteria()
													}}>
													Add Criteria
												</button>
											</div>
											<div className="card-block">
												<div className="form-group mb-1">
													{
														this.state.criteria.map((op: CriteriaRecord, i: number) =>
															<div className="row mb-2" key={i}>
																<div className="col-md-4">
																	<Input
																		name="criteria_title"
																		label="Title"
																		placeholder="Title"
																		value={op.title}
																		type={InputType.TEXT}
																		onChange={(title: string) => {
																			this.updateCriteria(i, {title})
																		}}/>
																	<button
																		onClick={() => {
																			this.removeCriteria(i)
																		}}
																		className="btn btn-outline btn-danger mt-1">Remove
																	</button>
																</div>
																<div className="col-md-8">
																	<div className="form-group mb-1">
																		<label>Description</label>
																		<ReactQuill
																			value={op.body}
																			onChange={(body: string) => {
																				this.updateCriteria(i, {body})
																			}}/>
																	</div>
																</div>
															</div>
														)}
												</div>
											</div>
										</div>
									
									</div>
								</div>
							</div>
						</div>
						<SweetAlert
							show={this.state.openAddModel}
							title="Contest Update"
							text="Are you sure you want to Add contest"
							showCancelButton
							onConfirm={() => { this.doAddContestDetail() }}
							onCancel={() => { this.setState({ openAddModel: false }) }}
							onEscapeKey={() => this.setState({ openAddModel: false })}
							onOutsideClick={() => this.setState({ openAddModel: false })}
						/>
					</main>
				</div>
			</div>
		)
	}

	private UpdateContest(key: string, value: any) {
		const updatedState: any = {...this.state}
		updatedState[key] = value
		
		this.setState(updatedState)
	}

	private doAddContestDetail() {
		const contest = {
			name: this.state.name,
			slug: slugify(this.state.name),
			featuredImageUrl: this.state.featuredImageUrl,
			description: this.state.description,
			market: this.state.market,
			rules: this.state.market,
			allowJudgeSignup: false,
			allowContestantSignup: false,
			isDraft: this.state.isDraft,
			startTime: this.state.startTime,
			duration: this.state.duration,
			productCategory: this.state.productCategory,
			innovationCategory: this.state.innovationCategory,
			criteria: this.state.criteria
		}
		doAddContest(contest).then(() => {
			this.setState({
				isCreateContest: ActionTypeStates.SUCCESS,
				openAddModel: false,
				name: '',
				featuredImageUrl: '',
				description: '',
				market: '',
				rules: ''
			})
			
			setTimeout(() => this.props.history.push(`/contests`), 500)
			Alert.success('New Contest Add Successfully')
		}).catch(() => {
			this.setState({ isCreateContest: ActionTypeStates.FAILED })			
			Alert.error('Something Went Wrong')
		})
	}
	
	private updateCriteria(index: number, updatedCriteria: Partial<CriteriaRecord>) {
		const criteria = this.state.criteria
		criteria[index] = {...criteria[index], ...updatedCriteria}
		
		this.setState({criteria})
	}
	
	private addCriteria() {
		this.setState({criteria: [...this.state.criteria, {title: '', body: ''}]})
	}
	
	private removeCriteria(index: number) {
		const updatedCriteria = this.state.criteria.splice(index, 1)
		this.setState({ criteria: updatedCriteria })
	}
}

const mapStateToProps = (state: RootState) => ({
})

export default connect(mapStateToProps, {doAddContest})(AddContest)