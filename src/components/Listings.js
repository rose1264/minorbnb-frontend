import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import Listing from './Listing'
import { Container, Card } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react'
import SearchBar from './SearchBar'

class Listings extends Component {
  state = {
    searchTerm: '',
    searchedListings:[],
    page: 1,
    totalPages: null,
    listings: [],
  }

  componentDidMount(){
    const url = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/listings`
    fetch(url, {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(r=>r.json())
      .then(json => {
        this.setState({
          searchedListings: json,
          listings: json,
        })
      })
  }

  loadListings = () => {
    const {page, listings} = this.state
    const url = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/listings?page=${page}`
    fetch(url, {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(r=>r.json())
      .then(json => {
        this.setState({
          searchedListings:[...this.state.listings, ...json],
          listings:[...this.state.listings, ...json],
        })
      })
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }), this.loadListings)
  }

  handleChange = e => {
    let searchValue = e.target.value
    let searchedListings = this.state.listings.filter(listing => {
      return (
        listing.name.toLowerCase().includes(searchValue)
        || listing.address.toLowerCase().includes(searchValue)
        || listing.price.toString().includes(searchValue)
        || listing.neighbourhood.name.toLowerCase().includes(searchValue)
      )})

    this.setState({searchedListings: searchedListings, searchTerm: e.target.value})
  }

  render(){
    if(this.props.addingListing){
      return <Loader active inline="centered" />
    } else {
      return(
        <Container>
          <SearchBar handleChange={this.handleChange} searchTerm={this.state.searchTerm}/>

          <Card.Group>
            {this.state.searchedListings.map(listing => <Listing key={listing.id} listing={listing} />)}
          </Card.Group>
          <a onClick={this.loadMore}>Load More</a>
        </Container>
      )

    }
  }
}

const mapStateToProps = state => {
  return {
    currentListing: state.listingsReducer.currentListing,
    addingListing: state.listingsReducer.addingListing,
  }
}



export default withAuth(connect(mapStateToProps)(Listings))
