import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Image, Card, Icon, Segment, Header } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'
import { fetchListings } from '../actions/listing.js'
import { fetchReservations} from '../actions/reservation.js'
import { fetchTrips } from '../actions/trip.js'

class Profile extends Component {
  componentDidMount(){
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${this.props.user_id}`,{
      headers: {
        method: 'GET',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(r=>r.json())
      .then(JSONResponse=>this.props.fetchListings(JSONResponse.listings))

      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${this.props.user_id}`,{
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
        .then(r=>r.json())
        .then(JSONResponse=>this.props.fetchReservations(JSONResponse.reservations))

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${this.props.user_id}`,{
          headers: {
            method: 'GET',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        })
          .then(r=>r.json())
          .then(JSONResponse=>this.props.fetchTrips(JSONResponse.trips))
  }

  render(){
    let avatarUrl = null
    if (this.props.user) {
      avatarUrl = this.props.user.avatar.url
    }

    return (
      <Container>
        <Grid>
          <Grid.Column width={4}>
            <Card>
              <Image src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarUrl}`} />
              <Card.Content>
                <Card.Header>{this.props.user.name}</Card.Header>
                <Card.Meta>{this.props.user.email}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <p>
                  <Icon name='clipboard list' />
                  {this.props.user.listings.length} Listings
                </p>
                <p>
                  <Icon name='docker' />
                  {this.props.user.reservations.length} Reservations
                </p>
                <p>
                  <Icon name='plane' />
                  {this.props.user.trips.length} Trips
                </p>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>

            <Header as='h3'>
              <Icon name='clipboard list'/>
              <Header.Content>My listings</Header.Content>
            </Header>
            <Segment.Group>
              {this.props.listings? this.props.listings.map(listing => {
                return (
                  <Segment>
                    <img src={`${process.env.REACT_APP_API_ENDPOINT}/${listing.avatars[0].thumb.url}`} />
                    &nbsp;&nbsp;&nbsp;{listing.name}
                  </Segment>
                )
              }):
              <p>You haven't got any listing yet!</p>
            }
            </Segment.Group>

            <Header as='h3'>
              <Icon name='docker'/>
              <Header.Content>My reservations</Header.Content>
            </Header>
            <Segment.Group>
              {this.props.reservations?
                this.props.reservations.map(reservation => {
                return (
                  <Segment  secondary>
                    <p>{reservation.check_in} - {reservation.check_out}</p>
                    <p>Guest number: {reservation.guest_number}</p>
                  </Segment>
                )
              })
              :
              <p>You haven't got any reservation yet!</p>
            }
            </Segment.Group>

            <Header as='h3'>
              <Icon name='plane'/>
              <Header.Content>My trips</Header.Content>
            </Header>
            <Segment.Group>
              {this.props.trips?
                this.props.trips.map(trip => {
                return (
                  <Segment  tertiary>
                    <p>Destination: {trip.listing.name}</p>
                    <p>{trip.check_in} - {trip.check_out}</p>
                  </Segment>
                )
              })
              :
              <p>You haven't got any trip yet!</p>
            }
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}


function mapStateToProps(state){
  return {
    user: state.usersReducer.user,
    listings: state.usersReducer.user.listings,
    reservations: state.usersReducer.user.reservations,
    trips: state.usersReducer.user.trips,
  }
}

export default withAuth(connect(mapStateToProps, {fetchListings, fetchReservations, fetchTrips})(Profile))
