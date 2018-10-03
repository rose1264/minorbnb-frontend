import React from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Image } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Profile = props => {
  let avatarDemoUrl = null
  if (props.user.user) {
    avatarDemoUrl = props.user.user.avatar.demo.url
  }

  return(
    <Container>
      <Grid>
        <Grid.Column width={4}>
          <Image src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarDemoUrl}`} />
          <h3>{props.user.user.name}</h3>
        </Grid.Column>
        <Grid.Column width={12}>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Grid.Column>
      </Grid>
    </Container>

  )
}


const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withAuth(connect(mapStateToProps)(Profile))
