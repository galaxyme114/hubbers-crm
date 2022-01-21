import * as React from 'react'

export interface SwitchProps {
	checked: boolean
	onChange: any
}

const Switch: React.StatelessComponent<SwitchProps> = ({checked, onChange}) => {
	return (
		<div className="input span-1">
			<label className="switch" onClick={(e: any) => {
				e.preventDefault()
				onChange(!checked)
			}}>
				<input type="checkbox" checked={checked} readOnly={true}/>
				<span className="switch-slider round"/>
			</label>
		</div>
	)
}

export default Switch