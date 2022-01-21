import * as React from 'react'
import { connect } from 'react-redux'

import { RootState } from '../reducers/index'

import { State as AuthenticateUserState } from '../reducers/authenticate'

import { authenticateUser } from '../actions/authenticate'

interface AppProps {
	authenticateState: AuthenticateUserState
	authenticateUser: any
}

class App extends React.Component<AppProps, {}> {
	public componentDidMount() {
		// Check if the user is authenticated
		this.props.authenticateUser()
	}

	public render() {
		return this.props.children
	}
}

const mapStateToProps = (state: RootState) => ({
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	authenticateUser
})(App)