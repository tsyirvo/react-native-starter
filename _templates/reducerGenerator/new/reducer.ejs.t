---
to: src/redux/reducers/<%= reducerName %>Reducer.js
---
import * as ActionTypes from 'actionTypes/<%= reducerName %>ActionTypes';

const initialState = {
  test: false,
};

const <%= reducerName %> = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.TEST_ACTION_SUCCESS:
      return {
        test: payload.test,
      };
      case ActionTypes.TEST_ACTION_FAILURE:
      return {
        test: false,
      };
    default:
      return state;
  }
};

export default <%= reducerName %>;