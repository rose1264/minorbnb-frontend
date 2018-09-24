import React from 'react'

const Trip = props => {
  return (
    <p>{props.trip.check_in} | {props.trip.check_out} | {props.trip.guest_number}</p>
  )
}

export default Trip
