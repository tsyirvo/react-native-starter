import React from 'react';

import { graphql } from '$gql/generated';
import { useGetPostQuery } from '$gql/generated/hooks';
import { Loader } from '$shared/uiKit/Loader';
import { Text } from '$shared/uiKit/primitives';

import { BlogPostUser } from './components/BlogPostUser';

export const BlogPost = () => {
  const { data, isLoading } = useGetPostQuery();

  if (isLoading) return <Loader />;

  return (
    <>
      <Text variant="large">Blog post fetch with GraphQL</Text>

      <Text pt="spacing_8">{data?.post?.title}</Text>

      <BlogPostUser user={data?.post?.user} />
    </>
  );
};

BlogPost.query = graphql(`
  query getPost {
    post(id: 1) {
      id
      title
      user {
        ...UserItem
      }
    }
  }
`);
