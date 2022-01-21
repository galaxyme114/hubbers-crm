import * as React from 'react'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
}

export default class Sidebar extends React.Component<SidebarProps, {}> {
	public render() {
		return (
			<div className="sidebar">
				<nav className="sidebar-nav">
					<ul className="nav">
						<li className="nav-item">
							<NavLink exact to={'/'} className="nav-link" activeClassName="active"><i className="icon-speedometer"/>
								Dashboard</NavLink>
						</li>
						<li className="divider"/>
						<li className="nav-item">
							<NavLink to={'/users'} className="nav-link" activeClassName="active"><i className="icon-people"/>
								Users
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to={'/investors'} className="nav-link" activeClassName="active"><i className="icon-people"/>
								Investor
							</NavLink>
						</li>
						<li className="divider"/>
						<li className="nav-item">
							<NavLink to={'/contests'} className="nav-link" activeClassName="active"><i className="fa fa-trophy"/>
								Contests</NavLink>
						</li>
						{/* <li className="divider"/>
						<li className="nav-item">
							<NavLink to={'/expertises'} className="nav-link" activeClassName="active"><i className="fa fa-bookmark"/>
								Expertise</NavLink>
						</li>
						<li className="divider"/>
						<li className="nav-item">
							<NavLink to={'/experts'} className="nav-link" activeClassName="active"><i className="fa fa-file"/>
								Expert</NavLink>
						</li> */}
						<li className="divider"/>
						<li className="nav-item">
							<NavLink to={'/pages'} className="nav-link" activeClassName="active"><i className="fa fa-file"/>
								Pages</NavLink>
						</li>
						<li className="divider"/>
						<li className="nav-item">
							<NavLink to={'/projects'} className="nav-link" activeClassName="active"><i className="fa fa-file"/>
								Projects</NavLink>
						</li>
						<li className="divider"/>
						<li className="nav-item">
							<NavLink to={'/posts'} className="nav-link" activeClassName="active"><i className="fa fa-file"/>
								Post</NavLink>
						</li>
						<li className="divider"/>
						<li className="nav-item">
							<NavLink to={'/communities'} className="nav-link" activeClassName="active"><i className="fa fa-file"/>
							Community</NavLink>
						</li>
						<li className="divider"/>
						<li className="nav-item">
							<NavLink to={'/events'} className="nav-link" activeClassName="active"><i className="fa fa-file"/>
								Events</NavLink>
						</li>
						<li className="divider"/>
					</ul>
				</nav>
			</div>
		)
	}
}