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
      alignItems="center"
      height="100%"
      justifyContent="center"
      px="global_32"
      width="100%"
    >
      <Text pb="global_8" variant="large">
        {i18n.t('maintenanceMode.title')}
      </Text>

      <Text textAlign="center">{i18n.t('maintenanceMode.description')}</Text>
    </Box>
  );
};

export default MaintenanceMode;
