import { SELECT_LISTING, ADD_LISTING } from './types'
import UUID from 'uuid'

export function selectListing(listing) {
  return {
    type: SELECT_LISTING,
    payload: listing
  }
}

export function addListing(name, price, address, description) {
  return {
    type: ADD_LISTING,
    payload: {
      id: UUID(),
      name,
      price,
      address,
      description,
      host_id: 1,
      neighbourhood_id: 1
    }
  }
}
