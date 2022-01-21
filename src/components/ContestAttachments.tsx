import * as React from 'react'
import Slider from 'react-slick'
// import * as PDFViewer from 'simple-react-pdf'
import { UserActivityAttachmentCarousel } from '../constants/carouselSettings'
import { ContestEntryAttachmentRecord } from '../constants/models'
import { getFileExtension } from '../utils/fileUtils'

 export interface ContestAttachmentsProps {
	attachments: ContestEntryAttachmentRecord[]
 }

 export interface ContestAttachmentsState {}

 export default class ContestAttachments extends React.Component<ContestAttachmentsProps, ContestAttachmentsState> {

	private static renderItem(attachment: ContestEntryAttachmentRecord) {
		const extension = getFileExtension(attachment.previewUrl)

		if (extension === 'JPEG' || extension === 'JPG' || extension === 'PNG' || extension === 'TIFF') {
			return ContestAttachments.renderImages(attachment)
		} else if (extension === 'PDF') {
			return ContestAttachments.renderPDF(attachment)
		} else {
			return ContestAttachments.renderDefault(attachment)
		}
	}

	private static renderDefault(attachment: ContestEntryAttachmentRecord) {
		return (
			<div className="attachment_slider_img__wrap">
				<div className="attachment_slider_img">
					<div style={{backgroundImage: `url(${attachment.previewUrl})`}}/>
				</div>
				<div className="attachment_slider_meta">
					<div className="attachment_slider_meta__description">
						<span className="title">{attachment.title}</span>
						<span className="caption">{attachment.caption}</span>
					</div>
					<div className="attachment_slider_meta__actions">
						<a
							className="btn btn-outline btn-small"
							href={attachment.previewUrl} download>Download</a>
						<a
							className="btn btn-outline btn-small"
							href={attachment.previewUrl} target="_blank">Open</a>
					</div>
				</div>
			</div>
		)
	}

	private static renderImages(attachment: ContestEntryAttachmentRecord) {
		return (
			<div className="attachment_slider_img__wrap">
				<div className="attachment_slider_img">
					<div style={{backgroundImage: `url(${attachment.previewUrl})`}}/>
				</div>
				<div className="attachment_slider_meta">
					<div className="attachment_slider_meta__description">
						<span className="title">{attachment.title}</span>
						<span className="caption">{attachment.caption}</span>
					</div>
					<div className="attachment_slider_meta__actions">
						<a
							className="btn btn-outline btn-small"
							href={attachment.previewUrl} target="_blank" download={attachment.title}>Download</a>
						<a
							className="btn btn-outline btn-small"
							href={attachment.previewUrl} target="_blank">Open</a>
					</div>
				</div>
			</div>
		)
	}

	private static renderPDF(attachment: ContestEntryAttachmentRecord) {
		return (
			<div className="attachment_slider_img">
				<div className="attachment--type-pdf">
					<object data={attachment.previewUrl} type="application/pdf"/>
				</div>
			</div>
		)
	}

	public constructor(props: ContestAttachmentsProps) {
		super(props)

		this.state = {}
	}

	public render() {
		const { attachments } = this.props

		return (
			<div className="activity_attachment_slider">
				{
					attachments.length > 0 && (
						<Slider {...UserActivityAttachmentCarousel}>
							{
								attachments.map((attachment: any, i: number) => (
									<div key={i}>{ContestAttachments.renderItem(attachment)}</div>
								))
							}
						</Slider>
					)
				}
				{
					attachments.length === 0 && (
						<div className="attachment_slider_img">
							<div><span>No attachments available</span></div>
						</div>
					)
				}
			</div>
		)
	}
}