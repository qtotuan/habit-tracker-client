import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CurrentMonth from '../calendar/currentMonth'
import { Card, Icon, Image, Button, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SetCurrentHabit from '../../actions/setCurrentHabit'
import DeleteHabit from '../../actions/deleteHabit'
import completionRate from './habitCompletionRateFlexible'
import { Progress, Container } from 'semantic-ui-react'
import FetchHabits from '../../actions/fetchHabits'
import Chart from '../dashboard/chart'
import Gif from './habitGif'


class HabitShow extends React.Component {
  componentWillMount() {
    let habitId = this.props.location.pathname.split("/")[2]
    this.props.fetchHabits(this.props.setCurrentHabit, habitId)
  }

  handleDelete = () => {
    this.props.deleteHabit(this.props.habit)
  }

  render() {
    let category = "";
    if(this.props.currentHabit !== undefined && this.props.currentHabit.category !== undefined){
      category = this.props.currentHabit.category.name;
    }

    return(
      <Container>
        <section className="habit-details">
          <h1>{this.props.currentHabit.title}</h1>
          <Gif searchTerm={this.props.currentHabit.title}/>
          <p>Description: {this.props.currentHabit.description}</p>
          <p>Category: {category}</p>
          <p>{`Your goal is to perform this habit ${this.props.currentHabit.frequency} time(s) per week`}</p>
        </section>

        <br /><br />

        <p><CurrentMonth habit={this.props.currentHabit}/></p>

        <br /><br />

        <Chart datesCompleted={this.props.currentHabit.dates_completed} target={this.props.currentHabit.frequency}/>

        <br /><br />

        <Link to={`${this.props.match.url}/edit`}>Edit</Link><br /><br />
        <Link to='/habits' onClick={this.handleDelete}>Delete</Link><br /><br />
        <Link to='/habits'>Back</Link><br /><br />
      </Container>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // debugger
  const habit = state.habits.find( habit => habit.id.toString() === ownProps.match.params.habitId)
  console.log("mapStateToProps", habit)
  let result = (habit) ? { currentHabit: habit} : { currentHabit: {title: "Not found"} }
  return result
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentHabit: SetCurrentHabit,
    deleteHabit: DeleteHabit,
    fetchHabits: FetchHabits
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitShow)
