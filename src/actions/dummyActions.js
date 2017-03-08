import * as types from './actionTypes';

export function firstActionCreator(first) {
  return { type: types.FIRST_ACTION, first };
}

export function secondActionCreator(second) {
  return { type: types.SECOND_ACTION, second };
}
