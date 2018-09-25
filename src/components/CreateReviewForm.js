import React, { Component } from 'react'
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth'
import { addReview } from '../actions/review';

class CreateReviewForm extends Component {
  state = {
    rating: 5,
    description: "",
    guest_id: this.props.guest_id,
    reservation_id: this.props.reservation_id
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
      reservation_id: this.props.reservation_id
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Rating: <input type="number" name="rating" value={this.state.rating} onChange={this.handleChange}/></label>
        <label>Description: <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/></label>
        <input type="submit" value="Add Review" />
      </form>
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
