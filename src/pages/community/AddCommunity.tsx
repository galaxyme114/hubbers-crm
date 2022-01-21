import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import Input from '../../components/Input'
import { ActionTypeStates } from '../../constants/action-types'
import { InputType } from '../../constants/enums'
import Footer from '../../containers/Footer'
import Header from '../../containers/Header'
import Sidebar from '../../containers/Sidebar'
import { RootState } from '../../reducers/index'
import { CommunityRecord } from '../../constants/models'
import { doAddCommunity } from '../../actions/community'
import { countries } from '../../constants/selectOptions'
import { getUsersSelectOptions } from '../../constants/selectOptions'
import UserThumbnailUpload from '../../components/UserThumbnailUpload'
import * as TagsInput from 'react-tagsinput'
interface AddCommunityProps {
	doAddCommunity: any
	history: any
}
export interface AddCommunityState extends Partial<CommunityRecord> {
    openAddModel: boolean,
    isCreateCommunity: ActionTypeStates,
    tags: any,
    socialTags: any,
    tag: string,
    socialTag: string,
    facilitatorstr: string,
    partnerstr: string
   }

class AddCommunity extends React.Component<AddCommunityProps, AddCommunityState> {
	constructor(props: AddCommunityProps) {
		super(props)
		this.state = {
            name: '',
			shortId: '',
			country: '',
            city: '',
            facilitatorstr: '',
			featuredImageUrl: '',
			numConsultants: '',
			socialMediaTags: [],
            partnerstr: '',
            facilitators: [],
            isCreateCommunity: null,
            openAddModel: null,
            tags: [],
            socialTags: [],
            tag: '',
            socialTag: ''
        }
	}

	public openAddCommunityConfirmModal() {

		this.setState({
			openAddModel: true
		})

    }
    public goBack = () => {
        this.props.history.goBack();
    }
	public render() {
		return (
			<div className="app">
				<Helmet>
					<title>Add Community</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb>
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem active>Add Community</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid editpage_page">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"></i> Add Community
												<button onClick={() => this.goBack()} className="btn btn-primary pull-right backnewbtn">Back to Community</button>
											</div>
											<div className="card-block">
                                                <div className="row">
                                                    <div className="col-lg-8">
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <div className="form-group mb-1">
                                                                    <label>Community Name</label>
                                                                    <Input
                                                                        name="name"
                                                                        placeholder="Enter Name"
                                                                        value={this.state.name}
                                                                        type={InputType.TEXT}
                                                                        onChange={(name: string) => {
                                                                            this.setState({name})
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="form-group mb-1">
                                                                    <label>Country</label>
                                                                    <Input
                                                                        name="country"
                                                                        value={this.state.country}
                                                                        type={InputType.SELECT}
                                                                        placeholder="Country"
                                                                        options={countries}
                                                                        multi={false}
                                                                        simpleValue={true}
                                                                        onChange={(country: any) => {
                                                                            this.setState({country})
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
                                                                        value={this.state.city}
                                                                        type={InputType.TEXT}
                                                                        onChange={(city: string) => {
                                                                            this.setState({city})
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="form-group mb-1">
                                                                    <label>Facilitators</label>
                                                                    <Input
                                                                        name="facilitators"
                                                                        placeholder="Choose facilitators"
                                                                        value={this.state.facilitatorstr}
                                                                        disabled={false}
                                                                        type={InputType.ASYNC_SELECT}
                                                                        options={getUsersSelectOptions}
                                                                        onChange={(facilitatorstr: any) => {
                                                                            this.setState({facilitatorstr})
                                                                        }}
                                                                        multi={true}
                                                                        simpleValue={true}
                                                                        valueKey="_id"
                                                                        labelKey="fullName"
                                                                    />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-lg-6">
                                                                <div className="form-group mb-1">
                                                                    <label>Consultants</label>
                                                                    <Input
                                                                        name="numConsultants"
                                                                        placeholder="Enter Num Consultants"
                                                                        value={this.state.numConsultants}
                                                                        type={InputType.TEXT}
                                                                        onChange={(numConsultants: string) => {
                                                                            this.setState({numConsultants})
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="form-group mb-1">
                                                                    <label>Social Media Tags</label>
                                                                    <TagsInput value={this.state.socialTags} onChange={this.handleChangeSocial.bind(this)} inputValue={this.state.socialTag} onChangeInput={this.handleChangeInputSocial.bind(this)} />
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
                                                                        onChange={(partnerstr: any) => {
                                                                            this.setState({partnerstr})
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
                                                                thumbnailImageUrl={this.state.featuredImageUrl}
                                                                onUpload={(featuredImageUrl: string) => {
                                                                    this.setState({featuredImageUrl})
                                                                }}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-1">
                                                            <button className="btn btn-primary" onClick={() => this.openAddCommunityConfirmModal()}
                                                            >Create Community
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
                        <SweetAlert
							show={this.state.openAddModel}
							title="Community Add"
							text="Are you sure you want to Add Community"
							showCancelButton
							onConfirm={() => { this.doAddCommunityDetail() }}
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
    private handleChange(tags: any) {
        this.setState({tags: tags})
    }
     
    private handleChangeInput(tag: string) {
        this.setState({tag: tag})
    }
    
    private handleChangeSocial(tags: any) {
        this.setState({socialTags: tags})
    }
     
    private handleChangeInputSocial(tag: string) {
        this.setState({socialTag: tag})
    }

    private doAddCommunityDetail() {
        this.setState({
            openAddModel: false,
        });
        let facilitatorString: string[];
        if (this.state.facilitatorstr !== '') {
			facilitatorString = this.state.facilitatorstr.split(',')
		}
        const userfacilitators = {
            availability: 'yes',
            user: facilitatorString
        }
        let partnerString: string[];
        if (this.state.partnerstr !== '') {
			partnerString = this.state.partnerstr.split(',')
		}
        const Community = {  
            "socialMediaTags": this.state.socialTags,
            "tags": this.state.tags,
            "partners": this.state.partnerstr ? partnerString : [],
            "name": this.state.name,
            "country": this.state.country,
            "city": this.state.city,
            "featuredImageUrl": this.state.featuredImageUrl,
            "numConsultants": this.state.numConsultants,
            "facilitators": this.state.facilitatorstr ? [userfacilitators] : this.state.facilitators
        }
        console.log(Community);
		// doAddCommunity(Community).then(() => {
		// 	this.setState({
        //         name: '',
		// 		isCreateCommunity: ActionTypeStates.SUCCESS,
        //         shortId: '',
        //         country: '',
        //         city: '',
        //         facilitators: [],
        //         featuredImageUrl: '',
        //         numConsultants: '',
        //         socialMediaTags: [],
        //         partners: [],
        //         tags: [],
		// 	})
		// 	this.props.history.push(`/communities`)
			
        // })
        // .catch(() => {
		// 	this.setState({ isCreateCommunity: ActionTypeStates.FAILED})
		// })
    }
}

const mapStateToProps = (state: RootState) => ({})

export default connect(mapStateToProps, {
	doAddCommunity
})(AddCommunity)
															