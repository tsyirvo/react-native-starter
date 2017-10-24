import * as ActionTypes from 'actionTypes/postsActionTypes';

/* ***** *****  Fetch posts  ***** ***** */

export const fetchPostsSucceeded = data => {
  return {
    type: ActionTypes.FETCH_POSTS_SUCCEEDED,
    payload: {
      data,
    },
  };
};

export const fetchPostsFailed = error => {
  return {
    type: ActionTypes.FETCH_POSTS_FAILED,
    payload: {
      error,
    },
  };
};
