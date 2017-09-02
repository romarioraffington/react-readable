// Dependencies
import { FETCH_POSTS } from './constants';
import api from 'src/api';

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: api.get('/posts').then(res => res.data)
  }
}