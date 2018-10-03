import React from 'react'
import { connect } from 'react-redux'
import { Image, Icon } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'
import Slider from "react-slick";


const ListingInfo = (props) => {
  let avatarUrl = null
  let avatarUrlTwo = null
  let avatarUrlThree = null
  let avatarUrlFour = null
  if(props.listing.avatars){
    avatarUrl = props.listing.avatars[0].url
    if(props.listing.avatars[1]){
      avatarUrlTwo = props.listing.avatars[1].url
      if(props.listing.avatars[2]){
        avatarUrlThree = props.listing.avatars[2].url
        if(props.listing.avatars[3]){
          avatarUrlFour = props.listing.avatars[3].url
        }
      }
    }

  }

  const settings= {
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
  }

  return (
    <center>
      <Slider {...settings}>
        <Image width='50%' height='300px' src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarUrl}`} />
        {avatarUrlTwo ? <Image width='50%' height='300px' src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarUrlTwo}`} /> : null}
        {avatarUrlThree ? <Image width='50%' height='300px' src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarUrlThree}`} /> : null}
        {avatarUrlFour ? <Image width='50%' height='300px' src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarUrlFour}`} /> : null}
      </Slider>
      <p><Icon name='home' />{props.listing.name}</p>
      <p><Icon name='dollar sign' />{props.listing.price} per night</p>
      <p><Icon name='map marker alternate' />Address: {props.listing.address}</p>
      <p><Icon name='file alternate outline' />{props.listing.description}</p>
      <p><Icon name='mail' />{props.listing.host.email}</p>
    </center>
  )
}

function mapStateToProps(state) {
  return {
    listing: state.listingsReducer.currentListing
  }
}

export default withAuth(connect(mapStateToProps)(ListingInfo))
