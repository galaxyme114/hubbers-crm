import * as React from 'react'
import Dropzone from 'react-dropzone'
import { doUploadMedia } from '../actions/media'

export interface ImageCropUploadProps {
	imageUrl: string
	onSubmit: any
}

export interface ImageCropUploadState {
	isUploading: boolean
	uploadProgress: number
	uploadableFile: any
}

export default class ImageCropUpload extends React.Component<ImageCropUploadProps, ImageCropUploadState> {
	public constructor(props: ImageCropUploadProps) {
		super(props)

		this.state = {
			isUploading: false,
			uploadProgress: null,
			uploadableFile: null
		}
	}

	public render() {
		const {imageUrl, onSubmit} = this.props
		const {uploadableFile} = this.state

		const displayImageUrl = (uploadableFile && uploadableFile.preview) ? uploadableFile.preview : imageUrl

		return (
			<div className="image-crop-upload">
				<div className="image-crop-upload__inner">
					<div className="input">
						<label>Featured Image</label>
						<small/>
						<div className="image-crop-upload__thumbnail" style={{backgroundImage: 'url(' + displayImageUrl + ')'}}>
							<Dropzone onDrop={this.onDrop.bind(this)}/>
						</div>

						<div className="image-crop-upload__actions">
							<button
								disabled={!uploadableFile || this.state.isUploading}
								className="btn btn-small btn-rounded"
								onClick={() => {
									this.uploadImage()
								}}>Upload
							</button>
							{
								this.state.isUploading && <progress max="100"/>
							}
						</div>
					</div>
				</div>
				<div className="image-crop-upload__modal">
					Modal Stuff
				</div>
			</div>
		)
	}

	private onDrop(files: [any]) {
		this.setState({uploadableFile: files[0]})
	}

	private uploadImage() {
		const {onSubmit} = this.props

		this.setState({isUploading: true})
		doUploadMedia(
			this.state.uploadableFile,
			{dimensions: {width: 750, height: 422}},
			(uploadProgress: number) => {
				this.setState({uploadProgress})
			})
			.then((response: any) => {
				onSubmit(response[0].url)
				this.setState({isUploading: false, uploadableFile: null})
			}).catch((error: any) => {
			console.log('errors', error)
		})
	}
}