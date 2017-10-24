import { connect } from 'react-redux';

import * as ActionTypes from 'actionTypes/postsActionTypes';
import postsSelectorByUserId from 'selectors/postsSelectors';

import Posts from './components/Posts';

const mapDispatchToProps = dispatch => {
  return {
    getPosts: () => {
      dispatch({ type: ActionTypes.FETCH_POSTS });
    },
  };
};

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    postsByUserId: postsSelectorByUserId(state),
    postsError: state.posts.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
