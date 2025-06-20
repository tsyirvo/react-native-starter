import { graphql } from '$infra/gql/generated';
import type { UserItemFragment } from '$infra/gql/generated/graphql';
import { Box, Text } from '$shared/uiKit';

export const BlogPostUser = ({ user }: { user?: UserItemFragment | null }) => {
  return (
    <Box alignItems="flex-end">
      <Text variant="medium">{user?.username}</Text>
    </Box>
  );
};

BlogPostUser.fragments = {
  user: graphql(`
    fragment UserItem on User {
      id
      username
    }
  `),
};
