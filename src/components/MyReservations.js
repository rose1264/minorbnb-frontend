import React, { Component } from 'react'
import { connect } from 'react-redux'
import Reservation from './Reservation'
import { fetchReservations } from '../actions/reservation'

class MyReservations extends Component {
  componentDidMount(){
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${this.props.user_id}`,{
      headers: {
        method: 'GET',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(r=>r.json())
      .then(JSONResponse=>this.props.fetchReservations(JSONResponse.reservations))
  }

  render(){
    return (
      <div>
        <h3>My Reservations</h3>
        {this.props.reservations.map(reservation => <Reservation key={reservation.check_in} reservation={reservation} />)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    user_id: state.usersReducer.user.id,
    reservations: state.reservationsReducer.reservations
  }
}

export default connect(mapStateToProps, {fetchReservations})(MyReservations)
