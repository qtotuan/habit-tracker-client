import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import updateHabit from '../../actions/updateHabit'

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
    fetch(`https://sheltered-reef-37337.herokuapp.com/api/v1/habits/${this.props.habit.id}`, config)
    .then(res => res.json())
    .then(habit => {
      console.log(habit)

      // sending out an action that indcates to store that this habit has a new completed date

      // update state only if response has come back -> Pessimistic rendering
      // this.forceUdate()
    })


  }

  isSelected = (date) => {
    console.log(this.props)

    if (this.props.habit.dates_completed) {
      if (this.props.habit.dates_completed.includes(date)) {
        return "selected"
      }
    }

  }

  render() {
    // debugger

    return (
      <div>
        <ul>
          {week.map( day => {
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
