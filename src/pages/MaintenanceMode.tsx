import React, { useState } from 'react';

import { Box, Text } from '$components/ui/primitives';
import FeatureFlags from '$core/featureFlags';
import useRunOnMount from '$hooks/useRunOnMount';
import i18n from '$i18n/config';

const MaintenanceMode = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useRunOnMount(() => {
    const isMaintenanceModeEnabled =
      FeatureFlags.getBooleanValue('isMaintenanceMode');

    setIsMaintenanceMode(isMaintenanceModeEnabled);
  });

  if (!isMaintenanceMode) {
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
        {i18n.t('maintenanceMode.title')}
      </Text>

      <Text textAlign="center">{i18n.t('maintenanceMode.description')}</Text>
    </Box>
  );
};

export default MaintenanceMode;
