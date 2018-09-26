import { AUTHENTICATING_USER, SET_CURRENT_USER, FAILED_LOGIN, LOG_OUT } from '../types'

export const loginUser = (name, password) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })
    // adapter.loginUser(username, password)
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
      .catch(r => r.json().then(e => dispatch({ type: FAILED_LOGIN, payload: e.message })))

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

export const signupUser = (name, password, avatar) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })

    let data = new FormData();
    data.append('name', name)
    data.append('password', password)
    data.append('avatar', avatar)

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users`, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      //   Accept: 'application/json',
      // },
      body: data,
      // body: JSON.stringify({
      //   user: {
      //     name: name,
      //     password: password,
      //     avatar: avatar,
      //   }
      // })
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
      .catch(r => r.json().then(e => dispatch({ type: FAILED_LOGIN, payload: e.message })))

  }
}
