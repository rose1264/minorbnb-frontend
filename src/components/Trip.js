import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon, Segment, Image, Grid } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { fetchReviews } from '../actions/review'
import { setTrip } from '../actions/trip'
import StarRatingComponent from 'react-star-rating-component';

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
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <center>
                {this.props.trip.listing ?
                  <Image height="60" width="80" src={`${process.env.REACT_APP_API_ENDPOINT}/${this.props.trip.listing.avatars[0].demo.url}`} />
                  : null
                }
              </center>
            </Grid.Column>
            <Grid.Column width={12}>
              Check in date: {this.props.trip.check_in}
              Check out date: {this.props.trip.check_out}
              { ReviewOfTrip ?
                <div>
                  <StarRatingComponent
                    name="rate"
                    editing={false}
                    starCount={5}
                    value={ReviewOfTrip.rating}
                  />
                  <p>{ReviewOfTrip.description}</p>
                </div>
                :
                <div>
                  <Menu.Item as={NavLink} to="/reviews/new" name="Leave a Review" onClick={()=> {this.props.setTrip(this.props.trip)}}>
                    <Icon name="clipboard" />Click here to Review
                  </Menu.Item>
                </div>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
