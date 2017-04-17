import { delay } from 'redux-saga';
import { put, take, race, call, cancelled } from 'redux-saga/effects';

import * as ActionTypes from './counterActionTypes';
import { increment, decrement } from './counterActions';

//
// Both sagas include cancelation & debounce
//

// Increment Saga

export function* incrementAsync() {
  try {
    yield delay(1000);
    yield put(increment());
  } finally {
    if (yield cancelled()) {
      console.log('Reset counter was fired first'); // eslint-disable-line
    }
  }
}

export function* watchIncrementAsync() {
  try {
    while (true) { // eslint-disable-line
      yield take(ActionTypes.INCREMENT_ASYNC);

      yield race([
        call(incrementAsync),
        take(ActionTypes.RESET_COUNTER),
      ]);
    }
  } finally {
    console.log('incrementAsync terminated'); // eslint-disable-line
  }
}

// Decrement Saga

export function* decrementAsync() {
  try {
    yield delay(1000);
    yield put(decrement());
  } finally {
    if (yield cancelled()) {
      console.log('Reset counter was fired first'); // eslint-disable-line
    }
  }
}

export function* watchDecrementAsync() {
  try {
    while (true) { // eslint-disable-line
      yield take(ActionTypes.DECREMENT_ASYNC);

      yield race([
        call(decrementAsync),
        take(ActionTypes.RESET_COUNTER),
      ]);
    }
  } finally {
    console.log('incrementAsync terminated'); // eslint-disable-line
  }
}
