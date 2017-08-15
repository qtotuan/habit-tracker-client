import React from 'react'
import { Link } from 'react-router-dom'
import Habit from './habit'
import { connect } from 'react-redux'
import CurrentWeek from '../calendar/currentWeek'
import { Progress, Container, Button } from 'semantic-ui-react'
import completionRate from './habitCompletionRateFlexible'


const HabitList = (props) => {
  let sortedHabits = props.habits.sort((a, b) => {
    return a.id - b.id
  })


  return(
    <Container>
      <h1>My Habits</h1>

        {sortedHabits.map( habit => {
        return (
          <div key={habit.id}>
            <Habit habit={habit} />
            {completionRate(habit.dates_completed, habit.frequency)[0] > 99
              ?
               <Progress percent={completionRate(habit.dates_completed, habit.frequency)[0]} progress success />
               :
                <Progress percent={completionRate(habit.dates_completed, habit.frequency)[0]} progress />
              }
            You have completed {completionRate(habit.dates_completed, habit.frequency)[1]} out of {habit.frequency}
            <br/><br/>
            <CurrentWeek habit={habit} />
            <br/><br/>
          </div>
        )})}

      <Button><Link to="/habits/new">Create New Habit</Link></Button>
      <br/><br/>
    </Container>
  )
}

export default HabitList
