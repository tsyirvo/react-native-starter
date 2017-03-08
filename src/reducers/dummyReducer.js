import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dummyReducer1(state = initialState.dummy, action) {
  switch (action.type) {
    case types.FIRST_ACTION:
      return { ...state, first: action.first };

    case types.SECOND_ACTION:
      return { ...state, second: action.second };

    default:
      return state;
  }
}
