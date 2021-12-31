import React, { useState } from 'react';
import semverGte from 'semver/functions/gte';

import { Box, Text } from '$components/ui/primitives';
import { config } from '$core/constants';
import FeatureFlags from '$core/featureFlags';
import useRunOnMount from '$hooks/useRunOnMount';

const AppUpdateNeeded = () => {
  const [isAppUnsupported, setIsAppUnsupported] = useState(false);

  useRunOnMount(() => {
    const lastSupportedVersion: string = FeatureFlags.getStringValue(
      'lastSupportedAppVersion',
    );

    if (!lastSupportedVersion || lastSupportedVersion === '') {
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
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      px="global_32"
    >
      <Text variant="large" pb="global_8">
        Your app is outdated
      </Text>

      <Text textAlign="center">
        Please go update the application to access the latest features
      </Text>
    </Box>
  );
};

export default AppUpdateNeeded;
