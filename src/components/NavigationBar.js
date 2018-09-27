import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter, Link } from 'react-router-dom'
import { Menu, Header, Icon } from 'semantic-ui-react'
import { logOut } from '../actions/user.js'

const logout = (func) => {
  localStorage.removeItem('jwt')
  func()
}

const NavigationBar = (props) => {
  const loggedIn = props.user.loggedIn
  let avatarThumbUrl = null
  if (props.user.user) {
    avatarThumbUrl = props.user.user.avatar.thumb.url
  }
  const pathname = props.location.pathname
  const logOut = props.logOut

  return (
    <Menu pointing secondary>
      {loggedIn ? (
        <Fragment>
          <Menu.Item as={Link} to="/listings">
            <Header as='h2'>
              <Icon name='building outline' />
              <Header.Content>MinorBnb</Header.Content>
            </Header>
          </Menu.Item>
          

          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/listings/new" name="Create a listing" active={pathname === '/listings/new'} />
            <Menu.Item as={NavLink} to="/reservations/" name="My Reservations" active={pathname === '/reservations/'} />
            <Menu.Item as={NavLink} to="/trips/" name="My Trips" active={pathname === '/trips/'} />
            <Menu.Item as={NavLink} to="/reviews/" name="My Reviews" active={pathname === '/reviews/'} />
            <Menu.Item as={NavLink} to="/profile" name="Profile" active={pathname === '/profile'} />
            <Menu.Item as={NavLink} to="/login" name="Logout" onClick={() => {logout(logOut)}} active={pathname === '/login'} >
              <Icon name='sign out alternate' />Logout
            </Menu.Item>
            { avatarThumbUrl ? ( <img src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarThumbUrl}`} alt="user profile"/> ) : null}
          </Menu.Menu>
        </Fragment>
      ) : (
        <Fragment>

          <Menu.Item>
            <Header as='h2'>
              <Icon name='building outline' />
              <Header.Content>MinorBnb</Header.Content>
            </Header>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/signup" name="Signup" active={pathname === '/signup'} >
              <Icon name='user plus' />Sign Up
            </Menu.Item>
            <Menu.Item as={NavLink} to="/login" name="Login" active={pathname === '/login'} >
              <Icon name='sign in alternate' />Login In
            </Menu.Item>
          </Menu.Menu>
        </Fragment>

      )}
    </Menu>
  )
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withRouter(connect(mapStateToProps, { logOut })(NavigationBar))
