import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { selectListing } from '../actions/listing'
import { Card, Image, Button } from 'semantic-ui-react'


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
      return <Redirect to='/listings/detail' />
    }
  }

  render(){

    let avatarUrl = null
    if(this.props.listing.avatars){
      avatarUrl = this.props.listing.avatars[0].url
    }

    return (
      <Card>
        <Image height='300px' src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarUrl}`} />
        <Card.Content>
          <Card.Header>{this.props.listing.name}</Card.Header>
          <Card.Meta>$ {this.props.listing.price} per night</Card.Meta>
          <Card.Meta>address: {this.props.listing.address}</Card.Meta>
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
