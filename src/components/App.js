import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import '../assets/css/App.css';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import Listings from './Listings'
import ListingDetail from './ListingDetail'
import CreateListingForm from './CreateListingForm'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Profile from './Profile'
import NavigationBar from './NavigationBar'
import MyTrips from './MyTrips'
import MyReservations from './MyReservations'
import withAuth from '../hocs/withAuth'


const App = props => {
  const loggedIn = props.user.loggedIn
  console.log("inside app, loggedIn is", loggedIn);
  debugger
  return (
      <Router>
        <Fragment>
          <NavigationBar />
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
          { loggedIn ? (
            <Fragment>
              <Route exact path="/listings" component={Listings} />
              <Route exact path="/listings/detail" component={ListingDetail} />
              <Route exact path="/listings/new" component={CreateListingForm} />
              <Route exact path="/reservations/" component={MyReservations}/>
              <Route exact path="/trips/" component={MyTrips} />
            </Fragment>
          ) : null}
        </Fragment>
      </Router>
  )

}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withRouter(connect(mapStateToProps)(App))
