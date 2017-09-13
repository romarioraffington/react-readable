import { FILTER_POSTS, FILTER_COMMENT } from './constants';

export const filterPost = (order, by) => ({
  type: FILTER_POSTS,
  order,
  by,
})

export const filterComment = (order, by) => ({
  type: FILTER_COMMENT,
  order,
  by,
})