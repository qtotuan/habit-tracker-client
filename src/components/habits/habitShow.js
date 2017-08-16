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


class HabitShow extends React.Component {
  componentDidMount() {
    this.props.setCurrentHabit(this.props.habit)
  }

  handleDelete = () => {
    this.props.deleteHabit(this.props.habit)
  }

  render() {
    return(
      <Container>
        <h2>{this.props.habit.title}</h2>
        <p>Description: {this.props.habit.description}</p>
        <p>{`Your goal is to perform this habit ${this.props.habit.frequency} time(s) per week`}</p>
        <p><CurrentMonth habit={this.props.habit}/></p>

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
  return (habit) ? { habit: habit} : { habit: {title: "Not found"} }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentHabit: SetCurrentHabit,
    deleteHabit: DeleteHabit
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitShow)
