import { SELECT_LISTING, ADD_LISTING, FETCH_LISTINGS } from '../types'

export const selectListing = listing => {
  return {
    type: SELECT_LISTING,
    payload: listing
  }
}

export const addListing = (name, price, address, description, host_id, neighbourhood_id) => {
  return (dispatch) => {

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        listing: {name, price, address, description, host_id, neighbourhood_id}
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
        dispatch({ type: ADD_LISTING, payload: JSONResponse })
      })
      .catch(r => r.json().then(console.log))

  }
}

export const fetchListings = listings => {
  return {
    type: FETCH_LISTINGS,
    payload: listings
  }
}
