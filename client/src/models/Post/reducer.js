import {
  FETCH_POSTS,
  FETCH_POST,
  VOTE_POST,
  SAVE_POST,
  UPDATE_POST,
  DELETE_POST,
  FETCH_POST_COMMENTS,
} from './constants';

const initialState = {
  isFetching: false,
  posts: [],
  post: {},
}

export default function post(state = initialState, action) {
  switch (action.type) {
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

    case `${FETCH_POST}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };

    case `${FETCH_POST}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        post: Object.assign({}, state.post, action.payload)
      };

    case `${VOTE_POST}_FULFILLED`:
      const { posts, post } = state;
      const { id, voteScore } = action.payload;

      return {
        ...state,
        posts: posts.map(p => p.id === id ? { ...p, voteScore } : p),
        post: Object.keys(post).length > 0 ? 
          action.payload :
          Object.assign({}, state.post, { voteScore }),
      };

    case `${SAVE_POST}_FULFILLED`:
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      }

    case `${UPDATE_POST}_FULFILLED`:
      return {
        ...state,
        posts: state.posts.filter(post =>
          post.id !== action.payload.id
        ).concat(action.payload),
        post: Object.assign({}, state.post, action.payload)
      }

    case `${DELETE_POST}_FULFILLED`:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload ?
            Object.assign({}, post, { deleted: true }) :
            post
        ),
        post: Object.assign({}, state.post, { deleted: true })
      };

    case `${FETCH_POST_COMMENTS}_FULFILLED`:
      const comments = action.payload;
      const parentId = Object.keys(comments).length ? comments[0].parentId : undefined;

      if (typeof parentId === undefined) return state;

      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === parentId ? Object.assign({}, post, { comments }) : post
        )
      };

    default:
      return state;
  }
}