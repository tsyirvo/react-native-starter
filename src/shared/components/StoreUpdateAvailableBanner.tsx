import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';

import { IS_IOS, config } from '$core/constants';
import { Logger } from '$core/logger';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';

export const StoreUpdateAvailableBanner = () => {
  const { t } = useTranslation();

  const onPress = async () => {
    try {
      // TODO(prod): Replace with real iTunes item ID
      const itunesItemId = '';

      await Linking.openURL(
        IS_IOS
          ? `https://apps.apple.com/app/apple-store/id${itunesItemId}`
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
    <Box
      bg="duller"
      borderRadius="radius_8"
      flexDirection="row"
      flexWrap="wrap"
      gap="spacing_8"
      p="spacing_16"
    >
      <Text>{t('miscScreens.newStoreVersion.title')}</Text>

      <Button.Text onPress={onPress}>
        {t('miscScreens.newStoreVersion.cta')}
      </Button.Text>
    </Box>
  );
};
