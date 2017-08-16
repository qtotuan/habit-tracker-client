import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import updateHabit from '../../actions/updateHabit'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { Container, Button } from 'semantic-ui-react'

let moment = require('moment');
moment().format();

class CurrentWeek extends React.Component {

  constructor(props) {
    super()
    this.state = {
      selectedDate: new Date,
      now: moment(),
      month: []
    }
    // debugger
  }

  componentWillMount() {
    // debugger
    this.setMonth()
  }

  setMonth() {
    // debugger
    let curr = this.state.now
    let currMonth = curr.month()
    let currYear = curr.year()
    let counter = curr.daysInMonth()
    let myMonth = []

    for (let i = 1; i <= counter; i++) {
      console.log(i);
      let d = moment([currYear, currMonth, i]).format("YYYY-MM-DD")
      myMonth.push(d)
    }
    // debugger
    this.setState({ month: myMonth })
    return myMonth
  }


  handleClick = (event, day) => {

    this.setState({ selectedDate: day})

    this.props.updateHabit(this.props.habit, { selectedDate: day})

    var config = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        // 'Authorization': localStorage.getItem('jwt')
      },
      body: JSON.stringify({ selectedDate: day})
    }

    fetch(`http://localhost:3000/api/v1/habits/${this.props.habit.id}`, config)
    .then(res => res.json())
    .then(habit => {
      console.log(habit)
    })
  }

  handleNext = (e) => {
    let newDate = this.state.now.add(1, 'months')
    this.setState({ now: newDate })
    this.setMonth()
  }

  handlePrevious = (e) => {
    let newDate = this.state.now.subtract(1, 'months')
    this.setState({ now: newDate })
    this.setMonth()
  }

  isSelected = (date) => {
    if (this.props.habit.dates_completed) {
      if (this.props.habit.dates_completed.includes(date)) {
        return "selected"
      }
    }
  }

    render() {
      // debugger
      return (
        <Container>
          <ul>
            {this.state.month.map( day => {
                return <li className={`${this.isSelected(day)} habit-dates`} key={day} onClick={(event) => this.handleClick(event, day)}>{day}</li>
            })}
          </ul>
          <Button onClick={this.handlePrevious}>Previous Month</Button>
          <Button onClick={this.handleNext}>Next Month</Button>
        </Container>
      )
    }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateHabit: updateHabit
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(CurrentWeek)
