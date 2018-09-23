import React from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'

const ListingInfo = (props) => {
  return (
    <div>
      <h3>Listing Detail</h3>
      <p>{props.listing.name}</p>
      <p>{props.listing.price}</p>
      <p>{props.listing.address}</p>
      <p>{props.listing.description}</p>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    listing: state.listingsReducer.currentListing
  }
}

export default withAuth(connect(mapStateToProps)(ListingInfo))
