// External Dependencies
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger as logger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

// Our Dependencies
import reducer from './reducer';

const middlewares = [ promise(), thunk ];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger());
}

export default createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
  )
);