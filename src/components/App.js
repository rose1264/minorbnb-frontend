import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux'
import '../assets/css/App.css';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { fetchCurrentUser } from '../actions/user';
import Listings from './Listings'
import ListingDetail from './ListingDetail'
import CreateListingForm from './CreateListingForm'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Profile from './Profile'
import NavigationBar from './NavigationBar'
import MyTrips from './MyTrips'
import MyReviews from './MyReviews'
import MyReservations from './MyReservations'
import CreateReviewForm from './CreateReviewForm'
import Home from './Home'
import Footer from './Footer'
import history from './history'

class App extends Component {
  componentDidMount() {
    if (this.props.location.pathname !== '/login'
    && this.props.location.pathname !== '/signup'
    && this.props.location.pathname !== '/'){
      if (this.props.user.user === null) this.props.fetchCurrentUser()
    }
  }

  render() {
    const loggedIn = this.props.user.loggedIn
    return (
      <Router history={history}>
        <Fragment>
          <NavigationBar />
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/" component={Home} />
          </Switch>
          { loggedIn ? (
            <Fragment>
              <Route exact path="/listings" component={Listings} />
              <Route exact path="/listings/detail" component={ListingDetail} />
              <Route exact path="/listings/new" component={CreateListingForm} />
              <Route exact path="/reservations/" component={MyReservations}/>
              <Route exact path="/trips/" component={MyTrips} />
              <Route exact path="/reviews" component={MyReviews} />
              <Route exact path="/reviews/new" component={CreateReviewForm} />
            </Fragment>
          ) : null}
          <Footer />
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

function mapDispatchToProps(dispatch) {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
