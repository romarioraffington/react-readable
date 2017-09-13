import { FETCH_CATEGORIES } from './constants';

const initialState = {
  isFetching: false,
  categories: [],
  error: null,
}

export default (state=initialState, action) => {
  switch(action.type) {

    case `${FETCH_CATEGORIES}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };

    default: 
      return state;
  }
}