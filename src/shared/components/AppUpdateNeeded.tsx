import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import semverGte from 'semver/functions/gte';

import { config } from '$core/constants';
import { useRunOnMount } from '$shared/hooks/useRunOnMount';
import { Box, Text } from '$shared/uiKit/primitives';

export function AppUpdateNeeded() {
  const [isAppUnsupported, setIsAppUnsupported] = useState(false);

  const { t } = useTranslation('miscScreens');

  useRunOnMount(() => {
    // const lastSupportedVersion: string = FeatureFlags.getFlagValue(
    //   'lastSupportedAppVersion',
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

  if (!isAppUnsupported) {
    return null;
  }

  return (
    <Box
      alignItems="center"
      height="100%"
      justifyContent="center"
      px="spacing_32"
      testID="appUpdateNeeded"
      width="100%"
    >
      <Text pb="spacing_8" variant="large">
        {t('appUpdate.title')}
      </Text>

      <Text textAlign="center">{t('appUpdate.description')}</Text>
    </Box>
  );
}
