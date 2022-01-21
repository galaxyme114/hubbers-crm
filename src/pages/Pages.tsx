import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { doPageDelete, fetchPages } from '../actions/pages'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'
import { State as PagesListState } from '../reducers/pages'

import SweetAlert from 'sweetalert-react'

interface PagesProps {
	state: PagesListState
	fetchPages: any
}

interface PagesState {
	pageDeleteStatus: ActionTypeStates
	globalFilter: string
	isLoading: boolean
	openconformationmodel: boolean
	selectedUserID: number
}

class Pages extends React.Component<PagesProps, PagesState> {
	constructor(props: PagesProps) {
		super(props)
		this.state = {
			globalFilter: null,
			pageDeleteStatus: null,
			isLoading: false,
			openconformationmodel: null,
			selectedUserID: null

		}
		this.actionButtons = this.actionButtons.bind(this)
		this.openConfirmModal = this.openConfirmModal.bind(this)
		this.pageDelete = this.pageDelete.bind(this)
	}

	public pageDelete() {

		doPageDelete(this.state.selectedUserID)
			.then(() => {
				this.setState({
					pageDeleteStatus: ActionTypeStates.SUCCESS,
					isLoading: false,
					openconformationmodel: false
				})
				Alert.success('Page Delete Successfully', {
					effect: 'genie',
					position: 'bottom-right'
				})
				this.props.fetchPages()
			}).catch(() => {
			this.setState({
				pageDeleteStatus: ActionTypeStates.FAILED,
				isLoading: false
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})
		})
	}

	public componentDidMount() {
		this.props.fetchPages()
	}

	public openConfirmModal(userId: number) {

		this.setState({
			openconformationmodel: true,
			selectedUserID: userId
		})

	}

	public actionButtons(rowData: any, column: any) {
		return <div>
			<Link to={'/page/edit/' + rowData.id + '/'}>
				<button type="button" className="btn btn-outline-success"><i className="fa fa-edit "></i></button>
			</Link>&nbsp;
			<button
				type="button"
				className="btn btn-outline-danger"
				onClick={() => {
					this.openConfirmModal(rowData.id)
				}}>
				<i className="fa fa-trash "></i>
			</button>
		</div>
	}

	public render() {
		const {state} = this.props
		// const {} = this.state

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
					<title>Pages</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Pages</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid pages_page">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i> Pages List
												<Link to={'/page/add'}>
													<button className="btn btn-primary pull-right addnewbtn">+ New Page</button>
												</Link>
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}

												<DataTable
													value={this.props.state.pagesList}
													paginator={true}
													rows={10}
													rowsPerPageOptions={[10, 20, 30, 50]}
													header={header}
													globalFilter={this.state.globalFilter}
													scrollable={true}
													responsive={true}>

													<Column field="id" header="ID"/>
													<Column field="title" header="Title"/>
													<Column field="slug" header="Slug"/>
													<Column header="Action" body={this.actionButtons}
														style={{textAlign: 'center', width: '10em'}}/>
												</DataTable>
											</div>
										</div>
										<SweetAlert
											show={this.state.openconformationmodel}
											title="Page Delete"
											text="Are you sure"
											showCancelButton
											onConfirm={() => {
												console.log('confirm')
												this.pageDelete()
											}}
											onCancel={() => {
												console.log('cancel')
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

}

const mapStateToProps = (state: RootState) => ({
	state: state.PagesList
})

export default connect(mapStateToProps, {
	fetchPages
})(Pages)