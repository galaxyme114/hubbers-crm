import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { doRemoveContest, fetchContests } from '../actions/contests'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as ContestListState } from '../reducers/contests'
import { RootState } from '../reducers/index'
import Alert from 'react-s-alert'

interface ContestsProps {
	state: ContestListState
	fetchContests: any
}

interface ContestsState {
	globalFilter: string
	openconformationmodel: boolean,
	selectedConstentID: number,
	ContestsDeleteStatus: ActionTypeStates
}

class Contests extends React.Component<ContestsProps, ContestsState> {
	constructor(props: ContestsProps) {
		super(props)
		this.state = {
			globalFilter: null,
			openconformationmodel: null,
			selectedConstentID: null,
			ContestsDeleteStatus: null
		}
		this.contestThumbnailColumn = this.contestThumbnailColumn.bind(this)
		this.actionButtons = this.actionButtons.bind(this)
		this.openConstantConfirmModal = this.openConstantConfirmModal.bind(this)
	}

	public componentDidMount() {
		this.props.fetchContests()
	}

	public openConstantConfirmModal(constentId: number) {
		this.setState({
			openconformationmodel: true,
			selectedConstentID: constentId
		})

	}

	public contestThumbnailColumn(rowData: any, column: any) {
		return  <img src={rowData.featuredImageUrl}
			style={{width: '60px', height: '60px'}}/>
	}
	
	public actionButtons(rowData: any) {
		return 	<div>
					<Link to={`/contests/${rowData._id}/view-entries`}>
						<button type="button" className="btn btn-outline-success">
							<i className="fa fa-eye "/>
						</button>
					</Link>&nbsp;
					<Link to={`/contests/${rowData._id}/edit`}>
						<button type="button" className="btn btn-outline-success"><i className="fa fa-edit "/></button>
					</Link>&nbsp;
					<button type="button" className="btn btn-outline-danger" 
						onClick={() => {this.openConstantConfirmModal(rowData._id)}}>
						<i className="fa fa-trash "/>
					</button>
				</div>
	}

	public render() {
		const {state} = this.props

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
					<title>Contests</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb>
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Contests</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												Contest List
												<Link to="/contests/add">
													<button className="btn btn-default pull-right">Add New</button>
												</Link>
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													state.status !== ActionTypeStates.INPROGRESS && (
													<DataTable
														value={this.props.state.contestsList}
														paginator={true}
														rows={10}
														rowsPerPageOptions={[10, 20, 30, 50]}
														header={header}
														globalFilter={this.state.globalFilter}
														scrollable={true}
														responsive={true} scrollHeight="400px">
														<Column field="featuredImageUrl" header="Thumbnail" body={this.contestThumbnailColumn} 
														style={{textAlign: 'center'}}/>
														<Column field="name" header="Name" sortable={true} />
														<Column field="numJudges" header="Judges" sortable={true} />
														<Column field="numContestants" header="Contestants" sortable={true} />
														<Column field="views" header="Views" sortable={true} />
														<Column header="Action" body={this.actionButtons} style={{textAlign: 'center', width: '15em'}}/>
													</DataTable>
													)
												}
											</div>
										</div>
										<SweetAlert
											show={this.state.openconformationmodel}
											title="Contest Delete"
											text="Are you sure you want to delete this contest ?"
											showCancelButton
											onConfirm={() => {
												this.setState({openconformationmodel: false})
												this.ContestsDelete()
											}}
											onCancel={() => {
												this.setState({openconformationmodel: false})
											}}
											onEscapeKey={() => this.setState({openconformationmodel: false})}
											onOutsideClick={() => this.setState({openconformationmodel: false})}
										/>
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

	private ContestsDelete() {
		doRemoveContest(this.state.selectedConstentID)
			.then(() => {
				this.setState({
					ContestsDeleteStatus: ActionTypeStates.SUCCESS,
					openconformationmodel: false
				})
				Alert.success('Contest Delete Successfully',{position: 'bottom-right'})
				this.props.fetchContests()
			}).catch(() => {
				this.setState({
					ContestsDeleteStatus: ActionTypeStates.FAILED
				})
				Alert.error('Something Went Wrong',{position: 'bottom-right'})
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.ContestsList
})

export default connect(mapStateToProps, {
	fetchContests
})(Contests)