import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addListing } from '../actions/listing';

class CreateListingForm extends Component {
  state = {
    name: "",
    price: 0,
    address: "",
    description: ""
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addListing(this.state.name, this.state.price, this.state.address, this.state.description);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/></label>
        <label>Price: <input type="number" name="price" value={this.state.price} onChange={this.handleChange}/></label>
        <label>Address: <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/></label>
        <label>Description: <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/></label>
        <input type="submit" value="Add Listing" />
      </form>
    )
  }
}

export default connect(null, { addListing })(CreateListingForm);
