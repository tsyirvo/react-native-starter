import { graphql } from '$infra/gql/generated';
import type { UserItemFragment } from '$infra/gql/generated/graphql';
import { Stack, Text } from '$shared/uiKit';

export const BlogPostUser = ({ user }: { user?: UserItemFragment | null }) => (
  <Stack align="flex-end">
    <Text variant="medium">{user?.username}</Text>
  </Stack>
);

BlogPostUser.fragments = {
  user: graphql(`
    fragment UserItem on User {
      id
      username
    }
  `),
};
