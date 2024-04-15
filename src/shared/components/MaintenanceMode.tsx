import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Text } from '$shared/uiKit/primitives';

export const MaintenanceMode = () => {
  const { t } = useTranslation('miscScreens');

  // TODO(prod): Save correct value to feature flag
  const isMaintenanceModeEnabled = false;
  // const isMaintenanceModeEnabled = useIsFeatureFlagEnabled('is-maintenance-mode')

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!isMaintenanceModeEnabled) {
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
};
