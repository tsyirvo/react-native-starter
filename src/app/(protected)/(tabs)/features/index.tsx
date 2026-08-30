import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Notifications } from '$features/notifications';
import { Screen, StoreUpdateAvailableBanner } from '$shared/components';
import { useIsNewStoreVersionAvailable } from '$shared/hooks';
import { Box, Button, Stack, Text } from '$shared/uiKit';

const FeaturesScreen = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { shouldShowBanner } = useIsNewStoreVersionAvailable();

  const onScreenTitleShowcasePress = () => {
    router.push('/features/ScreenTitleShowcase');
  };

  return (
    <Screen edges={['top']} testID="otherScreen-screen">
      <ScrollView>
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
              <Text variant="large">
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
      </ScrollView>
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
