// External Dependencies
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger as logger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

// Our Dependencies
import reducer from './reducer';

const middlewares = [promise(), thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger());
}

export default createStore(
  reducer,
  applyMiddleware(...middlewares),
)