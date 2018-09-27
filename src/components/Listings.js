import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import Listing from './Listing'
import { fetchListings } from '../actions/listing'
import { Container, Card } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react'


class Listings extends Component {
  componentDidMount(){
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/listings`, {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(r=>r.json())
      .then(json => this.props.fetchListings(json))
  }

  render(){
    if(this.props.addingListing){
      return <Loader active inline="centered" />
    } else {
      return(
        <Container>
          <Card.Group>
            {this.props.listings.map(listing => <Listing key={listing.id} listing={listing} />)}
          </Card.Group>
        </Container>
      )

    }
  }
}

const mapStateToProps = state => {
  return {
    listings: state.listingsReducer.listings,
    currentListing: state.listingsReducer.currentListing,
    addingListing: state.listingsReducer.addingListing,
  }
}



export default withAuth(connect(mapStateToProps, { fetchListings })(Listings))
