import React from 'react'
import { connect } from 'react-redux'

import Listing from './Listing'

const Listings = ({ listings }) => {
  return (
    <ul>
      {listings.map(listing => <Listing key={listing.id} listing={listing} />)}
    </ul>
  )
}

function mapStateToProps(state){
  return {
    listings: state.listings
  }
}

export default connect(mapStateToProps)(Listings)
