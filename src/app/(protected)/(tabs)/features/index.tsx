import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Notifications } from '$features/notifications';
import { Screen, StoreUpdateAvailableBanner } from '$shared/components';
import { useIsNewStoreVersionAvailable } from '$shared/hooks';
import { Box, ScreenTitle } from '$shared/uiKit';

const FeaturesScreen = () => {
  const { t } = useTranslation();

  const { shouldShowBanner } = useIsNewStoreVersionAvailable();

  return (
    <>
      <ScreenTitle isLarge title={t('tabs.features')} />

      <Screen testID="otherScreen-screen">
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Box px="spacing_16" py="spacing_8">
            {shouldShowBanner ? (
              <Box pb="spacing_16">
                <StoreUpdateAvailableBanner />
              </Box>
            ) : null}

            <View style={styles.section}>
              <Notifications />
            </View>
          </Box>
        </ScrollView>
      </Screen>
    </>
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
