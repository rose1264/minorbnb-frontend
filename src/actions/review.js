import { ADD_REVIEW, FETCH_REVIEWS } from '../types'

export const addReview = (rating, description, guest_id, reservation_id) => {
  return (dispatch) => {

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        review: {rating, description, guest_id, reservation_id}
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        dispatch({ type: ADD_REVIEW, payload: JSONResponse })
      })
      .catch(r => r.json().then(console.log))

  }
}


export const fetchReviews = reviews => {
  return {
    type: FETCH_REVIEWS,
    payload: reviews
  }
}
