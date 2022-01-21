import * as React from 'react'

export interface IconProps {
	name: string
	active?: boolean
}

const Icon: React.StatelessComponent<IconProps> = ({name, active}) => {
	return (
		<span className={'icon icon-' + name + ' ' + (active ? 'active' : '')}/>
	)
}

export default Icon