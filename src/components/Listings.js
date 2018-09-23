import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import Listing from './Listing'
import { fetchListings } from '../actions/listing'

class Listings extends Component {
  componentDidMount(){
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/listings`)
      .then(r=>r.json())
      .then(json => this.props.fetchListings(json))
  }

  render(){
    return (
      <ul>
        {this.props.listings.map(listing => <Listing key={listing.id} listing={listing} />)}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    listings: state.listingsReducer.listings
  }
}


export default withAuth(connect(mapStateToProps, { fetchListings })(Listings))
