import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { doRemoveUser, fetchUsers } from '../actions/usersList'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers'
import { State as UsersListState } from '../reducers/usersList'
import { dateTimeFormatForCreatedAt } from '../utils/dateUtils'

interface UsersPageProps extends RouteComponentProps<any> {
	state: UsersListState
	fetchUsers: any
}

interface UsersPageState {
	userDeleteStatus: ActionTypeStates
	isLoading: boolean
	globalFilter: string
	showDeletePopup: boolean
	selectedUserID: string
}

class UsersPage extends React.Component<UsersPageProps, UsersPageState> {
	public static thumbnailColumn(rowData: any, column: any) {
		return <img src={rowData.thumbnailImageUrl} style={{width: '50px', height: '50px', borderRadius: '100px'}} alt=""/>
	}
	
	constructor(props: UsersPageProps) {
		super(props)
		this.state = {
			userDeleteStatus: null,
			isLoading: false,
			globalFilter: null,
			showDeletePopup: false,
			selectedUserID: null
		}
		
		UsersPage.thumbnailColumn = UsersPage.thumbnailColumn.bind(this)
		this.actionButton = this.actionButton.bind(this)
	}

	public componentDidMount() {
		this.props.fetchUsers()
	}

	public showPopupDelete(userId: string) {
		this.setState({
			showDeletePopup: true,
			selectedUserID: userId
		})
	}

	public actionButton(rowData: any, column: any) {
		return <div>
			<Link to={`/users/${rowData._id}/edit`}>
				<button type="button" className="btn btn-outline-success">
					<i className="fa fa-edit "/>
				</button>
			</Link>&nbsp;
			<button type="button" className="btn btn-outline-danger" onClick={() => { this.showPopupDelete(rowData._id) }}>
				<i className="fa fa-trash "/>
			</button>
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
					<title>Users</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb>
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Users</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">

										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"/> Users List
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
														<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													state.status !== ActionTypeStates.INPROGRESS && (
														<DataTable
															value={this.props.state.usersList}
															paginator={true}
															rows={10}
															rowsPerPageOptions={[10, 20, 30, 50]}
															header={header}
															globalFilter={this.state.globalFilter}
															resizableColumns={true}
															columnResizeMode="expand"
															scrollable={true}>
															<Column
																header="Thumbnail" body={UsersPage.thumbnailColumn}
																style={{textAlign: 'center', width: '7em'}}/>
															<Column field="fullName" header="Full Name"/>
															<Column field="email" header="Email"/>
															<Column header="Joined" body={dateTimeFormatForCreatedAt} sortable={true}/>
															<Column
																header="Action" body={this.actionButton}
																style={{textAlign: 'center', width: '10em'}}/>
														</DataTable>
													)
												}
												<SweetAlert
													show={this.state.showDeletePopup}
													title="User Delete"
													text="Are you sure you wish to delete this user ?"
													showCancelButton
													onConfirm={() => {
														this.userDelete()
													}}
													onCancel={() => {
														this.setState({showDeletePopup: false})
													}}
													onEscapeKey={() => this.setState({showDeletePopup: false})}
													onOutsideClick={() => this.setState({showDeletePopup: false})}
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

	private userDelete() {
		// this.setState({ isLoading: true })
		doRemoveUser(this.state.selectedUserID)
			.then(() => {
				this.setState({userDeleteStatus: ActionTypeStates.SUCCESS, isLoading: false, showDeletePopup: false})
				this.props.fetchUsers()
			}).catch(() => {
			this.setState({userDeleteStatus: ActionTypeStates.FAILED, isLoading: false})
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.UsersList,
	authenticateState: state.authenticate
})
export default connect(mapStateToProps, {
	fetchUsers
})(UsersPage)