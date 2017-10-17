import { watchIncrementAsync, watchDecrementAsync } from '../pages/counter/redux/counterSagas';
import { watchFetchData } from '../pages/posts/redux/postsSagas';

export default function* rootSaga() {
  yield [
    watchIncrementAsync(),
    watchDecrementAsync(),
    watchFetchData(),
  ];
}
