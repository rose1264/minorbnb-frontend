import React from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'

const ListingDetail = props => {
  const {name, price, address, description} = props.listing

  return(
    <div>
      <h3>Listing Detail</h3>
      <p>{name}</p>
      <p>{price}</p>
      <p>{address}</p>
      <p>{description}</p>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    listing: state.listingsReducer.currentListing
  }
}

export default withAuth(connect(mapStateToProps)(ListingDetail))
