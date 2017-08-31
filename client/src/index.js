// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

// Our Dependencies
import store from './model/store';
import Home from './screens/Home';
import styles from './index.scss';

ReactDOM.render(
  <Provider store={store}> 
    <Home />
  </Provider>,
  document.getElementById('app')
);