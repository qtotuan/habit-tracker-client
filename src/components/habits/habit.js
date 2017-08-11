import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import setCurrentHabit from '../../actions/setCurrentHabit'

class Habit extends React.Component {

  handleClick = (event) => {
    this.props.setCurrentHabit(this.props.habit)
  }

  render() {
    return(
      <Link onClick={this.handleClick} to={`/habits/${this.props.habit.id}`}>{this.props.habit.title}</Link>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentHabit: setCurrentHabit
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Habit)
