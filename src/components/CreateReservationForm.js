import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { addReservation } from '../actions/reservation'
import { Redirect } from 'react-router'
import { Button, Form, Segment, Container } from 'semantic-ui-react'
import ReactDropzone from 'react-dropzone';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

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
              <p><strong>choose your check in & check out date here</strong></p>
              <DateRangePicker
                startDate={this.state.check_in}
                startDateId="start"
                endDateId="end"
                endDate={this.state.check_out}
                onDatesChange={({ startDate, endDate }) => {
                  this.setState({
                    check_in: startDate,
                    check_out: endDate,
                  })
                }}
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
              />
              <br/>
              <br/>
              <p><strong>choose the guest number here</strong></p>
              <Form.Input
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
                <div>
                  <p><strong>upload the school release file need to be signed by the host</strong></p>
                  <ReactDropzone onDrop={this.handleFileDrop} style={{position: "relative", width: 200, height: 100, border:"1px dashed grey"}}>
                    <center>upload file here</center>
                  </ReactDropzone>
                </div>
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
