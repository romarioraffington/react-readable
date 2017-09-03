// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Our Components
import Home from './screens/Home';

// Our Dependencies
import store from './store';
import styles from './index.scss';

ReactDOM.render(
  <Provider store={store}> 
    <ConnectedRouter history={createHistory()}>
      <Home />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);