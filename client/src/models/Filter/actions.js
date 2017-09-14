import { FILTER_POSTS, FILTER_COMMENTS } from './constants';

export const filterPost = (order, by) => ({
  type: FILTER_POSTS,
  order,
  by,
})

export const filterComments = (order, by) => ({
  type: FILTER_COMMENTS,
  order,
  by,
})