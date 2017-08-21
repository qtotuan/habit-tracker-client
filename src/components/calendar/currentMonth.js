import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import updateHabit from '../../actions/updateHabit'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { Container, Button, Icon, Label, Menu, Table } from 'semantic-ui-react'

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
  }

  componentWillMount() {
    this.setMonth()
  }

  setMonth() {
    let curr = this.state.now
    let currMonth = curr.month()
    let currYear = curr.year()
    let counter = curr.daysInMonth()
    let myMonth = []

    for (let i = 1; i <= counter; i++) {
      let d = moment([currYear, currMonth, i]).format("YYYY-MM-DD")
      myMonth.push(d)
    }
    this.setState({ month: myMonth })
  }

  addOffset = (month) => {
    month
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
        return "selected-day"
      }
    }
  }


  addOffset = (month) => {
    let newMonth = month
    let offset = moment(month[0]).day()
    if (offset === 0) {
      offset = 7
    }
    for (let i = 1; i < offset; i++) {
      newMonth.unshift("")
    }
    return newMonth
  }

  renderTable = () => {
    let all = []
    let monthWithOffset = this.addOffset(this.state.month)
    for (let i = 0; i < this.state.month.length/7; i++) {
      let cells = []
      for (let j = 0; j < 7; j++) {
        let day = monthWithOffset[(i * 7) + j]
        let needOnClick = false
        let validDate = `${this.isSelected(day)} habit-dates`
        if (day !== "" && day !== undefined) {
          needOnClick = (event) => this.handleClick(event, day)
          validDate = `${this.isSelected(day)} habit-dates valid-date`
        }
        cells.push(<Table.Cell className={validDate} key={`day #${j}`} onClick={needOnClick}>{day}</Table.Cell>)
      }
      all.push(<Table.Row cells={cells} className="month-table-body" />)
    }
    return all
  }

  render() {
    return(
      <div>
        <h3 className="month-header">{this.state.now.format("MMMM")}</h3>
        <Table>
          <Table.Body>
            {this.renderTable()}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon onClick={this.handlePrevious}>
                    <Icon name='left chevron' />
                  </Menu.Item>

                  <Menu.Item as='a' icon onClick={this.handleNext}>
                    <Icon name='right chevron' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
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
