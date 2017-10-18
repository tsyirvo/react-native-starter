import * as ActionTypes from 'actionTypes/postsActionTypes';

const initialState = {
  error: '',
  posts: [],
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS_SUCCEEDED:
      return {
        ...state,
        posts: action.payload.data,
        error: '',
      };
    case ActionTypes.FETCH_POSTS_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default posts;
