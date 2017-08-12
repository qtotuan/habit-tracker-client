import React from 'react'
import { Link } from 'react-router-dom'
import Habit from './habit'
import { connect } from 'react-redux'
import CurrentWeek from '../calendar/currentWeek'


const HabitList = (props) => {
  let sortedHabits = props.habits.sort((a, b) => {
    return a.id - b.id
  })

  return(
    <div>
      <h1>My Habits</h1>
      <ul>
        {sortedHabits.map( habit => {
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
