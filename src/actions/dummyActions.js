import * as types from './actionTypes';

export function firstActionCreator(first) {
  return { type: types.FIRST_ACTION, first };
}

export function secondActionCreator(second) {
  return { type: types.SECOND_ACTION, second };
}

export function dummyFetch() {
  return {
    url: '/',
    params: {
      test2: 'test',
      toto2: 'toto',
    },
    autoDispatchPrefix: 'DUMMY',
    onStart: (payload, meta, dispatch) => {
      dispatch(firstActionCreator(false));
    },
    onSuccess: (payload, meta, dispatch) => {
      dispatch(secondActionCreator(payload));
    },
    onError: (payload, meta, dispatch) => {
      dispatch(firstActionCreator(payload));
    },
  };
}
