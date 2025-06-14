import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useAppTheme } from '$domain/theme';
import { HeaderBackground, HeaderLeft } from '$shared/components';

const FeaturesLayout = () => {
  const { t } = useTranslation();

  const { colors } = useAppTheme();

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
          headerTintColor: colors.content_primary,
          headerBackground: HeaderBackground,
          headerLeft: HeaderLeft,
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
