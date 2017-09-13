import { TOGGLE_POST_MODAL } from './constants';

const initialState = {
  isOpen: false,
  post: {},
}

export default function post(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_POST_MODAL:
      const { isOpen, post } = action.payload;
      return {
        ...state,
        isOpen,
        post,
      }

    default:
      return state;
  }
}