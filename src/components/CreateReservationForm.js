import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { addReservation } from '../actions/reservation'
import { Redirect } from 'react-router'
import { Button, Form, Segment, Container } from 'semantic-ui-react'

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
    this.props.addReservation(
      this.state.check_in,
      this.state.check_out,
      this.state.guest_number,
      this.props.guest_id,
      this.props.listing_id
    );

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
      <Container>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="check_in"
                type="date"
                name="check_in"
                onChange={this.handleChange}
                value={this.state.check_in}
              />
              <Form.Input
                label="check_out"
                type="date"
                name="check_out"
                onChange={this.handleChange}
                value={this.state.check_out}
              />
              <Form.Input
                label="guest number"
                placeholder="guest number"
                type="number"
                name="guest_number"
                onChange={this.handleChange}
                value={this.state.guest_number}
              />
            </Form.Field>
            <Button type="submit">Add Reservation</Button>
          </Form>

          {fireRedirect && (
            <Redirect to={'/trips'} />
          )}
        </Segment>
      </Container>
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
