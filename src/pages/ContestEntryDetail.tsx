import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import {
	doContestantsApprove,
	doContestantsReject, 
	doJudgeApprove,
	doJudgeReject,
	doRemoveContestant,
	doRemoveJudge,
	doUpdateEntryDraft,
	fetchContestDetail,
	fetchContestEntriesContestants,
	fetchContestEntriesJudge
} from '../actions/contests'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { ContestRecord } from '../constants/models'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers'
import { State as ContestEntryDetailDataState } from '../reducers/contestDetail'
import { getNumberWithMaxDecimals } from '../utils/currency'

import Modal from 'react-responsive-modal'
import Input from '../components/Input'
import { InputType } from '../constants/enums'
import { getUsersSelectOptions, getContestSelectOptions } from '../constants/selectOptions'
import Header from '../containers/Header'


interface ContestEntryDetailMatchParams {
	id: string
}

interface ContestEntryDetailProps extends RouteComponentProps<ContestEntryDetailMatchParams> {
	state: ContestEntryDetailDataState
	fetchContestDetail: any
	fetchContestEntriesJudge: any
	fetchContestEntriesContestants: any
	doUpdateEntryDraft: any
}

interface ContestEntryDetailState {
	contestDetail: ContestRecord
	activeTab: string
	globalFilter: string
	isRender: boolean
	contestEntriesJudges: any
	contestEntriesContestants: any
	isDraftUpdate: ActionTypeStates
	openDraftUpdateModel: boolean
	entryID: number
	entryTitle: string
	entryDesign: string
	entryFunctional: string
	entryUsability: string
	entryMarket: string
	draftIndex: number
	contestantID: string
	judgeID: number
	judgesApproveModal: boolean
	ContestantApproveModal: boolean
	judgesRejectModal: boolean
	ContestantRejectModal: boolean
	judgesDeleteModal: boolean
	ContestantDeleteModal: boolean
	getJudgeId: string
	getContestantId: string
	showContestentModal: boolean
	showJudgeModal: boolean
	chooseContestant: string
	chooseJudge: string
	isJudgeApprove: ActionTypeStates
	isContestantApprove: ActionTypeStates
	isJudgeReject: ActionTypeStates
	isContestantReject: ActionTypeStates
	ContestantDeleteStatus: ActionTypeStates
	JudgeDeleteStatus: ActionTypeStates
	isGetEntriesContestant: ActionTypeStates
	isGetEntriesJudge: ActionTypeStates
}

class ContestEntryDetail extends React.Component<ContestEntryDetailProps, ContestEntryDetailState> {
	constructor(props: ContestEntryDetailProps) {
		super(props)
		this.state = {
			contestDetail: null,
			activeTab: '1',
			globalFilter: null,
			isRender: false,
			contestEntriesJudges: null,
			contestEntriesContestants: null,
			isDraftUpdate: null,
			openDraftUpdateModel: null,
			entryID: null,
			entryTitle: null,
			entryDesign: null,
			entryFunctional: null,
			entryUsability: null,
			entryMarket: null,
			draftIndex: null,
			contestantID: null,
			judgeID: null,
			judgesApproveModal: null,
			ContestantApproveModal: null,
			judgesRejectModal: null,
			ContestantRejectModal: null,
			judgesDeleteModal: null,
			ContestantDeleteModal: null,
			getJudgeId: null,
			getContestantId: null,
			isJudgeApprove: null,
			isContestantApprove: null,
			isJudgeReject: null,
			isContestantReject: null,
			ContestantDeleteStatus: null,
			JudgeDeleteStatus: null,
			isGetEntriesContestant: null,
			isGetEntriesJudge: null,
			showContestentModal: false,
			showJudgeModal: false,
			chooseContestant: null,
			chooseJudge: null
		}

		this.openEntryDraftUpdateModal = this.openEntryDraftUpdateModal.bind(this)
		this.openJudgesApproveModal = this.openJudgesApproveModal.bind(this)
		this.openContestantApproveModal = this.openContestantApproveModal.bind(this)
		this.openJudgesRejectModal = this.openJudgesRejectModal.bind(this)
		this.openContestantRejectModal = this.openContestantRejectModal.bind(this)
	}

	public openEntryDraftUpdateModal(data: any, draftValue: number) {
		this.setState({
			openDraftUpdateModel: true,
			entryID: data.id,
			entryTitle: data.title,
			entryDesign: data.description_design,
			entryFunctional: data.description_funcationality,
			entryUsability: data.description_usability,
			entryMarket: data.description_market_potential,
			draftIndex: draftValue
		})
	}

	public openJudgesRejectModal(judgeId: string) {
		this.setState({
			judgesRejectModal: true,
			getJudgeId: judgeId
		})
	}

	public openContestantRejectModal(ContestantsId: string) {
		this.setState({
			ContestantRejectModal: true,
			getContestantId: ContestantsId
		})
	}

	public openJudgesApproveModal(judgeId: string) {
		this.setState({
			judgesApproveModal: true,
			getJudgeId: judgeId
		})
	}

	public openContestantApproveModal(ContestantsId: string) {
		this.setState({
			ContestantApproveModal: true,
			getContestantId: ContestantsId
		})
	}

	public openJudgesDeleteModal(judgeId: string) {
		this.setState({
			judgesDeleteModal: true,
			getJudgeId: judgeId
		})
	}

	public openContestantDeleteModal(ContestantsId: string) {
		this.setState({
			ContestantDeleteModal: true,
			getContestantId: ContestantsId
		})
	}

	public openContestentModal = () => {
		this.setState({
			showContestentModal: true
		})
	}

	public openJudgeModal = () => {
		this.setState({
			showJudgeModal: true
		})
	}

	public onCloseContestentModal = () => {
		this.setState({
			showContestentModal: false
		})
	}
	
	public onCloseJudgeModal = () => {
		this.setState({
			showJudgeModal: false
		})
	}

	public toggle(tab: string) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			})
		}
	}

	public componentDidMount() {
		const contestId = this.props.match.params.id
		this.props.fetchContestDetail(contestId)
	}

	public getEntrieJudge(contestId: any, judgeId: any) {
		this.props.fetchContestEntriesJudge(contestId, judgeId)
		.then((response: any) => {
			this.setState({
				isGetEntriesJudge : ActionTypeStates.SUCCESS,
				contestEntriesJudges: response.payload
			})
		})
		.catch(() => {
			this.setState({
				isGetEntriesJudge: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong', {position: 'bottom-right'})									
		})
	}

	public getEntrieContestants(contestId: any, contestantId: any) {
		this.props.fetchContestEntriesContestants(contestId, contestantId)
		.then((response: any) => {
			console.log(response)
			this.setState({
				isGetEntriesContestant : ActionTypeStates.SUCCESS,
				contestEntriesContestants: response.payload
			})
		})
		.catch(() => {
			this.setState({
				isGetEntriesContestant: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong', {position: 'bottom-right'})									
		})
	}

	public openCollapseJudges(items: any) {
		this.setState({
			isRender: true
		})

		for (const item of this.props.state.contest.judges) {
			item.isJudgeOpen = false
		}

		if (items.isJudgeOpen === true) {
			items.isJudgeOpen = false

		} else {
			items.isJudgeOpen = true
			// this.getEntrieJudge(this.props.state.contest.id, items.id)
			this.getEntrieJudge(this.props.match.params.id, items.id)
			this.setState({
				judgeID: items.user.judge_id
			})
		}
		setTimeout(() => {
			this.setState({isRender: false})
		}, 500)

	}

	public openCollapseContestants(items: any) {
		this.setState({
			isRender: true
		})

		for (const item of this.props.state.contest.contestants) {
			item.isContestantOpen = false
		}

		if (items.isContestantOpen === true) {
			items.isContestantOpen = false
		} else {
			items.isContestantOpen = true
			this.getEntrieContestants(this.props.match.params.id, items.user._id)
			this.setState({
				contestantID: items.user._id
			})
		}
		setTimeout(() => {
			this.setState({isRender: false})
		}, 500)
	}

	public render() {
		const {state} = this.props
		const {contestEntriesJudges, contestEntriesContestants} = this.state
		// const mystyle = {
		// 	top: "0",
		// 	position: "sticky",
		// 	width: "100%",
		//   };
		return (
			<div className="app">
				<Helmet>
					<title>Contest Entries</title>
				</Helmet>
				<Header />
				<div className="app-body">
						<Sidebar/>
						<main className="main">
							<div>
								<Breadcrumb >
									<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
									<BreadcrumbItem active>Contest Entries</BreadcrumbItem>
								</Breadcrumb>
							</div>
							<div className="container-fluid contest_entry_detail">
								<div className="animated fadeIn" style = {{top: "40px"}}>
									<div className="row">
										<div className="col-lg-12">
											{
												(state.status === ActionTypeStates.INPROGRESS) &&
												<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
											}
											{
												(state.status === ActionTypeStates.SUCCESS) &&
												<div className="card" style = {{top: "50px"}}>
													<div className="card-header">
														<i className="fa fa-align-justify"/> Contest Entries
													</div>
													<div className="card-block">
														<div>
															<Nav tabs className="entry_detail_tabs">
																<NavItem className="entry_detail_tabs_contestant">
																	<NavLink
																		className={this.state.activeTab === '1' ? 'active' : ''}
																		onClick={() => { this.toggle('1') }}>
																		Contestants ({state.contest.contestants.length})
																	</NavLink>
																</NavItem>
																<NavItem className="entry_detail_tabs_judge">
																	<NavLink
																		className={this.state.activeTab === '2' ? 'active' : ''}
																		onClick={() => { this.toggle('2') }}>
																		Judges ({state.contest.judges.length})
																	</NavLink>
																</NavItem>
															</Nav>
															<TabContent activeTab={this.state.activeTab}>
																<TabPane tabId="1">
																	<div className="row">
																		<div className="col-lg-12">
																			<div className="center-add-button">
																				<button className="btn btn-success" onClick={() => this.openContestentModal()}><i className="fa fa-plus"></i> Add a
																					contastant</button>
																			</div>
																		</div>
																		<div className="col-lg-12">
																			<div className="row contestants_header_row">
																				<div className="col-lg-1"/>
																				<div className="col-lg-4">
																					<div className="contestants_header_title">NAME</div>
																				</div>
																				<div className="col-lg-2">
																					<div className="contestants_header_title">REVISIONS</div>
																				</div>
																				<div className="col-lg-2">
																					<div className="contestants_header_title">AVG MARKS</div>
																				</div>
																				<div className="col-lg-3">
																					<div className="contestants_header_title"/>
																				</div>
																			</div>
																			{
																				state.contest.contestants.map((res: any, i: number) =>
																					<div key={i}>
																						<div className="row contestants_content_row">
																							<div className="col-lg-1">
																								{
																									res.isContestantOpen &&
																									<button className="btn togglebtn_right" onClick={() => this.openCollapseContestants(res)}>
																										<i className="fa fa-chevron-circle-down"/>
																									</button>
																								}
																								{
																									!res.isContestantOpen &&
																									<button className="btn togglebtn_right" onClick={() => this.openCollapseContestants(res)}>
																										<i className="fa fa-chevron-circle-right"/>
																									</button>
																								}
																							</div>
																							<div className="col-lg-4">
																								<div className="content_thumb">
																									{/* <div className="content_thumb_img">
																										<img src={res.user.thumbnailImageUrl}/>
																									</div>
																									<div className="content_data">
																										{res.user.fullName}
																									</div> */}
																								</div>
																							</div>
																							<div className="col-lg-2">
																								<div className="content_data">
																									{res.numRevisions || 0}
																								</div>
																							</div>
																							<div className="col-lg-2">
																								{
																									(!res.avgMarks) &&
																									<div className="content_data">
																										<div>-</div>
																									</div>
																								}
																								{
																									(res.avgMarks) &&
																									<div className="content_data">
																										<div>{getNumberWithMaxDecimals(res.avgMarks.average || 0, 2)}</div>
																									</div>
																								}
																							</div>
																							<div className="col-lg-3">
																								{/* <div className="actionbtns">
																									{
																										res.isActive === false &&
																										<button
																											className="btn btn-danger"
																											onClick={() => this.openContestantApproveModal(res._id)}>
																											Approve</button>
																									}&nbsp;
																									{
																										res.isActive === true &&
																											<button
																												className="btn btn-outline-danger"
																												onClick={() => this.openContestantRejectModal(res._id)}>
																												Reject</button>
																									}&nbsp;
																									<button className="btn btn-danger" onClick={() => this.openContestantDeleteModal(res._id)}>
																										Delete</button>
																								</div> */}
																								<div  className="actionbtns">
																									
																										<button type="button" className="btn btn-outline-success">
																											<i className="fa fa-eye "/>
																										</button>
																									&nbsp;
																										<button type="button" className="btn btn-outline-success"><i className="fa fa-edit "/></button>
																									&nbsp;
																									<button type="button" className="btn btn-outline-danger" 
																										onClick={() => this.openContestantDeleteModal(res._id)}>
																										<i className="fa fa-trash "/>
																									</button>
																								</div>
																							</div>
																						</div>
																						{
																							res.isContestantOpen && contestEntriesContestants &&
																							<div>
																								{
																									contestEntriesContestants.length > 0 &&

																									<div className="row" style={{marginBottom: '10px'}}>
																										<div className="contestants_inner_header_row">
																											<div className="inner_header_no">
																												<div className="inner_header_title">NO.</div>
																											</div>
																											<div className="inner_header_name">
																												<div className="inner_header_title">TITLE</div>
																											</div>
																											<div className="inner_header_marks">
																												<div className="inner_header_title">MARKS</div>
																											</div>
																											<div className="inner_header_marks">
																												<div className="inner_header_title">AVG MARKS</div>
																											</div>
																											<div className="inner_header_action">
																												<div className="inner_header_title">ACTIONS</div>
																											</div>
																										</div>
																										{
																											contestEntriesContestants.map((op: any, j: number) =>
																												<div className="contestants_inner_content_row" key={j}>
																													<div className="contestants_inner_content_no">
																														<div>{j + 1}</div>
																													</div>
																													<div className="contestants_inner_content_name">
																														<div>{op.title}</div>
																													</div>
																													<div className="contestants_inner_content_marks">
																														<div>{op.marksGiven || 0} / 10</div>
																													</div>
																													<div className="contestants_inner_content_marks">
																														<div>{getNumberWithMaxDecimals(op.rating.average, 2)}/10</div>
																													</div>
																													<div className="contestants_inner_content_action">
																														<div>
																															<Link to={'/entries/' + op._id + '/'}>
																																<button className="btn btn-outline-info">
																																	<i className="fa fa-eye"/>
																																</button>
																															</Link>
																															&nbsp;&nbsp;&nbsp;&nbsp;
																															{
																																op.isDraft === 0 &&
																																<button className="btn btn-danger"
																																	onClick={() => this.openEntryDraftUpdateModal(op, 1)}>
																																	Draft
																																</button>
																															}
																															{
																																op.isDraft === 1 &&
																																<button className="btn btn-outline-danger draftbtn"
																																	onClick={() => this.openEntryDraftUpdateModal(op, 0)}>
																																	Draft
																																</button>
																															}
																														</div>
																													</div>
																												</div>
																											)
																										}
																									</div>
																								}
																								{
																									contestEntriesContestants.length === 0 &&

																									<div className="row" style={{marginBottom: '10px'}}>
																										<div className="contestants_inner_header_row">
																											<div style={{
																												textAlign: 'center',
																												paddingTop: '15px',
																												paddingBottom: '15px',
																												width: '100%',
																												fontWeight: 'bold',
																												fontSize: '16px'
																											}}>No data found
																											</div>
																										</div>
																									</div>
																								}

																							</div>
																						}
																					</div>
																				)
																			}
																		</div>
																	</div>
																</TabPane>
																<TabPane tabId="2">
																	<div className="row">
																		<div className="col-lg-12">
																			<div className="center-add-button">
																				<button className="btn btn-success" onClick={() => this.openJudgeModal()}><i className="fa fa-plus"></i> Add a judge</button>
																			</div>
																		</div>
																		<div className="col-lg-12">
																			<div className="row header_row">
																				<div className="col-lg-1"/>
																				<div className="col-lg-4">
																					<div className="header_title">NAME</div>
																				</div>
																				<div className="col-lg-4">
																					<div className="header_title">MARKS GIVEN</div>
																				</div>
																				<div className="col-lg-3">
																					<div className="header_title"/>
																				</div>
																			</div>
																			{
																				state.contest.judges.map((res: any, i: number) =>
																					<div key={i}>
																						<div className="row content_row">
																							<div className="col-lg-1">
																								{
																									res.isJudgeOpen &&
																									<button className="btn togglebtn_right"
																											onClick={() => this.openCollapseJudges(res)}>
																										<i className="fa fa-chevron-circle-down"/>
																									</button>
																								}
																								{
																									!res.isJudgeOpen &&
																									<button className="btn togglebtn_right"
																											onClick={() => this.openCollapseJudges(res)}>
																										<i className="fa fa-chevron-circle-right"/>
																									</button>
																								}
																							</div>
																							<div className="col-lg-4">
																								<div className="content_thumb">
																									{/* <div className="content_thumb_img">
																										<img src={res.user.thumbnailImageUrl} />
																									</div>
																									<div className="content_data">{res.user.fullName}</div> */}
																								</div>
																							</div>
																							<div className="col-lg-4">
																								<div className="content_data">
																									{res.marksGiven || 0} / {state.contest.numJudges}
																								</div>
																							</div>
																							<div className="col-lg-3">
																								{/* <div className="actionbtns">
																									{
																										res.isActive === false &&
																										<button className="btn btn-danger" onClick={() => this.openJudgesApproveModal(res._id)}>
																											Approve
																										</button>
																									}&nbsp;
																									{
																										res.isActive === true &&
																										<button
																											className="btn btn-outline-danger" onClick={() => this.openJudgesRejectModal(res._id)}>
																											Reject
																										</button>
																									}&nbsp;
																									<button className="btn btn-danger" onClick={() => this.openJudgesDeleteModal(res._id)}>
																										Delete</button>
																								</div> */}
																									<div  className="actionbtns">
																										<button type="button" className="btn btn-outline-success">
																											<i className="fa fa-eye "/>
																										</button>
																									&nbsp;
																										<button type="button" className="btn btn-outline-success"><i className="fa fa-edit "/></button>
																									&nbsp;
																									<button type="button" className="btn btn-outline-danger" 
																										onClick={() => this.openJudgesDeleteModal(res._id)}>
																										<i className="fa fa-trash "/>
																									</button>
																								</div>
																							</div>
																						</div>
																						{
																							res.isJudgeOpen && contestEntriesJudges &&
																							<div>
																								{
																									contestEntriesJudges.length > 0 &&

																									<div className="row" style={{marginBottom: '10px'}}>
																										<div className="inner_header_row">
																											<div className="inner_header_thumb"/>
																											<div className="inner_header_name">
																												<div className="header_title">CONTESTANT</div>
																											</div>
																											<div className="inner_header_designs">
																												<div className="header_title">DESIGN</div>
																											</div>
																											<div className="inner_header_designs">
																												<div className="header_title">FUNCTION</div>
																											</div>
																											<div className="inner_header_designs">
																												<div className="header_title">USABILITY</div>
																											</div>
																											<div className="inner_header_designs">
																												<div className="header_title">MARKET</div>
																											</div>
																											<div className="inner_header_action">
																												<div className="header_title">ACTIONS</div>
																											</div>
																										</div>
																										{
																											contestEntriesJudges.map((op: any, j: number) =>
																												<div className="inner_content_row" key={j}>
																													<div className="inner_content_thumb">
																														<div className="inner_content_thumb_img">
																															<img src={op.contestant.thumbnailImageUrl}/>
																															<div className="inner_content_name">
																																<div>{op.contestant.fullName}</div>
																															</div>
																														</div>
																													</div>
																													{
																														(op.myRating === null) &&
																														<div className="inner_content_designs">
																															<div>-</div>
																														</div>
																													}
																													{
																														(op.myRating) &&
																														<div className="inner_content_designs">
																															<div>{getNumberWithMaxDecimals(op.myRating.design, 2)}/10</div>
																														</div>
																													}
																													{
																														(op.myRating === null) &&
																														<div className="inner_content_designs">
																															<div>-</div>
																														</div>
																													}
																													{
																														(op.myRating) &&
																														<div className="inner_content_designs">
																															<div>{getNumberWithMaxDecimals(op.myRating.functionality, 2)}/10</div>
																														</div>
																													}
																													{
																														(op.myRating === null) &&
																														<div className="inner_content_designs">
																															<div>-</div>
																														</div>
																													}
																													{
																														(op.myRating) &&
																														<div className="inner_content_designs">
																															<div>{getNumberWithMaxDecimals(op.myRating.usability, 2)}/10</div>
																														</div>
																													}
																													{
																														(op.myRating === null) &&
																														<div className="inner_content_designs">
																															<div>-</div>
																														</div>
																													}
																													{
																														(op.myRating) &&
																														<div className="inner_content_designs">
																															<div>{getNumberWithMaxDecimals(op.myRating.marketPotential, 2)}/10</div>
																														</div>
																													}
																													<div className="inner_content_action">
																														<div>
																														{
																															(op.myRating === null) &&
																															<button className="btn btn-outline-info">
																																<i className="fa fa-eye"/></button>
																														}
																														{
																															(op.myRating) &&
																															<Link to={'/contests/' + op._id + '/ratings/' + op.myRating._id}>
																																<button className="btn btn-outline-info">
																																	<i className="fa fa-eye"/></button>
																															</Link>
																														}
																														</div>
																													</div>
																												</div>
																											)
																										}
																									</div>
																								}
																								{
																									contestEntriesJudges.length === 0 &&

																									<div className="row" style={{marginBottom: '10px'}}>
																										<div className="contestants_inner_header_row">
																											<div style={{
																												textAlign: 'center',
																												paddingTop: '15px',
																												paddingBottom: '15px',
																												width: '100%',
																												fontWeight: 'bold',
																												fontSize: '16px'
																											}}>No data found
																											</div>
																										</div>
																									</div>
																								}
																							</div>
																						}

																					</div>
																				)
																			}
																		</div>
																	</div>
																</TabPane>
															</TabContent>
															<Modal open={this.state.showContestentModal} onClose={this.onCloseContestentModal} center classNames={{ modal : 'add-judge-modal'}}>
															
																<div>
																	<div>
																		<h2>Add a Contestant</h2>
																	</div>
																	<div>
																		<div className="row mt-3 mb-3">
																			<div className="col-lg-12">
																				<div className="form-group mb-1">
																					<label>Choose the product completition you want to add a judge in:</label>
																					<Input
																						name="product"
																						placeholder="Choose Product"
																						value={this.state.chooseContestant}
																						disabled={false}
																						type={InputType.ASYNC_SELECT}
																						options={getContestSelectOptions}
																						simpleValue={true}
																						onChange={(chooseContestant: string) => {
																							this.setState({chooseContestant})
																						}}
																						valueKey="_id"
																						labelKey="name"
																					/>
																				</div>
																			</div>
																			<div className="col-lg-12">
																				<div className="form-group mb-1">
																					<label>Choose the judge you want to add:</label>
																					<Input
																						name="judge"
																						placeholder="Choose Judge"
																						value={this.state.chooseJudge}
																						disabled={false}
																						type={InputType.ASYNC_SELECT}
																						options={getUsersSelectOptions}
																						onChange={(chooseJudge: string) => {
																							this.setState({chooseJudge})
																						}}
																						simpleValue={true}
																						valueKey="_id"
																						labelKey="fullName"
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div>
																		<div className="row">
																			<div className="col-lg-12">
																				<button className="btn btn-success">Add</button>
																			</div>
																		</div>
																	</div>
																</div>
															
															</Modal>
															<Modal open={this.state.showJudgeModal} onClose={this.onCloseJudgeModal} center classNames={{ modal : 'add-contestant-modal'}}>
																<div>
																	<div>
																		<h2>Add a judge</h2>
																	</div>
																	<div>
																		<div className="row mt-3 mb-3">
																			<div className="col-lg-12">
																				<div className="form-group mb-1">
																					<label>Choose the product completition you want to add a judge in:</label>
																					<Input
																						name="product"
																						placeholder="Choose Product"
																						value={this.state.chooseContestant}
																						disabled={false}
																						type={InputType.ASYNC_SELECT}
																						options={getContestSelectOptions}
																						simpleValue={true}
																						onChange={(chooseContestant: string) => {
																							this.setState({chooseContestant})
																						}}
																						valueKey="_id"
																						labelKey="name"
																					/>
																				</div>
																			</div>
																			<div className="col-lg-12">
																				<div className="form-group mb-1">
																					<label>Choose the judge you want to add:</label>
																					<Input
																						name="judge"
																						placeholder="Choose Judge"
																						value={this.state.chooseJudge}
																						disabled={false}
																						type={InputType.ASYNC_SELECT}
																						options={getUsersSelectOptions}
																						onChange={(chooseJudge: string) => {
																							this.setState({chooseJudge})
																						}}
																						simpleValue={true}
																						valueKey="_id"
																						labelKey="fullName"
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div>
																		<div className="row">
																			<div className="col-lg-12">
																				<button className="btn btn-success">Add</button>
																			</div>
																		</div>
																	</div>
																</div>
															</Modal>
														</div>
													</div>
												</div>
											}

											<SweetAlert
												show={this.state.openDraftUpdateModel}
												title="Toggle Draft"
												text="Are you sure you want to change the draft status of the entry"
												showCancelButton
												confirmButtonText="Yes"
												cancelButtonText="No"
												onConfirm={() => {
													this.UpdateEntryDraft()
													this.setState({openDraftUpdateModel: false})
												}}
												onCancel={() => {
													this.setState({openDraftUpdateModel: false})
												}}
												onEscapeKey={() => this.setState({openDraftUpdateModel: false})}
												onOutsideClick={() => this.setState({openDraftUpdateModel: false})}
											/>
											<SweetAlert
												show={this.state.judgesApproveModal}
												title="Update"
												text="Are you sure you want to Approve"
												showCancelButton
												confirmButtonText="Yes"
												cancelButtonText="No"
												onConfirm={() => {
													this.UpdateJudgeApprove()
													this.setState({judgesApproveModal: false})
												}}
												onCancel={() => {
													this.setState({judgesApproveModal: false})
												}}
												onEscapeKey={() => this.setState({judgesApproveModal: false})}
												onOutsideClick={() => this.setState({judgesApproveModal: false})}
											/>
											<SweetAlert
												show={this.state.ContestantApproveModal}
												title="Update"
												text="Are you sure you want to Approve"
												showCancelButton
												confirmButtonText="Yes"
												cancelButtonText="No"
												onConfirm={() => {
													this.UpdateContestantApprove()
													this.setState({ContestantApproveModal: false})
												}}
												onCancel={() => {
													this.setState({ContestantApproveModal: false})
												}}
												onEscapeKey={() => this.setState({ContestantApproveModal: false})}
												onOutsideClick={() => this.setState({ContestantApproveModal: false})}
											/>
											<SweetAlert
												show={this.state.judgesRejectModal}
												title="Update"
												text="Are you sure you want to Reject"
												showCancelButton
												confirmButtonText="Yes"
												cancelButtonText="No"
												onConfirm={() => {
													this.UpdateJudgeReject()
													this.setState({judgesRejectModal: false})
												}}
												onCancel={() => {
													this.setState({judgesRejectModal: false})
												}}
												onEscapeKey={() => this.setState({judgesRejectModal: false})}
												onOutsideClick={() => this.setState({judgesRejectModal: false})}
											/>
											<SweetAlert
												show={this.state.ContestantRejectModal}
												title="Update"
												text="Are you sure you want to Reject"
												showCancelButton
												confirmButtonText="Yes"
												cancelButtonText="No"
												onConfirm={() => {
													this.UpdateContestantReject()
													this.setState({ContestantRejectModal: false})
												}}
												onCancel={() => {
													this.setState({ContestantRejectModal: false})
												}}
												onEscapeKey={() => this.setState({ContestantRejectModal: false})}
												onOutsideClick={() => this.setState({ContestantRejectModal: false})}
											/>
											<SweetAlert
												show={this.state.judgesDeleteModal}
												title="Delete"
												text="Are you sure you want to Delete"
												showCancelButton
												confirmButtonText="Yes"
												cancelButtonText="No"
												onConfirm={() => {
													this.DeleteJudge()
													this.setState({judgesDeleteModal: false})
												}}
												onCancel={() => {
													this.setState({judgesDeleteModal: false})
												}}
												onEscapeKey={() => this.setState({judgesDeleteModal: false})}
												onOutsideClick={() => this.setState({judgesDeleteModal: false})}
											/>
											<SweetAlert
												show={this.state.ContestantDeleteModal}
												title="Delete"
												text="Are you sure you want to Delete"
												showCancelButton
												confirmButtonText="Yes"
												cancelButtonText="No"
												onConfirm={() => {
													this.DeleteContestant()
													this.setState({ContestantDeleteModal: false})
												}}
												onCancel={() => {
													this.setState({ContestantDeleteModal: false})
												}}
												onEscapeKey={() => this.setState({ContestantDeleteModal: false})}
												onOutsideClick={() => this.setState({ContestantDeleteModal: false})}
											/>
										</div>
									</div>
								</div>
							</div>
						</main>
					</div>
			</div>
		)
	}

	private UpdateEntryDraft() {
		const data = {
			title: this.state.entryTitle,
			description_design: this.state.entryDesign,
			description_funcationality: this.state.entryFunctional,
			description_usability: this.state.entryUsability,
			description_market_potential: this.state.entryMarket,
			isDraft: this.state.draftIndex
		}

		doUpdateEntryDraft(this.state.entryID, data).then(() => {
			this.setState({
				isDraftUpdate: ActionTypeStates.SUCCESS,
				openDraftUpdateModel: false
			})
			Alert.success('Draft Updated Successfully', {position: 'bottom-right'})
			this.props.fetchContestEntriesContestants(this.props.match.params.id, this.state.contestantID)
				.then((response: any) => {
					this.setState({contestEntriesContestants: response.payload})
				})
		}).catch(() => {
			this.setState({isDraftUpdate: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong', {position: 'bottom-right'})			
		})
	}

	private UpdateJudgeReject() {
		
		doJudgeReject(this.props.match.params.id, this.state.getJudgeId).then(() => {
			this.setState({
				isJudgeReject: ActionTypeStates.SUCCESS,
				judgesRejectModal: false
			})
			Alert.success('Reject Judge Updated Successfully', {position: 'bottom-right'})
			this.props.fetchContestDetail(this.props.match.params.id)
		}).catch(() => {
			this.setState({isJudgeReject: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong', {position: 'bottom-right'})						
		})
	}

	private UpdateContestantReject() {
		
		doContestantsReject(this.props.match.params.id, this.state.getContestantId).then(() => {
			this.setState({
				isContestantReject: ActionTypeStates.SUCCESS,
				ContestantRejectModal: false
			})
			Alert.success('Reject Contestant Updated Successfully', {position: 'bottom-right'})			
			this.props.fetchContestDetail(this.props.match.params.id)
			
		}).catch(() => {
			this.setState({
				isContestantReject: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong', {position: 'bottom-right'})									
		})
	}

	private UpdateJudgeApprove() {
		doJudgeApprove(this.props.match.params.id, this.state.getJudgeId).then(() => {
			this.setState({
				isJudgeApprove: ActionTypeStates.SUCCESS,
				judgesApproveModal: false
			})
			Alert.success('Approve Judge Updated Successfully', {position: 'bottom-right'})			
			this.props.fetchContestDetail(this.props.match.params.id)
		}).catch(() => {
			this.setState({
				isJudgeApprove: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong', {position: 'bottom-right'})
		})
	}

	private UpdateContestantApprove() {
		
		doContestantsApprove(this.props.match.params.id, this.state.getContestantId).then(() => {
			this.setState({
				isContestantApprove: ActionTypeStates.SUCCESS,
				ContestantApproveModal: false
			})
			Alert.success('Approve Contestant Updated Successfully', {position: 'bottom-right'})			
			this.props.fetchContestDetail(this.props.match.params.id)
		}).catch(() => {
			this.setState({
				isContestantApprove: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong', {position: 'bottom-right'})			
		})
	}

	private DeleteContestant() {
		doRemoveContestant(this.props.match.params.id, this.state.getContestantId)
			.then(() => {
				this.setState({
					ContestantDeleteStatus: ActionTypeStates.SUCCESS,
					ContestantDeleteModal: false
				})
				Alert.success('Delete Contestant Successfully', {position: 'bottom-right'})			
				this.props.fetchContestDetail(this.props.match.params.id)
			}).catch(() => {
			this.setState({
				ContestantDeleteStatus: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong', {position: 'bottom-right'})						
		})
	}

	private DeleteJudge() {
		// this.setState({ isLoading: true })
		doRemoveJudge(this.props.match.params.id, this.state.getJudgeId)
			.then(() => {
				this.setState({
					JudgeDeleteStatus: ActionTypeStates.SUCCESS,
					judgesDeleteModal: false
				})
				Alert.success('Delete Judge Successfully', {position: 'bottom-right'})							
				this.props.fetchContestDetail(this.props.match.params.id)
			}).catch(() => {
			this.setState({
				JudgeDeleteStatus: ActionTypeStates.FAILED
			})
			Alert.error('Something Went Wrong', {position: 'bottom-right'})									
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.ContestDetail
})
export default connect(mapStateToProps, {
	fetchContestDetail,
	fetchContestEntriesJudge,
	fetchContestEntriesContestants,
	doUpdateEntryDraft
})(ContestEntryDetail)