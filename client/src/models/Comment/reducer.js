import {
  FETCH_COMMENTS,
  SAVE_COMMENT,
  VOTE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
} from './constants';

const initialState = {
  isFetching: false,
  comments: [],
}

export default function post(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_COMMENTS}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };

    case `${FETCH_COMMENTS}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        comments: action.payload,
      };

    case `${SAVE_COMMENT}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };

    case `${SAVE_COMMENT}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        comments: state.comments.concat(action.payload),
      };

    case `${VOTE_COMMENT}_FULFILLED`:
    const { comments } = state;
    const { id, voteScore } = action.payload;

    return {
      ...state,
      comments: comments.map(c => c.id === id ? { ...c, voteScore } : c),
    };

    case `${DELETE_COMMENT}_FULFILLED`:
    return {
      ...state,
      comments: state.comments.map(comment =>
        comment.id === action.payload ?
          Object.assign({}, comment, { deleted: true }) :
          comment
      )
    };


    default:
      return state;
  }
}