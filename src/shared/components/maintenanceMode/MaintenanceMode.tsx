import React from 'react';
import { useTranslation } from 'react-i18next';

import { FeatureFlagSplitter } from '$infra/featureFlags';
import { Box, Text } from '$shared/uiKit';

interface MaintenanceModeProps {
  testID?: string;
}

export const MaintenanceMode = ({
  testID = 'MaintenanceMode',
}: MaintenanceModeProps) => {
  const { t } = useTranslation();

  return (
    <FeatureFlagSplitter flagKey="is-maintenance-mode">
      <Box
        alignItems="center"
        bg="bg_base"
        height="100%"
        justifyContent="center"
        px="spacing_32"
        testID={testID}
        width="100%"
      >
        <Text pb="spacing_8" variant="large">
          {t('maintenanceMode.title')}
        </Text>

        <Text textAlign="center">{t('maintenanceMode.description')}</Text>
      </Box>
    </FeatureFlagSplitter>
  );
};
