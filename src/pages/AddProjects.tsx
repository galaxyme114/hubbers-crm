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
import { doAddProject} from '../actions/projects'
import Input from '../components/Input'
import Icon from '../components/Icon'
import Spinner from '../components/Spinner'
import Switch from '../components/Switch'
import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { doUploadMedia } from '../actions/media'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { ProjectRecord } from '../constants/models'
import { languages, innovationCategories, productCategories, nationalityCountries } from '../constants/selectOptions'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'
import { slugify } from '../utils/stringUtils'
import Alert from 'react-s-alert'

interface AddProjectsProps {
	doAddProject: any
	history: any
}

interface AddProjectsState {
	// ProjectsDetail: ProjectRecord
	// UserDetail: any
	productCategory: any
	innovationCategory: any
	name: string
	state: string
	featuredImageUrl: string
	description: string
	market: string
	geography: string,
	language: string,
	price: any,
	shares: string,
	isCreateProject: ActionTypeStates
	openAddModel: boolean
	isRender: boolean
	isVisible: boolean
	gallery: string[]
	uploadableFiles: any[]
	isUploading: boolean
}

class AddProjects extends React.Component<AddProjectsProps, AddProjectsState> {
	constructor(props: AddProjectsProps) {
		super(props)

		this.state = {
			// ProjectsDetail: null,
			name: '',
			state: '',
			productCategory: null,
			innovationCategory: null,
			featuredImageUrl: '',
			description: '',
			market: '',
			geography: '',
			language: '',
			price: '',
			shares: '',
			isCreateProject: null,
			openAddModel: null,
			isRender: false,
			isVisible: false,
			gallery: [],
			uploadableFiles: [],
			isUploading: false
		}

	}

	public openProjectAddModal() {
		this.setState({
			openAddModel: true
		})
	}

	public render() {
		const {isCreateProject} = this.state
		return (
			<div className="app">
				<Helmet>
					<title>Projects</title>
				</Helmet>
				<Header/>

				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Add Projects</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Add Projects
											</div>
											<div className="card-block">
											{
													(isCreateProject === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													isCreateProject !== ActionTypeStates.INPROGRESS && (
													<div className="row">
														<div className="col-lg-8">
															<div className="row">
																<div className="col-lg-8">
																	<div className="form-group mb-1">
																		<label>Name</label>
																		<Input
																			name="Name"
																			placeholder="Enter Name"
																			value={this.state.name}
																			type={InputType.TEXT}
																			onChange={(name: any) => {
																				this.setState({name})
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-4">
																	<div className="form-group mb-1">
																		<label>Published</label>
																		<Switch
																		checked={this.state.isVisible}
																		onChange={(v: any) => {
																			this.UpdateToggle(v)
																		}}/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Product Categories</label>
																		<Input
																			name="ProductCategory"
																			value={this.state.productCategory}
																			type={InputType.SELECT}
																			placeholder="Select an Products Category"
																			options={productCategories}
																			multi={false}
																			onChange={(productCategory: any) => {
																				this.setState({productCategory:productCategory.value})
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Innovations Category</label>
																		<Input
																			name="Innovation"
																			value={this.state.innovationCategory}
																			type={InputType.SELECT}
																			placeholder="Select an innovation Category"
																			options={innovationCategories}
																			multi={false}
																			onChange={(innovationCategory: any) => {
																				this.setState({innovationCategory: innovationCategory.value})
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
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Description</label>
																<ReactQuill
																	value={this.state.description}
																	onChange={(description: any) => {
																		this.setState({description})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Market Rules</label>
																<ReactQuill
																	value={this.state.market}
																	onChange={(market: any) => {
																		this.setState({market})
																	}}/>
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
																	</div>
																	<div className="expertise-section__gallary_detial__headingtext">
																		<p className="uploadheading_title">Upload photos that describe your Projects</p>
																		<p className="uploadheading_count">{this.state.gallery.length}/6</p>
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
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Languages</label>
																<Input
																	name="languages"
																	placeholder="Select Languages"
																	value={this.state.language}
																	multi={false}
																	type={InputType.SELECT}
																	options={languages}
																	simpleValue={true}
																	onChange={(language: any) => {
																		this.setState({language})
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Geography</label>
																<Input
																	name="geography"
																	value={this.state.geography}
																	type={InputType.SELECT}
																	placeholder="Nationality"
																	options={nationalityCountries}
																	multi={false}
																	simpleValue={true}
																	onChange={(geography: any) => {
																		this.setState({geography})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Price</label>
																<Input
																	name="Price"
																	placeholder="Enter Price"
																	value={this.state.price}
																	type={InputType.TEXT}
																	onChange={(price: any) => {
																		this.setState({price})
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openProjectAddModal()}>
																	Add Project
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
							title="project Add"
							text="Are you sure you want to Add project"
							showCancelButton
							onConfirm={() => { this.doAddProjectDetail() }}
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
		if(value){
			this.setState({isVisible: true})
		}else{
			this.setState({isVisible: false})
		}
	}

	// private doAddProjectDetail(key: string, value: any) {
	// 	const ProjectsDetail: any = {...this.state.ProjectsDetail}
	// 	ProjectsDetail[key] = value;
	// 	this.setState({ProjectsDetail})
	// }

	private doAddProjectDetail() {

		const Project = {
			name: this.state.name,
			// slug: slugify(this.state.name),
			state: "0",
			featuredImageUrl: this.state.featuredImageUrl,
			gallery: this.state.gallery,
			description: this.state.description,
			market: this.state.market,
			productCategory: this.state.productCategory,
			innovationCategory: this.state.innovationCategory,
			geography: this.state.geography,
			language: this.state.language,
			price: this.state.price,
			shares: this.state.shares,
			isDraft:  this.state.isVisible ? false: true
		}
		console.log(Project)
		doAddProject(Project).then(() => {
			this.setState({
				isCreateProject: ActionTypeStates.SUCCESS,
				openAddModel: false,
				name: '',
				state: '',
				featuredImageUrl:'',
				market: '',
				description: '',
				geography: '',
				language: '',
				price: '',
				shares: '',
				gallery: [],
				innovationCategory: '',
				productCategory: ''
			})
			this.props.history.push(`/projects`)			
		}).catch(() => {
			this.setState({ isCreateProject: ActionTypeStates.FAILED})
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
})

export default connect(mapStateToProps, {
	doAddProject
})(AddProjects)