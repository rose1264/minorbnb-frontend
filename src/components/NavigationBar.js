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
          <Menu.Item as={NavLink} to="/profile" name="Profile" active={pathname === '/profile'} />
          <Menu.Menu position="right">
            <Menu.Item to="/login" name="Logout" onClick={() => {logout(logOut)}} />
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
