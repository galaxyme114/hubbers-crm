import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { fetchExpert, doRemoveExpert } from '../actions/expert'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as ExpertListState } from '../reducers/expert'
import { RootState } from '../reducers/index'
import Alert from 'react-s-alert'

interface ExpertProps {
	state: ExpertListState
	fetchExpert: any
}

interface ExpertState {
	globalFilter: string
	openconformationmodel: boolean,
	selectedExpertID: number,
	ExpertDeleteStatus: ActionTypeStates
}

class Expert extends React.Component<ExpertProps, ExpertState> {
	constructor(props: ExpertProps) {
		super(props)
		this.state = {
			globalFilter: null,
			openconformationmodel: null,
			selectedExpertID: null,
			ExpertDeleteStatus: null
		}
		this.expertThumbnailColumn = this.expertThumbnailColumn.bind(this)	
		this.openDeleteConfirmModal = this.openDeleteConfirmModal.bind(this)	
		this.actionButtons = this.actionButtons.bind(this)	
	}

	public componentDidMount() {
		this.props.fetchExpert()
	}

	public openDeleteConfirmModal(expertId: number) {
		this.setState({
			openconformationmodel: true,
			selectedExpertID: expertId
		})
	}

	public expertThumbnailColumn(rowData: any, column: any) {
		return  <img src={rowData.user.thumbnailImageUrl}
			style={{width: '60px', height: '60px'}}/>
	}

	public actionButtons(rowData: any, column: any) {
		return 	<div>
					<Link to={'/expert/edit/' + rowData._id + '/'}>
						<button type="button" className="btn btn-outline-success"><i className="fa fa-edit "></i></button>
					</Link>&nbsp;
					<button type="button" className="btn btn-outline-danger" 
						onClick={() => {this.openDeleteConfirmModal(rowData._id)}}>
						<i className="fa fa-trash "></i>
					</button>
				</div>
	}

	public render() {
		const {state} = this.props
		console.log(state)
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
					<title>Expert</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Expert</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<div>
													<i className="fa fa-align-justify"></i> Expert List
												</div>
												<div className="pull-right">
													<Link to={'/expert/add/'}>
														<i className="fa fa-plus"></i> Add Expert
													</Link>
												</div>
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													state.status !== ActionTypeStates.INPROGRESS && (
													<DataTable
														value={this.props.state.expertList}
														paginator={true}
														rows={10}
														rowsPerPageOptions={[10, 20, 30, 50]}
														header={header}
														globalFilter={this.state.globalFilter}
														scrollable={true}
														responsive={true} scrollHeight="400px">
														<Column field="featuredImageUrl" header="Thumbnail" body={this.expertThumbnailColumn} 
														style={{textAlign: 'center'}}/>
														<Column header="Name" field="user.name" style={{textAlign: 'center'}}/>
														<Column field="caption" header="Caption"/>
														<Column field="rating" header="Rating"/>
														<Column field="reviews" header="Review"/>
														<Column header="Action" body={this.actionButtons} style={{textAlign: 'center', width: '15em'}}/>
													</DataTable>
													)
												}
											</div>
										</div>
										<SweetAlert
											show={this.state.openconformationmodel}
											title="Expert Delete"
											text="Are you sure you want to delete this Expert ?"
											showCancelButton
											onConfirm={() => {
												this.setState({openconformationmodel: false})
												this.ExpertDelete()
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

	private ExpertDelete() {
		// this.setState({ isLoading: true })
		doRemoveExpert(this.state.selectedExpertID)
			.then(() => {
				this.setState({
					ExpertDeleteStatus: ActionTypeStates.SUCCESS,
					openconformationmodel: false
				})
				Alert.success('Expert Delete Successfully',{position: 'bottom-right'})							
				this.props.fetchExpert()
			})
			.catch(() => {
			this.setState({
				ExpertDeleteStatus: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})									
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.ExpertList
})

export default connect(mapStateToProps, {
	fetchExpert
})(Expert)