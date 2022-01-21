import { ASSETS_API } from '../constants/api'
import http from '../utils/httpService'

export interface MediaMetadata {
	dimensions?: {
		width: number
		height: number
		crop?: boolean
	}
}

/**
 * Upload a media asset
 */
export const doUploadMedia = (file: File, metaData: MediaMetadata, onUploadProgress?: any) => {
	if (!metaData) {
		metaData = {dimensions: {width: 750, height: 422}}
	}

	return new Promise<string>((resolve, reject) => {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('metadata', JSON.stringify(metaData))

		http.post(ASSETS_API, formData, {
			headers: {'Content-Type': 'multipart/form-data'},
			onUploadProgress: (progressEvent => {
				if (onUploadProgress) {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
					onUploadProgress(percentCompleted)
				}
			})
		})
			.then((result: any) => resolve(result.data))
			.catch((error: any) => reject(error))
	})
}