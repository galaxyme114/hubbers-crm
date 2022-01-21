import * as React from 'react'
import Dropzone from 'react-dropzone'

import Spinner from './Spinner'

import { doUploadMedia } from '../actions/media'

export interface UserThumbnailUploadProps {
	thumbnailImageUrl: string
	autoUpload?: boolean
	onUpload?: any
}

export interface UserThumbnailUploadState {
	isUploading: boolean
	uploadProgress: number
	uploadableFile: any
}

export default class UserThumbnailUpload extends React.Component<UserThumbnailUploadProps, UserThumbnailUploadState> {
	public constructor(props: UserThumbnailUploadProps) {
		super(props)

		this.state = {
			isUploading: false,
			uploadProgress: null,
			uploadableFile: null
		}
	}

	public render() {
		const {thumbnailImageUrl} = this.props
		const {uploadableFile} = this.state

		const displayImageUrl = (uploadableFile && uploadableFile.preview) ? uploadableFile.preview : thumbnailImageUrl

		return (
			<div>
				<div className="user-thumbnail">
					<div className="user-thumbnail__image" style={{backgroundImage: 'url(' + displayImageUrl + ')'}}>
						<Dropzone onDrop={this.onDrop.bind(this)}/>
					</div>
					{
						(!uploadableFile && !this.state.isUploading) && <span className="icon icon-camera"/>
					}
					{
						(uploadableFile && !this.state.isUploading) &&
						<span className="icon icon-upload-cloud" onClick={() => {
							this.uploadImage()
						}}/>
					}
				</div>
				{
					this.state.isUploading && <div className="user-thumbnail__upload-spinner">
						<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
					</div>
				}
			</div>
		)
	}

	private onDrop(files: [any]) {
		this.setState({uploadableFile: files[0]})

		if (this.props.autoUpload) {
			this.uploadImage(files[0])
		}
	}

	private uploadImage(file?: any) {
		const {onUpload} = this.props

		this.setState({isUploading: true})
		doUploadMedia(
			(file ? file : this.state.uploadableFile),
			{dimensions: {width: 960, height: 680, crop: true}},
			(uploadProgress: number) => {
				this.setState({uploadProgress})
			})
			.then((response: any) => {
				onUpload(response[0].url)
				this.setState({isUploading: false, uploadableFile: null})
			}).catch((error: any) => {
			console.log('errors', error)
		})
	}
}