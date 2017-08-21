import React from 'react'
import { Link } from 'react-router-dom'
import Habit from './habit'
import { connect } from 'react-redux'
import CurrentWeek from '../calendar/currentWeek'
import { Progress, Container, Button, Dropdown } from 'semantic-ui-react'
import completionRate from './habitCompletionRateFlexible'



const options = [
  { key: 'health', text: 'Health', value: 'health' },
  { key: 'finance', text: 'Finance', value: 'finance' },
  { key: 'relationship', text: 'Relationship', value: 'relationship' }
]

class HabitList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      category: ""
    }
  }


  handleDropdownChange = (e, result) => {
    let key = result.name
    let value = result.value
    this.setState({
      [key]: value
    })
    // debugger
  }

  render() {
    let sortedHabits = this.props.habits.sort((a, b) => {
      return a.id - b.id
    })

    //filter by category
    if (this.state.category !== "") {
      sortedHabits = sortedHabits.filter( habit => {
        return habit.category.name === this.state.category
      })
    }

    // debugger
    return(
      <Container>
        <h1>Habits</h1>
        <Dropdown label='Category' placeholder='Select Category' name='category' fluid search selection options={options} onChange={this.handleDropdownChange} />

        <br/><br/>

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

}

export default HabitList
