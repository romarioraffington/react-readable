import {
  FETCH_POSTS,
  FETCH_POST,
  VOTE_POST,
  SAVE_POST,
  UPDATE_POST,
  FETCH_POST_COMMENTS,
  DELETE_POST,
} from './constants';

import api from 'src/api';
import uuidv4 from 'uuid/v4';

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

export const fetchPost = (id) => ({
  type: FETCH_POST,
  payload: api.get(`/posts/${id}`).then(res => res.data)
})

export const fetchPostAndComments = () => (
  dispatch => (
    dispatch(fetchPost()).then(({ value: post }) =>
      dispatch(fetchPostComment(post.id))
    )
  )
)

export const votePost = (id, option) => ({
  type: VOTE_POST,
  payload: api.post(`/posts/${id}`, { option }).then(res => res.data)
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
  payload: api.delete(`/posts/${id}`).then(res => id)
})