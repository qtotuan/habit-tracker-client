import React from 'react'
import { Button } from 'semantic-ui-react'

class Logout extends React.Component {

  onLogout = () => {
    localStorage.clear()
  }

  render() {
    return(
      <Button onClick={this.onLogout}>Logout</Button>
    )
  }
}

export default Logout
