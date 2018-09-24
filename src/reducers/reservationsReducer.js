import { ADD_RESERVATION, FETCH_RESERVATIONS } from '../types'

const initialState = {
  reservations: [
    {
      check_in: "2018-11-23",
      check_out: "2018-11-25",
      guest_number: 1,
      guest_id: 1,
      listing_id: 1,
    },
    {
      check_in: "2018-11-24",
      check_out: "2018-11-25",
      guest_number: 1,
      guest_id: 2,
      listing_id: 2,
    },
  ]
}

function reservationsReducer(state = initialState, action) {
  switch(action.type){
    case ADD_RESERVATION:
      return { ...state, reservations: [...state.reservations, action.payload]}
    case FETCH_RESERVATIONS:
      return { ...state, reservations: action.payload}
    default:
      return state
  }
}

export default reservationsReducer
