// Dependencies
import { 
  FETCH_POSTS, 
  FILTER_POSTS,
  VOTE_POST,
  TOGGLE_ADD_POST_MODAL,
} from './constants';

import api from 'src/api';
import filter from 'src/app/util/filter';

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: api.get('/posts').then(res => filter(res.data))
  }
}

export function filterPost(order, by) {
  return {
    type: FILTER_POSTS,
    order,
    by,
  }
}

export function votePost(id, option) {
  return {
    type: VOTE_POST,
    payload: api.post(`/posts/${id}`, { option: option }).then(res => res.data)
  }
}

export function togglePostModal(isOpen) {
  return {
    type: TOGGLE_ADD_POST_MODAL,
    payload: isOpen,
  }
}