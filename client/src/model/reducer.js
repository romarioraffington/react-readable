// External Dependencies
import { combineReducers } from 'redux';

// Our Dependencies
import ScreenReducer from '../screens/model/reducer';

export default combineReducers({
  screen: ScreenReducer,
});