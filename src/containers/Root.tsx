//import createHistory from 'history/createBrowserHistory'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer, RootState } from '../reducers'
import App from './App'
import AddContest from '../pages/AddContest'
import AddExpert from '../pages/AddExpert'
import AddExpertise from '../pages/AddExpertise'
import AddExpertiseReview from '../pages/AddExpertiseReview'
import AddPage from '../pages/Addpage'
import AddPost from '../pages/AddPost'
import AddProjects from '../pages/AddProjects'
import AddTransaction from '../pages/AddTransaction'
import ContestantApplications from '../pages/ContestantApplications'
import ContestEntryDetail from '../pages/ContestEntryDetail'
import Contests from '../pages/Contests'
import Dashboard from '../pages/Dashboard'
import EditContest from '../pages/EditContest'
import EditExpert from '../pages/EditExpert'
import EditExpertise from '../pages/EditExpertise'
import EditExpertiseOrder from '../pages/EditExpertiseOrder'
import EditExpertiseReview from '../pages/EditExpertiseReview'
import EditPage from '../pages/Editpage'
import EditProjects from '../pages/EditProjects'
import EditPost from '../pages/EditPost'
import EditUser from '../pages/EditUser'
import EntriesPage from '../pages/Entries'
import EntriesRatingPage from '../pages/EntriesRating'
import Expert from '../pages/Expert'
import Expertise from '../pages/Expertise'
import JudgeApplications from '../pages/JudgeApplications'
import Pages from '../pages/Pages'
import Post from '../pages/Post'
import Projects from '../pages/Projects'
import Signin from '../pages/Signin'
import UsersPage from '../pages/Users'
import InvestorsPage from '../pages/Investors';
import EditTransaction from '../pages/EditTransaction'
import Header from './Header'
import Footer from './Footer'

import EventList from '../pages/events/EventListPage'
import AddEvent from '../pages/events/AddEvent'
import EditEvent from '../pages/events/EditEvent'
import CommunityPage from '../pages/community/CommunityPage'
import AddCommunity from '../pages/community/AddCommunity'
import EditCommunity from '../pages/community/EditCommunity'
const createHistory = require("history").createBrowserHistory;

const newHistory = createHistory()
const history = createHistory()
const middleware = [thunk, routerMiddleware(history)]

// Scroll to the top of the page when ever the route has changed
history.listen(() => { window.scrollTo(0, 0) })

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
	combineReducers<RootState>({...rootReducer}),
	applyMiddleware(...middleware)
)

const PrivateRoute = ({redirectPath, component: Component, ...rest}: any) => (
	<Route {...rest} render={(props) => {
		if (window.localStorage.fundator_token) {
			return <Component {...props} />
		} else {
			props.history.push(redirectPath || '/signin')
			return null
		}
	}}/>
)

const RegularRoute = ({component: Component, ...rest}: any) => (
	<Route {...rest} render={(props) => <Component {...props} />}/>
)

export default class Root extends React.Component<{}, {}> {
	public render() {
		return (
			<Provider store={store}>
				<App>
					{/*<Header/>*/}
					<ConnectedRouter history={newHistory}>
						<Switch>
							<PrivateRoute exact path="/" component={Dashboard}/>
							<RegularRoute path="/signin" component={Signin}/>
							
							<PrivateRoute exact path="/users" component={UsersPage}/>
							<PrivateRoute exact path="/investors" component={InvestorsPage}/>
							<PrivateRoute exact path="/users/invite" component={UsersPage}/>
							<PrivateRoute path="/users/:id/edit" component={EditUser}/>
							
							<PrivateRoute exact path="/contests" component={Contests}/>
							<PrivateRoute exact path="/contests/add" component={AddContest}/>
							<PrivateRoute path="/contests/:id/edit" component={EditContest}/>
							<PrivateRoute path="/contests/:id/view-entries" component={ContestEntryDetail}/>
							<PrivateRoute path="/entries/:id" component={EntriesPage}/>
							<PrivateRoute path="/contests/:id/ratings/:ratingId" component={EntriesRatingPage}/>
							
							<PrivateRoute path="/experts/" component={Expert}/>
							<PrivateRoute path="/expert/add" component={AddExpert}/>
							<PrivateRoute path="/expert/edit/:id" component={EditExpert}/>
							<PrivateRoute path="/expertises/" component={Expertise}/>
							<PrivateRoute path="/expertise/add" component={AddExpertise}/>
							<PrivateRoute path="/expertise/edit/:shortId/:id" component={EditExpertise}/>
							<PrivateRoute path="/expertiseOrder/edit/:expertiseid/order/:orderId" component={EditExpertiseOrder}/>
							<PrivateRoute path="/expertiseReview/add/:expertiseid/reviews" component={AddExpertiseReview}/>
							<PrivateRoute path="/expertiseReview/edit/:expertiseid/reviews/:ReviewsId" component={EditExpertiseReview}/>
							<PrivateRoute path="/pages" component={Pages}/>
							<PrivateRoute path="/page/edit/:id" component={EditPage}/>
							<PrivateRoute path="/page/add" component={AddPage}/>
							<PrivateRoute path="/judge-application" component={JudgeApplications}/>
							<PrivateRoute path="/contestant-application" component={ContestantApplications}/>
							<PrivateRoute path="/projects" component={Projects}/>
							<PrivateRoute path="/project/add" component={AddProjects}/>							
							<PrivateRoute path="/project/edit/:id" component={EditProjects}/>
							<PrivateRoute path="/post/add" component={AddPost}/>
							<PrivateRoute path="/posts/" component={Post}/>
							<PrivateRoute path="/post/edit/:id" component={EditPost}/>
							<PrivateRoute path="/transactions/:userId/add" component={AddTransaction}/>
							<PrivateRoute path="/transactions/:id/edit" component={EditTransaction}/>
							<PrivateRoute path="/events" component={EventList}/>
							<PrivateRoute path="/event/edit/:id" component={EditEvent}/>
							<PrivateRoute path="/event/add" component={AddEvent}/>
							<PrivateRoute path="/events" component={EventList}/>
							<PrivateRoute path="/event/edit/:id" component={EditEvent}/>
							<PrivateRoute path="/event/add" component={AddEvent}/>
							<PrivateRoute path="/communities" component={CommunityPage}/>
							<PrivateRoute path="/community/add" component={AddCommunity}/>
							<PrivateRoute path="/community/edit/:id" component={EditCommunity}/>
						</Switch>
					</ConnectedRouter>
					<Footer/>
				</App>
			</Provider>
		)
	}
}