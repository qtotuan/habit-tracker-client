import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import 'intro.js/introjs.css'

import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
