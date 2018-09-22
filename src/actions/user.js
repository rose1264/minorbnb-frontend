export const loginUser = (name, password) => {
  return (dispatch) => { //thunk
    // console.log(process.env.REACT_APP_API_ENDPOINT)
    dispatch({ type: 'AUTHENTICATING_USER' })
    // fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`)
    // adapter.loginUser(username, password)
    fetch(`http://localhost:3000/api/v1/login`, { //TODO: move this to an adapter
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
      // {user: { username: 'chandler bing', bio: ''}, jwt: 'aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc'}
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
      })
      .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))

  }
}

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    dispatch(authenticatingUser()) //tells the app we are fetching
    fetch(`http://localhost:3000/api/v1/profile`, {
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
  type: 'SET_CURRENT_USER',
  payload: userData
})

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })

export const logOut = () => ({type: 'LOG_OUT'})

export const signupUser = (name, password) => {
  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATING_USER' })

    fetch(`http://localhost:3000/api/v1/users`, {
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
        dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
      })
      .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))

  }
}
