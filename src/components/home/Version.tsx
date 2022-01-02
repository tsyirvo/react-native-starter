import React, { useState } from 'react';
import { Pressable } from 'react-native';

import { Box, Text } from '$components/ui/primitives';
import { config } from '$core/constants';

const Version = () => {
  const [isShowAll, setIsShowAll] = useState(false);

  const toggleVersion = () => setIsShowAll((prevValue) => !prevValue);

  return (
    <Box pt="global_32" alignItems="flex-end">
      <Pressable onPress={toggleVersion}>
        <Text variant="small">
          {`Version: v${config.version}${
            isShowAll ? ` (${config.buildNumber}.${config.codePush})` : ''
          }`}
        </Text>
      </Pressable>
    </Box>
  );
};

export default Version;
