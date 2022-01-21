import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'

interface DashboardProps {
	id: number
}

export default class Dashboard extends React.Component<DashboardProps, {}> {
	public render() {
		return (
			<div>
				<Helmet>
					<title>Dashboard</title>
				</Helmet>
				<Header/>
				<div className="app-body">
					<Sidebar/>
					<main className="main">
						<Breadcrumb>
							<BreadcrumbItem active>Dashboard</BreadcrumbItem>
						</Breadcrumb>
					</main>
				</div>
				<Footer/>
			</div>
		)
	}
}