export const slugify = (subject: any) => {
	return subject.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '')             // Trim - from end of text
}

export const unSlugify = (subject: any) => {
	return subject.toString()
		.replace(/-/g, ' ')             // Restore - with spaces
		.toUpperCase()
}

export const filterObject = (subject: any, keys: any) => {
	const matchingKeys = Object.keys(subject).filter(k => keys.indexOf(k) !== -1)
	const matchingObject: any = {}
	matchingKeys.map(mk => matchingObject[mk] = subject[mk])

	return matchingObject
}

export const cleanObject = (subject: any) => {
	const allKeys = Object.keys(subject)
	const cleanedObject: any = {}
	allKeys.map(k => {
		if (subject[k]) {
			cleanedObject[k] = subject[k]
		}
	})
	return cleanedObject
}