// const baseUrl = 'http://localhost:3000/api/v1'

export default class AuthAdapter {
  static login (loginParams) {
    return fetch(process.env.REACT_APP_API + 'login', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static currentUser () {
    return fetch(process.env.REACT_APP_API + 'me', {
      headers: headers()
    })
    .then(res => {
      return res.json()
    })
  }
}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}
