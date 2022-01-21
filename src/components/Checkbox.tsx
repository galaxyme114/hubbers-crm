import * as React from 'react'

export interface CheckboxProps {
	text: string
	checked: boolean
	onChange: any
}

const Checkbox: React.StatelessComponent<CheckboxProps> = ({text, checked, onChange}) => {
	return (
		<div className="checkbox-input" onClick={() => { onChange() }}>
			<label className="checkbox_label">
				<input type="checkbox" checked={checked} readOnly={true}/>
				<span className="checkbox_label_checkmark"/>
			</label>
			<span className="checkbox-input__text">{text}</span>
		</div>
	)
}

export default Checkbox