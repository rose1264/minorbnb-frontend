import React, { Component } from 'react'
import { connect } from 'react-redux'
import Reservation from './Reservation'
import { fetchReservations } from '../actions/reservation'
import { Container, Feed } from 'semantic-ui-react'

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
      <Container>
        <h3>My Reservations</h3>
        {this.props.reservations && this.props.reservations.length !== 0 ?
        <Feed>
          {this.props.reservations.map(reservation => <Reservation key={reservation.id} reservation={reservation} />)}
        </Feed>
        :
        <p>You don't have any reservations yet! Change the description and make your listing shine!</p>
        }
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.usersReducer.user.id,
    reservations: state.reservationsReducer.reservations
  }
}

export default connect(mapStateToProps, {fetchReservations})(MyReservations)
