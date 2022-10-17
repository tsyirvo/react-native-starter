import React from 'react';

import { Box, Text } from '$components/ui/primitives';
import { config } from '$core/constants';

const Version = () => {
  if (!config.version || !config.buildNumber) {
    return null;
  }

  return (
    <Box alignItems="flex-end" pt="global_32">
      <Text variant="small">
        {`Version: v${config.version}:${config.buildNumber}`}
      </Text>

      {typeof config.runtimeVersion === 'string' && (
        <Text variant="small">{`Runtime: v${config.runtimeVersion}`}</Text>
      )}
    </Box>
  );
};

export default Version;
