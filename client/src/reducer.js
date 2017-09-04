// External Dependencies
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

// Our Dependencies
import HomeReducer from 'src/screens/Home/reducer';
import post from 'src/components/Post/model/reducer';

export default combineReducers({
  router: routerReducer,
  home: HomeReducer,
  post,
});