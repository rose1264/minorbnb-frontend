import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon, Feed, Segment, Image } from 'semantic-ui-react'
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

      <Segment>
        <Feed.Event>
          <Feed.Content>
            <Feed.Summary>
              <Feed.Label>
                {this.props.trip.listing ?
                  <Image src={`${process.env.REACT_APP_API_ENDPOINT}/${this.props.trip.listing.avatars[0].demo.url}`} />
                  : null
                }
              </Feed.Label>
              <Feed.Date>Check in date: {this.props.trip.check_in}</Feed.Date>
              <Feed.Date> Check out date: {this.props.trip.check_out}</Feed.Date><br/>
              <Feed.Extra>
                { ReviewOfTrip ?
                  <p>{ReviewOfTrip.description}</p>
                  :
                  <Menu.Item as={NavLink} to="/reviews/new" name="Leave a Review" onClick={()=> {this.props.setTrip(this.props.trip)}}>
                    <Icon name="clipboard" />Click here to Review
                  </Menu.Item>
                }
              </Feed.Extra>
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Segment>
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
