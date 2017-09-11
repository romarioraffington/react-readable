import { 
  FETCH_POSTS, 
  FILTER_POSTS,
  VOTE_POST,
  TOGGLE_ADD_POST_MODAL,
  SAVE_POST,
  UPDATE_POST,
  FETCH_POST_COMMENTS,
} from './constants';

const initialState = {
  isFetchingPosts: false,
  isUpdatingLikes: false,
  posts: [],
  filter: {
    order: 'asc', // options: asc, desc
    by: 'voteScore', // options: voteScore, timestamp
  },
  modal: {
    isBeingEdited: false,
    isPostModalOpen: false,
    post: {},
  },
  error: null,
}

export default function post (state=initialState, action) {
  switch(action.type) {
    case `${FETCH_POSTS}_PENDING`: 
      return {
        ...state,
        isFetchingPosts: true,
      };

    case `${FETCH_POSTS}_FULFILLED`:
      return {
        ...state,
        isFetchingPosts: false,
        posts: action.payload,
      };

    case `${FETCH_POSTS}_REJECTED`:
      return {
        ...state,
        isFetchingPosts: false,
        error: action.payload,
      };

    case FILTER_POSTS:
      const { order, by } = action;
      return {
        ...state,
        filter: {
          order,
          by,
        },
      };

    case `${VOTE_POST}_PENDING`: 
      return {
        ...state,
        isUpdatingLikes: true,
      };

    case `${VOTE_POST}_FULFILLED`:
      const { posts } = state;
      const { id, voteScore } = action.payload;

      return {
        ...state,
        isUpdatingLikes: false,
        posts: posts.map(p => p.id === id ? { ...p, voteScore } : p),
      };

    case `${VOTE_POST}_REJECTED`:
      return {
        ...state,
        isUpdatingLikes: false,
        error: action.payload,
      };

    case TOGGLE_ADD_POST_MODAL:
      return {
        ...state,
        modal: {
          isPostModalOpen: action.payload.isOpen,
          isBeingEdited: action.payload.isBeingEdited,    
          post: action.payload.post,
        }
      }
 
    case SAVE_POST:
      return {
        ...state,
        posts: posts.concat(action.payload),
      }
 
    case `${UPDATE_POST}_FULFILLED`:
      return {
        ...state,
        posts: state.posts.filter(post => 
          post.id !== action.payload.id
        ).concat(action.payload)
      }

    case `${FETCH_POST_COMMENTS}_FULFILLED`:
      const comments = action.payload;
      const parentId =  Object.keys(comments).length ? comments[0].parentId : undefined;

      if (typeof parentId === undefined) return state;

      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === parentId ? Object.assign({}, post, { comments }) : post
        )
      };


    default: 
      return state;
  }
}