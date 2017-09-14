import {
  FETCH_COMMENTS,
  SAVE_COMMENT,
  VOTE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
} from './constants';

import api from 'src/api';
import uuidv4 from 'uuid/v4';

export const fetchComments = (id) => ({
  type: FETCH_COMMENTS,
  payload: api.get(`/posts/${id}/comments`).then(res => res.data)
})

export const saveComment = ({ author, body, parentId }) => ({
  type: SAVE_COMMENT,
  payload: api.post('/comments', {
    id: uuidv4(),
    timestamp: Date.now(),
    author,
    body,
    parentId,
  }).then(res => res.data),
})

export const voteComment = (id, option) => ({
  type: VOTE_COMMENT,
  payload:api.post(`/comments/${id}`, { option }).then(res => res.data)
})

export const updateComment = (id, { author, body }) => ({
  type: UPDATE_COMMENT,
  payload: api.put(`/comments/${id}`, {
    author,
    body,
  }).then(res => res.data),
})

export const deletePost = (id) => ({
  type: DELETE_COMMENT,
  payload: api.delete(`/comments/${id}`).then(res => id)
})