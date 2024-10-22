import React from 'react';
import { useTranslation } from 'react-i18next';

import { graphql } from '$gql/generated';
import { useGetPostQuery } from '$gql/generated/hooks';
import { Loader } from '$shared/uiKit/Loader';
import { Text } from '$shared/uiKit/primitives';

import { BlogPostUser } from './components/BlogPostUser';

type BlogPostProps = {
  id: string;
};

export const BlogPost = ({ id }: BlogPostProps) => {
  const { t } = useTranslation('miscScreens');
  const { data, isLoading } = useGetPostQuery({
    id,
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <Text variant="large">{t('blogPost.title')}</Text>

      <Text pt="spacing_8">{data?.post?.title}</Text>

      <BlogPostUser user={data?.post?.user} />
    </>
  );
};

BlogPost.query = graphql(`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      title
      user {
        ...UserItem
      }
    }
  }
`);
