import React from 'react'
import { connect } from 'react-redux'
import CurrentWeek from '../calendar/currentWeek'

const HabitShow = ( props ) => {
  return(
    <div>
      <h2>{props.habit.title}</h2>
      <p>Description: {props.habit.description}</p>
      <p><CurrentWeek habit={props.habit}/></p>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  const habit = state.habits.find( habit => habit.id.toString() === ownProps.match.params.habitId)

  if (habit) {
    return { habit }
  } else {
    return { habit: {title: "Not found"} }
  }
}

export default connect(mapStateToProps)(HabitShow)
