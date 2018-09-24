import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { selectListing } from '../actions/listing'

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
    return (
      <li>
        {this.props.listing.name},{this.props.listing.price},{this.props.listing.address},{this.props.listing.description}
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Check Detail</button>
      </li>
    )
  }
}


export default connect(null, { selectListing })(Listing)
