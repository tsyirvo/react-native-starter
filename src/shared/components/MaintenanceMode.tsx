import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRunOnMount } from '$shared/hooks/useRunOnMount';
import { Box, Text } from '$shared/uiKit/primitives';

export function MaintenanceMode() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  const { t } = useTranslation('miscScreens');

  useRunOnMount(() => {
    // const isMaintenanceModeEnabled =
    //   FeatureFlags.getFlagValue('isMaintenanceMode');

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
      px="spacing_32"
      testID="maintenanceMode"
      width="100%"
    >
      <Text pb="spacing_8" variant="large">
        {t('maintenanceMode.title')}
      </Text>

      <Text textAlign="center">{t('maintenanceMode.description')}</Text>
    </Box>
  );
}
