import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { fetchPost, doRemovePost} from '../actions/post'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as PostListState } from '../reducers/post'
import { RootState } from '../reducers/index'
import Alert from 'react-s-alert'

interface PostProps {
	state: PostListState
	fetchPost: any
}

interface PostState {
	globalFilter: string
	openconformationmodel: boolean,
	selectedPostID: number,
	PostDeleteStatus: ActionTypeStates
}

class Post extends React.Component<PostProps, PostState> {
	constructor(props: PostProps) {
		super(props)
		this.state = {
			globalFilter: null,
			openconformationmodel: null,
			selectedPostID: null,
			PostDeleteStatus: null
		}
		this.actionButtons=this.actionButtons.bind(this)
		
	}

	public componentDidMount() {
		 this.props.fetchPost()
	}

	public openDeleteConfirmModal(PostId: number) {
		this.setState({
			openconformationmodel: true,
			selectedPostID: PostId
		})
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

	public actionButtons(rowData: any, column: any) {
		return 	<div>
					<Link to={'/post/edit/' + rowData._id + '/'}>
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
		console.log(this.props.state.postlist)

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
					<title>Post</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Post</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<div>
													<i className="fa fa-align-justify"></i> Post List
												</div>
												<div className="pull-right">
													<Link to={'/post/add/'}>
														<i className="fa fa-plus"></i> Add Post
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
														value={this.props.state.postlist}
														paginator={true}
														rows={10}
														rowsPerPageOptions={[10, 20, 30, 50]}
														header={header}
														globalFilter={this.state.globalFilter}
														scrollable={true}
														responsive={true} scrollHeight="400px">
														{/* <Column header="User Name" field="user.name" style={{textAlign: 'center'}}/> */}
														<Column header="Created At"  field="createdAt" style={{textAlign: 'center'}}/>
														<Column header="Published" body={this.Published} style={{textAlign: 'center'}}/> 
														<Column header="Action" body={this.actionButtons} style={{textAlign: 'center', width: '15rem'}}/>
													</DataTable>
													)
												}
											</div>
										</div>
										<SweetAlert
											show={this.state.openconformationmodel}
											title="Post Delete"
											text="Are you sure you want to delete this Post ?"
											showCancelButton
											onConfirm={() => {
												this.setState({openconformationmodel: false})
												this.PostDelete()
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

	private PostDelete() {
		doRemovePost(this.state.selectedPostID)
			.then(() => {
				this.setState({
					PostDeleteStatus: ActionTypeStates.SUCCESS,
					openconformationmodel: false
				})
				Alert.success('Post Delete Successfully',{position: 'bottom-right'})											
				this.props.fetchPost()
			}).catch(() => {
			this.setState({
				PostDeleteStatus: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})												
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.PostList
})

export default connect(mapStateToProps, {
	fetchPost
})(Post)