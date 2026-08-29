import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';

import { HeaderBackground, HeaderLeft } from '$shared/components';

const FeaturesLayout = () => {
  const { t } = useTranslation();

  const { theme } = useUnistyles();

  return (
    <Stack screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: t('tabs.features') }}
      />

      <Stack.Screen
        name="(blogPost)/[blogPostId]"
        options={{
          headerBackground: HeaderBackground,
          headerLeft: HeaderLeft,
          headerTintColor: theme.colors.content_primary,
          title: t('blogPostScreen.title'),
        }}
      />
    </Stack>
  );
};

const globalScreenOptions = {
  gestureEnabled: true,
  headerShown: true,
};

export default FeaturesLayout;
