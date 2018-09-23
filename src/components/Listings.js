import React from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
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
    listings: state.listingsReducer.listings
  }
}

export default withAuth(connect(mapStateToProps)(Listings))
