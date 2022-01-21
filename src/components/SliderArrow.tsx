import * as React from 'react'

const SliderArrow: React.StatelessComponent<any> = (props) => {
	return (
		<span className={'icon icon-' + props.name} {...props}/>
	)
}

export default SliderArrow