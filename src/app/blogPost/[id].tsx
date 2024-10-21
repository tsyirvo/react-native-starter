import { Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { BlogPost as BlogPostComponent } from '$features/blogPost';
import { Screen } from '$shared/uiKit/Screen';

const BlogPostScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation('miscScreens');

  return (
    <Screen>
      <Stack.Screen
        options={{
          title: t('blogPost.screenTitle'),
        }}
      />

      <BlogPostComponent id={id} />
    </Screen>
  );
};

export default BlogPostScreen;
