import { 
  FETCH_CATEGORIES,
  UPDATE_SELECTED_CATEGORY,
} from './constants';

const initialState = {
  isFetching: false,
  categories: [],
  error: null,
  selected: '/',
}

export default (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_CATEGORIES}_PENDING`: 
      return {
        ...state,
        isFetching: true,
      };

    case `${FETCH_CATEGORIES}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };

    case `${FETCH_CATEGORIES}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case UPDATE_SELECTED_CATEGORY:
      return {
        ...state,
        selected: action.payload,
      };

    default: 
      return state;
  }
}