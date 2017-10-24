// To be able to use Observable.stuff
import 'rxjs';
import { combineEpics } from 'redux-observable';
import watchFetchData from '../epic/postsEpic'


const rootEpic = combineEpics(
    watchFetchData,
);

export default rootEpic;
