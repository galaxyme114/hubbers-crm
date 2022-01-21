import * as React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authenticate'
import { RootState } from '../reducers'
import { State as AuthenticateState } from '../reducers/authenticate'

interface HeaderProps {
	authenticateState: AuthenticateState
	logoutUser: any
}

interface HeaderState {
}

class Header extends React.Component<HeaderProps, HeaderState> {
	constructor(props: HeaderProps) {
		super(props)
		this.state = {
		}
	}

	public mobileSidebarToggle(e: any) {
		e.preventDefault()
		document.body.classList.toggle('sidebar-mobile-show')
	}
	public render() {
		const {authenticateState} = this.props
		return (
			// <header className="app-header">
			// 	<div className="app-header__brand"><img src="/images/favicon.png" alt="HBB"/></div>
			// 	<div className="app-header__footer">
			// 		<div className="app-header__footer__item" onClick={() => this.props.logoutUser()}>
			// 			<i className="fa fa-power-off"/>
			// 		</div>
			// 	</div>
			// </header>

			<header className="app-header navbar">
				<button
					className="navbar-toggler mobile-sidebar-toggler hidden-lg-up"
					onClick={this.mobileSidebarToggle}
					type="button">&#9776;</button>
				<a className="navbar-brand"/>
				<ul className="nav navbar-nav ml-auto">
					{
						authenticateState.user && (
							<li className="nav-item">
								<a className="nav-link navbar-logout" onClick={() => this.props.logoutUser()}>
									<i className="fa fa-power-off"/>
								</a>
							</li>
						)
					}
				</ul>
			</header>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	logoutUser
})(Header)