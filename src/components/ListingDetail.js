import React from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import ListingInfo from './ListingInfo'
// TODO:import ListnigMap from './ListingMap'
import CreateReservationForm from './CreateReservationForm'


const ListingDetail = props => {
  return(
    <div>
      <ListingInfo />
      <CreateReservationForm />
    </div>
  )
}

export default withAuth(connect()(ListingDetail))
