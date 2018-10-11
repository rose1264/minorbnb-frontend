import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { addReview } from '../actions/review'
import { Redirect } from 'react-router'
import { Button, Form, Segment, Container } from 'semantic-ui-react'

class CreateReviewForm extends Component {
  state = {
    rating: 5,
    description: "",
    guest_id: this.props.guest_id,
    reservation_id: this.props.reservation_id,
    fireRedirect: false,
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addReview(this.state.rating, this.state.description, this.state.guest_id, this.state.reservation_id);
    this.setState({
      rating: 5,
      description: "",
      guest_id: this.props.guest_id,
      reservation_id: this.props.reservation_id,
      fireRedirect: true,
    })
  }

  render() {
    const { fireRedirect } = this.state

    return (
      <Container>
        <center><h2>Do you enjoy your stay? Share something nice about your trip!</h2></center>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="rating"
                type="number"
                name="rating"
                onChange={this.handleChange}
                value={this.state.rating}
              />
              <Form.Input
                label="description"
                type="text"
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
              />
            </Form.Field>
            <Button type="submit">Add Review</Button>
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
    reservation_id: state.tripsReducer.currentTrip.id
  }
}

export default withAuth(connect(mapStateToProps, { addReview })(CreateReviewForm))
