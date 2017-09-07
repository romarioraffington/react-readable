import { 
  FETCH_POSTS, 
  FILTER_POSTS,
  VOTE_POST,
  TOGGLE_ADD_POST_MODAL,
} from './constants';

const initialState = {
  isFetchingPosts: false,
  isUpdatingLikes: false,
  posts: [],
  filter: {
    order: 'asc', // options: asc, desc
    by: 'voteScore', // options: voteScore, timestamp
  },
  isPostModalOpen: false,
  error: null,
}

export default function post (state=initialState, action) {
  switch(action.type) {
    case `${FETCH_POSTS}_PENDING`: 
      return {
        ...state,
        isFetchingPosts: true,
      };

    case `${FETCH_POSTS}_FULFILLED`:
      return {
        ...state,
        isFetchingPosts: false,
        posts: action.payload,
      };

    case `${FETCH_POSTS}_REJECTED`:
      return {
        ...state,
        isFetchingPosts: false,
        error: action.payload,
      };

    case FILTER_POSTS:
      const { order, by } = action;
      return {
        ...state,
        filter: {
          order,
          by,
        },
      };

    case `${VOTE_POST}_PENDING`: 
      return {
        ...state,
        isUpdatingLikes: true,
      };

    case `${VOTE_POST}_FULFILLED`:
      const { posts } = state;
      const { id, voteScore } = action.payload;

      return {
        ...state,
        isUpdatingLikes: false,
        posts: posts.map(p => p.id === id ? { ...p, voteScore } : p),
      };

    case `${VOTE_POST}_REJECTED`:
      return {
        ...state,
        isUpdatingLikes: false,
        error: action.payload,
      };

    case TOGGLE_ADD_POST_MODAL:
      return {
        ...state,
        isPostModalOpen: action.payload,
      }
 
    default: 
      return state;
  }
}