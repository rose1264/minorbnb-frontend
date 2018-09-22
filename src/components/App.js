import React, { Fragment } from 'react';
import '../assets/css/App.css';
import { Route, Switch } from 'react-router-dom'
import Listings from './Listings'
import ListingDetail from './ListingDetail'
import CreateListingForm from './CreateListingForm'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Profile from './Profile'
import NavigationBar from './NavigationBar'

const App = props => {
    return (
      <Fragment>
        <NavigationBar />
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
        {/* <CreateListingForm />
          <Listings />
          <ListingDetail /> */}
      </Fragment>
    )
}

export default App;
