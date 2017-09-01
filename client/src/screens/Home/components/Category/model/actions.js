import { 
  FETCH_CATEGORIES,
  UPDATE_SELECTED_CATEGORY,
} from './constants';

import api from 'src/api';

export function fetchCategories() {
  return {
    type: FETCH_CATEGORIES,
    payload: api.get('/categories').then(res => res.data.categories),
  }
}

export function updateCategory(path) {
  return {
    type: UPDATE_SELECTED_CATEGORY,
    payload: path,
  }
}