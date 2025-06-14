import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { Notifications } from '$features/notifications';
import { StoreUpdateAvailableBanner } from '$shared/components';
import { useIsNewStoreVersionAvailable } from '$shared/hooks';
import { Box, Button, Screen, Text } from '$shared/uiKit';

const FeaturesScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { shouldShowBanner } = useIsNewStoreVersionAvailable();

  const goToBlogPost = () => {
    router.push('/features/(blogPost)/1');
  };

  return (
    <>
      <Stack.Screen options={{ title: t('tabs.features') }} />

      <Screen edges={['top']} testID="otherScreen-screen">
        <ScrollView>
          <Box px="spacing_16" py="spacing_8">
            {shouldShowBanner ? (
              <Box pb="spacing_16">
                <StoreUpdateAvailableBanner />
              </Box>
            ) : null}

            <Box
              borderBottomColor="bg_muted"
              borderBottomWidth={1}
              pb="spacing_16"
            >
              <Text variant="large">{t('otherScreen.graphql.title')}</Text>

              <Box alignItems="flex-start" mt="spacing_8">
                <Button.Text onPress={goToBlogPost}>
                  {t('otherScreen.graphql.cta')}
                </Button.Text>
              </Box>
            </Box>

            <Box
              borderBottomColor="bg_muted"
              borderBottomWidth={1}
              py="spacing_16"
            >
              <Notifications />
            </Box>
          </Box>
        </ScrollView>
      </Screen>
    </>
  );
};

export default FeaturesScreen;
