import React from 'react'

const Reservation = props => {
  return (
    <div>
      <p>{props.reservation.check_in} | {props.reservation.check_out} | {props.reservation.guest_number}</p>
      <a href={`${process.env.REACT_APP_API_ENDPOINT}/${props.reservation.file.url}`} download>Download & Sign the school release form</a>
    </div>
  )
}

export default Reservation
