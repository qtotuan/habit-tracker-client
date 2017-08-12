import React from 'react'
import { Link } from 'react-router-dom'
import Habit from './habit'
import { connect } from 'react-redux'
import CurrentWeek from '../calendar/currentWeek'


const HabitList = (props) => {
  debugger
  let sortedHabits = props.habits.sort

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
        )})}
      </ul>
      <Link to="/habits/new">Create New Habit</Link>
    </div>
  )
}

export default HabitList
