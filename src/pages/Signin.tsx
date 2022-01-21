import { parse as parseQueryString } from 'querystring'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { loginUser, logoutUser } from '../actions/authenticate'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { State as AuthenticateState } from '../reducers/authenticate'
import { RootState } from '../reducers/index'

interface SigninProps extends RouteComponentProps<any> {
	authenticateState: AuthenticateState
	loginUser: any
	logoutUser: any
}

interface SigninState {
	email: string
	password: string
	isValid: boolean
	isLoading: boolean
	loginStatus: ActionTypeStates
}

class Signin extends React.Component<SigninProps, SigninState> {
	public constructor(props: SigninProps) {
		super(props)

		this.state = {
			email: '',
			password: '',
			isValid: false,
			isLoading: false,
			loginStatus: null
		}
	}
	
	public componentDidMount() {
		const {authenticateState} = this.props
		if (authenticateState.user) { this.props.history.push('/') }
	}
	
	public componentWillReceiveProps(nextProps: Readonly<SigninProps>) {
		const {authenticateState} = this.props
		if (authenticateState.user) { this.props.history.push('/') }
	}
	
	public render() {
		const {isLoading, loginStatus} = this.state
		const {authenticateState} = this.props
		
		return (
			<div>
				<Helmet>
					<title>Sign into Hubbers CMS</title>
				</Helmet>
				<div className="app flex-row align-items-center">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-5">
								<div className="card-group mb-0">
									<div className="card p-2">
										{
											loginStatus === ActionTypeStates.FAILED && (
												<div className="signin-section__error">
													Please Enter Correct Email Address and Password
												</div>
											)
										}
										{
											(!authenticateState.user && isLoading) && (
												<div className="signin-section__progress">
													<span className="signin-section__progress__label">Signing In</span>
													<Spinner name="three-dots" fadeIn="none" color="#76AB17"/>
												</div>
											)
										}
										{
											(!authenticateState.user && !isLoading) && (
												<div className="card-block">
													<h2>Hubbers CMS</h2>
													<p className="text-muted">Sign In to your account</p>
													<form onSubmit={() => {
														this.submitForm()
													}}>
														<div className="input-group mb-1">
															<span className="input-group-addon"><i className="icon-user"></i></span>
															<Input
																name="email"
																placeholder="Your e-mail"
																value={this.state.email}
																type={InputType.EMAIL}
																onChange={(email: string) => {
																	this.validateForm({email})
																}}
																onFocusLost={() => {
																	this.validateForm({})
																}}/>
														</div>
														<div className="input-group mb-2">
															<span className="input-group-addon"><i className="icon-lock"></i></span>
															<Input
																name="password"
																placeholder="Your password"
																value={this.state.password}
																type={InputType.PASSWORD}
																onChange={(password: string) => {
																	this.validateForm({password})
																}}
																onFocusLost={() => {
																	this.validateForm({})
																}}/>
														</div>
														<div className="row">
															<div className="col-6">
																<button type="button" className="btn btn-primary px-2"
																	onClick={() => {this.submitForm()}}>Login
																</button>
															</div>
														</div>
													</form>
												</div>
											)
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	private validateForm(modifiedState?: any) {
		const {email, password} = this.state
		this.setState({...this.state, ...modifiedState, isValid: (email && password)})
	}

	private submitForm() {
		if (this.state.isValid) {
			this.setState({isLoading: true})

			const params = parseQueryString(window.location.search.replace('?', ''))
			this.props.loginUser(this.state.email, this.state.password, params.redirect)
				.then(() => {
					this.setState({loginStatus: ActionTypeStates.SUCCESS, isLoading: false})
					this.props.history.push('/')
				}).catch(() => this.setState({loginStatus: ActionTypeStates.FAILED, isLoading: false}))
		}
	}
}

const mapStateToProps = (state: RootState) => ({
	authenticateState: state.authenticate
})
export default connect(mapStateToProps, {
	loginUser,
	logoutUser
})(Signin)