import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import semverGte from 'semver/functions/gte';

import { Box, Text } from '$components/ui/primitives';
import { config } from '$core/constants';
import useRunOnMount from '$hooks/useRunOnMount';

const AppUpdateNeeded = () => {
  const [isAppUnsupported, setIsAppUnsupported] = useState(false);

  const { t } = useTranslation('miscScreens');

  useRunOnMount(() => {
    // const lastSupportedVersion: string = FeatureFlags.getStringValue(
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
      px="global_32"
      testID="appUpdateNeeded"
      width="100%"
    >
      <Text pb="global_8" variant="large">
        {t('appUpdate.title')}
      </Text>

      <Text textAlign="center">{t('appUpdate.description')}</Text>
    </Box>
  );
};

export default AppUpdateNeeded;
