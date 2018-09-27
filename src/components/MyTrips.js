import React, { Component } from 'react'
import { connect } from 'react-redux'
import Trip from './Trip'
import { fetchTrips } from '../actions/trip'
import withAuth from '../hocs/withAuth'
import { Container } from 'semantic-ui-react'


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
    return (
      <Container>
        <h3>My Trips</h3>
        {this.props.trips.map(trip => <Trip key={trip.id} trip={trip} />)}
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return{
    user_id: state.usersReducer.user.id,
    trips: state.tripsReducer.trips,
  }
}

export default withAuth(connect(mapStateToProps, {fetchTrips})(MyTrips))
