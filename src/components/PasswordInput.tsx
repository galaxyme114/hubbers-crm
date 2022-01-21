import * as React from 'react'

import { PasswordInputType } from '../constants/enums'
import { passwordValidation } from '../utils/validation'

interface PasswordInputProps {
	name: string
	placeholder: string
	label?: string
	value: string
	type: PasswordInputType
	onChange: any
	isValid?: boolean
}

export default class PasswordInput extends React.Component<PasswordInputProps, {}> {
	public render() {
		const {name, placeholder, type, value, label, isValid} = this.props
		const passwordStrength = passwordValidation(value, value)

		return (
			<div className="password-input">
				{
					label && <label>{label}</label>
				}
				<input
					className="form-input"
					name={name}
					placeholder={placeholder}
					type="password"
					value={value}
					onChange={(e: any) => {
						this.props.onChange(e.target.value)
					}}/>
				<div className={'password-input__strength password-input__strength--' +
				((type === PasswordInputType.MATCH) ? 'match' : 'validate') + ' ' +
				'password-input__strength--' + passwordStrength + ' ' +
				((value.length > 0 && isValid) ? 'password-input__strength--valid' : '')}>
					<div className="password-input__strength__item"/>
					<div className="password-input__strength__item"/>
					<div className="password-input__strength__item"/>
					<div className="password-input__strength__item"/>
				</div>
			</div>
		)
	}
}