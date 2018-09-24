import { FETCH_TRIPS } from '../types'

export const fetchTrips = trips => {
  return {
    type: FETCH_TRIPS,
    payload: trips
  }
}
