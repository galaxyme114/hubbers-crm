import * as React from 'react'
import Dropzone from 'react-dropzone'
import { Column } from 'primereact/components/column/Column'
import DateTimePicker from 'react-datetime-picker'
import { DataTable } from 'primereact/components/datatable/DataTable'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { doUploadMedia } from '../actions/media'
import { fetchExpertiseDetail, fetchExpertiseOrderList, fetchExpertiseReviewList, doGetSkills, doGetExpertiseCategory, updateExpertiseDetail, doRemoveExpertiseOrder, doRemoveExpertiseReview } from '../actions/expertise'
import { fetchExpert } from '../actions/expert'
import Input from '../components/Input'
import Icon from '../components/Icon'
import Spinner from '../components/Spinner'
import Switch from '../components/Switch'
import { ActionTypeStates } from '../constants/action-types'
import { Currency, InputType } from '../constants/enums'
import { ExpertiseRecord, ExpertiseReviewRecord, ExpertiseOrderRecord, FAQRecord, PackageRecord } from '../constants/models'
import { availabilityScopeOptions } from '../constants/selectOptions'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as ExpertiseDetailState } from '../reducers/expertiseDetail'
import { State as ExpertiseOrderState } from '../reducers/expertiseOrderList'
import { State as ExpertiseReviewState } from '../reducers/expertiseReviewList'
import { State as ExpertListState } from '../reducers/expert'
import { RootState } from '../reducers/index'
import { slugify } from '../utils/stringUtils'
import Alert from 'react-s-alert'

interface EditExpertiseMatchParams {
	shortId: string
	id: string
}

interface EditExpertiseProps extends RouteComponentProps<EditExpertiseMatchParams> {
	state: ExpertiseDetailState
	orderstate: ExpertiseOrderState
	expertstate: ExpertListState
	reviewState: ExpertiseReviewState
	fetchExpertiseDetail: any
	updateExpertiseDetail: any
	fetchExpertiseOrderList: any
	fetchExpertiseReviewList: any
	fetchExpert:any
}

interface EditExpertiseState {
	expertiseDetail: ExpertiseRecord
	isPageUpdate: ActionTypeStates
	ExpertiseDeleteStatus: ActionTypeStates
	openUpdateModel: boolean
	openconformationmodel:boolean
	openconformationReviewmodel: boolean
	isRender: boolean
	isVisible :boolean	
	globalFilter: string	
	expertiseOrderList: ExpertiseOrderRecord
	expertiseReviewList: ExpertiseReviewRecord
	ExpertiseId: string
	ExpertiseShortId:string
	selectedExpertiseID: string
	selectedExpertiseOrderID: string
	selectedExpertiseReviewID:string
	gallery: string[]
	faq: FAQRecord[]
	packages: PackageRecord[]
	briefTemplate:any
	fields: any
	uploadableFiles: any[]
	isUploading: boolean
	expertlist: any
	expertiseDetailExpert: any
	// expertiseUserDetail: any[]
}

class EditExpertise extends React.Component<EditExpertiseProps, EditExpertiseState> {
	constructor(props: EditExpertiseProps) {
		super(props)
		this.state = {
			expertiseDetail: null,
			expertiseOrderList: null,
			expertiseReviewList: null,
			globalFilter: null,			
			isPageUpdate: null,
			ExpertiseDeleteStatus: null,
			openUpdateModel: null,
			openconformationmodel: null,
			openconformationReviewmodel: null,
			isRender: false,
			isVisible: false,
			ExpertiseId: null,
			ExpertiseShortId: null,
			selectedExpertiseID: null,
			selectedExpertiseOrderID: null,
			selectedExpertiseReviewID: null,
			gallery: [],
			packages: [{
				name: '',
				price: 0,
				currency: Currency.USD,
				description: '',
				availability: '',
				delivery: 0
			}],
			briefTemplate: [],
			fields: [{
				name: '',
				formType: ''
			}],
			uploadableFiles: [],
			isUploading: false,
			faq: [{ title: '', answer: '' }],
			expertlist: null,
			expertiseDetailExpert: null
			// expertiseUserDetail: null	
		}
		this.openExpertiseUpdateModal = this.openExpertiseUpdateModal.bind(this);
		this.actionButtons = this.actionButtons.bind(this);
		this.actionButtonsReview = this.actionButtonsReview.bind(this);
		this.openDeleteModal=this.openDeleteModal.bind(this);
	}

	public openExpertiseUpdateModal() {
		this.setState({
			openUpdateModel: true
		})
	}

	public openDeleteModal(expertiseId: string,orderId: string) {
		this.setState({
			openconformationmodel: true,
			selectedExpertiseID: expertiseId,
			selectedExpertiseOrderID: orderId
		})
	}

	public openReviewDeleteModal(expertiseId: string ,ReviewId: string) {
		this.setState({
			openconformationReviewmodel: true,
			selectedExpertiseID: expertiseId,
			selectedExpertiseReviewID: ReviewId
		})
	}

	public componentDidMount() {
		const ExpertiseShortId = this.props.match.params.shortId
		const ExpertiseId = this.props.match.params.id
		this.setState({
			ExpertiseId: this.props.match.params.id,
			ExpertiseShortId: this.props.match.params.shortId
		})
		this.props.fetchExpertiseDetail(ExpertiseShortId)
		this.props.fetchExpertiseOrderList(ExpertiseId)
		this.props.fetchExpertiseReviewList(ExpertiseId)
		this.props.fetchExpert()
	}

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state && nextProps.state.expertise) {
			this.setState({isVisible: !nextProps.state.expertise.isDraft})
			this.setState({
					expertiseDetail: nextProps.state.expertise,
					expertiseDetailExpert: nextProps.state.expertise.expert._id
				})
			if (nextProps.state.expertise.packages) {
				if (nextProps.state.expertise.packages.length === 0) {
					nextProps.state.expertise.packages = [{
						name: '',
						price: 0,
						currency: Currency.USD,
						description: '',
						availability: '',
						delivery: 0
					}]
				}
			}
			if (nextProps.state.expertise.faq) {
				if (nextProps.state.expertise.faq.length === 0) {
					nextProps.state.expertise.faq = [{ title: '', answer: '' }]
				}
			}
			// if (nextProps.state.expertise.briefTemplate) {
			// 	if (nextProps.state.expertise.briefTemplate.fields.length === 0) {
			// 		nextProps.state.expertise.briefTemplate.fields = [{name:'', formType: ''}]
			// 	}
			// }
		}
		if (nextProps.orderstate && nextProps.orderstate.expertiseOrderList) {
			this.setState({expertiseOrderList: nextProps.orderstate.expertiseOrderList})
		}
		if (nextProps.reviewState && nextProps.reviewState.expertiseReviewlist) {
			this.setState({expertiseReviewList: nextProps.reviewState.expertiseReviewlist})
		}
		if (nextProps.expertstate && nextProps.expertstate.expertList) {
			const selectExpertListOptions=[];	
			if(nextProps.expertstate.expertList){
				for(let expert of nextProps.expertstate.expertList){
					selectExpertListOptions.push({value:expert._id,label:expert.user.name})
				}
			}
			this.setState({ expertlist: selectExpertListOptions})
		}
	}

	public expertisePackage(rowData: any, column: any) {
		for (const item of rowData.expertise.packages) {
			if(item._id == rowData.selectedPackage){
				return 	<div>
						{item.name}
					</div>
			}
		}
	}

	public ProjectName(rowData: any, column: any) {
		return 	<div>
					{
						(rowData.project !== null) &&
						<div>
							{rowData.project.name}
						</div>
					}
					{
						(rowData.project === null) &&
						<div>
							N/A
						</div>
					}
				</div>
	}

	public expertiseStatus(rowData: any, column: any) {
		return 	<div>
					{
						(rowData.completed === false) &&
						<div>
							<button type="button" className="btn btn-outline-success"><i className="fa fa-check "></i></button>&nbsp;
						</div>
					}
					{
						(rowData.completed === true) &&
						<div>
							<button type="button" className="btn btn-outline-success"><i className="fa fa-close "></i></button>&nbsp;
						</div>
					}
				</div>
	}

	public actionButtons(rowData: any, column: any) {
		return 	<div>
					<Link to={'/expertiseOrder/edit/'+ rowData.expertise._id + '/order/' + rowData._id + '/'}>
						<button type="button" className="btn btn-outline-success"><i className="fa fa-edit "></i></button>
					</Link>&nbsp;
					<button type="button" className="btn btn-outline-danger" onClick={() => {this.openDeleteModal(rowData.expertise._id,rowData._id)}}>
						<i className="fa fa-trash "></i>
					</button>
				</div>
	}

	public actionButtonsReview(rowData: any, column: any) {
		return 	<div>
					<Link to={'/expertiseReview/edit/'+ this.state.ExpertiseId + '/reviews/' + rowData._id + '/'}>
						<button type="button" className="btn btn-outline-success"><i className="fa fa-edit "></i></button>
					</Link>
					&nbsp;
					<button type="button" className="btn btn-outline-danger" onClick={() => {this.openReviewDeleteModal(this.state.ExpertiseId ,rowData._id)}}>
						<i className="fa fa-trash "></i>
					</button>
				</div>
	}

	public render() {
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
		const {state,orderstate,expertstate,reviewState} = this.props
		const {expertiseDetail,expertiseOrderList,expertlist, expertiseReviewList} = this.state;
		console.log(expertiseDetail)
		console.log(expertiseReviewList)
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
								<BreadcrumbItem active>Edit Expertise</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">

										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Edit Expertise
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													(expertiseDetail && state.status === ActionTypeStates.SUCCESS) &&
													<div className="row">
														<div className="col-lg-12">
															<div className="row">
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>User Name:
																			<Link to={'/user/edit/' + expertiseDetail.userId + '/'}>
																				<span style={{"margin":"15px"}}>{expertiseDetail.name}</span>
																			</Link>
																		</label>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>User Email:<span style={{"margin":"15px"}}>{expertiseDetail.email}</span></label>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="row">
																<div className="col-lg-4">
																	<div className="form-group mb-1">
																		<label>Name</label>
																		<Input
																			name="firstname"
																			placeholder="Enter Name"
																			value={expertiseDetail.name}
																			type={InputType.TEXT}
																			onChange={(value: any) => {
																				this.UpdateExpertise('name', value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-4">
																	<div className="form-group mb-1">
																		<label>Slug</label>
																		<Input
																		name="slug"
																		placeholder=""
																		value={expertiseDetail.slug}
																		type={InputType.TEXT}
																		// onChange={(slug: string) => {
																		// 	if (slugify(slug).length <= 40) { this.setState({ slug: slugify(slug) }) }
																		// }}
																		/>
																	</div>
																</div>
																<div className="col-lg-4">
																	<div className="form-group mb-1">
																		<label>Published</label>
																		<Switch
																		checked={this.state.isVisible}
																		onChange={(v: any) => {
																			this.UpdateToggle('isDraft', v)
																		}}/>
																	</div>
																</div> 
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>About</label>
																<Input
																	name="about"
																	placeholder="About Expertise"
																	value={expertiseDetail.about}
																	type={InputType.TEXTAREA}
																	onChange={(value: any) => {
																		this.UpdateExpertise('about', value)
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<Input
																	name="expertiseCategories"
																	value={expertiseDetail.category}
																	type={InputType.ASYNC_SELECT}
																	label="Expertise category you're interested in"
																	placeholder="Select expertise category"
																	options={doGetExpertiseCategory}
																	multi={false}
																	onChange={(v: any) => {
																		this.UpdateExpertise('category', v) 
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<Input
																	name="tags"
																	value={expertiseDetail.tags}
																	type={InputType.ASYNC_SELECT}
																	label="Expertise Tags"
																	placeholder="Select up to 5 tags"
																	options={doGetExpertiseCategory}
																	multi={true}
																	onChange={(tags: any) => { 
																		this.UpdateExpertise('tags', tags) 
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<Input
																	label="Select Expert"
																	name="expert"
																	placeholder="Select expert"
																	value={this.state.expertiseDetailExpert}
																	multi={false}
																	type={InputType.SELECT}
																	options={expertlist}
																	simpleValue={true}
																	onChange={(expertiseDetailExpert: any) => { 
																		this.setState({expertiseDetailExpert}) 
																	}}
																/>
															</div>
														</div>
														{this.state.expertiseDetail.gallery &&
															<div className="col-lg-12">
																<div className="form-group mb-1">
																	<label>Gallery</label>
																	<div className="expertise-section__gallary_detial__heading">
																		<div className="expertise-section__gallary__heading">
																			<p>Build your gallery</p>
																		</div>
																		<div className="expertise-section__gallary__caption">
																			<p>Add amazing content to your gallery to set you apart from your competitors</p>
																		</div>
																	</div>
																	<div className="expertise-section__gallary_detial__headingtext">
																		<p className="uploadheading_title">Upload photos that describe your expertise</p>
																		<p className="uploadheading_count">{this.state.expertiseDetail.gallery.length}/6</p>
																	</div>
																	{
																		this.state.expertiseDetail.gallery.length > 0 && (
																			<div className="expertise-section__gallary_detial__row">
																				{
																					this.state.expertiseDetail.gallery.map((g: string, i: number) => (
																						<div className="expertise-section__gallary_detial__uploadimg" key={i}>
																							<div className="upload_dummy_img" style={{ backgroundImage: 'url(' + g + ')' }}/>
																							<span
																								onClick={() => { this.removeGalleryItem(i) }}
																								className="expertise-section__gallary_detial__uploadimg__remove">
																								<Icon name="close"/>
																							</span>
																						</div>
																					))
																				}
																			</div>
																		)
																	}
																	{
																		this.state.expertiseDetail.gallery.length < 6 && (
																			<div className="expertise-section__gallary_detial__row">
																				<div className="expertise-section__gallary_detial__dropzone">
																					<Dropzone onDrop={ this.onDrop.bind(this) }>
																						{
																							(this.state.uploadableFiles.length === 0 && !this.state.isUploading) && (
																								<div className="dropzone-placeholder">
																									<span className="icon icon-camera"/>
																									<p className="drag-label">Drag photo or</p>
																									<span className="browse-label">Browse...</span>
																								</div>
																							)
																						}
																					</Dropzone>
																					{
																						this.state.uploadableFiles.map((f: any, i: number) => (
																							<div className="expertise-section__gallary_detial__uploadimg" key={i}>
																								<div
																									className="upload_dummy_img"
																									style={{ backgroundImage: 'url(' + f.preview + ')' }}/>
																							</div>
																						))
																					}
																					{
																						(this.state.uploadableFiles.length > 0 && !this.state.isUploading) && (
																							<div className="expertise-section__gallary_detial__controls">
																								<button
																									className="btn btn-outline btn-danger"
																									onClick={() => { this.cancelUpload() }}>Cancel</button>
																								<button
																									className="btn"
																									onClick={() => { this.doUpload() }}>Upload</button>
																							</div>
																						)
																					}
																				</div>
																			</div>
																		)
																	}
																</div>
															</div>
														}
														{this.state.expertiseDetail.faq &&
															<div className="col-lg-12">
																<div className="form-group mb-1">
																	<label>FAQ</label>
																</div>
																<div style={{margin:"5px"}}>
																	{
																		this.state.expertiseDetail.faq.length > 0 &&this.state.expertiseDetail.faq.map((faq: FAQRecord, i: number) => (
																			<div className="expertise-section__faq__item" key={i}>
																				<div className="expertise-section__faq__item__label">
																					<label>FAQ {i + 1}</label>
																				</div>
																				<div className="expertise-section__faq__item__field">
																					<div>
																						<Input
																							name="faqTitle"
																							placeholder="Question"
																							value={faq.title}
																							type={InputType.TEXT}
																							onChange={(title: string) => { this.updateFaq(i, { title })}}
																						/>
																					</div>
																					<div>
																						<Input
																							name="faqAnswer"
																							placeholder="Answer"
																							value={faq.answer}
																							type={InputType.TEXTAREA}
																							onChange={(answer: string) => { this.updateFaq(i, { answer })}}
																						/>
																					</div>
																				</div>
																				<div>
																					{
																						(i === (this.state.expertiseDetail.faq.length - 1)) && (
																							<button
																								onClick={() => { this.addFaq() }}
																								className="btn btn-outline btn-success">Add FAQ</button>
																						)
																					}
																					{
																						(i < (this.state.expertiseDetail.faq.length - 1)) && (
																							<button
																								onClick={() => { this.removeFaq(i) }}
																								className="btn btn-outline btn-danger">Remove</button>
																						)
																					}
																				</div>
																			</div>
																		))
																	}
																</div>
															</div>
														}
														{this.state.expertiseDetail.packages &&
															<div className="col-lg-12">
																<div className="form-group mb-1">
																	<label>Packages</label>
																</div>
																<div style={{margin:"5px"}}>
																	<div className="expertise-section__pricing_detial__inner_row_first">
																		<div className="expertise-section__pricing_detial__inner_left">
																			{
																				this.state.expertiseDetail.packages.map((p: PackageRecord, i: number) => (
																					<div className="expertise-section__pricing_detial__inner_row" key={i}>
																						<div>
																							<div className="expertise-section__pricing_basic_section_right">
																								<div>
																									Basic
																								</div>
																								<div>
																									<div>
																										<Input
																											name="name"
																											placeholder="Enter package name"
																											value={p.name}
																											type={InputType.TEXT}
																											onChange={(name: string) => { this.updatePackage(i, { name })}}
																										/>
																									</div>
																								</div>
																								<div>
																									<div>
																										<Input
																											name="description"
																											placeholder="Enter package description"
																											value={p.description}
																											type={InputType.TEXTAREA}
																											onChange={(description: string) => { this.updatePackage(i, { description })}}
																										/>
																									</div>
																								</div>
																								<div>
																									<Input
																										name="availability"
																										placeholder="Select your availability"
																										value={p.availability}
																										multi={false}
																										type={InputType.SELECT}
																										options={availabilityScopeOptions}
																										simpleValue={true}
																										onChange={(availability: string) => { this.updatePackage(i, { availability })}}
																									/>
																								</div>
																							</div>
																						</div>
																						<div>
																							<div>
																								<p>Delivery (days)</p>
																							</div>
																							<div>
																								<div>
																									<Input
																										name="delivery"
																										placeholder="Enter delivery days"
																										value={p.delivery}
																										type={InputType.NUMBER}
																										onChange={(delivery: number) => { this.updatePackage(i, { delivery })}}/>
																								</div>
																							</div>
																						</div>
																						<div>
																							<div>
																								<p>Price (USD)</p>
																							</div>
																							<div>
																								<div>
																									<Input
																										name="price"
																										placeholder="Enter price in USD"
																										value={p.price}
																										type={InputType.NUMBER}
																										onChange={(price: number) => { this.updatePackage(i, { price })}}/>
																								</div>
																							</div>
																						</div>
																						<div>
																							{
																								(i === (this.state.expertiseDetail.packages.length - 1)) && (
																									<button
																										onClick={() => { this.addPackage() }}
																										className="btn btn-outline btn-success">Add Packages</button>
																								)
																							}
																							{
																								(i < (this.state.expertiseDetail.packages.length - 1)) && (
																									<button
																										onClick={() => { this.removePackages(i) }}
																										className="btn btn-outline btn-danger">Remove</button>
																								)
																							}
																						</div>
																					</div>
																				))
																			}
																		</div>
																	</div>
																</div>
															</div>
														}
														{this.state.expertiseDetail.briefTemplate &&
															<div className="col-lg-12">
																<div className="form-group mb-1">
																	<label>Brief Template:</label>
																</div>
																<div style={{margin:"5px"}}>
																	<div className="expertise-section__pricing_detial__inner_row_first">
																		<div className="expertise-section__pricing_detial__inner_left" style={{border: "1px solid lightgray",padding: "13px",margin: "11px"}}>
																			<div className="row">
																				<div className="col-lg-4">
																					<div className="mb-1">
																						<label>Additional Info</label>
																						<Input
																							name="firstname"
																							placeholder="Enter Name"
																							value={expertiseDetail.briefTemplate.additionalInfo}
																							type={InputType.TEXT}
																							onChange={(value: any) => {
																								this.UpdateExpertiseBriefTemplate('additionalInfo', value)
																							}}
																						/>
																					</div>
																				</div>
																				<div className="col-lg-4">
																					<div className="mb-1">
																						<label>NDA</label>
																						<Switch
																							checked={expertiseDetail.briefTemplate.nda}
																							onChange={(v: any) => {
																								this.UpdateExpertiseBriefTemplate('nda', v)
																							}}
																						/>
																					</div>
																				</div>
																				<div className="col-lg-4">
																					<div className="mb-1">
																						<label>Attachments</label>
																						<Switch
																							checked={expertiseDetail.briefTemplate.attachments}
																							onChange={(attachments: any) => { 
																								this.UpdateExpertiseBriefTemplate('attachments', attachments)
																							}}
																						/>
																					</div>
																				</div>
																			</div>
																			<div className="row">
																				<div className="col-lg-12">
																				{
																					expertiseDetail.briefTemplate.fields && expertiseDetail.briefTemplate.fields.map((e: any, i: number) => (
																						<div className="row" key={i}>
																							<div className="col-lg-4" style={{marginBottom:'12px'}}>
																								<Input
																									name="name"
																									placeholder="Name"
																									value={e.name}
																									type={InputType.TEXT}
																									onChange={(name: any) => {
																										this.UpdateFields(i, { name })
																									}}
																								/>
																							</div>
																							<div className="col-lg-4">
																								<Input
																									name="value"
																									placeholder="value"
																									value={e.formType}
																									type={InputType.TEXT}
																									onChange={(formType: string) => {
																										this.UpdateFields(i, { formType })
																									}}
																								/>
																							</div>
																							<div className="col-lg-4">
																								{
																									(i === (this.state.expertiseDetail.briefTemplate.fields.length - 1)) && (
																										<button
																											onClick={() => { this.addFields() }}
																											className="btn btn-outline btn-success">Add Fields</button>
																									)
																								}
																								{
																									(i < (this.state.expertiseDetail.briefTemplate.fields.length - 1)) && (
																										<button
																											onClick={() => { this.removeFields(i) }}
																											className="btn btn-outline btn-danger">Remove</button>
																									)
																								}
																							</div>
																						</div>
																					))
																				}
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														}
														<div className="col-lg-12">
															<div className="row">
																<div className="col-lg-12 form-group mb-1">
																	<label>Review List:</label>
																</div>
																<div className="col-lg-12">
																	<Link to={'/expertiseReview/add/' + this.state.ExpertiseId + '/reviews'}>
																		<button type="button" className="btn btn-outline-success"><i className="fa fa-plus ">Add Review</i></button>
																	</Link>
																</div>
															</div>
														</div>
														{
															this.props.reviewState.expertiseReviewlist && this.props.reviewState.expertiseReviewlist.length>0 &&
															<div className="card-block">
																{
																	(this.props.reviewState.expertiseReviewlist) && (
																		
																			<DataTable
																				value={this.props.reviewState.expertiseReviewlist}
																				paginator={true}
																				rows={10}
																				rowsPerPageOptions={[10, 20, 30, 50]}
																				header={header}
																				globalFilter={this.state.globalFilter}
																				scrollable={true}
																				responsive={true} scrollHeight="400px">
																				<Column  field="userInfo.name" style={{textAlign: 'center'}} header="User Name" sortable={true} />
																				<Column  field="body" style={{textAlign: 'center'}} header="Body" sortable={true} />
																				<Column  field="createdAt" style={{textAlign: 'center'}} header="Create At" sortable={true} />
																				<Column header="Action" body={this.actionButtonsReview} style={{textAlign: 'center', width: '15em'}}/>
																			</DataTable>
																	)
																}
															</div>
														}
														<div className="col-lg-12" style={{marginTop:"1rem"}}>
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openExpertiseUpdateModal()}>
																	Update Expertise
																</button>
															</div>
														</div>
													</div>
												}
											</div>
											{
												this.props.orderstate.expertiseOrderList && this.props.orderstate.expertiseOrderList.length>0 &&
												<div className="card-block">
													{
														(this.props.orderstate.expertiseOrderList) && (
															<DataTable
																value={this.props.orderstate.expertiseOrderList}
																paginator={true}
																rows={10}
																rowsPerPageOptions={[10, 20, 30, 50]}
																header={header}
																globalFilter={this.state.globalFilter}
																scrollable={true}
																responsive={true} scrollHeight="400px">
																<Column  body={this.ProjectName} style={{textAlign: 'center'}} header="Project Name" sortable={true} />
																<Column body={this.expertisePackage} style={{textAlign: 'center'}} header="Selected Packages" sortable={true} />
																<Column  field="offers.length" style={{textAlign: 'center'}} header="Offers" sortable={true} />
																<Column  body={this.expertiseStatus} style={{textAlign: 'center'}} header="Completed Status" sortable={true} />
																<Column header="Action" body={this.actionButtons} style={{textAlign: 'center', width: '15em'}}/>
															</DataTable>
														)
													}
												</div>
											}
										</div>
									</div>
								</div>

							</div>
						</div>
						<SweetAlert
							show={this.state.openUpdateModel}
							title="Expertise Update"
							text="Are you sure you want to update Expertise"
							showCancelButton
							onConfirm={() => {
								this.updateExpertiseDetail()
								this.setState({openUpdateModel: false})
							}}
							onCancel={() => {
								this.setState({openUpdateModel: false})
							}}
							onEscapeKey={() => this.setState({openUpdateModel: false})}
							onOutsideClick={() => this.setState({openUpdateModel: false})}
						/>
						<SweetAlert
							show={this.state.openconformationmodel}
							title="Expertise Order Delete"
							text="Are you sure you want to delete this Expertise Order ?"
							showCancelButton
							onConfirm={() => {
								this.setState({openconformationmodel: false})
								this.ExpertiseOrderDelete()
							}}
							onCancel={() => {
								this.setState({openconformationmodel: false})
							}}
							onEscapeKey={() => this.setState({openconformationmodel: false})}
							onOutsideClick={() => this.setState({openconformationmodel: false})}
						/>
						<SweetAlert
							show={this.state.openconformationReviewmodel}
							title="Expertise Review Delete"
							text="Are you sure you want to delete this Expertise Review ?"
							showCancelButton
							onConfirm={() => {
								this.setState({openconformationReviewmodel: false})
								this.ExpertiseReviewDelete()
							}}
							onCancel={() => {
								this.setState({openconformationReviewmodel: false})
							}}
							onEscapeKey={() => this.setState({openconformationReviewmodel: false})}
							onOutsideClick={() => this.setState({openconformationReviewmodel: false})}
						/>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}

	private UpdateExpertise(key: string, value: any) {
		const expertiseDetail: any = {...this.state.expertiseDetail}
		expertiseDetail[key] = value

		this.setState({expertiseDetail})
	}

	private UpdateToggle(key: string, value: any) {
		if(value){
			this.setState({isVisible: true})
		}else{
			this.setState({isVisible: false})
		}
	}

	private updateExpertiseDetail() {
		const Expertise = {
			name: this.state.expertiseDetail.name,
			slug: slugify(this.state.expertiseDetail.name),
			featuredImageUrl: this.state.expertiseDetail.featuredImageUrl,
			about: this.state.expertiseDetail.about,
			category: this.state.expertiseDetail.category,
			isDraft:  this.state.isVisible ? false: true,
			tags: this.state.expertiseDetail.tags,
			gallery: this.state.expertiseDetail.gallery,
			packages:this.state.expertiseDetail.packages,
		    faq: this.state.expertiseDetail.faq,
		    expert: this.state.expertiseDetailExpert,
		    briefTemplate: this.state.expertiseDetail.briefTemplate
		}
		this.props.updateExpertiseDetail(this.state.expertiseDetail._id, Expertise, this.state.expertiseDetail.shortId).then(() => {
			this.setState({
				isPageUpdate: ActionTypeStates.SUCCESS,
				openUpdateModel: false
			})
			Alert.success('New Expertise Updated Successfully',{position: 'bottom-right'})			
		}).catch(() => {
			this.setState({isPageUpdate: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})						
		})
	}

	private ExpertiseOrderDelete() {
		const ExpertiseShortId = this.props.match.params.shortId
		const ExpertiseId = this.props.match.params.id
		doRemoveExpertiseOrder(this.state.selectedExpertiseID, this.state.selectedExpertiseOrderID)
			.then(() => {
				this.setState({
					ExpertiseDeleteStatus: ActionTypeStates.SUCCESS,
					openconformationmodel: false
				})
				Alert.success('Expertise Order Delete Successfully',{position: 'bottom-right'})											
				this.props.fetchExpertiseDetail(ExpertiseShortId)
				this.props.fetchExpertiseOrderList(ExpertiseId)
				this.props.fetchExpertiseReviewList(ExpertiseId)				
			}).catch(() => {
			this.setState({
				ExpertiseDeleteStatus: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})
		})
	}

	private ExpertiseReviewDelete() {
		const ExpertiseShortId = this.props.match.params.shortId
		const ExpertiseId = this.props.match.params.id
		doRemoveExpertiseReview(this.state.selectedExpertiseID, this.state.selectedExpertiseReviewID)
			.then(() => {
				this.setState({
					ExpertiseDeleteStatus: ActionTypeStates.SUCCESS,
					openconformationReviewmodel: false
				})
				Alert.success('Expertise Review Delete Successfully',{position: 'bottom-right'})											
				this.props.fetchExpertiseDetail(ExpertiseShortId)
				this.props.fetchExpertiseOrderList(ExpertiseId)
				this.props.fetchExpertiseReviewList(ExpertiseId)
			}).catch(() => {
			this.setState({
				ExpertiseDeleteStatus: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})												
		})
	}

	private UpdateExpertiseBriefTemplate(key: string, value: any) {
		const expertiseDetail: any = {...this.state.expertiseDetail}
		expertiseDetail.briefTemplate[key] = value;
		this.setState({isRender: true})
	}

	private UpdateFields(index: number, updatedFieldObject: any) {
		const fields = this.state.expertiseDetail.briefTemplate.fields
		fields[index] = {...fields[index], ...updatedFieldObject}
		this.setState({ fields })
	}

	private addFields(){
		this.state.expertiseDetail.briefTemplate.fields.push({name:'',formType: ''});
		this.setState({
			isRender: true
		})
	}

	private removeFields(index: number) {
		this.state.expertiseDetail.briefTemplate.fields.splice(index, 1)
		this.setState({
			isRender: true
		})
	}

	private updatePackage(index: number, updatedPackageObject: Partial<PackageRecord>) {
		const packages = this.state.expertiseDetail.packages
		packages[index] = {...packages[index], ...updatedPackageObject}

		this.setState({ packages })
	}

	private addPackage(){
		this.state.expertiseDetail.packages.push({ name: '',
			price: 0,
			currency: Currency.USD,
			description: '',
			availability: '',
			delivery: 0 
		});
		this.setState({
			isRender: true
		})
	}

	private removePackages(index: number) {
		this.state.expertiseDetail.packages.splice(index, 1)
		this.setState({
			isRender: true
		})
	}

	private updateFaq(index: number, updatedFaq: Partial<FAQRecord>) {
		const faq = this.state.expertiseDetail.faq
		faq[index] = {...faq[index], ...updatedFaq}

		this.setState({ faq })
	}

	private addFaq() {
		this.state.expertiseDetail.faq.push({ title: '', answer: '' });

		this.setState({
			isRender: true
		})
	}

	private removeFaq(index: number) {
		this.state.expertiseDetail.faq.splice(index, 1)
		this.setState({
			isRender: true
		})
	}

	private removeGalleryItem(index: number) {
		const gallery = this.state.expertiseDetail.gallery
		gallery.splice(index, 1)

		this.setState({ gallery })
	}

	private onDrop(uploadableFiles: any[]) {
		this.setState({ uploadableFiles: uploadableFiles.slice(0, (6 - this.state.expertiseDetail.gallery.length)) })
	}

	private doUpload() {
		this.setState({ isUploading: true })

		return Promise.all(this.state.uploadableFiles.map(async (uf: any) => {
			try {
				return await doUploadMedia(uf, { dimensions: { width: 720, height: 480, crop: true } })
			} catch (error) { console.log('error', error) }
		})).then((response: any) => {
			const uploadedFiles = response.map((r: any[], i: number) => r[0].url)
			for (const item of uploadedFiles) {
				this.state.expertiseDetail.gallery.push(item);
			}
			this.setState({
				uploadableFiles:[],
				isRender: true,
				isUploading: false
			})
		})
	}

	private cancelUpload() {
		this.setState({ isUploading: false, uploadableFiles: [] })
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.ExpertiseDetail,
	orderstate: state.ExpertiseOrderList,
	expertstate: state.ExpertList,
	reviewState: state.ExpertiseReviewList
})

export default connect(mapStateToProps, {
	fetchExpertiseDetail,
	fetchExpertiseOrderList,
	updateExpertiseDetail,
	fetchExpertiseReviewList,
	fetchExpert
})(EditExpertise)