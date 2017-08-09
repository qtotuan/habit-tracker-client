import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { store } from './store'
import { Router, Route, browserHistory } from 'react-router'
import ConnectedHabitList from './components/habits/habitList'

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/habits" component={ConnectedHabitList}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
