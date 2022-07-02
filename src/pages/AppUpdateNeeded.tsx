import React, { useState } from 'react';
import semverGte from 'semver/functions/gte';

import { Box, Text } from '$components/ui/primitives';
import { config } from '$core/constants';
import FeatureFlags from '$core/featureFlags';
import useRunOnMount from '$hooks/useRunOnMount';
import i18n from '$i18n/config';

const AppUpdateNeeded = () => {
  const [isAppUnsupported, setIsAppUnsupported] = useState(false);

  useRunOnMount(() => {
    const lastSupportedVersion: string = FeatureFlags.getStringValue(
      'lastSupportedAppVersion',
    );

    if (!lastSupportedVersion) {
      // We can't get last supported version, so leave the app running
      return;
    }

    const isSupported =
      semverGte(config.version, lastSupportedVersion) || false;

    setIsAppUnsupported(!isSupported);
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
      width="100%"
    >
      <Text pb="global_8" variant="large">
        {i18n.t('appUpdate.title')}
      </Text>

      <Text textAlign="center">{i18n.t('appUpdate.description')}</Text>
    </Box>
  );
};

export default AppUpdateNeeded;
