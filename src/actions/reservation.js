import { ADD_RESERVATION, FETCH_RESERVATIONS } from '../types'

export const addReservation = (check_in, check_out, guest_number, guest_id, listing_id) => {
  return (dispatch) => {

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        reservation: {check_in, check_out, guest_number, guest_id, listing_id}
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(console.log)
      .then(JSONResponse => {
        dispatch({ type: ADD_RESERVATION, payload: JSONResponse })
      })
      .catch(r => r.json().then(console.log))

  }
}

export const fetchReservations = reservations => {
  return {
    type: FETCH_RESERVATIONS,
    payload: reservations
  }
}
