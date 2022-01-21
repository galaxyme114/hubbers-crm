import * as React from 'react'
import Alert from 'react-s-alert'

interface FooterProps {
}

export default class Footer extends React.Component<FooterProps, {}> {
	public render() {
		return (
			<div>
				{/*<footer className="app-footer">*/}
					{/*<a href="https://hubbers.io">Hubbers</a> &copy; 2018.*/}
					{/*<span className="float-right">Powered by <a href="https://hubbers.io">Hubbers</a></span>*/}
				{/*</footer>*/}
				<Alert stack={{ limit: 1 }}/>
			</div>
		)
	}
}