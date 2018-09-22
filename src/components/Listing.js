import React from 'react'
import { connect } from 'react-redux'

import { selectListing } from '../actions/listing'

const Listing = props => {
  const {name, price, address, description} = props.listing

  return (
    <li onClick = {()=> props.selectListing(props.listing)}>
      {name},{price},{address},{description}
    </li>
  )
}


export default connect(null, { selectListing })(Listing)
