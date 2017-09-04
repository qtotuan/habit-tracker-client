import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ClearUser from '../../actions/clearUser'

class NavBar extends Component {

  constructor(props) {
    super(props)

    this.state = { activeItem: 'all listings' }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  isLoggedIn = () => {
    return !!this.props.currentUser.id
  }

  handleLogout = () => {
    localStorage.clear()
    this.props.clearUser({})
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Link to='/habits' ><Menu.Item name='all habits' active={activeItem === 'all habits'} onClick={this.handleItemClick} /></Link>
          <Link to='/habits/new' ><Menu.Item name='create new habit' active={activeItem === 'create new habit'} onClick={this.handleItemClick} /></Link>


          <Menu.Menu position='right'>
            {this.isLoggedIn() ? <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleLogout} />
            : null}
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearUser: ClearUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
