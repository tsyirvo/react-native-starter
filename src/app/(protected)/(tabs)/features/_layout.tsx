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
        options={{ title: t('tabs.features'), headerShown: false }}
      />

      <Stack.Screen
        name="(blogPost)/[blogPostId]"
        options={{
          title: t('blogPostScreen.title'),
          headerTintColor: theme.colors.content_primary,
          headerBackground: HeaderBackground,
          headerLeft: HeaderLeft,
        }}
      />

      <Stack.Screen
        name="(appRating)/prompt"
        options={{
          presentation: 'modal',
          headerShown: false,
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
