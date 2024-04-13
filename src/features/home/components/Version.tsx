import * as Updates from 'expo-updates';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { config } from '$core/constants';
import { StoreUpdateBanner } from '$shared/components/StoreUpdateBanner';
import { Box, Text } from '$shared/uiKit/primitives';

export const Version = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('appConfig');

  const { currentlyRunning } = Updates.useUpdates();

  const isRunningBuiltInCode =
    currentlyRunning.isEmbeddedLaunch || config.isDebug;

  if (!config.version) {
    return null;
  }

  return (
    <Box
      pb="spacing_8"
      style={{
        marginBottom: insets.bottom,
      }}
    >
      <Box px="spacing_24">
        <StoreUpdateBanner />
      </Box>

      <Box alignItems="flex-end" pt="spacing_32" px="spacing_24">
        {/* <Text variant="small">
          {`Version: v${config.version}${
            config.buildNumber ? `:${config.buildNumber}` : ''
          }`}
        </Text> */}

        {typeof config.runtimeVersion === 'string' && (
          <Text variant="small">{`Runtime: v${config.runtimeVersion}`}</Text>
        )}

        {!isRunningBuiltInCode && (
          <Text variant="small">{t('updateCheck.isEmbeddedLaunch')}</Text>
        )}
      </Box>
    </Box>
  );
};
