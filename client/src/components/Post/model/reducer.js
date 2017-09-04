import { 
  FETCH_POSTS, 
  FILTER_POSTS,
} from './constants';

import filter from 'src/app/util/filter';

const initialState = {
  isFetching: false,
  posts: [],
  error: null,
}

export default function post (state=initialState, action) {
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

    case FILTER_POSTS:
      return {
        ...state,
        posts: filter(
          state.posts.concat(),
          action.order,
          action.by,
        ),
      };

    default: 
      return state;
  }
}