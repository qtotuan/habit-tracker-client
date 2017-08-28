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

class HabitContainer extends React.Component {

  componentDidMount() {
    if (this.props.habits.length === 0) {
        this.props.fetchHabits()
    }

    if (this.props.currentUser.name === undefined && localStorage.getItem('email') !== null) {
      // debugger
      this.findUser()
    }
  }

  findUser() {
    // debugger
    fetch(`https://sheltered-reef-37337.herokuapp.com/api/v1/users`, {
      method: 'GET',
      headers: headers()
    })
    .then(res => res.json())
    .then(json => {
      let user = json.find( user => user.email === localStorage.getItem('email'))
      this.props.setUser(user)
    })

    function headers () {
      return {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('email')
      }
    }
  }

  isLoggedIn = () => {
    return !!localStorage.getItem('email')
  }

  render() {
    const { match, habits } = this.props;
    // have api only give back current user habits
    let filteredHabits = habits.filter( habit => {
      // debugger
      return habit.user.email === localStorage.getItem('email')
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
