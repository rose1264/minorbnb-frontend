import React from 'react'
import { connect } from 'react-redux'
import { Image } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Profile = props => {
  let avatarDemoUrl = null
  if (props.user.user) {
    avatarDemoUrl = props.user.user.avatar.demo.url
  }

  return(
    <center>
      <Image src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarDemoUrl}`} />
      <h3>{props.user.user.name}</h3>
    </center>
  )
}


const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withAuth(connect(mapStateToProps)(Profile))
