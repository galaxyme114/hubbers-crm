import { Column } from 'primereact/components/column/Column'
import { DataTable } from 'primereact/components/datatable/DataTable'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import Spinner from '../../components/Spinner'
import { ActionTypeStates } from '../../constants/action-types'
import Footer from '../../containers/Footer'
import Header from '../../containers/Header'
import Sidebar from '../../containers/Sidebar'
import { RootState } from '../../reducers/index'
import {doRemoveCommunity, fetchCommunity} from '../../actions/community'
import { State as CommunityListState } from '../../reducers/community'
import SweetAlert from 'sweetalert-react'

interface CommunityPageProps {
	state: CommunityListState
	fetchCommunity: any
}

interface CommunityPageState {
	CommumityDeleteStatus: ActionTypeStates
	globalFilter: string
	isLoading: boolean
	openconformationmodel: boolean
	selectedCommunityID: number
}

class CommunityPage extends React.Component<CommunityPageProps, CommunityPageState> {
	constructor(props: CommunityPageProps) {
		super(props)
		this.state = {
			globalFilter: null,
			CommumityDeleteStatus: null,
			isLoading: false,
			openconformationmodel: null,
			selectedCommunityID: null

		}
		this.actionButtons = this.actionButtons.bind(this)
		this.openConfirmModal = this.openConfirmModal.bind(this)
		this.communityDelete = this.communityDelete.bind(this)
	}

	public communityDelete() {

		doRemoveCommunity(this.state.selectedCommunityID)
			.then(() => {
				this.setState({
					CommumityDeleteStatus: ActionTypeStates.SUCCESS,
					isLoading: false,
					openconformationmodel: false
				})
				Alert.success('Community Delete Successfully', {
					effect: 'genie',
					position: 'bottom-right'
				})
				this.props.fetchCommunity()
			}).catch(() => {
			this.setState({
				CommumityDeleteStatus: ActionTypeStates.FAILED,
				isLoading: false
			})
			Alert.error('Something Went Wrong',{position: 'bottom-right'})
		})
	}

	public componentDidMount() {
		this.props.fetchCommunity()
	}

	public openConfirmModal(communityId: any) {

		this.setState({
			openconformationmodel: true,
			selectedCommunityID: communityId
		})

	}

	public actionButtons(rowData: any, column: any) {
		return <div>
			<Link to={'/community/edit/' + rowData._id + '/'}>
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
		// console.log(state.communitylist);
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
					<title>Community</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb>
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Community</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid pages_page">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i> Community List
												<Link to={'/community/add'}>
													<button className="btn btn-primary pull-right addnewbtn">+ New Community</button>
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
														value={this.props.state.communitylist}
														paginator={true}
														rows={10}
														rowsPerPageOptions={[10, 20, 30, 50]}
														header={header}
														globalFilter={this.state.globalFilter}
														scrollable={true}
														responsive={true}>

														<Column field="shortId" header="ShortId"/>
														<Column field="country" header="Country"/>
														<Column field="city" header="City"/>
														<Column field="featuredImageUrl" header="Image"/>
														<Column field="numConsultants" header="Consultants"/>
														<Column field="socialMediaTags" header="Social Media"/>
														<Column field="partners" header="Partners"/>

														<Column header="Action" body={this.actionButtons}
															style={{textAlign: 'center', width: '10em'}}/>
													</DataTable>
												}
											</div>
										</div>
										<SweetAlert
											show={this.state.openconformationmodel}
											title="Community Delete"
											text="Are you sure"
											showCancelButton
											onConfirm={() => {
												// console.log('confirm')
												this.setState({openconformationmodel: false})
												this.communityDelete()											
											}}
											onCancel={() => {
												// console.log('cancel')
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
	state: state.CommunityList
})

export default connect(mapStateToProps, {
	fetchCommunity
})(CommunityPage)