import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import {
  StoreUpdateAvailableBanner,
  useIsNewStoreVersionAvailable,
} from '$application/appAvailability';
import { Notifications } from '$features/notifications';
import { Screen, ScreenScrollView } from '$shared/components';
import { Button } from '$shared/uiKit/button';
import { Box, Stack, Text } from '$shared/uiKit/primitives';

const FeaturesScreen = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { shouldShowBanner } = useIsNewStoreVersionAvailable();

  const onScreenTitleShowcasePress = () => {
    router.push('/features/screen-title-showcase');
  };

  return (
    <Screen testID="otherScreen-screen">
      <ScreenScrollView>
        <Box gap="spacing_16" px="spacing_16" py="spacing_8">
          {shouldShowBanner ? (
            <Box pb="spacing_16">
              <StoreUpdateAvailableBanner />
            </Box>
          ) : null}

          <View style={styles.section}>
            <Notifications />
          </View>

          <View style={styles.section}>
            <Stack gap="spacing_8">
              <Text isHeading variant="large">
                {t('featuresScreen.screenTitleShowcase.title')}
              </Text>

              <Text color="content_secondary">
                {t('featuresScreen.screenTitleShowcase.description')}
              </Text>

              <Box self="flex-start">
                <Button.Text
                  onPress={onScreenTitleShowcasePress}
                  testID="ScreenTitleShowcaseButton"
                >
                  {t('featuresScreen.screenTitleShowcase.cta')}
                </Button.Text>
              </Box>
            </Stack>
          </View>
        </Box>
      </ScreenScrollView>
    </Screen>
  );
};

export default FeaturesScreen;

const styles = StyleSheet.create((theme) => ({
  section: {
    borderBottomColor: theme.colors.bg_muted,
    borderBottomWidth: 1,
    paddingBottom: theme.spacing.spacing_16,
  },
}));
