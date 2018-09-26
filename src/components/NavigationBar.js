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
  let avatarThumbUrl = null
  if (props.user.user) {
    avatarThumbUrl = props.user.user.avatar.thumb.url
  }
  const pathname = props.location.pathname
  const logOut = props.logOut

  console.log(props.user.user);
  return (
    <Menu pointing secondary>
      {loggedIn ? (
        <Fragment>
          <h2>MinorBnb</h2>
          <Menu.Item as={NavLink} to="/listings" name="Listings" active={pathname === '/listings'} />

          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/listings/new" name="Create a listing" active={pathname === '/listings/new'} />
            <Menu.Item as={NavLink} to="/reservations/" name="My Reservations" active={pathname === '/reservations/'} />
            <Menu.Item as={NavLink} to="/trips/" name="My Trips" active={pathname === '/trips/'} />
            <Menu.Item as={NavLink} to="/reviews/" name="My Reviews" active={pathname === '/reviews/'} />
            <Menu.Item as={NavLink} to="/profile" name="Profile" active={pathname === '/profile'} />
            <Menu.Item as={NavLink} to="/login" name="Logout" onClick={() => {logout(logOut)}} active={pathname === '/login'} />
            { avatarThumbUrl ? ( <img src={`${process.env.REACT_APP_API_ENDPOINT}/${avatarThumbUrl}`} /> ) : null}
          </Menu.Menu>
        </Fragment>
      ) : (
        <Fragment>
          <h2>MinorBnb</h2>
          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/signup" name="Signup" active={pathname === '/signup'} />
            <Menu.Item as={NavLink} to="/login" name="Login" active={pathname === '/login'} />
          </Menu.Menu>
        </Fragment>

      )}
    </Menu>
  )
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withRouter(connect(mapStateToProps, { logOut })(NavigationBar))
