import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { addReservation } from '../actions/reservation'
import { Redirect } from 'react-router'

class CreateReservationForm extends Component {
  state = {
    check_in: "",
    check_out: "",
    guest_number: 1,
    fireRedirect: false,
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addReservation(this.state.check_in, this.state.check_out, this.state.guest_number, this.props.guest_id, this.props.listing_id);
    this.setState({
      check_in: "",
      check_out: "",
      guest_number: 1,
      fireRedirect: true,
    })
  }

  render() {
    const { fireRedirect } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Check In: <input type="date" name="check_in" value={this.state.check_in} onChange={this.handleChange}/></label>
          <label>Check Out: <input type="date" name="check_out" value={this.state.check_out} onChange={this.handleChange}/></label>
          <label>Guest Number: <input type="number" name="guest_number" value={this.state.guest_number} onChange={this.handleChange}/></label>
          <input type="submit" value="Add Reservation" />
        </form>
        {fireRedirect && (
          <Redirect to={'/reservations'} />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    guest_id: state.usersReducer.user.id,
    listing_id: state.listingsReducer.currentListing.id,
  }
}

export default withAuth(connect(mapStateToProps, { addReservation })(CreateReservationForm))
