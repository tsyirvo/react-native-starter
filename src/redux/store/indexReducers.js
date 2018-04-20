import { combineReducers } from 'redux';

import nav from 'reducers/navReducer';
import posts from 'reducers/postsReducer';
// Hygen goes here

const rootReducer = combineReducers({
  nav,
  posts,
  /* inject Hygen here */
});

export default rootReducer;
