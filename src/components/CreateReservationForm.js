import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { addReservation } from '../actions/reservation'
import { Redirect } from 'react-router'
import { Button, Form, Segment, Container } from 'semantic-ui-react'
import ReactDropzone from 'react-dropzone';

class CreateReservationForm extends Component {
  state = {
    check_in: "",
    check_out: "",
    guest_number: 1,
    fireRedirect: false,
    file: null,
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFileDrop = files => {
    this.setState({
      file: files[0],
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addReservation(
      this.state.check_in,
      this.state.check_out,
      this.state.guest_number,
      this.props.guest_id,
      this.props.listing_id,
      this.state.file,
    );

    this.setState({
      check_in: "",
      check_out: "",
      guest_number: 1,
      fireRedirect: true,
      file: null,
    })
  }

  render() {
    const { fireRedirect } = this.state

    return (
      (this.props.host_id === this.props.guest_id ?
        null
      :
      <Container>
        <br/>
        <center><h2>Make a reservation today!</h2></center>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="check_in"
                type="date"
                name="check_in"
                onChange={this.handleChange}
                value={this.state.check_in}
              />
              <Form.Input
                label="check_out"
                type="date"
                name="check_out"
                onChange={this.handleChange}
                value={this.state.check_out}
              />
              <Form.Input
                label="guest number"
                placeholder="guest number"
                type="number"
                name="guest_number"
                onChange={this.handleChange}
                value={this.state.guest_number}
              />

              {this.state.file ?
                <div>
                  <h2>Your file has been uploaded!</h2>
                </div>
                :
                <ReactDropzone onDrop={this.handleFileDrop} style={{position: "relative", width: 200, height: 100, border:"1px dashed grey"}}>
                  <center>Upload your school release form here</center>
                </ReactDropzone>
              }
            </Form.Field>
            <Button type="submit">Add Reservation</Button>
          </Form>

          {fireRedirect && (
            <Redirect to={'/trips'} />
          )}
        </Segment>
      </Container>
      )

    )
  }
}

function mapStateToProps(state) {
  return {
    guest_id: state.usersReducer.user.id,
    listing_id: state.listingsReducer.currentListing.id,
    host_id: state.listingsReducer.currentListing.host.id,
  }
}

export default withAuth(connect(mapStateToProps, { addReservation })(CreateReservationForm))
