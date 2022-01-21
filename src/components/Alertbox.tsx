// import * as React from 'react'
// import Select, { Async as AsyncSelect } from 'react-select'

// import { InputType } from '../constants/enums'
// import { Col,Button } from 'reactstrap';

// interface AlertboxProps {
// 	confirm: any,
// 	cancel: any,
// 	show: boolean
// }

// export default class AlertboxModel extends React.Component<AlertboxProps, {}> {

// 	constructor(props :AlertboxProps){
// 		super(props)

// 	}
// 	public render() {
// 		const{show} =this.props;

// 		return (
// 			<div>
// 			<button
// 			  onClick={() => this.setState({ show: true })}
// 			>
// 			  Alert
// 			</button>
// 			<SweetAlert
// 			  show={this.props.show}
// 			  title="Demo Complex"
// 			  text="SweetAlert in React"
// 			  showCancelButton
// 			  onConfirm={() => {
// 				console.log('confirm');
// 				this.setState({ show: false });
// 			  }}
// 			  onCancel={() => {
// 				console.log('cancel');
// 				this.setState({ show: false });
// 			  }}
// 			  onEscapeKey={() => this.setState({ show: false })}
// 			  onOutsideClick={() => this.setState({ show: false })}
// 			/>

// 		  </div>

// 		)
// 	}
// }