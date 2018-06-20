import React from 'react';
import { func, arrayOf, shape, number, string } from 'prop-types';

import { SContainerRow } from 'sc/containers';

import PostsList from './PostsList';

const Posts = ({ posts, postsByUserId, getPosts }) => {
  return (
    <SContainerRow>
      <PostsList
        posts={posts}
        postsByUserId={postsByUserId}
        getPosts={getPosts}
      />
    </SContainerRow>
  );
};

Posts.propTypes = {
  getPosts: func.isRequired,
  posts: arrayOf(
    shape({
      userId: number.isRequired,
      id: number.isRequired,
      title: string.isRequired,
      body: string.isRequired,
    })
  ).isRequired,
  postsByUserId: arrayOf(
    shape({
      userId: number.isRequired,
      id: number.isRequired,
      title: string.isRequired,
      body: string.isRequired,
    })
  ).isRequired,
};

export default Posts;
