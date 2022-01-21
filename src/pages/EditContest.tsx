import * as React from 'react'
import DateTimePicker from 'react-datetime-picker'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { fetchContestDetail, updateContestDetail } from '../actions/contests'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import Switch from '../components/Switch'
import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { ContestRecord, CriteriaRecord } from '../constants/models'
import { innovationCategories, productCategories } from '../constants/selectOptions'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers'
import { State as ContestDetailState } from '../reducers/contestDetail'
import { slugify } from '../utils/stringUtils'
import Header from '../containers/Header'

interface EditContestMatchParams {
	id: string
}

interface EditContestProps extends RouteComponentProps<EditContestMatchParams> {
	state: ContestDetailState
	fetchContestDetail: any
	updateContestDetail: any
}

interface EditContestState {
	contestDetail: ContestRecord
	startDate: any
	endDate: any
	openUpdateModel: boolean
	openPriceLength: boolean
	prizeName: string
	standing: string
	amount: string
	currency: string
	royality: string
	description: string
	prizeData: any
	isRender: boolean
	tempEditPrizeData: any
	tempEditPrizeId: number
	tempEditPrize_Id: string
	tempEditPrizeName: string
	tempEditPrizeStanding: string
	tempEditPrizeAmount: string
	tempEditPrizeCurrency: string
	tempEditPrizeRoyality: string
	tempEditPrizeDescription: string
	tempEditPrizecreatedAt: any
	tempEditPrizeupdatedAt: any
	tempEditPrizeisPrizeOpen: boolean
	isVisible: boolean
	isDisable: boolean
	criteria: CriteriaRecord[]
}

class EditContest extends React.Component<EditContestProps, EditContestState> {
	public static CloseEditRow(data: any) {
		data.isPrizeOpen = data.isPrizeOpen === false
	}
	
	constructor(props: EditContestProps) {
		super(props)
		
		this.state = {
			contestDetail: null,
			startDate: null,
			endDate: null,
			openUpdateModel: null,
			openPriceLength: null,
			prizeName: '',
			standing: '',
			amount: '',
			currency: '',
			royality: '',
			description: '',
			prizeData: null,
			isRender: false,
			tempEditPrizeData: null,
			tempEditPrizeId: null,
			tempEditPrize_Id: null,
			tempEditPrizeName: null,
			tempEditPrizeStanding: null,
			tempEditPrizeAmount: null,
			tempEditPrizeCurrency: null,
			tempEditPrizeRoyality: null,
			tempEditPrizeDescription: null,
			tempEditPrizecreatedAt: null,
			tempEditPrizeupdatedAt: null,
			tempEditPrizeisPrizeOpen: null,
			isVisible: null,
			isDisable: true,
			criteria: [{title: '', body: ''}]
		}
		
		this.openConstantUpdateModal = this.openConstantUpdateModal.bind(this)
	}
	
	public openConstantUpdateModal() {
		this.setState({
			openUpdateModel: true
		})
	}
	
	public componentDidMount() {
		const contestId = this.props.match.params.id
		this.props.fetchContestDetail(contestId)
	}
	
	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state && nextProps.state.contest) {
			this.setState({isVisible: !nextProps.state.contest.isDraft})
			this.setState({contestDetail: nextProps.state.contest})
			if (nextProps.state.contest.criteria) {
				if (nextProps.state.contest.criteria.length === 0) {
					nextProps.state.contest.criteria = [{title: '', body: ''}]
				}
			}
		}
	}
	
	public openAddBlock() {
		const contestDetailNew = this.state.contestDetail
		if (contestDetailNew.prizes.length >= 3) {
			this.setState({
				openPriceLength: true
			})
			Alert.error('You can not Add More Than Three Contest Prize')
		} else {
			const data = {
				currency: '',
				description: '',
				name: '',
				prize: '',
				royalty: '',
				standing: '',
				isPrizeOpen: true
			}
			contestDetailNew.prizes.push(data)
			this.setState({
				contestDetail: contestDetailNew,
				prizeData: data
			})
		}
	}
	
	public OpenEditRow(data: any, index: number) {
		this.setState({
			isRender: true,
			prizeData: data,
			tempEditPrizeId: this.state.contestDetail.prizes[index].id,
			tempEditPrize_Id: this.state.contestDetail.prizes[index]._id,
			tempEditPrizeName: this.state.contestDetail.prizes[index].name,
			tempEditPrizeStanding: this.state.contestDetail.prizes[index].standing,
			tempEditPrizeAmount: this.state.contestDetail.prizes[index].prize,
			tempEditPrizeCurrency: this.state.contestDetail.prizes[index].currency,
			tempEditPrizeRoyality: this.state.contestDetail.prizes[index].royality,
			tempEditPrizeDescription: this.state.contestDetail.prizes[index].description,
			tempEditPrizecreatedAt: this.state.contestDetail.prizes[index].createdAt,
			tempEditPrizeupdatedAt: this.state.contestDetail.prizes[index].updatedAt,
			tempEditPrizeisPrizeOpen: this.state.contestDetail.prizes[index].isPrizeOpen
		})
		
		for (const item of this.props.state.contest.prizes) {
			item.isPrizeOpen = false
		}
		
		data.isPrizeOpen = data.isPrizeOpen !== true
		
		setTimeout(() => {
			this.setState({isRender: false})
		}, 500)
	}
	
	public updatePriceData(data: any, index: number) {
		this.state.contestDetail.prizes[index] = {
			_id: this.state.tempEditPrize_Id,
			id: this.state.tempEditPrizeId,
			name: this.state.tempEditPrizeName,
			standing: this.state.tempEditPrizeStanding,
			description: this.state.tempEditPrizeDescription,
			prize: this.state.tempEditPrizeAmount,
			currency: this.state.tempEditPrizeCurrency,
			royalty: this.state.tempEditPrizeRoyality,
			createdAt: this.state.tempEditPrizecreatedAt,
			updatedAt: this.state.tempEditPrizeupdatedAt,
			isPrizeOpen: this.state.tempEditPrizeisPrizeOpen
		}
		
		this.setState({
			openUpdateModel: true
		})
	}
	
	public deleteEditRow(e: any, j: number) {
		const prizesArray = this.state.contestDetail.prizes
		const contestRowCancel = this.state.contestDetail
		
		prizesArray.splice(j, 1)
		contestRowCancel.prizes = prizesArray
		
		this.setState({
			contestDetail: contestRowCancel
		})
		
		this.updateContestDetail()
	}
	
	public render() {
		const {state} = this.props
		const {contestDetail} = this.state
		
		return (
			<div className="app">
				<Helmet>
					<title>Contests</title>
				</Helmet>
				<Header />
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div style = {{top: "50px"}}>
							<Breadcrumb>
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Edit Contest</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								{
									(state.status === ActionTypeStates.INPROGRESS) &&
									<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
								}
								{
									(contestDetail && state.status !== ActionTypeStates.INPROGRESS) &&
									<div className="row">
										<div className="col-lg-12">
											
											<div className="card">
												<div className="card-header">
													Basic Information
												</div>
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
																			value={contestDetail.name}
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
																				value={new Date(contestDetail.startTime)}
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
																			name="firstname"
																			placeholder="Enter Contest Name"
																			value={contestDetail.duration}
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
																			name="contestInnovationCategory"
																			value={contestDetail.innovationCategory}
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
																			value={contestDetail.productCategory}
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
																			checked={!contestDetail.isDraft}
																			onChange={(v: any) => {
																				this.UpdateContest('isDraft', !v)
																			}}/>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-4">
															<div className="update_user_thumbnail">
																<UserThumbnailUpload
																	autoUpload={true}
																	thumbnailImageUrl={contestDetail.featuredImageUrl}
																	onUpload={(featuredImageUrl: string) => {
																		this.UpdateContest('featuredImageUrl', featuredImageUrl)
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Description</label>
																<ReactQuill
																	value={contestDetail.description}
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
																	value={contestDetail.rules}
																	onChange={(value: any) => {
																		this.UpdateContest('rules', value)
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Market Official Rules</label>
																<ReactQuill
																	value={contestDetail.market}
																	onChange={(value: any) => {
																		this.UpdateContest('market', value)
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openConstantUpdateModal()}>
																	Update Contest
																</button>
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
															contestDetail.criteria.map((op: CriteriaRecord, i: number) =>
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
											
											<div className="card">
												<div className="card-header">
													<i className="fa fa-align-justify"/> Contest Prize
													<a>
														<button
															className="btn btn-primary pull-right addnewbtn"
															onClick={() => this.openAddBlock()}>+ Add Prize
														</button>
													</a>
												</div>
												<div className="card-block">
													<table className="table table-bordered">
														<thead>
														<tr>
															<th>Name</th>
															<th>Standing</th>
															<th>Amount</th>
															<th>Currency</th>
															<th>Royalty</th>
															<th>Description</th>
															<th style={{width: '14%'}}>Action</th>
														</tr>
														</thead>
														<tbody>
														{
															(contestDetail.prizes.length > 0) && contestDetail.prizes.map((op: any, j: number) =>
																<tr key={j}>
																	<td>
																		{
																			op.isPrizeOpen === true && this.state.prizeData &&
																			<div className="form-group mb-1">
																				<Input
																					name="Name"
																					placeholder="Enter Title"
																					disabled={false}
																					defaultValue={op.name}
																					type={InputType.TEXT}
																					onChange={(value: any) => {
																						this.setState({
																							tempEditPrizeName: value
																						})
																					}}
																				/>
																			</div>
																		}
																		{op.isPrizeOpen !== true &&
																		<div>{op.name}</div>
																		}
																	</td>
																	<td>
																		{
																			op.isPrizeOpen === true && this.state.prizeData &&
																			<div className="form-group mb-1">
																				<Input
																					name="standing"
																					placeholder="Enter standing"
																					defaultValue={op.standing}
																					type={InputType.TEXT}
																					onChange={(value: any) => {
																						this.setState({
																							tempEditPrizeStanding: value
																						})
																					}}
																				/>
																			</div>
																		}
																		{
																			op.isPrizeOpen !== true &&
																			<div>{op.standing}</div>
																		}
																	</td>
																	<td>
																		{
																			op.isPrizeOpen === true && this.state.prizeData &&
																			<div className="form-group mb-1">
																				<Input
																					name="Amount"
																					placeholder="Enter Amount"
																					defaultValue={op.prize}
																					type={InputType.TEXT}
																					onChange={(value: any) => {
																						// op.prize=value
																						this.setState({
																							tempEditPrizeAmount: value
																						})
																					}}
																				/>
																			</div>
																		}
																		{
																			op.isPrizeOpen !== true &&
																			<div>{op.prize}</div>
																		}
																	</td>
																	<td>
																		{
																			op.isPrizeOpen === true && this.state.prizeData &&
																			<div className="form-group mb-1">
																				<Input
																					name="currency"
																					placeholder="Enter currency"
																					defaultValue={op.currency}
																					type={InputType.TEXT}
																					onChange={(value: any) => {
																						// op.currency=value
																						this.setState({
																							tempEditPrizeCurrency: value
																						})
																					}}
																				/>
																			</div>
																		}
																		{
																			op.isPrizeOpen !== true &&
																			<div>{op.currency}</div>
																		}
																	</td>
																	<td>
																		{
																			op.isPrizeOpen === true && this.state.prizeData &&
																			<div className="form-group mb-1">
																				<Input
																					name="Royality"
																					placeholder="Enter Royality"
																					defaultValue={op.royalty}
																					type={InputType.TEXT}
																					onChange={(value: any) => {
																						// op.royalty=value
																						this.setState({
																							tempEditPrizeRoyality: value
																						})
																					}}
																				/>
																			</div>
																		}
																		{
																			op.isPrizeOpen !== true &&
																			<div>{op.royalty}</div>
																		}
																	</td>
																	<td>
																		{
																			op.isPrizeOpen === true && this.state.prizeData &&
																			<div className="form-group mb-1">
																				<Input
																					name="Description"
																					placeholder="Enter Description"
																					defaultValue={op.description}
																					type={InputType.TEXT}
																					onChange={(value: any) => {
																						// op.description=value
																						this.setState({
																							tempEditPrizeDescription: value
																						})
																					}}
																				/>
																			</div>
																		}
																		{
																			op.isPrizeOpen !== true &&
																			<div>{op.description}</div>
																		}
																	</td>
																	<td style={{textAlign: 'center'}}>
																		{
																			op.isPrizeOpen === true && this.state.prizeData &&
																			<div>
																				<button
																					className="btn btn-outline-success"
																					onClick={() => this.updatePriceData(op, j)}>
																					<i className="fa fa-check"/>
																				</button>
																				&nbsp;
																				<button
																					className="btn btn-outline-danger"
																					onClick={() => EditContest.CloseEditRow(op)}>
																					<i className="fa fa-close"/>
																				</button>
																			</div>
																		}
																		{op.isPrizeOpen !== true &&
																		<div>
																			<button
																				className="btn btn-outline-success"
																				onClick={() => this.OpenEditRow(op, j)}>
																				<i className="fa fa-edit"/>
																			</button>
																			&nbsp;
																			<button
																				className="btn btn-outline-danger"
																				onClick={() => this.deleteEditRow(op, j)}>
																				<i className="fa fa-trash"/>
																			</button>
																		</div>
																		}
																	</td>
																</tr>
															)
														}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								}
							
							</div>
						</div>
						<SweetAlert
							show={this.state.openUpdateModel}
							title="Contest Update"
							text="Are you sure you want to update contest"
							showCancelButton
							onConfirm={() => {
								this.updateContestDetail()
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
			</div>
		)
	}
	
	private UpdateContest(key: string, value: any) {
		const contestDetail: any = {...this.state.contestDetail}
		contestDetail[key] = value
		
		this.setState({contestDetail})
	}
	
	private updateContestDetail() {
		const contest = {
			name: this.state.contestDetail.name,
			slug: slugify(this.state.contestDetail.name),
			featuredImageUrl: this.state.contestDetail.featuredImageUrl,
			description: this.state.contestDetail.description,
			rules: this.state.contestDetail.rules,
			prizes: this.state.contestDetail.prizes,
			market: this.state.contestDetail.market,
			allowJudgeSignup: true,
			allowContestantSignup: true,
			isDraft: this.state.contestDetail.isDraft,
			duration: this.state.contestDetail.duration,
			startTime: this.state.contestDetail.startTime,
			productCategory: this.state.contestDetail.productCategory,
			innovationCategory: this.state.contestDetail.innovationCategory,
			criteria: this.state.contestDetail.criteria
		}
		
		this.props.updateContestDetail(this.state.contestDetail._id, contest).then(() => {
			this.setState({ openUpdateModel: false })
			Alert.success('New Contest Updated Successfully')
		}).catch(() => {
			Alert.error('Something Went Wrong')
		})
	}
	
	private updateCriteria(index: number, updateddata: Partial<CriteriaRecord>) {
		const criteria = this.state.contestDetail.criteria
		criteria[index] = {...criteria[index], ...updateddata}
		
		this.setState({criteria})
	}
	
	private addCriteria() {
		const criteria = !this.state.contestDetail.criteria ? [] :
			[...this.state.contestDetail.criteria, {title: '', body: ''}]
		this.setState({contestDetail: {...this.state.contestDetail, criteria}})
		
		this.setState({
			isRender: true
		})
	}
	
	private removeCriteria(index: number) {
		this.state.contestDetail.criteria.splice(index, 1)
		this.setState({
			isRender: true
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.ContestDetail
})
export default connect(mapStateToProps, {
	fetchContestDetail,
	updateContestDetail
})(EditContest)