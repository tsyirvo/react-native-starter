import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import PostsList from './PostsList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const Posts = ({ posts, postsByUserId, getPosts }) => {
  return (
    <View style={styles.container}>
      <PostsList
        posts={posts}
        postsByUserId={postsByUserId}
        getPosts={() => { getPosts(); }}
      />
    </View>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
  postsByUserId: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
};

export default Posts;
