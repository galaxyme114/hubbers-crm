import * as React from 'react'
import Select, { Async as AsyncSelect } from 'react-select'

import { InputType } from '../constants/enums'

interface InputProps {
	name: string
	placeholder?: string
	prefix?: string
	value?: any
	label?: string
	description?: string
	span?: number
	options?: any
	multi?: boolean
	simpleValue?: boolean
	valueKey?: string
	labelKey?: string
	type: InputType
	onChange?: any
	onFocusLost?: any
	disabled?: boolean
	defaultValue?: any
}

export default class Input extends React.Component<InputProps, {}> {
	public render() {
		const {name,
			placeholder,
			type, value,
			span, label,
			options, labelKey, valueKey,
			multi, simpleValue,
			description,
			disabled,
			defaultValue} = this.props

		return (
			<div className={'input ' + (span ? 'span-' + span : 'span-1')}>
				{
					label && <label>{label}</label>
				}
				{
					description && <small>{description}</small>
				}
				{
					type === InputType.TEXTAREA && (
						<textarea
							className="form-control"
							name={name}
							placeholder={placeholder}
							value={value ? value : ''}
							onChange={(e: any) => {
								if (this.props.onChange) {
									this.props.onChange(e.target.value)
								}
							}}
							onBlur={() => {
								if (this.props.onFocusLost) {
									this.props.onFocusLost()
								}
							}}/>
					)
				}
				{
					(type === InputType.TEXT || type === InputType.EMAIL || type === InputType.DATE || type === InputType.TIME ||
						type === InputType.NUMBER || type === InputType.PASSWORD) && (
						<input
							className="form-control"
							name={name}
							readOnly={disabled}
							placeholder={placeholder}
							type={type}
							value={value}
							defaultValue={defaultValue}
							onChange={(e: any) => {
								if (this.props.onChange) {
									this.props.onChange(e.target.value)
								}
							}}
							onBlur={() => {
								if (this.props.onFocusLost) {
									this.props.onFocusLost()
								}
							}}/>
					)
				}
				{
					(type === InputType.SELECT && options) && (
						<Select
							name={name}
							value={value}
							placeholder={placeholder}
							options={options}
							valueKey={valueKey || 'value'}
							labelKey={labelKey || 'label'}
							multi={multi}
							simpleValue={simpleValue}
							disabled={disabled}
							onChange={(o: any) => {
								if (this.props.onChange) {
									this.props.onChange(o)
								}
								setTimeout(() => {
									if (this.props.onFocusLost) {
										this.props.onFocusLost()
									}
								}, 250)
							}}/>
					)
				}
				{
					(type === InputType.ASYNC_SELECT && options) && (
						<AsyncSelect
							name={name}
							value={value}
							placeholder={placeholder}
							autoload
							loadOptions={options}
							valueKey={valueKey || '_id'}
							labelKey={labelKey || 'name'}
							multi={multi}
							simpleValue={simpleValue}
							disabled={disabled}
							onChange={(o: any) => {
								if (this.props.onChange) {
									this.props.onChange(o)
								}
								setTimeout(() => {
									if (this.props.onFocusLost) {
										this.props.onFocusLost()
									}
								}, 250)
							}}/>
					)
				}
			</div>
		)
	}
}