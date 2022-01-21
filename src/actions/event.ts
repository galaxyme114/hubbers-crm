import {
	FetchEventDetailFailed,
	FetchEventDetailPending,
	FetchEventDetailSuccess,
	FetchEventFailed,
	FetchEventPending,
	FetchEventSuccess,
	EventUpdateFailed,
	EventUpdatePending,
	EventUpdateSuccess
} from '../constants/action-types'
import { EVENT_ADD_API, EVENT_DELETE_API, EVENT_DETAIL_API, EVENT_UPDATE_API, EVENTS_API } from '../constants/api'
import { EventRecord } from '../constants/models'

import http from '../utils/httpService'

/**
 * Fetch the Events and dispatch the data
 *
 */
export const fetchEvents = () => (dispatch: any) => {
	dispatch(new FetchEventPending().toObject())

	return doFetchEvents()
		.then((events: EventRecord) =>
			dispatch(new FetchEventSuccess(events).toObject()))
		.catch((error: any) => dispatch(new FetchEventFailed(error).toObject()))
}

/**
 * Underlying method to fetch the Events from the API
 *
 * @returns {Promise<[EventRecord]>}
 */
export const doFetchEvents = (): Promise<any> => {
	return new Promise<any>((resolve: any, reject: any) => {
		return http.get(EVENTS_API)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Fetch the event detail and dispatch the data
 *
 */
export const fetchEventDetail = (eventId: any) => (dispatch: any) => {
	dispatch(new FetchEventDetailPending().toObject())

	return doFetchEventDetail(eventId)
		.then((event: EventRecord) =>
			dispatch(new FetchEventDetailSuccess(event).toObject()))
		.catch((error: any) => dispatch(new FetchEventDetailFailed(error).toObject()))
}

/**
 * Underlying method to fetch the event detail from the API
 *
 * @returns {Promise<[ContestRecord]>}
 */
export const doFetchEventDetail = (eventId: any) => {
	return new Promise<EventRecord>((resolve: any, reject: any) => {
		http.get(`${EVENT_DETAIL_API}/${eventId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}
/**
 * Fetch the event update and dispatch the data
 *
 */
export const EventUpdate = (data: any, eventId: any) => (dispatch: any) => {
	console.log(data)
	dispatch(new EventUpdatePending().toObject())

	return doEventUpdate(data, eventId)
		.then((event: EventRecord) =>
			dispatch(new EventUpdateSuccess(event).toObject()))
		.catch((error: any) => dispatch(new EventUpdateFailed(error).toObject()))
}

/**
 * Underlying method to fetch the event update from the API
 *
 * @returns {Promise<[ContestRecord]>}
 */
export const doEventUpdate = (data: any, eventId: any) => {
	return new Promise<EventRecord>((resolve: any, reject: any) => {
		http.put(`${EVENT_UPDATE_API}/${eventId}/attend`, data)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Underlying function to event delete
 */
export const doEventDelete = (eventId: any) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${EVENT_DELETE_API}/${eventId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to Add a single event
 *
 * @returns {Promise<any>}
 */
export const doAddEvent = (data: any) => {
	console.log(data)
	return new Promise<any>((resolve: any, reject: any) => {
		http.post(`${EVENT_ADD_API}`, {
			name: data.name,
			description: data.description,
			country: data.country,
			address: data.address,
			date: data.date,
			time: data.time,
			speakers: data.speakers,
			map: data.map,
			agenda: data.agenda,
			schedule: data.schedule,
			community: data.community,
			attending: data.attending,
		})
		.then(response => resolve(response.data))
		.catch(error => reject(error))
	})
}
