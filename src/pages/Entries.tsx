import * as React from 'react'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { doUpdateEntrieDetail, fetchEntriesDetail, doRemoveRating } from '../actions/contests'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import Switch from '../components/Switch'
import { ActionTypeStates } from '../constants/action-types'
import { fileCarousel } from '../constants/carouselSettings'
import { InputType } from '../constants/enums'
import { EntriesRecord } from '../constants/models'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as EntriesDetailState } from '../reducers/entries'
import { RootState } from '../reducers/index'
import Alert from 'react-s-alert'
import ContestAttachments from '../components/ContestAttachments'


interface EntriesPageMatchParams {
	id: string
}

interface EntriesPageProps extends RouteComponentProps<EntriesPageMatchParams> {
	state: EntriesDetailState
	fetchEntriesDetail: any
	doUpdateEntrieDetail: any
}

interface EntriesPageState {
	entriesDetail: EntriesRecord
	isPageUpdate: ActionTypeStates
	openUpdateModel: boolean
	selectedEntrieID: number
	getRatingId: string
	RatingDeleteModal: boolean
	RatingDeleteStatus: ActionTypeStates
	isVisible :boolean	
}

class EntriesPage extends React.Component<EntriesPageProps, EntriesPageState> {
	constructor(props: EntriesPageProps) {
		super(props)

		this.state = {
			entriesDetail: null,
			isPageUpdate: null,
			openUpdateModel: null,
			selectedEntrieID: null,
			getRatingId: null,
			RatingDeleteModal: null,
			RatingDeleteStatus: null,
			isVisible: null			
		}

		this.openEntrieUpdateModal = this.openEntrieUpdateModal.bind(this)
	}

	public openEntrieUpdateModal(entrieId: any) {

		this.setState({
			openUpdateModel: true,
			selectedEntrieID: entrieId
		})

	}

	public openRatingDeleteModal(RatingId: string) {
		this.setState({
			RatingDeleteModal: true,
			getRatingId: RatingId
		})
	}

	public componentDidMount() {
		const entriesId = this.props.match.params.id
		console.log(entriesId)
		this.props.fetchEntriesDetail(entriesId)
	}

	public componentWillReceiveProps(nextProps: any) {
		console.log(nextProps.state)
		if (nextProps.state && nextProps.state.entrieDetail) {
			this.setState({isVisible: !nextProps.state.entrieDetail.isDraft})			
			this.setState({entriesDetail: nextProps.state.entrieDetail})
		}
	}

	public render() {
		const {state} = this.props
		const {entriesDetail} = this.state
		console.log(entriesDetail)	
		return (
			<div className="app">
				<Helmet>
					<title>Entries</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Edit Entries</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">

										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Edit Entries
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													(entriesDetail && state.status === ActionTypeStates.SUCCESS) &&
													<div className="row">
														<div className="col-lg-8">
															<div className="row">
																<div className="col-lg-8">
																	<div className="form-group mb-1">
																		<label>Title</label>
																		<Input
																			name="firstname"
																			placeholder="Enter Entrie Title"
																			value={entriesDetail.title}
																			type={InputType.TEXT}
																			onChange={(value: any) => {
																				this.UpdateEntries('title', value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-4">
																	<div className="form-group mb-1">
																		<label>Visible</label>
																		<Switch
																			checked={this.state.isVisible}
																			onChange={(v: any) => {
																				this.UpdateToggle('isDraft', v)
																			}}/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Files</label>
																		{
																			(entriesDetail.attachments.length > 0 ) &&
																		
																			<div style={{paddingLeft: '2rem', paddingRight: '2rem', width: '650px'}}>
																				{this.state.entriesDetail &&
																					<ContestAttachments attachments={this.state.entriesDetail.attachments} 
																				/>}
																			</div>
																		}
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Design Description</label>
																		<ReactQuill
																			value={entriesDetail.descriptionDesign}
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
																			onChange={(value: any) => {
																				this.UpdateEntries('descriptionFunctionality', value)
																			}}/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Usability Description</label>
																		<ReactQuill
																			value={entriesDetail.descriptionUsability}
																			onChange={(value: any) => {
																				this.UpdateEntries('descriptionUsability', value)
																			}}/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Market Potential Description</label>
																		<ReactQuill
																			value={entriesDetail.descriptionMarketPotential}
																			onChange={(value: any) => {
																				this.UpdateEntries('descriptionMarketPotential', value)
																			}}/>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-4">
															<div className="entries-rating_heading_title">Ratings</div>
															{entriesDetail.ratings === null &&
															<div className="rating_notfound">Ratings Not Given</div>
															}
															{
																entriesDetail.ratings !== null && entriesDetail.ratings.map((op: any , j: number) =>
																<div className="entries-rating" key={j}>
																	<div>
																		Judge: <span style={{
																		marginLeft: '10px',
																		fontWeight: 'bold'
																	}}>{op.judgeInfo.fullName}</span>
																	</div>
																	<div className="entries-rating__inner">
																		<span className="entries-rating_title">Design : </span>
																		<span className="entries-rating_value"> {op.design}/10</span>
																	</div>
																	<div className="entries-rating__inner">
																		<span className="entries-rating_title">Functionality : </span>
																		<span className="entries-rating_value">{op.functionality}/10</span>
																	</div>
																	<div className="entries-rating__inner">
																		<span className="entries-rating_title">Usability : </span>
																		<span className="entries-rating_value">{op.usability}/10</span>
																	</div>
																	<div className="entries-rating__inner">
																		<span className="entries-rating_title">Market Potential : </span>
																		<span
																			className="entries-rating_value">{op.marketPotential}/10</span>
																	</div>
																	<div className="ratingbtns">
																		<button className="btn btn-danger" onClick={() => this.openRatingDeleteModal(op._id)}><i
																			className="fa fa-trash "></i></button>
																	</div>
																</div>
																)
															}

														</div>

														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openEntrieUpdateModal(entriesDetail._id)}>
																	Update Entries
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
							title="Entries Update"
							text="Are you sure to Update"
							showCancelButton
							onConfirm={() => {
								this.updateEntriesDetail()
								this.setState({openUpdateModel: false})
							}}
							onCancel={() => {
								this.setState({openUpdateModel: false})
							}}
							onEscapeKey={() => this.setState({openUpdateModel: false})}
							onOutsideClick={() => this.setState({openUpdateModel: false})}
						/>
						<SweetAlert
							show={this.state.RatingDeleteModal}
							title="Delete"
							text="Are you sure you want to Delete"
							showCancelButton
							confirmButtonText="Yes"
							cancelButtonText="No"
							onConfirm={() => {
								this.DeleteRatingModal()
								this.setState({RatingDeleteModal: false})
							}}
							onCancel={() => {
								this.setState({RatingDeleteModal: false})
							}}
							onEscapeKey={() => this.setState({RatingDeleteModal: false})}
							onOutsideClick={() => this.setState({RatingDeleteModal: false})}
						/>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}

	private UpdateToggle(key: string, value: any) {
		if(value){
			this.setState({isVisible: true})
		}else{
			this.setState({isVisible: false})
		}
	}

	private UpdateEntries(key: string, value: any) {
		const entriesDetail1: any = {...this.state.entriesDetail}
		entriesDetail1[key] = value

		this.setState({entriesDetail: entriesDetail1})
	}

	private updateEntriesDetail() {
		const entrie = {
			title: this.state.entriesDetail.title,
			descriptionDesign: this.state.entriesDetail.descriptionDesign,
			descriptionFunctionality: this.state.entriesDetail.descriptionFunctionality,
			descriptionUsability: this.state.entriesDetail.descriptionUsability,
			descriptionMarketPotential: this.state.entriesDetail.descriptionMarketPotential,
			isDraft: this.state.isVisible ? false: true
		}

		doUpdateEntrieDetail(this.state.selectedEntrieID, entrie).then(() => {
			this.setState({
				isPageUpdate: ActionTypeStates.SUCCESS,
				openUpdateModel: false
			})
			Alert.success('New Entrie Updated Successfully',{position: 'bottom-right'})						
			this.props.fetchEntriesDetail(this.props.match.params.id)
		}).catch(() => {
			this.setState({isPageUpdate: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})									
		})
	}

	private DeleteRatingModal() {
		doRemoveRating(this.props.match.params.id, this.state.getRatingId)
			.then(() => {
				this.setState({
					RatingDeleteStatus: ActionTypeStates.SUCCESS,
					RatingDeleteModal: false
				})
				Alert.success('Delete Rating Successfully',{position: 'bottom-right'})									
				this.props.fetchEntriesDetail(this.props.match.params.id)
			}).catch(() => {
			this.setState({
				RatingDeleteStatus: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})												
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.EntriesDetail
})
export default connect(mapStateToProps, {
	fetchEntriesDetail,
	doUpdateEntrieDetail
})(EntriesPage)