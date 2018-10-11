import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import Listing from './Listing'
import { Container, Card } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react'
import SearchBar from './SearchBar'

class Listings extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm: '',
      searchedListings:[],
      page: 1,
      totalPages: null,
      listings: [],
      scrolling: false,
    }
  }

  scrollListner = () => {
    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentDidMount(){
    this.loadListings()
    this.scrollListner()
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll, false);

  }

  handleScroll = e => {
    const { scrolling, totalPages, page } = this.state
    if (scrolling) return
    if (totalPages <= page) return
    const lastCard = document.querySelector('.cards > div:last-child')
    const lastCardOffset = lastCard.offsetTop + lastCard.clientHeight
    const pageOffset = window.pageYOffset + window.innerHeight
    var bottomOffset = 20
    if (pageOffset > lastCardOffset - bottomOffset) this.loadMore()
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
          searchedListings:[...listings, ...json],
          listings:[...listings, ...json],
          scrolling: false,
          totalPages: json.total_pages,
        })
      })
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      scrolling: true,
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
