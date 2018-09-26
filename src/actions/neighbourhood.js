import { FETCH_NEIGHBOURHOODS } from '../types'

export const fetchNeighbourhoods = neighbourhoods => {
  return {
    type: FETCH_NEIGHBOURHOODS,
    payload: neighbourhoods
  }
}
