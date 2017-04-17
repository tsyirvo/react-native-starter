import { createSelector } from 'reselect';

const posts = state => state.posts.posts;

export const postsSelector = createSelector(
  posts,
  postsSelected => postsSelected,
);

const postsSelectorByUserIdFactory = (id) => {
  return createSelector(
    posts,
    postsSelected => postsSelected.filter(post => post.userId === id),
  );
};

export const postsSelectorByUserId = createSelector(
  postsSelectorByUserIdFactory(1),
  postsSelected => postsSelected,
);
