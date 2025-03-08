import { Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { BlogPost as BlogPostComponent } from '$features/blogPost';
import { Screen } from '$shared/uiKit';

const BlogPostScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen
        options={{
          title: t('miscScreens.blogPost.screenTitle'),
        }}
      />

      <Screen px="spacing_16" py="spacing_8">
        <BlogPostComponent id={id} />
      </Screen>
    </>
  );
};

export default BlogPostScreen;
