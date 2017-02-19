import { DUMMY_ACTION } from './constants';

/* ***** *****  Set intents  ***** ******/

export const dummyAction = (payload) => {
  return {
    type: DUMMY_ACTION,
    payload
  };
};
