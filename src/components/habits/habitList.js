import React from 'react'
import { Link } from 'react-router-dom'
import Habit from './habit'
import { connect } from 'react-redux'
import CurrentWeek from '../calendar/currentWeek'
import { Progress, Container, Button, Dropdown, Icon } from 'semantic-ui-react'
import completionRate from './habitCompletionRateFlexible'
import FetchCategories from '../../actions/fetchCategories'
import { bindActionCreators } from 'redux'


class HabitList extends React.Component {
  constructor(props) {
    super(props)

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

          <Button><Link to="/habits/new">Create New Habit</Link></Button>
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
