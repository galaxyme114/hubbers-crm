import * as React from 'react'
import Dropzone from 'react-dropzone'
import DateTimePicker from 'react-datetime-picker'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { doAddExpertiseReview } from '../actions/expertise'
import Input from '../components/Input'
import Icon from '../components/Icon'
import Spinner from '../components/Spinner'
import Switch from '../components/Switch'
import { doUploadMedia } from '../actions/media'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { ExpertiseReviewRecord } from '../constants/models'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'
import { slugify } from '../utils/stringUtils'
import Alert from 'react-s-alert'

interface AddExpertiseMatchParams {
	expertiseid: string
}

interface AddExpertiseReviewProps extends RouteComponentProps<AddExpertiseMatchParams> {
	doAddExpertiseReview: any
	history: any
}

interface AddExpertiseReviewState {
	isRender: boolean
	isCreateReview: ActionTypeStates
	openAddModel: boolean
	body: string
	rating: string
}

class AddExpertiseReview extends React.Component<AddExpertiseReviewProps, AddExpertiseReviewState> {
	constructor(props:AddExpertiseReviewProps) {
		super(props)

		this.state = {
			isRender: false,
			isCreateReview: null,
			openAddModel: null,
			body: '',
			rating: ''
		}
	}

	public openReviewAddModal() {
		this.setState({
			openAddModel: true
		})
	}

	public render() {
		const {isCreateReview} = this.state
		return (
			<div className="app">
				<Helmet>
					<title>Review</title>
				</Helmet>
				<Header/>

				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>ADD Review</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Add Review
											</div>
											<div className="card-block">
												{
													(isCreateReview === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													isCreateReview !== ActionTypeStates.INPROGRESS && (
													<div className="row">
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Body</label>
																<Input
																	name="Body"
																	placeholder="Enter Body"
																	value={this.state.body}
																	type={InputType.TEXTAREA}
																	onChange={(body: any) => {
																		this.setState({body})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Rating</label>
																<Input
																	name="Body"
																	placeholder="Enter Body"
																	value={this.state.rating}
																	type={InputType.TEXT}
																	onChange={(rating: any) => {
																		this.setState({rating})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openReviewAddModal()}>
																	Add Review
																</button>
															</div>
														</div>
													</div>
													)
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<SweetAlert
							show={this.state.openAddModel}
							title="Review Add"
							text="Are you sure you want to Add Review"
							showCancelButton
							onConfirm={() => { this.doAddExpertiseReviewDetail() }}
							onCancel={() => { this.setState({ openAddModel: false }) }}
							onEscapeKey={() => this.setState({ openAddModel: false })}
							onOutsideClick={() => this.setState({ openAddModel: false })}
						/>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}

	private doAddExpertiseReviewDetail() {
		const ExpertiseId = this.props.match.params.expertiseid
		const Review = {
			body : this.state.body,
			rating : this.state.rating			
		}
		doAddExpertiseReview(ExpertiseId,Review).then(() => {
			this.setState({
				isCreateReview: ActionTypeStates.SUCCESS,
				openAddModel: false,
				body: '',
				rating: ''
			})
			this.props.history.goBack();			
		}).catch(() => {
			this.setState({ isCreateReview: ActionTypeStates.FAILED})
		})
	}

}

const mapStateToProps = (state: RootState) => ({
})

export default connect(mapStateToProps, {
	doAddExpertiseReview
})(AddExpertiseReview)