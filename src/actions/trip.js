import { FETCH_TRIPS, SET_TRIP } from '../types'

export const fetchTrips = trips => {
  return {
    type: FETCH_TRIPS,
    payload: trips
  }
}

export const setTrip = trip => {
  return {
    type: SET_TRIP,
    payload: trip
  }
}
