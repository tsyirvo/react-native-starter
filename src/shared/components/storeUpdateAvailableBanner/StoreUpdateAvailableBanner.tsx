import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { config, IS_IOS } from '$domain/constants';
import { Logger } from '$infra/logger';
import { Button, Stack, Text } from '$shared/uiKit';

export const StoreUpdateAvailableBanner = () => {
  const { t } = useTranslation();

  const onPress = async () => {
    try {
      await Linking.openURL(
        IS_IOS
          ? `https://apps.apple.com/app/${config.itunesItemId}`
          : `market://details?id=${config.bundleId}&showAllReviews=true`,
      );
    } catch (error) {
      Logger.error({
        error,
        message: 'Failed to open app store to update the app',
      });
    }
  };

  return (
    <Stack gap="spacing_8" p="spacing_16" style={styles.container}>
      <Text>{t('newStoreVersionAvailable.title')}</Text>

      <Button.Text onPress={onPress}>
        {t('newStoreVersionAvailable.cta')}
      </Button.Text>
    </Stack>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.bg_base,
    borderRadius: theme.borderRadii.radius_8,
  },
}));
