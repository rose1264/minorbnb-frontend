import { SELECT_LISTING, ADD_LISTING, FETCH_LISTINGS, ADDING_LISTING, ADDED_LISTING } from '../types'

//testing data
const initialState = {
  guest_id: 1,
  host_id: 1,
  listings: [],
  reservations:[],
  trips:[],
  currentListing: {},
  currentTeservation: {},
  currentTrip:{},
  reviews:[],
  addingListing:false,
}

function listingsReducer(state = initialState, action){
  switch(action.type){
    case FETCH_LISTINGS:
      return { ...state, listings: action.payload}
    case SELECT_LISTING:
      return { ...state, currentListing: action.payload}
    case ADD_LISTING:
      return { ...state, listings: [...state.listings, action.payload]}
    case ADDING_LISTING:
      return { ...state, addingListing:true}
    case ADDED_LISTING:
        return { ...state, addingListing:false}
    default:
      return state;
  }
}

export default listingsReducer
