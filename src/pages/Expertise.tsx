import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { fetchExpertise, doGetExpertiseCategory, doRemoveExpertise } from '../actions/expertise'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { ExpertiseCategoryOption } from '../constants/selectOptions'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as ExpertiseListState } from '../reducers/expertise'
import { RootState } from '../reducers/index'
import Alert from 'react-s-alert'

interface ExpertiseProps {
	state: ExpertiseListState
	fetchExpertise: any
}

interface ExpertiseState {
	globalFilter: string
	openconformationmodel: boolean,
	selectedExpertiseID: number,
	ExpertiseDeleteStatus: ActionTypeStates,
	category_name:any
}

class Expertise extends React.Component<ExpertiseProps, ExpertiseState> {
	constructor(props: ExpertiseProps) {
		super(props)
		this.state = {
			globalFilter: null,
			openconformationmodel: null,
			selectedExpertiseID: null,
			ExpertiseDeleteStatus: null,
			category_name:null
		}
	}

	public componentDidMount() {
		 this.props.fetchExpertise()
		 console.log(ExpertiseCategoryOption)
	}

	public openDeleteConfirmModal(expertiseId: number) {
		this.setState({
			openconformationmodel: true,
			selectedExpertiseID: expertiseId
		})
	}

	public expertName(rowData: any, column: any) {
		return 	<div>
					<Link to={'/expert/edit/' + rowData.expert._id + '/'}>
						{rowData.expert.name}
					</Link>
				</div>
	}

	public Category(rowData: any, column: any) {
		for(let item of ExpertiseCategoryOption){
			if(item._id==rowData.category){
				return  <div>
					{item.name}
				</div>
			}
		}
	}

	public expertisePublished(rowData: any, column: any) {
		return 	<div>
					{
						(rowData.isDraft === false) &&
						<div>
							<button type="button" className="btn btn-outline-success"><i className="fa fa-check "></i></button>&nbsp;
						</div>
					}
					{
						(rowData.isDraft === true) &&
						<div>
							<button type="button" className="btn btn-outline-success"><i className="fa fa-close "></i></button>&nbsp;
						</div>
					}
				</div>
	}

	public actionButtons(rowData: any, column: any) {
		return 	<div>
					<Link to={'/expertise/edit/' + rowData.shortId + '/' + rowData._id + '/'}>
						<button type="button" className="btn btn-outline-success"><i className="fa fa-edit "></i></button>
					</Link>&nbsp;
					<button type="button" className="btn btn-outline-danger" 
						onClick={() => {this.openDeleteConfirmModal(rowData.shortId)}}>
						<i className="fa fa-trash "></i>
					</button>
				</div>
	}

	public render() {
		const {state} = this.props
		// console.log(state)
		// const {} = this.state
		// console.log(this.state)
		console.log(this.props.state.expertiseList)

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
					<title>Expertise</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Expertise</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<div>
													<i className="fa fa-align-justify"></i> Expertise List
												</div>
												<div className="pull-right">
													<Link to={'/expertise/add/'}>
														<i className="fa fa-plus"></i> Add Expertise
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
														value={this.props.state.expertiseList}
														paginator={true}
														rows={10}
														rowsPerPageOptions={[10, 20, 30, 50]}
														header={header}
														globalFilter={this.state.globalFilter}
														scrollable={true}
														responsive={true} scrollHeight="400px">
														<Column header="Expertise Name"  field="name" style={{textAlign: 'center'}}/>
														<Column header="Expert Name" body={this.expertName} style={{textAlign: 'center'}}/>
														<Column body={this.Category} header="Category" style={{textAlign: 'center'}}/>
														<Column field="createdAt" header="Created At" style={{textAlign: 'center'}}/>
														<Column header="Published" body={this.expertisePublished} style={{textAlign: 'center'}}/>
														<Column header="Action" body={this.actionButtons} style={{textAlign: 'center', width: '15em'}}/>
													</DataTable>
													)
												}
											</div>
										</div>
										<SweetAlert
											show={this.state.openconformationmodel}
											title="Expertise Delete"
											text="Are you sure you want to delete this Expertise ?"
											showCancelButton
											onConfirm={() => {
												this.setState({openconformationmodel: false})
												this.ExpertiseDelete()
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

	private ExpertiseDelete() {
		doRemoveExpertise(this.state.selectedExpertiseID)
			.then(() => {
				this.setState({
					ExpertiseDeleteStatus: ActionTypeStates.SUCCESS,
					openconformationmodel: false
				})
				Alert.success('Expertise Delete Successfully',{position: 'bottom-right'})											
				this.props.fetchExpertise()
			}).catch(() => {
			this.setState({
				ExpertiseDeleteStatus: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})												
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.ExpertiseList
})

export default connect(mapStateToProps, {
	fetchExpertise
})(Expertise)