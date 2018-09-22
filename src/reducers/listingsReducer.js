import { SELECT_LISTING, ADD_LISTING } from '../types'

//testing data
const initialState = {
  guest_id: 1,
  host_id: 1,
  listings: [
    {
      id: 1,
      name: "wonderland",
      price: "100",
      address: "200 Rector Place",
      description: "Wonderful",
      host_id: 1,
      neighbourhood_id: 1,
    },
    {
      id: 2,
      name: "happyland",
      price: "200",
      address: "240 Rector Place",
      description: "convenient",
      host_id: 2,
      neighbourhood_id: 1,
    },
  ],
  reservations:[
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
  ],
  trips:[
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
  ],
  currentListing: {
    id: 1,
    name: "wonderland",
    price: "100",
    address: "200 Rector Place",
    description: "Wonderful",
    host_id: 1,
    neighbourhood_id: 1,
  },
  currentTeservation: {
    check_in: "2018-11-23",
    check_out: "2018-11-25",
    guest_number: 1,
    guest_id: 1,
    listing_id: 1,
  },
  currentTrip:{
    check_in: "2018-11-23",
    check_out: "2018-11-25",
    guest_number: 1,
    guest_id: 1,
    listing_id: 1,
  },
  reviews:[
    {
      rating: 4,
      description: "enjoy it",
      guest_id: 1,
      reservation_id: 1
    },
  ],
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case 'SELECT_LISTING':
      return { ...state, currentListing: action.payload}
    case 'ADD_LISTING':
      return { ...state, listings: [...state.listings, action.payload] }
    default:
      return state;
  }
}
