import * as React from 'react'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { CreatePage } from '../actions/pages'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'

interface AddPageProps {
	CreatePage: any
}

interface AddPageState {
	title: string
	slug: string
	description: string
	isCreatePage: ActionTypeStates
	openAddPageConfirmModel: boolean
}

class AddPage extends React.Component<AddPageProps, AddPageState> {
	constructor(props: AddPageProps) {
		super(props)
		this.state = {
			title: null,
			slug: null,
			description: null,
			isCreatePage: null,
			openAddPageConfirmModel: null
		}
	}

	public openAddPageConfirmModal() {

		this.setState({
			openAddPageConfirmModel: true
		})

	}

	public render() {
		const {isCreatePage} = this.state
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
								<BreadcrumbItem active>AddPage</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid editpage_page">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i> Add Page
												<button className="btn btn-primary pull-right backnewbtn">Back to page</button>
											</div>
											<div className="card-block">
												{
													isCreatePage === ActionTypeStates.INPROGRESS && (
														<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
													)
												}
												{
													isCreatePage !== ActionTypeStates.INPROGRESS && (
														<div className="row">
															<div className="col-lg-8">
																<div className="row">
																	<div className="col-lg-8">
																		<div className="form-group mb-1">
																			<label>Title</label>
																			<Input
																				name="title"
																				placeholder="Enter Title"
																				value={this.state.title}
																				type={InputType.TEXT}
																				onChange={(title: string) => {
																					this.setState({title})
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
																				value={this.state.slug}
																				type={InputType.TEXT}
																				onChange={(slug: string) => {
																					this.setState({slug})
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
																			value={this.state.description}
																			onChange={(description: string) => {
																				this.setState({description})
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<button className="btn btn-primary" onClick={() => this.openAddPageConfirmModal()}
																		>Create Page
																		</button>
																	</div>
																</div>
															</div>
														</div>
													)
												}
												<SweetAlert
													show={this.state.openAddPageConfirmModel}
													title="Constant Delete"
													text="Are you sure"
													showCancelButton
													onConfirm={() => {
														console.log('confirm')
														this.AddPage()
													}}
													onCancel={() => {
														console.log('cancel')
														this.setState({openAddPageConfirmModel: false})
													}}
													onEscapeKey={() => this.setState({openAddPageConfirmModel: false})}
													onOutsideClick={() => this.setState({openAddPageConfirmModel: false})}
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

	private AddPage() {

		const data = {
			title: this.state.title,
			slug: this.state.slug,
			content: this.state.description
		}

		this.props.CreatePage(data)
			.then(() => {
				this.setState({
					isCreatePage: ActionTypeStates.SUCCESS,
					title: '',
					slug: '',
					description: ''

				})
				Alert.success('New Page Saved Successfully', {
					effect: 'genie',
					position: 'bottom-right'
				})
			}).catch(() => {
			this.setState({isCreatePage: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})
		})

	}

}

const mapStateToProps = (state: RootState) => ({})

export default connect(mapStateToProps, {
	CreatePage
})(AddPage)
															