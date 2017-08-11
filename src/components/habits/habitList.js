import React from 'react'
import Habit from './habit'
import { connect } from 'react-redux'
import CurrentWeek from '../calendar/currentWeek'


const HabitList = (props) => {

  return(
    <div>
      <h1>My Habits</h1>
      <ul>
        {props.habits.map( habit => {
        return (
          <li key={habit.id}>
            <Habit habit={habit} />
            <CurrentWeek habit={habit} />
          </li>
        )
      })}
    </ul>
    </div>
  )
}

export default HabitList
