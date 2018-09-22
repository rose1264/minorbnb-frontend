import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Profile = ({ name }) => (
  <Card>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
    </Card.Content>
  </Card>
)


const mapStateToProps = ({ usersReducer: { user: { name } } }) => ({
  name
})



export default withAuth(connect(mapStateToProps)(Profile))
