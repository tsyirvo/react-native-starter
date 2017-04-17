import * as ActionTypes from './counterActionTypes';

/* ***** *****  Reset counter  ***** ******/

export const resetCounter = () => {
  return {
    type: ActionTypes.RESET_COUNTER,
  };
};

/* ***** *****  Increment  ***** ******/

export const increment = () => {
  return {
    type: ActionTypes.INCREMENT,
  };
};

/* ***** *****  Increment  ***** ******/

export const decrement = () => {
  return {
    type: ActionTypes.DECREMENT,
  };
};
