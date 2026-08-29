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
import { Box, Button, Stack, Text } from '$shared/uiKit';

export const AppUpdateNeeded = () => {
  const [isAppSupported, setIsAppSupported] = useState(true);

  const { t } = useTranslation();

  const { getFlagPayloadSync } = useGetRemoteConfigSync();

  useRunOnMount(() => {
    const payload = getFlagPayloadSync<VersionFlagType>(
      'last-supported-app-version',
    );

    if (!(payload && 'version' in payload)) {
      return;
    }

    const lastSupportedAppVersion = payload.version;

    const isSupported = semverGte(config.version, lastSupportedAppVersion);

    setIsAppSupported(isSupported);
  });

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

  if (isAppSupported) {
    return null;
  }

  return (
    <Box
      align="center"
      justify="center"
      px="spacing_32"
      style={styles.container}
      testID="appUpdateNeeded-screen"
    >
      <Stack pb="spacing_8">
        <Text variant="large">{t('appUpdateNedeed.title')}</Text>
      </Stack>

      <Stack mb="spacing_16">
        <Text textAlign="center">{t('appUpdateNedeed.description')}</Text>
      </Stack>

      <Button.Text onPress={onPress} testID="appUpdateNeeded-cta">
        {t('appUpdateNedeed.cta')}
      </Button.Text>
    </Box>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.bg_base,
    height: '100%',
    width: '100%',
  },
}));
