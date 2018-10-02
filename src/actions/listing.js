import { SELECT_LISTING, ADD_LISTING, FETCH_LISTINGS, ADDING_LISTING, ADDED_LISTING } from '../types'

export const selectListing = listing => {
  return {
    type: SELECT_LISTING,
    payload: listing
  }
}

export const addListing = (name, price, address, description, host_id, neighbourhood_id, avatars) => {
  return (dispatch) => {
    dispatch({type: ADDING_LISTING})

    let lat
    let lng

    let data = new FormData()
    data.append('name', name)
    data.append('price', price)
    data.append('address', address)
    data.append('description', description)
    data.append('host_id', host_id)
    data.append('neighbourhood_id', [neighbourhood_id])
    data.append('avatars[]', avatars[0])
    data.append('avatars[]', avatars[1])
    data.append('avatars[]', avatars[2])

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_API_KEY}`)
      .then(res=>res.json())
      .then(res=>{
        lat=res.results[0].geometry.location.lat
        lng=res.results[0].geometry.location.lng
        data.append('lat', lat)
        data.append('lng', lng)

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/listings`, {
          method: 'POST',
          headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`},
          body: data,
        })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw response
          }
        })
        .then(JSONResponse => dispatch({ type: ADD_LISTING, payload: JSONResponse }))
        .then(()=>dispatch({ type: ADDED_LISTING }))
        .catch(r => r.json().then(console.log))

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
