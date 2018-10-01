import React from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import ListingInfo from './ListingInfo'
// TODO:import ListnigMap from './ListingMap'
import CreateReservationForm from './CreateReservationForm'
import { Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import Listings from './Listings'


const ListingDetail = props => {
    if (!props.listing.host){
      return <Redirect to='/listings' component={Listings}/>
    } else {
      return(
        <Container>
          <ListingInfo />
          <CreateReservationForm />
        </Container>
      )
    }

}

function mapStateToProps(state) {
  return {
    listing: state.listingsReducer.currentListing
  }
}

export default withAuth(connect(mapStateToProps)(ListingDetail))
