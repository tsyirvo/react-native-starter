import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { FeatureFlagSplitter } from '$infra/featureFlags';
import { Box, Stack, Text } from '$shared/uiKit';

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
        align="center"
        justify="center"
        px="spacing_32"
        testID={testID}
        style={styles.container}
      >
        <Stack pb="spacing_8">
          <Text variant="large">{t('maintenanceMode.title')}</Text>
        </Stack>

        <Text textAlign="center">{t('maintenanceMode.description')}</Text>
      </Box>
    </FeatureFlagSplitter>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.bg_base,
    width: '100%',
    height: '100%',
  },
}));
