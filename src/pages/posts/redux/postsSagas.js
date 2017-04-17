import { takeLatest, call, put } from 'redux-saga/effects';

import { get } from '../../../utils/api';
import * as ActionTypes from './postsActionTypes';
import { fetchPostsSucceeded, fetchPostsFailed } from './postsActions';

export function* fetchPosts() {
  try {
    const data = yield call(get, '/posts');
    yield put(fetchPostsSucceeded(data));
  } catch (error) {
    yield put(fetchPostsFailed(error));
  }
}

export function* watchFetchData() {
  yield takeLatest(ActionTypes.FETCH_POSTS, fetchPosts);
}
