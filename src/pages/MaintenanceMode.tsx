import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Text } from '$components/ui/primitives';
import useRunOnMount from '$hooks/useRunOnMount';

const MaintenanceMode = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  const { t } = useTranslation('miscScreens');

  useRunOnMount(() => {
    // const isMaintenanceModeEnabled =
    //   FeatureFlags.getBooleanValue('isMaintenanceMode');

    const isMaintenanceModeEnabled = false;

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
      testID="maintenanceMode"
      width="100%"
    >
      <Text pb="global_8" variant="large">
        {t('maintenanceMode.title')}
      </Text>

      <Text textAlign="center">{t('maintenanceMode.description')}</Text>
    </Box>
  );
};

export default MaintenanceMode;
