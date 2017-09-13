import { TOGGLE_POST_MODAL } from './constants';

export const togglePostModal = (isOpen, post={}) => ({
  type: TOGGLE_POST_MODAL,
  payload: {
    isOpen,
    post,
  }
})