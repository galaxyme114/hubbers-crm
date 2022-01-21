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
import { ActionTypeStates } from '../constants/action-types'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as ApplicationsListState } from '../reducers/applications'
import { RootState } from '../reducers/index'
import Alert from 'react-s-alert'

interface ContestantApplicationsProps {
	state: ApplicationsListState
	fetchApplications: any
	authenticateState: any
}

interface ContestantApplicationsState {
	applicationType: string
	globalFilter: string
	openApproveModel: boolean
	openRejectModel: boolean
	selectedApplicationID: number
	selectedUserID: number
	selectedContestID: number
	ContestantApproveStatus: ActionTypeStates
	ContestantRejectStatus: ActionTypeStates
	isLoading: boolean
}

class ContestantApplications extends React.Component<ContestantApplicationsProps, ContestantApplicationsState> {

	constructor(props: ContestantApplicationsProps) {
		super(props)
		this.state = {
			applicationType: 'contestant',
			globalFilter: null,
			openApproveModel: null,
			openRejectModel: null,

			selectedApplicationID: null,
			selectedUserID: null,
			selectedContestID: null,

			ContestantApproveStatus: null,
			ContestantRejectStatus: null,
			isLoading: null
		}

		this.approveButtons = this.approveButtons.bind(this)
		this.openContestantApproveConfirmModal = this.openContestantApproveConfirmModal.bind(this)
		this.openContestantRejectConfirmModal = this.openContestantRejectConfirmModal.bind(this)
		this.timeDisplay = this.timeDisplay.bind(this)
		this.userDisplay = this.userDisplay.bind(this)
		this.thumbnailColumn = this.thumbnailColumn.bind(this)
		this.contestNameDisplay = this.contestNameDisplay.bind(this)
		this.statusButtons = this.statusButtons.bind(this)
	}

	public componentDidMount() {
		this.props.fetchApplications(this.state.applicationType)
	}

	public openContestantApproveConfirmModal(data: any) {
		this.setState({
			openApproveModel: true,
			selectedApplicationID: data.id,
			selectedUserID: data.contestant.user.id,
			selectedContestID: data.contest.id
		})
	}

	public openContestantRejectConfirmModal(data: any) {
		this.setState({
			openRejectModel: true,
			selectedApplicationID: data.id
		})
	}

	public thumbnailColumn(rowData: any, column: any) {
		return <div className="thumbnail_img">
			<img src={rowData.contestant.user.thumbnail_image_url}
				style={{width: '50px', height: '50px', borderRadius: '100px'}}/>
		</div>
	}

	public approveButtons(rowData: any, column: any) {
		return <div>
			{
				rowData.status === 0 &&
				<button type="button" style={{marginRight: '5px'}} className="btn btn-outline-success" onClick={() => {
					this.openContestantApproveConfirmModal(rowData)
				}}>Accept</button>
			}
			<button type="button" className="btn btn-outline-danger" onClick={() => {
				this.openContestantRejectConfirmModal(rowData)
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

	public userDisplay(rowData: any) {
		return <div>
			{rowData.contestant ? rowData.contestant.user.full_name : ''}
		</div>
	}

	public contestNameDisplay(rowData: any) {
		return <div>
			{rowData.contest ? rowData.contest.name : ''}
		</div>
	}

	public render() {
		const {state, authenticateState} = this.props
		// const { alertDeleteStatus, alertApproveStatus, alertCancelStatus } = this.state
		console.log(state.applicationsList.contestant_applications)
		const header = <div className="input-group" style={{textAlign: 'left', width: '50%'}}>

			<span className="input-group-addon"><i className="fa fa-search"></i></span>
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
					<title>Contestant Applications</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Contestant Applications</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i> Contestant Applications List
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													state.status !== ActionTypeStates.INPROGRESS && (
														<DataTable
															value={state.applicationsList.contestant_applications}
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
													title="Contestant Application"
													text="Are you sure you wish to approve this contestant ?"
													showCancelButton
													onConfirm={() => {
														this.ContestantApprove()
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
													title="Contestant Rejection"
													text="Are you sure you wish to reject this contestant ?"
													showCancelButton
													onConfirm={() => {
														this.ContestantReject()
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

	private ContestantApprove() {
		const data = {
			id: this.state.selectedApplicationID,
			user_id: this.state.selectedUserID,
			contest_id: this.state.selectedContestID,
			status: true
		}

		doApplicationApprove(this.state.applicationType, data)
			.then(() => {
				this.setState({
					ContestantApproveStatus: ActionTypeStates.SUCCESS,
					openApproveModel: false
				})
				Alert.success('Application Approve Successfully',{position: 'bottom-right'})
				this.props.fetchApplications(this.state.applicationType)
			}).catch(() => {
			this.setState({
				ContestantApproveStatus: ActionTypeStates.FAILED,
				openApproveModel: false,
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})
		})
	}

	private ContestantReject() {
		doApplicationReject(this.state.applicationType, this.state.selectedApplicationID)
			.then(() => {
				this.setState({
					ContestantRejectStatus: ActionTypeStates.SUCCESS,
					openRejectModel: false
				})
				Alert.success('Application Reject Successfully',{position: 'bottom-right'})
				this.props.fetchApplications(this.state.applicationType)
			}).catch(() => {
			this.setState({
				ContestantRejectStatus: ActionTypeStates.FAILED,
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
})(ContestantApplications)