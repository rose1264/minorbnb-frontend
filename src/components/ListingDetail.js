import React from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import ListingInfo from './ListingInfo'
// TODO:import ListnigMap from './ListingMap'
import CreateReservationForm from './CreateReservationForm'
import { Container } from 'semantic-ui-react'


const ListingDetail = props => {
  return(
    <Container>
      <ListingInfo />
      <CreateReservationForm />
    </Container>
  )
}

export default withAuth(connect()(ListingDetail))
