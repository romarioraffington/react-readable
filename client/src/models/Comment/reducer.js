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

    default:
      return state;
  }
}