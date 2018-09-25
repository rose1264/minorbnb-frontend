import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { fetchReviews } from '../actions/review'
import { setTrip } from '../actions/trip'

class Trip extends Component {
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
    const ReviewOfTrip = this.props.reviews.find(review => review.reservation_id === this.props.trip.id)

    return (
      <div>
        <p>{this.props.trip.check_in} | {this.props.trip.check_out} | {this.props.trip.guest_number}</p>

        { ReviewOfTrip ?
          <p>{ReviewOfTrip.description}</p>
        :
          <Menu.Item as={NavLink} to="/reviews/new" name="Leave a Review" onClick={()=> {this.props.setTrip(this.props.trip)}}/>
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user_id: state.usersReducer.user.id,
    reviews: state.reviewsReducer.reviews,
  }
}

export default connect(mapStateToProps, {setTrip, fetchReviews})(Trip)
