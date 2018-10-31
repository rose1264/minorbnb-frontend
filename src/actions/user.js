import { AUTHENTICATING_USER, SET_CURRENT_USER, FAILED_LOGIN, LOG_OUT } from '../types'

export const loginUser = (name, password) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: name,
          password: password
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: SET_CURRENT_USER, payload: JSONResponse.user })
      })
      .catch(e => dispatch({ type: FAILED_LOGIN, payload: e.message }))

  }
}

export const fetchCurrentUser = () => {
  return (dispatch) => {
    dispatch(authenticatingUser())
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) => dispatch(setCurrentUser(JSONResponse.user)))
  }
}

export const setCurrentUser = (userData) => ({
  type: SET_CURRENT_USER,
  payload: userData
})

export const failedLogin = (errorMsg) => ({
  type: FAILED_LOGIN,
  payload: errorMsg
})

export const authenticatingUser = () => ({ type: AUTHENTICATING_USER })

export const logOut = () => ({type: LOG_OUT })

export const signupUser = (name, password, avatar, email) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })

    let data = new FormData()
    data.append('name', name)
    data.append('email', email)
    data.append('password', password)
    data.append('avatar', avatar)

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users`, {
      method: 'POST',
      body: data,
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: SET_CURRENT_USER, payload: JSONResponse.user })
      })
      .catch(e => dispatch({ type: FAILED_LOGIN, payload: e.message }))

  }
}
