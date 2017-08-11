import React from 'react'
import Habit from './habit'
import { connect } from 'react-redux'
import fetchHabits from '../../actions/fetchHabits'
import { bindActionCreators } from 'redux'
import HabitList from './habitList'
import { Route, Switch } from 'react-router-dom';
import ConnectedHabitShow from './habitShow'

class HabitContainer extends React.Component {

  componentDidMount() {
    if (this.props.habits.length === 0) {
        this.props.fetchHabits()
    }
  }

  render() {
    const { match, habits } = this.props;

    return(
      <div>
        <Switch>
          <Route exact path={`${match.url}`} render={() => (
            <HabitList habits={habits} />
          )}/>
          <Route path={`${match.url}/new`} />
          <Route path={`${match.url}/:habitId`} component={ConnectedHabitShow}/>
          <Route exact path={`${match.url}`} render={() => (
            <h3>Please select a habit from the list</h3>
          )} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { habits: state.habits }
}

function mapDispatchToProps(dispatch) {
  return { fetchHabits: bindActionCreators(fetchHabits, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitContainer)
