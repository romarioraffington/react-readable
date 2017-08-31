// External Dependencies
import { combineReducers } from 'redux';

// Our Dependencies
import category from '../components/Category/model/reducer';
import post from 'src/components/Post/model/reducer';

const HomeReducer = combineReducers({
  category,
  post,
});

export default HomeReducer;