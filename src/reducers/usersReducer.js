import { AUTHENTICATING_USER, SET_CURRENT_USER, FAILED_LOGIN, LOG_OUT, AUTHENTICATED_USER } from '../types'

const defaultState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null
}

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {

    case SET_CURRENT_USER:
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }
    case AUTHENTICATING_USER:
      return { ...state, authenticatingUser: true }
    case AUTHENTICATED_USER:
      return { ...state, authenticatingUser: false }
    case FAILED_LOGIN:
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      }
    case LOG_OUT:
      return defaultState
    default:
      return state
  }
}

export default usersReducer
