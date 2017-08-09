import React from 'react'

const Habit = (props) => {
  return(
    <div>{props.habit.name}: (props.habit.description}</div>
  )
}

export default Habit
