import React, { Component } from 'react'
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth'
import { addListing } from '../actions/listing';

class CreateReservationForm extends Component {
  state = {
    check_in: "",
    check_out: "",
    guest_number: 1,
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addListing(this.state.name, this.state.price, this.state.address, this.state.description, this.state.host_id, this.state.neighbourhood_id);
    this.setState({
      check_in: "",
      check_out: "",
      guest_number: 1,
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Check In: <input type="date" name="check_in" value={this.state.check_in} onChange={this.handleChange}/></label>
        <label>Check Out: <input type="date" name="check_out" value={this.state.check_out} onChange={this.handleChange}/></label>
        <label>Guest Number: <input type="number" name="guest_number" value={this.state.guest_number} onChange={this.handleChange}/></label>
        <input type="submit" value="Add Reservation" />
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    guest_id: state.usersReducer.user.id,
  }
}

export default withAuth(connect(mapStateToProps, { addListing })(CreateReservationForm))
