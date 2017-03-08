import { combineReducers } from 'redux';

import nav from './navReducer';
import dummyReducer from './dummyReducer';

const rootReducer = combineReducers({
  nav,
  dummyReducer,
});

export default rootReducer;
