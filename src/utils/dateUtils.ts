import * as moment from 'moment'

export const dateFormatForCreatedAt = (column: any) => {
	return column.createdAt ? moment(column.createdAt).format('YYYY-MM-DD') : ''
}

export const dateTimeFormatForCreatedAt = (column: any) => {
	return moment(column.createdAt).format('YYYY-MM-DD hh:mm:ss')
}

export const dateFormatForExpiresAt = (column: any) => {
	return moment(column.expiresAt).format('YYYY-MM-DD')
}

export const dateFormatToGoForExpiresAt = (column: any) => {
	return moment(column.expiresAt).fromNow()
}