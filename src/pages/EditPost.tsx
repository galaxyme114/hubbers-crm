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
import { fetchPostDetail, updatePostDetail } from '../actions/post'
import Input from '../components/Input'
import Icon from '../components/Icon'
import Spinner from '../components/Spinner'
import Switch from '../components/Switch'
import { doUploadMedia } from '../actions/media'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { PostRecord } from '../constants/models'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { State as PostDetailState } from '../reducers/postDetail'
import { RootState } from '../reducers/index'
import { slugify } from '../utils/stringUtils'
import Alert from 'react-s-alert'

interface EditPostMatchParams {
	id: string
}

interface EditPostProps extends RouteComponentProps<EditPostMatchParams> {
	state: PostDetailState
	fetchPostDetail: any
	updatePostDetail:any
}

interface EditPostState {
	PostDetail: PostRecord
	UserDetail: any
	isPageUpdate: ActionTypeStates
	openUpdateModel: boolean
	isRender: boolean
	isVisible: boolean
	gallery: string[]
	uploadableFiles: any[]
	isUploading: boolean
}

class EditPost extends React.Component<EditPostProps, EditPostState> {
	constructor(props:EditPostProps) {
		super(props)

		this.state = {
			PostDetail: null,
			UserDetail: null,
			isPageUpdate: null,
			openUpdateModel: null,
			isRender: false,
			isVisible: null,
			gallery: [],
			uploadableFiles: [],
			isUploading: false
		}

		this.openPostUpdateModal = this.openPostUpdateModal.bind(this)
	}

	public openPostUpdateModal() {
		this.setState({
			openUpdateModel: true
		})
	}

	public componentDidMount() {
		console.log('PostId')
		const PostId = this.props.match.params.id
		console.log(PostId)
		this.props.fetchPostDetail(PostId)
	}

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state && nextProps.state.postDetail) {
			this.setState({isVisible: !nextProps.state.postDetail.isDraft})
			this.setState({
				PostDetail: nextProps.state.postDetail,
				UserDetail: nextProps.state.postDetail.user
			})
		}
	}

	public render() {
		const {state} = this.props
		const {PostDetail,UserDetail} = this.state
		console.log(PostDetail)
		return (
			<div className="app">
				<Helmet>
					<title>Post</title>
				</Helmet>
				<Header/>

				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div style = {{top: "50px"}}>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Edit Post</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i>Edit Post
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													(PostDetail && state.status === ActionTypeStates.SUCCESS) &&
													<div className="row">
														<div className="col-lg-12">
															<div className="row">
																<div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>User Name:
																			<Link to={'/user/edit/' + PostDetail.userId + '/'}>
																				{/* <span style={{"margin":"15px"}}>{UserDetail.name}</span> */}
																			</Link>
																		</label>
																	</div>
																</div>
																{/* <div className="col-lg-12">
																	<div className="form-group mb-1">
																		<label>User Email:<span style={{"margin":"15px"}}>{UserDetail.email}</span></label>
																	</div>
																</div> */}
															</div>
														</div>
														<div className="col-lg-12">
															<div className="row">
																<div className="col-lg-8">
																	<div className="form-group mb-1">
																		<label>Body</label>
																		<Input
																			name="Body"
																			placeholder="Enter Body"
																			value={PostDetail.body}
																			type={InputType.TEXTAREA}
																			onChange={(value: any) => {
																				this.UpdatePosts('body', value)
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
															</div>
														</div>
														{this.state.PostDetail.gallery &&
															<div className="col-lg-12">
																<div className="form-group mb-1">
																	<label>Gallery</label>
																	<div className="expertise-section__gallary_detial__heading">
																		<div className="expertise-section__gallary__heading">
																			<p>Build your gallery</p>
																		</div>
																	</div>
																	<div className="expertise-section__gallary_detial__headingtext">
																		<p className="uploadheading_title">Upload photos that describe your Post</p>
																		<p className="uploadheading_count">{this.state.PostDetail.gallery.length}/6</p>
																	</div>
																	{
																		this.state.PostDetail.gallery.length > 0 && (
																			<div className="expertise-section__gallary_detial__row">
																				{
																					this.state.PostDetail.gallery.map((g: string, i: number) => (
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
																		this.state.PostDetail.gallery.length < 6 && (
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
																<button
																	className="btn btn-primary"
																	onClick={() => this.openPostUpdateModal()}>
																	Update Post
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
							title="Post Update"
							text="Are you sure you want to Update Post"
							showCancelButton
							onConfirm={() => {
								this.UpdatePostDetail()
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

	private UpdatePosts(key: string, value: any) {
		const PostDetail: any = {...this.state.PostDetail}
		PostDetail[key] = value;
		this.setState({PostDetail})
	}

	private UpdatePostDetail() {
		const Post = {
			gallery : this.state.PostDetail.gallery,
			likes : this.state.PostDetail.likes,
			body : this.state.PostDetail.body,
			isDraft:  this.state.isVisible ? false: true,
			comments : this.state.PostDetail.comments
		}
		console.log(Post)
		this.props.updatePostDetail(this.state.PostDetail._id, Post).then(() => {
			this.setState({
				isPageUpdate: ActionTypeStates.SUCCESS,
				openUpdateModel: false
			})			
			Alert.success('New Post Updated Successfully',{position: 'bottom-right'})
		}).catch(() => {
			this.setState({isPageUpdate: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})			
		})
	}

	private removeGalleryItem(index: number) {
		const gallery = this.state.PostDetail.gallery
		gallery.splice(index, 1)

		this.setState({ gallery })
	}

	private onDrop(uploadableFiles: any[]) {
		this.setState({ uploadableFiles: uploadableFiles.slice(0, (6 - this.state.PostDetail.gallery.length)) })
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
				this.state.PostDetail.gallery.push(item);
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
	state: state.PostDetail
})
export default connect(mapStateToProps, {
	fetchPostDetail,
	updatePostDetail
})(EditPost)