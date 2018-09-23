import React, { Component } from 'react'
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth'
import { addListing } from '../actions/listing';

class CreateListingForm extends Component {
  state = {
    name: "",
    price: 0,
    address: "",
    description: "",
    host_id: this.props.host_id,
    neighbourhood_id: 1,
    neighbourhoods: this.props.neighbourhoods
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addListing(this.state.name, this.state.price, this.state.address, this.state.description, this.state.host_id, this.state.neighbourhood_id);
  }

  render() {
console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/></label>
        <label>Price: <input type="number" name="price" value={this.state.price} onChange={this.handleChange}/></label>
        <label>Address: <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/></label>
        <label>Description: <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/></label>
        <label>Neighbourhood:
          <select
            name="neighbourhood_id"
            value={this.state.neighbourhood_id}
            onChange={this.handleChange}>
            {this.state.neighbourhoods.map(neighbourhood => <option key={neighbourhood.id} value={neighbourhood.id} >{neighbourhood.name}</option>)}
          </select>
        </label>
        <input type="submit" value="Add Listing" />
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    host_id: state.usersReducer.user.id,
    neighbourhoods: state.neighbourhoodsReducer.neighbourhoods
  }
}

export default withAuth(connect(mapStateToProps, { addListing })(CreateListingForm))
