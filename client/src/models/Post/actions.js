// Dependencies
import {
  FETCH_POSTS,
  FILTER_POSTS,
  VOTE_POST,
  TOGGLE_ADD_POST_MODAL,
  SAVE_POST,
  FETCH_POST_COMMENTS,
} from './constants';

import api from 'src/api';
import uuidv4 from 'uuid/v4';
import filter from 'src/app/util/filter';


export const fetchPostComment = (id) => ({
  type: FETCH_POST_COMMENTS,
  payload: api.get(`/posts/${id}/comments`).then(res => res.data)
})

export const fetchPosts = () => ({
  type: FETCH_POSTS,
  payload: api.get('/posts').then(res => res.data)
})

export const fetchPostsAndComments = () => (
  dispatch => (
    dispatch(fetchPosts()).then(({ value: posts }) =>
      posts.map(post => dispatch(fetchPostComment(post.id)))
    )
  )
)

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

export function savePost({ title, body, author, category }) {
  return {
    type: SAVE_POST,
    payload: api.post('/posts', {
      id: uuidv4(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
    }).then(res => res.data),
  }
}