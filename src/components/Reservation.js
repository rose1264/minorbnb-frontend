import React from 'react'

const Reservation = props => {
  return (
    <p>{props.reservation.check_in} | {props.reservation.check_out} | {props.reservation.guest_number}</p>
  )
}

export default Reservation
