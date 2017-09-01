// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

// Our Dependencies
import store from './model/store';
import Home from './screens/Home';
import styles from './index.scss';

ReactDOM.render(
  <Provider store={store}> 
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);