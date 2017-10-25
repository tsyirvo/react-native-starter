import { getEpic } from 'utils/api';
import { Observable } from 'rxjs';
import * as ActionTypes from 'actionTypes/postsActionTypes';
import { fetchPostsSucceeded, fetchPostsFailed } from 'actions/postsActions';


const watchFetchData = action$ =>
action$
  .ofType(ActionTypes.FETCH_POSTS)
  .mergeMap(() => {
     return getEpic(`/posts`)
      .map(data => {
        return fetchPostsSucceeded(data);
      })
      .catch(error => 
       Observable.of(fetchPostsFailed(error)));
  });

export default watchFetchData

