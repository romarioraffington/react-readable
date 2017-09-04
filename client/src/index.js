// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Our Components
import App from 'src/components';

// Our Dependencies
import store from './store';
import styles from './index.scss';

ReactDOM.render(
  <Provider store={store}> 
    <ConnectedRouter history={createHistory()}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);