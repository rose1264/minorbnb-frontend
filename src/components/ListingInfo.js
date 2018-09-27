import React from 'react'
import { connect } from 'react-redux'
import { Image, Icon } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const ListingInfo = (props) => {

  let avatarUrl = null
  if(props.listing.avatars){
    avatarUrl = props.listing.avatars[0].url
  }
  return (
    <center>
      <Image width="700px"  src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarUrl}`} />
      <p><Icon name='home' />{props.listing.name}</p>
      <p><Icon name='dollar sign' />{props.listing.price} per night</p>
      <p><Icon name='map marker alternate' />Address: {props.listing.address}</p>
      <p><Icon name='file alternate outline' />{props.listing.description}</p>
    </center>
  )
}

function mapStateToProps(state) {
  return {
    listing: state.listingsReducer.currentListing
  }
}

export default withAuth(connect(mapStateToProps)(ListingInfo))
