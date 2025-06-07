import React from 'react';
import { useTranslation } from 'react-i18next';

import { graphql } from '$infra/gql/generated';
import { useGetPostQuery } from '$infra/gql/generated/hooks';
import { Loader, Text } from '$shared/uiKit';

import { BlogPostUser } from './components/BlogPostUser';

interface BlogPostProps {
  id: string;
}

export const BlogPost = ({ id }: BlogPostProps) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetPostQuery({
    id,
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <Text variant="large">{t('miscScreens.blogPost.title')}</Text>

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
