/**
 * Get the file extension
 *
 * @param {string} fileUrl
 * @returns {string}
 */
export const getFileExtension = (fileUrl: string) => {
	return fileUrl.split('.').pop().toUpperCase()
}