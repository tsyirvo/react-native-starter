import React from 'react';
import { useTranslation } from 'react-i18next';

import { useIsFeatureFlagEnabled } from '$core/featureFlags';
import { Box, Text } from '$shared/uiKit/primitives';

export const MaintenanceMode = () => {
  const { t } = useTranslation();

  const isMaintenanceModeEnabled = useIsFeatureFlagEnabled(
    'is-maintenance-mode',
  );

  if (!isMaintenanceModeEnabled) return null;

  return (
    <Box
      alignItems="center"
      bg="bg"
      height="100%"
      justifyContent="center"
      px="spacing_32"
      testID="maintenanceMode-screen"
      width="100%"
    >
      <Text pb="spacing_8" variant="large">
        {t('miscScreens.maintenanceMode.title')}
      </Text>

      <Text textAlign="center">
        {t('miscScreens.maintenanceMode.description')}
      </Text>
    </Box>
  );
};
