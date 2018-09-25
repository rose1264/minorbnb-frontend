import { ADD_RESERVATION, FETCH_RESERVATIONS } from '../types'

const initialState = {
  reservations: []
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
