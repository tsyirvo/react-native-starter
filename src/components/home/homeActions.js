import { DUMMY_ACTION, DUMMY_ACTION2 } from './constants';

/* ***** *****  Set intents  ***** ******/

export function dummyAction(payload) {
  return {
    type: DUMMY_ACTION,
    payload,
  };
}

export function dummyAction2(payload) {
  return {
    type: DUMMY_ACTION2,
    payload,
  };
}
