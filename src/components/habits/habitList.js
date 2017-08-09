import React from 'react'
import Habit from './habit'
import { connect } from 'react-redux'
import fetchHabits from '../../actions/fetchHabits'
import { bindActionCreators } from 'redux'

class HabitList extends React.Component {

  componentDidMount() {
    if (this.props.habits.length === 0) {
      console.log('in componentDidMount');
        this.props.fetchHabits()
      // debugger
    }
  }

  render() {
    // debugger
    return(
      <div>
        <h1>My Habits</h1>
        <ul>
          {this.props.habits.map( habit => {
          return <li><Habit habit={habit}/></li>
        })}
      </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { habits: state.habits }
}

function mapDispatchToProps(dispatch) {
  return { fetchHabits: bindActionCreators(fetchHabits, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitList)
