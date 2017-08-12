import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CurrentWeek from '../calendar/currentWeek'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SetCurrentHabit from '../../actions/setCurrentHabit'
// import FetchHabits from '../../actions/fetchHabits'

class HabitShow extends React.Component {
  // componentDidMount() {
  //   this.props.fetchHabits()
  //   this.props.setCurrentHabit(this.props.habit)
  // }

  render() {
    return(
      <div>
        <h2>{this.props.habit.title}</h2>
        <p>Description: {this.props.habit.description}</p>
        <p><CurrentWeek habit={this.props.habit}/></p>

        <br /><br />
        <Link to={`${this.props.match.url}/edit`}>Edit</Link><br /><br />
        <Link to='/habits'>Delete</Link><br /><br />
        <Link to='/habits'>Back</Link><br /><br />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const habit = state.habits.find( habit => habit.id.toString() === ownProps.match.params.habitId)
  // debugger

  if (habit) {
    return {
      habit: habit,
      // habits: state.habits
    }
  } else {
    return { habit: {title: "Not found"} }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentHabit: SetCurrentHabit,
    // fetchHabits: FetchHabits
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitShow)
