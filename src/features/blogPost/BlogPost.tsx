import React from 'react';
import { useTranslation } from 'react-i18next';

import { graphql } from '$gql/generated';
import { useGetPostQuery } from '$gql/generated/hooks';
import { Loader } from '$shared/uiKit/Loader';
import { Text } from '$shared/uiKit/primitives';

import { BlogPostUser } from './components/BlogPostUser';

export const BlogPost = () => {
  const { t } = useTranslation('miscScreens');
  const { data, isLoading } = useGetPostQuery();

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
