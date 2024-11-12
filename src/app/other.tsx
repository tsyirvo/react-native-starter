import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Notifications } from '$features/notifications';
import { StoreUpdateAvailableBanner } from '$shared/components/StoreUpdateAvailableBanner';
import { useIsNewStoreVersionAvailable } from '$shared/hooks';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

const OtherScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { shouldShowBanner } = useIsNewStoreVersionAvailable();

  const goToBlogPost = () => {
    router.push('/blogPost/1');
  };

  const goToDummyForm = () => {
    router.push('/dummyForm');
  };

  return (
    <>
      <Stack.Screen options={{ title: t('otherScreen.navigation.title') }} />

      <Screen testID="otherScreen-screen">
        {shouldShowBanner ? (
          <Box pb="spacing_16">
            <StoreUpdateAvailableBanner />
          </Box>
        ) : null}

        <Box borderBottomColor="bg_focus" borderBottomWidth={1} pb="spacing_16">
          <Text testID="otherScreen-blogPost-title" variant="large">
            {t('otherScreen.graphql.title')}
          </Text>

          <Box alignItems="flex-start" mt="spacing_8">
            <Button.Text
              testID="otherScreen-blogPost-navigateCta"
              onPress={goToBlogPost}
            >
              {t('otherScreen.graphql.cta')}
            </Button.Text>
          </Box>
        </Box>

        <Box borderBottomColor="bg_focus" borderBottomWidth={1} py="spacing_16">
          <Text variant="large">{t('otherScreen.form.title')}</Text>

          <Box alignItems="flex-start" mt="spacing_8">
            <Button.Text
              testID="otherScreen-dummyForm-navigateCta"
              onPress={goToDummyForm}
            >
              {t('otherScreen.form.cta')}
            </Button.Text>
          </Box>
        </Box>

        <Box borderBottomColor="bg_focus" borderBottomWidth={1} py="spacing_16">
          <Notifications />
        </Box>
      </Screen>
    </>
  );
};

export default OtherScreen;
