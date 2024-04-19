import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import semverGte from 'semver/functions/gte';

import { config, IS_IOS } from '$core/constants';
import { Logger } from '$core/logger';
import { useRunOnMount } from '$shared/hooks/useRunOnMount';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';

export const AppUpdateNeeded = () => {
  const [isAppUnsupported, setIsAppUnsupported] = useState(false);

  const { t } = useTranslation('miscScreens');

  // const flagsmith = useFlagsmith();

  useRunOnMount(() => {
    // TODO(prod): Save correct value to feature flag
    // const lastSupportedVersion = flagsmith.getValue(
    //   'last-supported-app-version',
    // );

    // if (!lastSupportedVersion) {
    //   // We can't get last supported version, so leave the app running
    //   return;
    // }

    const lastSupportedVersion = '1.0.0';

    if (typeof config.version === 'string') {
      const isSupported =
        semverGte(config.version, lastSupportedVersion) || false;

      setIsAppUnsupported(!isSupported);
    }
  });

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
        message: 'Failed to open app store',
        level: 'warning',
      });
    }
  };

  if (!isAppUnsupported) {
    return null;
  }

  return (
    <Box
      alignItems="center"
      height="100%"
      justifyContent="center"
      px="spacing_32"
      testID="appUpdateNeeded-screen"
      width="100%"
    >
      <Text pb="spacing_8" variant="large">
        {t('appUpdate.title')}
      </Text>

      <Text mb="spacing_16" textAlign="center">
        {t('appUpdate.description')}
      </Text>

      <Button.Text onPress={onPress}>
        {t('updateAvailable.banner.updateCta', { ns: 'settings' })}
      </Button.Text>
    </Box>
  );
};
