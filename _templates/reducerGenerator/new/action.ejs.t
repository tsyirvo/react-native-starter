---
to: src/redux/actions/<%= reducerName %>Actions.js
---
import * as ActionTypes from 'actionTypes/<%= reducerName %>ActionTypes';

/* ***** *****  Test action title  ***** ***** */

export const testActionSuccess = () => {
  return {
    type: ActionTypes.TEST_ACTION_SUCCESS,
    test: {
      test: true,
    },
  };
};

export const testActionFailure = () => {
  return {
    type: ActionTypes.TEST_ACTION_FAILURE,
  };
};