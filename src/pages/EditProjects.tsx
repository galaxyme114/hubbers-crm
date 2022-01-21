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
import { fetchProjectsDetail, updateProjectsDetail } from '../actions/projects'
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
import { State as ProjectsDetailState } from '../reducers/projectsDetail'
import { RootState } from '../reducers/index'
import { slugify } from '../utils/stringUtils'
import Alert from 'react-s-alert'
interface EditProjectsMatchParams {
	id: string
}

interface EditProjectsProps extends RouteComponentProps<EditProjectsMatchParams> {
	state: ProjectsDetailState
	fetchProjectsDetail: any
	updateProjectsDetail:any
}

interface EditProjectsState {
	ProjectsDetail: ProjectRecord
	UserDetail: any
	isPageUpdate: ActionTypeStates
	openUpdateModel: boolean
	isRender: boolean
	isVisible: boolean
	gallery: string[]
	uploadableFiles: any[]
	isUploading: boolean
}

class EditProjects extends React.Component<EditProjectsProps, EditProjectsState> {
	constructor(props: EditProjectsProps) {
		super(props)

		this.state = {
			ProjectsDetail: null,
			UserDetail: null,
			isPageUpdate: null,
			openUpdateModel: null,
			isRender: false,
			isVisible: null,
			gallery: [],
			uploadableFiles: [],
			isUploading: false
		}

		this.openProjectUpdateModal = this.openProjectUpdateModal.bind(this)
	}

	public openProjectUpdateModal() {
		this.setState({
			openUpdateModel: true
		})
	}

	public componentDidMount() {
		const ProjectId = this.props.match.params.id
		console.log(ProjectId)
		this.props.fetchProjectsDetail(ProjectId)
	}

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state && nextProps.state.projectsDetail) {
			this.setState({isVisible: !nextProps.state.projectsDetail.isDraft})
			this.setState({
				ProjectsDetail: nextProps.state.projectsDetail,
				UserDetail: nextProps.state.projectsDetail.userInfo
			})
		}
	}

	public render() {
		const {state} = this.props
		const {ProjectsDetail,UserDetail} = this.state
		console.log(ProjectsDetail)
		return (
			<div className="app">
				<Helmet>
					<title>Projects</title>
				</Helmet>
				<Header/>

				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div >
							<Breadcrumb className="mb-0"  >
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Edit Projects</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid" style ={{  position: "relative"}}>
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Edit Projects
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													(ProjectsDetail && state.status === ActionTypeStates.SUCCESS) &&
													<div className="row">
														<div className="col-lg-12">
															<div className="row">
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>User Name:
																			{/* <Link to={'/user/edit/' + ProjectsDetail.userId + '/'}>
																				<span style={{"margin":"15px"}}>{UserDetail.name}</span>
																			</Link> */}
																		</label>
																	</div>
																</div>
																<div className="col-lg-12">
																	{/* <div className="form-group mb-1">
																		<label>User Email:<span style={{"margin":"15px"}}>{UserDetail.email}</span></label>
																	</div> */}
																</div>
															</div>
														</div>
														<div className="col-lg-8">
															<div className="row">
																<div className="col-lg-8">
																	<div className="form-group mb-1">
																		<label>Name</label>
																		<Input
																			name="Name"
																			placeholder="Enter Name"
																			value={ProjectsDetail.name}
																			type={InputType.TEXT}
																			onChange={(value: any) => {
																				this.UpdateProjects('name', value)
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
																			this.UpdateToggle('isDraft', v)
																		}}/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Product Categories</label>
																		<Input
																			name="ProductCategory"
																			value={ProjectsDetail.productCategory}
																			type={InputType.SELECT}
																			placeholder="Select an Products Category"
																			options={productCategories}
																			multi={false}
																			onChange={(v: any) => {
																				this.UpdateProjects('productCategory', v.value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>Innovations Category</label>
																		<Input
																			name="Innovation"
																			value={ProjectsDetail.innovationCategory}
																			type={InputType.SELECT}
																			placeholder="Select an innovation Category"
																			options={innovationCategories}
																			multi={false}
																			onChange={(v: any) => {
																				this.UpdateProjects('innovationCategory', v.value)
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
																	thumbnailImageUrl={ProjectsDetail.featuredImageUrl}
																	onUpload={(featuredImageUrl: string) => { this.UpdateProjects('featuredImageUrl', featuredImageUrl) }}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Description</label>
																<ReactQuill
																	value={ProjectsDetail.description}
																	onChange={(value: any) => {
																		this.UpdateProjects('description', value)
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Market Rules</label>
																<ReactQuill
																	value={ProjectsDetail.market}
																	onChange={(value: any) => {
																		this.UpdateProjects('market', value)
																	}}/>
															</div>
														</div>
														{this.state.ProjectsDetail.gallery &&
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
																		<p className="uploadheading_count">{this.state.ProjectsDetail.gallery.length}/6</p>
																	</div>
																	{
																		this.state.ProjectsDetail.gallery.length > 0 && (
																			<div className="expertise-section__gallary_detial__row">
																				{
																					this.state.ProjectsDetail.gallery.map((g: string, i: number) => (
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
																		this.state.ProjectsDetail.gallery.length < 6 && (
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
																	value={ProjectsDetail.language}
																	multi={false}
																	type={InputType.SELECT}
																	options={languages}
																	simpleValue={true}
																	onChange={(value: any) => {
																		this.UpdateProjects('language', value)
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<label>Geography</label>
																<Input
																	name="geography"
																	value={ProjectsDetail.geography}
																	type={InputType.SELECT}
																	placeholder="Nationality"
																	options={nationalityCountries}
																	multi={false}
																	simpleValue={true}
																	onChange={(v: any) => {
																		this.UpdateProjects('geography', v)
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
																	value={ProjectsDetail.price}
																	type={InputType.TEXT}
																	onChange={(value: any) => {
																		this.UpdateProjects('price', value)
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openProjectUpdateModal()}>
																	Update Project
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
							title="Project Update"
							text="Are you sure you want to Update Project"
							showCancelButton
							onConfirm={() => {
								this.UpdateProjectsDetail()
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

	private UpdateToggle(key: string, value: any) {
		if(value){
			this.setState({isVisible: true})
		}else{
			this.setState({isVisible: false})
		}
	}

	private UpdateProjects(key: string, value: any) {
		const ProjectsDetail: any = {...this.state.ProjectsDetail}
		ProjectsDetail[key] = value;
		this.setState({ProjectsDetail})
	}

	private UpdateProjectsDetail() {

		const Project = {
			name: this.state.ProjectsDetail.name,
			slug: slugify(this.state.ProjectsDetail.name),
			state: this.state.ProjectsDetail.state,
			featuredImageUrl: this.state.ProjectsDetail.featuredImageUrl,
			gallery: this.state.ProjectsDetail.gallery,
			description: this.state.ProjectsDetail.description,
			market: this.state.ProjectsDetail.market,
			productCategory: this.state.ProjectsDetail.productCategory,
			innovationCategory: this.state.ProjectsDetail.innovationCategory,
			geography: this.state.ProjectsDetail.geography,
			language: this.state.ProjectsDetail.language,
			price: this.state.ProjectsDetail.price,
			shares: this.state.ProjectsDetail.shares,
			isDraft:  this.state.isVisible ? false: true
		}
		console.log(Project)
		this.props.updateProjectsDetail(this.state.ProjectsDetail._id, Project).then(() => {
			this.setState({
				isPageUpdate: ActionTypeStates.SUCCESS,
				openUpdateModel: false
			})			
			Alert.success('New Project Updated Successfully',{position: 'bottom-right'})
		}).catch(() => {
			this.setState({isPageUpdate: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})			
		})
	}

	private removeGalleryItem(index: number) {
		const gallery = this.state.ProjectsDetail.gallery
		gallery.splice(index, 1)

		this.setState({ gallery })
	}

	private onDrop(uploadableFiles: any[]) {
		this.setState({ uploadableFiles: uploadableFiles.slice(0, (6 - this.state.ProjectsDetail.gallery.length)) })
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
				this.state.ProjectsDetail.gallery.push(item);
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
	state: state.ProjectsDetail
})
export default connect(mapStateToProps, {
	fetchProjectsDetail,
	updateProjectsDetail
})(EditProjects)