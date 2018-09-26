import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { signupUser } from '../actions/user'
import { Button, Form, Segment, Message } from 'semantic-ui-react'

class SignupForm extends React.Component {
  state = { name: '', password: '', avatar:null }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
     })
  }

  handleFileUpload = e => {
    this.setState({
      avatar: e.target.files[0],
    });
  };

  handleLoginSubmit = () => {
    this.props.signupUser(this.state.name, this.state.password, this.state.avatar)
    this.setState({ name: '', password: '', avatar:null })
  }

  render() {
    return this.props.loggedIn ? (
      <Redirect to="/listings" />
    ) : (
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
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <Form.Input
              type="file"
              name="avatar"
              onChange={this.handleFileUpload}
            />
          </Form.Field>
          <Button type="submit">Sign Up</Button>
        </Form>
      </Segment>
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
