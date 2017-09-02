// External Dependencies
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

// Our Dependencies
import category from './Category/reducer';
import post from './Post/reducer';

export default combineReducers({
  router: routerReducer,
  category,
  post,
});