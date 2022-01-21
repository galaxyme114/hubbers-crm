import * as React from 'react'
const ReactSpinner = require('react-spinkit')

interface SpinnerProps {
	name: string
	fadeIn: string
	color?: string
}

const Spinner: React.StatelessComponent<SpinnerProps> = (props) => {
	return (
		<ReactSpinner {...props}/>
	)
}

export default Spinner