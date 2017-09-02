import { 
  FETCH_CATEGORIES,
} from './constants';

const initialState = {
  isFetching: false,
  categories: [],
  error: null,
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

    default: 
      return state;
  }
}