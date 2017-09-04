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
import Auth from './authAdapter'
import SetUser from './actions/setUser'

class App extends Component {

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
  return {
    habits: state.habits,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchHabits: FetchHabits,
    setUser: SetUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
