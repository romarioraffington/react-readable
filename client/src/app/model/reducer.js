// External Dependencies
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

// Our Dependencies
import ScreenReducer from 'src/screens/model/reducer';

export default combineReducers({
  screen: ScreenReducer,
  router: routerReducer,
});