// External Dependencies
import { combineReducers } from 'redux';

// Our Dependencies
import HomeReducer from '../Home/model/reducer';

const ScreenReducer = combineReducers({
  home: HomeReducer,
})

export default ScreenReducer;