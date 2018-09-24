import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
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

          <Menu.Item as={NavLink} to="/listings" name="Listings" active={pathname === '/listings'} />

          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/listings/new" name="Create a listing" active={pathname === '/listings/new'} />
            <Menu.Item as={NavLink} to="/reservations/" name="My Reservations" active={pathname === '/reservations/'} />
            <Menu.Item as={NavLink} to="/trips/" name="My Trips" active={pathname === '/trips/'} />
            <Menu.Item as={NavLink} to="/login" name="Logout" onClick={() => {logout(logOut)}} active={pathname === '/login'} />
          </Menu.Menu>
        </Fragment>
      ) : (
        <Fragment>
          <Menu.Item as={NavLink} to="/signup" name="Signup" active={pathname === '/signup'} />
          <Menu.Item as={NavLink} to="/login" name="Login" active={pathname === '/login'} />
        </Fragment>

      )}
    </Menu>
  )
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withRouter(connect(mapStateToProps, { logOut })(NavigationBar))
