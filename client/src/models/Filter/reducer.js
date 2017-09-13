import { FILTER_POSTS, FILTER_COMMENT } from './constants';

// order: 'asc' or 'desc'
// by: 'voteScore' or 'timestamp'
const initialState = {
  post: {
    order: 'asc', 
    by: 'voteScore',
  },
  comment: {
    order: 'asc', 
    by: 'voteScore',
  }
}

export default function post (state=initialState, action) {
  const { order, by } = action;

  switch(action.type) {
    case FILTER_POSTS:
      return {
        ...state,
        post: {
          order,
          by,
        },
      };

    case FILTER_COMMENT:
      return {
        ...state,
        comment: {
          order,
          by,
        },
      };

    default: 
      return state;
  }
}