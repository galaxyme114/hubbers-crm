import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'

import { Currency, InputType } from '../constants/enums'
import { TransactionRecord } from '../constants/models'

import { doAddUserTransactions } from '../actions/usersList'
import Checkbox from '../components/Checkbox'
import Input from '../components/Input'
import {
	currencySelectOption,
	getUsersSelectOptions,
	transactionStatusSelectOptions,
	transactionTypeSelectOptions
} from '../constants/selectOptions'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'

interface AddTransactionMatchParams {
	userId: string
}

interface AddTransactionProps extends RouteComponentProps<AddTransactionMatchParams> {}

interface AddTransactionState extends Partial<TransactionRecord> {
	openConfirmModal: boolean
	isTransactionValid: boolean
}

class AddTransaction extends React.Component<AddTransactionProps, AddTransactionState> {
	constructor(props: AddTransactionProps) {
		super(props)
		
		this.state = {
			openConfirmModal: false,
			isTransactionValid: false,
			amount: 500,
			currency: Currency.HBS,
			usdAmount: 1,
			type: 'token-purchase',
			status: 'PENDING',
			silent: true
		}
		
		this.openConfirmModal = this.openConfirmModal.bind(this)
	}
	
	public openConfirmModal() {
		this.setState({
			openConfirmModal: true
		})
	}
	
	public render() {
		const {isTransactionValid} = this.state
		
		return (
			<div className="app">
				<Helmet>
					<title>Transactions</title>
				</Helmet>
				<Header />
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								<BreadcrumbItem><Link to={`/users/${this.props.match.params.userId}/edit`}>Edit User</Link></BreadcrumbItem>
								<BreadcrumbItem active>Add Transaction</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"/> Add Transaction
											</div>
											<div className="card-block">
												<div className="row">
													<div className="col-md-12">
														<div className="form-group mb-1">
															<label>User</label>
															<Input
																name="userId"
																value={this.props.match.params.userId}
																type={InputType.ASYNC_SELECT}
																disabled={true}
																options={getUsersSelectOptions}
																simpleValue={true}
																valueKey="_id"
																labelKey="fullName"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group mb-1">
															<label>Amount</label>
															<Input
																name="amount"
																value={this.state.amount}
																type={InputType.TEXT}
																onChange={(amount: number) => { this.validateForm({ amount }) }}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group mb-1">
															<label>Currency</label>
															<Input
																name="currency"
																value={this.state.currency}
																type={InputType.SELECT}
																options={currencySelectOption}
																simpleValue={true}
																onChange={(currency: string) => { this.validateForm({ currency }) }}
															/>
														</div>
													</div>
													<div className="col-md-12">
														<div className="form-group mb-1">
															<label>USD Amount</label>
															<Input
																name="usdAmount"
																value={this.state.usdAmount}
																type={InputType.TEXT}
																onChange={(usdAmount: number) => { this.validateForm({ usdAmount }) }}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group mb-1">
															<label>Type</label>
															<Input
																name="type"
																value={this.state.type}
																type={InputType.SELECT}
																options={transactionTypeSelectOptions}
																simpleValue={true}
																onChange={(type: string) => { this.validateForm({ type }) }}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group mb-1">
															<label>Status</label>
															<Input
																name="status"
																value={this.state.status}
																type={InputType.SELECT}
																options={transactionStatusSelectOptions}
																simpleValue={true}
																onChange={(status: string) => { this.validateForm({ status }) }}
															/>
														</div>
													</div>
													<div className="col-md-12">
														<div className="form-group mb-1">
															<label>Notification</label>
															<Checkbox
																checked={this.state.silent}
																text="Disable notifications for this transaction"
																onChange={(silent: boolean) => { this.validateForm({ silent })}}/>
														</div>
													</div>
													
													{/* Add Button */}
													<div className="col-lg-12 mt-2">
														<div className="form-group mb-1">
															<button
																className="btn btn-primary"
																onClick={() => this.openConfirmModal()}
																disabled={!isTransactionValid}>
																Add Transaction
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<SweetAlert
							show={this.state.openConfirmModal}
							title={'Add Transaction'}
							text={'Are you sure you wish to add a new Transaction ?'}
							showCancelButton
							onConfirm={() => { this.submitForm() }}
							onCancel={() => { this.setState({openConfirmModal: false}) }}
							onEscapeKey={() => this.setState({openConfirmModal: false})}
							onOutsideClick={() => this.setState({openConfirmModal: false})}/>
					</main>
				</div>
			</div>
		)
	}
	
	private validateForm(modifiedState?: any) {
		const newState: AddTransactionState = {...this.state, ...modifiedState}
		
		newState.isTransactionValid = newState.amount > 0
			&& newState.currency !== ''
			&& newState.type !== ''
			&& newState.status !== ''
		
		this.setState(newState)
	}
	
	private submitForm() {
		if (this.state.isTransactionValid) {
			const userId = this.props.match.params.userId
			const { amount, currency, usdAmount, type, status, silent } = this.state
			
			doAddUserTransactions(userId, { amount, currency, usdAmount, type, status, silent })
				.then(() => {
					this.setState({openConfirmModal: false})
					Alert.success('Transaction Added Successfully')
					setTimeout(() => this.props.history.push(`/users/${userId}/edit`), 500)
				}).catch(() => {
				this.setState({openConfirmModal: false})
				Alert.error('Transaction Addition Failed')
			})
		} else {
			this.setState({openConfirmModal: false})
			Alert.error('Transaction Addition Failed')
		}
	}
}

const mapStateToProps = () => ({})
export default connect(mapStateToProps, {})(AddTransaction)