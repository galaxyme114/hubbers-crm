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
import { fetchExpertiseOrderDetail, fetchExpertiseOrderAttachmentList, updateExpertiseOrderDetail, fetchProjects, doAddExpertiseAttachment, updateExpertiseOrderAttachment} from '../actions/expertise'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import Switch from '../components/Switch'
import { doUploadMedia } from '../actions/media'
import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import Icon from '../components/Icon'
import { ExpertiseOrderRecord, orderOffersRecord, OrderBriefDataFieldRecord, ProjectRecord } from '../constants/models'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as ExpertiseOrderDetailState } from '../reducers/expertiseOrderDetail'
import { State as ExpertiseOrderAttachmentState } from '../reducers/expertiseOrderAttachmentList'
import { State as ProjectsListState } from '../reducers/projects'
import { RootState } from '../reducers/index'
import { slugify } from '../utils/stringUtils'
import { availabilityScopeOptions } from '../constants/selectOptions'
import Alert from 'react-s-alert'

interface EditExpertiseOrderMatchParams {
	expertiseid: string
	orderId:string
}

interface EditExpertiseOrderProps extends RouteComponentProps<EditExpertiseOrderMatchParams> {
	state: ExpertiseOrderDetailState
	attachmentState: ExpertiseOrderAttachmentState
	projectstate: ProjectsListState
	fetchExpertiseOrderDetail: any
	fetchExpertiseOrderAttachmentList:any
	updateExpertiseOrderDetail: any
	fetchProjects: any
	doAddExpertiseAttachment: any
	updateExpertiseOrderAttachment:any
}

interface EditExpertiseOrderState {
	isPageUpdate: ActionTypeStates
	isCreateAttachment: ActionTypeStates
	openUpdateModel: boolean
	isRender: boolean
	isVisible :boolean	
	globalFilter: string	
	expertiseOrder: ExpertiseOrderRecord
	ProjectList: any
	SelectPackageList:any
	expertiseOrderProject: string
	AttachmentList: any
	uploadableFiles: any[]
	isUploading: boolean
	title: string,
	caption: string,
	edittitle: string,
	editcaption: string,
	ExpertiseOrderId: string
	ExpertiseId:string
	AttachmentInfo: any
	AttachmentEditIndex: number
	ExpertiseAttachmentId: string
	editUpdateStatus: boolean
	editAttachmentpreviewUrl: string
	editAttachmentfileType: string
}

class EditExpertiseOrder extends React.Component<EditExpertiseOrderProps, EditExpertiseOrderState> {
	constructor(props: EditExpertiseOrderProps) {
		super(props)
		this.state = {
			expertiseOrder: null,
			isCreateAttachment: null,
			ProjectList: null,
			AttachmentList: null,
			SelectPackageList:null,
			globalFilter: null,			
			isPageUpdate: null,
			openUpdateModel: null,
			isRender: false,
			isVisible: null,
			expertiseOrderProject: null,
			uploadableFiles: [],
			isUploading: false,
			title: '',
			caption: '',
			// edittitle: '',
			// editcaption: '',
			ExpertiseOrderId: null,
			ExpertiseId: null,
			AttachmentInfo: null,
			AttachmentEditIndex: null,
			ExpertiseAttachmentId: null,
			editUpdateStatus: false,
			editAttachmentpreviewUrl: null,
			editAttachmentfileType: null,
			edittitle:null,
			editcaption:null,
			
			
		}
		this.openExpertiseOrderUpdateModal = this.openExpertiseOrderUpdateModal.bind(this);
	}

	public openExpertiseOrderUpdateModal() {
		this.setState({
			openUpdateModel: true
		})
	}

	public editAttachment(data:any, index:number){
		console.log(data)
		console.log(data._id)
		console.log(data.previewUrl + " "+  data.fileType)
		this.setState({
			AttachmentEditIndex: index,
			AttachmentInfo: data,
			ExpertiseAttachmentId: data._id,
			editAttachmentpreviewUrl: data.previewUrl,
			editAttachmentfileType: data.fileType,
			edittitle:data.title,
			editcaption:data.caption,
			editUpdateStatus: true
		})
	}

	public cancelEditAttachment(){
		this.setState({
			AttachmentEditIndex: null
		})

	}

	public componentDidMount() {
		const ExpertiseId = this.props.match.params.expertiseid
		const ExpertiseOrderId = this.props.match.params.orderId
		this.setState({
			ExpertiseId: this.props.match.params.expertiseid,
			ExpertiseOrderId: this.props.match.params.orderId
		})
		this.props.fetchExpertiseOrderDetail(ExpertiseId,ExpertiseOrderId)
		this.props.fetchProjects()
		this.props.fetchExpertiseOrderAttachmentList(ExpertiseOrderId)
	}

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state && nextProps.state.expertiseOrder) {
			this.setState({
				expertiseOrder: nextProps.state.expertiseOrder[0]
				})
			if(nextProps.state.expertiseOrder[0].project){
				this.setState({
					expertiseOrderProject: nextProps.state.expertiseOrder[0].project._id
				})
			}
			const selectpackageListOptions=[];	
			if( nextProps.state.expertiseOrder[0].expertise.packages.length>0){
				for(let items of nextProps.state.expertiseOrder[0].expertise.packages){
					selectpackageListOptions.push({value:items._id,label:items.name})
				}
			}
			this.setState({ SelectPackageList: selectpackageListOptions})
		}
		if (nextProps.projectstate && nextProps.projectstate.Projects) {	
			const projectListOptions=[];
			if( nextProps.projectstate.Projects.length>0){
				for(let items of  nextProps.projectstate.Projects){
					projectListOptions.push({value:items._id,label:items.name})
				}
			}
			this.setState({ ProjectList: projectListOptions})
		}
		if (nextProps.attachmentState && nextProps.attachmentState) {
			const Attachment=[];
			if( nextProps.attachmentState.orderAttachmentList){
				this.setState({ AttachmentList: nextProps.attachmentState.orderAttachmentList})
			}
		}
	}

	public render() {
		const {state} = this.props
		const {expertiseOrder, ProjectList, SelectPackageList, AttachmentList, isCreateAttachment} = this.state
		console.log(expertiseOrder)
		console.log(AttachmentList)
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
								<BreadcrumbItem active>Edit Expertise Order</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Edit Expertise Order
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													(expertiseOrder && state.status === ActionTypeStates.SUCCESS) &&
													<div className="row" style={{padding:"13px"}}>
														{
															(expertiseOrder.briefData) &&
															<div className="col-lg-12" style={{border: "1px solid lightgrey",padding: "17px"}}>
																<div className="form-group mb-1">
																	<label>Brief Data:</label>
																</div>
																<div className="row">
																	<div className="col-lg-6">
																		<div className="mb-1">
																			<label>Additional Info</label>
																			<Input
																				name="firstname"
																				placeholder="Enter Name"
																				value={expertiseOrder.briefData.additionalInfo}
																				type={InputType.TEXT}
																				onChange={(value: any) => {
																					this.UpdateExpertiseOrder('additionalInfo', value)
																				}}
																			/>
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="mb-1">
																			<label>NDA</label>
																			<Switch
																				checked={expertiseOrder.briefData.nda}
																				onChange={(v: any) => {
																					this.UpdateExpertiseOrder('nda', v)
																				}}/>
																		</div>
																	</div>
																</div>
																<div className="row">
																	<div className="col-lg-12">
																		{
																			expertiseOrder.briefData.fields && expertiseOrder.briefData.fields.map((e: OrderBriefDataFieldRecord, i: number) => (
																				<div className="row" key={i}>
																					<div className="col-lg-6" style={{marginBottom:'12px'}}>
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
																					<div className="col-lg-6">
																						<Input
																							name="value"
																							placeholder="value"
																							value={e.value}
																							type={InputType.TEXT}
																							onChange={(value: any) => {
																								this.UpdateFields(i, { value })
																							}}
																						/>
																					</div>
																				</div>
																			))
																		}
																	</div>
																</div>
															</div>
														}
														<div className="col-lg-12" style={{border: "1px solid lightgrey",padding: "17px",marginTop:"15px", marginBottom:"15px"}}>
															<div className="form-group mb-1">
																<label>Offers:</label>
															</div>
															{
																this.state.expertiseOrder.offers && this.state.expertiseOrder.offers.map((e: orderOffersRecord, i: number) => (
																	<div className="row" key={i}>
																		<div className="col-lg-3" style={{marginBottom:'12px'}}>
																			<div className="row">
																				<div className="col-md-2">
																					<label>Name:</label>
																				</div>
																				<div className="col-md-10">
																					<Input
																						name="name"
																						placeholder="Name"
																						value={e.name}
																						type={InputType.TEXT}
																						onChange={(name: any) => {
																							this.UpdateOffers(i, { name })
																						}}
																					/>
																				</div>
																			</div>
																		</div>
																		<div className="col-lg-3">
																			<div className="row">
																				<div className="col-md-3">
																					<label>Currency:</label>
																				</div>
																				<div className="col-md-9">
																					<Input
																						name="currency"
																						placeholder="Currency"
																						value={e.currency}
																						type={InputType.TEXT}
																						onChange={(currency: any) => {
																							this.UpdateOffers(i, { currency })
																						}}
																					/>
																				</div>
																			</div>
																		</div>
																		<div className="col-lg-3">
																			<div className="row">
																				<div className="col-md-3">
																					<label>Selected:</label>
																				</div>
																				<div className="col-md-9">
																					<Switch
																						checked={e.selected}
																						onChange={(selected: any) => {
																							this.UpdateOffers(i, { selected })
																						}}/>
																				</div>
																			</div>
																		</div>
																		<div className="col-lg-3">
																		{
																			(i === (this.state.expertiseOrder.offers.length - 1)) && (
																				<button
																					disabled={!e.name || !e.currency}
																					onClick={() => { this.addOffers() }}
																					className="btn btn-outline">Add</button>
																			)
																		}
																		{
																			(i < (this.state.expertiseOrder.offers.length - 1)) && (
																				<button
																					onClick={() => { this.removeOffers(i) }}
																					className="btn btn-outline btn-danger">Remove</button>
																			)
																		}
																		</div>
																	</div>
																))
															}
															{
																this.state.expertiseOrder.offers.length <= 0 &&
																<div style={{marginBottom: "14px"}}>			
																	<button onClick={() => { this.addOffers() }} className="btn btn-outline">Add Offers</button>
																</div>
															}
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Project:</label>
															</div>
															<Input
																name="Projects"
																placeholder="Select your project"
																value={this.state.expertiseOrderProject}
																multi={false}
																type={InputType.SELECT}
																options={ProjectList}
																simpleValue={true}
																onChange={(v: any) => {
																	this.UpdateProjectExpertise('project', v)
																}}
															/>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Select Package:</label>
															</div>
															<Input
																name="Select Package"
																placeholder="Select your Package"
																value={expertiseOrder.selectedPackage}
																multi={false}
																type={InputType.SELECT}
																options={SelectPackageList}
																simpleValue={true}
																onChange={(v: any) => { this.UpdateSelectedPackage('selectedPackage', v)
																}}
															/>
														</div>
														<div className="col-lg-6">
															<div className="form-group mb-1">
																<label>Completed</label>
																<Switch
																	checked={this.state.expertiseOrder.completed}
																	onChange={(v: any) => {
																		this.isCompleted('completed', v)
																	}}/>
															</div>
														</div>
														{this.state.AttachmentList &&
															<div className="col-lg-12">
																<div className="form-group mb-1">
																	<label>Attachment</label>
																	{
																		this.state.AttachmentList.length > 0 && (
																			<div style={{padding:"1.875rem"}}>
																				{
																					this.state.AttachmentList.map((g: any, i: number) => (
																						<div className="attachment_block" key={i}>
																							{	
																								(this.state.AttachmentEditIndex !== i)&&
																								<div style={{position: "relative",float: "left",width: "50%",padding: "0.625rem",border: "1px solid lightgrey", margin:"10px"}} >
																									<div><label>Title:</label>{g.title}</div>
																									<div><label>Caption:</label>{g.caption}</div>
																									<div className="upload_dummy_img" style={{ backgroundImage: 'url(' + g.previewUrl + ')' }}/>
																									<span
																										onClick={() => { this.removeGalleryItem(i) }}
																										className="expertise-section__gallary_detial__uploadimg__remove" style={{top:"0.375rem"}}>
																										<Icon name="close"/>
																									</span>
																									<div>
																										<button className="btn btn-success" onClick={() => { this.editAttachment(g,i) }}>Edit</button>
																									</div>
																								</div>
																							}
																							{	
																								(this.state.AttachmentEditIndex === i)&&
																								<div style={{position: "relative",float: "left",width: "50%",padding: "0.625rem",border: "1px solid lightgrey", margin:"10px"}} >
																									<div>
																										<label>Title:</label>
																										<Input
																											name="title"
																											placeholder="Enter Title"
																											value={this.state.edittitle}
																											type={InputType.TEXT}
																											onChange={(edittitle: any) => {
																												this.setState({edittitle: edittitle})
																											}}
																										/>
																									</div>
																									<div>
																										<label>Caption:</label>
																										<Input
																											name="Caption"
																											placeholder="Enter Caption"
																											value={this.state.editcaption}
																											type={InputType.TEXT}
																											onChange={(editcaption: any) => {
																												this.setState({editcaption: editcaption})
																											}}
																										/>
																									</div>
																									<div className="upload_dummy_img" style={{ backgroundImage: 'url(' + this.state.editAttachmentpreviewUrl + ')' }}/>
																										<Dropzone onDrop={ this.onDrop.bind(this) }>
																											{/* {
																												(this.state.uploadableFiles.length === 0 && !this.state.isUploading) && ( */}
																													<div className="dropzone-placeholder">
																														<span className="icon icon-camera"/>
																														<p className="drag-label">Drag photo or</p>
																														<span className="browse-label">Browse...</span>
																													</div>
																												{/* ) */}
																											{/* } */}
																										</Dropzone>
																									
																									<div>
																										<button className="btn btn-success" onClick={() => { this.updateExpertiseAttachment() }}>Update</button>
																										<button className="btn btn-success" onClick={() => { this.cancelEditAttachment() }}>cancel</button>
																									</div>
																								</div>
																							}
																						</div>
																						
																					))
																				}
																			</div>
																		)
																	}
																	{
																		this.state.AttachmentList.length < 6 && (
																		<div className="expertise-section__gallary_detial__row">
																			<div className="expertise-section__gallary_detial__dropzone">
																				<div style={{margin:"5px"}}>
																					<Input
																						name="title"
																						placeholder="Enter Title"
																						value={this.state.title}
																						type={InputType.TEXT}
																						onChange={(title: any) => {
																							this.setState({title})
																						}}
																					/>
																				</div>
																				<div style={{margin:"5px"}}>
																					<Input
																						name="Caption"
																						placeholder="Enter Caption"
																						value={this.state.caption}
																						type={InputType.TEXT}
																						onChange={(caption: any) => {
																							this.setState({caption})
																						}}
																					/>
																				</div>
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
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openExpertiseOrderUpdateModal()}>
																	Update Expertise Order
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
							title="Expertise Order Update"
							text="Are you sure you want to update Expertise Order"
							showCancelButton
							onConfirm={() => {
								this.updateExpertiseOrderDetail()
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

	private isCompleted(key: string, value: any) {
		const expertiseOrder: any = {...this.state.expertiseOrder}
		expertiseOrder[key] = value
		this.setState({expertiseOrder})
	}

	private updateAttachment(key: string, value: any) {
		const AttachmentList: any = {...this.state.AttachmentList}
		AttachmentList[key] = value
		this.setState({AttachmentList})
	}

	private UpdateExpertiseOrder(key: string, value: any) {
		const expertiseOrder: any = {...this.state.expertiseOrder}
		expertiseOrder.briefData[key] = value;
		this.setState({isRender: true})
	}

	private UpdateSelectedPackage(key: string, value: any) {
		this.state.expertiseOrder.selectedPackage=value;
		this.setState({isRender: true})
	}

	private UpdateProjectExpertise(key: string ,value : string){
		this.state.expertiseOrder.project=value;
	
		this.setState({isRender: true,expertiseOrderProject:value})
	}

	private updateExpertiseOrderDetail() {
		const ExpertiseId = this.props.match.params.expertiseid
		const ExpertiseOrderId = this.props.match.params.orderId
		const ExpertiseOrder = {
			completed : this.state.expertiseOrder.completed,
			briefData: {
				nda: this.state.expertiseOrder.briefData.nda,
				additionalInfo: this.state.expertiseOrder.briefData.additionalInfo,
				fields: this.state.expertiseOrder.briefData.fields
			},
			offers : this.state.expertiseOrder.offers,
			project : this.state.expertiseOrder.project,
			selectedPackage : this.state.expertiseOrder.selectedPackage
		}
		console.log(ExpertiseOrder)
		this.props.updateExpertiseOrderDetail(ExpertiseId, ExpertiseOrderId, ExpertiseOrder).then(() => {
			this.setState({
				isPageUpdate: ActionTypeStates.SUCCESS,
				openUpdateModel: false
			})
			Alert.success('Expertise Order Updated Successfully',{position: 'bottom-right'})			
		}).catch(() => {
			this.setState({isPageUpdate: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})						
		})
	}

	private updateExpertiseAttachment() {
		const ExpertiseOrderId = this.props.match.params.orderId
		console.log(ExpertiseOrderId)
		console.log(this.state.ExpertiseAttachmentId)
		console.log(this.state.AttachmentList)
		const ExpertiseOrderAttachment = {
			title: this.state.edittitle,
			caption: this.state.editcaption,
			previewUrl: this.state.editAttachmentpreviewUrl,
			fileType: this.state.editAttachmentfileType
		}
		console.log(ExpertiseOrderAttachment)
		this.props.updateExpertiseOrderAttachment(ExpertiseOrderId, this.state.ExpertiseAttachmentId, ExpertiseOrderAttachment).then(() => {
			this.setState({
				isPageUpdate: ActionTypeStates.SUCCESS,
				editUpdateStatus: false,
				AttachmentEditIndex: null
			})
			this.props.fetchExpertiseOrderDetail(this.state.ExpertiseId,this.state.ExpertiseOrderId)
			this.props.fetchProjects()
			this.props.fetchExpertiseOrderAttachmentList(this.state.ExpertiseOrderId)	
		}).catch(() => {
			this.setState({isPageUpdate: ActionTypeStates.FAILED})					
		})
	}

	private UpdateFields(index: number, updatedFieldObject: any) {
		const fields = this.state.expertiseOrder.briefData.fields
		fields[index] = {...fields[index], ...updatedFieldObject}
		this.setState({isRender: true})
	}

	private addOffers() {
		this.state.expertiseOrder.offers.push({ name: '', currency: '', selected: false })
		this.validateForm({ offers: [...this.state.expertiseOrder.offers, { name: '', currency: '', selected: false }] })
	}

	private removeOffers(index: number) {
		this.state.expertiseOrder.offers.splice(index, 1)
		this.validateForm({ offers: this.state.expertiseOrder.offers })
	}

	private validateForm(modifiedState?: any) {
		const newState: EditExpertiseOrderState = {...this.state, ...modifiedState}
		this.setState(newState)
	}

	private UpdateOffers(index: number, updatedOfferObject: any) {
		const offers = this.state.expertiseOrder.offers
		offers[index] = {...offers[index], ...updatedOfferObject}
		this.setState({isRender: true})
	}

	private removeGalleryItem(index: number) {
		const AttachmentList = this.state.AttachmentList
		AttachmentList.splice(index, 1)

		this.setState({ AttachmentList })
	}

	private onDrop(uploadableFiles: any[]) {
		this.setState({ 
			uploadableFiles: uploadableFiles.slice(0, (6 - this.state.AttachmentList.length)) 
		},() =>{
			console.log("Cecewfew")
			this.doUpload();
			
		})
		// this.doUpload();
	}

	private doUpload() {
		this.setState({ isUploading: true })

		return Promise.all(this.state.uploadableFiles.map(async (uf: any) => {
			try {
				return await doUploadMedia(uf, { dimensions: { width: 720, height: 480, crop: true } })
			} catch (error) { console.log('error', error) }
		})).then((response: any) => {
			// console.log(response)

			const uploadedFiles = response.map((r: any[], i: number) => r[0].url)

			console.log(uploadedFiles[0]);

			if(this.state.editUpdateStatus == true){
				console.log('update')
				this.setState({
					editAttachmentpreviewUrl: uploadedFiles[0],
					editAttachmentfileType: uploadedFiles[0].split('.').pop(),
				})
				// this.updateExpertiseAttachment()
			}else{
				console.log('add')
				const Attachment = {
					title: this.state.title,
					caption: this.state.caption,
					previewUrl: uploadedFiles[0],
					fileType: uploadedFiles[0].split('.').pop()
				};
				console.log(Attachment)
				console.log(this.state.ExpertiseOrderId)
				doAddExpertiseAttachment(this.state.ExpertiseOrderId, Attachment).then(() => {
					this.setState({
						isCreateAttachment: ActionTypeStates.SUCCESS,
						uploadableFiles:[],
						isRender: true,
						isUploading: false,
						title: '',
						caption: ''
					})
					this.props.fetchExpertiseOrderDetail(this.state.ExpertiseId,this.state.ExpertiseOrderId)
					this.props.fetchProjects()
					this.props.fetchExpertiseOrderAttachmentList(this.state.ExpertiseOrderId)
				}).catch(() => {
					this.setState({ isCreateAttachment: ActionTypeStates.FAILED})
				})
			}
		})
	}

	private cancelUpload() {
		this.setState({ isUploading: false, uploadableFiles: [] })
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.ExpertiseOrderDetail,
	projectstate: state.ProjectsList,
	attachmentState: state.ExpertiseOrderAttachmentList
})
export default connect(mapStateToProps, {
	fetchExpertiseOrderDetail,
	updateExpertiseOrderDetail,
	fetchExpertiseOrderAttachmentList,
	doAddExpertiseAttachment,
	updateExpertiseOrderAttachment,
	fetchProjects
})(EditExpertiseOrder)