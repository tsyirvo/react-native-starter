import { createSelector } from 'reselect';

const posts = state => state.posts.posts;

const postsSelectorByUserIdFactory = id => {
  return createSelector(posts, postsSelected =>
    postsSelected.filter(post => post.userId === id),
  );
};

const postsSelectorByUserId = createSelector(
  postsSelectorByUserIdFactory(1),
  postsSelected => postsSelected,
);

export default postsSelectorByUserId;
