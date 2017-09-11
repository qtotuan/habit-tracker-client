import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import updateHabit from '../../actions/updateHabit'
import { Grid, Image, Table, Divider } from 'semantic-ui-react'

var moment = require('moment');
moment().format();

//Current week from Monday through Sunday
let curr = new Date //Today's Date
let week = []

for (let i = 1; i <= 7; i++) {
  //getDate() is current day of the month
  //getDay() is day of the week (0 is Sunday, 1 is Monday, etc.)
  let first = curr.getDate() - curr.getDay() + i
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
  week.push(day)
}

class CurrentWeek extends React.Component {

  constructor(props) {
    super()

    this.state = {
      selectedDate: new Date
    }
  }

  handleClick = (event, day) => {


    // send something to backend
    // also
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

    // update state even though response come back  -> Optimistic rendering
    fetch(process.env.REACT_APP_API + `habits/${this.props.habit.id}`, config)
    .then(res => res.json())
    .then(habit => {
      console.log(habit)

      // sending out an action that indcates to store that this habit has a new completed date

      // update state only if response has come back -> Pessimistic rendering
      // this.forceUdate()
    })


  }

  isSelected = (day) => {
    if (this.props.habit.dates_completed && this.props.habit.dates_completed.includes(day))
        return "selected-day"
  }

  // getClassNames = (day) => (
  //   {selected: this.isSelected(day),
  //   "habit-dates": true}
  // )


  render() {
    return (
      <div>
        <Table celled>
          <Table.Body>
            <Table.Row className="current-week-table">
            {week.map( day => {
              let weekday = moment(day)
              return <Table.Cell className="weekdays" key={day}>{weekday.format("dd")}</Table.Cell>
              })}
            </Table.Row>

            <Table.Row className="current-week-table last-row">
            {week.map( day => {
              let needOnClick = false
              let validDate = [`${this.isSelected(day)} habit-dates`]
              let dayDisplay = parseInt(day.split("-")[2])
              if (moment(day) <= moment()) {
                needOnClick = (event) => this.handleClick(event, day)
                validDate.push("valid-date")
              } else {
                validDate.push("unselectable-date")
              }
              return <Table.Cell className={validDate.join(" ")} key={day} onClick={needOnClick}>{dayDisplay}</Table.Cell>
            })}
            </Table.Row>
          </Table.Body>
        </Table>
        <div className="last-row" />
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




// I am inside store

//
// state = {
//   habits: [
//     {
//       title: "Floss",
//       dateCompleted: [
//         "Tuesday", "Friday", "Monday"
//       ]
//     }
//   ]
// }
