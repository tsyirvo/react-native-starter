import React, { Fragment } from 'react';
import { Text } from 'react-native';

import { Box, Flex } from '$components/shared/primitives';
import theme from '$styles/theme';

const SpacesDebugPage = () => (
  <Flex justifyContent="center" alignItems="center">
    {(Object.keys(theme.space) as (keyof typeof theme.space)[]).map((space) => (
      <Fragment key={space}>
        <Text>{`${space} - ${theme.space[space]}px`}</Text>
        <Box
          width="100%"
          height={theme.space[space]}
          bg="grey"
          mb={theme.space[space]}
        />
      </Fragment>
    ))}
  </Flex>
);

export default SpacesDebugPage;
