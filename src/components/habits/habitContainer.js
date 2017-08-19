import React from 'react'
import Habit from './habit'
import { connect } from 'react-redux'
import fetchHabits from '../../actions/fetchHabits'
import { bindActionCreators } from 'redux'
import HabitList from './habitList'
import { Route, Switch, Redirect } from 'react-router-dom';
import ConnectedHabitShow from './habitShow'
import ConnectedHabitForm from './habitNew'
import ConnectedHabitEdit from './habitEdit'
import Chart from '../dashboard/chart'

class HabitContainer extends React.Component {

  componentDidMount() {
    if (this.props.habits.length === 0) {
        this.props.fetchHabits()
    }
  }

  isLoggedIn = () => {
    return !!localStorage.getItem('email')
  }

  render() {
    const { match, habits } = this.props;

    let filteredHabits = habits.filter( habit => {
      // debugger
      return habit.user.email === localStorage.getItem('email')
    })

    return(
      <div>
        <Switch>
          <Route exact path={`${match.url}`} render={() => this.isLoggedIn() ? <HabitList habits={filteredHabits} /> : <Redirect to="/" />} />
          <Route path={`${match.url}/new`} render={() => this.isLoggedIn() ? <ConnectedHabitForm /> : <Redirect to="/" />} />
          <Route path={`${match.url}/:habitId/edit`} render={() => this.isLoggedIn() ? <ConnectedHabitEdit /> : <Redirect to="/" />} />
          <Route path={`${match.url}/:habitId`} component={ConnectedHabitShow} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    habits: state.habits,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return { fetchHabits: bindActionCreators(fetchHabits, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitContainer)
