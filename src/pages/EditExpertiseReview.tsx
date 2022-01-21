import * as React from 'react'
import DateTimePicker from 'react-datetime-picker'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { fetchExpertiseReviewDetail, updateExpertiseReviewDetail} from '../actions/expertise'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import Switch from '../components/Switch'
import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { ExpertiseReviewRecord } from '../constants/models'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as ExpertiseReviewDetailState } from '../reducers/expertiseReviewDetail'
import { RootState } from '../reducers/index'
import { slugify } from '../utils/stringUtils'
import { availabilityScopeOptions } from '../constants/selectOptions'
import Alert from 'react-s-alert'

interface EditExpertiseReviewMatchParams {
	expertiseid: string
	ReviewsId:string
}

interface EditExpertiseReviewProps extends RouteComponentProps<EditExpertiseReviewMatchParams> {
	state: ExpertiseReviewDetailState
	fetchExpertiseReviewDetail: any
	updateExpertiseReviewDetail: any
}

interface EditExpertiseReviewState {
	isPageUpdate: ActionTypeStates
	openUpdateModel: boolean
	isRender: boolean
	isVisible :boolean	
	globalFilter: string	
	expertiseReview: ExpertiseReviewRecord
}

class EditExpertiseReview extends React.Component<EditExpertiseReviewProps, EditExpertiseReviewState> {
	constructor(props: EditExpertiseReviewProps) {
		super(props)
		this.state = {
			expertiseReview: null,
			globalFilter: null,			
			isPageUpdate: null,
			openUpdateModel: null,
			isRender: false,
			isVisible: null
		}

		this.openExpertiseReviewUpdateModal = this.openExpertiseReviewUpdateModal.bind(this)
	}

	public openExpertiseReviewUpdateModal() {
		this.setState({
			openUpdateModel: true
		})
	}

	public componentDidMount() {
		const ExpertiseId = this.props.match.params.expertiseid
		const ExpertiseReviewId = this.props.match.params.ReviewsId
		this.props.fetchExpertiseReviewDetail(ExpertiseId,ExpertiseReviewId)
	}

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state && nextProps.state.expertiseReview) {
			this.setState({
				expertiseReview: nextProps.state.expertiseReview,
			})
		}
	}

	public render() {
		const {state} = this.props
		const {expertiseReview} = this.state
		console.log(expertiseReview)
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
								<BreadcrumbItem active>Edit Expertise Review</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Edit Expertise Review
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													(expertiseReview && state.status === ActionTypeStates.SUCCESS) &&
													<div className="row" style={{padding:"13px"}}>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Body:</label>
																<Input
																	name="body"
																	placeholder="Enter Detail"
																	value={expertiseReview.body}
																	type={InputType.TEXTAREA}
																	onChange={(body: any) => {
																		this.updateExpertiseReview('body', body)
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Rating:</label>
																<Input
																	name="rating"
																	placeholder="EnterRrating"
																	value={expertiseReview.rating}
																	type={InputType.TEXT}
																	onChange={(rating: any) => {
																		this.updateExpertiseReview('rating', rating)
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openExpertiseReviewUpdateModal()}>
																	Update Expertise Review
																</button>
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
							show={this.state.openUpdateModel}
							title="Expertise Review Update"
							text="Are you sure you want to update Expertise Review"
							showCancelButton
							onConfirm={() => {
								this.updateExpertiseReviewDetail()
								this.setState({openUpdateModel: false})
							}}
							onCancel={() => {
								this.setState({openUpdateModel: false})
							}}
							onEscapeKey={() => this.setState({openUpdateModel: false})}
							onOutsideClick={() => this.setState({openUpdateModel: false})}
						/>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}

	private updateExpertiseReview(key: string, value: any) {
		const expertiseReview: any = {...this.state.expertiseReview}
		expertiseReview[key] = value
		this.setState({expertiseReview})
	}

	private updateExpertiseReviewDetail() {
		const ExpertiseId = this.props.match.params.expertiseid
		const ExpertiseReviewId = this.props.match.params.ReviewsId
		const ExpertiseReview = {
			body: this.state.expertiseReview.body,
			rating: this.state.expertiseReview.rating
		}
		this.props.updateExpertiseReviewDetail(ExpertiseId, ExpertiseReviewId, ExpertiseReview).then(() => {
			this.setState({
				isPageUpdate: ActionTypeStates.SUCCESS,
				openUpdateModel: false
			})
			this.props.history.goBack();
			Alert.success('Expertise Review Updated Successfully',{position: 'bottom-right'})			
		}).catch(() => {
			this.setState({isPageUpdate: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})						
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.ExpertiseReviewDetail,
})
export default connect(mapStateToProps, {
	fetchExpertiseReviewDetail,
	updateExpertiseReviewDetail
})(EditExpertiseReview)