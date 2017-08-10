import React from 'react'

//Current week from Monday through Sunday
let curr = new Date //Today's Date
let week = []

for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i //getDate() is current day of the month, getDay() is day of the week (0 is Sunday, 1 is Monday, etc)
  let day = new Date(curr.setDate(first)).toUTCString()
  week.push(day)
}

class CurrentWeek extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selected_date: new Date
    }
  }

  handleClick = (event, day) => {
    console.log("Firing");
    this.setState({ selected_date: day})

    fetch(`http://localhost:3000/api/v1/habits/${this.props.habit.id}`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        // 'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => console.log(res.json()))

  }

  render() {
    console.log("State is now:", this.state.selected_date);
    return (
      <div>
        <ul>
          {week.map( day => {
            return <li key={day} onClick={(event) => this.handleClick(event, day)}>{day}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default CurrentWeek
