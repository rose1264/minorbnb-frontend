import React, { Component } from 'react'
import { connect } from 'react-redux'
import Trip from './Trip'
import { fetchTrips } from '../actions/trips'

class MyTrips extends Component {
  componentDidMount(){
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${this.props.user_id}`)
      .then(r=>r.json())
      .then(JSONResponse=>this.props.fetchTrips(JSONResponse.trips))
  }

  render(){
    return (
      <div>
        <h3>My Trips</h3>
        {this.props.trips.map(trip => <Trip key={trip.id} trip={trip}/>)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    user_id: state.usersReducer.user.id,
    trips: state.tripsReducer.trips
  }
}

export default connect(mapStateToProps, {fetchTrips})(MyTrips)
