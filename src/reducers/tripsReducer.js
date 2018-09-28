import { FETCH_TRIPS, SET_TRIP } from '../types'

const initialState = {
  trips:[],
  currentTrip: {},
}

const tripsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_TRIPS:
      return { ...state, trips: action.payload}
    case SET_TRIP:
      return { ...state, currentTrip: action.payload}
    default:
      return state
  }
}

export default tripsReducer
