import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { fetchContests } from '../actions/contests'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as ContestListState } from '../reducers/contests'
import { RootState } from '../reducers/index'

interface ContestEntriesProps {
	state: ContestListState
	fetchContests: any
}

interface ContestEntriesState {
	globalFilter: string
}

class ContestEntries extends React.Component<ContestEntriesProps, ContestEntriesState> {
	constructor(props: ContestEntriesProps) {
		super(props)
		this.state = {
			globalFilter: null
		}
		this.contestThumbnailColumn = this.contestThumbnailColumn.bind(this)
		this.actionButtons = this.actionButtons.bind(this)
	}

	public componentDidMount() {
		this.props.fetchContests()
	}

	public contestThumbnailColumn(rowData: any, column: any) {
		return <img src={rowData.thumbnail} style={{width: '60px', height: '60px'}}/>
	}

	public actionButtons(rowData: any, column: any) {
		return <div>
			<Link to={'contest/' + rowData.id + '/view-entries'}>
				<button type="button" className="btn btn-outline-success">View Entries</button>
			</Link>
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
							<Breadcrumb className="mb-0">
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
												<i className="fa fa-align-justify"></i> Contests List
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
														<Column field="thumbnail" header="Thumbnail" body={this.contestThumbnailColumn}
															style={{textAlign: 'center'}}/>
														<Column field="name" header="Name" sortable={true}/>
														<Column field="judges.length" header="Judges" sortable={true}/>
														<Column field="contestants.length" header="Contestants" sortable={true}/>
														<Column field="views" header="Views" sortable={true}/>
														<Column header="Action" body={this.actionButtons}
															style={{textAlign: 'center', width: '10em'}}/>
													</DataTable>
													)
												}
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
	state: state.ContestsList
})

export default connect(mapStateToProps, {
	fetchContests
})(ContestEntries)