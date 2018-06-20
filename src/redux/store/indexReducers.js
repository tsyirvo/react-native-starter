import { combineReducers } from 'redux';

import posts from 'reducers/postsReducer';
// Hygen goes here

import { navReducer } from 'routes/navReducer';

const rootReducer = combineReducers({
  nav: navReducer,
  posts,
  /* inject Hygen here */
});

export default rootReducer;
