import { BlogPost as BlogPostComponent } from '$features/blogPost';
import { Box } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

export const BlogPost = () => (
  <Screen>
    <Box p="spacing_16">
      <BlogPostComponent />
    </Box>
  </Screen>
);
