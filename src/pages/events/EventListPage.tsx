import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { doEventDelete, fetchEvents } from '../../actions/event'
import Spinner from '../../components/Spinner'
import { ActionTypeStates } from '../../constants/action-types'
import Footer from '../../containers/Footer'
import Header from '../../containers/Header'
import Sidebar from '../../containers/Sidebar'
import { RootState } from '../../reducers/index'
import { State as EventsListState } from '../../reducers/event'

import SweetAlert from 'sweetalert-react'

interface EventListProps {
	state: EventsListState
	fetchEvents: any
}

interface EventListState {
	eventDeleteStatus: ActionTypeStates
	globalFilter: string
	isLoading: boolean
	openconformationmodel: boolean
	selectedID: number
}

class EventList extends React.Component<EventListProps, EventListState> {
	constructor(props: EventListProps) {
		super(props)
		this.state = {
			globalFilter: null,
			eventDeleteStatus: null,
			isLoading: false,
			openconformationmodel: null,
			selectedID: null

		}
		this.actionButtons = this.actionButtons.bind(this)
		this.openConfirmModal = this.openConfirmModal.bind(this)
		this.eventDelete = this.eventDelete.bind(this)
	}

	public eventDelete() {

		doEventDelete(this.state.selectedID)
			.then(() => {
				this.setState({
					eventDeleteStatus: ActionTypeStates.SUCCESS,
					isLoading: false,
					openconformationmodel: false
				})
				Alert.success('Event Delete Successfully', {
					effect: 'genie',
					position: 'bottom-right'
				})
				this.props.fetchEvents()
			}).catch(() => {
			this.setState({
				eventDeleteStatus: ActionTypeStates.FAILED,
				isLoading: false
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})
		})
	}

	public componentDidMount() {
		this.props.fetchEvents()
	}

	public openConfirmModal(eventId: any) {

		this.setState({
			openconformationmodel: true,
			selectedID: eventId
		})

	}

	public actionButtons(rowData: any, column: any) {
		return <div>
			<Link to={'/event/edit/' + rowData._id + '/'}>
				<button type="button" className="btn btn-outline-success"><i className="fa fa-edit "></i></button>
			</Link>&nbsp;
			<button
				type="button"
				className="btn btn-outline-danger"
				onClick={() => {
					this.openConfirmModal(rowData._id)
				}}>
				<i className="fa fa-trash "></i>
			</button>
		</div>
	}

	public render() {
		const {state} = this.props
		// const {} = this.state

		const header = <div className="input-group" style={{textAlign: 'left', width: '50%'}}>

			<span className="input-group-addon"><i className="fa fa-search"></i></span>
			<input
				className="form-control"
				type="search"
				onChange={(e: any) => {
					this.setState({globalFilter: e.target.value})
				}}
				placeholder="Global Search"/>
		</div>

		return (
			<div className="app">
				<Helmet>
					<title>Events</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb>
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Events</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid pages_page">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i> Events List
												<Link to={'/event/add'}>
													<button className="btn btn-primary pull-right addnewbtn">+ New Event</button>
												</Link>
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS) &&
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												}
												{
													(state.status !== ActionTypeStates.INPROGRESS) &&
													<DataTable
														value={this.props.state.eventsList}
														paginator={true}
														rows={10}
														rowsPerPageOptions={[10, 20, 30, 50]}
														header={header}
														globalFilter={this.state.globalFilter}
														scrollable={true}
														responsive={true}>

														<Column field="name" header="Name"/>
														<Column field="description" header="Description"/>
														<Column field="country" header="Country"/>
														<Column field="address" header="Address"/>
														<Column field="date" header="Date"/>
														<Column field="time" header="Time"/>
														{/* <Column field="speakers" header="Speakers"/> */}
														{/* <Column field="map" header="Map"/>
														<Column field="agenda" header="Agenda"/> */}
														{/* <Column field="schedule.time" header="Schedule Time"/> */}
														<Column header="Action" body={this.actionButtons}
															style={{textAlign: 'center', width: '10em'}}/>
													</DataTable>
												}
											</div>
										</div>
										<SweetAlert
											show={this.state.openconformationmodel}
											title="Event Delete"
											text="Are you sure"
											showCancelButton
											onConfirm={() => {
												console.log('confirm')
												this.eventDelete()
											}}
											onCancel={() => {
												console.log('cancel')
												this.setState({openconformationmodel: false})
											}}
											onEscapeKey={() => this.setState({openconformationmodel: false})}
											onOutsideClick={() => this.setState({openconformationmodel: false})}
										/>
									</div>
								</div>

							</div>
						</div>
					</main>
				</div>
				<Footer/>
			</div>

		)
	}

}

const mapStateToProps = (state: RootState) => ({
	state: state.EventsList
})

export default connect(mapStateToProps, {
	fetchEvents
})(EventList)