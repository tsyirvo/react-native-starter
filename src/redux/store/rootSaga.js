import { watchFetchData } from '../sagas/postsSagas';

export default function* rootSaga() {
  yield [watchFetchData()];
}
