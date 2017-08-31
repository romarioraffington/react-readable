import { FETCH_CATEGORIES } from './constants';

const initialState = {
  isLoading: false,
  categories: [],
  error: null,
}
export default (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_CATEGORIES}_PENDING`: 
      return {
        ...state,
        isLoading: true,
      };

    case `${FETCH_CATEGORIES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };

    case `${FETCH_CATEGORIES}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default: 
      return state;
  }
}