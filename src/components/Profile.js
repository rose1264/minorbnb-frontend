import React from 'react'
import { connect } from 'react-redux'
import { Card, Image } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Profile = props => {
  let avatarDemoUrl = null
  if (props.user.user) {
    avatarDemoUrl = props.user.user.avatar.demo.url
  }

  return(
    <Card>
      <Image src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarDemoUrl}`} />
      <Card.Content>
        <Card.Header>{props.user.user.name}</Card.Header>
      </Card.Content>
    </Card>
  )
}


const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withAuth(connect(mapStateToProps)(Profile))
