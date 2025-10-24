import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import semverGte from 'semver/functions/gte';

import { config, IS_IOS } from '$domain/constants';
import {
  useGetRemoteConfigSync,
  type VersionFlagType,
} from '$infra/featureFlags';
import { Logger } from '$infra/logger';
import { useRunOnMount } from '$shared/hooks';
import { Box, Button, Text } from '$shared/uiKit';

export const AppUpdateNeeded = () => {
  const [isAppSupported, setIsAppSupported] = useState(true);

  const { t } = useTranslation();

  const { getFlagPayloadSync } = useGetRemoteConfigSync();

  useRunOnMount(() => {
    const payload = getFlagPayloadSync<VersionFlagType>(
      'last-supported-app-version',
    );

    if (!payload) {
      return;
    }

    const lastSupportedAppVersion = payload.version;

    const isSupported = semverGte(config.version, lastSupportedAppVersion);

    setIsAppSupported(isSupported);
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
        message: 'Failed to open app store to update the app',
      });
    }
  };

  if (isAppSupported) return null;

  return (
    <Box
      alignItems="center"
      bg="bg_base"
      height="100%"
      justifyContent="center"
      px="spacing_32"
      testID="appUpdateNeeded-screen"
      width="100%"
    >
      <Box pb="spacing_8">
        <Text variant="large">{t('appUpdateNedeed.title')}</Text>
      </Box>

      <Box mb="spacing_16">
        <Text style={styles.centeredText}>
          {t('appUpdateNedeed.description')}
        </Text>
      </Box>

      <Button.Text testID="appUpdateNeeded-cta" onPress={onPress}>
        {t('appUpdateNedeed.cta')}
      </Button.Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
});
