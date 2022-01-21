import * as React from 'react'
import Dropzone from 'react-dropzone'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'

import { doUploadMedia } from '../actions/media'
import { doAddpost } from '../actions/post'
import { RootState } from '../reducers'

import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'

import Icon from '../components/Icon'
import Input from '../components/Input'
import Spinner from '../components/Spinner'

import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'

interface AddPostProps {
	doAddpost: any
	history: any
}

interface AddPostState {
	isRender: boolean
	isCreatePost: ActionTypeStates
	openAddModel: boolean
	body: string
	gallery: string[]
	uploadableFiles: any[]
	isUploading: boolean
}

class AddPost extends React.Component<AddPostProps, AddPostState> {
	constructor(props: AddPostProps) {
		super(props)

		this.state = {
			isRender: false,
			isCreatePost: null,
			openAddModel: null,
			body: '',
			gallery: [],
			uploadableFiles: [],
			isUploading: false
		}
	}

	public openPostAddModal() {
		this.setState({
			openAddModel: true
		})
	}

	public render() {
		const {isCreatePost} = this.state
		return (
			<div className="app">
				<Helmet>
					<title>Post</title>
				</Helmet>
				<Header/>

				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
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
												<i className="fa fa-align-justify"></i>Add Post
											</div>
											<div className="card-block">
												{
													(isCreatePost === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													isCreatePost !== ActionTypeStates.INPROGRESS && (
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
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button
																	className="btn btn-primary"
																	onClick={() => this.openPostAddModal()}>
																	Add Post
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
							title="Post Add"
							text="Are you sure you want to Add Post"
							showCancelButton
							onConfirm={() => { this.doAddPostDetail() }}
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

	private doAddPostDetail() {
		const Post = {
			body : this.state.body,
			gallery : this.state.gallery			
		}
		console.log(Post)
		doAddpost(Post).then(() => {
			this.setState({
				isCreatePost: ActionTypeStates.SUCCESS,
				openAddModel: false,
				body: '',
				gallery: []
			})
			this.props.history.push(`/posts`)
			
		}).catch(() => {
			this.setState({ isCreatePost: ActionTypeStates.FAILED})
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
				this.state.gallery.push(item)
			}
			this.setState({
				uploadableFiles: [],
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
	doAddpost
})(AddPost)