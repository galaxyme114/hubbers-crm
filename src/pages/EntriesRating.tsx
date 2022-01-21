import Slider, { createSliderWithTooltip } from 'rc-slider'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert'
// import Slider from 'react-slick'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { doUpdateEntrieRating, fetchEntriesDetail } from '../actions/contests'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { EntriesRecord } from '../constants/models'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as EntriesDetailState } from '../reducers/entries'
import { RootState } from '../reducers/index'

const SliderWithTooltip = createSliderWithTooltip(Slider)

interface EntriesRatingPageMatchParams {
	id: string,
	ratingId: string
}

interface EntriesRatingPageProps extends RouteComponentProps<EntriesRatingPageMatchParams> {
	state: EntriesDetailState
	fetchEntriesDetail: any
	doUpdateEntrieRating: any
}

interface EntriesRatingPageState {
	ratingDetail: EntriesRecord
	entriesDetail: EntriesRecord
	isPageUpdate: ActionTypeStates
	openUpdateModel: boolean
	selectedRatingId: any
}

class EntriesRatingPage extends React.Component<EntriesRatingPageProps, EntriesRatingPageState> {
	constructor(props: EntriesRatingPageProps) {
		super(props)

		this.state = {
			ratingDetail: null,
			entriesDetail: null,
			isPageUpdate: null,
			openUpdateModel: null,
			selectedRatingId: null
		}

		this.openEntrieRatingUpdateModal = this.openEntrieRatingUpdateModal.bind(this)
	}

	public openEntrieRatingUpdateModal(ratingId: any) {

		this.setState({
			openUpdateModel: true,
			selectedRatingId: ratingId
		})

	}

	public componentWillMount() {
		const entriesId = this.props.match.params.id
		console.log(entriesId)
		this.props.fetchEntriesDetail(entriesId)
	}

	public componentWillReceiveProps(nextProps: any) {
		let tempArrayRating
		const paramsRatingId = this.props.match.params.ratingId
		if (nextProps.state && nextProps.state.entrieDetail.ratings) {
			for (const item of nextProps.state.entrieDetail.ratings) {
				if (item._id === paramsRatingId) {
					tempArrayRating = item
				}
			}
		}
		this.setState({
			entriesDetail: nextProps.state.entrieDetail,
			ratingDetail: tempArrayRating
		})
	}

	public render() {
		const {state} = this.props
		const {entriesDetail, ratingDetail} = this.state
		console.log(entriesDetail)
		console.log(ratingDetail)
		return (
			<div className="app">
				<Helmet>
					<title>Entrie Rating</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Edit Entrie Rating</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">

										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Edit Entrie Rating
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													(entriesDetail && state.status === ActionTypeStates.SUCCESS) &&
													<div className="row">
														<div className="col-lg-6">
															<div className="row">
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Title</label>
																		<Input
																			name="firstname"
																			placeholder="Enter Entrie Title"
																			value={entriesDetail.title}
																			type={InputType.TEXT}
																			disabled={true}
																			onChange={(value: any) => {
																				this.UpdateEntries('title', value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Design Description</label>
																		<ReactQuill
																			value={entriesDetail.descriptionDesign}
																			readOnly={true}
																			onChange={(value: any) => {
																				this.UpdateEntries('descriptionDesign', value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Functionality Description</label>
																		<ReactQuill
																			value={entriesDetail.descriptionFunctionality}
																			readOnly={true}
																			onChange={(value: any) => {
																				this.UpdateEntries('descriptionFunctionality', value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Usability Description</label>
																		<ReactQuill
																			value={entriesDetail.descriptionUsability}
																			readOnly={true}
																			onChange={(value: any) => {
																				this.UpdateEntries('descriptionUsability', value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Market Potential Description</label>
																		<ReactQuill
																			value={entriesDetail.descriptionMarketPotential}
																			readOnly={true}
																			onChange={(value: any) => {
																				this.UpdateEntries('descriptionMarketPotential', value)
																			}}
																		/>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-6">
															{
																(ratingDetail && state.status === ActionTypeStates.SUCCESS) &&
																<div className="row">
																	<div className="col-lg-12">
																		<div className="form-group mb-3">
																			<label>Design</label>
																			<SliderWithTooltip min={0} max={10} step={0.1} value={ratingDetail.design}
																				onChange={(value: any) => {
																					this.UpdateEntries('design', value)
																				}}
																			/>
																			<Input
																				name="designComment"
																				type={InputType.TEXTAREA}
																				value={ratingDetail.designComment}
																				onChange={(value: any) => this.UpdateEntries('designComment', value)}/>
																		</div>
																	</div>
																	<div className="col-lg-12">
																		<div className="form-group mb-3">
																			<label>Functionality</label>
																			<SliderWithTooltip min={0} max={10} step={0.1}
																				value={ratingDetail.functionality}
																				onChange={(value: any) => {
																					this.UpdateEntries('functionality', value)
																				}}
																			/>
																			<Input
																				name="functionalityComment"
																				type={InputType.TEXTAREA}
																				value={ratingDetail.functionalityComment}
																				onChange={(value: any) => this.UpdateEntries('functionalityComment', value)}/>
																		</div>
																	</div>
																	<div className="col-lg-12">
																		<div className="form-group mb-3">
																			<label>Usability</label>
																			<SliderWithTooltip min={0} max={10} step={0.1}
																				value={ratingDetail.usability}
																				onChange={(value: any) => {
																					this.UpdateEntries('usability', value)
																				}}
																			/>
																			<Input
																				name="usabilityComment"
																				type={InputType.TEXTAREA}
																				value={ratingDetail.usabilityComment}
																				onChange={(value: any) => this.UpdateEntries('usabilityComment', value)}/>
																		</div>
																	</div>
																	<div className="col-lg-12">
																		<div className="form-group mb-3">
																			<label>Market Potential</label>
																			<SliderWithTooltip min={0} max={10} step={0.1}
																				value={ratingDetail.marketPotential}
																				onChange={(value: any) => {
																					this.UpdateEntries('marketPotential', value)
																				}}
																			/>
																			<Input
																				name="marketPotentialComment"
																				type={InputType.TEXTAREA}
																				value={ratingDetail.marketPotentialComment}
																				onChange={(value: any) => this.UpdateEntries('marketPotentialComment', value)}/>
																		</div>
																	</div>
																</div>
															}
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openEntrieRatingUpdateModal(ratingDetail._id)}>
																	Update Rating
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
							title="Entrie Rating Update"
							text="Are you sure you want to update entrie ratings"
							showCancelButton
							onConfirm={() => {
								console.log('confirm')
								this.updateEntriesRatingDetail()
							}}
							onCancel={() => {
								console.log('cancel')
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

	private UpdateEntries(key: string, value: any) {
		const entriesDetail1: any = {...this.state.ratingDetail}
		entriesDetail1[key] = value
		this.setState({ratingDetail: entriesDetail1})
	}

	private updateEntriesRatingDetail() {
		const entriRating = {
			design: this.state.ratingDetail.design,
			functionality: this.state.ratingDetail.functionality,
			usability: this.state.ratingDetail.usability,
			marketPotential: this.state.ratingDetail.marketPotential
		}
		doUpdateEntrieRating(this.props.match.params.id, this.state.selectedRatingId, entriRating)
			.then(() => {
				this.setState({
					isPageUpdate: ActionTypeStates.SUCCESS,
					openUpdateModel: false
				})
				Alert.success('New Rating Updated Successfully', {position: 'bottom-right'})										
				this.props.fetchEntriesDetail(this.props.match.params.id)
			}).catch(() => {
			this.setState({isPageUpdate: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong', {position: 'bottom-right'})												
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.EntriesDetail
})
export default connect(mapStateToProps, {
	fetchEntriesDetail,
	doUpdateEntrieRating
})(EntriesRatingPage)