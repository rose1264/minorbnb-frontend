import { ADD_RESERVATION, FETCH_RESERVATIONS } from '../types'

export const addReservation = (check_in, check_out, guest_number, guest_id, listing_id, avatar) => {
  return (dispatch) => {

    let data = new FormData()
    data.append('check_in', check_in)
    data.append('check_out', check_out)
    data.append('guest_number', guest_number)
    data.append('guest_id', guest_id)
    data.append('listing_id', listing_id)
    data.append('avatar', avatar)

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/reservations`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      body: data,
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
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
