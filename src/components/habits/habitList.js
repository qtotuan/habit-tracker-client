import React from 'react'
import { Link } from 'react-router-dom'
import Habit from './habit'
import { connect } from 'react-redux'
import CurrentWeek from '../calendar/currentWeek'
import { Progress, Container, Button, Dropdown, Icon } from 'semantic-ui-react'
import completionRate from './habitCompletionRateFlexible'
import FetchCategories from '../../actions/fetchCategories'
import { bindActionCreators } from 'redux'
import { Steps, Hints } from 'intro.js-react'

class HabitList extends React.Component {
  constructor(props) {
    super()
    this.state = {
      selectedCategory: "",
      options: []
    }
  }

  componentDidMount() {
    console.log("ComponentDidMount: fetching Categories")
    this.props.fetchCategories()
  }


  handleDropdownChange = (e, result) => {
    let key = result.name
    let value = result.value
    this.setState({
      [key]: value
    })
  }

  handleClearFilter = () => {
    this.setState({
      selectedCategory: ""
    })
  }

  render() {
    const hints = [
      {
        element: '.selector1',
        hint: 'Click to create your habits here!',
        hintPosition: 'middle-right',
      }
    ];

    let sortedHabits = this.props.habits.sort((a, b) => {
      return a.id - b.id
    })


    //filter by category
    if (this.state.selectedCategory !== "") {
      sortedHabits = sortedHabits.filter( habit => {
        return habit.category.name === this.state.selectedCategory
      })
    }

    return(
      <Container>
        <Hints
          enabled={true}
          hints={hints}
        />
        <h1>Habits</h1>
          <div className='filter-wrapper'>
            <Dropdown
              label='Category'
              placeholder='Select Category'
              name='selectedCategory'
              search selection options={this.props.categories}
              onChange={this.handleDropdownChange}
            />
            <span className='force-margin'/>
            <Button onClick={this.handleClearFilter} icon="remove"></Button>
          </div>

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

          <Button className='selector1'><Link to="/habits/new">Create New Habit</Link></Button>
          <br/><br/>
        </Container>
      )
  }

}


function mapStateToProps(state) {
  console.log("Mapping State to Props", state.categories)
  return {
    // categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCategories: FetchCategories
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitList)
