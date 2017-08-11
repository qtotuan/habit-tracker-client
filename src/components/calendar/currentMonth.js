import React from 'react'
import { connect } from 'react-redux'

//Current month from Monday through Sunday
let curr = new Date //Today's Date
let month = []

for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i //getDate() is current day of the month, getDay() is day of the month (0 is Sunday, 1 is Monday, etc)
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
  month.push(day)
}

class CurrentMonth extends React.Component {

  constructor(props) {
    super()

    this.state = {
      selectedDate: new Date
    }
  }

  handleClick = (event, day) => {
    this.setState({ selectedDate: day})

    var init = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        // 'Authorization': localStorage.getItem('jwt')
      },
      body: JSON.stringify({ selectedDate: day})
    }

    fetch(`http://localhost:3000/api/v1/habits/${this.props.habit.id}`, init)
    .then(res => console.log(res.json()))

    this.forceUpdate()
  }

  isSelected = (date) => {
    if (this.props.habit.dates_completed.includes(date)) {
      return "selected"
    }
  }

  render() {
    // debugger

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


export default CurrentMonth
