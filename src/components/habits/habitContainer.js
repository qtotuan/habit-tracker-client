import React from 'react'
import Habit from './habit'
import { connect } from 'react-redux'
import fetchHabits from '../../actions/fetchHabits'
import fetchCategories from '../../actions/fetchCategories'
import setUser from '../../actions/setUser'
import { bindActionCreators } from 'redux'
import HabitList from './habitList'
import { Route, Switch, Redirect } from 'react-router-dom';
import ConnectedHabitShow from './habitShow'
import ConnectedHabitForm from './habitNew'
import ConnectedHabitEdit from './habitEdit'
import Chart from '../dashboard/chart'
import Auth from '../../authAdapter'

class HabitContainer extends React.Component {

  componentWillMount() {
    if (localStorage.getItem('jwt')) {
     Auth.currentUser()
       .then(user => {
         if (!user.error) {
            this.props.setUser(user.user)
          }
        }) // end then
    } // end if
  }

  componentDidMount() {
    if (this.props.habits.length === 0) {
        this.props.fetchHabits()
    }
  }

  isLoggedIn = () => {
    return !!this.props.currentUser.id
  }

  render() {
    const { match, habits } = this.props;
    // have api only give back current user habits
    let filteredHabits = habits.filter( habit => {
      return habit.user.email === this.props.currentUser.email
    })
    let categories = habits.map((habit) => {
      return habit.category.name
    })
    let uniq = a => [...new Set(a)];
    let uniqueCategories = uniq(categories).map((cat) => ({key: cat, text: cat, value: cat}))

    return(
      <div>
        <Switch>
          <Route exact path={`${match.url}`} render={() => this.isLoggedIn() ? <HabitList habits={filteredHabits} categories={uniqueCategories} /> : <Redirect to="/" />} />
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
    categories: state.categories,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHabits: bindActionCreators(fetchHabits, dispatch),
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    setUser: bindActionCreators(setUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitContainer)
