import { ADD_RESERVATION, FETCH_RESERVATIONS, ADDING_RESERVATION, ADDED_RESERVATION } from '../types'

const initialState = {
  reservations: [],
  addingReservation: false,
}

function reservationsReducer(state = initialState, action) {
  switch(action.type){
    case ADD_RESERVATION:
      return { ...state, reservations: [...state.reservations, action.payload]}
    case ADDING_RESERVATION:
      return { ...state, addingReservation:true}
    case ADDED_RESERVATION:
      return { ...state, addingReservation:false}
    case FETCH_RESERVATIONS:
      return { ...state, reservations: action.payload}
    default:
      return state
  }
}

export default reservationsReducer
