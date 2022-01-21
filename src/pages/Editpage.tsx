import * as React from 'react'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { fetchPageDetail, PageUpdate } from '../actions/pages'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { PageRecord } from '../constants/models'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'
import { State as PageDetailState } from '../reducers/pageDetail'

interface EditPageMatchParams {
	id: string
}

interface EditPageProps extends RouteComponentProps<EditPageMatchParams> {
	state: PageDetailState
	fetchPageDetail: any
	PageUpdate: any
}

interface EditPageState {
	pageDetail: PageRecord
	isPageUpdate: ActionTypeStates
	title: string
	slug: string
	description: string
	selectedPageID: number
	openPageUpdateConfirmModal: boolean
}

class EditPage extends React.Component<EditPageProps, EditPageState> {
	constructor(props: EditPageProps) {
		super(props)
		this.state = {
			pageDetail: null,
			isPageUpdate: null,
			title: null,
			slug: null,
			description: null,
			selectedPageID: null,
			openPageUpdateConfirmModal: null
		}
		this.openPageUpdateConfirmModal = this.openPageUpdateConfirmModal.bind(this)
	}

	public componentDidMount() {
		const pageId = this.props.match.params.id
		this.props.fetchPageDetail(pageId)
	}

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state) {
			this.setState({
				pageDetail: nextProps.state.pageDetail
			})
		}

	}

	public openPageUpdateConfirmModal(pageId: number) {

		this.setState({
			openPageUpdateConfirmModal: true,
			selectedPageID: pageId
		})

	}

	public render() {
		const {state} = this.props
		const {pageDetail, isPageUpdate} = this.state
		return (
			<div className="app">
				<Helmet>
					<title>Editpage</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Editpage</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid editpage_page">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i> Pages List
												<button className="btn btn-primary pull-right backnewbtn">Back to page</button>
											</div>
											<div className="card-block">
												{
													isPageUpdate === ActionTypeStates.INPROGRESS && (
														<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
													)
												}
												{
													isPageUpdate === ActionTypeStates.FAILED && (
														<div className="alert alert-danger">
															Something went wrong
														</div>
													)
												}
												{
													(state.status === ActionTypeStates.SUCCESS) &&
													<div className="row">
														<div className="col-lg-8">
															<div className="row">
																<div className="col-lg-8">
																	<div className="form-group mb-1">
																		<label>Title</label>
																		<Input
																			name="title"
																			placeholder="Enter Title"
																			value={pageDetail.title}
																			type={InputType.TEXT}
																			onChange={(value: any) => {
																				this.UpdatePage('title', value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-8">
																	<div className="form-group mb-1">
																		<label>Slug</label>
																		<Input
																			name="slug"
																			placeholder="Enter Slug"
																			value={pageDetail.slug}
																			type={InputType.TEXT}
																			onChange={(value: any) => {
																				this.UpdatePage('slug', value)
																			}}
																		/>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="col-lg-12">
																<div className="form-group mb-1">
																	<label>Description</label>
																	<ReactQuill
																		value={pageDetail.content}
																		onChange={(value: any) => {
																			this.UpdatePage('content', value)
																		}}
																	/>
																</div>
															</div>
															<div className="col-lg-12">
																<div className="form-group mb-1">
																	<button className="btn btn-primary" onClick={() => this.openPageUpdateConfirmModal(pageDetail.id)}>
																		Update Page
																	</button>
																</div>
															</div>
														</div>
													</div>
												}
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
						<SweetAlert
							show={this.state.openPageUpdateConfirmModal}
							title="Update Page"
							text="Are you sure to Update"
							showCancelButton
							onConfirm={() => {
								this.updatePageDetail()
								this.setState({openPageUpdateConfirmModal: false})
							}}
							onCancel={() => {
								this.setState({openPageUpdateConfirmModal: false})
							}}
							onEscapeKey={() => this.setState({openPageUpdateConfirmModal: false})}
							onOutsideClick={() => this.setState({openPageUpdateConfirmModal: false})}
						/>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}

	private UpdatePage(key: string, value: any) {

		const pageDetail: any = {...this.state.pageDetail}
		pageDetail[key] = value

		this.setState({pageDetail})

	}

	private updatePageDetail() {
		// console.log(pageId)
		const data = {
			id: this.state.selectedPageID,
			title: this.state.pageDetail.title,
			slug: this.state.pageDetail.slug,
			content: this.state.pageDetail.content
		}
		this.props.PageUpdate(data)
			.then(() => {
				this.setState({
					isPageUpdate: ActionTypeStates.SUCCESS
				})
				Alert.success('Page Update Successfully', {
					effect: 'genie',
					position: 'bottom-right'
				})
			}).catch(() => {
			this.setState({isPageUpdate: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})
		})
	}

}

const mapStateToProps = (state: RootState) => ({
	state: state.PageDetail
})

export default connect(mapStateToProps, {
	fetchPageDetail,
	PageUpdate
})(EditPage)
