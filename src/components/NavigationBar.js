import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter, Link } from 'react-router-dom'
import { Menu, Header, Icon, Dropdown } from 'semantic-ui-react'
import { logOut } from '../actions/user.js'

const logout = (func) => {
  localStorage.removeItem('jwt')
  func()
}

const NavigationBar = (props) => {
  const loggedIn = props.user.loggedIn
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
            <Menu.Item as={NavLink} to="/" name="Logout" onClick={() => {logout(logOut)}} active={pathname === '/'} >
              <Icon name='sign out alternate' />Logout
            </Menu.Item>
            <Menu.Item>

              <Dropdown  icon="user circle">
                <Dropdown.Menu>
                    <Menu.Item as={NavLink} to="/profile" name="Your Profile" active={pathname === 'profile'} />
                  <Dropdown.Header><h4>guest channel</h4></Dropdown.Header>
                    <Menu.Item as={NavLink} to="/trips/" name="My Trips" active={pathname === '/trips/'} />
                    <Menu.Item as={NavLink} to="/reviews/" name="My Reviews" active={pathname === '/reviews/'} />
                  <Dropdown.Header><h4>host channel</h4></Dropdown.Header>
                    <Menu.Item as={NavLink} to="/listings/new" name="Create a listing" active={pathname === '/listings/new'} />
                    <Menu.Item as={NavLink} to="/reservations/" name="My Reservations" active={pathname === '/reservations/'} />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
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
