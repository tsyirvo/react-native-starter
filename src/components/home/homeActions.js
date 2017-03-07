import { DUMMY_ACTION } from './constants';

/* ***** *****  Set intents  ***** ******/

export function dummyAction(payload) {
  return {
    type: DUMMY_ACTION,
    payload,
  };
}

export function dummyFetch() {
  return {
    url: '/',
  };
}
