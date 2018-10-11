import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { selectListing } from '../actions/listing'
import { Card, Image, Button } from 'semantic-ui-react'
import Slider from "react-slick";
import history from './history'

class Listing extends Component {

  state = {
    redirect: false
  }

  setRedirect = () => {
    this.props.selectListing(this.props.listing)
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      history.push('/listings');
      return <Redirect to='/listings/detail' />
    }
  }

  render(){

    let avatarUrl = null
    let avatarUrlTwo = null
    let avatarUrlThree = null
    let avatarUrlFour = null
    if(this.props.listing.avatars){
      avatarUrl = this.props.listing.avatars[0].url
      if(this.props.listing.avatars[1]){
        avatarUrlTwo = this.props.listing.avatars[1].url
        if(this.props.listing.avatars[2]){
          avatarUrlThree = this.props.listing.avatars[2].url
          if(this.props.listing.avatars[3]){
            avatarUrlFour = this.props.listing.avatars[3].url
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
      <Card style={{margin: 'auto', marginBottom: 20}}>
        <Slider {...settings}>
          <Image height='300px' src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarUrl}`} />
          {avatarUrlTwo ? <Image height='300px' src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarUrlTwo}`} /> : null}
          {avatarUrlThree ? <Image height='300px' src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarUrlThree}`} /> : null}
          {avatarUrlFour ? <Image height='300px' src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarUrlFour}`} /> : null}
        </Slider>
        <Card.Content>
          <Card.Header>{this.props.listing.name}</Card.Header>
          <Card.Meta>$ {this.props.listing.price} per night</Card.Meta>
          <Card.Meta>address: {this.props.listing.address}</Card.Meta>
          <Card.Meta>neighbourhood: {this.props.listing.neighbourhood.name}</Card.Meta>
          <Card.Description>{this.props.listing.description}</Card.Description>
        </Card.Content>
        {this.renderRedirect()}
        <Button primary onClick={this.setRedirect}>
          Check Detail
        </Button>
      </Card>
    )
  }
}


export default connect(null, { selectListing })(Listing)
