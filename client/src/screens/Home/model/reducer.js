// External Dependencies
import { combineReducers } from 'redux';

// Our Dependencies
import category from '../components/Category/model/reducer';

const HomeReducer = combineReducers({
  category,
});

export default HomeReducer;