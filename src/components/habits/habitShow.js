import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CurrentMonth from '../calendar/currentMonth'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SetCurrentHabit from '../../actions/setCurrentHabit'
import DeleteHabit from '../../actions/deleteHabit'
import completionRate from './habitCompletionRateFlexible'
import { Progress, Container } from 'semantic-ui-react'
import FetchHabits from '../../actions/fetchHabits'


class HabitShow extends React.Component {
  componentWillMount() {
    // console.log("In componentWillMount", ownProps.match.params.habitId);

    this.props.fetchHabits()
  }



  // componentDidMount() {
  //   console.log("componentDidMount");
  // }

  // setHabit = () => {
  //   if (this.props.currentHabit) {
  //     this.props.setCurrentHabit(this.props.habit)
  //   }
  // }

  handleDelete = () => {
    this.props.deleteHabit(this.props.habit)
  }

  render() {
    console.log(this.props.currentHabit);
    // debugger
    // {this.setHabit()}
    return(
      <Container>

        <h1>{this.props.currentHabit.title}</h1>
        <p>Description: {this.props.currentHabit.description}</p>
        {/* <p>Category: {this.props.currentHabit.category}</p> */}
        <p>{`Your goal is to perform this habit ${this.props.currentHabit.frequency} time(s) per week`}</p>
        <p><CurrentMonth habit={this.props.currentHabit}/></p>

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
  // console.log("mapStateToProps", result)
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
