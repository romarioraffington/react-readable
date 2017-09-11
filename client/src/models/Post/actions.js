// Dependencies
import {
  FETCH_POSTS,
  FILTER_POSTS,
  VOTE_POST,
  TOGGLE_ADD_POST_MODAL,
  SAVE_POST,
  UPDATE_POST,
  FETCH_POST_COMMENTS,
  DELETE_POST,
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

export const filterPost = (order, by) => ({
  type: FILTER_POSTS,
  order,
  by,
})

export const votePost = (id, option) => ({
  type: VOTE_POST,
  payload: api.post(`/posts/${id}`, { option }).then(res => res.data)
})

export const togglePostModal = (isOpen, isBeingEdited=false, post={}) => ({
  type: TOGGLE_ADD_POST_MODAL,
  payload: {
    isOpen,
    isBeingEdited,
    post,
  }
})

export const savePost = ({ title, body, author, category }) => ({
  type: SAVE_POST,
  payload: api.post('/posts', {
    id: uuidv4(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category,
  }).then(res => res.data),
})

export const updatePost = (id, {title, body }) => ({
  type: UPDATE_POST,
  payload: api.put(`/posts/${id}`, {
    title,
    body,
  }).then(res => res.data),
})

export const deletePost = (id) => ({
  type: DELETE_POST,
  id,
  payload: api.delete(`/posts/${id}`).then(res => id)
})