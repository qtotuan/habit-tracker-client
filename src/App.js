import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/users/login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Habit Tracker!</h2>
          <Login />
        </div>
      </div>
    );
  }
}

export default App
