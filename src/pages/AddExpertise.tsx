import * as moment from 'moment'
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
import { doUploadMedia } from '../actions/media'
import { doAddExpertise, doGetSkills, doGetExpertiseCategory } from '../actions/expertise'
import { fetchExpert } from '../actions/expert'
import Input from '../components/Input'
import Icon from '../components/Icon'
import Spinner from '../components/Spinner'
import Switch from '../components/Switch'
import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { ActionTypeStates } from '../constants/action-types'
import { Currency, InputType } from '../constants/enums'
import { ExpertiseRecord, ExpertiseOrderRecord, FAQRecord, PackageRecord, OrderBriefDataFieldRecord } from '../constants/models'
import { availabilityScopeOptions } from '../constants/selectOptions'
import { State as ExpertListState } from '../reducers/expert'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'
import { slugify } from '../utils/stringUtils'

interface AddExpertiseProps {
	state: ExpertListState
	doAddExpertise: any
	fetchExpert:any
}

interface AddExpertiseState {
	name: string
	featuredImageUrl: string
	about: string
	category:any
	tags:any
	expert: any
	gallery: string[]
	faq: FAQRecord[]
	packages: PackageRecord[]
	rating: string
	uploadableFiles: any[]
	isUploading: boolean
	isRender: boolean
	isVisible :boolean	
	isCreateExpertise: ActionTypeStates
	openAddModel: boolean
	expertlist: any
	briefTemplate: any
	fields: any
	nda: any
	additionalInfo: any
	attachments:any
	
}

class AddExpertise extends React.Component<AddExpertiseProps, AddExpertiseState> {
	constructor(props: AddExpertiseProps) {
		super(props)
		
		this.state = {
			name: '',
			featuredImageUrl: '',
			about: '',
			rating: '',
			category:'',
			tags:'',
			expert: '',
			briefTemplate: [],
			nda: '',
			additionalInfo: '',
			attachments: '',
			fields: [{
				name: '',
				formType: ''
			}],
			packages: [{
				name: '',
				price: 0,
				currency: Currency.USD,
				description: '',
				availability: '',
				delivery: 0
			}],
			faq: [{ title: '', answer: '' }],
			gallery: [],
			uploadableFiles: [],
			isUploading: false,
			isRender: false,
			isVisible: null,
			isCreateExpertise: null,
			openAddModel: null,
			expertlist: null
		}
	}

	public openConstantAddModal() {
		this.setState({
			openAddModel: true
		})
	}

	public componentDidMount() {
		this.props.fetchExpert()
	}

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state && nextProps.state.expertList) {
			const selectExpertListOptions=[];	
			if(nextProps.state.expertList){
				for(let expert of nextProps.state.expertList){
					selectExpertListOptions.push({value:expert._id,label:expert.user.name})
				}
			}
			this.setState({ expertlist: selectExpertListOptions})
		}
	}

	public render() {
		const {state} = this.props
		const { isCreateExpertise, expertlist} = this.state
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
								<BreadcrumbItem active>Add Expertise</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Add Expertise
											</div>
											<div className="card-block">
												{
													(isCreateExpertise === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													isCreateExpertise !== ActionTypeStates.INPROGRESS && (
													<div className="row">
														<div className="col-lg-8">
															<div className="row">
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Name</label>
																		<Input
																			name="firstname"
																			placeholder="Enter Name"
																			value={this.state.name}
																			type={InputType.TEXT}
																			onChange={(name: any) => {
																				this.setState({name})
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Published</label>
																		<Switch
																		checked={this.state.isVisible}
																		onChange={(v: any) => {
																			this.UpdateToggle(v)
																		}}/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Ratng</label>
																		<Input
																			name="firstname"
																			placeholder="Enter Rating"
																			value={this.state.rating}
																			type={InputType.TEXT}
																			onChange={(rating: any) => {
																				this.setState({rating})
																			}}
																		/>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-4">
															<div className="update_user_thumbnail">
																<UserThumbnailUpload
																	autoUpload={true}
																	thumbnailImageUrl={this.state.featuredImageUrl}
																	onUpload={(featuredImageUrl: any) => { 
																		this.setState({featuredImageUrl}) 
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>About</label>
																<Input
																	name="about"
																	placeholder="About Expertise"
																	value={this.state.about}
																	type={InputType.TEXTAREA}
																	onChange={(about: any) => {
																		this.setState({about})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<Input
																	name="expertiseCategories"
																	value={this.state.category}
																	type={InputType.ASYNC_SELECT}
																	label="Expertise category you're interested in"
																	placeholder="Select expertise category"
																	options={doGetExpertiseCategory}
																	multi={false}
																	onChange={(category: string) => { 
																		console.log(category)
																		this.setState({category})
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<Input
																	name="tags"
																	value={this.state.tags}
																	type={InputType.ASYNC_SELECT}
																	label="Expertise Tags"
																	placeholder="Select up to 5 tags"
																	options={doGetExpertiseCategory}
																	multi={true}
																	onChange={(tags: any) => { 
																		console.log(tags)
																		this.setState({tags})
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<Input
																	label="Select Expert"
																	name="expert"
																	placeholder="Select expert"
																	value={this.state.expert}
																	multi={false}
																	type={InputType.SELECT}
																	options={expertlist}
																	simpleValue={true}
																	onChange={(expert: any) => { 
																		this.setState({expert})
																	}}
																/>
															</div>
														</div>
														{this.state.gallery &&
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
																	{
																		this.state.gallery.length > 0 && (
																			<div className="expertise-section__gallary_detial__row">
																				{
																					this.state.gallery.map((g: string, i: number) => (
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
																		this.state.gallery.length < 6 && (
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
														{this.state.faq &&
															<div className="col-lg-12">
																<div className="form-group mb-1">
																	<label>FAQ</label>
																</div>
																<div style={{margin:"5px"}}>
																	{
																		this.state.faq.length > 0 &&this.state.faq.map((faq: FAQRecord, i: number) => (
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
																						(i === (this.state.faq.length - 1)) && (
																							<button
																								onClick={() => { this.addFaq() }}
																								className="btn btn-outline btn-success">Add FAQ</button>
																						)
																					}
																					{
																						(i < (this.state.faq.length - 1)) && (
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
														{this.state.packages &&
															<div className="col-lg-12">
																<div className="form-group mb-1">
																	<label>Packages</label>
																</div>
																<div style={{margin:"5px"}}>
																	<div className="expertise-section__pricing_detial__inner_row_first">
																		<div className="expertise-section__pricing_detial__inner_left">
																			{
																				this.state.packages.map((p: PackageRecord, i: number) => (
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
																								(i === (this.state.packages.length - 1)) && (
																									<button
																										onClick={() => { this.addPackage() }}
																										className="btn btn-outline btn-success">Add Packages</button>
																								)
																							}
																							{
																								(i < (this.state.packages.length - 1)) && (
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
																						value={this.state.additionalInfo}
																						type={InputType.TEXT}
																						onChange={(additionalInfo: any) => { 
																							this.setState({additionalInfo})
																						}}
																					/>
																				</div>
																			</div>
																			<div className="col-lg-4">
																				<div className="mb-1">
																					<label>NDA</label>
																					<Switch
																						checked={this.state.nda}
																						onChange={(nda: any) => { 
																							this.setState({nda})
																						}}
																					/>
																				</div>
																			</div>
																			<div className="col-lg-4">
																				<div className="mb-1">
																					<label>Attachments</label>
																					<Switch
																						checked={this.state.attachments}
																						onChange={(attachments: any) => { 
																							this.setState({attachments})
																						}}
																					/>
																				</div>
																			</div>
																		</div>
																		<div className="row">
																			<div className="col-lg-12">
																				{
																					this.state.fields && this.state.fields.map((e: OrderBriefDataFieldRecord, i: number) => (
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
																									onChange={(formType: any) => {
																										this.UpdateFields(i, { formType })
																									}}
																								/>
																							</div>
																							<div className="col-lg-4">
																								{
																									(i === (this.state.fields.length - 1)) && (
																										<button
																											onClick={() => { this.addFields() }}
																											className="btn btn-outline btn-success">Add Fields</button>
																									)
																								}
																								{
																									(i < (this.state.fields.length - 1)) && (
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
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openConstantAddModal()}>
																	Add Expertise
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
							title="Expertise Add"
							text="Are you sure you want to Add Expertise"
							showCancelButton
							onConfirm={() => { this.doAddExpertiseDetail() }}
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

	private UpdateToggle(value: any) {
		console.log(value)
		if(value){
			this.setState({isVisible: true})
		}else{
			this.setState({isVisible: false})
		}
	}

	private doAddExpertiseDetail() {

		let submitCat='';
		let submitTags=[];
		if(this.state.category){
			submitCat=this.state.category._id
		}
		if(this.state.tags.length>0){
			for(const items of this.state.tags){
				submitTags.push(items._id)
			}
		}

		const Experise = {
			name: this.state.name,
			slug: slugify(this.state.name),
			about: this.state.about,
			featuredImageUrl: this.state.featuredImageUrl,
			category: submitCat,
			tags: submitTags,
			gallery: this.state.gallery,
			packages:this.state.packages,
		    faq: this.state.faq,
		    rating: this.state.rating,
		    expert: this.state.expert,
		    briefTemplate: {
				nda: this.state.nda,
				attachments: this.state.attachments,
				additionalInfo: this.state.additionalInfo,
				fields: this.state.fields,
				version:1
			},
			isDraft:  this.state.isVisible ? false: true
		}
		console.log(Experise)
		doAddExpertise(Experise).then(() => {
			this.setState({
				isCreateExpertise: ActionTypeStates.SUCCESS,
				openAddModel: false,
				name: '',
				about: '',
				category: '',
				rating: '',
				tags: '',
				nda:'',
				additionalInfo: '',
				attachments: '',
				fields: [],
				packages: [],
				faq: [],
				gallery: []
			})
		}).catch(() => {
			this.setState({ isCreateExpertise: ActionTypeStates.FAILED })
		})
	}

	private UpdateFields(index: number, updatedFieldObject: any) {
		const fields = this.state.fields
		fields[index] = {...fields[index], ...updatedFieldObject}
		this.setState({ fields })
		// this.setState({isRender: true})
	}

	private addFields(){
		this.state.fields.push({  
			name: '',
			formType: ''
		});
		this.setState({
			isRender: true
		})
	}

	private removeFields(index: number) {
		this.state.fields.splice(index, 1)
		this.setState({
			isRender: true
		})
	}

	private updatePackage(index: number, updatedPackageObject: Partial<PackageRecord>) {
		const packages = this.state.packages
		packages[index] = {...packages[index], ...updatedPackageObject}
		this.setState({ packages })
	}

	private addPackage(){
		this.state.packages.push({ name: '',
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
		this.state.packages.splice(index, 1)
		this.setState({
			isRender: true
		})
	}

	private updateFaq(index: number, updatedFaq: Partial<FAQRecord>) {
		const faq = this.state.faq
		faq[index] = {...faq[index], ...updatedFaq}

		this.setState({ faq })
	}

	private addFaq() {
		this.state.faq.push({ title: '', answer: '' });

		this.setState({
			isRender: true
		})
	}

	private removeFaq(index: number) {
		this.state.faq.splice(index, 1)
		this.setState({
			isRender: true
		})
	}

	private removeGalleryItem(index: number) {
		const gallery = this.state.gallery
		gallery.splice(index, 1)

		this.setState({ gallery })
	}

	private onDrop(uploadableFiles: any[]) {
		this.setState({ uploadableFiles: uploadableFiles.slice(0, (6 - this.state.gallery.length)) })
	}

	private doUpload() {
		this.setState({ isUploading: true })

		return Promise.all(this.state.uploadableFiles.map(async (uf: any) => {
			try {
				return await doUploadMedia(uf, { dimensions: { width: 720, height: 480, crop: true } })
			} catch (error) { console.log('error', error) }
		})).then((response: any) => {
			const uploadedFiles = response.map((r: any[], i: number) => r[0].url)
			console.log(uploadedFiles)
			console.log(uploadedFiles[0])
			for (const item of uploadedFiles) {
				this.state.gallery.push(item);
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
	state: state.ExpertList
})

export default connect(mapStateToProps, {
	doAddExpertise,
	fetchExpert
})(AddExpertise)