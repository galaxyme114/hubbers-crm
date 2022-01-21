import * as React from 'react'

import { Button } from 'reactstrap'

interface ConformationModelProps {
	userId: number,
	onClose: any,
	deleteUser: any
}

export default class ConformationModel extends React.Component<ConformationModelProps, {}> {

	constructor(props: ConformationModelProps) {
		super(props)
	}

	public render() {
		const {userId} = this.props

		return (

			<div className="modaloverlay">
				<div className="modalpopup">
					<h2>Are you sure?</h2>
					<a className="closebtn" onClick={this.props.onClose}>&times;</a>
					<div className="content">
						Thank to pop me out of that button, but now i'm done so you can close this window.
					</div>
					<div style={{textAlign: 'center'}}>
						<Button className="btn btn-success" onClick={() => {
							this.props.deleteUser(userId)
						}}>Yes</Button>
						<Button className="btn btn-info" onClick={this.props.onClose}>No</Button>
					</div>
				</div>
			</div>
		)
	}
}