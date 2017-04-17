import { connect } from 'react-redux';

import Posts from '../components/Posts';

import * as ActionTypes from '../redux/postsActionTypes';
import { postsSelector, postsSelectorByUserId } from '../redux/postsSelectors';

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch({ type: ActionTypes.FETCH_POSTS });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    posts: postsSelector(state),
    postsByUserId: postsSelectorByUserId(state),
    postsError: state.posts.error,
  };
};

const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);

export default PostsContainer;
