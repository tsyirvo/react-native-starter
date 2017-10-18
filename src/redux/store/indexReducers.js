import { combineReducers } from 'redux';

import nav from 'reducers/navReducer';
import posts from 'reducers/postsReducer';

const rootReducer = combineReducers({
  nav,
  posts,
});

export default rootReducer;
