import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import '../assets/css/App.css';
import { Route, Switch, withRouter } from 'react-router-dom'
import Listings from './Listings'
import ListingDetail from './ListingDetail'
import CreateListingForm from './CreateListingForm'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Profile from './Profile'
import NavigationBar from './NavigationBar'
import MyTrips from './MyTrips'
import MyReservations from './MyReservations'

const App = props => {
  const loggedIn = props.user.loggedIn

  return (
    <Fragment>
      <NavigationBar />
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
      { loggedIn ? (
        <Fragment>
          <CreateListingForm />
          <Listings />
          <ListingDetail />
          <MyTrips />
          <MyReservations />
        </Fragment>
      ) : null}


    </Fragment>
  )
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withRouter(connect(mapStateToProps)(App))
