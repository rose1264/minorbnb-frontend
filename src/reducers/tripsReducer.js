import { FETCH_TRIPS } from '../types'

const initialState = {
  trips: [
    {
      id: 1,
      check_in: "2018-11-20",
      check_out: "2018-11-21",
      guest_number: 2,


    }
  ]
}

const tripsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_TRIPS:
      return { ...state, trips: action.payload}
    default:
      return state
  }
}

export default tripsReducer
