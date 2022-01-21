import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { fetchProjects, doRemoveProject} from '../actions/projects'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as ProjectsListState } from '../reducers/projects'
import { RootState } from '../reducers/index'
import Alert from 'react-s-alert'

interface ProjectsProps {
	state: ProjectsListState
	fetchProjects: any
}

interface ProjectsState {
	globalFilter: string
	openconformationmodel: boolean,
	selectedProjectID: number,
	ProjectDeleteStatus: ActionTypeStates
}

class Projects extends React.Component<ProjectsProps, ProjectsState> {
	constructor(props: ProjectsProps) {
		super(props)
		this.state = {
			globalFilter: null,
			openconformationmodel: null,
			selectedProjectID: null,
			ProjectDeleteStatus: null
		}
		this.actionButtons=this.actionButtons.bind(this)
		this.ThumbnailColumn = this.ThumbnailColumn.bind(this)
		
	}

	public componentDidMount() {
		 this.props.fetchProjects()
	}

	public openDeleteConfirmModal(ProjectId: number) {
		console.log('hii')		
		this.setState({
			openconformationmodel: true,
			selectedProjectID: ProjectId
		})
	}

	public ThumbnailColumn(rowData: any, column: any) {
		return  <img src={rowData.featuredImageUrl}
			style={{width: '60px', height: '60px'}}/>
	}

	public Published(rowData: any, column: any) {
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

	public userName(rowData: any, column: any) {

		if(rowData.userInfo){
			return 	<div><Link to={'/user/edit/' + rowData.userId + '/'}>
			{rowData.userInfo.name}
					</Link>
			</div>
		}else{
			return	<div>N/A</div>
		}
	}

	public actionButtons(rowData: any, column: any) {
		return 	<div>
					<Link to={'/project/edit/' + rowData._id + '/'}>
						<button type="button" className="btn btn-outline-success"><i className="fa fa-edit "></i></button>
					</Link>&nbsp;
					<button type="button" className="btn btn-outline-danger"
						onClick={() => this.openDeleteConfirmModal(rowData._id)}>
						<i className="fa fa-trash "></i>
					</button>
				</div>
	}

	public render() {
		const {state} = this.props
		console.log(state)
		console.log(this.props.state.Projects)

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
					<title>Projects</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Projects</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<div>
													<i className="fa fa-align-justify"></i> Projects List
												</div>
												<div className="pull-right">
													<Link to={'/project/add/'}>
														<i className="fa fa-plus"></i> Add Projects
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
														value={this.props.state.Projects}
														paginator={true}
														rows={10}
														rowsPerPageOptions={[10, 20, 30, 50]}
														header={header}
														globalFilter={this.state.globalFilter}
														scrollable={true}
														responsive={true} scrollHeight="400px">
														<Column field="featuredImageUrl" header="Thumbnail" body={this.ThumbnailColumn} 
														style={{textAlign: 'center'}}/>
														<Column header="User Name" body={this.userName} style={{textAlign: 'center'}}/>
														<Column header="Project Name"  field="name" style={{textAlign: 'center'}}/>
														<Column header="Innovation Category"  field="innovationCategory" style={{textAlign: 'center'}}/>
														<Column header="Product Category"  field="productCategory" style={{textAlign: 'center'}}/>
														<Column header="Published" body={this.Published} style={{textAlign: 'center'}}/> 
														<Column header="Action" body={this.actionButtons} style={{textAlign: 'center', width: '15rem'}}/>
													</DataTable>
													)
												}
											</div>
										</div>
										<SweetAlert
											show={this.state.openconformationmodel}
											title="Projects Delete"
											text="Are you sure you want to delete this projects ?"
											showCancelButton
											onConfirm={() => {
												this.setState({openconformationmodel: false})
												this.ProjectDelete()
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

	private ProjectDelete() {
		doRemoveProject(this.state.selectedProjectID)
			.then(() => {
				this.setState({
					ProjectDeleteStatus: ActionTypeStates.SUCCESS,
					openconformationmodel: false
				})
				Alert.success('Project Delete Successfully',{position: 'bottom-right'})											
				this.props.fetchProjects()
			}).catch(() => {
			this.setState({
				ProjectDeleteStatus: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})												
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.ProjectsList
})

export default connect(mapStateToProps, {
	fetchProjects
})(Projects)