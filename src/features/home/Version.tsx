import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { config } from '$core/constants';
import { StoreUpdateBanner } from '$shared/components/StoreUpdateBanner';
import { Box, Text } from '$shared/uiKit/primitives';

export function Version() {
  const insets = useSafeAreaInsets();

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
        <Text variant="small">
          {`Version: v${config.version}${
            config.buildNumber ? `:${config.buildNumber}` : ''
          }`}
        </Text>

        {typeof config.runtimeVersion === 'string' && (
          <Text variant="small">{`Runtime: v${config.runtimeVersion}`}</Text>
        )}
      </Box>
    </Box>
  );
}
