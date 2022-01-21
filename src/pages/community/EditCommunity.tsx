import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import { ActionTypeStates } from '../../constants/action-types'
import Input from '../../components/Input'
import { InputType } from '../../constants/enums'
import Footer from '../../containers/Footer'
import Header from '../../containers/Header'
import Sidebar from '../../containers/Sidebar'
import { State as CommunityDetailState } from '../../reducers/communityDetail'
import { RootState } from '../../reducers/index'
import Alert from 'react-s-alert'
import { countries } from '../../constants/selectOptions'
import {fetchCommunityDetail, updateCommunityDetail} from '../../actions/community'
import { CommunityRecord } from '../../constants/models'
import UserThumbnailUpload from '../../components/UserThumbnailUpload'
import Spinner from '../../components/Spinner'
import { getUsersSelectOptions } from '../../constants/selectOptions'
import * as TagsInput from 'react-tagsinput'
interface EditPostMatchParams {
	id: string
}

interface EditCommunityProps extends RouteComponentProps<EditPostMatchParams> {
	state: CommunityDetailState
	fetchCommunityDetail: any
	updateCommunityDetail:any
}
 interface EditCommunityState {
    openAddModel: boolean
    isUpdateCommunity: ActionTypeStates
	communityDetail: CommunityRecord
	tags: any
	socialTags: any
	selectedCommunityId: any
	tag: string
	socialTag: string
	partnerstr: string
}

class EditCommunity extends React.Component<EditCommunityProps, EditCommunityState> {
	constructor(props: EditCommunityProps) {
		super(props)
		this.state = {
			selectedCommunityId: null,
			communityDetail: null,
			openAddModel: false,
            isUpdateCommunity: null,
			socialTags: [],
			socialTag: '',
			tags: [],
			tag: '',
			partnerstr: ''
		}

		this.openAddCommunityConfirmModal = this.openAddCommunityConfirmModal.bind(this)
	}

	public openAddCommunityConfirmModal() {
		this.setState({
			openAddModel: true
		})
	}

	public componentDidMount() {
		const communityId = this.props.match.params.id
		this.setState({
			selectedCommunityId: communityId
		});
		this.props.fetchCommunityDetail(communityId)
	}

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state) {
			this.setState({
				communityDetail: nextProps.state.communityDetail,
			}, () => {
				
				if (this.state.communityDetail !== null) {
					if (this.state.communityDetail.socialMediaTags.length > 0) {
						var mediaTeg: any = this.state.communityDetail.socialMediaTags;
						// const mediaTegArr = mediaTeg.split(',');
						this.setState({
							socialTags: mediaTeg
						})
					}
					if (this.state.communityDetail.tags.length > 0) {
						var tagArr: any = this.state.communityDetail.tags;
						// const tagsList = tags.split(',');
						this.setState({
							tags: tagArr
						})
					}
					if (this.state.communityDetail.partners) {
						if (this.state.communityDetail.partners.length > 0) {
							this.setState({
								partnerstr: this.state.communityDetail.partners.toString()
							})
						}
					}
				}
			})
			
		}

	}
	public goBack = () => {
		this.props.history.goBack();
    }
	public render() {
		const {state} = this.props
		const {communityDetail, isUpdateCommunity} = this.state
		return (
			<div className="app">
				<Helmet>
					<title>EditCommunity</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Edit Community</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid editpage_page">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i> Edit Community
												<button onClick={() => this.goBack()} className="btn btn-primary pull-right backnewbtn">Back to Community</button>
											</div>
											<div className="card-block">
												{
													state.status === ActionTypeStates.INPROGRESS && (
														<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
													)
												}
												{
													isUpdateCommunity === ActionTypeStates.FAILED && (
														<div className="alert alert-danger">
															Something went wrong
														</div>
													)
												}
												{
													(state.status === ActionTypeStates.SUCCESS) && communityDetail &&
													<div className="row">
														<div className="col-lg-8">
															<div className="row">
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>ShortId</label>
																		<Input
																			name="shortId"
																			placeholder="Enter ShortId"
																			value={communityDetail.shortId}
																			type={InputType.TEXT}
																			onChange={(value: any) => {
																				this.UpdateCommunity('shortId', value)
																			}}
																			disabled={true}
																		/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Community Name</label>
																		<Input
																			name="name"
																			placeholder="Enter Name"
																			value={communityDetail.name}
																			type={InputType.TEXT}
																			onChange={(value: any) => {
																				this.UpdateCommunity('name', value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Country</label>
																		<Input
																		name="country"
																		value={communityDetail.country}
																		type={InputType.SELECT}
																		placeholder="Country"
																		options={countries}
																		multi={false}
																		simpleValue={true}
																		onChange={(value: any) => {
																			this.UpdateCommunity('country', value)
																		}}
																	/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>City</label>
																		<Input
																			name="city"
																			placeholder="Enter City"
																			value={communityDetail.city}
																			type={InputType.TEXT}
																			onChange={(value: any) => {
																				this.UpdateCommunity('city', value)
																			}}
																		/>
																	</div>
																</div>
																{/* <div className="col-lg-6">
                                                                	<div className="form-group mb-1">
																		<label>Facilitators</label>
																		<Input
																			name="facilitators"
																			placeholder="Choose facilitators"
																			value={communityDetail.facilitators}
																			disabled={false}
																			type={InputType.ASYNC_SELECT}
																			options={getUsersSelectOptions}
																			onChange={(value: any) => {
																				this.UpdateCommunity('facilitators', value)
																			}}
																			simpleValue={true}
																			valueKey="_id"
																			labelKey="fullName"
																		/>
																	</div>
																</div> */}
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Consultants</label>
																		<Input
																			name="numConsultants"
																			placeholder="Enter Num Consultants"
																			value={communityDetail.numConsultants}
																			type={InputType.TEXT}
																			onChange={(value: any) => {
																				this.UpdateCommunity('numConsultants', value)
																			}}
																		/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Social Media</label>
																		<TagsInput value={this.state.socialTags} onChange={this.handleChangeSocial.bind(this)} inputValue={this.state.socialTag} onChangeInput={this.handleChangeInputSocial.bind(this)}/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Partners</label>
																		<Input
																			name="partners"
																			placeholder="Enter Partners"
																			value={this.state.partnerstr}
																			type={InputType.TEXT}
																			onChange={(value: any) => {
																				this.setState({
																					partnerstr: value
																				})
																				// this.UpdateCommunity('partners', value)
																			}}                                                                    
																		/>
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="form-group mb-1">
																		<label>Tags</label>
																		<TagsInput value={this.state.tags} onChange={this.handleChange.bind(this)} inputValue={this.state.tag} onChangeInput={this.handleChangeInput.bind(this)}/>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-4">
															<div className="update_user_thumbnail">
																<UserThumbnailUpload
																	autoUpload={true}
																	thumbnailImageUrl={communityDetail.featuredImageUrl}
																	onUpload={(featuredImageUrl: string) => {
																		this.UpdateCommunity('featuredImageUrl', featuredImageUrl)
																	}}/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-1">
																<button className="btn btn-primary" onClick={() => this.openAddCommunityConfirmModal()}
																>Update Community
																</button>
															</div>
														</div>
													</div>
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
                        <SweetAlert
							show={this.state.openAddModel}
							title="Community Update"
							text="Are you sure you want to Update Community"
							showCancelButton
							onConfirm={() => { this.doUpdateCommunityDetail()
								this.setState({openAddModel: false}) }}
							onCancel={() => { this.setState({ openAddModel: false }) }}
							onEscapeKey={() => this.setState({ openAddModel: false })}
							onOutsideClick={() => this.setState({ openAddModel: false })}
						/>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}

	private UpdateCommunity(key: string, value: any) {

		const communityDetail: any = {...this.state.communityDetail}
		communityDetail[key] = value

		this.setState({communityDetail})

	}
	private handleChangeSocial(tags: any) {
        this.setState({socialTags: tags})
        // console.log(tags)
    }
     
    private handleChangeInputSocial(tag: string) {
        // console.log(tag)
        this.setState({socialTag: tag})
    }
	private handleChange(tags: any) {
        this.setState({tags: tags})
        // console.log(tags)
    }
     
    private handleChangeInput(tag: string) {
        // console.log(tag)
        this.setState({tag: tag})
    }
	private doUpdateCommunityDetail() {
		this.setState({
            openAddModel: false,
		});
		let partnerString: string[];
        if (this.state.partnerstr !== '') {
			partnerString = this.state.partnerstr.split(',')
		}
		const Community = {
			'name': this.state.communityDetail.name,
			'country': this.state.communityDetail.country,
            'city': this.state.communityDetail.city,
            'facilitators': this.state.communityDetail.facilitators,
			'featuredImageUrl': this.state.communityDetail.featuredImageUrl,
			'numConsultants': this.state.communityDetail.numConsultants,
			'socialMediaTags': this.state.socialTags,
            'partners': this.state.partnerstr ? partnerString : [],
            'tags': this.state.tags
		}
		this.props.updateCommunityDetail(this.state.selectedCommunityId, Community).then(() => {
				
			if (ActionTypeStates.SUCCESS) {
				this.setState({
					isUpdateCommunity: ActionTypeStates.SUCCESS
				})
				Alert.success('Community Updated Successfully',{position: 'bottom-right', timeout: 3000})
			}	 	
			
		}).catch(() => {
			this.setState({isUpdateCommunity: ActionTypeStates.FAILED})
			Alert.error('Something Went Wrong',{position: 'bottom-right', timeout: 3000})			
		})
	}

}


const mapStateToProps = (state: RootState) => ({
	state: state.CommunityDetail
})
export default connect(mapStateToProps, {
	fetchCommunityDetail,
	updateCommunityDetail
})(EditCommunity)