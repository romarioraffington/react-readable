import { 
  FETCH_CATEGORIES,
  UPDATE_SELECTED_CATEGORY,
} from './constants';

import api from 'src/api';

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
  payload: api.get('/categories').then(res => res.data.categories),
})