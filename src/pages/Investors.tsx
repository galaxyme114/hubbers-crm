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

interface InvestorsPageProps extends RouteComponentProps<any> {
	// state: UsersListState
	// fetchUsers: any
}

interface InvestorsPageState {
	userDeleteStatus: ActionTypeStates
	isLoading: boolean
	globalFilter: string
	showDeletePopup: boolean
    selectedUserID: string
    investorList: []
}

class InvestorsPage extends React.Component<InvestorsPageProps, InvestorsPageState> {
	
	constructor(props: InvestorsPageProps) {
		super(props)
		this.state = {
			userDeleteStatus: null,
			isLoading: false,
			globalFilter: null,
			showDeletePopup: false,
			selectedUserID: null,
			investorList: []
		}
	}

	public componentDidMount() {
		// this.props.fetchUsers()
	}

	public render() {
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
								<BreadcrumbItem><Link to={'/users'}>Users</Link></BreadcrumbItem>
                                <BreadcrumbItem active>investor</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">

										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"/> Investors List
											</div>
											<div className="card-block">
                                                <DataTable
                                                    value={this.state.investorList}
                                                    paginator={true}
                                                    rows={10}
                                                    rowsPerPageOptions={[10, 20, 30, 50]}
                                                    header={header}
                                                    globalFilter={this.state.globalFilter}
                                                    resizableColumns={true}
                                                    columnResizeMode="expand"
                                                    scrollable={true}>
                                                    <Column field="id" header="ID"/>
                                                    <Column field="date" header="Date register"/>
                                                    <Column field="name" header="Name"/>
                                                    <Column field="surname" header="Surname"/>
                                                    <Column field="token" header="Number of token"/>
                                                    <Column field="observer" header="Observer"/>
                                                </DataTable>
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

}

const mapStateToProps = (state: RootState) => ({
})
export default connect(mapStateToProps, {
})(InvestorsPage)