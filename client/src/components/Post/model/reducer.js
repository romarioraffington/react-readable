import { FETCH_POSTS } from './constants';

const initialState = {
  isFetching: false,
  posts: [],
  error: null,
}

export default function posts (state=initialState, action) {
  switch(action.type) {
    case `${FETCH_POSTS}_PENDING`: 
      return {
        ...state,
        isFetching: true,
      };

    case `${FETCH_POSTS}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
      };

    case `${FETCH_POSTS}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default: 
      return state;
  }
}