// External Dependencies
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

// Reducers
import post from 'src/models/Post/reducer';
import category from 'src/models/Category/reducer';
import postModal from 'src/models/PostModal/reducer';
import filter from 'src/models/Filter/reducer';

export default combineReducers({
  router: routerReducer,
  post,
  category,
  postModal,
  filter,
});