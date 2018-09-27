import React, { Component } from 'react'
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth'
import { addListing } from '../actions/listing';
import { Redirect } from 'react-router'
import { Button, Form, Segment, Container } from 'semantic-ui-react'
import { fetchNeighbourhoods } from '../actions/neighbourhood'

class CreateListingForm extends Component {
  state = {
    name: "",
    price: 0,
    address: "",
    description: "",
    host_id: this.props.host_id,
    neighbourhood_id: 1,
    fireRedirect: false,
    avatars: null,
  }

  componentDidMount(){
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/neighbourhoods/`,{
      headers: {
        method: 'GET',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(r=>r.json())
      .then(JSONResponse=>this.props.fetchNeighbourhoods(JSONResponse))
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFileUpload = e => {
    this.setState({
      avatars: e.target.files,
    });
  };

  handleSubmit = e => {
    e.preventDefault()
    this.props.addListing(
      this.state.name,
      this.state.price,
      this.state.address,
      this.state.description,
      this.state.host_id,
      this.state.neighbourhood_id,
      this.state.avatars
    );

    this.setState({
      name: "",
      price: 0,
      address: "",
      description: "",
      host_id: this.props.host_id,
      neighbourhood_id: 1,
      fireRedirect: true,
      avatars: null,
    })
  }

  render() {
    const { fireRedirect } = this.state

    return (
      <Container>
        <Segment>
          <Form
            onSubmit={this.handleSubmit}
            encType="multipart/form-data">
            <Form.Field>
              <Form.Input
                label="name"
                placeholder="name"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
              <Form.Input
                label="price"
                placeholder="price per night"
                type="number"
                name="price"
                onChange={this.handleChange}
                value={this.state.price}
              />
              <Form.Input
                label="address"
                placeholder="address"
                type="text"
                name="address"
                onChange={this.handleChange}
                value={this.state.address}
              />
              <Form.Input
                label="description"
                placeholder="description"
                type="text"
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
              />
              <label>Neighbourhood
                <select
                  name="neighbourhood_id"
                  value={this.state.neighbourhood_id}
                  onChange={this.handleChange}>
                  {this.props.neighbourhoods.map(neighbourhood => <option key={neighbourhood.id} value={neighbourhood.id} >{neighbourhood.name}</option>)}
                </select>
              </label>
              <br />
              <Form.Input
                multiple
                label="upload photos"
                type="file"
                name="avatars"
                onChange={this.handleFileUpload}
              />
            </Form.Field>
            <Button type="submit">Add Listing</Button>
          </Form>

          {fireRedirect && (
            <Redirect to={'/listings'} />
          )}
        </Segment>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    host_id: state.usersReducer.user.id,
    neighbourhoods: state.neighbourhoodsReducer.neighbourhoods
  }
}

export default withAuth(connect(mapStateToProps, { addListing, fetchNeighbourhoods })(CreateListingForm))
