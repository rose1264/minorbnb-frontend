import React from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import ListingInfo from './ListingInfo'
import CreateReservationForm from './CreateReservationForm'
import { Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import Listings from './Listings'
import ListingMap from './ListingMap'


const ListingDetail = props => {

    if (!props.listing.host){
      return <Redirect to='/listings' component={Listings}/>
    } else {
      return(
        <Container>
          <ListingInfo />
          {props.listing.lat?
            <ListingMap />
            :null}
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
