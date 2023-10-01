import React from 'react';

import { config } from '$core/constants';
import { Box, Text } from '$shared/uiKit/primitives';

export function Version() {
  if (!config.version || !config.buildNumber) {
    return null;
  }

  return (
    <Box alignItems="flex-end" pt="spacing_32">
      <Text variant="small">
        {`Version: v${config.version}:${config.buildNumber}`}
      </Text>

      {typeof config.runtimeVersion === 'string' && (
        <Text variant="small">{`Runtime: v${config.runtimeVersion}`}</Text>
      )}
    </Box>
  );
}
