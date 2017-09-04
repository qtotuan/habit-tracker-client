import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Login from './components/users/login'
import { connect } from 'react-redux'
import FetchHabits from './actions/fetchHabits'
import { bindActionCreators } from 'redux'
import SignUpForm from './components/users/signup'
import ConnectedHabitContainer from './components/habits/habitContainer'
import Logout from './components/users/logout'
import NavBar from './components/users/navBar'
import { Helmet } from 'react-helmet'

class App extends Component {

  componentDidMount() {
    if (this.props.habits.length === 0) {
        this.props.fetchHabits()
    }
  }


  isLoggedIn = () => {
    return !!localStorage.getItem('jwt')
  }

  render() {
    return (
        <Router>
            <div>
              <Helmet>
                <title>Habit Tracker</title>
                <link href="https://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet" />
              </Helmet>
              <Route path="/habits" component={NavBar}/>
              <Route exact path='/' render={()=> this.isLoggedIn() ? <Redirect to="/habits"/> : <Login /> } />
              <Route exact path='/signup' component={SignUpForm} />
              <Route path="/habits" component={ConnectedHabitContainer}/>
            </div>
        </Router>
    );
  }
}

function mapStateToProps(state) {
  return { habits: state.habits}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchHabits: FetchHabits
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
