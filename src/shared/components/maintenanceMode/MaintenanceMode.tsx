import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

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
        <Box pb="spacing_8">
          <Text variant="large">{t('maintenanceMode.title')}</Text>
        </Box>

        <Text style={styles.centeredText}>
          {t('maintenanceMode.description')}
        </Text>
      </Box>
    </FeatureFlagSplitter>
  );
};

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
});
