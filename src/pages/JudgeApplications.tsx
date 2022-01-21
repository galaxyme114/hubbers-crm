import * as moment from 'moment'
import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { swal } from 'react-redux-sweetalert'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { doApplicationApprove, doApplicationReject, fetchApplications } from '../actions/contests'
import Spinner from '../components/Spinner'
import Alert from 'react-s-alert'
import { ActionTypeStates } from '../constants/action-types'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as ApplicationsListState } from '../reducers/applications'
import { RootState } from '../reducers/index'

interface JudgeApplicationsProps {
	state: ApplicationsListState
	fetchApplications: any
	authenticateState: any
}

interface JudgeApplicationsState {
	applicationType: string
	globalFilter: string
	openApproveModel: boolean
	openRejectModel: boolean
	selectedApplicationID: number
	selectedUserID: number
	selectedContestID: number
	JudgeApproveStatus: ActionTypeStates
	JudgeRejectStatus: ActionTypeStates
	isLoading: boolean
}

class JudgeApplications extends React.Component<JudgeApplicationsProps, JudgeApplicationsState> {

	constructor(props: JudgeApplicationsProps) {
		super(props)
		this.state = {
			applicationType: 'jury',
			globalFilter: null,
			openApproveModel: null,
			openRejectModel: null,

			selectedApplicationID: null,
			selectedUserID: null,
			selectedContestID: null,

			JudgeApproveStatus: null,
			JudgeRejectStatus: null,
			isLoading: null
		}

		this.approveButtons = this.approveButtons.bind(this)
		this.openJudgesApproveConfirmModal = this.openJudgesApproveConfirmModal.bind(this)
		this.openJudgesRejectConfirmModal = this.openJudgesRejectConfirmModal.bind(this)
		this.timeDisplay = this.timeDisplay.bind(this)
		this.userDisplay = this.userDisplay.bind(this)
		this.thumbnailColumn = this.thumbnailColumn.bind(this)
		this.contestNameDisplay = this.contestNameDisplay.bind(this)
		this.statusButtons = this.statusButtons.bind(this)
	}

	public componentDidMount() {
		this.props.fetchApplications(this.state.applicationType)
	}

	public openJudgesApproveConfirmModal(data: any) {
		this.setState({
			openApproveModel: true,
			selectedApplicationID: data.id,
			selectedUserID: data.judge.user.id,
			selectedContestID: data.contest.id
		})
	}

	public openJudgesRejectConfirmModal(data: any) {
		this.setState({
			openRejectModel: true,
			selectedApplicationID: data.id
		})
	}

	public thumbnailColumn(rowData: any, column: any) {
		return <div className="thumbnail_img">
			<img src={rowData.judge.user.thumbnail_image_url} style={{width: '50px', height: '50px', borderRadius: '100px'}}/>
		</div>
	}

	public approveButtons(rowData: any, column: any) {
		return <div>
			{
				rowData.status === 0 &&
				<button type="button" style={{marginRight: '5px'}} className="btn btn-outline-success" onClick={() => {
					this.openJudgesApproveConfirmModal(rowData)
				}}>Accept</button>
			}
			<button type="button" className="btn btn-outline-danger" onClick={() => {
				this.openJudgesRejectConfirmModal(rowData)
			}}>Reject
			</button>
		</div>
	}

	public statusButtons(rowData: any, column: any) {
		return <div>
			{
				(rowData.status === 0) &&
				<div style={{color: '#f34235'}}>Inactive</div>
			}
			{
				(rowData.status === 1) &&
				<div style={{color: '#4caf50'}}>Active</div>
			}
		</div>
	}

	public timeDisplay(rowData: any, column: any) {
		return <div>
			{moment(rowData.created_at).fromNow()}
		</div>
	}

	public userDisplay(rowData: any, column: any) {
		return <div>
			{rowData.judge ? rowData.judge.user.full_name : ''}
		</div>
	}

	public contestNameDisplay(rowData: any, column: any) {
		return <div>
			{rowData.contest ? rowData.contest.name : ''}
		</div>
	}

	public render() {
		const {state} = this.props
		const header = <div className="input-group" style={{textAlign: 'left', width: '50%'}}>
			<span className="input-group-addon"><i className="fa fa-search"/></span>
			<input
				className="form-control"
				type="search"
				onChange={(e: any) => {
					this.setState({globalFilter: e.target.value})
				}}
				placeholder="Global Search"/>
		</div>

		return (
			<div className="app">
				<Helmet>
					<title>Judge Applications</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Judge Applications</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"/> Judge Applications List
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													state.status !== ActionTypeStates.INPROGRESS && (
														<DataTable
															value={state.applicationsList.jury_applications}
															paginator={true}
															rows={10}
															rowsPerPageOptions={[10, 20, 30, 50]}
															header={header}
															globalFilter={this.state.globalFilter}
															responsive={true}
															scrollable={true}
															resizableColumns={true}
															columnResizeMode="expand"
															style={{width: '100%'}}>
															<Column field="id" header="ID" sortable={true}
																style={{textAlign: 'center', width: '5em'}}/>
															<Column
																header="Thumbnail" body={this.thumbnailColumn}
																style={{textAlign: 'center', width: '7em'}}/>
															<Column header="User" body={this.userDisplay}/>
															<Column header="Time" body={this.timeDisplay}/>
															<Column header="Contest" body={this.contestNameDisplay}/>
															<Column
																header="Status" body={this.statusButtons}
																style={{textAlign: 'center', width: '6em'}}/>
															<Column header="" body={this.approveButtons}
																style={{textAlign: 'center', width: '15em'}}/>
														</DataTable>
													)
												}

												<SweetAlert
													show={this.state.openApproveModel}
													title="Awards Judge Approval"
													text="Are you sure you wish to approve this user as an Awards Judge ?"
													showCancelButton
													onConfirm={() => {
														this.JudgesApprove()
														this.setState({openApproveModel: false})
													}}
													onCancel={() => {
														this.setState({openApproveModel: false})
													}}
													onEscapeKey={() => this.setState({openApproveModel: false})}
													onOutsideClick={() => this.setState({openApproveModel: false})}
												/>
												<SweetAlert
													show={this.state.openRejectModel}
													title="Awards Judge Rejection"
													text="Are you sure you wish to reject this user as an Awards Judge ?"
													showCancelButton
													onConfirm={() => {
														this.JudgesReject()
														this.setState({openRejectModel: false})
													}}
													onCancel={() => {
														this.setState({openRejectModel: false})
													}}
													onEscapeKey={() => this.setState({openRejectModel: false})}
													onOutsideClick={() => this.setState({openRejectModel: false})}
												/>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}

	private JudgesApprove() {
		const data = {
			id: this.state.selectedApplicationID,
			user_id: this.state.selectedUserID,
			contest_id: this.state.selectedContestID,
			status: true
		}

		doApplicationApprove(this.state.applicationType, data)
			.then(() => {
				this.setState({
					JudgeApproveStatus: ActionTypeStates.SUCCESS,
					openApproveModel: false
				})
				Alert.success('Application Approve Successfully', {
					effect: 'genie',
					position: 'bottom-right'
				})
				this.props.fetchApplications(this.state.applicationType)
			}).catch(() => {
			this.setState({
				JudgeApproveStatus: ActionTypeStates.FAILED,
				openApproveModel: false
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})
		})
	}

	private JudgesReject() {
		doApplicationReject(this.state.applicationType, this.state.selectedApplicationID)
			.then(() => {
				this.setState({
					JudgeRejectStatus: ActionTypeStates.SUCCESS,
					openRejectModel: false
				})
				Alert.success('Application Reject Successfully', {
					effect: 'genie',
					position: 'bottom-right'
				})
				this.props.fetchApplications(this.state.applicationType)
			}).catch(() => {
			this.setState({
				JudgeRejectStatus: ActionTypeStates.FAILED,
				openRejectModel: false
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.ApplicationsList
})

export default connect(mapStateToProps, {
	fetchApplications
})(JudgeApplications)