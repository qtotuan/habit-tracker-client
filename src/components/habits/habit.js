import React from 'react'
import { Link } from 'react-router-dom'

const Habit = (props) => {
  return(
    <Link to={`/habits/${props.habit.id}`}>{props.habit.title}</Link>
  )
}

export default Habit
