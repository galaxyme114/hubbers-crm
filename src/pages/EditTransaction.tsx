import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import SweetAlert from 'sweetalert-react'

import { InputType } from '../constants/enums'
import { TransactionRecord } from '../constants/models'

import { doUpdateTransactionDetail } from '../actions/transactions'
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

import { fetchTransactionDetail } from '../actions/transactions'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { RootState } from '../reducers'
import { State as TransactionDetailState } from '../reducers/transactionDetail'

interface EditTransactionMatchParams {
	id: string
}

interface EditTransactionProps extends RouteComponentProps<EditTransactionMatchParams> {
	state: TransactionDetailState
	fetchTransactionDetail: any
	doUpdateTransactionDetail: any
}

interface EditTransactionState {
	transactionDetail: TransactionRecord
	openConfirmModal: boolean
	isTransactionValid: boolean
}

class EditTransaction extends React.Component<EditTransactionProps, EditTransactionState> {
	constructor(props: EditTransactionProps) {
		super(props)
		
		this.state = {
			transactionDetail: null,
			openConfirmModal: false,
			isTransactionValid: false
		}
		
		this.openConfirmModal = this.openConfirmModal.bind(this)
	}
	
	public componentDidMount() {
		const transactionId = this.props.match.params.id
		this.props.fetchTransactionDetail(transactionId)
	}
	
	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.state.transaction) {
			this.setState({ transactionDetail: nextProps.state.transaction })
		}
	}
	
	public openConfirmModal() {
		this.setState({
			openConfirmModal: true
		})
	}
	
	public render() {
		const { state } = this.props
		const { transactionDetail, isTransactionValid } = this.state
		
		return (
			<div className="app">
				<Helmet>
					<title>Transactions</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<div>
							<Breadcrumb className="mb-0">
								<BreadcrumbItem><Link to={'/'}>Home</Link></BreadcrumbItem>
								{
									transactionDetail &&
										<BreadcrumbItem>
											<Link to={`/users/${transactionDetail.userId}/edit`}>Edit User</Link>
										</BreadcrumbItem>
								}
								<BreadcrumbItem active>Edit Transaction</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<div className="container-fluid">
							<div className="animated fadeIn">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-header">
												<i className="fa fa-align-justify"/> Edit Transaction
											</div>
											<div className="card-block">
												{
													(state.status === ActionTypeStates.INPROGRESS || !transactionDetail) &&
														<div className="spinner-wrap"><Spinner name="three-dots" fadeIn="none"/></div>
												}
												{
													(state.status !== ActionTypeStates.INPROGRESS && transactionDetail) && (
														<div className="row">
															<div className="col-md-12">
																<div className="form-group mb-1">
																	<label>User</label>
																	<Input
																		name="userId"
																		value={transactionDetail.userId}
																		type={InputType.ASYNC_SELECT}
																		disabled={true}
																		options={getUsersSelectOptions}
																		simpleValue={true}
																		valueKey="id"
																		labelKey="full_name"
																	/>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group mb-1">
																	<label>Amount</label>
																	<Input
																		name="amount"
																		value={transactionDetail.amount}
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
																		value={transactionDetail.currency}
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
																		value={transactionDetail.usdAmount}
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
																		value={transactionDetail.type}
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
																		value={transactionDetail.status}
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
																		checked={transactionDetail.silent}
																		text="Disable notifications for this transaction"
																		onChange={(silent: boolean) => { this.validateForm({ silent })}}/>
																</div>
															</div>
															
															{/* Update Button */}
															<div className="col-lg-12 mt-2">
																<div className="form-group mb-1">
																	<button
																		className="btn btn-primary"
																		onClick={() => this.openConfirmModal()}
																		disabled={!isTransactionValid}>
																		Update Transaction
																	</button>
																</div>
															</div>
														</div>
													)
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<SweetAlert
							show={this.state.openConfirmModal}
							title={'Update Transaction'}
							text={'Are you sure you wish to update this Transaction ?'}
							showCancelButton
							onConfirm={() => { this.submitForm() }}
							onCancel={() => { this.setState({openConfirmModal: false}) }}
							onEscapeKey={() => this.setState({openConfirmModal: false})}
							onOutsideClick={() => this.setState({openConfirmModal: false})}/>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}
	
	private validateForm(modifiedState?: any) {
		const newState: TransactionRecord = {...this.state.transactionDetail, ...modifiedState}
		
		const isTransactionValid = newState.amount > 0
			&& newState.currency !== ''
			&& newState.type !== ''
			&& newState.status !== ''
		
		this.setState({ isTransactionValid, transactionDetail: newState })
	}
	
	private submitForm() {
		if (this.state.isTransactionValid && this.state.transactionDetail) {
			const { userId, amount, usdAmount, currency, type, status, silent } = this.state.transactionDetail
			const transactionId = this.props.match.params.id
			
			doUpdateTransactionDetail(transactionId, { userId, amount, currency, usdAmount, type, status, silent })
				.then(() => {
					this.setState({openConfirmModal: false})
					Alert.success('Transaction Updated Successfully')
				}).catch(() => {
				this.setState({openConfirmModal: false})
				Alert.error('Transaction Update Failed')
			})
		} else {
			this.setState({openConfirmModal: false})
			Alert.error('Transaction Update Failed')
		}
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.transactionDetail
})
export default connect(mapStateToProps, {
	fetchTransactionDetail
})(EditTransaction)