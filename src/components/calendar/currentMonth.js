import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import updateHabit from '../../actions/updateHabit'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

let curr = new Date // Today's date
let month = []
let daysInMonth = new Date(curr.getFullYear(), curr.getMonth(), 0).getDate()

for (let i = 0; i < daysInMonth; i++) {
  //getDate() is current day of the month
  //getDay() is day of the month (0 is Sunday, 1 is Monday, etc.)
  let day = new Date(curr.setDate(1 + i)).toISOString().slice(0, 10)
  month.push(day)
}

class CurrentWeek extends React.Component {

  constructor(props) {
    super()

    this.state = {
      selectedDate: new Date
    }
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

  isSelected = (date) => {
    if (this.props.habit.dates_completed) {
      if (this.props.habit.dates_completed.includes(date)) {
        return "selected"
      }
    }
  }

    render() {
      return (
        <div>
          <ul>
            {month.map( day => {
                return <li className={this.isSelected(day)} key={day} onClick={(event) => this.handleClick(event, day)}>{day}</li>
            })}
          </ul>
        </div>
      )
    }

}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateHabit: updateHabit
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(CurrentWeek)
