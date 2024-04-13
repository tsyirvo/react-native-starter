import { graphql } from '$gql/generated';
import type { UserItemFragment } from '$gql/generated/hooks';
import { Box, Text } from '$shared/uiKit/primitives';

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
