import React, { Component } from 'react'
import { connect } from 'react-redux'
import Trip from './Trip'
import { fetchTrips } from '../actions/trip'
import withAuth from '../hocs/withAuth'
import { Container, Feed } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react'

class MyTrips extends Component {
  componentDidMount(){
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${this.props.user_id}`, {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(r=>r.json())
      .then(JSONResponse=>this.props.fetchTrips(JSONResponse.trips))

  }

  render(){

      if(this.props.addingReservation || this.props.addingReview){
        return <Loader active inline="centered" />
      } else {
        return (
          <Container>
            <h3>My Trips</h3>
            {this.props.trips && this.props.trips.length !== 0 ?
              <Feed>
                {this.props.trips.map(trip => <Trip key={trip.id} trip={trip} />)}
              </Feed>
              :
              <p>You don't have any trips yet! Check the listings and have some fun!</p>
            }
          </Container>
        )
      }
  }
}

function mapStateToProps(state) {
  return{
    user_id: state.usersReducer.user.id,
    trips: state.tripsReducer.trips,
    addingReservation: state.reservationsReducer.addingReservation,
    addingReview: state.reviewsReducer.addingReview,
  }
}

export default withAuth(connect(mapStateToProps, {fetchTrips})(MyTrips))
