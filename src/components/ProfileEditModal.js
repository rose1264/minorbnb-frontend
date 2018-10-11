import React, {Component} from 'react'
import { Modal, Button, Icon, Form, Segment, Message } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import ReactDropzone from 'react-dropzone';


class ProfileEditModal extends Component {
  state = {
    name: this.props.user.name,
    email:this.props.user.email,
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
     })
  }


  handleLoginSubmit = () => {
    this.props.signupUser(this.state.name, this.state.password, this.state.avatar, this.state.email)
    this.setState({
      name: '',
      email:'',
    })
  }

  render(){
    console.log(this.props);
    return (
      <Modal trigger={<Button><Icon name='edit' />Edit</Button>}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Content>
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

              </Form.Field>
              <Button type="submit">Sign Up</Button>
            </Form>
          </Segment>
        </Modal.Content>
      </Modal>
    )

  }
}

function mapStateToProps(state){
  return {
    user: state.usersReducer.user,
  }
}

export default withAuth(connect(mapStateToProps)(ProfileEditModal))
