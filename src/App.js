import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Login from './components/users/login'
import { connect } from 'react-redux'
import FetchHabits from './actions/fetchHabits'
import { bindActionCreators } from 'redux'
import SignUpForm from './components/users/signup'

class App extends Component {

  componentDidMount() {
    if (this.props.habits.length === 0) {
        this.props.fetchHabits()
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header"><h2>Welcome to Habit Tracker!</h2></div>
        <Router>
          <div>
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={SignUpForm} />
          </div>
        </Router>
      </div>
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
