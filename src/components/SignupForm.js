import React, { Component }from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { signupUser } from '../actions/user'
import { Container, Button, Form, Segment, Message } from 'semantic-ui-react'
import ReactDropzone from 'react-dropzone';

class SignupForm extends Component {
  state = {
    name: '',
    password: '',
    email:'',
    avatar:null,
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
     })
  }

  handleFileDrop = files => {
    this.setState({
      avatar: files[0],
    });
  };

  handleLoginSubmit = () => {
    this.props.signupUser(this.state.name, this.state.password, this.state.avatar, this.state.email)
    this.setState({
      name: '',
      password: '',
      email:'',
      avatar:null,
    })
  }

  render() {
    return this.props.loggedIn ? (
      <Redirect to="/listings" />
    ) : (
      <Container>
        <Segment>
          <Form
            onSubmit={this.handleLoginSubmit}
            size="mini"
            key="mini"
            loading={this.props.authenticatingUser}
            error={this.props.failedLogin}
          >
            <Message error header={this.props.failedLogin ? this.props.error : null} />
            <Form.Field>
              <Form.Input
                label="name"
                placeholder="name"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
              <Form.Input
                label="email"
                placeholder="email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
              <Form.Input
                type="password"
                label="password"
                placeholder="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <ReactDropzone onDrop={this.handleFileDrop} style={{position: "relative", width: 200, height: 100, border:"1px dashed grey"}}>
                <center>Drop your profile photo here</center>
              </ReactDropzone>
              {this.state.avatar ?
                <div>
                  <h2>Uploading {this.state.avatar.length} files...</h2>
                  <img width="100px" src={this.state.avatar.preview} alt="profile"/>
                </div>
                : null}
            </Form.Field>
            <Button type="submit">Sign Up</Button>
          </Form>
        </Segment>
      </Container>
    )
  }

}

const mapStateToProps = ({ usersReducer: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})

export default connect(mapStateToProps, { signupUser })(SignupForm)
