import { combineReducers } from 'redux';

import nav from '../routes/navReducer';
import counter from '../pages/counter/redux/counterReducer';
import posts from '../pages/posts/redux/postsReducer';

const rootReducer = combineReducers({
  nav,
  counter,
  posts,
});

export default rootReducer;
