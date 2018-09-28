import React, { Component } from 'react'
import { connect } from 'react-redux'
import Review from './Review'
import { fetchReviews } from '../actions/review'
import { Container, Feed } from 'semantic-ui-react'

class MyReviews extends Component {
  componentDidMount(){
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${this.props.user_id}`,{
      headers: {
        method: 'GET',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(r=>r.json())
      .then(JSONResponse=>this.props.fetchReviews(JSONResponse.reviews))
  }

  render(){
    return (
      <Container>
        <h3>My Reviews</h3>
        {this.props.reviews.length !== 0 ?
        <Feed>
          {this.props.reviews.map(review => <Review key={review.description} review={review} />)}
        </Feed>
        :
          <p>You don't have any reviews yet! Feedback is important to us!</p>
        }
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return{
    user_id: state.usersReducer.user.id,
    reviews: state.reviewsReducer.reviews,
  }
}

export default connect(mapStateToProps, { fetchReviews })(MyReviews)
